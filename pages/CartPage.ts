import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getCartItems() {
    return this.page.locator('.cart_item').allTextContents();
  }

  async getCartItemCount() {
    return this.page.locator('.cart_item').count();
  }

  async removeItemByName(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .locator('button')
      .click();
  }

  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async continueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }
}