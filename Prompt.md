# SIS 2 — AI Assistance and Prompt Documentation

## 1. AI Tool Used

**AI Tool:** ChatGPT (OpenAI)

**Purpose:** Assistance with Playwright test automation development using TypeScript and the Page Object Model (POM).

ChatGPT was used to support code development, explain errors, suggest improvements, and help troubleshoot failing tests.

The developer reviewed the suggested code, executed tests locally, and used actual test results to identify further issues.

## 2. Prompt Examples

The following prompts are reconstructed examples representing the tasks discussed during development. They are not claimed to be verbatim transcripts.

### Prompt 1 — Project Structure

**Example prompt:**

"Help me create a Playwright test automation project using TypeScript and the Page Object Model pattern. The project should include reusable page objects, fixtures, and automated test scenarios."

**AI Assistance:**

Suggested a project structure separating test files, page objects, fixtures, and test data.

### Prompt 2 — User Registration

**Example prompt:**

"Help me automate customer registration on Practice Software Testing using Playwright and TypeScript. I need to generate unique customer credentials and verify successful registration."

**AI Assistance:**

Helped structure the registration scenario and use a factory to generate unique test users.

### Prompt 3 — Login Testing

**Example prompt:**

"Create positive and negative login tests using Playwright. The positive test should verify successful authentication, and the negative test should verify an error message for invalid credentials."

**AI Assistance:**

Helped implement login scenarios and later replace a shared test account with newly registered users.

### Prompt 4 — Product Purchase

**Example prompt:**

"Help me automate an e-commerce purchase scenario. The test should log in, select a product, add it to the cart, verify the cart, and complete checkout."

**AI Assistance:**

Helped develop the purchase workflow using reusable ProductPage, CartPage, and CheckoutPage classes.

### Prompt 5 — Product Comparison

**Example prompt:**

"My Playwright test opens the same product twice when I try to compare two different products. Help me investigate the selectors and fix the test."

**AI Assistance:**

Helped diagnose a locator that matched product cards as well as nested product-name and product-price elements.

The selector was updated to target product links:

```typescript
this.page.locator('a[data-test^="product-"]');
```

### Prompt 6 — Password Reset

**Example prompt:**

"Help me create positive and negative password reset tests. I want to verify the reset request response and check that an invalid email format is rejected."

**AI Assistance:**

Helped strengthen the positive test by checking the password reset API response rather than relying on static page text.

### Prompt 7 — Checkout Debugging

**Example prompt:**

"My Playwright checkout test times out because the proceed-3 button is disabled. Help me identify which form fields are missing."

**AI Assistance:**

Suggested inspecting checkout input values and the button state.

The investigation revealed an empty house number field. The checkout page object was updated to complete the shipping address before proceeding.

## 3. AI-Generated Code Review

AI suggestions were not assumed to be correct automatically.

The development process included:

1. Reviewing suggested TypeScript code.
2. Running `npm run typecheck`.
3. Executing individual Playwright tests.
4. Inspecting error messages and screenshots.
5. Updating locators and test logic based on observed behavior.
6. Running the complete test suite.

Several initial approaches required corrections after actual execution.

## 4. Testing and Verification

The following commands were used:

```bash
npm run typecheck
npx playwright test tests/compare-products.spec.ts --headed --workers=1
npx playwright test tests/buy-product.spec.ts --headed --workers=1
npx playwright test --headed --workers=1
npx playwright show-report
```

**Final verified test run:**

- 7 tests passed
- 0 tests failed
- Chromium browser
- 1 worker
- Total execution time: 24.7 seconds

## 5. Limitations of AI Assistance

AI-generated suggestions sometimes relied on assumptions about the application's HTML structure and checkout behavior.

These assumptions were checked through local test execution and debugging.

AI assistance was used as a development support tool. Final test results were verified using Playwright.

