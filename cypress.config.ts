import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://demoqa.com/",
    env: {
      requestMode: true,
      hideCredentials: true,
      hideCredentialsOptions: {
        headers: ["Authorization"],
        body: ["password"],
        response: ["token"],
      },
    },
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "Cypress API report",
      includeTestContext: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
      overwrite: true,
    },
    screenshotOnRunFailure: true,
    video: false,
  },
});
