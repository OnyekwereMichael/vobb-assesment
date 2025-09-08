import { create } from 'zustand';
import { Deal, Client, Product } from '../types';

// Mock data
const mockClients: Client[] = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', phone: '+1234567890' },
  { id: '2', name: 'TechStart Inc', email: 'hello@techstart.com', phone: '+1234567891' },
  { id: '3', name: 'Global Solutions', email: 'info@globalsol.com', phone: '+1234567892' },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Enterprise Package', price: 10000 },
  { id: '2', name: 'Professional Plan', price: 5000 },
  { id: '3', name: 'Starter Kit', price: 2500 },
];

const mockDeals: Deal[] = [
  {
    id: '1',
    clientId: '1',
    productId: '1',
    stage: 'Lead Generated',
    value: 10000,
    notes: 'Initial contact made',
    createdDate: '2024-01-15T10:30:00Z',
    updatedDate: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    clientId: '2',
    productId: '2',
    stage: 'Contacted',
    value: 5000,
    notes: 'Follow-up call scheduled',
    createdDate: '2024-01-14T14:20:00Z',
    updatedDate: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    clientId: '3',
    productId: '3',
    stage: 'Application Submitted',
    value: 2500,
    notes: 'Waiting for approval',
    createdDate: '2024-01-13T09:15:00Z',
    updatedDate: '2024-01-13T09:15:00Z'
  }
];

interface MockDealStore {
  deals: Deal[];
  clients: Client[];
  products: Product[];
  isCreateModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setDeals: (deals: Deal[]) => void;
  setClients: (clients: Client[]) => void;
  setProducts: (products: Product[]) => void;
  addDeal: (deal: Omit<Deal, 'id' | 'createdDate' | 'updatedDate'>) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  setCreateModalOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Helper functions
  getDealsByStage: (stage: string) => Deal[];
  getClientById: (id: string) => Client | undefined;
  getProductById: (id: string) => Product | undefined;
}

export const useMockDealStore = create<MockDealStore>((set, get) => ({
  deals: mockDeals,
  clients: mockClients,
  products: mockProducts,
  isCreateModalOpen: false,
  isLoading: false,
  error: null,

  setDeals: (deals) => set({ deals }),
  setClients: (clients) => set({ clients }),
  setProducts: (products) => set({ products }),

  addDeal: (dealData) => {
    const newDeal: Deal = {
      ...dealData,
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    set((state) => ({ deals: [newDeal, ...state.deals] }));
  },

  updateDeal: (id, updates) => {
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id
          ? { ...deal, ...updates, updatedDate: new Date().toISOString() }
          : deal
      ),
    }));
  },

  deleteDeal: (id) => {
    set((state) => ({ deals: state.deals.filter((deal) => deal.id !== id) }));
  },

  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  getDealsByStage: (stage) => {
    return get().deals.filter((deal) => deal.stage === stage);
  },

  getClientById: (id) => {
    return get().clients.find((client) => client.id === id);
  },

  getProductById: (id) => {
    return get().products.find((product) => product.id === id);
  },
}));