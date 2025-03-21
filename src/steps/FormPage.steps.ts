import { Then, Before } from '@cucumber/cucumber';
import FormPage from '../pages/FormPage';
import { CustomWorld } from '../customWorld';

let formPage: FormPage;

Before(async function (this: CustomWorld) {
    formPage = new FormPage(this);
});

Then('user land on Medical Evaluation Page', async () => {
    await formPage.validateURL();
})

Then('user fills the Medical Evaluation Form', async () => {
    await formPage.fillForm();
})

Then('user submits the form', async () => {
    await formPage.clickSubmitButton();
})