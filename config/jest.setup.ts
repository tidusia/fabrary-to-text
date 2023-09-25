import { format } from "util";

// Mark all console.errors as failing tests
// eslint-disable-next-line no-console
const originalError = console.error;
global.console.error = function (...args: any) {
  originalError.call(console, ...args);
  throw new Error(format(...args));
};

// Up the timeout limit per test for CI
jest.setTimeout(10000);
