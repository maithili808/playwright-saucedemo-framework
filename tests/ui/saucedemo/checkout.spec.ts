import { test, expect } from '../../../src/fixtures/saucedemo/pages.fixture';
import { env } from '../../../src/config/saucedemo/env.config';

test('user can complete a purchase end to end', async ({
  loginPage, inventoryPage, cartPage, checkoutPage,
}) => {
  // Given a logged-in user
  await loginPage.goto();
  await loginPage.login(env.username, env.password);
  await inventoryPage.expectLoaded();

  // When they add a random product and check out
  const productName = await inventoryPage.addRandomProduct();
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Test', 'User', '411001');

  // Then the same product is in the order summary and the order completes
  expect(await checkoutPage.itemNames.allTextContents()).toContain(productName);
  await checkoutPage.finish();
  await checkoutPage.expectOrderComplete();
});