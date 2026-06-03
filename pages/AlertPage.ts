import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Alert } from "../utils/faker";

export class AlertPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async createAlert(alert: Alert) {

        await this.page.click('[data-test="create-alert-cta"]');

        await this.page.fill('[data-test="name"]', alert.name);

        await this.page.fill('[data-test="city"]', alert.city);

        await this.page.fill('[data-test="min-price"]', alert.minPrice);

        await this.page.fill('[data-test="max-price"]', alert.maxPrice);

        await this.page.fill('[data-test="min-bedrooms"]', alert.minBedrooms);

        await this.page.selectOption('[data-test="property-type"]', alert.propertyType);

        await this.page.click('[data-test="submit"]');
    }

    async isAlertCreated() {
        return await this.page.getByText(/Alert created/i).isVisible();
    }

    async deleteAlert(alertName: string) {
        await this.page.locator(`//*[text()="${alertName}"]/following-sibling::*//button[@data-test="delete-alert"]`).evaluate(
            (el: HTMLElement) => el.click()
        );
        console.log("Delete button clicked");
        await this.page.waitForTimeout(1000); // Wait for the dialog to appear
        const dialogPromise = this.page.waitForEvent('dialog');

        const dialog = await dialogPromise;

        await expect(dialog.message()).toBe('Delete alert?');

        await dialog.dismiss();
    }


    async isAlertDeleted() {
        return await this.page.getByText(/Alert removed/i).isVisible();
    }

    async editAlert(oldAlert: Alert, newAlert: Alert) {
        const editButton = this.page.locator(`//*[text()="${oldAlert.name}"]/following-sibling::*//*[@data-test="edit-alert"]`);
        await editButton.click();
        await this.page.fill('[data-test="name"]', newAlert.name);

        await this.page.fill('[data-test="city"]', newAlert.city);

        await this.page.fill('[data-test="min-price"]', newAlert.minPrice);

        await this.page.fill('[data-test="max-price"]', newAlert.maxPrice);

        await this.page.fill('[data-test="min-bedrooms"]', newAlert.minBedrooms);

        await this.page.selectOption('[data-test="property-type"]', newAlert.propertyType);

        await this.page.click('[data-test="submit"]');

        //wite new alert to oldAlert data to faker.ts for future use
        const fs = require('fs');

        const filePath = 'utils/faker.ts';

        let content = fs.readFileSync(filePath, 'utf8');

        // Xóa export const oldAlert cũ
        content = content.replace(
            /export const oldAlert: Alert = [\s\S]*?};\s*/g,
            ''
        );

        // Thêm oldAlert mới
        content += `export const oldAlert: Alert = ${JSON.stringify(newAlert, null, 4)};`;

        fs.writeFileSync(filePath, content);
    }

    async isAlertEdited() {
        return await this.page.getByText(/Alert updated/i).isVisible();
    }

    async goToAlertsPage() {
        await this.page.click('[data-test="nav-alerts"]');
        await this.waitForPageLoad();
    }
}