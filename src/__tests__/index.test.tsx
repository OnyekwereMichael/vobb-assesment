// __tests__/Index.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Index from '../../src/pages/Index';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, beforeEach, expect } from 'vitest';

// Mock Firebase Auth
vi.mock('../../src/components/Firebase/firebase', () => ({
  auth: {
    currentUser: {
      displayName: 'John Doe',
      email: 'john@example.com',
    },
  },
}));

// Mock queries
vi.mock('@/lib/query', () => ({
  useGetDeals: vi.fn(),
  useGetClient: vi.fn(),
  useGetProduct: vi.fn(),
  useUpdateDeal: vi.fn(() => ({ mutate: vi.fn() })),
  useDeleteDeal: vi.fn(() => ({ mutate: vi.fn() })),
}));

// Mock stores
vi.mock('@/store/Store', () => ({
  usePreferencesStore: vi.fn(() => ({
    tableColumns: { clientName: true, productName: true, stage: true, createdAt: true },
    kanbanMetadata: { clientName: true, productName: true, createdAt: true },
    toggleTableColumn: vi.fn(),
    toggleKanbanMetadata: vi.fn(),
  })),
  useViewModeStore: vi.fn(() => ({
    viewMode: 'table',
    setViewMode: vi.fn(),
  })),
  useKanbanStore: vi.fn(() => ({
    items: [],
    moveItem: vi.fn(),
  })),
}));

// Helper to wrap with QueryClientProvider and Router
const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Index Page', () => {
  beforeEach(() => {
    const { useGetDeals, useGetClient, useGetProduct } = require('@/lib/query');

    useGetDeals.mockReturnValue({ data: [{ id: '1', clientId: 'c1', productId: 'p1', stage: 'Lead Generated', createdAt: '2025-01-01' }], isLoading: false });
    useGetClient.mockReturnValue([{ id: 'c1', name: 'Client One' }]);
    useGetProduct.mockReturnValue([{ id: 'p1', name: 'Product One' }]);
  });

  it('renders the welcome message with user name', async () => {
    renderWithProviders(<Index />);
    expect(await screen.findByText(/Welcome, John Doe/)).toBeInTheDocument();
  });

  it('renders deals in table view', async () => {
    renderWithProviders(<Index />);
    expect(await screen.findByText('Client One')).toBeInTheDocument();
    expect(screen.getByText('Product One')).toBeInTheDocument();
    expect(screen.getByText('Lead Generated')).toBeInTheDocument();
  });

  it('switches to kanban view when button clicked', async () => {
    const { useViewModeStore } = require('@/store/Store');
    const setViewModeMock = vi.fn();
    useViewModeStore.mockReturnValue({ viewMode: 'table', setViewMode: setViewModeMock });

    renderWithProviders(<Index />);
    const kanbanBtn = screen.getByRole('button', { name: /Kanban/i });
    fireEvent.click(kanbanBtn);

    await waitFor(() => expect(setViewModeMock).toHaveBeenCalledWith('kanban'));
  });

  it('shows loading when deals are loading', async () => {
    const { useGetDeals } = require('@/lib/query');
    useGetDeals.mockReturnValue({ data: [], isLoading: true });

    renderWithProviders(<Index />);
    expect(screen.getByText(/Loading Vobb Dashboard/)).toBeInTheDocument();
  });
});
