import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Index from "../pages/Index"; // adjust path
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest"

// Helper to wrap with Router + QueryClient
const renderWithProviders = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,   // ✅ avoids retries in test
      },
    },
  });

  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe("Index Page", () => {
  it("renders welcome text", () => {
    renderWithProviders(<Index />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it("renders table and kanban toggle buttons", () => {
    renderWithProviders(<Index />);
    expect(screen.getByRole("button", { name: /Table/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Kanban/i })).toBeInTheDocument();
  });

  it("toggles view mode when clicking Kanban button", () => {
    renderWithProviders(<Index />);
    const kanbanButton = screen.getByRole("button", { name: /Kanban/i });

    fireEvent.click(kanbanButton);

    // after click, Kanban heading should appear
    expect(screen.getByText(/Pipeline Overview/i)).toBeInTheDocument();
  });
  
it("shows search input", () => {
  renderWithProviders(<Index />);
  const input = screen.getByPlaceholderText(/Search/i); // looser match
  expect(input).toBeInTheDocument();
});

});
