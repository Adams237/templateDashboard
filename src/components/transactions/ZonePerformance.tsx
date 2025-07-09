import React, { useState } from 'react';
import { MapPin, TrendingUp, Users, Target, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../data/mockClients';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for zone performance
const zoneData = [
  {
    id: 'Z001',
    name: 'Médina',
    collected: 25000000,
    objective: 30000000,
    objectivePercentage: 83.33,
    activeClients: 450,
    transactions: 1200,
    avgCollectionTime: 15,
    rejectionRate: 2.5,
    performance: 85
  },
  {
    id: 'Z002',
    name: 'Plateau',
    collected: 35000000,
    objective: 32000000,
    objectivePercentage: 109.38,
    activeClients: 580,
    transactions: 1500,
    avgCollectionTime: 12,
    rejectionRate: 1.8,
    performance: 92
  },
  {
    id: 'Z003',
    name: 'Point E',
    collected: 28000000,
    objective: 28000000,
    objectivePercentage: 100,
    activeClients: 320,
    transactions: 980,
    avgCollectionTime: 18,
    rejectionRate: 3.2,
    performance: 88
  },
  {
    id: 'Z004',
    name: 'Almadies',
    collected: 42000000,
    objective: 40000000,
    objectivePercentage: 105,
    activeClients: 620,
    transactions: 1800,
    avgCollectionTime: 10,
    rejectionRate: 1.5,
    performance: 95
  },
  {
    id: 'Z005',
    name: 'Mermoz',
    collected: 22000000,
    objective: 25000000,
    objectivePercentage: 88,
    activeClients: 280,
    transactions: 850,
    avgCollectionTime: 20,
    rejectionRate: 3.8,
    performance: 82
  }
];

const ZonePerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('collected');

  // Calculate summary statistics
  const totalCollected = zoneData.reduce((acc, zone) => acc + zone.collected, 0);
  const totalObjective = zoneData.reduce((acc, zone) => acc + zone.objective, 0);
  const avgObjectiveAchievement = (totalCollected / totalObjective) * 100;
  const totalActiveClients = zoneData.reduce((acc, zone) => acc + zone.activeClients, 0);
  const avgRejectionRate = zoneData.reduce((acc, zone) => acc + zone.rejectionRate, 0) / zoneData.length;

  // Sort zones by selected metric for ranking
  const sortedZones = [...zoneData].sort((a, b) => b[selectedMetric] - a[selectedMetric]);

  const getPerformanceColor = (value: number) => {
    if (value >= 90) return 'success';
    if (value >= 75) return 'warning';
    return 'danger';
  };

  const getObjectiveColor = (percentage: number) => {
    if (percentage >= 100) return 'success';
    if (percentage >= 85) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total collecté</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalCollected)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Objectif atteint</p>
                <p className="text-2xl font-semibold">{avgObjectiveAchievement.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Target size={24} className="text-green-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Clients actifs</p>
                <p className="text-2xl font-semibold">{totalActiveClients}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users size={24} className="text-purple-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taux de rejet moyen</p>
                <p className="text-2xl font-semibold">{avgRejectionRate.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="month">Ce mois</option>
          <option value="quarter">Ce trimestre</option>
          <option value="year">Cette année</option>
        </select>

        <select
          className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          <option value="collected">Montant collecté</option>
          <option value="objectivePercentage">Objectif atteint</option>
          <option value="activeClients">Clients actifs</option>
          <option value="performance">Performance globale</option>
        </select>
      </div>

      {/* Performance Table */}
      <Card>
        <Card.Body>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance par zone</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant collecté</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objectif atteint</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients actifs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Délai moyen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux de rejet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {zoneData.map((zone) => (
                  <tr key={zone.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-medium">{zone.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(zone.collected)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getObjectiveColor(zone.objectivePercentage)}>
                        {zone.objectivePercentage.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {zone.activeClients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {zone.transactions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {zone.avgCollectionTime} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={zone.rejectionRate <= 2 ? 'success' : 'danger'}>
                        {zone.rejectionRate}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              zone.performance >= 90 ? 'bg-green-500' :
                              zone.performance >= 75 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${zone.performance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{zone.performance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Performance Ranking */}
      <Card>
        <Card.Body>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Classement des zones</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedZones}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip
                  formatter={(value: any) => {
                    if (selectedMetric === 'collected') return formatCurrency(value);
                    return `${value}${selectedMetric === 'objectivePercentage' ? '%' : ''}`;
                  }}
                />
                <Bar
                  dataKey={selectedMetric}
                  fill="#4F46E5"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      {/* Performance Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition des performances</h3>
            <div className="grid grid-cols-5 gap-2">
              {zoneData.map((zone) => (
                <div
                  key={zone.id}
                  className={`p-4 rounded-lg ${
                    zone.performance >= 90 ? 'bg-green-100' :
                    zone.performance >= 75 ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}
                >
                  <p className="text-sm font-medium">{zone.name}</p>
                  <p className={`text-lg font-semibold ${
                    zone.performance >= 90 ? 'text-green-700' :
                    zone.performance >= 75 ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {zone.performance}%
                  </p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Indicateurs clés par zone</h3>
            <div className="space-y-4">
              {zoneData.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium">{zone.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={getObjectiveColor(zone.objectivePercentage)}>
                      {zone.objectivePercentage.toFixed(1)}% obj.
                    </Badge>
                    <Badge variant={zone.rejectionRate <= 2 ? 'success' : 'danger'}>
                      {zone.rejectionRate}% rejets
                    </Badge>
                    <Badge variant={getPerformanceColor(zone.performance)}>
                      {zone.performance}% perf.
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ZonePerformance;