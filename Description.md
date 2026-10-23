# SIS 2 — Test Scenarios Description

## 1. Project Description

This project automates five functional testing scenarios for the Practice Software Testing e-commerce application using Playwright and TypeScript.

The tests use the Page Object Model (POM) design pattern to separate test logic from page interactions.

**Application:** https://practicesoftwaretesting.com/

**Testing type:** End-to-End Functional Testing

**Automation framework:** Playwright

**Programming language:** TypeScript

**Browser:** Chromium

**Total:** 5 test scenarios, implemented as 7 automated tests.

---

## TC01 — User Registration

**Objective:** Verify that a new customer can successfully register an account.

**Preconditions:**
- The application is accessible.
- The user has a unique email address.

**Test Steps:**
1. Open the registration page.
2. Generate unique customer credentials.
3. Fill in the required registration fields.
4. Submit the registration form.
5. Verify that registration was successful.

**Expected Result:** A new customer account is created successfully.

**Automated Test:** `tests/register.spec.ts`

---

## TC02 — User Login

**Objective:** Verify successful login with valid credentials and appropriate error handling for invalid credentials.

### Positive Test

**Preconditions:** A registered customer account exists.

**Test Steps:**
1. Register a new customer.
2. Open the login page.
3. Enter the registered email and password.
4. Click the Login button.
5. Verify that the customer account page opens.

**Expected Result:** The user is successfully authenticated and redirected to the account page.

### Negative Test

**Test Steps:**
1. Open the login page.
2. Enter invalid credentials.
3. Submit the login form.
4. Verify that an error message is displayed.

**Expected Result:** Authentication is rejected and an appropriate error message appears.

**Automated Test:** `tests/login.spec.ts`

---

## TC03 — Product Purchase and Checkout

**Objective:** Verify that a registered customer can add a product to the shopping cart and complete an order.

**Preconditions:**
- The application is accessible.
- Products are available in the catalog.

**Test Steps:**
1. Generate and register a new customer.
2. Log in using the new credentials.
3. Open the product catalog.
4. Select a product.
5. Read the product name and price.
6. Add the product to the shopping cart.
7. Open the cart.
8. Verify the selected product and quantity.
9. Proceed to checkout.
10. Complete the shipping address.
11. Continue to the payment step.
12. Select Cash on Delivery.
13. Complete the order.
14. Verify the order confirmation.

**Expected Result:** The selected product is successfully ordered, and a confirmation message is displayed.

**Automated Test:** `tests/buy-product.spec.ts`

---

## TC04 — Compare Two Products

**Objective:** Verify that the application displays valid names and prices for two different products.

**Preconditions:** At least two different products are available in the catalog.

**Test Steps:**
1. Open the product catalog.
2. Select the first product.
3. Read its name and price.
4. Return to the catalog.
5. Select another product with a different ID.
6. Read its name and price.
7. Verify that the product names are different.
8. Verify that both prices are positive numbers.
9. Calculate the price difference.

**Expected Result:** Two different products are successfully identified, their prices are valid, and the price difference can be calculated.

**Automated Test:** `tests/compare-products.spec.ts`

**Note:** This scenario compares product data using automated assertions. It does not test a dedicated product comparison feature.

---

## TC05 — Password Reset

**Objective:** Verify password reset request processing and invalid email validation.

### Positive Test

**Test Steps:**
1. Open the login page.
2. Navigate to the Forgot Password page.
3. Enter a valid email address.
4. Submit the password reset request.
5. Verify that the API returns HTTP 200 and a successful response.

**Expected Result:** The application successfully processes the password reset request.

**Note:** The automated test verifies request acceptance. It does not verify email delivery or completion of the password change.

### Negative Test

**Test Steps:**
1. Open the Forgot Password page.
2. Enter an invalid email format.
3. Verify that the email field fails browser validation.
4. Verify that the user remains on the password reset page.

**Expected Result:** The invalid email format is rejected.

**Automated Test:** `tests/reset-password.spec.ts`

---

## 2. Test Automation Architecture

The project uses the Page Object Model design pattern.

Page classes encapsulate interactions with the application:

- `RegisterPage` — customer registration
- `LoginPage` — authentication and password reset navigation
- `ProductPage` — catalog navigation and product details
- `CartPage` — shopping cart verification
- `CheckoutPage` — checkout and order confirmation

Custom fixtures provide reusable page objects to the tests.

The user factory generates unique customer credentials for registration and login scenarios.

## 3. Test Execution Results

**Latest verified execution:**

| Metric | Result |
|---|---|
| Browser | Chromium |
| Total automated tests | 7 |
| Passed | 7 |
| Failed | 0 |
| Workers | 1 |
| Execution time | 24.7 seconds |

All seven tests passed in the latest sequential execution.

## 4. Conclusion

The automated tests cover customer registration, login, product purchase, product data comparison, and password reset request validation.

The project demonstrates practical end-to-end testing with Playwright, TypeScript, reusable page objects, fixtures, and assertions.