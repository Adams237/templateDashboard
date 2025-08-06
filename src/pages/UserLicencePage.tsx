import React, { useEffect, useState } from 'react';
import { Search, Filter, Users, TrendingUp, AlertTriangle, Loader, Ban, Rocket, Loader2, } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { USERLICENCE } from '../data/user_licence';
import Card from '../components/ui/Card';
import { formaNumber } from '../utils/feature/utils';
import Table from '../components/ui/Table';
import { getStatusColor } from '../data/mockClients';
import Badge from '../components/ui/Badge';
import { useLazyGetAllUserLicencesQuery, useUpdateStatusMutation } from '../utils/feature/userLicence/userLicenceApi';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const UserLicencePage = () => {
  const { t, i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('');
  const [lang, setLang] = useState<"fr" | "en">(i18n.language === "fr" ? "fr" : "en")
  const [statusFilter, setStatusFilter] = useState<"ACTIVE" | "EXPIRED" | "SUSPENDED" | "all">('all');

  const [page, setPage] = useState(1)
  const limit = 10
  const [fetchLicences, { data: lazyData, isLoading, isFetching, error }] = useLazyGetAllUserLicencesQuery();
  const [update, { isLoading: load }] = useUpdateStatusMutation()

  useEffect(() => {
    setLang(i18n.language === "fr" ? "fr" : "en")
  }, [i18n.language])

  useEffect(() => {
    fetchLicences({
      page,
      limit,
      lang: lang,
      // si votre API accepte un filtre status :
      license_status: statusFilter !== 'all' ? statusFilter : undefined,
    });
  }, [statusFilter, lang, page, i18n.language, fetchLicences]);

  // 3) On travaille sur lazyData au lieu de userLicences
  const userLicences = lazyData;
  const filteredClients = userLicences?.data.filter(client => {
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
    totalClients: userLicences?.meta.total,
    activeClients: userLicences?.data.filter(c => c.license_status.toLowerCase() === 'active').length,
    averageSuccess: (USERLICENCE.filter(c => c.license_status.toLowerCase() === 'active').length / USERLICENCE.length) * 100
  };

  const updateStatus = async (id: string, status: "ACTIVE" | "EXPIRED" | "SUSPENDED") => {
    try {
      await update({ id, lang, status }).unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(error.data.message)
    }
  }


  if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader className='w-52 h-52 text-green-500' /></div>
  if (error) {
    console.log(error)
    return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
  }

  return (
    <div className="  space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t("licence.client_actif")}</p>
                <p className="text-2xl font-semibold">{formaNumber(summaryStats.activeClients ?? 0)}</p>
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
                <p className="text-2xl font-semibold">{formaNumber(summaryStats.totalClients ?? 0)}</p>
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
              onChange={(e) => setStatusFilter(e.target.value as "ACTIVE" | "EXPIRED" | "SUSPENDED" | "all")}
            >
              <option value="all">{t("licence.all_status")}</option>
              <option value="ACTIVE">{t("licence.actif")}</option>
              <option value="SUSPENDED">{t("licence.suspendue")}</option>
              <option value="EXPIRED">{t("licence.expired")}</option>
            </select>
          </div>


        </div>
      </div>


      <div>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>{t("licence.microfinance")}</Table.HeadCell>
              <Table.HeadCell>{t("licence.status")}</Table.HeadCell>
              <Table.HeadCell>{t("licence.create_at")}</Table.HeadCell>
              <Table.HeadCell>{t("licence.expired_at")}</Table.HeadCell>
              <Table.HeadCell>{t("licence.licence")}</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filteredClients?.map((client) => (
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
                  <div>{format(new Date(client.created_at), 'dd/MM/yyyy HH:mm')}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>{format(new Date(client.license_expires), 'dd/MM/yyyy HH:mm')}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>{client.plan.name}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    {
                      client.license_status === "ACTIVE" ?
                        <span onClick={() => updateStatus(client.tenant_license_id, "SUSPENDED")} className='w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer' >
                          {load ? <Loader2 /> : <Ban />}
                        </span> :
                        <span onClick={() => updateStatus(client.tenant_license_id, "ACTIVE")} className='w-6 h-6 text-green-500 hover:text-green-600 cursor-pointer'>
                          {load ? <Loader2 /> : <Rocket />}
                        </span>
                    }
                  </div>


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
            Page {userLicences?.meta.page} sur {userLicences?.meta.totalPages}
            {isFetching && ' …'}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, userLicences?.meta.totalPages ?? 1))}
            disabled={page === (userLicences?.meta.totalPages ?? 1) || isFetching}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {t("next")} ›
          </button>
        </div>
      </div>




    </div>
  );
};

export default UserLicencePage;