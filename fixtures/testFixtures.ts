import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// custom fixture types
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: Page;
};

// extending playwright's base test with our own fixtures
export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }: { page: Page }, use: (r: LoginPage) => Promise<void>) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }: { page: Page }, use: (r: InventoryPage) => Promise<void>) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }: { page: Page }, use: (r: CartPage) => Promise<void>) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }: { page: Page }, use: (r: CheckoutPage) => Promise<void>) => {
    await use(new CheckoutPage(page));
  },

  // this fixture logs in before the test starts
  // so i dont have to repeat login steps in every test
  authenticatedPage: async ({ page }: { page: Page }, use: (r: Page) => Promise<void>) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      process.env.STANDARD_USER ?? 'standard_user',
      process.env.PASSWORD ?? 'secret_sauce'
    );
    await use(page);
  },

});

export { expect } from '@playwright/test';