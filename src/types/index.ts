export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Client {
  id: string;
  name: string;
  website: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface SEOReport {
  id: string;
  clientId: string;
  createdAt: string;
  metrics: {
    organicTraffic: number;
    keywords: number;
    backlinks: number;
    errors: number;
  };
  recommendations: string[];
  status: 'draft' | 'published';
}

export interface Proposal {
  id: string;
  clientId: string;
  createdAt: string;
  services: {
    name: string;
    description: string;
    price: number;
  }[];
  totalPrice: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  validUntil: string;
  terms?: string;
}
