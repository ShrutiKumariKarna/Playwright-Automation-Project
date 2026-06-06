import { test, expect } from '../../fixtures/testFixtures';
import { CHECKOUT_DATA } from '../../utils/helpers';

test('complete checkout successfully', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage, page }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.fillForm(
    CHECKOUT_DATA.valid.firstName,
    CHECKOUT_DATA.valid.lastName,
    CHECKOUT_DATA.valid.zipCode
  );
  await checkoutPage.continue();
  await checkoutPage.finish();
  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toContain('Thank you for your order');
});

test('checkout fails with empty form fields', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.fillForm(
    CHECKOUT_DATA.empty.firstName,
    CHECKOUT_DATA.empty.lastName,
    CHECKOUT_DATA.empty.zipCode
  );
  await checkoutPage.continue();
  const error = await checkoutPage.getErrorMessage();
  expect(error).toContain('First Name is required');
});

test('continue shopping from cart goes back to inventory', async ({ authenticatedPage, inventoryPage, cartPage, page }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.continueShopping();
  await expect(page).toHaveURL(/inventory/);
});