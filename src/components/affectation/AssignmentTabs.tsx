import React from 'react';

type TabType = 'current' | 'pending' | 'history' | 'new';

interface AssignmentTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const AssignmentTabs = ({ activeTab, onTabChange }: AssignmentTabsProps) => {
  const tabs = [
    { id: 'current', label: 'Affectations actuelles' },
    { id: 'pending', label: 'En attente d\'approbation' },
    { id: 'history', label: 'Historique' },
    { id: 'new', label: 'Nouvelle affectation' },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabType)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AssignmentTabs;