import React, { useState } from 'react';
import { Calendar, Download, Search, Filter, TrendingUp, AlertTriangle, Clock, FileText, Upload } from 'lucide-react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { mockTransactions } from '../../data/mockTransactions';
import { formatCurrency } from '../../data/mockClients';

const TransactionsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (dateFilter !== 'all') {
      if (dateFilter === 'today' && !transaction.isToday) return false;
      if (dateFilter === 'week' && !transaction.isThisWeek) return false;
      if (dateFilter === 'month' && !transaction.isThisMonth) return false;
    }

    if (typeFilter !== 'all' && transaction.type !== typeFilter) return false;
    if (statusFilter !== 'all' && transaction.status !== statusFilter) return false;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        transaction.client.name.toLowerCase().includes(searchLower) ||
        transaction.client.code.toLowerCase().includes(searchLower) ||
        transaction.collector.name.toLowerCase().includes(searchLower) ||
        transaction.reference.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const stats = {
    totalAmount: filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0),
    successRate: Math.round(
      (filteredTransactions.filter(t => t.status === 'validated').length / filteredTransactions.length) * 100
    ),
    averageAmount: Math.round(
      filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0) / filteredTransactions.length
    ),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'success';
      case 'withdrawal':
        return 'warning';
      case 'transfer':
        return 'primary';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className=" w-[70vw] overflow-x-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total des transactions</p>
                <p className="text-2xl font-semibold">{formatCurrency(stats.totalAmount)}</p>
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
                <p className="text-sm text-gray-500">Taux de réussite</p>
                <p className="text-2xl font-semibold">{stats.successRate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Clock size={24} className="text-green-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Montant moyen</p>
                <p className="text-2xl font-semibold">{formatCurrency(stats.averageAmount)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <AlertTriangle size={24} className="text-purple-600" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par client, collecteur, référence..."
            className="pl-10 block h-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="block h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="deposit">Dépôts</option>
              <option value="withdrawal">Retraits</option>
              <option value="transfer">Transferts</option>
              <option value="rejected">Rejets</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="block h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="validated">Validées</option>
              <option value="pending">En attente</option>
              <option value="rejected">Rejetées</option>
            </select>
          </div>

          <Button 
            size="sm" 
            variant="outline"
            icon={<Download size={16} />}
          >
            Exporter
          </Button>

          <Button 
            size="sm" 
            variant="outline"
            icon={<Upload size={16} />}
          >
            Importer
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Date & Heure</Table.HeadCell>
            <Table.HeadCell>Client</Table.HeadCell>
            <Table.HeadCell>Collecteur</Table.HeadCell>
            <Table.HeadCell>Montant</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Statut</Table.HeadCell>
            <Table.HeadCell>Zone</Table.HeadCell>
            <Table.HeadCell>Référence</Table.HeadCell>
            <Table.HeadCell>Source</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filteredTransactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <Table.Row
                className={selectedTransaction === transaction.id ? 'bg-gray-50' : ''}
                onClick={() => setSelectedTransaction(
                  selectedTransaction === transaction.id ? null : transaction.id
                )}
              >
                <Table.Cell>
                  <div>
                    <div className="font-medium">{transaction.date}</div>
                    <div className="text-sm text-gray-500">{transaction.time}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <div className="font-medium">{transaction.client.name}</div>
                    <div className="text-sm text-gray-500">{transaction.client.code}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium">{transaction.collector.name}</div>
                </Table.Cell>
                <Table.Cell className="font-medium">
                  {formatCurrency(transaction.amount)}
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={getTypeColor(transaction.type)}>
                    {transaction.type === 'deposit' ? 'Dépôt' :
                     transaction.type === 'withdrawal' ? 'Retrait' :
                     transaction.type === 'transfer' ? 'Transfert' :
                     'Rejet'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={getStatusColor(transaction.status)}>
                    {transaction.status === 'validated' ? 'Validée' :
                     transaction.status === 'pending' ? 'En attente' :
                     'Rejetée'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{transaction.zone}</Table.Cell>
                <Table.Cell>
                  <div className="font-mono text-sm">{transaction.reference}</div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="secondary">
                    {transaction.source === 'mobile' ? 'Mobile' :
                     transaction.source === 'admin' ? 'Admin' :
                     'Import'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    icon={<FileText size={14} />}
                  >
                    Détails
                  </Button>
                </Table.Cell>
              </Table.Row>

              {selectedTransaction === transaction.id && (
                <Table.Row>
                  <Table.Cell colSpan={10}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Détails du paiement</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Mode de paiement: </span>
                              <span className="font-medium">{transaction.paymentMethod}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Frais: </span>
                              <span className="font-medium">{formatCurrency(transaction.fees)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Total: </span>
                              <span className="font-medium">{formatCurrency(transaction.amount + transaction.fees)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Informations de traitement</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Créé par: </span>
                              <span className="font-medium">{transaction.createdBy}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Validé par: </span>
                              <span className="font-medium">{transaction.validatedBy || '-'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Temps de traitement: </span>
                              <span className="font-medium">{transaction.processingTime} min</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Notes et commentaires</h4>
                          <div className="text-sm text-gray-600">
                            {transaction.notes || 'Aucune note'}
                          </div>
                        </div>
                      </div>

                      {transaction.attachments && transaction.attachments.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Pièces jointes</h4>
                          <div className="flex gap-2">
                            {transaction.attachments.map((attachment, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                icon={<Download size={14} />}
                              >
                                {attachment.name}
                              </Button>
                            ))}
                          </div>
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

export default TransactionsDashboard;