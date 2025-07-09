import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverStyles = hover
    ? 'transition-transform duration-200 hover:shadow-lg'
    : '';

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;

export const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label?: string;
  };
  color?: string;
}> = ({ title, value, icon, trend, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className={`p-3 rounded-full ${colors[color as keyof typeof colors]}`}>
            {icon}
          </div>
        )}
        {trend && (
          <div
            className={`flex items-center ${
              trend.value >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <span className="text-sm font-medium">
              {trend.value >= 0 ? '+' : ''}
              {trend.value}%
            </span>
            {trend.label && (
              <span className="ml-1 text-xs text-gray-500">
                {trend.label}
              </span>
            )}
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    </Card>
  );
};

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  chart?: React.ReactNode;
}> = ({ title, value, subtitle, icon, chart }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      {chart && <div className="mt-4">{chart}</div>}
    </Card>
  );
};