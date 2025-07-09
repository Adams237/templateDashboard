import React from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
}) => {
  const variants = {
    default: {
      container: 'border-b border-gray-200',
      tab: 'px-4 py-2 text-sm font-medium',
      active: 'text-primary-600 border-b-2 border-primary-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
    pills: {
      container: 'space-x-2',
      tab: 'px-4 py-2 text-sm font-medium rounded-full',
      active: 'bg-primary-100 text-primary-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    },
    underline: {
      container: 'border-b border-gray-200',
      tab: 'px-4 py-2 text-sm font-medium border-b-2 border-transparent',
      active: 'text-primary-600 border-primary-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className="space-y-4">
      <div className={`flex ${currentVariant.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              ${currentVariant.tab}
              ${
                activeTab === tab.id
                  ? currentVariant.active
                  : currentVariant.inactive
              }
              flex
              items-center
              transition-colors
              duration-200
            `}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </motion.div>
    </div>
  );
};

export default Tabs;