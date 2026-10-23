import { type Page, expect } from '@playwright/test';
export class CartPage {
  constructor(private page: Page) {}
  async expectItem(name: string) { await expect(this.page.getByText(name, { exact: true }).first()).toBeVisible(); }
  async expectQuantityOne() { await expect(this.page.getByTestId('product-quantity').first()).toHaveValue('1'); }
  async checkout() { await this.page.getByTestId('proceed-1').click(); }
}
