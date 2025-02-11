export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'active' | 'inactive' | 'lead';
  createdAt: Date;
  updatedAt: Date;
};

export type Proposal = {
  id: string;
  customerId: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type SEOService = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string; // e.g., "1 month", "3 months"
  features: string[];
};

export type ProposalWithCustomer = Proposal & {
  customer: Customer;
};
