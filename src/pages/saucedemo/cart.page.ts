import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}