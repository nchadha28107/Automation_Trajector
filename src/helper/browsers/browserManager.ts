import { LaunchOptions, chromium, firefox, webkit, devices } from "@playwright/test";

const options: LaunchOptions = {
    headless: !true
}

export const invokeBrowser = () => {
    const browserType = process.env.npm_config_BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }
}

export const invokeDevices = () => {
    return devices[process.env.npm_config_DEVICES ?? "iPhone 15"];
}