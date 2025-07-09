import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
}) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${rounded ? 'rounded-full' : 'rounded'}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;

export const StatusBadge: React.FC<{
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'failed';
}> = ({ status }) => {
  const statusConfig = {
    active: { variant: 'success', label: 'Actif' },
    inactive: { variant: 'danger', label: 'Inactif' },
    pending: { variant: 'warning', label: 'En attente' },
    completed: { variant: 'success', label: 'Complété' },
    failed: { variant: 'danger', label: 'Échoué' },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant as BadgeProps['variant']}
      size="sm"
      rounded
    >
      {config.label}
    </Badge>
  );
};

export const PriorityBadge: React.FC<{
  priority: 'high' | 'medium' | 'low';
}> = ({ priority }) => {
  const priorityConfig = {
    high: { variant: 'danger', label: 'Haute' },
    medium: { variant: 'warning', label: 'Moyenne' },
    low: { variant: 'info', label: 'Basse' },
  };

  const config = priorityConfig[priority];

  return (
    <Badge
      variant={config.variant as BadgeProps['variant']}
      size="sm"
      rounded
    >
      {config.label}
    </Badge>
  );
};