import { Page } from '@playwright/test';

export class CheckoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillForm(firstName: string, lastName: string, zipCode: string) {
    // fill in the shipping info form
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', zipCode);
  }

  async continue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async finish() {
    // place the order
    await this.page.locator('[data-test="finish"]').click();
  }

  async getErrorMessage() {
    // shown when form fields are missing or invalid
    return await this.page.locator('[data-test="error"]').textContent();
  }

  async getConfirmationMessage() {
    // shown on successful order completion
    return await this.page.locator('.complete-header').textContent();
  }
}