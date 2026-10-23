
import { test, expect } from '../fixtures/pages.fixture';
import { existingCustomer } from '../data/user.factory';

test('TC05 positive: password reset request succeeds', async ({
  loginPage,
  page
}) => {
  await loginPage.open();
  await loginPage.forgotPassword();

  // Wait for the password reset API response
  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/users/forgot-password') &&
      response.request().method() === 'POST'
  );

  await loginPage.requestReset(existingCustomer.email);

  const response = await responsePromise;

  // Verify successful HTTP response
  expect(response.status()).toBe(200);

  // Verify successful API result
  const responseBody = await response.json();
  expect(responseBody.success).toBe(true);
});

test('TC05 negative: invalid email is rejected', async ({
  loginPage,
  page
}) => {
  await loginPage.open();
  await loginPage.forgotPassword();

  await loginPage.requestReset('not-an-email');

  // Verify invalid email format
  const emailIsValid = await page
    .getByTestId('email')
    .evaluate((input: HTMLInputElement) => input.validity.valid);

  expect(emailIsValid).toBe(false);

  // Verify user remains on password reset page
  await expect(page).toHaveURL(/forgot/);
});
