// setupTests.ts (or .js)

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Automatically unmount React trees after each test to prevent leaks
afterEach(() => {
  cleanup();
});
