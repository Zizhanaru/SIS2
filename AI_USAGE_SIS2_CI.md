# AI usage report — SIS 2: CI pipeline for Playwright

## Model
- Claude Opus 5.5 (Anthropic), used via claude.ai.

## What AI was used for
- Reading the assignment guide and turning it into ready-to-commit files:
  - `.github/workflows/playwright.yml` — 4-shard matrix + merge-reports job, npm cache, artefacts kept 14 days;
  - `playwright.config.ts` — CI branch (`forbidOnly`, `retries: 2`, `blob` + `junit` reporters, `trace: 'on-first-retry'`);
  - `merge.config.ts` — merges shard blob reports into HTML + JUnit;
  - `.gitignore` additions and the `## CI` README section template.
- Explaining why each setting is needed (see below).

## Prompts
1. "помоги с этим таском: <link to the SIS 2 assignment Google Doc>"
2. "помоги с запуском" (help running it); then shared the SIS 1 repository archive so the files could be adapted to it

## What I did myself
- Kept my existing settings (timeout 60 s, `testIdAttribute: data-test`, practicesoftwaretesting.com baseURL, overridable via `BASE_URL`); CI uses 1 worker per shard because the suite was verified sequentially against a shared demo site.
- Ran the suite locally in CI mode (`CI=true npx playwright test`), checked that `test.only` makes the run fail.
- Pushed to a feature branch, opened a PR, collected run links and timings (1 shard vs 4 shards), filled the README table.

## Explanation of key decisions
- **forbidOnly** — an accidentally committed `test.only` would otherwise run one test and keep CI green.
- **retries: 2 + trace on-first-retry** — flaky tests are reported as flaky, and a trace of the failed attempt is saved.
- **blob reporter + merge job** — every shard writes its own blob; one job merges them into a single HTML report.
- **fullyParallel: true** — lets `--shard` split individual tests, not whole files, so shards are balanced.
- **fail-fast: false** and `if: !cancelled()` — all shards finish and reports are uploaded even when tests fail.
- **concurrency** — an outdated run is cancelled when a new push arrives on the same branch.
- **No browser cache** — the Playwright docs say restoring it takes about as long as downloading; npm cache is used instead.

## Verification
- AI output was reviewed and tested by me; final proof is the green GitHub Actions runs linked in the README.
