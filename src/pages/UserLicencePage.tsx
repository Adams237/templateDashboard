import React, { useState } from 'react';
import { Search, Filter,  Users, TrendingUp, AlertTriangle, } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { USERLICENCE } from '../data/user_licence';
import Card from '../components/ui/Card';
import { formaNumber } from '../utils/feature/utils';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { getStatusColor } from '../data/mockClients';
import Badge from '../components/ui/Badge';

const UserLicencePage = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1)
  const limit = 10

  const navigate = useNavigate()

  const filteredClients = USERLICENCE.filter(client => {
    if (statusFilter !== 'all' && client.license_status !== statusFilter) return false;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.user.name.toLowerCase().includes(searchLower) ||
        client.plan.name.toLowerCase().includes(searchLower) 
      );
    }

    return true;
  });

  // Calculate summary statistics
  const summaryStats = {
    totalClients: USERLICENCE.length,
    activeClients: USERLICENCE.filter(c => c.license_status.toLowerCase() === 'active').length,
    averageSuccess: (USERLICENCE.filter(c => c.license_status.toLowerCase() === 'active').length / USERLICENCE.length) * 100
  };


  return (
    <div className="  space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t("licence.client_actif")}</p>
                <p className="text-2xl font-semibold">{formaNumber(summaryStats.activeClients)}</p>
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
                <p className="text-sm text-gray-500">{t("licence.all_client")}</p>
                <p className="text-2xl font-semibold">{formaNumber(summaryStats.totalClients)}</p>
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
                <p className="text-sm text-gray-500">{t("licence.pourcentage")}</p>
                <p className="text-2xl font-semibold">{parseInt(String(summaryStats.averageSuccess))}%</p>
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
            placeholder={t("licence.search")}
            className="pl-10 block h-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="block rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t("licence.all_status")}</option>
              <option value="ACTIVE">{t("licence.actif")}</option>
              <option value="SUSPENDED">{t("licence.suspendue")}</option>
              <option value="EXPIRED">{t("licence.expired")}</option>
            </select>
          </div>

          {/* <Button
            variant="primary"
            onClick={()=>navigate("/new-microfinance")}
            icon={<Newspaper size={16} />}
          >
            Nouvelle microfinance
          </Button> */}
        </div>
      </div>


      <div>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>{t("licence.microfinance")}</Table.HeadCell>
              <Table.HeadCell>{t("licence.status")}</Table.HeadCell>
              <Table.HeadCell>{t("licence.create_at")}</Table.HeadCell>
              <Table.HeadCell>{t("licence.licence")}</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filteredClients.map((client) => (
              <Table.Row key={client.tenant_license_id}>
                <Table.Cell>
                      {client.user.name}
                        
                 
                </Table.Cell>

                <Table.Cell>
                  <Badge variant={getStatusColor(client.license_status.toLowerCase())}>
                    {client.license_status.toLowerCase() === 'active' ? 'Actif' :
                      client.license_status.toLowerCase() === 'expired' ? 'EXPIRED' :
                        'Suspendu'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div>{client.created_at}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>{client.plan.name}</div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/clients/${client.tenant_license_id}`)}
                  >
                    Détails
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ‹ {t("zone.preavu")}
          </button>

          <span>
            Page {page} sur {summaryStats.totalClients / limit}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, limit ?? 1))}
            disabled={page === (limit ?? 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {t("zone.next")} ›
          </button>
        </div>
      </div>




    </div>
  );
};

export default UserLicencePage;