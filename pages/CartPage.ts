import { Page } from '@playwright/test';

export class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getCartItems() {
    return await this.page.locator('.cart_item').allTextContents();
  }

  async getCartItemCount() {
    // count how many items are currently in the cart
    return await this.page.locator('.cart_item').count();
  }

  async removeItemByName(productName: string) {
    // find the cart item by name and click its remove button
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
    // goes back to the inventory page
    await this.page.locator('[data-test="continue-shopping"]').click();
  }
}