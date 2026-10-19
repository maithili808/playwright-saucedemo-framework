import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/saucedemo/env.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  // performance_glitch_user is slow, so give assertions more time
  expect: { timeout: 10_000 },

  use: {
    baseURL: env.baseURL,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', testIgnore: '**/api/**', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  testIgnore: '**/api/**', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   testIgnore: '**/api/**', use: { ...devices['Desktop Safari'] } },
    { name: 'api',      testMatch: '**/api/**/*.spec.ts' },
  ],
});