// import { create } from 'zustand';
// import { Deal, Client, Product, DashboardPreferences, ViewMode, DealStage } from '@/types';

// interface DealStore {
//   // Data
//   deals: Deal[];
//   clients: Client[];
//   products: Product[];
  
//   // UI State
//   viewMode: ViewMode;
//   preferences: DashboardPreferences;
//   isCreateModalOpen: boolean;
//   isLoading: boolean;
//   error: string | null;
  
//   // Actions
//   setDeals: (deals: Deal[]) => void;
//   setClients: (clients: Client[]) => void;
//   setProducts: (products: Product[]) => void;
//   addDeal: (deal: Omit<Deal, 'id' | 'createdDate'>) => void;
//   updateDeal: (id: string, updates: Partial<Deal>) => void;
//   deleteDeal: (id: string) => void;
//   setViewMode: (mode: ViewMode) => void;
//   updatePreferences: (preferences: Partial<DashboardPreferences>) => void;
//   setCreateModalOpen: (open: boolean) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
  
//   // Helper functions
//   getDealsByStage: (stage: DealStage) => Deal[];
//   getClientById: (id: string) => Client | undefined;
//   getProductById: (id: string) => Product | undefined;
// }

// // Default preferences
// const defaultPreferences: DashboardPreferences = {
//   viewMode: 'table',
//   tableColumns: {
//     clientName: true,
//     productName: true,
//     dealStage: true,
//     createdDate: true,
//     actions: true,
//   },
//   kanbanMetadata: {
//     showClientName: true,
//     showProductName: true,
//     showCreatedDate: true,
//   },
// };

// // Load preferences from localStorage
// const loadPreferences = (): DashboardPreferences => {
//   try {
//     const saved = localStorage.getItem('vobb-dashboard-preferences');
//     return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
//   } catch {
//     return defaultPreferences;
//   }
// };

// // Save preferences to localStorage
// const savePreferences = (preferences: DashboardPreferences) => {
//   try {
//     localStorage.setItem('vobb-dashboard-preferences', JSON.stringify(preferences));
//   } catch (error) {
//     console.warn('Failed to save preferences:', error);
//   }
// };

// export const useDealStore = create<DealStore>((set, get) => ({
//   // Initial state
//   deals: [],
//   clients: [],
//   products: [],
//   viewMode: loadPreferences().viewMode,
//   preferences: loadPreferences(),
//   isCreateModalOpen: false,
//   isLoading: false,
//   error: null,

//   // Actions
//   setDeals: (deals) => set({ deals }),
  
//   setClients: (clients) => set({ clients }),
  
//   setProducts: (products) => set({ products }),
  
//   addDeal: (dealData) => {
//     const newDeal: Deal = {
//       ...dealData,
//       id: crypto.randomUUID(),
//       createdDate: new Date().toISOString(),
//       updatedDate: new Date().toISOString(),
//     };
//     set((state) => ({
//       deals: [newDeal, ...state.deals],
//     }));
//   },
  
//   updateDeal: (id, updates) => {
//     set((state) => ({
//       deals: state.deals.map((deal) =>
//         deal.id === id
//           ? { ...deal, ...updates, updatedDate: new Date().toISOString() }
//           : deal
//       ),
//     }));
//   },
  
//   deleteDeal: (id) => {
//     set((state) => ({
//       deals: state.deals.filter((deal) => deal.id !== id),
//     }));
//   },
  
//   setViewMode: (mode) => {
//     const newPreferences = { ...get().preferences, viewMode: mode };
//     savePreferences(newPreferences);
//     set({ viewMode: mode, preferences: newPreferences });
//   },
  
//   updatePreferences: (updates) => {
//     const newPreferences = { ...get().preferences, ...updates };
//     savePreferences(newPreferences);
//     set({ preferences: newPreferences });
//   },
  
//   setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  
//   setLoading: (loading) => set({ isLoading: loading }),
  
//   setError: (error) => set({ error }),
  
//   // Helper functions
//   getDealsByStage: (stage) => {
//     return get().deals.filter((deal) => deal.stage === stage);
//   },
  
//   getClientById: (id) => {
//     return get().clients.find((client) => client.id === id);
//   },
  
//   getProductById: (id) => {
//     return get().products.find((product) => product.id === id);
//   },
// }));

import { create } from "zustand";

interface ViewModeState {
  viewMode: "table" | "kanban";
  setViewMode: (mode: "table" | "kanban") => void;
}

// Create the Zustand store
export const useViewModeStore = create<ViewModeState>((set) => ({
  viewMode: "table", // default mode
  setViewMode: (mode) => set({ viewMode: mode }),
}));



import { persist } from "zustand/middleware";

interface ViewPreferences {
  tableColumns: Record<string, boolean>;
  kanbanMetadata: Record<string, boolean>;
  toggleTableColumn: (column: string) => void;
  toggleKanbanMetadata: (meta: string) => void;
}

export const usePreferencesStore = create<ViewPreferences>()(
  persist(
    (set) => ({
      tableColumns: {
        clientName: true,
        productName: true,
        stage: true,
        createdAt: true,
      },
      kanbanMetadata: {
        clientName: true,
        productName: true,
        stage: true,
        createdAt: true,
      },
      toggleTableColumn: (column) =>
        set((state) => ({
          tableColumns: {
            ...state.tableColumns,
            [column]: !state.tableColumns[column],
          },
        })),
      toggleKanbanMetadata: (meta) =>
        set((state) => ({
          kanbanMetadata: {
            ...state.kanbanMetadata,
            [meta]: !state.kanbanMetadata[meta],
          },
        })),
    }),
    { name: "deal-preferences" } // saved in localStorage
  )
);

// store/kanbanStore.ts


interface KanbanItem {
  id: string;
  clientId: string;
  productId: string;
  stage: string;
}

interface KanbanState {
  items: KanbanItem[];
  moveItem: (itemId: string, newStage: string) => void;
  setItems: (items: KanbanItem[]) => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
  items: [],

  // ✅ Move item to another stage (optimistic update)
  moveItem: (itemId, newStage) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, stage: newStage } : item
      ),
    })),

  setItems: (items) => set({ items }),
}));
