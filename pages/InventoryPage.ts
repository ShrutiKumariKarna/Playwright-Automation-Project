import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sortBy(option: string) {
    await this.page.selectOption('.product_sort_container', option);
  }

  async getProductNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices() {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async addToCartByName(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button')
      .click();
  }

  async getCartCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    const visible = await badge.isVisible();
    if (!visible) return 0;
    const text = await badge.textContent();
    return parseInt(text ?? '0');
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async openBurgerMenu() {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async logout() {
    await this.openBurgerMenu();
    await this.page.locator('#logout_sidebar_link').click();
  }
}