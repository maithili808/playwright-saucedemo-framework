import { test, expect } from '../../../src/fixtures/saucedemo/pages.fixture';

test('item total and order total are calculated correctly', async ({
  loggedInInventory, cartPage, checkoutPage,
}) => {
  await loggedInInventory.addProductByName('Sauce Labs Backpack');
  await loggedInInventory.addProductByName('Sauce Labs Bike Light');
  await loggedInInventory.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Test', 'User', '411001');

  // Item total must equal the sum of the product prices shown
  const prices = await checkoutPage.getItemPrices();
  const sum = prices.reduce((a, b) => a + b, 0);
  expect(await checkoutPage.getSubtotal()).toBeCloseTo(sum, 2);

  // Order total must equal item total + tax
  const tax = await checkoutPage.getTax();
  expect(await checkoutPage.getTotal()).toBeCloseTo(sum + tax, 2);
});