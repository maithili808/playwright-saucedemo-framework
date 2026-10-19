import { test, expect } from '../../../src/fixtures/saucedemo/pages.fixture';

test.describe('Inventory', () => {
  test('sort by name A to Z', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('az');
    const names = await loggedInInventory.getNames();
    expect(names).toEqual([...names].sort());
  });

  test('sort by name Z to A', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('za');
    const names = await loggedInInventory.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('sort by price low to high', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('lohi');
    const prices = await loggedInInventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high to low', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('hilo');
    const prices = await loggedInInventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('cart badge increases as products are added', async ({ loggedInInventory }) => {
    await loggedInInventory.addProductByName('Sauce Labs Backpack');
    await expect(loggedInInventory.cartBadge).toHaveText('1');
    await loggedInInventory.addProductByName('Sauce Labs Bike Light');
    await expect(loggedInInventory.cartBadge).toHaveText('2');
  });

  test('removing a product clears the cart badge', async ({ loggedInInventory }) => {
    await loggedInInventory.addProductByName('Sauce Labs Backpack');
    await expect(loggedInInventory.cartBadge).toHaveText('1');
    await loggedInInventory.removeProductByName('Sauce Labs Backpack');
    await expect(loggedInInventory.cartBadge).toHaveCount(0);
  });
});