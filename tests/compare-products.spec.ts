
import { test, expect } from '../fixtures/pages.fixture';

test('TC04 compare two product names and prices', async ({
  productPage,
  page
}) => {
  // Open product catalog
  await productPage.openCatalog();

  // Inspect first five product cards
  const cards = await page
    .locator('[data-test^="product-"]')
    .evaluateAll(elements =>
      elements.slice(0, 5).map(element => ({
        id: element.getAttribute('data-test'),
        text: element.textContent?.trim().slice(0, 80),
        link: element.getAttribute('href'),
        innerLink: element.querySelector('a')?.getAttribute('href')
      }))
    );

  console.log(
    'CATALOG PRODUCTS:',
    JSON.stringify(cards, null, 2)
  );

  // Remember first product ID
  const firstId = await productPage.getProductId(0);

  await productPage.openProduct(0);
  const first = await productPage.details();

  console.log('FIRST PRODUCT:', first);

  // Return to catalog
  await productPage.openCatalog();

  // Select another product
  await productPage.openDifferentProduct(firstId);
  const second = await productPage.details();

  console.log('SECOND PRODUCT:', second);

  // Verify different products
  expect(first.name).not.toEqual(second.name);

  // Verify valid prices
  expect(first.price).toBeGreaterThan(0);
  expect(second.price).toBeGreaterThan(0);

  const difference = Number(
    (first.price - second.price).toFixed(2)
  );

  expect(Number.isFinite(difference)).toBe(true);

  console.log('Price difference:', difference);
});
