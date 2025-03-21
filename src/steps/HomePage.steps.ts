import { Given, When, Before } from '@cucumber/cucumber';
import HomePage from '../pages/HomePage';
import { CustomWorld } from '../customWorld';

let homePage: HomePage;

Before(async function (this: CustomWorld) {
    homePage = new HomePage(this);
});

Given('user navigate to the Trajector Medical Home Page', async () => {
    await homePage.navigateToURL();
})

When('user click on Get Started Button', async () => {
    await homePage.clickGetStartedButton();
})