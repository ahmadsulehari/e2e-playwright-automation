import BasePage from "./base.page.ts";
import {Locator, Page} from "@playwright/test";


class JobsDetailsPage extends BasePage {
    readonly addCandidateBtn: Locator;
    constructor(page: Page) {
        super(page);
        this.addCandidateBtn = page.locator('button[name="add-candidate-top"]')

    }
}
export default JobsDetailsPage;
