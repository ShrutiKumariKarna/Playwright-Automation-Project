import { test, expect } from '../../fixtures/testFixtures';
import { isSortedAscending, isSortedDescending } from '../../utils/helpers';

// these tests assume user is already logged in via authenticatedPage fixture

test('inventory page shows 6 products', async ({ authenticatedPage, inventoryPage }) => {
  const names = await inventoryPage.getProductNames();
  expect(names.length).toBe(6);
});

test('sort by price low to high works correctly', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.sortBy('lohi');
  const prices = await inventoryPage.getProductPrices();
  // prices should go from cheapest to most expensive
  expect(isSortedAscending(prices)).toBeTruthy();
});

test('sort by price high to low works correctly', async ({ authenticatedPage, inventoryPage }) => {
  await inventoryPage.sortBy('hilo');
  const prices = await inventoryPage.getProductPrices();
  expect(isSortedDescending(prices)).toBeTruthy();
});

test('user can logout from burger menu', async ({ authenticatedPage, inventoryPage, page }) => {
  await inventoryPage.logout();
  // should land back on the login page
  await expect(page).toHaveURL('/');
});