import { test,expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AlertPage } from "../pages/AlertPage";
import { generateAlert, OldAlert } from "../utils/faker";

test(
    "Create alert successfully",
    async ({ page }) => {
        const loginPage = new LoginPage(page);
        const alertPage = new AlertPage(page);
        const dataAlert = generateAlert();

        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.goToLoginPage();

        await loginPage.login(process.env.DEMO_EMAIL!, process.env.DEMO_PASSWORD!);
        
        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoggedIn()).toBe(true);

        await alertPage.createAlert(dataAlert);

        await alertPage.wait10Seconds();

        await expect(await alertPage.isAlertCreated()).toBe(true);


    }
);

test(
    "Edit alert successfully",
    async ({ page }) => {
        const loginPage = new LoginPage(page);
        const alertPage = new AlertPage(page);
        const oldAlert = OldAlert;
        const newAlert = generateAlert();

        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.goToLoginPage();

        await loginPage.login(process.env.DEMO_EMAIL!, process.env.DEMO_PASSWORD!);
        
        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoggedIn()).toBe(true);

        await alertPage.goToAlertsPage();

        await alertPage.editAlert(oldAlert, newAlert);

        await alertPage.wait10Seconds();

        await expect(await alertPage.isAlertEdited()).toBe(true);

    }
);

test(
    "Delete alert successfully",
    async ({ page }) => {
        const loginPage = new LoginPage(page);
        const alertPage = new AlertPage(page);
        const dataAlert = generateAlert();

        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.goToLoginPage();

        await loginPage.login(process.env.DEMO_EMAIL!, process.env.DEMO_PASSWORD!);
        
        await loginPage.wait10Seconds();

        await expect(await loginPage.isLoggedIn()).toBe(true);

        await alertPage.createAlert(dataAlert);

        await alertPage.wait10Seconds();

        await expect(await alertPage.isAlertCreated()).toBe(true);

        await alertPage.deleteAlert(dataAlert.name);

        await alertPage.wait10Seconds();

        await expect(await alertPage.isAlertDeleted()).toBe(true);
    }
);