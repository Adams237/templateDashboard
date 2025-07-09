import React, { useState } from 'react';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Calendar, Download, Search, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { mockAssignmentHistory } from '../../data/mockAssignments';

const AssignmentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);

  // Apply filtering based on search term and date filter
  const filteredHistory = mockAssignmentHistory.filter(item => {
    // Date filter
    if (dateFilter === 'last-month' && !item.isLastMonth) return false;
    if (dateFilter === 'last-week' && !item.isLastWeek) return false;
    
    // Search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.collector?.name.toLowerCase().includes(searchLower) ||
        item.originalCollector?.name.toLowerCase().includes(searchLower) ||
        item.zone?.name.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Calculate summary statistics
  const summaryStats = {
    totalCollections: filteredHistory.reduce((acc, curr) => acc + curr.collectionCount, 0),
    averagePerformance: Math.round(
      filteredHistory.reduce((acc, curr) => acc + curr.performance, 0) / filteredHistory.length
    ),
    totalAmount: filteredHistory.reduce((acc, curr) => acc + curr.metrics.totalCollected, 0),
    successRate: Math.round(
      filteredHistory.reduce((acc, curr) => acc + curr.metrics.successRate, 0) / filteredHistory.length
    )
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total des collectes</p>
                <p className="text-2xl font-semibold">{summaryStats.totalCollections}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance moyenne</p>
                <p className="text-2xl font-semibold">{summaryStats.averagePerformance}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Montant total collecté</p>
                <p className="text-2xl font-semibold">{(summaryStats.totalAmount / 1000000).toFixed(1)}M</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle size={24} className="text-yellow-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taux de réussite</p>
                <p className="text-2xl font-semibold">{summaryStats.successRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un collecteur, une zone..."
            className="pl-10 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <select
              className="block h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">Toutes les périodes</option>
              <option value="last-week">7 derniers jours</option>
              <option value="last-month">30 derniers jours</option>
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

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Collecteur affecté</Table.HeadCell>
            <Table.HeadCell>Collecteur d'origine</Table.HeadCell>
            <Table.HeadCell>Zone</Table.HeadCell>
            <Table.HeadCell>Période</Table.HeadCell>
            <Table.HeadCell>Durée</Table.HeadCell>
            <Table.HeadCell>Performance</Table.HeadCell>
            <Table.HeadCell>Métriques</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filteredHistory.map((item) => (
            <React.Fragment key={item.id}>
              <Table.Row
                className={selectedHistory === item.id ? 'bg-gray-50' : ''}
                onClick={() => setSelectedHistory(
                  selectedHistory === item.id ? null : item.id
                )}
              >
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {item.collector?.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{item.collector?.name}</div>
                      <div className="text-gray-500">{item.collector?.id}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {item.originalCollector?.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{item.originalCollector?.name}</div>
                      <div className="text-gray-500">{item.originalCollector?.id}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{item.zone?.name}</Table.Cell>
                <Table.Cell>
                  <div>
                    <div>{item.startDate}</div>
                    <div className="text-gray-500">{item.endDate}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>{item.duration}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          item.performance >= 85 ? 'bg-green-600' : 
                          item.performance >= 60 ? 'bg-yellow-500' : 
                          'bg-red-600'
                        }`}
                        style={{ width: `${item.performance}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm">{item.performance}%</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Collectes:</span>
                      <span className="font-medium">{item.collectionCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Montant:</span>
                      <span className="font-medium">
                        {item.metrics.totalCollected.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button size="sm" variant="outline">
                    Rapport
                  </Button>
                </Table.Cell>
              </Table.Row>

              {selectedHistory === item.id && (
                <Table.Row>
                  <Table.Cell colSpan={8}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Métriques détaillées</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Taux de réussite: </span>
                              <span className="font-medium">{item.metrics.successRate}%</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Satisfaction client: </span>
                              <span className="font-medium">{item.metrics.clientSatisfaction}/5</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Incidents: </span>
                              <span className="font-medium">{item.metrics.incidentCount}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Taux de résolution: </span>
                              <span className="font-medium">{item.metrics.resolutionRate}%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Défis rencontrés</h4>
                          <div className="space-y-2 text-sm">
                            {item.challenges.length > 0 ? (
                              item.challenges.map((challenge, index) => (
                                <div key={index} className="border-l-2 border-yellow-500 pl-2">
                                  <div className="font-medium">{challenge.type}</div>
                                  <div className="text-gray-500">{challenge.description}</div>
                                  <div className="text-gray-500">
                                    <span className="text-gray-700">Resolution:</span> {challenge.resolution}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">Aucun défi majeur signalé</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Retours</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Superviseur: </span>
                              <span className="font-medium">{item.feedback.supervisor}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Clients: </span>
                              <span className="font-medium">{item.feedback.clients}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Auto-évaluation: </span>
                              <span className="font-medium">{item.feedback.selfAssessment}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {item.learnings.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Apprentissages clés</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {item.learnings.map((learning, index) => (
                              <li key={index} className="text-sm text-gray-600">{learning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
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

export default AssignmentHistory;