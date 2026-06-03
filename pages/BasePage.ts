import { Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) { }

    async navigateTo(url: string) {
        await this.page.goto(url);
        await this.waitForPageLoad();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    async wait10Seconds() {
        await this.page.waitForTimeout(10000);
    }
}