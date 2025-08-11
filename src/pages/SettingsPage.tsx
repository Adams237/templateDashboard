import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetOneUSerQuery } from '../utils/feature/auth/authApi';
import { MicrofinanceResponse } from '../utils/feature/microfinance/type';
import { useTranslation } from 'react-i18next';
import { Eye, FileText, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import Table from '../utils/Table';
import { DocumenetResponse } from '../utils/feature/document/type';
import UpdatePassord from './UpdatePassord';
import Button from '../utils/Button';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const id: string = useSelector((state: any) => state.user.value[0])
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [document, setDocument] = useState<DocumenetResponse | null>(null)
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const { data: user, isLoading, error } = useGetOneUSerQuery(id)
  const [curentUser, setCurentUser] = useState<MicrofinanceResponse>()
  useEffect(() => {
    setCurentUser(user)
  }, [user])
  if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader2 className='w-52 h-52 text-green-500 animate-spin' /></div>
  if (error) {
    console.log(error)
    return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
  }
  const lastLogin = format(new Date(), 'EEEE d MMMM yyyy', { locale: i18n.language === 'fr' ? fr : enUS });
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className=' flex md:flex-row flex-col items-center justify-between' >
        <div className=' flex flex-row items-center'>
          <img className='w-[50px] h-[50px] rounded-full mr-2' src={user?.profile_picture} />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className='font-[100] text-gray-400 ' >{user?.email}</p>
          </div>
        </div>

        <div>
          {t("settings.last_login")}: <span>{lastLogin}</span>
        </div>
      </div>


      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: 'overview', label: 'Aperçu' },
            { id: 'document', label: 'Documents' },
            { id: 'password', label: 'password' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className='mt-6' >
        {
          activeTab === "overview" &&
          <div>
            <h2 className='text-xl mb-6 ' >{t("settings.info_perso")}</h2>
            <div className=' grid md:grid-cols-2 grid-cols-1 space-y-1 ' >
              <div className='font-semibold grid  grid-cols-[25%,70%]' >
                <div>
                  {t("settings.name")}:
                </div>
                <div className='border-2 py-1 px-2 ml-2 rounded-lg font-normal' >{user?.name}</div>
              </div>
              <div className='font-semibold grid  grid-cols-[25%,70%] '>
                {t("settings.email")}: <div className='border-2 py-1 px-2 ml-2 rounded-lg font-normal'>{user?.email}</div>
              </div>
              <div className='font-semibold grid  grid-cols-[25%,70%] items-center'>
                {t("settings.phone")}: <div className='border-2 py-1 px-2 ml-2 rounded-lg font-normal'>{user?.phone_number}</div>
              </div>
              <div className='font-semibold grid  grid-cols-[25%,70%] items-center'>
                {t("settings.country")}: <div className='border-2 py-1 px-2 ml-2 rounded-lg font-normal'>{user?.country}</div>
              </div>
              <div className='font-semibold grid  grid-cols-[25%,70%] items-center'>
                {t("settings.city")}: <div className='border-2 py-1 px-2 ml-2 rounded-lg font-normal'>{user?.city}</div>
              </div>
              <div className='font-semibold grid  grid-cols-[25%,70%] items-center'>
                {t("settings.address")}: <div className='border-2 py-1 px-2 ml-2 rounded-lg font-normal'>{user?.address}</div>
              </div>
            </div>
            <div className='w-full flex justify-end mt-5' >
              <Button onClick={()=>navigate(`/settings/update`, {state:curentUser})} >
                {t("settings.update")}
              </Button>
            </div>

          </div>
        }

        {activeTab === 'document' && (
          <div className="space-y-4">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>Type</Table.HeadCell>
                  <Table.HeadCell>Numéro</Table.HeadCell>
                  <Table.HeadCell>Date d'émission</Table.HeadCell>
                  <Table.HeadCell>Date d'expiration</Table.HeadCell>
                  <Table.HeadCell>Statut</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {user?.Documents?.map((document, index) => {
                  const date_delivrance = new Date(document.created_at)
                  const date_expire = new Date(document.updated_at)
                  return <Table.Row key={index}>
                    <Table.Cell>
                      <div className="flex items-center">
                        <FileText size={16} className="text-gray-400 mr-2" />
                        <span>
                          {document.document_type}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{document.document_number}</Table.Cell>
                    <Table.Cell>{date_delivrance.toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{date_expire.toLocaleDateString()}</Table.Cell>
                    <Table.Cell className='cursor-pointer'><span onClick={() => setDocument(document)} ><Eye /></span></Table.Cell>

                  </Table.Row>
                })}
              </Table.Body>
            </Table>
            {
              document && <div>
                <img src={document.file_url} alt="" />
              </div>
            }
          </div>
        )}
        {
          activeTab === "password" &&
          <div>
            <UpdatePassord />
          </div>
        }
      </div>
    </div>
  );
}
