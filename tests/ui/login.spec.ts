import { test, expect } from '../../fixtures/testFixtures';
import { TEST_USERS } from '../../utils/helpers';

// testing all login scenarios - valid, invalid, locked, empty

test('valid login navigates to inventory', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
  await expect(page).toHaveURL(/inventory/);
});

test('invalid credentials shows error message', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(TEST_USERS.invalid.username, TEST_USERS.invalid.password);
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Username and password do not match');
});

test('locked out user cannot login', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password);
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Sorry, this user has been locked out');
});

test('empty fields shows username required error', async ({ loginPage }) => {
  await loginPage.goto();
  // submit without filling anything
  await loginPage.login(TEST_USERS.empty.username, TEST_USERS.empty.password);
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Username is required');
});