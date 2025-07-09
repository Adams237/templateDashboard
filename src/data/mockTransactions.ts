interface Transaction {
  id: string;
  date: string;
  time: string;
  client: {
    name: string;
    code: string;
  };
  collector: {
    name: string;
    id: string;
  };
  amount: number;
  fees: number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'rejected';
  status: 'validated' | 'pending' | 'rejected';
  zone: string;
  reference: string;
  source: 'mobile' | 'admin' | 'import';
  paymentMethod: string;
  createdBy: string;
  validatedBy?: string;
  processingTime: number;
  notes?: string;
  attachments?: Array<{
    name: string;
    url: string;
  }>;
  isToday: boolean;
  isThisWeek: boolean;
  isThisMonth: boolean;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'TRX001',
    date: '2025-03-20',
    time: '09:45',
    client: {
      name: 'Amadou Diallo',
      code: 'CLT001'
    },
    collector: {
      name: 'Jean Dupont',
      id: 'COL001'
    },
    amount: 50000,
    fees: 500,
    type: 'deposit',
    status: 'validated',
    zone: 'Médina',
    reference: 'DEP202503200945',
    source: 'mobile',
    paymentMethod: 'Espèces',
    createdBy: 'Jean Dupont',
    validatedBy: 'Superviseur Nord',
    processingTime: 5,
    isToday: true,
    isThisWeek: true,
    isThisMonth: true
  },
  {
    id: 'TRX002',
    date: '2025-03-20',
    time: '10:15',
    client: {
      name: 'Fatou Ndiaye',
      code: 'CLT002'
    },
    collector: {
      name: 'Marie Lambert',
      id: 'COL002'
    },
    amount: 75000,
    fees: 750,
    type: 'withdrawal',
    status: 'pending',
    zone: 'Plateau',
    reference: 'WIT202503201015',
    source: 'mobile',
    paymentMethod: 'Espèces',
    createdBy: 'Marie Lambert',
    processingTime: 8,
    notes: 'En attente de validation superviseur',
    isToday: true,
    isThisWeek: true,
    isThisMonth: true
  },
  {
    id: 'TRX003',
    date: '2025-03-19',
    time: '14:30',
    client: {
      name: 'Moussa Sow',
      code: 'CLT003'
    },
    collector: {
      name: 'Amadou Diallo',
      id: 'COL003'
    },
    amount: 100000,
    fees: 1000,
    type: 'deposit',
    status: 'validated',
    zone: 'Point E',
    reference: 'DEP202503191430',
    source: 'mobile',
    paymentMethod: 'Espèces',
    createdBy: 'Amadou Diallo',
    validatedBy: 'Superviseur Centre',
    processingTime: 3,
    attachments: [
      {
        name: 'Reçu_DEP202503191430.pdf',
        url: '#'
      }
    ],
    isToday: false,
    isThisWeek: true,
    isThisMonth: true
  },
  {
    id: 'TRX004',
    date: '2025-03-19',
    time: '16:45',
    client: {
      name: 'Aminata Ba',
      code: 'CLT004'
    },
    collector: {
      name: 'Sophie Martin',
      id: 'COL004'
    },
    amount: 25000,
    fees: 250,
    type: 'transfer',
    status: 'validated',
    zone: 'Mermoz',
    reference: 'TRF202503191645',
    source: 'admin',
    paymentMethod: 'Mobile Money',
    createdBy: 'Sophie Martin',
    validatedBy: 'Superviseur Sud',
    processingTime: 6,
    isToday: false,
    isThisWeek: true,
    isThisMonth: true
  },
  {
    id: 'TRX005',
    date: '2025-03-18',
    time: '11:20',
    client: {
      name: 'Ibrahima Sy',
      code: 'CLT005'
    },
    collector: {
      name: 'Pierre Sow',
      id: 'COL005'
    },
    amount: 150000,
    fees: 1500,
    type: 'deposit',
    status: 'rejected',
    zone: 'Almadies',
    reference: 'DEP202503181120',
    source: 'mobile',
    paymentMethod: 'Espèces',
    createdBy: 'Pierre Sow',
    processingTime: 10,
    notes: 'Montant supérieur à la limite autorisée',
    isToday: false,
    isThisWeek: true,
    isThisMonth: true
  }
];