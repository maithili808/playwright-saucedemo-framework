import { Page, Locator, expect } from '@playwright/test';
import { randomInt } from '../../utils/random';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addProductByName(name: string) {
    await this.items
      .filter({ hasText: name })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  // Picks a random product, adds it, and returns its name
  async addRandomProduct(): Promise<string> {
    const count = await this.items.count();
    const index = randomInt(count);
    const name = (await this.itemNames.nth(index).textContent()) ?? '';
    await this.items.nth(index).getByRole('button', { name: 'Add to cart' }).click();
    return name;
  }

  async openCart() {
    await this.cartLink.click();
  }
}