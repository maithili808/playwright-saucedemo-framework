import { test } from '../../../src/fixtures/saucedemo/pages.fixture';

const cases = [
  { name: 'first name', first: '', last: 'User', zip: '411001', error: 'First Name is required' },
  { name: 'last name', first: 'Test', last: '', zip: '411001', error: 'Last Name is required' },
  { name: 'postal code', first: 'Test', last: 'User', zip: '', error: 'Postal Code is required' },
];

test.describe('Checkout validation', () => {
  test.beforeEach(async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addProductByName('Sauce Labs Backpack');
    await loggedInInventory.openCart();
    await cartPage.checkout();
  });

  for (const c of cases) {
    test(`missing ${c.name} shows an error`, async ({ checkoutPage }) => {
      await checkoutPage.fillInformation(c.first, c.last, c.zip);
      await checkoutPage.expectError(c.error);
    });
  }
});