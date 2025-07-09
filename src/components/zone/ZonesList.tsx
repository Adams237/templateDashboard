import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, TrendingUp } from 'lucide-react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ZoneDetails from './ZoneDetails';
import { mockZones } from '../../data/mockAssignments';

const ZonesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredZones = mockZones.filter(zone => {
    if (filter !== 'all' && zone.type !== filter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        zone.name.toLowerCase().includes(searchLower) ||
        zone.collectorName.toLowerCase().includes(searchLower) ||
        zone.type.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const summaryStats = {
    totalZones: mockZones.length,
    totalClients: mockZones.reduce((acc, curr) => acc + curr.clientCount, 0),
    averageAmount: Math.round(
      mockZones.reduce((acc, curr) => acc + curr.averageAmount, 0) / mockZones.length
    ),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total des zones</p>
                <p className="text-2xl font-semibold">{summaryStats.totalZones}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MapPin size={24} className="text-blue-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total clients</p>
                <p className="text-2xl font-semibold">{summaryStats.totalClients}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users size={24} className="text-green-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Montant moyen</p>
                <p className="text-2xl font-semibold">{summaryStats.averageAmount.toLocaleString()} FCFA</p>
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
            placeholder="Rechercher une zone..."
            className="pl-10 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="block h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="Marché">Marché</option>
              <option value="Commercial">Commercial</option>
              <option value="Industriel">Industriel</option>
              <option value="Résidentiel">Résidentiel</option>
              <option value="Mixte">Mixte</option>
            </select>
          </div>
        </div>
      </div>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Zone</Table.HeadCell>
            <Table.HeadCell>Collecteur</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Clients</Table.HeadCell>
            <Table.HeadCell>Montant moyen</Table.HeadCell>
            <Table.HeadCell>Niveau de risque</Table.HeadCell>
            <Table.HeadCell>Métriques</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filteredZones.map((zone) => (
            <React.Fragment key={zone.id}>
              <Table.Row
                className={selectedZone === zone.id ? 'bg-gray-50' : ''}
                onClick={() => setSelectedZone(
                  selectedZone === zone.id ? null : zone.id
                )}
              >
                <Table.Cell>
                  <div className="flex items-center">
                    <MapPin size={20} className="text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">{zone.name}</div>
                      <div className="text-sm text-gray-500">{zone.id}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {zone.collectorName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{zone.collectorName}</div>
                      <div className="text-gray-500">{zone.collectorId}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="secondary">
                    {zone.type}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium">{zone.clientCount}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium">{zone.averageAmount.toLocaleString()} FCFA</div>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={
                      zone.riskLevel === 'Faible' ? 'success' :
                      zone.riskLevel === 'Moyen' ? 'warning' :
                      'danger'
                    }
                  >
                    {zone.riskLevel}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Taux de collecte:</span>
                      <span className="font-medium">{zone.performanceMetrics.collectionRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Satisfaction:</span>
                      <span className="font-medium">{zone.performanceMetrics.clientSatisfaction}/5</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedZone(zone.id);
                      setShowDetails(true);
                    }}
                  >
                    Détails
                  </Button>
                </Table.Cell>
              </Table.Row>

              {selectedZone === zone.id && (
                <Table.Row>
                  <Table.Cell colSpan={8}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Informations détaillées</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Fréquence de collecte: </span>
                              <span className="font-medium">{zone.collectionFrequency}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Niveau de sécurité: </span>
                              <span className="font-medium">{zone.securityLevel}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Dernière audit: </span>
                              <span className="font-medium">{zone.lastAuditDate}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Heures de pointe</h4>
                          <div className="space-y-2 text-sm">
                            {zone.peakHours.map((hour, index) => (
                              <div key={index} className="flex items-center">
                                <span className="font-medium">{hour}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Collecteurs de backup</h4>
                          <div className="space-y-2 text-sm">
                            {zone.backupCollectors.map((collectorId) => {
                              const collector = mockZones.find(z => z.collectorId === collectorId);
                              return (
                                <div key={collectorId} className="flex items-center">
                                  <span className="font-medium">{collector?.collectorName}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Points d'accès</h4>
                        <div className="flex flex-wrap gap-2">
                          {zone.geographicalData.accessPoints.map((point, index) => (
                            <Badge key={index} variant="secondary">
                              {point}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Certifications requises</h4>
                        <div className="flex flex-wrap gap-2">
                          {zone.requiredCertifications.map((cert, index) => (
                            <Badge key={index} variant="primary">
                              {cert}
                            </Badge>
                          ))}
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

      <ZoneDetails
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedZone(null);
        }}
        zoneId={selectedZone}
      />
    </div>
  );
};

export default ZonesList;