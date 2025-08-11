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
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  MessageSquare,
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
} from 'recharts';
import type { Collector } from '../../types';
import Card, { StatCard } from '../common/Card';
import Button from '../common/Button';
import { StatusBadge } from '../common/Badge';
import Avatar from '../common/Avatar';
import Table from '../common/Table';
import { formatCurrency, formatDateTime } from '../../utils/format';

interface CollectorDetailsProps {
  collector: Collector;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}


const CollectorDetails: React.FC<CollectorDetailsProps> = ({
  collector,
  onEdit,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const performanceData = [
    { date: '2024-03-10', amount: 280000, target: 300000 },
    { date: '2024-03-11', amount: 320000, target: 300000 },
    { date: '2024-03-12', amount: 290000, target: 300000 },
    { date: '2024-03-13', amount: 350000, target: 300000 },
    { date: '2024-03-14', amount: 310000, target: 300000 },
    { date: '2024-03-15', amount: 380000, target: 300000 },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête du profil */}
      <div className="bg-white rounded-lg shadow-md p-6">
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
                  {collector.phone}
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
              icon={<Edit className="h-4 w-4" />}
              onClick={() => onEdit(collector.id)}
            >
              Modifier
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 className="h-4 w-4" />}
              onClick={() => onDelete(collector.id)}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Performance"
          value={`${collector.performance}%`}
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          trend={{ value: 5 }}
          color="blue"
        />
        <StatCard
          title="Collectes aujourd'hui"
          value={collector.collectionsToday.toString()}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          color="green"
        />
        <StatCard
          title="Montant total"
          value={formatCurrency(collector.totalAmount)}
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="purple"
        />
        <StatCard
          title="Dernière activité"
          value={format(new Date(collector.lastActive), 'HH:mm')}
          icon={<Clock className="h-6 w-6 text-white" />}
          color="orange"
        />
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Aperçu' },
              { id: 'transactions', label: 'Transactions' },
              { id: 'performance', label: 'Performance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Informations générales */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations générales
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>Zone d'activité</span>
                      </div>
                      <span className="font-medium text-gray-900">{collector.zone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>Date d'inscription</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {format(new Date(collector.lastActive), 'dd MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        <span>Taux de réussite</span>
                      </div>
                      <span className="font-medium text-gray-900">92%</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Statistiques mensuelles
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Objectif mensuel</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(5000000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Réalisé</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(4200000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Progression</span>
                      <span className="font-medium text-green-600">84%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: '84%' }}
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Graphique de performance */}
              <Card className="p-6">
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
              </Card>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Filtres et recherche */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <select className="rounded-lg border-gray-300 text-sm">
                    <option value="all">Toutes les transactions</option>
                    <option value="completed">Complétées</option>
                    <option value="pending">En attente</option>
                    <option value="failed">Échouées</option>
                  </select>
                  <select className="rounded-lg border-gray-300 text-sm">
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<FileText className="h-4 w-4" />}
                  >
                    Exporter
                  </Button>
                </div>
              </div>

              {/* Liste des transactions */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table
                  data={[
                    {
                      id: '1',
                      client: 'Boulangerie Express',
                      amount: 75000,
                      status: 'completed',
                      date: '2024-03-15T10:15:00',
                    },
                    {
                      id: '2',
                      client: 'Pharmacie Centrale',
                      amount: 120000,
                      status: 'pending',
                      date: '2024-03-15T09:30:00',
                    },
                    {
                      id: '3',
                      client: 'Restaurant Le Safoutier',
                      amount: 45000,
                      status: 'failed',
                      date: '2024-03-15T08:45:00',
                    },
                  ]}
                  columns={[
                    {
                      accessorKey: 'client',
                      header: 'Client',
                    },
                    {
                      accessorKey: 'amount',
                      header: 'Montant',
                      cell: (info) => formatCurrency(info.getValue() as number),
                    },
                    {
                      accessorKey: 'status',
                      header: 'Statut',
                      cell: (info) => (
                        <StatusBadge status={info.getValue() as any} />
                      ),
                    },
                    {
                      accessorKey: 'date',
                      header: 'Date',
                      cell: (info) => formatDateTime(info.getValue() as string),
                    },
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Taux de réussite
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-gray-900">92%</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-5 w-5 mr-1" />
                      <span>+5%</span>
                    </div>
                  </div>
                  <p className="text-gray-500 mt-2">
                    Par rapport au mois dernier
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Moyenne journalière
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatCurrency(350000)}
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-5 w-5 mr-1" />
                      <span>+8%</span>
                    </div>
                  </div>
                  <p className="text-gray-500 mt-2">
                    Sur les 30 derniers jours
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Clients fidélisés
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-gray-900">85%</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-5 w-5 mr-1" />
                      <span>+3%</span>
                    </div>
                  </div>
                  <p className="text-gray-500 mt-2">
                    Taux de rétention client
                  </p>
                </Card>
              </div>

              {/* Graphique de performance détaillé */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Évolution des performances
                  </h3>
                  <select className="rounded-lg border-gray-300 text-sm">
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                    <option value="quarter">Ce trimestre</option>
                  </select>
                </div>
                <div className="h-96">
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
              </Card>

              {/* Objectifs et progression */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Objectifs du mois
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Montant total</span>
                        <span className="font-medium text-gray-900">84%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: '84%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Nombre de clients</span>
                        <span className="font-medium text-gray-900">92%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: '92%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Taux de réussite</span>
                        <span className="font-medium text-gray-900">88%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-purple-500 rounded-full"
                          style={{ width: '88%' }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
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
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectorDetails;