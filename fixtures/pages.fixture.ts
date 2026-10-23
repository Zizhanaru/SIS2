import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
type Pages = { loginPage: LoginPage; registerPage: RegisterPage; productPage: ProductPage; cartPage: CartPage; checkoutPage: CheckoutPage };
export const test = base.extend<Pages>({
 loginPage: async ({page}, use) => { await use(new LoginPage(page)); },
 registerPage: async ({page}, use) => { await use(new RegisterPage(page)); },
 productPage: async ({page}, use) => { await use(new ProductPage(page)); },
 cartPage: async ({page}, use) => { await use(new CartPage(page)); },
 checkoutPage: async ({page}, use) => { await use(new CheckoutPage(page)); }
});
export { expect };
