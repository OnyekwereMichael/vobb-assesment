import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Firebase Auth globally
vi.mock("./src/components/Firebase/firebase", () => ({
  auth: {
    currentUser: {
      displayName: "John Doe",
      email: "john@example.com",
    },
  },
}));

// Mock React Query hooks globally
vi.mock("./src/lib/query", () => ({
  useGetDeals: vi.fn(() => ({ data: [], isLoading: false })),
  useGetClient: vi.fn(() => []),
  useGetProduct: vi.fn(() => []),
  useGetDealByDealId: vi.fn(() => ({ data: null, isLoading: false, isError: false })),
  useGetStage: vi.fn(() => ({ data: [] })),
  useUpdateDeal: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useDeleteDeal: vi.fn(() => ({ mutate: vi.fn() })),
}));

// Mock Zustand stores globally
vi.mock("./src/store/Store", () => ({
  usePreferencesStore: vi.fn(() => ({
    tableColumns: { clientName: true, productName: true, stage: true, createdAt: true },
    kanbanMetadata: { clientName: true, productName: true, createdAt: true },
    toggleTableColumn: vi.fn(),
    toggleKanbanMetadata: vi.fn(),
  })),
  useViewModeStore: vi.fn(() => ({
    viewMode: "table",
    setViewMode: vi.fn(),
  })),
  useKanbanStore: vi.fn(() => ({
    items: [],
    moveItem: vi.fn(),
  })),
}));
