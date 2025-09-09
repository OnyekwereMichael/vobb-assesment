import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DealEdit from "../pages/DealEdit"; // adjust path if needed
import { BrowserRouter } from "react-router-dom";

// ✅ Mock hooks from @/lib/query so test won’t crash
vi.mock("@/lib/query", () => ({
  useGetDealByDealId: () => ({ data: { id: "1", clientId: "", productId: "", stage: "" }, isLoading: false, isError: false }),
  useGetStage: () => ({ data: [{ id: "s1", name: "Contacted" }] }),
  useGetClient: () => ({ data: [{ id: "c1", name: "John Doe" }] }),
  useGetProduct: () => ({ data: [{ id: "p1", name: "Product A" }] }),
  useUpdateDeal: () => ({ mutate: vi.fn(), isPending: false }),
}));

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("DealEdit Page", () => {
  it("renders heading", () => {
    renderWithRouter(<DealEdit />);
    expect(screen.getByText(/Edit Deal/i)).toBeInTheDocument();
  });

  it("renders client, product and stage selects", () => {
    renderWithRouter(<DealEdit />);
    expect(screen.getByLabelText(/Client/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stage/i)).toBeInTheDocument();
  });

  it("renders update button", () => {
    renderWithRouter(<DealEdit />);
    expect(screen.getByRole("button", { name: /Update Deal/i })).toBeInTheDocument();
  });
});
