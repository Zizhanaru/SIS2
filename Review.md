# SIS 2 — Code Review and Improvements

## 1. Overview

This document describes the main issues identified and corrected during the development of automated tests for the Practice Software Testing application.

The project uses Playwright, TypeScript, and the Page Object Model (POM) design pattern.

AI assistance was used during development, but suggested solutions were reviewed and validated through actual test execution.

## 2. Issues Identified and Fixed

### Issue 1 — Missing House Number During Registration

**Problem:**

The registration process initially did not provide all necessary address information.

**Impact:**

Incomplete customer information could cause registration or later checkout problems.

**Solution:**

The registration page object was updated to include the house number field.

**Improvement:**

The registration workflow now provides more complete customer information.

### Issue 2 — Reusing a Shared Customer Account

**Problem:**

The login and purchase tests initially used a shared account with fixed credentials.

After multiple unsuccessful login attempts, the application displayed an account lockout message.

**Impact:**

The positive login and purchase tests could fail even when their main functionality was working correctly.

**Solution:**

The tests were updated to register a new customer using `freshUser()` before authentication.

**Improvement:**

Each test can use independent credentials, reducing conflicts caused by shared account state.

### Issue 3 — Hardcoded Test Password

**Problem:**

The user factory originally contained a fixed password.

**Impact:**

A hardcoded password was unnecessary and reduced the flexibility of test data generation.

**Solution:**

The factory was updated to generate a random password using Node.js cryptographic functionality.

**Improvement:**

New test users receive unique credentials.

### Issue 4 — Incorrect Product Locator

**Problem:**

The original product locator was:

```typescript id="8jzq1v"
this.page.locator('[data-test^="product-"]');
```

This selector matched product cards as well as nested elements such as `product-name` and `product-price`.

**Impact:**

The product comparison test sometimes selected the same product twice.

**Solution:**

The locator was changed to:

```typescript id="7n6dca"
this.page.locator('a[data-test^="product-"]');
```

**Improvement:**

The locator now targets product links rather than unrelated nested elements.

### Issue 5 — Hardcoded Product IDs

**Problem:**

The product comparison test originally depended on specific product IDs.

**Impact:**

The test could fail when those IDs were not present in the catalog.

**Solution:**

The test was updated to identify products from the currently loaded catalog and select another product with a different ID.

**Improvement:**

The test is less dependent on fixed catalog data.

### Issue 6 — Checkout Button Disabled

**Problem:**

During full test execution, TC03 timed out while attempting to click the `proceed-3` button.

The button was disabled.

**Investigation:**

The checkout form was inspected using Playwright. The diagnostic output showed that the `house_number` field was empty.

**Solution:**

The CheckoutPage class was updated to fill the shipping address before continuing to payment.

```typescript id="8qifg4"
await this.page.getByTestId('house_number').fill('12');

await expect(
  this.page.getByTestId('proceed-3')
).toBeEnabled();
```

**Improvement:**

The test explicitly completes the address information and verifies that the next step is available.

### Issue 7 — Weak Password Reset Assertions

**Problem:**

The initial password reset test relied on page text that could appear without a successful reset request.

**Impact:**

The test could pass without confirming that the request was processed successfully.

**Solution:**

The positive test was improved to inspect the password reset API response and verify HTTP status 200 and `success: true`.

The negative test checks browser validation for an invalid email format.

**Improvement:**

Assertions now verify more meaningful application behavior.

### Issue 8 — TypeScript Configuration Error

**Problem:**

An unsupported `ignoreDeprecations` value was added to `tsconfig.json`.

**Impact:**

The TypeScript type-checking command failed with error TS5103.

**Solution:**

The unsupported configuration entry was removed.

**Improvement:**

The project successfully passes:

```bash id="l5y72h"
npm run typecheck
```

## 3. Code Review Summary

| Area | Problem | Improvement |
|---|---|---|
| Registration | Incomplete address data | Added house number |
| Authentication | Shared account became locked | Used unique test accounts |
| Test Data | Fixed password | Generated random passwords |
| Product Selection | Overly broad locator | Targeted product links |
| Product Comparison | Fixed product IDs | Selected products dynamically |
| Checkout | Disabled next-step button | Completed shipping address |
| Password Reset | Weak assertions | Verified API response and input validation |
| TypeScript | Invalid compiler option | Corrected configuration |

## 4. Final Test Execution

After the corrections, the full test suite was executed using:

```bash id="j66ay4"
npm run typecheck
npx playwright test --headed --workers=1
```

**Verified results:**

| Metric | Result |
|---|---|
| Browser | Chromium |
| Automated tests | 7 |
| Passed | 7 |
| Failed | 0 |
| Workers | 1 |
| Execution time | 24.7 seconds |

All seven tests passed during the final verified sequential execution.

## 5. Lessons Learned

The development process highlighted several important software testing practices:

1. Use precise and reliable locators.
2. Avoid dependencies on shared test accounts.
3. Generate independent test data.
4. Verify actual application behavior instead of static text.
5. Investigate disabled buttons and missing form data.
6. Run tests individually and as a complete suite.
7. Review AI-generated code before accepting it.
8. Use TypeScript checks and Playwright reports to validate changes.

## 6. Conclusion

The project was improved through iterative testing, debugging, and code review.

The final implementation uses reusable page objects, independent test data, stronger assertions, and more reliable element selection.

The latest verified execution completed with **7 out of 7 tests passing**.