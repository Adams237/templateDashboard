import React, { useState } from 'react';
import { Receipt, TrendingUp, MapPin, Target, UserCheck, LineChart } from 'lucide-react';
import TransactionsDashboard from '../components/transactions/TransactionsDashboard';
import MonthlyTrends from '../components/transactions/MonthlyTrends';
import ZonePerformance from '../components/transactions/ZonePerformance';
import KPIDashboard from '../components/transactions/KPIDashboard';
import CollectorPerformance from '../components/transactions/CollectorPerformance';
import AdvancedAnalytics from '../components/transactions/AdvancedAnalytics';

const transactionTabs = [
  { id: 'list', name: 'Transactions', icon: Receipt },
  { id: 'trends', name: 'Tendances mensuelles', icon: TrendingUp },
  { id: 'zones', name: 'Performances par zone', icon: MapPin },
  { id: 'kpi', name: 'Indicateurs clés (KPI)', icon: Target },
  { id: 'collectors', name: 'Performances des collecteurs', icon: UserCheck },
  { id: 'advanced', name: 'Analyses avancées', icon: LineChart },
];

export default function TransactionsPage() {
  const [activeTransactionTab, setActiveTransactionTab] = useState<'list' | 'trends' | 'zones' | 'kpi' | 'collectors' | 'advanced'>('list');

  return (
    <div className="bg-white w-[75vw] rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Historique des transactions</h2>

      <div className="border-b w-[72vw] border-gray-200 mb-4">
        <nav className="-mb-px overflow-x-auto w-full flex space-x-8">
          {transactionTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTransactionTab(tab.id as typeof activeTransactionTab)}
                className={`
                  whitespace-nowrap py-4 border-b-2 font-medium text-sm flex items-center
                  ${activeTransactionTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTransactionTab === 'list' && <TransactionsDashboard />} 
      {activeTransactionTab === 'trends' && <MonthlyTrends />} 
      {activeTransactionTab === 'zones' && <ZonePerformance />} 
      {activeTransactionTab === 'kpi' && <KPIDashboard />} 
      {activeTransactionTab === 'collectors' && <CollectorPerformance />} 
      {activeTransactionTab === 'advanced' && <AdvancedAnalytics />} 
    </div>
  );
}
