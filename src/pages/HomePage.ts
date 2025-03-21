import { CustomWorld } from "../customWorld";
import { BasePage } from "./BasePage";

class HomePage extends BasePage {

    private getStartedToday = 'div[data-id="8a47a1c"] span[class="elementor-button-content-wrapper"]';

    constructor(iWorld: CustomWorld) {
        super(iWorld.page, iWorld.logger);
    }

    async navigateToURL() {
        // Go to the application
        await this.page.goto('https://www.trajectormedical.com/');
        this.logger.info("Navigated to Trajector Medical Home Page");
    }

    async clickGetStartedButton() {
        await this.page.locator(this.getStartedToday).click();
        this.logger.info("Clicked on Medical Evaluation Button");
    }
}

export default HomePage;