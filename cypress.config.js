const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'omzqgc',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      MAILOSAUR_API_KEY: "8JbMCpwdutHSWzh8",
    }
  },
});
