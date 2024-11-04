import {UrlPaths} from "../utils/constants";
import {Locator, Page} from "@playwright/test";

export default abstract class BasePage {
    protected page: Page;
    readonly loadingCircle: Locator

    protected constructor(page: Page) {
        this.page = page
        this.loadingCircle = page.locator('circle[class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"]')
    }

    public async open(url: UrlPaths | string) {
        await this.page.goto(url);
    }

}