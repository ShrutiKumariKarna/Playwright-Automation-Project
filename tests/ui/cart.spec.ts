import { test, expect } from '../../fixtures/testFixtures';

// testing add and remove cart functionality

test('adding a product updates the cart badge', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  const count = await inventoryPage.getCartCount();
  expect(count).toBe(1);
});

test('removing a product updates the cart badge', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.addToCartByName('Sauce Labs Bike Light');
  // remove backpack by clicking its button again
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  const count = await inventoryPage.getCartCount();
  expect(count).toBe(1);
});

test('cart page shows the product i added', async ({ authenticatedPage, inventoryPage, cartPage, page }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);
});

test('removing item from cart page empties the cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.removeItemByName('Sauce Labs Backpack');
  // cart should now be empty
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(0);
});