import { Deal, Client, Product } from '../types';

// Mock data
export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    company: 'Acme Corp',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 'client-2',
    name: 'TechStart Solutions',
    email: 'hello@techstart.com',
    company: 'TechStart Inc',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 'client-3',
    name: 'Global Enterprises',
    email: 'info@global-ent.com',
    company: 'Global Enterprises Ltd',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'client-4',
    name: 'Innovation Labs',
    email: 'contact@innovation.com',
    company: 'Innovation Labs LLC',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 'client-5',
    name: 'Future Systems',
    email: 'sales@future-sys.com',
    company: 'Future Systems Corp',
    phone: '+1 (555) 567-8901',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Enterprise CRM Suite',
    description: 'Comprehensive customer relationship management solution',
    price: 99999,
    category: 'Software',
  },
  {
    id: 'product-2',
    name: 'Analytics Dashboard Pro',
    description: 'Advanced business intelligence and analytics platform',
    price: 49999,
    category: 'Analytics',
  },
  {
    id: 'product-3',
    name: 'Marketing Automation Hub',
    description: 'Complete marketing automation and campaign management',
    price: 79999,
    category: 'Marketing',
  },
  {
    id: 'product-4',
    name: 'Cloud Infrastructure Package',
    description: 'Scalable cloud hosting and infrastructure services',
    price: 149999,
    category: 'Infrastructure',
  },
  {
    id: 'product-5',
    name: 'Security & Compliance Suite',
    description: 'Enterprise-grade security and compliance tools',
    price: 89999,
    category: 'Security',
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    clientId: 'client-1',
    productId: 'product-1',
    stage: 'Lead Generated',
    createdDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    value: 99999,
    notes: 'Initial contact made through website form',
  },
  {
    id: 'deal-2',
    clientId: 'client-2',
    productId: 'product-2',
    stage: 'Contacted',
    createdDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    value: 49999,
    notes: 'Follow-up call scheduled for next week',
  },
  {
    id: 'deal-3',
    clientId: 'client-3',
    productId: 'product-3',
    stage: 'Application Submitted',
    createdDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    value: 79999,
    notes: 'Application submitted with all required documentation',
  },
  {
    id: 'deal-4',
    clientId: 'client-4',
    productId: 'product-4',
    stage: 'Application Under Review',
    createdDate: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
    value: 149999,
    notes: 'Technical review in progress, expecting feedback soon',
  },
  {
    id: 'deal-5',
    clientId: 'client-5',
    productId: 'product-5',
    stage: 'Deal Finalized',
    createdDate: new Date(Date.now() - 86400000 * 20).toISOString(), // 20 days ago
    value: 89999,
    notes: 'Contract signed, awaiting payment processing',
  },
  {
    id: 'deal-6',
    clientId: 'client-1',
    productId: 'product-2',
    stage: 'Payment Confirmed',
    createdDate: new Date(Date.now() - 86400000 * 25).toISOString(), // 25 days ago
    value: 49999,
    notes: 'Payment confirmed, implementation scheduled',
  },
  {
    id: 'deal-7',
    clientId: 'client-2',
    productId: 'product-1',
    stage: 'Completed',
    createdDate: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
    value: 99999,
    notes: 'Successfully delivered and customer onboarded',
  },
  {
    id: 'deal-8',
    clientId: 'client-3',
    productId: 'product-4',
    stage: 'Lost',
    createdDate: new Date(Date.now() - 86400000 * 35).toISOString(), // 35 days ago
    value: 149999,
    notes: 'Customer chose competitor solution',
  },
];

// Mock API functions (simulate json-server behavior)
export const mockApi = {
  // Deals
  getDeals: async (): Promise<Deal[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return [...mockDeals];
  },

  createDeal: async (deal: Omit<Deal, 'id' | 'createdDate'>): Promise<Deal> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newDeal: Deal = {
      ...deal,
      id: `deal-${Date.now()}`,
      createdDate: new Date().toISOString(),
    };
    mockDeals.push(newDeal);
    return newDeal;
  },

  updateDeal: async (id: string, updates: Partial<Deal>): Promise<Deal> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockDeals.findIndex(deal => deal.id === id);
    if (index === -1) throw new Error('Deal not found');
    
    mockDeals[index] = { ...mockDeals[index], ...updates };
    return mockDeals[index];
  },

  deleteDeal: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockDeals.findIndex(deal => deal.id === id);
    if (index === -1) throw new Error('Deal not found');
    
    mockDeals.splice(index, 1);
  },

  // Clients
  getClients: async (): Promise<Client[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockClients];
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockProducts];
  },
};