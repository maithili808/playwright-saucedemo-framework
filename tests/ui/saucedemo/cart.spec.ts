import { test, expect } from '../../../src/fixtures/saucedemo/pages.fixture';
import { env } from '../../../src/config/saucedemo/env.config';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(env.username, env.password);
    await inventoryPage.expectLoaded();
  });

  test('added product appears in the cart', async ({ inventoryPage, cartPage }) => {
    const productName = await inventoryPage.addRandomProduct();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    expect(await cartPage.getItemNames()).toContain(productName);
  });
});