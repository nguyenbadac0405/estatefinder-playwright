import { Page } from "@playwright/test";

export class LetterOpenerPage {
    constructor(private page: Page) { }

    async getConfirmationLink() {

        const response = await this.page.request.get("/letter_opener.json");

        const mails = await response.json();

        const latestMail = mails[0];

        const htmlResponse =
            await this.page.request.get(
                latestMail.url
            );

        const html =
            await htmlResponse.text();

        const match = html.match(
            /href="([^"]*confirmation_token[^"]*)"/
        );

        return match?.[1];
    }
}