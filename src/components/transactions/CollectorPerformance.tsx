import React, { useState } from 'react';
import { Users, TrendingUp, Target, Clock, AlertTriangle, Star, Filter, Search, Download, Trophy } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Table from '../ui/Table';
import { formatCurrency } from '../../data/mockClients';

// Mock data for collectors performance
const collectorsData = [
  {
    id: 'COL001',
    name: 'Jean Dupont',
    zone: 'Médina',
    totalCollected: 25000000,
    dailyAverage: 850000,
    objectiveAchieved: 95,
    averageVisitTime: 12,
    visitsCompleted: 450,
    successRate: 98.5,
    failedTransactions: 8,
    regularCollections: 420,
    irregularCollections: 30,
    dailyCollectionAverage: 15,
    rating: 4.8,
    performance: 92,
    trend: [88, 90, 89, 92, 91, 93, 92],
    isTopPerformer: true
  },
  {
    id: 'COL002',
    name: 'Marie Lambert',
    zone: 'Plateau',
    totalCollected: 22000000,
    dailyAverage: 780000,
    objectiveAchieved: 88,
    averageVisitTime: 15,
    visitsCompleted: 380,
    successRate: 96.2,
    failedTransactions: 12,
    regularCollections: 350,
    irregularCollections: 30,
    dailyCollectionAverage: 13,
    rating: 4.6,
    performance: 85,
    trend: [82, 84, 83, 85, 84, 86, 85],
    isTopPerformer: false
  },
  {
    id: 'COL003',
    name: 'Amadou Diallo',
    zone: 'Point E',
    totalCollected: 28000000,
    dailyAverage: 920000,
    objectiveAchieved: 98,
    averageVisitTime: 10,
    visitsCompleted: 520,
    successRate: 99.1,
    failedTransactions: 5,
    regularCollections: 500,
    irregularCollections: 20,
    dailyCollectionAverage: 17,
    rating: 4.9,
    performance: 95,
    trend: [93, 94, 94, 95, 94, 96, 95],
    isTopPerformer: true
  },
  {
    id: 'COL004',
    name: 'Sophie Martin',
    zone: 'Almadies',
    totalCollected: 20000000,
    dailyAverage: 720000,
    objectiveAchieved: 85,
    averageVisitTime: 18,
    visitsCompleted: 320,
    successRate: 94.8,
    failedTransactions: 15,
    regularCollections: 290,
    irregularCollections: 30,
    dailyCollectionAverage: 11,
    rating: 4.4,
    performance: 82,
    trend: [80, 81, 82, 81, 83, 82, 82],
    isTopPerformer: false
  },
  {
    id: 'COL005',
    name: 'Pierre Sow',
    zone: 'Mermoz',
    totalCollected: 24000000,
    dailyAverage: 830000,
    objectiveAchieved: 92,
    averageVisitTime: 13,
    visitsCompleted: 420,
    successRate: 97.5,
    failedTransactions: 10,
    regularCollections: 390,
    irregularCollections: 30,
    dailyCollectionAverage: 14,
    rating: 4.7,
    performance: 88,
    trend: [85, 86, 87, 88, 87, 89, 88],
    isTopPerformer: true
  }
];

const CollectorPerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [selectedCollector, setSelectedCollector] = useState<string | null>(null);

  // Calculate summary statistics
  const stats = {
    totalCollected: collectorsData.reduce((acc, curr) => acc + curr.totalCollected, 0),
    averageSuccess: Math.round(
      collectorsData.reduce((acc, curr) => acc + curr.successRate, 0) / collectorsData.length
    ),
    averagePerformance: Math.round(
      collectorsData.reduce((acc, curr) => acc + curr.performance, 0) / collectorsData.length
    ),
    totalVisits: collectorsData.reduce((acc, curr) => acc + curr.visitsCompleted, 0)
  };

  // Get top 5 collectors
  const topCollectors = [...collectorsData]
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 5);

  const getPerformanceColor = (value: number) => {
    if (value >= 90) return 'success';
    if (value >= 75) return 'warning';
    return 'danger';
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total collecté</p>
                <p className="text-2xl font-semibold">{formatCurrency(stats.totalCollected)}</p>
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
                <p className="text-sm text-gray-500">Taux de réussite moyen</p>
                <p className="text-2xl font-semibold">{stats.averageSuccess}%</p>
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
                <p className="text-sm text-gray-500">Performance moyenne</p>
                <p className="text-2xl font-semibold">{stats.averagePerformance}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Star size={24} className="text-purple-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total visites</p>
                <p className="text-2xl font-semibold">{stats.totalVisits}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Users size={24} className="text-yellow-600" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <Card.Body>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top 5 Collecteurs</h3>
            <Trophy className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {topCollectors.map((collector, index) => (
              <div
                key={collector.id}
                className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-indigo-600">#{index + 1}</span>
                  <Badge variant={getPerformanceColor(collector.performance)}>
                    {collector.performance}%
                  </Badge>
                </div>
                <p className="font-medium text-gray-900">{collector.name}</p>
                <p className="text-sm text-gray-500">{collector.zone}</p>
                <div className="mt-2 text-sm text-yellow-500">{getRatingStars(collector.rating)}</div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un collecteur..."
            className="pl-10 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
            >
              <option value="all">Toutes les zones</option>
              <option value="medina">Médina</option>
              <option value="plateau">Plateau</option>
              <option value="point-e">Point E</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={performanceFilter}
              onChange={(e) => setPerformanceFilter(e.target.value)}
            >
              <option value="all">Toutes les performances</option>
              <option value="high">Performance élevée (&gt;90%)</option>
              <option value="medium">Performance moyenne (75-90%)</option>
              <option value="low">Performance faible (&lt;75%)</option>
            </select>
          </div>

          <Button 
            size="sm" 
            variant="outline"
            icon={<Download size={16} />}
          >
            Exporter
          </Button>
        </div>
      </div>

      {/* Collectors Table */}
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Collecteur</Table.HeadCell>
            <Table.HeadCell>Zone</Table.HeadCell>
            <Table.HeadCell>Montants collectés</Table.HeadCell>
            <Table.HeadCell>Objectifs</Table.HeadCell>
            <Table.HeadCell>Temps moyen</Table.HeadCell>
            <Table.HeadCell>Visites</Table.HeadCell>
            <Table.HeadCell>Taux de réussite</Table.HeadCell>
            <Table.HeadCell>Échecs</Table.HeadCell>
            <Table.HeadCell>Collectes</Table.HeadCell>
            <Table.HeadCell>Performance</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {collectorsData.map((collector) => (
            <React.Fragment key={collector.id}>
              <Table.Row
                className={selectedCollector === collector.id ? 'bg-gray-50' : ''}
                onClick={() => setSelectedCollector(
                  selectedCollector === collector.id ? null : collector.id
                )}
              >
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {collector.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{collector.name}</div>
                      <div className="text-sm text-gray-500">{collector.id}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{collector.zone}</Table.Cell>
                <Table.Cell>
                  <div>
                    <div className="font-medium">{formatCurrency(collector.totalCollected)}</div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(collector.dailyAverage)}/jour
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={getPerformanceColor(collector.objectiveAchieved)}>
                    {collector.objectiveAchieved}%
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium">{collector.averageVisitTime} min</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium">{collector.visitsCompleted}</div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={getPerformanceColor(collector.successRate)}>
                    {collector.successRate}%
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={collector.failedTransactions <= 10 ? 'success' : 'danger'}>
                    {collector.failedTransactions}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Régulières:</span>
                      <span className="font-medium">{collector.regularCollections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Irrégulières:</span>
                      <span className="font-medium">{collector.irregularCollections}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className={`h-2 rounded-full ${
                          collector.performance >= 90 ? 'bg-green-500' :
                          collector.performance >= 75 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${collector.performance}%` }}
                      />
                    </div>
                    <span className="font-medium">{collector.performance}%</span>
                  </div>
                </Table.Cell>
              </Table.Row>

              {selectedCollector === collector.id && (
                <Table.Row>
                  <Table.Cell colSpan={10}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Détails des performances</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Note moyenne:</span>
                              <span className="text-yellow-500">{getRatingStars(collector.rating)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Moyenne quotidienne:</span>
                              <span className="font-medium">{collector.dailyCollectionAverage} collectes</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Statut:</span>
                              <Badge variant={collector.isTopPerformer ? 'success' : 'secondary'}>
                                {collector.isTopPerformer ? 'Top performeur' : 'Standard'}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Évolution de la performance</h4>
                          <div className="h-20 bg-white rounded-lg p-2">
                            <div className="h-full flex items-end space-x-1">
                              {collector.trend.map((value, index) => (
                                <div
                                  key={index}
                                  className="flex-1 bg-indigo-500 rounded-t"
                                  style={{ height: `${value}%` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Actions rapides</h4>
                          <div className="space-y-2">
                            <Button size="sm" variant="outline" className="w-full">
                              Voir le planning
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              Historique complet
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              Modifier objectifs
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CollectorPerformance;