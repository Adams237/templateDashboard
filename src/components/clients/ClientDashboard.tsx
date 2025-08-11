import React, { useState } from 'react';
import { Search, Filter, Users, TrendingUp, AlertTriangle, Newspaper, Loader, } from 'lucide-react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getStatusColor } from '../../data/mockClients';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formaNumber } from '../../utils/feature/utils';
import { useGetAllMicrofinanceQuery } from '../../utils/feature/microfinance/microfinanceApi';
import { format } from 'date-fns';

const ClientDashboard = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1)
  const limit = 10
  const { data: microfinance, isLoading, error, isFetching } = useGetAllMicrofinanceQuery({ page, limit })

  const navigate = useNavigate()

  const filteredClients = microfinance?.data.filter(client => {
    if (statusFilter !== 'all' && client.status !== statusFilter) return false;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.phone_number.toLowerCase().includes(searchLower) ||
        client.address.toLowerCase().includes(searchLower) ||
        client.city.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Calculate summary statistics
  const summaryStats = {
    totalClients: microfinance?.meta.total,
    activeClients: microfinance?.data.filter(c => c.status.toLowerCase() === 'active').length,
    averageSuccess: microfinance ? (microfinance?.data.filter(c => c.status.toLowerCase() === 'active').length / microfinance?.meta.total) * 100 :0
  };

  if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader className='w-52 h-52 text-green-500 animate-spin' /></div>
  if (error) {
    console.log(error)
    return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
  }

  // console.log(microfinance?.meta.total_pages)
  console.log("filteredClients", filteredClients)
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Clients actifs</p>
                <p className="text-2xl font-semibold">{formaNumber(summaryStats.activeClients??0)}</p>
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
                <p className="text-sm text-gray-500">Total Microfinance</p>
                <p className="text-2xl font-semibold">{formaNumber(summaryStats.totalClients??0)}</p>
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
                <p className="text-sm text-gray-500">pourcentage de microfinance active</p>
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
            placeholder="Rechercher un client par nom, code..."
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
              <option value="all">{t("microfinace.all")}</option>
              <option value="ACTIVE">{t("microfinace.actifs")}</option>
              <option value="INACTIVE">{t("microfinace.inactif")}</option>
            </select>
          </div>

          <Button
            variant="primary"
            onClick={() => navigate("/new-microfinance")}
            icon={<Newspaper size={16} />}
          >
            {t("microfinace.new_micro")}
          </Button>
        </div>
      </div>


      <div className='w-[78vw] overflow-x-auto'>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>{t("microfinace.name")}</Table.HeadCell>
              <Table.HeadCell>{t("microfinace.status")}</Table.HeadCell>
              <Table.HeadCell>{t("microfinace.email")}</Table.HeadCell>
              <Table.HeadCell>{t("microfinace.phone_number")}</Table.HeadCell>
              <Table.HeadCell>{t("microfinace.address")}</Table.HeadCell>
              <Table.HeadCell>{t("microfinace.date")}</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filteredClients?.map((client) => (
              <Table.Row key={client.updated_at}>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      {client.profile_picture ? <img className='w-10 h-10 rounded-full' src={client.profile_picture} alt="" /> :
                        client.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {client.name}
                      </div>

                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <Badge variant={getStatusColor(client.status.toLowerCase())}>
                    {client.status.toLowerCase() === 'active' ? 'Actif' :
                      client.status.toLowerCase() === 'inactive' ? 'Inactif' :
                        'Suspendu'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div>{client.email}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>{client.phone_number}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>{client.city}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>{format(new Date(client.created_at), 'dd/MM/yyyy HH:mm')}</div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/clients/${client.user_id}`)}
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
            disabled={page === 1 || isFetching}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ‹ {t("preavu")}
          </button>

          <span>
            Page {microfinance?.meta.page} sur {microfinance?.meta.total_pages}
            {isFetching && ' …'}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, microfinance?.meta.total_pages ?? 1))}
            disabled={page === (microfinance?.meta.total_pages ?? 1) || isFetching}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {t("next")} ›
          </button>
        </div>
      </div>




    </div>
  );
};

export default ClientDashboard;