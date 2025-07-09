import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Phone, Mail, FileText, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Table from '../ui/Table';
import { mockClients, getRiskLevelColor, getTransactionStatusColor, formatCurrency } from '../../data/mockClients';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string | null;
}

const mapContainerStyle = {
  width: '100%',
  height: '300px'
};

const defaultCenter = {
  lat: 14.7167,
  lng: -17.4677
};

// Replace with your Google Maps API key from .env
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const ClientDetailsModal = ({ isOpen, onClose, clientId }: ClientDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'schedule' | 'documents' | 'activities' | 'location'>('overview');
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const client = mockClients.find(c => c.id === clientId);
  
  // Move useEffect outside of conditional rendering
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only run location updates when location tab is active and client exists
    if (activeTab === 'location' && client) {
      const updateLocation = () => {
        const lastTransaction = client.transactions[0];
        if (lastTransaction?.location) {
          const randomOffset = () => (Math.random() - 0.5) * 0.001;
          setCurrentLocation({
            lat: lastTransaction.location.latitude + randomOffset(),
            lng: lastTransaction.location.longitude + randomOffset()
          });
          setLocationError(null);
        } else {
          setLocationError("Aucune donnée de localisation disponible pour ce client");
          setCurrentLocation(null);
        }
      };

      // Initial update
      updateLocation();
      
      // Set up interval for updates
      interval = setInterval(updateLocation, 5000);
    } else {
      // Clear location data when not on location tab
      setCurrentLocation(null);
      setLocationError(null);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeTab, client]); // Include all dependencies used inside the effect

  if (!client) return null;

  const tabs = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'schedule', label: 'Planning collectes' },
    { id: 'documents', label: 'Documents' },
    { id: 'activities', label: 'Activités' },
    { id: 'location', label: 'Localisation' },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={`${client.firstName} ${client.lastName}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Client Header Info */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {client.businessName && (
                <span className="block text-sm text-gray-500">{client.businessName}</span>
              )}
              <span className="text-gray-500 text-sm">Code client:</span> {client.code}
            </h2>
            <div className="mt-1 flex items-center space-x-2">
              <Badge variant={getTransactionStatusColor(client.status)}>
                {client.status === 'active' ? 'Actif' : 
                 client.status === 'inactive' ? 'Inactif' : 
                 'Suspendu'}
              </Badge>
              <Badge variant={getRiskLevelColor(client.riskLevel)}>
                Risque {client.riskLevel === 'low' ? 'Faible' :
                        client.riskLevel === 'medium' ? 'Moyen' :
                        'Élevé'}
              </Badge>
              {client.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Client depuis</div>
            <div className="font-medium">{client.joinDate}</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
          {activeTab === 'location' && (
            <div className="space-y-4">
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Position en temps réel</h3>
                  {!GOOGLE_MAPS_API_KEY ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            La clé API Google Maps n'est pas configurée. Veuillez ajouter la variable d'environnement VITE_GOOGLE_MAPS_API_KEY.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : locationError ? (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{locationError}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          center={currentLocation || defaultCenter}
                          zoom={15}
                        >
                          {currentLocation && (
                            <Marker
                              position={currentLocation}
                              title={`${client.firstName} ${client.lastName}`}
                            />
                          )}
                        </GoogleMap>
                      </LoadScript>
                      {currentLocation && (
                        <div className="text-sm text-gray-600">
                          <div>Latitude: {currentLocation.lat.toFixed(6)}</div>
                          <div>Longitude: {currentLocation.lng.toFixed(6)}</div>
                          <div className="mt-2">
                            Dernière mise à jour: {new Date().toLocaleTimeString()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Historique des positions</h3>
                  <Table>
                    <Table.Head>
                      <Table.Row>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Position</Table.HeadCell>
                        <Table.HeadCell>Type d'activité</Table.HeadCell>
                        <Table.HeadCell>Collecteur</Table.HeadCell>
                      </Table.Row>
                    </Table.Head>
                    <Table.Body>
                      {client.transactions
                        .filter(t => t.location)
                        .map((transaction) => (
                          <Table.Row key={transaction.id}>
                            <Table.Cell>{transaction.date}</Table.Cell>
                            <Table.Cell>
                              {transaction.location && (
                                <div>
                                  <div>Lat: {transaction.location.latitude.toFixed(6)}</div>
                                  <div>Lng: {transaction.location.longitude.toFixed(6)}</div>
                                </div>
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              <Badge variant={getTransactionStatusColor(transaction.status)}>
                                {transaction.type === 'deposit' ? 'Dépôt' :
                                 transaction.type === 'withdrawal' ? 'Retrait' :
                                 'Paiement'}
                              </Badge>
                            </Table.Cell>
                            <Table.Cell>
                              {transaction.collector?.name}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {client.contacts.map((contact, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        {contact.type === 'phone' && <Phone className="text-gray-400" size={20} />}
                        {contact.type === 'email' && <Mail className="text-gray-400" size={20} />}
                        {contact.type === 'address' && <MapPin className="text-gray-400" size={20} />}
                        <div>
                          <div className="font-medium">{contact.value}</div>
                          <div className="text-sm text-gray-500">
                            {contact.type === 'phone' ? 'Téléphone' :
                             contact.type === 'email' ? 'Email' : 'Adresse'}
                            {contact.isPrimary && ' (Principal)'}
                            {contact.verified && ' ✓'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <Card.Body>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total collecté</p>
                        <p className="text-2xl font-semibold">
                          {formatCurrency(client.metrics.totalCollected)}
                        </p>
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
                        <p className="text-sm text-gray-500">Transaction moyenne</p>
                        <p className="text-2xl font-semibold">
                          {formatCurrency(client.metrics.averageTransaction)}
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <AlertTriangle size={24} className="text-green-600" />
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Taux de réussite</p>
                        <p className="text-2xl font-semibold">{client.metrics.successRate}%</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Clock size={24} className="text-purple-600" />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              {/* Preferences */}
              <Card>
                <Card.Body>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Langue</p>
                      <p className="font-medium">{client.preferences.language}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Canaux de communication</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {client.preferences.communicationChannel.map((channel) => (
                          <Badge key={channel} variant="secondary">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Préférences de notification</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {client.preferences.notificationPreferences.map((pref) => (
                          <Badge key={pref} variant="secondary">
                            {pref === 'collection_reminder' ? 'Rappel collecte' :
                             pref === 'transaction_confirmation' ? 'Confirmation transaction' :
                             'Relevé mensuel'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Notes */}
              {client.notes && (
                <Card>
                  <Card.Body>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
                    <p className="text-gray-600">{client.notes}</p>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Montant</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Statut</Table.HeadCell>
                    <Table.HeadCell>Collecteur</Table.HeadCell>
                    <Table.HeadCell>Notes</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {client.transactions.map((transaction) => (
                    <Table.Row key={transaction.id}>
                      <Table.Cell>{transaction.date}</Table.Cell>
                      <Table.Cell className="font-medium">
                        {formatCurrency(transaction.amount)}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="secondary">
                          {transaction.type === 'deposit' ? 'Dépôt' :
                           transaction.type === 'withdrawal' ? 'Retrait' :
                           'Paiement'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={getTransactionStatusColor(transaction.status)}>
                          {transaction.status === 'completed' ? 'Complété' :
                           transaction.status === 'pending' ? 'En attente' :
                           'Échoué'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        {transaction.collector?.name}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-sm text-gray-500">
                          {transaction.notes || '-'}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>Jour</Table.HeadCell>
                    <Table.HeadCell>Horaire</Table.HeadCell>
                    <Table.HeadCell>Collecteur</Table.HeadCell>
                    <Table.HeadCell>Montant</Table.HeadCell>
                    <Table.HeadCell>Fréquence</Table.HeadCell>
                    <Table.HeadCell>Statut</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {client.collectionSchedules.map((schedule, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{schedule.day}</Table.Cell>
                      <Table.Cell>{schedule.timeSlot}</Table.Cell>
                      <Table.Cell>{schedule.collector.name}</Table.Cell>
                      <Table.Cell className="font-medium">
                        {formatCurrency(schedule.amount)}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="secondary">
                          {schedule.frequency === 'daily' ? 'Quotidien' :
                           schedule.frequency === 'weekly' ? 'Hebdomadaire' :
                           'Mensuel'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge 
                          variant={
                            schedule.status === 'active' ? 'success' :
                            schedule.status === 'paused' ? 'warning' :
                            'danger'
                          }
                        >
                          {schedule.status === 'active' ? 'Actif' :
                           schedule.status === 'paused' ? 'En pause' :
                           'Annulé'}
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Numéro</Table.HeadCell>
                    <Table.HeadCell>Date d'émission</Table.HeadCell>
                    <Table.HeadCell>Date d'expiration</Table.HeadCell>
                    <Table.HeadCell>Statut</Table.HeadCell>
                    <Table.HeadCell>Vérifié par</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {client.documents.map((document, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <span>
                            {document.type === 'ID' ? 'Pièce d\'identité' :
                             document.type === 'proof_address' ? 'Justificatif de domicile' :
                             document.type === 'business_registration' ? 'Registre de commerce' :
                             'Document fiscal'}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{document.number}</Table.Cell>
                      <Table.Cell>{document.issueDate}</Table.Cell>
                      <Table.Cell>{document.expiryDate}</Table.Cell>
                      <Table.Cell>
                        <Badge 
                          variant={
                            document.status === 'valid' ? 'success' :
                            document.status === 'expired' ? 'danger' :
                            'warning'
                          }
                        >
                          {document.status === 'valid' ? 'Valide' :
                           document.status === 'expired' ? 'Expiré' :
                           'En attente'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{document.verifiedBy || '-'}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Statut</Table.HeadCell>
                    <Table.HeadCell>Traité par</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {client.activities.map((activity) => (
                    <Table.Row key={activity.id}>
                      <Table.Cell>{activity.date}</Table.Cell>
                      <Table.Cell>
                        <Badge variant="secondary">
                          {activity.type === 'account_update' ? 'Mise à jour compte' :
                           activity.type === 'contact_update' ? 'Mise à jour contact' :
                           activity.type === 'schedule_change' ? 'Modification horaire' :
                           activity.type === 'complaint' ? 'Réclamation' :
                           'Retour client'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{activity.description}</Table.Cell>
                      <Table.Cell>
                        <Badge 
                          variant={
                            activity.status === 'resolved' ? 'success' :
                            activity.status === 'pending' ? 'warning' :
                            'primary'
                          }
                        >
                          {activity.status === 'resolved' ? 'Résolu' :
                           activity.status === 'pending' ? 'En attente' :
                           'En cours'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{activity.handledBy || '-'}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ClientDetailsModal;