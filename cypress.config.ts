import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      requestMode: true,
      hideCredentials: true,
    },
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {},
  },
});
