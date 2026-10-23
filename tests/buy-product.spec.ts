
import { test } from '../fixtures/pages.fixture';
import { freshUser } from '../data/user.factory';
import { RegisterPage } from '../pages/register.page';

test('TC03 add product and complete checkout', async ({
  page,
  loginPage,
  productPage,
  cartPage,
  checkoutPage
}) => {
  // 1. Generate a new customer
  const user = freshUser();

  // 2. Register the customer
  const registerPage = new RegisterPage(page);

  await registerPage.open();
  await registerPage.register(user);
  await registerPage.expectRegistered();

  // 3. Log in with the new account
  await loginPage.open();
  await loginPage.signIn(user.email, user.password);
  await loginPage.expectAccount();

  // 4. Select a product
  await productPage.openCatalog();
  await productPage.openProduct(0);

  const product = await productPage.details();

  // 5. Add product to cart
  await productPage.addToCart();
  await productPage.openCart();

  // 6. Verify shopping cart
  await cartPage.expectItem(product.name);
  await cartPage.expectQuantityOne();

  // 7. Complete checkout
  await cartPage.checkout();
  await checkoutPage.finish();

  // 8. Verify order confirmation
  await checkoutPage.expectConfirmation();
});
