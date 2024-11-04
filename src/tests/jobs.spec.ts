import {expect, request, test} from "@playwright/test";
import JobsPage from "../pages/jobs.page";
import ApiHelper from "../utils/apiHelper";
import {getNewJobPayload, randomJobName, testEmail} from "../utils/helper.ts";
import {newJobResponse} from "../utils/interfaces.ts";
import JobsDetailsPage from "../pages/job.details.page.ts";
import {UrlPaths} from "../utils/constants.ts";
import JobApplicationPage from "../pages/job.application.page.ts";
import path from "path";

test.describe('jobs Epic', () => {
    let jobData: newJobResponse;
    let apiHelper: ApiHelper;

    test.beforeAll(
        async () => {
            const apiContext = await request.newContext({storageState: path.join(__dirname, '../../playwright/.auth/user.json')});
            apiHelper = new ApiHelper(apiContext);

            const payloadUpdate = { title: randomJobName() };
            jobData = await apiHelper.createNewJob(getNewJobPayload(payloadUpdate))
        }
    );

    test("jobs", async ({page}) => {
        const jobsPage = new JobsPage(page);
        await jobsPage.open();
        await expect(jobsPage.pageHeader).toContainText('Published Jobs');

        await jobsPage.searchJobTitleViaUrl(jobData.title);
        await jobsPage.verifyJobTitle(jobData.title);
        await jobsPage.openJobViewPage();

        const jobDetailPage = new JobsDetailsPage(page);
        await jobDetailPage.addCandidateBtn.click();
        await expect(page.url()).toContain(
            UrlPaths.CandidatePagePath,
        );

        const jobApplicationPage = new JobApplicationPage(page);
        await jobApplicationPage.addValidDetailsForCandidate(testEmail());
        await jobApplicationPage.submitCandidateForm();
    })

    test.afterAll(async ()=> {
        if (jobData && Object.keys(jobData).length !== 0) {
            await apiHelper.deleteJob(jobData.uuid);
        }
    })

})



