import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/login.page';
import { InventoryPage } from '../../pages/saucedemo/inventory.page';
import { CartPage } from '../../pages/saucedemo/cart.page';
import { CheckoutPage } from '../../pages/saucedemo/checkout.page';
import { env } from '../../config/saucedemo/env.config';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedInInventory: InventoryPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },

  // Logs in with the standard user and hands over the products page
  loggedInInventory: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login(env.username, env.password);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';