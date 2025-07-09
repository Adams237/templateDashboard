// Types communs pour l'application
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar: string;
}

export interface Collector {
  id: string;
  name: string;
  email: string;
  phone: string;
  zone: string;
  status: 'active' | 'inactive';
  performance: number;
  collectionsToday: number;
  totalAmount: number;
  lastActive: string;
  avatar: string;
  stats: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  history: {
    date: string;
    amount: number;
    success_rate: number;
  }[];
}

export interface Transaction {
  id: string;
  collector: {
    id: string;
    name: string;
    avatar: string;
  };
  client: {
    id: string;
    name: string;
    type: 'business' | 'individual';
  };
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  zone: string;
  paymentMethod: 'cash' | 'mobile_money' | 'card';
  notes?: string;
  attachments?: string[];
}

export interface AccountRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  type: 'business' | 'individual';
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  documents: {
    type: string;
    url: string;
    verified: boolean;
  }[];
  businessInfo?: {
    registrationNumber: string;
    taxId: string;
    address: string;
    industry: string;
  };
  verificationNotes?: string[];
  assignedTo?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  link?: {
    text: string;
    url: string;
  };
}

export interface Zone {
  id: string;
  name: string;
  city: string;
  collectors: string[];
  stats: {
    totalCollections: number;
    activeCollectors: number;
    performance: number;
  };
}

export interface Report {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  date: string;
  data: {
    totalCollections: number;
    successRate: number;
    topCollectors: {
      id: string;
      name: string;
      amount: number;
    }[];
    zonePerformance: {
      zone: string;
      amount: number;
      target: number;
    }[];
  };
}

export interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    sessionTimeout: number;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
  };
}

export interface FilterOptions {
  date: {
    start: string;
    end: string;
  };
  status: string[];
  zones: string[];
  collectors: string[];
  amount: {
    min: number;
    max: number;
  };
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TableColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (info: { row: T }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}