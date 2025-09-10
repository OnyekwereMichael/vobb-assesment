// src/__tests__/DealEdit.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DealEdit from "../pages/DealEdit";

// ✅ Mock hooks so the component renders without crashing
vi.mock("@/lib/query", () => ({
  useGetDealByDealId: () => ({
    data: { id: "1", clientId: "c1", productId: "p1", stage: "Contacted" },
    isLoading: false,
    isError: false,
  }),
  useGetStage: () => ({ data: [{ id: "s1", name: "Contacted" }] }),
  useGetClient: () => ({ data: [{ id: "c1", name: "John Doe" }] }),
  useGetProduct: () => ({ data: [{ id: "p1", name: "Product A" }] }),
  useUpdateDeal: () => ({ mutate: vi.fn(), isPending: false }),
}));

// ✅ Mock theme so it doesn’t blow up
vi.mock("@/components/theme/ThemeProvider", () => ({
  useTheme: () => ({ theme: "light" }),
}));

// Helper wrapper
const renderWithRouter = (ui: React.ReactNode) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("DealEdit Page (simple)", () => {
  it("renders heading", () => {
    renderWithRouter(<DealEdit />);
    expect(screen.getByText(/Edit Deal/i)).toBeInTheDocument();
  });

  it("renders update button", () => {
    renderWithRouter(<DealEdit />);
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });
});
