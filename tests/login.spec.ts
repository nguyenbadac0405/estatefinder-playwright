import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test(
    "Login successfully",
    async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.goToLoginPage();

        await loginPage.login(process.env.DEMO_EMAIL!, process.env.DEMO_PASSWORD!);
        
        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoggedIn()).toBe(true);
    }
);

test(
    "Login successfully and remember me",
    async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.goToLoginPage();

        await loginPage.login(process.env.DEMO_EMAIL!, process.env.DEMO_PASSWORD!, true);
        
        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoggedIn()).toBe(true);
    }
);

test(
    "Login with invalid credentials",
    async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.goToLoginPage();

        await loginPage.login("invalid@example.com", "invalidpassword");

        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoginFailed()).toBe(true);
    }
);

test(
    "Logout successfully",
    async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.goToLoginPage();

        await loginPage.login(process.env.DEMO_EMAIL!, process.env.DEMO_PASSWORD!);

        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoggedIn()).toBe(true);

        await loginPage.logout();

        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoggedIn()).toBe(false);
    }
);
