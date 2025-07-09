import React, { useState } from 'react';
import Table from '../../utils/Table';
import Badge from '../../utils/Badge';
import Button from '../../utils/Button';
import { Search, Filter, MapPin, Calendar, RefreshCw, AlertTriangle, TrendingUp, Clock, FileText } from 'lucide-react';
import { mockAssignments} from '../../data/mockAssignments'
import Card from '../../utils/Card';

const AssignmentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  const filteredAssignments = mockAssignments.filter(assignment => {
    if (filter !== 'all' && assignment.status !== filter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        assignment.collector?.name.toLowerCase().includes(searchLower) ||
        assignment.originalCollector?.name.toLowerCase().includes(searchLower) ||
        assignment.zone?.name.toLowerCase().includes(searchLower) ||
        assignment.reason.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'secondary';
      case 'scheduled':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 85) return 'bg-green-600';
    if (performance >= 60) return 'bg-yellow-500';
    return 'bg-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un collecteur, une zone, un motif..."
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="completed">Terminés</option>
              <option value="scheduled">Programmés</option>
            </select>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            icon={<FileText size={16} />}
          >
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Affectations actives</p>
                <p className="text-2xl font-semibold">
                  {mockAssignments.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock size={24} className="text-blue-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance moyenne</p>
                <p className="text-2xl font-semibold">
                  {Math.round(
                    mockAssignments
                      .filter(a => a.status === 'active')
                      .reduce((acc, curr) => acc + curr.performance, 0) /
                    mockAssignments.filter(a => a.status === 'active').length
                  )}%
                </p>
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
                <p className="text-sm text-gray-500">Collectes réalisées</p>
                <p className="text-2xl font-semibold">
                  {mockAssignments
                    .filter(a => a.status === 'active')
                    .reduce((acc, curr) => acc + curr.metrics.collectionsCompleted, 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <AlertTriangle size={24} className="text-purple-600" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Collecteur affecté</Table.HeadCell>
            <Table.HeadCell>Collecteur d'origine</Table.HeadCell>
            <Table.HeadCell>Zone</Table.HeadCell>
            <Table.HeadCell>Période</Table.HeadCell>
            <Table.HeadCell>Statut</Table.HeadCell>
            <Table.HeadCell>Performance</Table.HeadCell>
            <Table.HeadCell>Métriques</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filteredAssignments.map((assignment) => (
            <React.Fragment key={assignment.id}>
              <Table.Row 
                className={selectedAssignment === assignment.id ? 'bg-gray-50' : ''}
                onClick={() => setSelectedAssignment(
                  selectedAssignment === assignment.id ? null : assignment.id
                )}
              >
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {assignment.collector?.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{assignment.collector?.name}</div>
                      <div className="text-gray-500">{assignment.collector?.id}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {assignment.originalCollector?.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{assignment.originalCollector?.name}</div>
                      <div className="text-gray-500">{assignment.originalCollector?.id}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <span>{assignment.zone?.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <div>
                      <div>{assignment.startDate}</div>
                      <div className="text-gray-500">{assignment.endDate}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge 
                    variant={getStatusColor(assignment.status)}
                  >
                    {assignment.status === 'active' ? 'Actif' : 
                     assignment.status === 'completed' ? 'Terminé' : 
                     'Programmé'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getPerformanceColor(assignment.performance)}`}
                        style={{ width: `${assignment.performance}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm">{assignment.performance}%</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Collectes:</span>
                      <span className="font-medium">{assignment.metrics.collectionsCompleted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Montant:</span>
                      <span className="font-medium">{assignment.metrics.totalAmount.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Détails
                    </Button>
                    {assignment.status === 'active' && (
                      <Button size="sm" variant="danger">
                        Terminer
                      </Button>
                    )}
                    {assignment.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        variant="primary" 
                        icon={<RefreshCw size={14} />}
                      >
                        Modifier
                      </Button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
              
              {selectedAssignment === assignment.id && (
                <Table.Row>
                  <Table.Cell colSpan={8}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Informations détaillées</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Motif: </span>
                              <span className="font-medium">{assignment.reason}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Approuvé par: </span>
                              <span className="font-medium">{assignment.approvedBy}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Date d'approbation: </span>
                              <span className="font-medium">{assignment.approvalDate}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Métriques détaillées</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Taux de réussite: </span>
                              <span className="font-medium">{assignment.metrics.successRate}%</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Visites clients: </span>
                              <span className="font-medium">{assignment.metrics.clientVisits}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Temps de réponse moyen: </span>
                              <span className="font-medium">{assignment.metrics.averageResponseTime} min</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Statut formation</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Formation complétée: </span>
                              <Badge variant={assignment.trainingCompleted ? 'success' : 'warning'}>
                                {assignment.trainingCompleted ? 'Oui' : 'Non'}
                              </Badge>
                            </div>
                            {assignment.trainingCompleted && (
                              <div>
                                <span className="text-gray-500">Date de formation: </span>
                                <span className="font-medium">{assignment.trainingDate}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-gray-500">Niveau de risque: </span>
                              <Badge 
                                variant={
                                  assignment.riskAssessment === 'Faible' ? 'success' :
                                  assignment.riskAssessment === 'Moyen' ? 'warning' :
                                  'danger'
                                }
                              >
                                {assignment.riskAssessment}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {assignment.handoverNotes && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Notes de passation</h4>
                          <p className="text-sm text-gray-600">{assignment.handoverNotes}</p>
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

export default AssignmentsList;