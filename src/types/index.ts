export type DealStage = 
  | 'Lead Generated'
  | 'Contacted'
  | 'Application Submitted'
  | 'Application Under Review'
  | 'Deal Finalized'
  | 'Payment Confirmed'
  | 'Completed'
  | 'Lost';

export interface Deal {
  id: string;
  clientId: string;
  productId: string;
  stage: DealStage;
  createdDate: string;
  updatedDate?: string;
  value?: number;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
}

export type ViewMode = 'table' | 'kanban';

export interface DashboardPreferences {
  viewMode: ViewMode;
  tableColumns: {
    clientName: boolean;
    productName: boolean;
    dealStage: boolean;
    createdDate: boolean;
    actions: boolean;
  };
  kanbanMetadata: {
    showClientName: boolean;
    showProductName: boolean;
    showCreatedDate: boolean;
  };
}

export interface DealFormData {
  clientId: string;
  productId: string;
  stage: DealStage;
  value?: number;
  notes?: string;
}