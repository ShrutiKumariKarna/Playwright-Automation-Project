import { test, expect } from '../../fixtures/testFixtures';
import { isSortedAscending, isSortedDescending } from '../../utils/helpers';

test('products are displayed on inventory page', async ({ authenticatedPage, inventoryPage }) => {
  const names = await inventoryPage.getProductNames();
  expect(names.length).toBe(6);
});

test('sort products by price low to high', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.sortBy('lohi');
  const prices = await inventoryPage.getProductPrices();
  expect(isSortedAscending(prices)).toBeTruthy();
});

test('sort products by price high to low', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.sortBy('hilo');
  const prices = await inventoryPage.getProductPrices();
  expect(isSortedDescending(prices)).toBeTruthy();
});

test('user can logout successfully', async ({ authenticatedPage, inventoryPage, page }) => {
  await inventoryPage.logout();
  await expect(page).toHaveURL('/');
});