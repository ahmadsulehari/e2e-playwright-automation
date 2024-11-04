import {Locator, Page} from "@playwright/test";
import BasePage from "./base.page";
import {UrlPaths} from "../utils/constants";
class LoginPage extends BasePage {

    userEmail: Locator
    password: Locator
    loginButton: Locator

    constructor(page: Page) {
        super(page);
        this.userEmail = page.locator('[name="email"]');
        this.password = page.locator('[name="password"]');
        this.loginButton = page.locator('[id="login-custom-btn"]');
    }

    async open() {
        await super.open(UrlPaths.Login);
    }

    async login(email: string, password: string) {
        await this.userEmail.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}
export default LoginPage;