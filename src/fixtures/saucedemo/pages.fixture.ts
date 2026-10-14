import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/login.page';
import { InventoryPage } from '../../pages/saucedemo/inventory.page';
import { CartPage } from '../../pages/saucedemo/cart.page';
import { CheckoutPage } from '../../pages/saucedemo/checkout.page';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
});

export { expect } from '@playwright/test';