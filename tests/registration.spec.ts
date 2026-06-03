import { test, expect } from "@playwright/test";
import { generateExistingUser, generateInvalidUser, generateMismatchedPasswords, generateUser } from "../utils/faker";
import { SignUpPage } from "../pages/SignUpPage";

test(
  "Register new account successfully",
  async ({ page }) => {
    
    const signUpPage = new SignUpPage(page);
    const user = generateUser();

    await signUpPage.navigateTo(process.env.BASE_URL!);

    await signUpPage.goToSignUpPage();

    await signUpPage.register(
      user.email,
      user.password,
      user.password
    );

    await signUpPage.wait10Seconds();

    await expect(await signUpPage.isRegistrationSuccessful()).toBe(true);

    await signUpPage.confirmRegistration(user.email);

    await expect(await signUpPage.isConfirmationSuccessful()).toBe(true);

  }
);

test(
  "Register new account with invalid email",
  async ({ page }) => {
    
    const signUpPage = new SignUpPage(page);
    const user = generateInvalidUser();

    await signUpPage.navigateTo(process.env.BASE_URL!);

    await signUpPage.goToSignUpPage();

    await signUpPage.register(
      user.email,
      user.password,
      user.password
    );

    await signUpPage.wait10Seconds();

    await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);

    await expect(await signUpPage.isEmailInvalid()).toBe(true);

  }
);

test(
  "Register new account with mismatched passwords",
  async ({ page }) => {
    
    const signUpPage = new SignUpPage(page);
    const user = generateMismatchedPasswords();

    await signUpPage.navigateTo(process.env.BASE_URL!);

    await signUpPage.goToSignUpPage();

    await signUpPage.register(
      user.email,
      user.password,
      user.confirmPassword
    );

    await signUpPage.wait10Seconds();

    await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);

    await expect(await signUpPage.isPasswordMismatch()).toBe(true);

  }
);

test(
  "Register new account with duplicate email",
  async ({ page }) => {
    
    const signUpPage = new SignUpPage(page);
    const user = generateExistingUser();

    await signUpPage.navigateTo(process.env.BASE_URL!);

    await signUpPage.goToSignUpPage();

    await signUpPage.register(
      user.email,
      user.password,
      user.password
    );

    await signUpPage.wait10Seconds();

    await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);
    await signUpPage.wait10Seconds();

    await expect(await signUpPage.isEmailAlreadyTaken()).toBe(true);

  }
);
test(
  "Register new account with short password",
  async ({ page }) => {
    
    const signUpPage = new SignUpPage(page);
    const user = generateExistingUser();

    await signUpPage.navigateTo(process.env.BASE_URL!);

    await signUpPage.goToSignUpPage();

    await signUpPage.register(
      user.email,
      "123456",
      "123456"
    );

    await signUpPage.wait10Seconds();

    await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);
    await signUpPage.wait10Seconds();

    await expect(await signUpPage.isPasswordTooShort()).toBe(true);

  }
);

