import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private flashMessage: Locator;
  private logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
    this.logoutButton = page.locator('a.button.secondary.radius[href="/logout"]');
  }

  async goto() {
    await this.navigate('/login');
  }

  async login(username?: string, password?: string) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  getFlashMessage() {
    return this.flashMessage;
  }
}
