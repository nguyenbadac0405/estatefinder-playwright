import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async goToLoginPage() {
        await this.page.click('[data-test="nav-sign-in"]');
        await this.waitForPageLoad();
    }

    async login(email: string, password: string, isRememberMe: boolean = false) {
        await this.page.fill('[data-test="email"]', email);

        await this.page.fill('[data-test="password"]', password);

        if (isRememberMe) {
            await this.page.click('[data-test="remember-me"]');
        }

        await this.page.click('[data-test="submit"]');
    }

    async isLoggedIn() {
        return await this.page.isVisible('[data-test="sign-out"]');
    }

    async isLoginFailed() {
        return await this.page.getByText(/Invalid Email or password/i).isVisible();
    }

    async logout() {
        await this.page.click('[data-test="sign-out"]');
    }

    async isLoggedOut() {
        return await this.page.getByText(/Signed out successfully/i).isVisible();
    }
}