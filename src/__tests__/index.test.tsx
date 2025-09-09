import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Index from "../pages/Index"; // adjust path if needed
import { BrowserRouter } from "react-router-dom";

// Small helper wrapper since component uses react-router
const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Index Page", () => {
  it("renders welcome text", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it("renders table and kanban toggle buttons", () => {
    renderWithRouter(<Index />);
    expect(screen.getByRole("button", { name: /Table/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Kanban/i })).toBeInTheDocument();
  });

  it("toggles view mode when clicking Kanban button", () => {
    renderWithRouter(<Index />);
    const kanbanButton = screen.getByRole("button", { name: /Kanban/i });

    fireEvent.click(kanbanButton);

    // after click, Kanban heading should appear
    expect(screen.getByText(/Pipeline Overview/i)).toBeInTheDocument();
  });

  it("shows search input", () => {
    renderWithRouter(<Index />);
    const input = screen.getByPlaceholderText(/Search deals.../i);
    expect(input).toBeInTheDocument();
  });
});
