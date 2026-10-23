# SIS 2 — Playwright Test Automation

## Project Overview

This project contains automated end-to-end tests for the [Practice Software Testing](https://practicesoftwaretesting.com/) website.

The tests are implemented using **Playwright, TypeScript, and the Page Object Model (POM)** design pattern.

The main objective is to automate common e-commerce user scenarios and verify that the application behaves as expected.

## Technologies Used

- Playwright
- TypeScript
- Node.js
- npm
- Chromium
- Page Object Model (POM)

## Test Scenarios

| Test Case | Scenario | Description |
|---|---|---|
| TC01 | User Registration | Register a new customer with unique credentials |
| TC02 | Login — Positive | Verify successful login with valid credentials |
| TC02 | Login — Negative | Verify error handling for invalid credentials |
| TC03 | Product Purchase | Add a product to the cart and complete checkout |
| TC04 | Product Comparison | Compare the names and prices of two different products |
| TC05 | Password Reset — Positive | Verify a successful password reset request |
| TC05 | Password Reset — Negative | Verify rejection of an invalid email format |

## Project Structure

```text
SIS 1/
├── data/
│   └── user.factory.ts
├── fixtures/
│   └── pages.fixture.ts
├── pages/
│   ├── register.page.ts
│   ├── login.page.ts
│   ├── product.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
├── tests/
│   ├── register.spec.ts
│   ├── login.spec.ts
│   ├── buy-product.spec.ts
│   ├── compare-products.spec.ts
│   └── reset-password.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── Description.md
├── Prompt.md
└── Review.md
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

Replace the placeholders with the actual repository URL and folder name.

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests sequentially:

```bash
npx playwright test --workers=1
```

Run tests with a visible browser:

```bash
npx playwright test --headed --workers=1
```

Run a specific test file:

```bash
npx playwright test tests/buy-product.spec.ts
```

Check TypeScript:

```bash
npm run typecheck
```

## Test Reports

Playwright generates an HTML report after test execution.

To open the report:

```bash
npx playwright show-report
```

## Test Execution Results

The latest verified sequential execution completed successfully:

**7 tests passed out of 7.**

- Browser: Chromium
- Workers: 1
- Execution time: 24.7 seconds
- Result: All tests passed

These results describe one verified execution and do not guarantee that future runs will always pass.

## Test Design

The project follows the Page Object Model pattern to separate test scenarios from page interactions.

Custom Playwright fixtures provide reusable page objects.

The user factory generates unique registration credentials, reducing conflicts between test executions.

Assertions verify navigation, user feedback, product details, checkout confirmation, and password reset behavior.

## Additional Documentation

- `Description.md` — test scenario descriptions
- `Prompt.md` — AI assistance and development prompts
- `Review.md` — identified issues, corrections, and code review notes

## Notes

The tests run against a publicly available practice application. Test results may depend on application availability, network conditions, and changes to the website.
