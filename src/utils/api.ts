import type {
  Collector,
  Transaction,
  AccountRequest,
  Alert,
  Zone,
  Report
} from '../types';

// Simulation des appels API avec délai
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Générateur d'ID unique
const generateId = () => Math.random().toString(36).substr(2, 9);

// API Collecteurs
export const collectorsApi = {
  getAll: async (): Promise<Collector[]> => {
    await delay(1000);
    return mockCollectors;
  },

  getById: async (id: string): Promise<Collector> => {
    await delay(500);
    const collector = mockCollectors.find(c => c.id === id);
    if (!collector) throw new Error('Collector not found');
    return collector;
  },

  create: async (data: Partial<Collector>): Promise<Collector> => {
    await delay(1000);
    const newCollector = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    } as Collector;
    mockCollectors.push(newCollector);
    return newCollector;
  },

  update: async (id: string, data: Partial<Collector>): Promise<Collector> => {
    await delay(1000);
    const index = mockCollectors.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Collector not found');
    mockCollectors[index] = { ...mockCollectors[index], ...data };
    return mockCollectors[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(1000);
    const index = mockCollectors.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Collector not found');
    mockCollectors.splice(index, 1);
  },

  getPerformance: async (id: string): Promise<any> => {
    await delay(500);
    return {
      daily: Math.random() * 100,
      weekly: Math.random() * 100,
      monthly: Math.random() * 100,
    };
  },
};

// API Transactions
export const transactionsApi = {
  getAll: async (): Promise<Transaction[]> => {
    await delay(1000);
    return mockTransactions;
  },

  getById: async (id: string): Promise<Transaction> => {
    await delay(500);
    const transaction = mockTransactions.find(t => t.id === id);
    if (!transaction) throw new Error('Transaction not found');
    return transaction;
  },

  create: async (data: Partial<Transaction>): Promise<Transaction> => {
    await delay(1000);
    const newTransaction = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    } as Transaction;
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  update: async (id: string, data: Partial<Transaction>): Promise<Transaction> => {
    await delay(1000);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Transaction not found');
    mockTransactions[index] = { ...mockTransactions[index], ...data };
    return mockTransactions[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(1000);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Transaction not found');
    mockTransactions.splice(index, 1);
  },
};

// API Demandes de compte
export const accountRequestsApi = {
  getAll: async (): Promise<AccountRequest[]> => {
    await delay(1000);
    return mockAccountRequests;
  },

  getById: async (id: string): Promise<AccountRequest> => {
    await delay(500);
    const request = mockAccountRequests.find(r => r.id === id);
    if (!request) throw new Error('Account request not found');
    return request;
  },

  approve: async (id: string): Promise<AccountRequest> => {
    await delay(1000);
    const index = mockAccountRequests.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Account request not found');
    mockAccountRequests[index] = {
      ...mockAccountRequests[index],
      status: 'approved',
      updatedAt: new Date().toISOString(),
    };
    return mockAccountRequests[index];
  },

  reject: async (id: string, reason: string): Promise<AccountRequest> => {
    await delay(1000);
    const index = mockAccountRequests.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Account request not found');
    mockAccountRequests[index] = {
      ...mockAccountRequests[index],
      status: 'rejected',
      verificationNotes: [
        ...(mockAccountRequests[index].verificationNotes || []),
        reason,
      ],
      updatedAt: new Date().toISOString(),
    };
    return mockAccountRequests[index];
  },
};

// API Alertes
export const alertsApi = {
  getAll: async (): Promise<Alert[]> => {
    await delay(500);
    return mockAlerts;
  },

  markAsRead: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockAlerts.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Alert not found');
    mockAlerts[index] = { ...mockAlerts[index], read: true };
  },

  delete: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockAlerts.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Alert not found');
    mockAlerts.splice(index, 1);
  },
};

// API Zones
export const zonesApi = {
  getAll: async (): Promise<Zone[]> => {
    await delay(1000);
    return mockZones;
  },

  getById: async (id: string): Promise<Zone> => {
    await delay(500);
    const zone = mockZones.find(z => z.id === id);
    if (!zone) throw new Error('Zone not found');
    return zone;
  },

  update: async (id: string, data: Partial<Zone>): Promise<Zone> => {
    await delay(1000);
    const index = mockZones.findIndex(z => z.id === id);
    if (index === -1) throw new Error('Zone not found');
    mockZones[index] = { ...mockZones[index], ...data };
    return mockZones[index];
  },
};

// API Rapports
export const reportsApi = {
  generate: async (type: 'daily' | 'weekly' | 'monthly'): Promise<Report> => {
    await delay(2000);
    return {
      id: generateId(),
      type,
      date: new Date().toISOString(),
      data: {
        totalCollections: Math.floor(Math.random() * 1000000),
        successRate: Math.random() * 100,
        topCollectors: mockCollectors.slice(0, 3).map(c => ({
          id: c.id,
          name: c.name,
          amount: Math.floor(Math.random() * 100000),
        })),
        zonePerformance: mockZones.map(z => ({
          zone: z.name,
          amount: Math.floor(Math.random() * 500000),
          target: Math.floor(Math.random() * 1000000),
        })),
      },
    };
  },

  getHistory: async (type: 'daily' | 'weekly' | 'monthly'): Promise<Report[]> => {
    await delay(1000);
    return Array(5).fill(null).map(() => ({
      id: generateId(),
      type,
      date: new Date().toISOString(),
      data: {
        totalCollections: Math.floor(Math.random() * 1000000),
        successRate: Math.random() * 100,
        topCollectors: mockCollectors.slice(0, 3).map(c => ({
          id: c.id,
          name: c.name,
          amount: Math.floor(Math.random() * 100000),
        })),
        zonePerformance: mockZones.map(z => ({
          zone: z.name,
          amount: Math.floor(Math.random() * 500000),
          target: Math.floor(Math.random() * 1000000),
        })),
      },
    }));
  },
};

// Données simulées
const mockCollectors: Collector[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+237 691234567',
    zone: 'Akwa Nord',
    status: 'active',
    performance: 92,
    collectionsToday: 15,
    totalAmount: 450000,
    lastActive: '2024-03-15T10:30:00',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    stats: {
      daily: 95,
      weekly: 88,
      monthly: 92,
    },
    history: [
      { date: '2024-03-15', amount: 150000, success_rate: 95 },
      { date: '2024-03-14', amount: 180000, success_rate: 90 },
      { date: '2024-03-13', amount: 120000, success_rate: 85 },
    ],
  },
  // ... autres collecteurs
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    collector: {
      id: '1',
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    client: {
      id: '1',
      name: 'Boulangerie Express',
      type: 'business',
    },
    amount: 75000,
    status: 'completed',
    date: '2024-03-15T10:15:00',
    zone: 'Akwa Nord',
    paymentMethod: 'cash',
  },
  // ... autres transactions
];

const mockAccountRequests: AccountRequest[] = [
  {
    id: '1',
    clientName: 'Entreprise ABC',
    email: 'contact@abc.com',
    phone: '+237 691234567',
    type: 'business',
    status: 'pending',
    submittedDate: '2024-03-15T08:30:00',
    documents: [
      { type: 'ID', url: 'path/to/id.pdf', verified: false },
      { type: 'Business Registration', url: 'path/to/reg.pdf', verified: false },
      { type: 'Tax Certificate', url: 'path/to/tax.pdf', verified: false },
    ],
    businessInfo: {
      registrationNumber: 'RC123456',
      taxId: 'TX789012',
      address: '123 Rue Principale, Douala',
      industry: 'Retail',
    },
  },
  // ... autres demandes
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Collecteur #2 inactif depuis 30 minutes',
    time: '10:30',
    read: false,
    priority: 'high',
  },
  // ... autres alertes
];

const mockZones: Zone[] = [
  {
    id: '1',
    name: 'Akwa Nord',
    city: 'Douala',
    collectors: ['1', '2'],
    stats: {
      totalCollections: 1250000,
      activeCollectors: 5,
      performance: 88,
    },
  },
  // ... autres zones
];

export const mockData = {
  collectors: mockCollectors,
  transactions: mockTransactions,
  accountRequests: mockAccountRequests,
  alerts: mockAlerts,
  zones: mockZones,
};