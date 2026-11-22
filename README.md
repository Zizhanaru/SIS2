# SIS 2 — Playwright Test Automation

[![Playwright Tests](https://github.com/Zizhanaru/SIS2/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/Zizhanaru/SIS2/actions/workflows/playwright.yml)

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

git clone https://github.com/Zizhanaru/SIS2.git
cd SIS2
npm install
npx playwright install
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

## CI

[![Playwright Tests](https://github.com/Zizhanaru/SIS2/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/Zizhanaru/SIS2/actions/workflows/playwright.yml)

**CI system:** GitHub Actions. It is built into GitHub, where the repository already lives, needs no server of its own, is free for public repositories and supports matrices for sharding.

**Pipeline** (`.github/workflows/playwright.yml`):
- runs on every push and pull request (plus manual `workflow_dispatch`);
- `npm ci` with the npm cache (`actions/setup-node`, `cache: npm`), Chromium installed with system dependencies;
- the full Playwright suite (no `--grep`/filters) split into 4 shards (`--shard=i/4`) running in parallel;
- the `merge-reports` job merges the shards' blob reports into one HTML report and one JUnit file;
- artefacts: `playwright-report` (HTML), `test-results-N` (traces, screenshots, videos, JUnit), `junit-report`; kept for 14 days.

**CI settings** (`playwright.config.ts`, when `CI=true`): `forbidOnly: true`, `retries: 2`, reporters `list`, `blob`, `junit`, `trace: 'on-first-retry'`.

**Known limitation:** practicesoftwaretesting.com is protected by Cloudflare. On GitHub-hosted runners it sometimes replaces the shop with a "Performing security verification" human check. TC03 detects this page, retries 3 times and, if the runner is still blocked, is reported as **skipped** with that reason (not as a failure). The check is not bypassed. Locally the test runs in full.

### Runtime

| Configuration | Jobs | Total run time (wall clock) | Slowest test job | Merge reports job | Billed time (sum of jobs) | Run |
| --- | --- | --- | --- | --- | --- | --- |
| 1 job, no sharding (before) | 1 + merge | **1 min 27 s** | 1 min 11 s | 9 s | 1 min 20 s | [checks for 23d0450](https://github.com/Zizhanaru/SIS2/commit/23d0450/checks) |
| 4 shards + merge (after) | 4 + merge | **1 min 44 s** | 1 min 13 s (shard 2/4) | 24 s | 4 min 0 s | [checks for f9368cd](https://github.com/Zizhanaru/SIS2/commit/f9368cd/checks) |

Single run of each variant on the `ci-pipeline` branch (push event, GitHub-hosted `ubuntu-latest`). Workflow-run pages are reachable from the commit checks pages linked above.

**Conclusion:** for this suite sharding did **not** make CI faster: the total went from 1 min 27 s to 1 min 44 s, and billed minutes tripled. The suite has only 7 tests, so most of every job is fixed setup (checkout, `npm ci`, Chromium install ≈ 30–40 s — shard 3/4 with two quick tests took 34 s in total). Splitting 7 tests into 4 jobs repeats that setup 4 times, and the slowest shard (registration + login tests against the public demo site) still takes about as long as the whole suite in one job; merging 4 blob reports also takes longer (24 s vs 9 s). Sharding is kept because the assignment requires it and it scales: as the suite grows, the test time per shard drops roughly by 4× while the setup overhead stays constant.

A later 4-shard run on main (after merge) took 1 min 12 s, so run-to-run variance on GitHub runners is about ±30 s; with 7 tests the difference between the two variants is within that noise.

### Running locally

    npm ci
    npx playwright install --with-deps chromium
    CI=true npx playwright test

## Additional Documentation

- `Description.md` — test scenario descriptions
- `Prompt.md` — AI assistance and development prompts
- `Review.md` — identified issues, corrections, and code review notes
- `AI_USAGE_SIS2_CI.md` — AI usage for the CI pipeline (model, prompts, explanations)

## Notes

The tests run against a publicly available practice application. Test results may depend on application availability, network conditions, and changes to the website.
