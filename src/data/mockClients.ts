// Types for client data
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment';
  status: 'completed' | 'pending' | 'failed';
  collector?: {
    id: string;
    name: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
}

export interface CollectionSchedule {
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  timeSlot: string;
  collector: {
    id: string;
    name: string;
  };
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'paused' | 'cancelled';
}

export interface ClientContact {
  type: 'phone' | 'email' | 'address';
  value: string;
  isPrimary: boolean;
  verified: boolean;
}

export interface ClientDocument {
  type: 'ID' | 'proof_address' | 'business_registration' | 'tax_document';
  number: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'pending';
  verifiedBy?: string;
}

export interface ClientActivity {
  id: string;
  date: string;
  type: 'account_update' | 'contact_update' | 'schedule_change' | 'complaint' | 'feedback';
  description: string;
  status: 'resolved' | 'pending' | 'in_progress';
  handledBy?: string;
}

export interface Client {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  businessName?: string;
  type: 'individual' | 'business';
  status: 'active' | 'inactive' | 'suspended';
  riskLevel: 'low' | 'medium' | 'high';
  joinDate: string;
  lastActivity: string;
  contacts: ClientContact[];
  documents: ClientDocument[];
  collectionSchedules: CollectionSchedule[];
  transactions: Transaction[];
  activities: ClientActivity[];
  metrics: {
    totalCollected: number;
    averageTransaction: number;
    successRate: number;
    missedCollections: number;
    lastCollectionDate: string;
  };
  preferences: {
    language: string;
    communicationChannel: string[];
    notificationPreferences: string[];
  };
  notes: string;
  tags: string[];
}

// Mock data for clients
export const mockClients: Client[] = [
  {
    id: 'CLT001',
    code: 'BK2025001',
    firstName: 'Amadou',
    lastName: 'Diallo',
    type: 'individual',
    status: 'active',
    riskLevel: 'low',
    joinDate: '2025-01-15',
    lastActivity: '2025-03-20',
    contacts: [
      {
        type: 'phone',
        value: '+221 77 123 4567',
        isPrimary: true,
        verified: true
      },
      {
        type: 'email',
        value: 'amadou.diallo@email.com',
        isPrimary: false,
        verified: true
      },
      {
        type: 'address',
        value: 'Rue 12 x 13, Médina, Dakar',
        isPrimary: true,
        verified: true
      }
    ],
    documents: [
      {
        type: 'ID',
        number: 'SN2025123456',
        issueDate: '2023-01-01',
        expiryDate: '2028-01-01',
        status: 'valid',
        verifiedBy: 'Agent KYC'
      }
    ],
    collectionSchedules: [
      {
        day: 'Lundi',
        timeSlot: '09:00-10:00',
        collector: {
          id: 'COL001',
          name: 'Jean Dupont'
        },
        amount: 5000,
        frequency: 'weekly',
        status: 'active'
      }
    ],
    transactions: [
      {
        id: 'TRX001',
        date: '2025-03-20',
        amount: 5000,
        type: 'deposit',
        status: 'completed',
        collector: {
          id: 'COL001',
          name: 'Jean Dupont'
        },
        location: {
          latitude: 14.7167,
          longitude: -17.4677
        }
      },
      {
        id: 'TRX002',
        date: '2025-03-13',
        amount: 5000,
        type: 'deposit',
        status: 'completed',
        collector: {
          id: 'COL001',
          name: 'Jean Dupont'
        }
      }
    ],
    activities: [
      {
        id: 'ACT001',
        date: '2025-03-20',
        type: 'account_update',
        description: 'Mise à jour du numéro de téléphone',
        status: 'resolved',
        handledBy: 'Agent Support'
      }
    ],
    metrics: {
      totalCollected: 250000,
      averageTransaction: 5000,
      successRate: 98,
      missedCollections: 1,
      lastCollectionDate: '2025-03-20'
    },
    preferences: {
      language: 'Français',
      communicationChannel: ['SMS', 'WhatsApp'],
      notificationPreferences: ['collection_reminder', 'transaction_confirmation']
    },
    notes: 'Client régulier et fiable',
    tags: ['VIP', 'Ponctuel']
  },
  {
    id: 'CLT002',
    code: 'BK2025002',
    firstName: 'Fatou',
    lastName: 'Ndiaye',
    businessName: 'Boutique Fatou',
    type: 'business',
    status: 'active',
    riskLevel: 'medium',
    joinDate: '2025-02-01',
    lastActivity: '2025-03-19',
    contacts: [
      {
        type: 'phone',
        value: '+221 77 234 5678',
        isPrimary: true,
        verified: true
      },
      {
        type: 'email',
        value: 'fatou.business@email.com',
        isPrimary: true,
        verified: true
      },
      {
        type: 'address',
        value: 'Avenue Blaise Diagne, Dakar',
        isPrimary: true,
        verified: true
      }
    ],
    documents: [
      {
        type: 'business_registration',
        number: 'RC2025789',
        issueDate: '2024-12-15',
        expiryDate: '2029-12-15',
        status: 'valid',
        verifiedBy: 'Agent KYC'
      },
      {
        type: 'tax_document',
        number: 'TAX2025456',
        issueDate: '2025-01-01',
        expiryDate: '2026-01-01',
        status: 'valid',
        verifiedBy: 'Agent KYC'
      }
    ],
    collectionSchedules: [
      {
        day: 'Lundi',
        timeSlot: '14:00-15:00',
        collector: {
          id: 'COL002',
          name: 'Marie Lambert'
        },
        amount: 10000,
        frequency: 'daily',
        status: 'active'
      },
      {
        day: 'Mardi',
        timeSlot: '14:00-15:00',
        collector: {
          id: 'COL002',
          name: 'Marie Lambert'
        },
        amount: 10000,
        frequency: 'daily',
        status: 'active'
      }
    ],
    transactions: [
      {
        id: 'TRX003',
        date: '2025-03-19',
        amount: 10000,
        type: 'deposit',
        status: 'completed',
        collector: {
          id: 'COL002',
          name: 'Marie Lambert'
        },
        location: {
          latitude: 14.7366,
          longitude: -17.4577
        }
      }
    ],
    activities: [
      {
        id: 'ACT002',
        date: '2025-03-15',
        type: 'schedule_change',
        description: 'Modification horaire de collecte',
        status: 'resolved',
        handledBy: 'Superviseur Zone'
      }
    ],
    metrics: {
      totalCollected: 480000,
      averageTransaction: 10000,
      successRate: 95,
      missedCollections: 3,
      lastCollectionDate: '2025-03-19'
    },
    preferences: {
      language: 'Français',
      communicationChannel: ['Email', 'WhatsApp'],
      notificationPreferences: ['collection_reminder', 'transaction_confirmation', 'monthly_statement']
    },
    notes: 'Commerce en croissance, potentiel d\'augmentation des collectes',
    tags: ['Commerce', 'Croissance']
  },
  {
    id: 'CLT003',
    code: 'BK2025003',
    firstName: 'Moussa',
    lastName: 'Sow',
    businessName: 'Restaurant Chez Moussa',
    type: 'business',
    status: 'active',
    riskLevel: 'low',
    joinDate: '2025-01-20',
    lastActivity: '2025-03-20',
    contacts: [
      {
        type: 'phone',
        value: '+221 77 345 6789',
        isPrimary: true,
        verified: true
      },
      {
        type: 'email',
        value: 'moussa.restaurant@email.com',
        isPrimary: true,
        verified: true
      },
      {
        type: 'address',
        value: 'Rue 10, Point E, Dakar',
        isPrimary: true,
        verified: true
      }
    ],
    documents: [
      {
        type: 'business_registration',
        number: 'RC2025790',
        issueDate: '2024-12-20',
        expiryDate: '2029-12-20',
        status: 'valid',
        verifiedBy: 'Agent KYC'
      }
    ],
    collectionSchedules: [
      {
        day: 'Lundi',
        timeSlot: '20:00-21:00',
        collector: {
          id: 'COL003',
          name: 'Amadou Diallo'
        },
        amount: 15000,
        frequency: 'daily',
        status: 'active'
      }
    ],
    transactions: [
      {
        id: 'TRX004',
        date: '2025-03-20',
        amount: 15000,
        type: 'deposit',
        status: 'completed',
        collector: {
          id: 'COL003',
          name: 'Amadou Diallo'
        },
        location: {
          latitude: 14.7466,
          longitude: -17.4377
        }
      }
    ],
    activities: [
      {
        id: 'ACT003',
        date: '2025-03-10',
        type: 'feedback',
        description: 'Satisfaction service de collecte',
        status: 'resolved',
        handledBy: 'Service Client'
      }
    ],
    metrics: {
      totalCollected: 750000,
      averageTransaction: 15000,
      successRate: 99,
      missedCollections: 0,
      lastCollectionDate: '2025-03-20'
    },
    preferences: {
      language: 'Français',
      communicationChannel: ['SMS', 'WhatsApp'],
      notificationPreferences: ['collection_reminder', 'transaction_confirmation']
    },
    notes: 'Excellent client, potentiel partenariat événementiel',
    tags: ['Restaurant', 'VIP', 'Ponctuel']
  }
];

// Helper function to get client risk level color
export const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low':
      return 'success';
    case 'medium':
      return 'warning';
    case 'high':
      return 'danger';
    default:
      return 'default';
  }
};

// Helper function to get client status color
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'secondary';
    case "pending":
      return "warning"
    case 'suspended':
      return 'danger';
    default:
      return 'default';
  }
};

// Helper function to get transaction status color
export const getTransactionStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'failed':
      return 'danger';
    default:
      return 'default';
  }
};

// Helper function to format currency
export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};