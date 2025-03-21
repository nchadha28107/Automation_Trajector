import { setWorldConstructor } from '@cucumber/cucumber';
import { Page } from 'playwright';

export class CustomWorld {
    public page!: Page;
    public logger: any;

    constructor() {
        this.page;
        this.logger;
    }
}

setWorldConstructor(CustomWorld);