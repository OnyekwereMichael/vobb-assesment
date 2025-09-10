// setupTests.ts
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

expect.extend(matchers);
afterEach(() => {
  cleanup();
});

// global wrapper for all tests
const queryClient = new QueryClient();
(global as any).renderWithQuery = (ui: React.ReactNode) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
