import React, { useState } from 'react';
import { Search, Filter, Download, Users, TrendingUp, AlertTriangle, MapPin, List } from 'lucide-react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ClientDetailsModal from './ClientDetailsModal';
import ClientTrackingMap from './ClientTrackingMap';
import { mockClients, getRiskLevelColor, getStatusColor, formatCurrency } from '../../data/mockClients';

const ClientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showTracking, setShowTracking] = useState(false);

  const filteredClients = mockClients.filter(client => {
    if (statusFilter !== 'all' && client.status !== statusFilter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.firstName.toLowerCase().includes(searchLower) ||
        client.lastName.toLowerCase().includes(searchLower) ||
        client.code.toLowerCase().includes(searchLower) ||
        (client.businessName && client.businessName.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // Calculate summary statistics
  const summaryStats = {
    totalClients: mockClients.length,
    activeClients: mockClients.filter(c => c.status === 'active').length,
    totalCollected: mockClients.reduce((acc, curr) => acc + curr.metrics.totalCollected, 0),
    averageSuccess: Math.round(
      mockClients.reduce((acc, curr) => acc + curr.metrics.successRate, 0) / mockClients.length
    )
  };

  return (
    <div className="  space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Clients actifs</p>
                <p className="text-2xl font-semibold">{summaryStats.activeClients}</p>
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
                <p className="text-sm text-gray-500">Total collecté</p>
                <p className="text-2xl font-semibold">{formatCurrency(summaryStats.totalCollected)}</p>
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
                <p className="text-sm text-gray-500">Taux de réussite moyen</p>
                <p className="text-2xl font-semibold">{summaryStats.averageSuccess}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <AlertTriangle size={24} className="text-purple-600" />
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
            placeholder="Rechercher un client par nom, code..."
            className="pl-10 block h-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          {!showTracking && (
            <>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <select
                  className="block rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actifs</option>
                  <option value="inactive">Inactifs</option>
                  <option value="suspended">Suspendus</option>
                </select>
              </div>
              
              <Button 
                size="sm" 
                variant="outline"
                icon={<Download size={16} />}
              >
                Exporter
              </Button>
            </>
          )}

          {showTracking ? (
            <Button
              size="sm"
              variant="outline"
              icon={<List size={16} />}
              onClick={() => setShowTracking(false)}
            >
              Liste des clients
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              icon={<MapPin size={16} />}
              onClick={() => setShowTracking(true)}
            >
              Tracking
            </Button>
          )}
        </div>
      </div>

      {showTracking ? (
        <ClientTrackingMap />
      ) : (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Client</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Statut</Table.HeadCell>
              <Table.HeadCell>Niveau de risque</Table.HeadCell>
              <Table.HeadCell>Dernière activité</Table.HeadCell>
              <Table.HeadCell>Métriques</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filteredClients.map((client) => (
              <Table.Row key={client.id}>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {client.firstName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="text-gray-500">{client.code}</div>
                      {client.businessName && (
                        <div className="text-sm text-gray-500">{client.businessName}</div>
                      )}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="secondary">
                    {client.type === 'individual' ? 'Particulier' : 'Entreprise'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={getStatusColor(client.status)}>
                    {client.status === 'active' ? 'Actif' : 
                     client.status === 'inactive' ? 'Inactif' : 
                     'Suspendu'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={getRiskLevelColor(client.riskLevel)}>
                    {client.riskLevel === 'low' ? 'Faible' :
                     client.riskLevel === 'medium' ? 'Moyen' :
                     'Élevé'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <div className="font-medium">{client.lastActivity}</div>
                    <div className="text-sm text-gray-500">
                      {client.activities[0]?.type === 'account_update' ? 'Mise à jour compte' :
                       client.activities[0]?.type === 'contact_update' ? 'Mise à jour contact' :
                       client.activities[0]?.type === 'schedule_change' ? 'Modification horaire' :
                       client.activities[0]?.type === 'complaint' ? 'Réclamation' :
                       'Retour client'}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total collecté:</span>
                      <span className="font-medium">{formatCurrency(client.metrics.totalCollected)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Taux de réussite:</span>
                      <span className="font-medium">{client.metrics.successRate}%</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedClient(client.id)}
                  >
                    Détails
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <ClientDetailsModal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        clientId={selectedClient}
      />
    </div>
  );
};

export default ClientDashboard;