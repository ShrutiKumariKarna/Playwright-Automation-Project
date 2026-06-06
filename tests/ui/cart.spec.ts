import { test, expect } from '../../fixtures/testFixtures';

test('add product to cart updates badge count', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  const count = await inventoryPage.getCartCount();
  expect(count).toBe(1);
});

test('remove product from cart clears badge', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.addToCartByName('Sauce Labs Bike Light');
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  const count = await inventoryPage.getCartCount();
  expect(count).toBe(1);
});

test('cart page shows added product', async ({ authenticatedPage, inventoryPage, cartPage, page }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);
});

test('remove item from cart page', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.removeItemByName('Sauce Labs Backpack');
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(0);
});