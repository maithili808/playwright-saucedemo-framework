import { test, expect } from '../../../src/fixtures/saucedemo/pages.fixture';
import { env } from '../../../src/config/saucedemo/env.config';
import { validUsers, invalidLogins } from '../../../src/data/saucedemo/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  for (const username of validUsers) {
    test(`${username} can log in`, async ({ loginPage, inventoryPage }) => {
      await loginPage.login(username, env.password);
      await inventoryPage.expectLoaded();
    });
  }

  for (const data of invalidLogins) {
    test(`login fails: ${data.name}`, async ({ loginPage }) => {
      await loginPage.login(data.username, data.password);
      await loginPage.expectError(data.error);
    });
  }
});

test('user can log out', async ({ loggedInInventory, loginPage }) => {
  await loggedInInventory.logout();
  await expect(loginPage.loginButton).toBeVisible();
});