import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowDownRight, ArrowUpRight, Users, Wallet, Activity, UserPlus, CheckCircle, Clock, XCircle, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion'
import TableHeader from '../components/ui/TableHeader';
import { TransactionsInterface } from '../interfaces/transaction.interface';
import { Transactions } from '../constants/transaction';
import { AccountRequestInterface } from '../interfaces/accoubtRequest.interface';
import { AccountRequest } from '../constants/accountRequest';

const performanceData = [
  { name: '08:00', value: 150000 },
  { name: '09:00', value: 320000 },
  { name: '10:00', value: 480000 },
  { name: '11:00', value: 580000 },
  { name: '12:00', value: 680000 },
  { name: '13:00', value: 820000 },
  { name: '14:00', value: 950000 },
];

const pieData = [
  { name: 'Complétées', value: 65, color: '#10B981' },
  { name: 'En attente', value: 25, color: '#F59E0B' },
  { name: 'Échouées', value: 10, color: '#EF4444' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatCard = ({ icon: Icon, title, value, trend, color }: { icon: any, title: string, value: string, trend?: number, color: string }) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          <span className="ml-1">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');
  const [transactions] = useState<TransactionsInterface[]>(Transactions)
  const [accountRequests] = useState<AccountRequestInterface[]>(AccountRequest)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <StatCard icon={Users} title="Collecteurs actifs" value="12/15" trend={5} color="bg-blue-500" />
        <StatCard icon={Wallet} title="Montant total collecté" value="2,450,000 FCFA" trend={8} color="bg-green-500" />
        <StatCard icon={Activity} title="Taux de réussite" value="92%" trend={3} color="bg-purple-500" />
        <StatCard icon={UserPlus} title="Nouvelles demandes" value="24" trend={-2} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance journalière</h3>
            <div className="flex items-center space-x-2">
              <button className={`px-3 py-1 rounded-full ${dateRange === 'today' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`} onClick={() => setDateRange('today')}>
                Aujourd'hui
              </button>
              <button className={`px-3 py-1 rounded-full ${dateRange === 'week' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`} onClick={() => setDateRange('week')}>
                Cette semaine
              </button>
              <button className={`px-3 py-1 rounded-full ${dateRange === 'month' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`} onClick={() => setDateRange('month')}>
                Ce mois
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#0EA5E9" fill="#BAE6FD" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition des transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <TableHeader
            title="Dernières transactions"
            onSearch={() => { }}
            onFilter={() => { }}
          />
          <div className="space-y-4">
            {transactions.slice(0, 5).map(transaction => (
              <motion.div
                key={transaction.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${transaction.status === 'completed' ? 'bg-green-100' :
                    transaction.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                    {transaction.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : transaction.status === 'pending' ? (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.client}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.collector.name} • {transaction.zone}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {transaction.amount.toLocaleString()} FCFA
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(transaction.date), 'HH:mm')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Demandes de compte</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              Voir tout
              <ChevronRight className="h-5 w-5 ml-1" />
            </motion.button>
          </div>
          <div className="space-y-4">
            {accountRequests.map(request => (
              <motion.div
                key={request.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{request.clientName}</p>
                    <p className="text-sm text-gray-500">{request.type}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      {request.documents.map((doc, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                    >
                      <XCircle className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
