import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,            // shards split tests, not whole files
  timeout: 60000,
  expect: { timeout: 10000 },
  forbidOnly: isCI,               // a forgotten test.only fails CI
  retries: isCI ? 2 : 0,          // a flaky test is marked flaky, not red
  workers: isCI ? 1 : undefined,  // shards give the parallelism; 1 worker per shard
                                  // matches the verified sequential local run (shared demo site)
  reporter: isCI
    ? [
        ['list'],
        ['blob'],                                       // merged across shards
        ['junit', { outputFile: 'reports/junit.xml' }],
      ]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
