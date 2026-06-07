import { Page } from '@playwright/test';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    // fill in credentials and hit login
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async getErrorMessage() {
    // returns the red error text shown on failed login
    return await this.page.locator('[data-test="error"]').textContent();
  }
}