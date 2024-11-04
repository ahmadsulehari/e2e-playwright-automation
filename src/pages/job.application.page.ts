import path from 'path';
import {expect, Locator, Page} from "@playwright/test";
import BasePage from "./base.page.ts";
import {CandidateDetails, CandidateSourceType, DropDownListIndex} from "../utils/constants.ts";
import {clearAndType} from "../utils/helper.ts";

class JobApplicationPage extends BasePage {
    readonly uploadResumeBtn: Locator;
    readonly uploadProgressBar: Locator;
    readonly uploadedResumeName: Locator;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputEmail: Locator;
    readonly inputPhone: Locator;
    readonly inputAddress: Locator;
    readonly inputCity: Locator;
    readonly inputSource: Locator;
    readonly inputSourceEmail: Locator;
    readonly inputMajor: Locator;
    readonly graduation: Locator;
    readonly dropDownList: Locator;
    readonly saveBtn: Locator
    readonly candidateSuccessfullyAddedPopUp: Locator
    readonly dismissNotificationPopUp: Locator

    constructor(page: Page) {
        super(page);
        this.uploadResumeBtn = page.locator('input[type="file"]');
        this.uploadProgressBar = page.locator('div[class="MuiLinearProgress-bar MuiLinearProgress-barColorSecondary MuiLinearProgress-bar1Determinate"]')
        this.uploadedResumeName = page.locator('a[name="requirements.0.value.attachment"]')
        this.inputFirstName = page.locator('input[name="requirements.1.value"]');
        this.inputLastName = page.locator('input[name="requirements.2.value"]');
        this.inputEmail = page.locator('input[name="requirements.3.value"]');
        this.inputPhone = page.locator('input[name="requirements.4.value"]');
        this.inputAddress = page.locator('input[name="requirements.5.value"]');
        this.inputCity = page.locator('input[name="requirements.6.value"]');
        this.inputSource = page.locator('div[id="mui-component-select-requirements.9.value.type"]');
        this.inputSourceEmail = page.locator('input[name="requirements.9.value.value"]');
        this.inputMajor = page.locator('input[name="requirements.10.value"]');
        this.graduation = page.locator('input[name="requirements.13.value"]');
        this.dropDownList = page.locator('//div[contains(@class,"select__control")]');
        this.saveBtn = page.locator('//button[contains(@class,"MuiButtonBase-root MuiButton-root ")]/span[text()="Save"]')
        this.candidateSuccessfullyAddedPopUp = page.locator('p[class="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-alignCenter"]')
        this.dismissNotificationPopUp = page.locator('button[name="notification-dismiss"]')
    }

    async selectDropDown(index: number) {
        await this.dropDownList.first();
        await this.dropDownList.nth(index).focus();
        await this.dropDownList.nth(index).click();
    }

    async addCity(city: string) {
        await this.inputCity.fill(city);
        await expect(this.inputCity).toHaveValue(city);
    }

    async selectCandidateSource(sourceType: CandidateSourceType) {
        await this.inputSource.focus();
        await this.inputSource.click();
        await expect(
            this.page.locator(`[data-value="${sourceType}"]`),
        ).toBeVisible()
        await this.page.locator(`[data-value="${sourceType}"]`).click();
    }

    async addReferralEmail(email: string) {
        await this.inputSourceEmail.fill(email);
        await expect(this.inputSourceEmail).toHaveValue(email);
    }

    async uploadResume() {
        await this.uploadResumeBtn.setInputFiles(path.join(__dirname, '../data/filesToUpload/job.cv.pdf'));
        await this.uploadProgressBar.waitFor({
            state: "hidden",
            timeout: 180000,
        });
        await this.uploadedResumeName.waitFor({ state: "visible", timeout: 20000 });
    }
// /Users/ahmad.sulehari/WebstormProjects/e2e-playwright-automation/src/data/filesToUpload/job.cv.pdf
    async getDropDown(index: number) {
        await this.dropDownList.first()
        return this.dropDownList.nth(index);
    }

    async addValidDetailsForCandidate(
        candidateEmail: string,
        addReferralEmail = true,
        skipCandidateSource = false,
    ) {
        await this.loadingCircle.waitFor({
            state: "hidden",
            timeout: 30000,
        });
        await this.uploadResume();
        await expect(this.inputFirstName).toHaveValue(CandidateDetails.FirstName);
        await expect(this.inputLastName).toHaveValue(CandidateDetails.LastName);
        await clearAndType(this.inputEmail, candidateEmail);
        await expect(this.inputEmail).toHaveValue(candidateEmail);

        await clearAndType(this.inputPhone, CandidateDetails.Phone);
        await expect(this.inputPhone).toHaveValue(CandidateDetails.Phone);

        await expect(this.inputAddress).toHaveValue(CandidateDetails.Address);
        await this.addCity(CandidateDetails.City);
        await this.selectDropDown(DropDownListIndex.MaleGender);
        await this.page.getByText(CandidateDetails.Gender, { exact: true }).click()
        await expect(await this.getDropDown(DropDownListIndex.MaleGender)).toHaveText(
            CandidateDetails.Gender,
        );
        await expect(await this.getDropDown(DropDownListIndex.Skill)).toContainText(
            CandidateDetails.Skill,
        );
        if (!skipCandidateSource) {
            if (addReferralEmail) {
                await this.selectCandidateSource(CandidateSourceType.Referral);
                await expect(this.inputSource).toHaveText(CandidateDetails.Source);
                await this.addReferralEmail(CandidateDetails.ReferralEmail);
            } else {
                await this.selectCandidateSource(CandidateSourceType.Other);
            }
        }
    }

    async submitCandidateForm() {
        await this.saveBtn.focus();
        await this.saveBtn.click();
        await this.candidateSuccessfullyAddedPopUp.waitFor({
            state:"visible", timeout: 30000
        });
        await expect(this.candidateSuccessfullyAddedPopUp).toContainText(
            CandidateDetails.SuccessMsg,
        );
        await this.dismissNotificationPopUp.click();
        await this.loadingCircle.waitFor({
            state: "hidden",
            timeout: 30000,
        });
    }
}

export default JobApplicationPage;
