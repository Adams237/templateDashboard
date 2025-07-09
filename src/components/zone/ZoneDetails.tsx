import React, { useState } from 'react';
import { MapPin, Users, Calendar, TrendingUp, AlertTriangle, FileText, CheckCircle2, Edit2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { mockCollectors, mockZones, Zone } from '../../data/mockAssignments';

interface ZoneDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  zoneId: string | null;
}

type TabType = 'overview' | 'collectors' | 'schedule' | 'metrics' | 'risks';

const ZoneDetails = ({ isOpen, onClose, zoneId }: ZoneDetailsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  const zone = mockZones.find(z => z.id === zoneId);
  
  if (!zone) return null;

  const tabs = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'collectors', label: 'Collecteurs' },
    { id: 'schedule', label: 'Planning' },
    { id: 'metrics', label: 'Métriques' },
    { id: 'risks', label: 'Risques' },
  ];

  const handleCollectorChange = (newCollectorId: string) => {
    // Here you would implement the actual API call to change the collector
    console.log('Changing collector to:', newCollectorId);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={`Zone: ${zone.name}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Zone Header Info */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              <span className="block text-sm text-gray-500">Code zone:</span> {zone.id}
            </h2>
            <div className="mt-1 flex items-center space-x-2">
              <Badge variant="secondary">{zone.type}</Badge>
              <Badge 
                variant={
                  zone.riskLevel === 'Faible' ? 'success' :
                  zone.riskLevel === 'Moyen' ? 'warning' :
                  'danger'
                }
              >
                Risque {zone.riskLevel}
              </Badge>
              <Badge variant="primary">
                {zone.securityLevel}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Dernière audit</div>
            <div className="font-medium">{zone.lastAuditDate}</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Information */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informations clés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Fréquence de collecte</p>
                      <p className="font-medium">{zone.collectionFrequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nombre de clients</p>
                      <p className="font-medium">{zone.clientCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Montant moyen</p>
                      <p className="font-medium">{zone.averageAmount.toLocaleString()} FCFA</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Niveau de sécurité</p>
                      <p className="font-medium">{zone.securityLevel}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Access Points */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Points d'accès</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {zone.geographicalData.accessPoints.map((point, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Required Certifications */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications requises</h3>
                  <div className="flex flex-wrap gap-2">
                    {zone.requiredCertifications.map((cert, index) => (
                      <Badge key={index} variant="primary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}

          {activeTab === 'collectors' && (
            <div className="space-y-6">
              {/* Current Collector */}
              <Card>
                <Card.Body>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Collecteur principal</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Edit2 size={16} />}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Annuler' : 'Modifier'}
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={zone.collectorId}
                        onChange={(e) => handleCollectorChange(e.target.value)}
                      >
                        {mockCollectors.map((collector) => (
                          <option key={collector.id} value={collector.id}>
                            {collector.name} ({collector.id})
                          </option>
                        ))}
                      </select>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                          Annuler
                        </Button>
                        <Button size="sm" variant="primary">
                          Confirmer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        {zone.collectorName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{zone.collectorName}</div>
                        <div className="text-gray-500">{zone.collectorId}</div>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Backup Collectors */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Collecteurs de backup</h3>
                  <div className="space-y-4">
                    {zone.backupCollectors.map((collectorId) => {
                      const collector = mockCollectors.find(c => c.id === collectorId);
                      if (!collector) return null;
                      
                      return (
                        <div key={collectorId} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                              {collector.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{collector.name}</div>
                              <div className="text-gray-500">{collector.id}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">Backup</Badge>
                            <Button size="sm" variant="outline">
                              Détails
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {/* Peak Hours */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Heures de pointe</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Matin</h4>
                      {zone.peakHours
                        .filter(hour => parseInt(hour.split('-')[0]) < 12)
                        .map((hour, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <Clock size={16} className="text-gray-400" />
                            <span>{hour}</span>
                          </div>
                        ))}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Après-midi</h4>
                      {zone.peakHours
                        .filter(hour => parseInt(hour.split('-')[0]) >= 12)
                        .map((hour, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <Clock size={16} className="text-gray-400" />
                            <span>{hour}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Collection Schedule */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Planning des collectes</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-4">
                      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                        <div key={day} className="text-center">
                          <div className="font-medium text-gray-900">{day}</div>
                          <div className="mt-2 space-y-2">
                            <Badge variant="secondary">Matin</Badge>
                            <Badge variant="secondary">Après-midi</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <Card.Body>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Taux de collecte</p>
                        <p className="text-2xl font-semibold">{zone.performanceMetrics.collectionRate}%</p>
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
                        <p className="text-sm text-gray-500">Satisfaction client</p>
                        <p className="text-2xl font-semibold">{zone.performanceMetrics.clientSatisfaction}/5</p>
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
                        <p className="text-sm text-gray-500">Taux d'incidents</p>
                        <p className="text-2xl font-semibold">{zone.performanceMetrics.incidentRate}%</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle size={24} className="text-red-600" />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              {/* Detailed Metrics */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Métriques détaillées</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Taux de collecte</h4>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${zone.performanceMetrics.collectionRate}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Satisfaction client</h4>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${(zone.performanceMetrics.clientSatisfaction / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Temps de réponse moyen</h4>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-600 rounded-full"
                          style={{ width: `${(zone.performanceMetrics.averageResponseTime / 20) * 100}%` }}
                        />
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {zone.performanceMetrics.averageResponseTime} minutes
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-6">
              {/* Risk Assessment */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Évaluation des risques</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Niveau de risque global</span>
                      <Badge
                        variant={
                          zone.riskLevel === 'Faible' ? 'success' :
                          zone.riskLevel === 'Moyen' ? 'warning' :
                          'danger'
                        }
                      >
                        {zone.riskLevel}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Facteurs de risque</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-green-500 mr-2" />
                          <span>Zone sécurisée</span>
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                          <span>Fort trafic aux heures de pointe</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-green-500 mr-2" />
                          <span>Collecteurs certifiés</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Security Measures */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Mesures de sécurité</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Protocoles actifs</h4>
                      <div className="space-y-2">
                        <Badge variant="success">Vérification d'identité</Badge>
                        <Badge variant="success">Traçage GPS</Badge>
                        <Badge variant="success">Rapport temps réel</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Procédures d'urgence</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <AlertTriangle size={16} className="text-red-500 mr-2" />
                          <span>Protocole d'évacuation</span>
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle size={16} className="text-red-500 mr-2" />
                          <span>Contact d'urgence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ZoneDetails;