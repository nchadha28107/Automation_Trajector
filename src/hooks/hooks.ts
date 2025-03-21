import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { invokeBrowser, invokeDevices } from "../helper/browsers/browserManager";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";
const fs = require("fs-extra");

setDefaultTimeout(60 * 1000 * 2)

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        ...invokeDevices(),
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    this.page = await context.newPage();;
    this.logger = createLogger(options(scenarioName));
});


After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;
    if (result?.status == Status.PASSED) {
        img = await this.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await this.page.video().path();
    }
    await context.tracing.stop({ path: path });
    await this.page.close();
    await context.close();
    // if (result?.status == Status.PASSED) {
    //     await this.attach(
    //         img, "image/png"
    //     );
    //     await this.attach(
    //         fs.readFileSync(videoPath),
    //         'video/webm'
    //     );
    //     const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
    //     await this.attach(`Trace file: ${traceFileLink}`, 'text/html');

    // }
});

AfterAll(async function () {
    await browser.close();
})