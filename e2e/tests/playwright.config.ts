import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: [
    {
      command: "cd sh24-server && pnpm start",
      port: 8080,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "cd sh24-client && pnpm run dev",
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
