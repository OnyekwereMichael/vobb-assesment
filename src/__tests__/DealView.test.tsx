import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { DealView } from "../pages/DealView"; 


vi.mock("@/lib/query", () => ({
  useGetDealByDealId: vi.fn(),
  useDeleteDeal: vi.fn(() => ({ mutate: vi.fn() })),
  useGetClient: vi.fn(() => ({ data: [] })),
  useGetProduct: vi.fn(() => ({ data: [] })),
}));

const { useGetDealByDealId } = require("@/lib/query");

describe("DealView", () => {
  it("renders loading state", () => {
    useGetDealByDealId.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <BrowserRouter>
        <DealView />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading deal.../i)).toBeInTheDocument();
  });

  it("renders not found state", () => {
    useGetDealByDealId.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <BrowserRouter>
        <DealView />
      </BrowserRouter>
    );

    expect(screen.getByText(/Deal Not Found/i)).toBeInTheDocument();
  });

  it("renders deal details", () => {
    useGetDealByDealId.mockReturnValue({
      data: {
        id: 1,
        stage: "Open",
        createdDate: "2025-09-09",
        clientId: "123",
        productId: "456",
      },
      isLoading: false,
      isError: false,
    });

    render(
      <BrowserRouter>
        <DealView />
      </BrowserRouter>
    );

    expect(screen.getByText(/Deal Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Deal Overview/i)).toBeInTheDocument();
  });
});
