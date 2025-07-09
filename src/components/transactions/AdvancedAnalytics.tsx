import React, { useState } from 'react';
import { TrendingUp, Users, AlertTriangle, Target, ArrowUpRight, ArrowDownRight, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../data/mockClients';

// Mock data for projections
const projectionData = [
  { month: 'Jan', actual: 12500000, projected: 13000000 },
  { month: 'Fév', actual: 13800000, projected: 14000000 },
  { month: 'Mar', actual: 15200000, projected: 15000000 },
  { month: 'Avr', actual: 14700000, projected: 16000000 },
  { month: 'Mai', actual: 16500000, projected: 17000000 },
  { month: 'Juin', actual: 17800000, projected: 18000000 },
  { month: 'Juil', actual: null, projected: 19000000 },
  { month: 'Aoû', actual: null, projected: 20000000 },
  { month: 'Sep', actual: null, projected: 21000000 },
  { month: 'Oct', actual: null, projected: 22000000 },
  { month: 'Nov', actual: null, projected: 23000000 },
  { month: 'Déc', actual: null, projected: 24000000 }
];

// Mock data for comparative analysis
const comparativeData = [
  { period: 'S1', collectors: 42, zones: 5, volume: 15200000 },
  { period: 'S2', collectors: 45, zones: 5, volume: 17800000 },
  { period: 'S3', collectors: 48, zones: 6, volume: 19500000 },
  { period: 'S4', collectors: 45, zones: 6, volume: 18200000 }
];

// Mock data for profitability analysis
const profitabilityData = [
  { zone: 'Médina', revenue: 25000000, costs: 18000000, margin: 28 },
  { zone: 'Plateau', revenue: 35000000, costs: 24000000, margin: 31 },
  { zone: 'Point E', revenue: 28000000, costs: 19000000, margin: 32 },
  { zone: 'Almadies', revenue: 42000000, costs: 28000000, margin: 33 },
  { zone: 'Mermoz', revenue: 22000000, costs: 16000000, margin: 27 }
];

// Mock data for high potential clients
const highPotentialClients = [
  { 
    id: 'CLT001',
    name: 'Amadou Diallo',
    currentVolume: 250000,
    potentialVolume: 400000,
    growthRate: 60,
    lastActivity: '2025-03-20',
    risk: 'low'
  },
  { 
    id: 'CLT002',
    name: 'Fatou Ndiaye',
    currentVolume: 180000,
    potentialVolume: 280000,
    growthRate: 55,
    lastActivity: '2025-03-19',
    risk: 'medium'
  },
  { 
    id: 'CLT003',
    name: 'Moussa Sow',
    currentVolume: 320000,
    potentialVolume: 480000,
    growthRate: 50,
    lastActivity: '2025-03-20',
    risk: 'low'
  }
];

// Mock data for churn risk analysis
const churnRiskData = [
  { 
    id: 'CLT004',
    name: 'Ibrahim Diop',
    lastTransaction: '2025-02-15',
    volumeDrop: 45,
    previousAverage: 280000,
    currentAverage: 154000,
    riskScore: 85
  },
  { 
    id: 'CLT005',
    name: 'Marie Faye',
    lastTransaction: '2025-02-20',
    volumeDrop: 35,
    previousAverage: 220000,
    currentAverage: 143000,
    riskScore: 75
  }
];

// Mock data for correlation analysis
const correlationData = [
  { date: '2025-03-15', weather: 'Sunny', events: 'Normal', collections: 850000 },
  { date: '2025-03-16', weather: 'Rainy', events: 'Market Day', collections: 720000 },
  { date: '2025-03-17', weather: 'Sunny', events: 'Holiday', collections: 650000 },
  { date: '2025-03-18', weather: 'Cloudy', events: 'Normal', collections: 780000 },
  { date: '2025-03-19', weather: 'Sunny', events: 'Payday', collections: 950000 }
];

// Mock data for client loyalty
const loyaltyData = [
  { duration: '0-3 mois', count: 120, retentionRate: 85 },
  { duration: '3-6 mois', count: 180, retentionRate: 88 },
  { duration: '6-12 mois', count: 250, retentionRate: 92 },
  { duration: '1-2 ans', count: 180, retentionRate: 95 },
  { duration: '2+ ans', count: 120, retentionRate: 98 }
];

const AdvancedAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedZone, setSelectedZone] = useState('all');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <select
            className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">Toutes les zones</option>
            <option value="medina">Médina</option>
            <option value="plateau">Plateau</option>
            <option value="point-e">Point E</option>
          </select>
        </div>
      </div>

      {/* Projections */}
      <Card>
        <Card.Body>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Projection d'atteinte d'objectifs mensuels</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Mois: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Réalisé"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  name="Projection"
                  stroke="#EA580C"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      {/* Comparative Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Analyse comparative</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="collectors"
                    name="Collecteurs"
                    fill="#4F46E5"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="zones"
                    name="Zones"
                    fill="#EA580C"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="volume"
                    name="Volume"
                    fill="#059669"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Analyse de rentabilité par zone</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenus" fill="#4F46E5" />
                  <Bar dataKey="costs" name="Coûts" fill="#EA580C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* High Potential Clients */}
      <Card>
        <Card.Body>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Clients à haut potentiel</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume actuel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume potentiel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Croissance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière activité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risque</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {highPotentialClients.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {client.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(client.currentVolume)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(client.potentialVolume)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-600">+{client.growthRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={client.risk === 'low' ? 'success' : 'warning'}
                      >
                        {client.risk === 'low' ? 'Faible' : 'Moyen'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Churn Risk Analysis */}
      <Card>
        <Card.Body>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risques de décrochage</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baisse du volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyenne précédente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyenne actuelle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score de risque</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {churnRiskData.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {client.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.lastTransaction}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-red-600">-{client.volumeDrop}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(client.previousAverage)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(client.currentAverage)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          client.riskScore >= 80 ? 'danger' :
                          client.riskScore >= 60 ? 'warning' :
                          'success'
                        }
                      >
                        {client.riskScore}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Correlation Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Corrélation météo / événements / collecte</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Météo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Événements</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collections</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {correlationData.map((day, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{day.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{day.weather}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{day.events}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(day.collections)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Taux de fidélité client</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loyaltyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="duration" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="retentionRate"
                    name="Taux de rétention"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;