import {test as setup, expect} from "@playwright/test";
import {authFile, UrlPaths} from "../utils/constants";
import LoginPage from "../pages/login.page";
import credentials from "../utils/credentials";

setup('authenticate', async ({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(credentials.userName, credentials.userPassword);
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain(UrlPaths.Jobs);
    await page.context().storageState({path: authFile});
});