import BasePage from "./base.page";
import {expect, Locator, Page} from "@playwright/test";
import {JobsPageStatus, UrlPaths} from "../utils/constants";

class JobsPage extends BasePage{
    pageHeader: Locator;
    newlyCreatedJobTitle: Locator;
    jobViewBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeader = page.locator('[id="job-listing-job-status"]')
        this.newlyCreatedJobTitle = page.locator('a[name="job-title"]')
        this.jobViewBtn = page.locator('//button[@name="view-job"]')
    }

    async open() {
        await super.open(UrlPaths.Jobs);
    }

    async searchJobTitleViaUrl(
        jobTitle: string,
        jobStatusOption = JobsPageStatus.JobStatusPublish,
    ) {
        await super.open(
            `jobs/?searchQuery=${jobTitle}&jobStatus=${jobStatusOption}&onboarding=0`,
        );
        await this.loadingCircle.waitFor({
            state: "hidden",
            timeout: 10000,
        });
    }

    async verifyJobTitle(jobTitle: string) {
        await this.newlyCreatedJobTitle.waitFor({ state: "visible", timeout: 10000 });
        await expect(this.newlyCreatedJobTitle).toHaveText(jobTitle);
    }

    async openJobViewPage() {
        await this.jobViewBtn.click();
        await expect(this.page.url()).toContain(
            UrlPaths.ViewJobPath,
        );
        await this.loadingCircle.waitFor({
            state: "hidden",
            timeout: 5000,
        });
    }

} export default JobsPage;