import React, { useState } from 'react';
import { format } from 'date-fns';
import { formaNumber } from '../../utils/feature/utils';
import Button from '../../components/ui/Button';
import { Loader, Loader2, Newspaper, Trash, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/Modal/Modal';
import NewLicence from './NewLicence';
import { useDeleteLicenceMutation, useGetAllLicencesQuery } from '../../utils/feature/licence/licenceApi';
import { toast } from 'react-toastify';
import UpdateLicence from './UpdateLicence';
import { LicenceResponse } from '../../utils/feature/licence/type';



export default function LicencePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [licenceSelected, setLicenceSelected] = useState<LicenceResponse>()
  const [page, setPage] = useState(1)
  const { t, i18n } = useTranslation()
  const limit = 10
  const { data: licences, isLoading, isFetching, error } = useGetAllLicencesQuery({ page, limit })
  const [deleted, { isLoading: load }] = useDeleteLicenceMutation()

  const handleDelete = async (id: string) => {
    try {
      await deleted(id).unwrap()
      toast.success(t("package.success_deleted"))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(i18n.language === "fr" ? error.data.message : error.data.messageE)
    }
  }

  if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader className='w-52 h-52 text-green-500' /></div>
  if (error) {
    console.log(error)
    return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className='flex flex-row items-center justify-between' >
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t("package.title")}</h2>
        <Button
          variant="primary"
          onClick={() => setIsOpen(true)}
          icon={<Newspaper size={16} />}
        >
          {t("package.new")}
        </Button>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.intitule")}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.user_number")}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.transaction_number")}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.price")}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.month_number")}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.date")}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.actions")}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {licences?.data.map((request) => (
            <tr key={request.plan_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{request.name}</div>
                <div className="text-sm text-gray-500">ID: {request.plan_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.max_users}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.max_transactions}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formaNumber(request.monthly_price)} FCFA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.number_of_months} </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(request.created_at), 'dd/MM/yyyy HH:mm')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className=' flex items-center justify-between flex-row'>
                  <span onClick={()=>{
                    setIsOpen2(true)
                    setLicenceSelected(request)
                  }}>
                    <Upload className=' text-green-400 w-5 h-5 hover:text-green-600 cursor-pointer' />
                  </span>

                  <span onClick={() => handleDelete(request.plan_id)} >
                    {load ? <Loader2 /> : <Trash className=' text-red-400   w-5 h-5 hover:text-red-600 cursor-pointer' />}
                  </span>
                </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || isFetching}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ‹ {t("preavu")}
        </button>

        <span>
          Page {licences?.meta.page} sur {licences?.meta.totalPages}
          {isFetching && ' …'}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, licences?.meta.totalPages ?? 1))}
          disabled={page === (licences?.meta.totalPages ?? 1) || isFetching}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          {t("next")} ›
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("package.new")}
      >
        <div>
          <NewLicence />
        </div>

      </Modal>
      <Modal
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        title={t("package.update")}
      >
        <div>
          { licenceSelected && <UpdateLicence licence={licenceSelected} />}
        </div>

      </Modal>
    </div>
  );
}
