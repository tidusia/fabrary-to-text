const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)test)\\.[jt]sx?$",
});
