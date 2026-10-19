import { test, expect } from '../../../src/fixtures/saucedemo/pages.fixture';

test.describe('Cart management', () => {
  test('cart shows every added product', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addProductByName('Sauce Labs Backpack');
    await loggedInInventory.addProductByName('Sauce Labs Bike Light');
    await loggedInInventory.openCart();
    await cartPage.expectLoaded();

    const names = await cartPage.getItemNames();
    expect(names).toHaveLength(2);
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Bike Light');
  });

  test('a product can be removed from the cart', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addProductByName('Sauce Labs Backpack');
    await loggedInInventory.addProductByName('Sauce Labs Bike Light');
    await loggedInInventory.openCart();
    await cartPage.expectLoaded();

    await cartPage.removeItem('Sauce Labs Backpack');
    await expect(cartPage.itemNames).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText('Sauce Labs Bike Light');
  });
});