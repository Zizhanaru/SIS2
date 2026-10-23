
import { type Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  // Product cards in the catalog
  private get products() {
    return this.page.locator('a[data-test^="product-"]');
  }

  // Open catalog
  async openCatalog() {
    await this.page.goto('/');

    await expect(this.products.first()).toBeVisible({
      timeout: 20000
    });
  }

  // Open product by position
  async openProduct(index: number) {
    const product = this.products.nth(index);

    await expect(product).toBeVisible();
    await product.click();

    await expect(
      this.page.getByTestId('product-name')
    ).toBeVisible();
  }

  // Get product ID from catalog
  async getProductId(index: number): Promise<string> {
    const product = this.products.nth(index);

    await expect(product).toBeVisible();

    const testId = await product.getAttribute('data-test');

    if (!testId || !testId.startsWith('product-')) {
      throw new Error('Product ID not found');
    }

    return testId.replace(/^product-/, '');
  }

  // Open a product with a different ID
  async openDifferentProduct(excludedId: string) {
    await expect(this.products.first()).toBeVisible();

    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      const id = await this.getProductId(i);

      if (id !== excludedId) {
        await this.openProduct(i);
        return;
      }
    }

    throw new Error('No different product found');
  }

  // Open product by unique ID
  async openProductById(id: string) {
    await this.page.getByTestId(`product-${id}`).click();

    await expect(
      this.page.getByTestId('product-name')
    ).toBeVisible();
  }

  // Open product by name
  async openProductByName(name: string) {
    const product = this.products.filter({
      hasText: name
    });

    await expect(product).toHaveCount(1);
    await product.click();

    await expect(
      this.page.getByTestId('product-name')
    ).toHaveText(name);
  }

  // Read product details
  async details() {
    const name = (
      await this.page.getByTestId('product-name').innerText()
    ).trim();

    const priceText = (
      await this.page.getByTestId('unit-price').innerText()
    ).trim();

    const price = Number(
      priceText.replace(/[^0-9.]/g, '')
    );

    expect(name.length).toBeGreaterThan(0);
    expect(Number.isFinite(price)).toBe(true);
    expect(price).toBeGreaterThan(0);

    return { name, price };
  }

  // Add product to cart
  async addToCart() {
    await this.page.getByTestId('add-to-cart').click();
  }

  // Open shopping cart
  async openCart() {
    await this.page.getByTestId('nav-cart').click();
  }
}
