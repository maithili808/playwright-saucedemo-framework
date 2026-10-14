import { test } from '../../../src/fixtures/saucedemo/pages.fixture';
import { env } from '../../../src/config/saucedemo/env.config';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user can log in', async ({ loginPage, inventoryPage }) => {
    // Given the login page, When valid credentials are entered
    await loginPage.login(env.username, env.password);
    // Then the products page is shown
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', env.password);
    await loginPage.expectError('this user has been locked out');
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(env.username, 'wrong_password');
    await loginPage.expectError('Username and password do not match');
  });

  test('empty username shows an error', async ({ loginPage }) => {
    await loginPage.login('', env.password);
    await loginPage.expectError('Username is required');
  });
});