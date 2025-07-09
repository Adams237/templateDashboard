import { z } from 'zod';

// Schémas de validation
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const collectorSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^\+237 [0-9]{9}$/, 'Numéro de téléphone invalide'),
  zone: z.string().min(1, 'La zone est requise'),
});

export const transactionSchema = z.object({
  amount: z.number().min(0, 'Le montant doit être positif'),
  clientId: z.string().min(1, 'Le client est requis'),
  collectorId: z.string().min(1, 'Le collecteur est requis'),
  paymentMethod: z.enum(['cash', 'mobile_money', 'card']),
  notes: z.string().optional(),
});

export const accountRequestSchema = z.object({
  clientName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^\+237 [0-9]{9}$/, 'Numéro de téléphone invalide'),
  type: z.enum(['business', 'individual']),
  documents: z.array(z.object({
    type: z.string(),
    file: z.instanceof(File),
  })).min(1, 'Au moins un document est requis'),
  businessInfo: z.object({
    registrationNumber: z.string(),
    taxId: z.string(),
    address: z.string(),
    industry: z.string(),
  }).optional(),
});

export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  security: z.object({
    twoFactorEnabled: z.boolean(),
    sessionTimeout: z.number().min(5).max(120),
  }),
  display: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    language: z.string(),
    timezone: z.string(),
  }),
});

// Fonctions de validation
export const validateLogin = (data: unknown) => {
  return loginSchema.safeParse(data);
};

export const validateCollector = (data: unknown) => {
  return collectorSchema.safeParse(data);
};

export const validateTransaction = (data: unknown) => {
  return transactionSchema.safeParse(data);
};

export const validateAccountRequest = (data: unknown) => {
  return accountRequestSchema.safeParse(data);
};

export const validateSettings = (data: unknown) => {
  return settingsSchema.safeParse(data);
};

// Fonctions utilitaires de validation
export const isValidEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

export const isValidPhone = (phone: string): boolean => {
  return z.string().regex(/^\+237 [0-9]{9}$/).safeParse(phone).success;
};

export const isValidAmount = (amount: number): boolean => {
  return z.number().min(0).safeParse(amount).success;
};

export const isValidDate = (date: string): boolean => {
  return z.string().datetime().safeParse(date).success;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  return file.size <= maxSizeInMB * 1024 * 1024;
};

// Messages d'erreur personnalisés
export const errorMessages = {
  required: 'Ce champ est requis',
  invalidEmail: 'Adresse email invalide',
  invalidPhone: 'Numéro de téléphone invalide',
  invalidAmount: 'Montant invalide',
  invalidDate: 'Date invalide',
  passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
  fileTooBig: 'Le fichier est trop volumineux',
  invalidFileType: 'Type de fichier non supporté',
  networkError: 'Erreur de connexion au serveur',
  unauthorized: 'Non autorisé',
  notFound: 'Ressource non trouvée',
  serverError: 'Erreur serveur',
};

// Types d'erreur
export type ValidationError = {
  field: string;
  message: string;
};

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

// Fonction de gestion des erreurs API
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      code: 'ERROR',
      message: error.message,
    };
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: 'Une erreur inconnue est survenue',
  };
};