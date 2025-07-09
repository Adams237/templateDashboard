import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  FileText,
  MessageSquare,
  Map as MapIcon,
  Activity,
  Wallet,
  UserCheck,
  History,
  ArrowRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { StatusBadge } from '../common/Badge';
import Tabs from '../common/Tabs';
import type { Collector, Transaction } from '../../types';
import { formatCurrency, formatDateTime, formatPhoneNumber } from '../../utils/format';

interface CollectorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  collector: Collector;
}

const CollectorDetailsModal: React.FC<CollectorDetailsModalProps> = ({
  isOpen,
  onClose,
  collector,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Données simulées pour les graphiques
  const performanceData = [
    { date: '2024-03-10', amount: 280000, target: 300000 },
    { date: '2024-03-11', amount: 320000, target: 300000 },
    { date: '2024-03-12', amount: 290000, target: 300000 },
    { date: '2024-03-13', amount: 350000, target: 300000 },
    { date: '2024-03-14', amount: 310000, target: 300000 },
    { date: '2024-03-15', amount: 380000, target: 300000 },
  ];

  const zoneHistory = [
    {
      date: '2024-01-15',
      fromZone: 'Akwa Sud',
      toZone: 'Akwa Nord',
      reason: 'Réorganisation des équipes',
    },
    {
      date: '2023-11-01',
      fromZone: 'Deido',
      toZone: 'Akwa Sud',
      reason: 'Demande personnelle',
    },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      collector: {
        id: collector.id,
        name: collector.name,
        avatar: collector.avatar,
      },
      client: {
        id: '1',
        name: 'Boulangerie Express',
        type: 'business',
      },
      amount: 75000,
      status: 'completed',
      date: '2024-03-15T10:15:00',
      zone: collector.zone,
      paymentMethod: 'cash',
    },
    // ... autres transactions
  ];

  const stats = {
    dailyAverage: 320000,
    successRate: 92,
    clientRetention: 85,
    totalClients: 45,
    activeClients: 38,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails du collecteur"
      size="xl"
    >
      <div className="space-y-6">
        {/* En-tête du profil */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar
              src={collector.avatar}
              alt={collector.name}
              size="xl"
              status={collector.status === 'active' ? 'online' : 'offline'}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{collector.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <StatusBadge status={collector.status} />
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{collector.zone}</span>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {collector.email}
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {formatPhoneNumber(collector.phone)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<MessageSquare className="h-4 w-4" />}
            >
              Message
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<FileText className="h-4 w-4" />}
            >
              Rapport
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-4 w-4" />
                8%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Taux de réussite</p>
            <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded-lg">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-4 w-4" />
                12%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Moyenne journalière</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats.dailyAverage)}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-4 w-4" />
                5%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Rétention clients</p>
            <p className="text-2xl font-bold text-gray-900">{stats.clientRetention}%</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm text-gray-500">
                {stats.activeClients}/{stats.totalClients}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Clients actifs</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round((stats.activeClients / stats.totalClients) * 100)}%
            </p>
          </div>
        </div>

        {/* Onglets */}
        <Tabs
          tabs={[
            {
              id: 'overview',
              label: 'Aperçu',
              icon: <Activity className="h-4 w-4" />,
              content: (
                <div className="space-y-6">
                  {/* Graphique de performance */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Performance hebdomadaire
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(date) => format(new Date(date), 'dd/MM')}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            labelFormatter={(date) =>
                              format(new Date(date), 'dd MMMM yyyy', { locale: fr })
                            }
                          />
                          <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#0EA5E9"
                            fill="#BAE6FD"
                            name="Montant collecté"
                          />
                          <Area
                            type="monotone"
                            dataKey="target"
                            stroke="#6B7280"
                            fill="#E5E7EB"
                            name="Objectif"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Dernières transactions */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Dernières transactions
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<ArrowRight className="h-4 w-4" />}
                      >
                        Voir tout
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.status === 'completed'
                                  ? 'bg-green-100'
                                  : transaction.status === 'pending'
                                  ? 'bg-yellow-100'
                                  : 'bg-red-100'
                              }`}
                            >
                              {transaction.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : transaction.status === 'pending' ? (
                                <Clock className="h-5 w-5 text-yellow-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {transaction.client.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDateTime(transaction.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatCurrency(transaction.amount)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {transaction.paymentMethod === 'cash'
                                ? 'Espèces'
                                : transaction.paymentMethod === 'mobile_money'
                                ? 'Mobile Money'
                                : 'Carte'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 'history',
              label: 'Historique',
              icon: <History className="h-4 w-4" />,
              content: (
                <div className="space-y-6">
                  {/* Historique des zones */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Historique des zones
                    </h3>
                    <div className="space-y-4">
                      {zoneHistory.map((change, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="p-2 bg-blue-100 rounded-full">
                            <MapIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Transfert de zone
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(change.date), 'dd MMMM yyyy', {
                                locale: fr,
                              })}
                            </p>
                            <div className="mt-2 flex items-center text-sm">
                              <span className="text-gray-600">{change.fromZone}</span>
                              <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
                              <span className="text-gray-900 font-medium">
                                {change.toZone}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {change.reason}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Historique des performances */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Évolution des performances
                    </h3>
                    <div className="space-y-4">
                      {collector.history.map((record, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {format(new Date(record.date), 'dd MMMM yyyy', {
                                locale: fr,
                              })}
                            </p>
                            <p className="text-sm text-gray-500">
                              Taux de réussite: {record.success_rate}%
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatCurrency(record.amount)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 'stats',
              label: 'Statistiques',
              icon: <TrendingUp className="h-4 w-4" />,
              content: (
                <div className="space-y-6">
                  {/* Statistiques détaillées */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Performance par période
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Aujourd'hui</span>
                            <span className="font-medium text-gray-900">92%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: '92%' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Cette semaine</span>
                            <span className="font-medium text-gray-900">88%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: '88%' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Ce mois</span>
                            <span className="font-medium text-gray-900">85%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-purple-500 rounded-full"
                              style={{ width: '85%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Répartition des collectes
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                            <span className="text-gray-500">Réussies</span>
                          </div>
                          <span className="font-medium text-gray-900">75%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                            <span className="text-gray-500">En attente</span>
                          </div>
                          <span className="font-medium text-gray-900">15%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                            <span className="text-gray-500">Échouées</span>
                          </div>
                          <span className="font-medium text-gray-900">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Objectifs et progression */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Objectifs du mois
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-gray-500 mb-2">Montant total</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatCurrency(4200000)}
                          </span>
                          <span className="text-green-500 flex items-center">
                            <ArrowUpRight className="h-4 w-4" />
                            8%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: '84%' }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Objectif: {formatCurrency(5000000)}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-2">Nombre de clients</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-gray-900">
                            38
                          </span>
                          <span className="text-green-500 flex items-center">
                            <ArrowUpRight className="h-4 w-4" />
                            12%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: '92%' }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Objectif: 45
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-2">Taux de réussite</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-gray-900">
                            92%
                          </span>
                          <span className="text-green-500 flex items-center">
                            <ArrowUpRight className="h-4 w-4" />
                            5%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-purple-500 rounded-full"
                            style={{ width: '92%' }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Objectif: 95%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </Modal>
  );
};

export default CollectorDetailsModal;