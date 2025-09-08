export interface ICreateDeals {
  clientId: string;
  productId: string;
  stage: string;
  createdAt?: string; // optional
  amount?: number;    // optional
}

export interface IUpdateDeals {
  clientId?: string;
  productId?: string;
  stage?: string;
  createdAt?: string; // optional
  amount?: number;    // optional
}
