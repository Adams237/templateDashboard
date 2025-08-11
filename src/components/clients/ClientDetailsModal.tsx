import React, { useState } from 'react';
import { MapPin, Phone, Mail, FileText, AlertTriangle, TrendingUp, User, Loader, Eye, } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Table from '../ui/Table';
import { getStatusColor } from '../../data/mockClients';
import { MICROFINANCES } from '../../data/microfinance';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { formaNumber } from '../../utils/feature/utils';
import { useGetMicrofinanceByIdQuery } from '../../utils/feature/microfinance/microfinanceApi';
import Button from '../ui/Button';
import Modal from '../Modal/Modal';
import NewTenantLicense from '../forms/NewTenantLicense';
import { ToastContainer } from 'react-toastify';
import { DocumenetResponse } from '../../utils/feature/document/type';
import Metrick from './Metrick';



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

const ClientDetailsModal = () => {
  const [activeTab, setActiveTab] = useState<'metrick' | 'overview' | 'transactions' | 'schedule' | 'documents' | 'activities' | 'location' | 'tenant_licence'>('overview');


  const { id } = useParams()
  const { t, } = useTranslation()
  const clientId = id ?? ""
  const [openCreateLicense, setOpenCreateLicense] = useState(false)
  const { data: client, isLoading, error } = useGetMicrofinanceByIdQuery(clientId)
  const [document, setDocument] = useState<DocumenetResponse | null>(null)

  // console.log(client)
  // Move useEffect outside of conditional rendering



  const tabs = [
    { id: 'overview', label: 'Aperçu' },
    // { id: 'transactions', label: 'Transactions' },
    // { id: 'schedule', label: 'Planning collectes' },
    { id: 'documents', label: 'Documents' },
    // { id: 'activities', label: 'Activités' },
    // { id: 'location', label: 'Localisation' },
    { id: 'tenant_licence', label: 'Licences' },
    { id: 'metrick', label: 'Utilisateurs' },
  ];

  if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader className='w-52 h-52 text-green-500 animate-spin' /></div>
  if (error) return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
  if (!client) return null;
  console.log(client)
  const create_at = new Date(client.created_at)
  return (

    <div className="space-y-6">
      {/* Client Header Info */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">

            <span className="text-gray-500 text-sm">{t("microfinace.name")}:</span> {client.name}
          </h2>
          <div className="mt-1 flex items-center space-x-2">
            <Badge variant={getStatusColor(client.status.toLowerCase())}>
              {client.status.toLowerCase() === 'active' ? t("licence.actif") :
                client.status.toLowerCase() === 'pending' ? t("licence.pending") :
                  'Suspendu'}
            </Badge>


          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">{t("microfinace.client_from")}</div>
          <div className="font-medium">{create_at.toLocaleDateString()}</div>
        </div>
      </div>
      <div className='flex items-center gap-2 justify-end' >
        <Button variant='outline'>
          {t("microfinace.update_client")}
        </Button>
        {
          client.TenantLicenses?.length > 0 ?
            <Button onClick={() => setOpenCreateLicense(true)}>
              {t("microfinace.update_licence")}
            </Button> :
            <Button onClick={() => setOpenCreateLicense(true)}>
              {t("microfinace.new_licence")}
            </Button>
        }

      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab)
                setDocument(null)
              }}
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
                ) : (
                  <div className="space-y-4">
                    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={client.latitude ? { lat: client.latitude, lng: client.longitude } : defaultCenter}
                        zoom={15}
                      >
                        {client.latitude && (
                          <Marker
                            position={{ lat: client.latitude, lng: client.longitude }}
                            title={`${client.name} `}
                          />
                        )}
                      </GoogleMap>
                    </LoadScript>
                    {client.latitude && (
                      <div className="text-sm text-gray-600">
                        <div>Latitude: {client.latitude.toFixed(6)}</div>
                        <div>Longitude: {client.latitude.toFixed(6)}</div>
                        <div className="mt-2">
                          Dernière mise à jour: {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>

          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t("client.information")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="text-gray-400" size={20} />
                    <div>
                      <div className="font-medium">{client.phone_number}</div>
                      <div className="text-sm text-gray-500">
                        {t("client.phone")} ' ✓'
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="text-gray-400" size={20} />
                    <div>
                      <div className="font-medium">{client.email}</div>
                      <div className="text-sm text-gray-500">
                        Email' ✓'
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-gray-400" size={20} />
                    <div>
                      <div className="font-medium">{client.city} /{client.address}</div>
                      <div className="text-sm text-gray-500">
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <Card.Body>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Transaction</p>
                      <p className="text-2xl font-semibold">
                        {formaNumber(MICROFINANCES.length)}
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
                      <p className="text-sm text-gray-500">Total client</p>
                      <p className="text-2xl font-semibold">
                        {formaNumber(MICROFINANCES.length)}
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <User size={24} className="text-green-600" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Collecteur</p>
                      <p className="text-2xl font-semibold">
                        {formaNumber(MICROFINANCES.length)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-full">
                      <AlertTriangle size={24} className="text-gray-600" />
                    </div>
                  </div>
                </Card.Body>
              </Card>


            </div>

            {/* Preferences */}
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Localisation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500"></p>
                    <p className="font-medium">{client.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coordonnee geogrqphique</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary">
                        {client.latitude}
                      </Badge>
                      <Badge variant="secondary">
                        {client.longitude}
                      </Badge>
                    </div>
                  </div>

                </div>
              </Card.Body>
            </Card>

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
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {client.Documents?.map((document, index) => {
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
        {activeTab === 'tenant_licence' && (
          <div className="space-y-4">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>Token</Table.HeadCell>
                  <Table.HeadCell>Statut</Table.HeadCell>
                  <Table.HeadCell>Date de creation</Table.HeadCell>
                  <Table.HeadCell>Date d'expiration</Table.HeadCell>
                  <Table.HeadCell>Statut</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {client.TenantLicenses?.map((licence, index) => {
                  const date_delivrance = new Date(licence.created_at)
                  const date_expire = new Date(licence.license_expires)
                  return <Table.Row key={index}>
                    <Table.Cell>
                      <div className="flex items-center">
                        <FileText size={16} className="text-gray-400 mr-2" />
                        <span>
                          {licence.auth_token}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{licence.license_status}</Table.Cell>
                    <Table.Cell>{date_delivrance.toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{date_expire.toLocaleDateString()}</Table.Cell>
                    <Table.Cell className='cursor-pointer'><Eye /></Table.Cell>

                  </Table.Row>
                })}
              </Table.Body>
            </Table>
          </div>
        )}

        {
          activeTab === 'metrick' && (
            <Metrick />
          )
        }


      </div>
      <Modal isOpen={openCreateLicense} onClose={() => setOpenCreateLicense(false)} title={t("microfinace.new_licence")}>
        <NewTenantLicense onClose={() => setOpenCreateLicense(false)} />
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>

  );
};

export default ClientDetailsModal;