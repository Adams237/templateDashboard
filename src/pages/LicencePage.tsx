import React, { useState } from 'react';
import { format } from 'date-fns';
import { LICENCES } from '../data/licence';
import { formaNumber } from '../utils/feature/utils';
import Button from '../components/ui/Button';
import { Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Modal from '../components/Modal/Modal';
import NewLicence from './NewLicence';



export default function LicencePage() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("package.date")}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {LICENCES.map((request) => (
            <tr key={request.plan_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{request.name}</div>
                <div className="text-sm text-gray-500">ID: {request.plan_id.slice(0, 6)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.max_users}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.max_transactions}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formaNumber(request.monthly_price)} FCFA</td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(request.created_at), 'dd/MM/yyyy HH:mm')}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
          <Modal
            isOpen={isOpen}
            onClose={()=>setIsOpen(false)}
            title={t("package.new")}
          >
            <div>
              <NewLicence/>
            </div>

          </Modal>
    </div>
  );
}
