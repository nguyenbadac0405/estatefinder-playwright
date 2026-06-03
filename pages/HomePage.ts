import { Page } from "@playwright/test";

export class HomePage {
    constructor(private page: Page) { }

    async open() {
        await this.page.goto("https://qa-assignment.oivan.vn/");
    }

    async clickSignUp() {
        await this.page.click('[data-test="nav-sign-up"]');
    }

}