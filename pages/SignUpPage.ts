import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToSignUpPage() {
    await this.page.click('[data-test="nav-sign-up"]');
    await this.waitForPageLoad();
  }

  async register(email: string, password: string, confirmPassword: string) {
    await this.page.fill('[data-test="name"]', "Test User");

    await this.page.fill('[data-test="email"]', email);

    await this.page.fill('[data-test="password"]', password);

    await this.page.fill('[data-test="password-confirmation"]', confirmPassword);

    await this.page.click('[data-test="submit"]');
  }

  async isRegistrationSuccessful() {
    return await this.page.getByText(/You have to confirm your email address before continuing/i).isVisible();
  }

  async goToConfirmationPage() {
    await this.page.goto("/letter_opener");
    await this.waitForPageLoad();
  }

  async confirmRegistration(email: string) {
    await this.goToConfirmationPage();
    await this.page.click(`text="${email}"`);
    const link = this.page
      .frameLocator('iframe[name="mail"]')
      .frameLocator('iframe')
      .locator('//a[contains(.,"Confirm my account")]');

    await link.click();

    await this.waitForPageLoad();
  }

  async isConfirmationSuccessful() {
    return await this.page.isVisible(`text="Your email address has been successfully confirmed."`);
  }

  async isEmailInvalid() {
    return await this.page.isVisible(`[class="text-muted"]`);
  }

  async isPasswordMismatch() {
    return await this.page.isVisible(`text="Passwords do not match"`);
  }
  async isPasswordTooShort() {
    return await this.page.isVisible(`text="Password is too short"`);
  }

  async isEmailAlreadyTaken() {
    return await this.page.isVisible(`text="Email has already been taken"`);
  }
}