import { Page } from '@playwright/test';

export class InventoryPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sortBy(option: string) {
    // option values: 'lohi', 'hilo', 'az', 'za'
    await this.page.selectOption('.product_sort_container', option);
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    // strip the dollar sign and convert to numbers
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async addToCartByName(productName: string) {
    // find the product card that matches the name and click its button
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button')
      .click();
  }

  async getCartCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    const isVisible = await badge.isVisible();
    if (!isVisible) return 0;
    const count = await badge.textContent();
    return parseInt(count ?? '0');
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async openBurgerMenu() {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async logout() {
    await this.openBurgerMenu();
    // wait a moment for the menu to slide open
    await this.page.locator('#logout_sidebar_link').click();
  }
}