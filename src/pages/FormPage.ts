import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CustomWorld } from "../customWorld";
import { generateRandomEmail, generateRandomFirstName, generateRandomLastName, generateRandomPhoneNumber, generateRandomZipCode } from '../helper/utils/utils';

class FormPage extends BasePage {

    private multipleChoiceQuestions = '//fieldset[contains(@id, "field_41")]';
    private yesOption = 'input[type="radio"][value="Yes"]';
    private noOption = 'input[type="radio"][value="No"]';
    private firstName = '#input_41_12';
    private lastName = '#input_41_13';
    private age = 'select#input_41_30';
    private email = '#input_41_3';
    private phone = '#input_41_4_raw';
    private state = '#input_41_26_4';
    private zipCode = '#input_41_26_5';
    private submitButton = '#gform_submit_button_41';

    constructor(iWorld: CustomWorld) {
        super(iWorld.page, iWorld.logger);
    }

    async validateURL() {
        await this.page.waitForLoadState('load', { timeout: 10000 });
        await expect(this.page).toHaveURL(/.*get-started-today/);
        this.logger.info("Medical Evaluation Page URL is validated");
    }

    async fillForm() {

        // Answer all the Multiple Choice Questions Randomly
        const questions = this.page.locator(this.multipleChoiceQuestions)
        const questionsCount = await questions.count();
        for (let i = 0; i < questionsCount - 1; i++) {
            const question = questions.nth(i); // Retrieve the current question fieldset

            // Check if the question is visible
            if (await question.isVisible()) {
                // Handle picking an answer (randomly selecting for demonstration)
                if (Math.random() > 0.5) {
                    await question.locator(this.yesOption).check();
                } else {
                    await question.locator(this.noOption).check();
                }
            }
        }

        // Fill random first name
        await this.page.fill(this.firstName, generateRandomFirstName());

        // Fill random last name
        await this.page.fill(this.lastName, generateRandomLastName());

        // Select random index from age dropdown
        await this.page.locator(this.age).selectOption({ index: Math.floor(Math.random() * (await this.page.locator(this.age).locator('option').count())) + 1 });

        // Fill random email
        await this.page.fill(this.email, generateRandomEmail());

        // Fill random phone number
        await this.page.fill(this.phone, generateRandomPhoneNumber());

        // Select random index from state dropdown
        await this.page.locator(this.state).selectOption({ index: Math.floor(Math.random() * (await this.page.locator(this.state).locator('option').count()) + 1) });

        // Fill random zip code
        await this.page.fill(this.zipCode, generateRandomZipCode());

        this.logger.info("Medical Evaluation form filled");
    }

    async clickSubmitButton() {
        // Performing the button state rather than click as suggested in the assignment
        await expect(this.page.locator(this.submitButton)).toBeEnabled();
        this.logger.info("Medical Evaluation form submitted");
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}

export default FormPage;