// Mock data for collectors with extended properties
export const mockCollectors = [
  { 
    id: 'COL001', 
    name: 'Jean Dupont',
    experience: 5,
    rating: 4.8,
    specializations: ['Marchés', 'Zones commerciales'],
    languages: ['Français', 'Wolof'],
    collectionRate: 98.5,
    averageDailyCollections: 42,
    lastTrainingDate: '2025-01-15',
    certifications: ['Gestion de risque', 'Conformité bancaire'],
    availability: true,
    currentZone: 'ZONE001',
    backupZones: ['ZONE003', 'ZONE004']
  },
  { 
    id: 'COL002', 
    name: 'Marie Lambert',
    experience: 3,
    rating: 4.6,
    specializations: ['Zones résidentielles', 'Petits commerces'],
    languages: ['Français', 'Anglais'],
    collectionRate: 97.8,
    averageDailyCollections: 35,
    lastTrainingDate: '2025-02-01',
    certifications: ['Service client avancé'],
    availability: true,
    currentZone: 'ZONE002',
    backupZones: ['ZONE005']
  },
  { 
    id: 'COL003', 
    name: 'Amadou Diallo',
    experience: 7,
    rating: 4.9,
    specializations: ['Zones industrielles', 'Grands comptes'],
    languages: ['Français', 'Wolof', 'Anglais'],
    collectionRate: 99.2,
    averageDailyCollections: 48,
    lastTrainingDate: '2025-01-30',
    certifications: ['Gestion de risque', 'Conformité bancaire', 'Sécurité'],
    availability: true,
    currentZone: 'ZONE003',
    backupZones: ['ZONE001', 'ZONE002']
  },
  { 
    id: 'COL004', 
    name: 'Sophie Martin',
    experience: 4,
    rating: 4.7,
    specializations: ['Centre-ville', 'Commerces de détail'],
    languages: ['Français', 'Wolof'],
    collectionRate: 98.1,
    averageDailyCollections: 38,
    lastTrainingDate: '2025-02-15',
    certifications: ['Service client avancé', 'Gestion de conflit'],
    availability: true,
    currentZone: 'ZONE004',
    backupZones: ['ZONE002', 'ZONE005']
  },
  { 
    id: 'COL005', 
    name: 'Pierre Sow',
    experience: 6,
    rating: 4.8,
    specializations: ['Zones résidentielles', 'Institutions'],
    languages: ['Français', 'Wolof', 'Anglais'],
    collectionRate: 98.7,
    averageDailyCollections: 40,
    lastTrainingDate: '2025-01-20',
    certifications: ['Conformité bancaire', 'Gestion de risque'],
    availability: true,
    currentZone: 'ZONE005',
    backupZones: ['ZONE003', 'ZONE004']
  },
  { 
    id: 'COL006', 
    name: 'Fatou Ndiaye',
    experience: 5,
    rating: 4.8,
    specializations: ['Marchés', 'Zones commerciales'],
    languages: ['Français', 'Wolof', 'Pulaar'],
    collectionRate: 98.9,
    averageDailyCollections: 45,
    lastTrainingDate: '2025-02-10',
    certifications: ['Service client avancé', 'Gestion de risque'],
    availability: true,
    currentZone: 'ZONE006',
    backupZones: ['ZONE001', 'ZONE002']
  },
];

// Mock data for zones with detailed information
export const mockZones = [
  { 
    id: 'ZONE001', 
    name: 'Marché Central', 
    collectorName: 'Jean Dupont',
    collectorId: 'COL001',
    type: 'Marché',
    clientCount: 45,
    averageAmount: 125000,
    riskLevel: 'Moyen',
    collectionFrequency: 'Quotidienne',
    peakHours: ['08:00-10:00', '16:00-18:00'],
    securityLevel: 'Élevé',
    requiredCertifications: ['Gestion de risque'],
    backupCollectors: ['COL003', 'COL006'],
    lastAuditDate: '2025-02-01',
    performanceMetrics: {
      collectionRate: 98.5,
      clientSatisfaction: 4.7,
      incidentRate: 0.5,
      averageResponseTime: 15 // minutes
    },
    geographicalData: {
      coordinates: { lat: 14.7167, lng: -17.4677 },
      boundaries: ['Point A', 'Point B', 'Point C', 'Point D'],
      accessPoints: ['Entrée principale', 'Entrée sud', 'Entrée est']
    }
  },
  { 
    id: 'ZONE002', 
    name: 'Quartier Commercial', 
    collectorName: 'Marie Lambert',
    collectorId: 'COL002',
    type: 'Commercial',
    clientCount: 32,
    averageAmount: 98000,
    riskLevel: 'Faible',
    collectionFrequency: 'Quotidienne',
    peakHours: ['09:00-11:00', '14:00-16:00'],
    securityLevel: 'Moyen',
    requiredCertifications: ['Service client avancé'],
    backupCollectors: ['COL004', 'COL006'],
    lastAuditDate: '2025-01-25',
    performanceMetrics: {
      collectionRate: 97.8,
      clientSatisfaction: 4.8,
      incidentRate: 0.3,
      averageResponseTime: 12
    },
    geographicalData: {
      coordinates: { lat: 14.7366, lng: -17.4577 },
      boundaries: ['Point E', 'Point F', 'Point G', 'Point H'],
      accessPoints: ['Entrée principale', 'Entrée ouest']
    }
  },
  { 
    id: 'ZONE003', 
    name: 'Zone Industrielle', 
    collectorName: 'Amadou Diallo',
    collectorId: 'COL003',
    type: 'Industriel',
    clientCount: 28,
    averageAmount: 145000,
    riskLevel: 'Élevé',
    collectionFrequency: 'Quotidienne',
    peakHours: ['07:00-09:00', '15:00-17:00'],
    securityLevel: 'Très élevé',
    requiredCertifications: ['Gestion de risque', 'Sécurité'],
    backupCollectors: ['COL001', 'COL005'],
    lastAuditDate: '2025-02-10',
    performanceMetrics: {
      collectionRate: 99.2,
      clientSatisfaction: 4.9,
      incidentRate: 0.1,
      averageResponseTime: 10
    },
    geographicalData: {
      coordinates: { lat: 14.7466, lng: -17.4377 },
      boundaries: ['Point I', 'Point J', 'Point K', 'Point L'],
      accessPoints: ['Entrée principale', 'Entrée sécurisée', 'Entrée livraison']
    }
  },
  { 
    id: 'ZONE004', 
    name: 'Centre-Ville', 
    collectorName: 'Sophie Martin',
    collectorId: 'COL004',
    type: 'Mixte',
    clientCount: 50,
    averageAmount: 135000,
    riskLevel: 'Moyen',
    collectionFrequency: 'Quotidienne',
    peakHours: ['10:00-12:00', '15:00-17:00'],
    securityLevel: 'Élevé',
    requiredCertifications: ['Service client avancé', 'Gestion de conflit'],
    backupCollectors: ['COL002', 'COL005'],
    lastAuditDate: '2025-01-15',
    performanceMetrics: {
      collectionRate: 98.1,
      clientSatisfaction: 4.7,
      incidentRate: 0.4,
      averageResponseTime: 14
    },
    geographicalData: {
      coordinates: { lat: 14.7266, lng: -17.4477 },
      boundaries: ['Point M', 'Point N', 'Point O', 'Point P'],
      accessPoints: ['Entrée nord', 'Entrée sud', 'Entrée est', 'Entrée ouest']
    }
  },
  { 
    id: 'ZONE005', 
    name: 'Quartier Résidentiel', 
    collectorName: 'Pierre Sow',
    collectorId: 'COL005',
    type: 'Résidentiel',
    clientCount: 38,
    averageAmount: 87000,
    riskLevel: 'Faible',
    collectionFrequency: 'Quotidienne',
    peakHours: ['09:00-11:00', '16:00-18:00'],
    securityLevel: 'Moyen',
    requiredCertifications: ['Service client avancé'],
    backupCollectors: ['COL004', 'COL002'],
    lastAuditDate: '2025-02-05',
    performanceMetrics: {
      collectionRate: 98.7,
      clientSatisfaction: 4.8,
      incidentRate: 0.2,
      averageResponseTime: 13
    },
    geographicalData: {
      coordinates: { lat: 14.7566, lng: -17.4677 },
      boundaries: ['Point Q', 'Point R', 'Point S', 'Point T'],
      accessPoints: ['Entrée principale', 'Entrée secondaire']
    }
  }
];

// Mock data for current assignments with detailed tracking
export const mockAssignments = [
  {
    id: 'ASN001',
    collector: mockCollectors.find(c => c.id === 'COL003'),
    originalCollector: mockCollectors.find(c => c.id === 'COL001'),
    zone: mockZones.find(z => z.id === 'ZONE001'),
    startDate: '15/05/2025',
    endDate: '30/05/2025',
    status: 'active',
    performance: 92,
    reason: 'Congé maladie',
    approvedBy: 'Superviseur Nord',
    approvalDate: '10/05/2025',
    metrics: {
      collectionsCompleted: 156,
      totalAmount: 2450000,
      clientVisits: 180,
      successRate: 92.5,
      averageResponseTime: 12,
      clientFeedback: 4.8
    },
    trainingCompleted: true,
    trainingDate: '14/05/2025',
    handoverNotes: 'Attention particulière aux clients A, B, C',
    riskAssessment: 'Faible',
    contingencyPlan: 'Plan B activé si nécessaire',
    securityClearance: 'Niveau 2',
    lastUpdate: '20/05/2025'
  },
  {
    id: 'ASN002',
    collector: mockCollectors.find(c => c.id === 'COL006'),
    originalCollector: mockCollectors.find(c => c.id === 'COL002'),
    zone: mockZones.find(z => z.id === 'ZONE002'),
    startDate: '10/05/2025',
    endDate: '25/05/2025',
    status: 'active',
    performance: 78,
    reason: 'Formation professionnelle',
    approvedBy: 'Directeur des opérations',
    approvalDate: '05/05/2025',
    metrics: {
      collectionsCompleted: 98,
      totalAmount: 1850000,
      clientVisits: 120,
      successRate: 78.5,
      averageResponseTime: 18,
      clientFeedback: 4.2
    },
    trainingCompleted: true,
    trainingDate: '09/05/2025',
    handoverNotes: 'Suivi spécial pour les clients X, Y, Z',
    riskAssessment: 'Moyen',
    contingencyPlan: 'Support téléphonique disponible',
    securityClearance: 'Niveau 2',
    lastUpdate: '18/05/2025'
  },
  {
    id: 'ASN003',
    collector: mockCollectors.find(c => c.id === 'COL005'),
    originalCollector: mockCollectors.find(c => c.id === 'COL004'),
    zone: mockZones.find(z => z.id === 'ZONE004'),
    startDate: '01/04/2025',
    endDate: '15/04/2025',
    status: 'completed',
    performance: 85,
    reason: 'Congé annuel',
    approvedBy: 'Superviseur Centre',
    approvalDate: '25/03/2025',
    metrics: {
      collectionsCompleted: 210,
      totalAmount: 3150000,
      clientVisits: 245,
      successRate: 85.2,
      averageResponseTime: 15,
      clientFeedback: 4.5
    },
    trainingCompleted: true,
    trainingDate: '31/03/2025',
    handoverNotes: 'Rapport de fin de mission disponible',
    riskAssessment: 'Faible',
    contingencyPlan: 'Exécuté sans incident',
    securityClearance: 'Niveau 2',
    lastUpdate: '15/04/2025'
  },
  {
    id: 'ASN004',
    collector: mockCollectors.find(c => c.id === 'COL001'),
    originalCollector: mockCollectors.find(c => c.id === 'COL003'),
    zone: mockZones.find(z => z.id === 'ZONE003'),
    startDate: '01/06/2025',
    endDate: '15/06/2025',
    status: 'scheduled',
    performance: 0,
    reason: 'Formation sécurité',
    approvedBy: 'Directeur des opérations',
    approvalDate: '15/05/2025',
    metrics: {
      collectionsCompleted: 0,
      totalAmount: 0,
      clientVisits: 0,
      successRate: 0,
      averageResponseTime: 0,
      clientFeedback: 0
    },
    trainingCompleted: false,
    trainingDate: '31/05/2025',
    handoverNotes: 'Briefing prévu le 31/05',
    riskAssessment: 'Moyen',
    contingencyPlan: 'À définir lors du briefing',
    securityClearance: 'En cours',
    lastUpdate: '15/05/2025'
  }
];

// Mock data for pending assignments with comprehensive approval workflow
export const mockPendingAssignments = [
  {
    id: 'PND001',
    collector: mockCollectors.find(c => c.id === 'COL001'),
    originalCollector: mockCollectors.find(c => c.id === 'COL005'),
    zone: mockZones.find(z => z.id === 'ZONE005'),
    startDate: '05/06/2025',
    endDate: '20/06/2025',
    reason: 'Congé maladie du collecteur principal',
    requestedBy: 'Superviseur Nord',
    requestDate: '25/05/2025',
    priority: 'high',
    status: 'pending_approval',
    approvalWorkflow: {
      currentStep: 2,
      totalSteps: 3,
      steps: [
        {
          step: 1,
          name: 'Validation superviseur',
          status: 'completed',
          completedBy: 'Superviseur Nord',
          completedAt: '25/05/2025',
          comments: 'Recommandé pour approbation'
        },
        {
          step: 2,
          name: 'Validation ressources humaines',
          status: 'in_progress',
          assignedTo: 'Responsable RH',
          dueDate: '27/05/2025'
        },
        {
          step: 3,
          name: 'Validation finale',
          status: 'pending',
          assignedTo: 'Directeur des opérations'
        }
      ]
    },
    preAssignmentChecks: {
      collectorAvailable: true,
      certificationValid: true,
      trainingRequired: false,
      securityClearance: 'En cours',
      zoneCompatibility: 'Élevée'
    },
    riskAssessment: {
      overallRisk: 'Faible',
      factors: {
        experienceMatch: 'Élevé',
        zoneKnowledge: 'Moyen',
        clientRelations: 'Élevé'
      }
    }
  },
  {
    id: 'PND002',
    collector: mockCollectors.find(c => c.id === 'COL004'),
    originalCollector: mockCollectors.find(c => c.id === 'COL002'),
    zone: mockZones.find(z => z.id === 'ZONE002'),
    startDate: '01/07/2025',
    endDate: '15/07/2025',
    reason: 'Formation du collecteur principal',
    requestedBy: 'Directeur des opérations',
    requestDate: '18/05/2025',
    priority: 'medium',
    status: 'pending_review',
    approvalWorkflow: {
      currentStep: 1,
      totalSteps: 3,
      steps: [
        {
          step: 1,
          name: 'Validation superviseur',
          status: 'in_progress',
          assignedTo: 'Superviseur Ouest',
          dueDate: '20/05/2025'
        },
        {
          step: 2,
          name: 'Validation ressources humaines',
          status: 'pending',
          assignedTo: 'Responsable RH'
        },
        {
          step: 3,
          name: 'Validation finale',
          status: 'pending',
          assignedTo: 'Directeur des opérations'
        }
      ]
    },
    preAssignmentChecks: {
      collectorAvailable: true,
      certificationValid: true,
      trainingRequired: true,
      securityClearance: 'Validé',
      zoneCompatibility: 'Moyenne'
    },
    riskAssessment: {
      overallRisk: 'Moyen',
      factors: {
        experienceMatch: 'Moyen',
        zoneKnowledge: 'Faible',
        clientRelations: 'Élevé'
      }
    }
  }
];

// Mock data for assignment history with detailed performance analytics
export const mockAssignmentHistory = [
  {
    id: 'HST001',
    collector: mockCollectors.find(c => c.id === 'COL003'),
    originalCollector: mockCollectors.find(c => c.id === 'COL004'),
    zone: mockZones.find(z => z.id === 'ZONE004'),
    startDate: '01/03/2025',
    endDate: '15/03/2025',
    duration: '15 jours',
    performance: 88,
    collectionCount: 215,
    isLastMonth: true,
    isLastWeek: false,
    metrics: {
      totalCollected: 3250000,
      successRate: 88.5,
      clientVisits: 245,
      averageResponseTime: 13,
      clientSatisfaction: 4.6,
      incidentCount: 2,
      resolutionRate: 100
    },
    challenges: [
      {
        type: 'Accès difficile',
        description: 'Travaux dans la zone',
        resolution: 'Itinéraire alternatif établi',
        impact: 'Minimal'
      }
    ],
    learnings: [
      'Meilleure connaissance des pics d\'activité',
      'Adaptation réussie aux spécificités locales'
    ],
    feedback: {
      supervisor: 'Très bonne adaptation',
      clients: 'Satisfaction générale',
      selfAssessment: 'Expérience enrichissante'
    }
  },
  {
    id: 'HST002',
    collector: mockCollectors.find(c => c.id === 'COL006'),
    originalCollector: mockCollectors.find(c => c.id === 'COL001'),
    zone: mockZones.find(z => z.id === 'ZONE001'),
    startDate: '15/04/2025',
    endDate: '30/04/2025',
    duration: '15 jours',
    performance: 95,
    collectionCount: 178,
    isLastMonth: true,
    isLastWeek: false,
    metrics: {
      totalCollected: 2850000,
      successRate: 95.2,
      clientVisits: 185,
      averageResponseTime: 11,
      clientSatisfaction: 4.8,
      incidentCount: 0,
      resolutionRate: 100
    },
    challenges: [],
    learnings: [
      'Optimisation des horaires de collecte',
      'Renforcement des relations clients'
    ],
    feedback: {
      supervisor: 'Performance exceptionnelle',
      clients: 'Très satisfaits du service',
      selfAssessment: 'Mission accomplie avec succès'
    }
  },
  {
    id: 'HST003',
    collector: mockCollectors.find(c => c.id === 'COL002'),
    originalCollector: mockCollectors.find(c => c.id === 'COL005'),
    zone: mockZones.find(z => z.id === 'ZONE005'),
    startDate: '01/05/2025',
    endDate: '05/05/2025',
    duration: '5 jours',
    performance: 72,
    collectionCount: 45,
    isLastMonth: true,
    isLastWeek: true,
    metrics: {
      totalCollected: 950000,
      successRate: 72.4,
      clientVisits: 62,
      averageResponseTime: 19,
      clientSatisfaction: 3.9,
      incidentCount: 3,
      resolutionRate: 85
    },
    challenges: [
      {
        type: 'Communication',
        description: 'Difficulté avec certains clients',
        resolution: 'Formation supplémentaire requise',
        impact: 'Modéré'
      }
    ],
    learnings: [
      'Nécessité d\'une meilleure préparation',
      'Importance de la communication préalable'
    ],
    feedback: {
      supervisor: 'Des axes d\'amélioration identifiés',
      clients: 'Satisfaction mitigée',
      selfAssessment: 'Besoin de formation complémentaire'
    }
  },
  {
    id: 'HST004',
    collector: mockCollectors.find(c => c.id === 'COL005'),
    originalCollector: mockCollectors.find(c => c.id === 'COL003'),
    zone: mockZones.find(z => z.id === 'ZONE003'),
    startDate: '10/05/2025',
    endDate: '15/05/2025',
    duration: '5 jours',
    performance: 83,
    collectionCount: 38,
    isLastMonth: true,
    isLastWeek: true,
    metrics: {
      totalCollected: 1250000,
      successRate: 83.1,
      clientVisits: 45,
      averageResponseTime: 15,
      clientSatisfaction: 4.3,
      incidentCount: 1,
      resolutionRate: 100
    },
    challenges: [
      {
        type: 'Technique',
        description: 'Problème application mobile',
        resolution: 'Support IT intervention',
        impact: 'Mineur'
      }
    ],
    learnings: [
      'Importance du support technique',
      'Flexibilité dans l\'organisation'
    ],
    feedback: {
      supervisor: 'Bonne gestion des imprévus',
      clients: 'Satisfaction correcte',
      selfAssessment: 'Mission réussie malgré les défis'
    }
  }
];

// Types for TypeScript
export interface Collector {
  id: string;
  name: string;
  experience: number;
  rating: number;
  specializations: string[];
  languages: string[];
  collectionRate: number;
  averageDailyCollections: number;
  lastTrainingDate: string;
  certifications: string[];
  availability: boolean;
  currentZone: string;
  backupZones: string[];
}

export interface Zone {
  id: string;
  name: string;
  collectorName: string;
  collectorId: string;
  type: string;
  clientCount: number;
  averageAmount: number;
  riskLevel: string;
  collectionFrequency: string;
  peakHours: string[];
  securityLevel: string;
  requiredCertifications: string[];
  backupCollectors: string[];
  lastAuditDate: string;
  performanceMetrics: {
    collectionRate: number;
    clientSatisfaction: number;
    incidentRate: number;
    averageResponseTime: number;
  };
  geographicalData: {
    coordinates: { lat: number; lng: number };
    boundaries: string[];
    accessPoints: string[];
  };
}

export interface Assignment {
  id: string;
  collector: Collector | undefined;
  originalCollector: Collector | undefined;
  zone: Zone | undefined;
  startDate: string;
  endDate: string;
  status: string;
  performance: number;
  reason: string;
  approvedBy: string;
  approvalDate: string;
  metrics: {
    collectionsCompleted: number;
    totalAmount: number;
    clientVisits: number;
    successRate: number;
    averageResponseTime: number;
    clientFeedback: number;
  };
  trainingCompleted: boolean;
  trainingDate: string;
  handoverNotes: string;
  riskAssessment: string;
  contingencyPlan: string;
  securityClearance: string;
  lastUpdate: string;
}

export interface PendingAssignment {
  id: string;
  collector: Collector | undefined;
  originalCollector: Collector | undefined;
  zone: Zone | undefined;
  startDate: string;
  endDate: string;
  reason: string;
  requestedBy: string;
  requestDate: string;
  priority: string;
  status: string;
  approvalWorkflow: {
    currentStep: number;
    totalSteps: number;
    steps: {
      step: number;
      name: string;
      status: string;
      completedBy?: string;
      completedAt?: string;
      comments?: string;
      assignedTo?: string;
      dueDate?: string;
    }[];
  };
  preAssignmentChecks: {
    collectorAvailable: boolean;
    certificationValid: boolean;
    trainingRequired: boolean;
    securityClearance: string;
    zoneCompatibility: string;
  };
  riskAssessment: {
    overallRisk: string;
    factors: {
      experienceMatch: string;
      zoneKnowledge: string;
      clientRelations: string;
    };
  };
}

export interface AssignmentHistory {
  id: string;
  collector: Collector | undefined;
  originalCollector: Collector | undefined;
  zone: Zone | undefined;
  startDate: string;
  endDate: string;
  duration: string;
  performance: number;
  collectionCount: number;
  isLastMonth: boolean;
  isLastWeek: boolean;
  metrics: {
    totalCollected: number;
    successRate: number;
    clientVisits: number;
    averageResponseTime: number;
    clientSatisfaction: number;
    incidentCount: number;
    resolutionRate: number;
  };
  challenges: {
    type: string;
    description: string;
    resolution: string;
    impact: string;
  }[];
  learnings: string[];
  feedback: {
    supervisor: string;
    clients: string;
    selfAssessment: string;
  };
}