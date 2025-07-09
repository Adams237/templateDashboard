import { format, formatDistance, formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string | Date, pattern: string = 'dd/MM/yyyy'): string => {
  return format(new Date(date), pattern, { locale: fr });
};

export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'HH:mm');
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm');
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: fr,
  });
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Format pour les numéros camerounais
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `+237 ${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const truncateText = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    active: 'Actif',
    inactive: 'Inactif',
    completed: 'Complété',
    pending: 'En attente',
    failed: 'Échoué',
    approved: 'Approuvé',
    rejected: 'Rejeté',
  };
  return statusMap[status] || status;
};

export const formatZoneName = (zone: string): string => {
  return zone.split('_').map(capitalizeFirstLetter).join(' ');
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export const formatAmount = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M FCFA`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K FCFA`;
  }
  return `${amount} FCFA`;
};

export const getStatusColor = (status: string): string => {
  const colorMap: { [key: string]: string } = {
    active: 'green',
    inactive: 'red',
    completed: 'green',
    pending: 'yellow',
    failed: 'red',
    approved: 'green',
    rejected: 'red',
  };
  return colorMap[status] || 'gray';
};

export const getPriorityColor = (priority: string): string => {
  const colorMap: { [key: string]: string } = {
    high: 'red',
    medium: 'yellow',
    low: 'green',
  };
  return colorMap[priority] || 'gray';
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}min`;
};