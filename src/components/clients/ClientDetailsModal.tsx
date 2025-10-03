import { useState } from 'react';
import { MapPin, Phone, Mail, FileText, AlertTriangle, Loader, Eye, Edit, } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Table from '../ui/Table';
import { getStatusColor } from '../../data/mockClients';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMicrofinanceByIdQuery } from '../../utils/feature/microfinance/microfinanceApi';
import Button from '../ui/Button';
import Modal from '../Modal/Modal';
// import NewTenantLicense from '../forms/NewTenantLicense';
import { ToastContainer } from 'react-toastify';
import { DocumenetResponse } from '../../utils/feature/document/type';
import Metrick from './Metrick';
import { motion } from 'framer-motion';
import UpdateDocument from './UpdateDocument';
import AddDocument from './AddDocument';


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
  // const [openCreateLicense, setOpenCreateLicense] = useState(false)
  const { data: client, isLoading, error } = useGetMicrofinanceByIdQuery(clientId)
  const [document, setDocument] = useState<DocumenetResponse | null>(null)
  const navigate = useNavigate()
  const [updateDocument, setUpdateDocument] = useState<DocumenetResponse | null>()

  const [openEdit, setIsOpenEdit] = useState(false)
  const [openAddDoc, setOppenAddDoc] = useState(false)



  const tabs = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'documents', label: 'Documents' },
    { id: 'tenant_licence', label: 'Licences' },
    // { id: 'metrick', label: 'Utilisateurs' },
  ];

  if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader className='w-52 h-52 text-green-500 animate-spin' /></div>
  if (error) return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
  if (!client) return null;
  const create_at = new Date(client.created_at)
  console.log(client)
  return (

    <div className="space-y-6">
      {/* Client Header Info */}
      <div className="flex items-start justify-between">
        <div>
          <div className=' flex flex-row items-center'>
            <img className='w-[50px] h-[50px] rounded-full mr-2' src={client?.profile_picture} />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client?.name}</h2>
              <p className='font-[100] text-gray-400 ' >{client?.email}</p>
            </div>
          </div>
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
        <Button onClick={() => navigate(`/clients/update/${clientId}`, { state: client })} variant='outline'>
          {t("microfinace.update_client")}
        </Button>
        {
          client.TenantLicenses?.length > 0 ?
            <Button onClick={() => navigate(`/clients/update/licence/${clientId}`)}>
              {t("microfinace.update_licence")}
            </Button> :
            <Button onClick={() =>  navigate(`/clients/update/licence/${clientId}`)}>
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
                  <Metrick />
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
                    <p className="text-sm text-gray-500">Coordonnee geographique</p>
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
            <div className='flex flex-row items-end justify-end' >
              <Button onClick={() => setOppenAddDoc(true)} >
                {t("microfinace.create_document")}
              </Button>
            </div>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>{t("microfinace.document_type")}</Table.HeadCell>
                  <Table.HeadCell>{t("microfinace.document_number")}</Table.HeadCell>
                  <Table.HeadCell>{t("microfinace.create_at")}</Table.HeadCell>
                  {/* <Table.HeadCell>Date d'expiration</Table.HeadCell> */}
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {client.Documents?.map((document, index) => {
                  const date_delivrance = new Date(document.created_at)
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
                    {/* <Table.Cell>{date_expire.toLocaleDateString()}</Table.Cell> */}
                    <Table.Cell className='cursor-pointer'>
                      <div className='flex flex-row items-center justify-around' >
                        <span onClick={() => setDocument(document)} ><Eye /></span>
                        <motion.button onClick={() => {
                          // setDocument(document)
                          setUpdateDocument(document)
                          setIsOpenEdit(true)
                        }} whileHover={{ scale: 1.1 }} className="text-yellow-600 hover:text-yellow-800">
                          <Edit className="h-5 w-5" />
                        </motion.button>
                      </div>

                    </Table.Cell>

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
                  {/* <Table.HeadCell>Statut</Table.HeadCell> */}
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
                    <Table.Cell>
                      {licence.license_status}
                    </Table.Cell>
                    <Table.Cell>{date_delivrance.toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{date_expire.toLocaleDateString()}</Table.Cell>
                    {/* <Table.Cell className='cursor-pointer'><Eye /></Table.Cell> */}

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
      {/* <Modal isOpen={openCreateLicense} onClose={() => setOpenCreateLicense(false)} title={t("microfinace.new_licence")}>
        <div className='h-[70vh] overflow-y-auto' >
          <NewTenantLicense onClose={() => setOpenCreateLicense(false)} />
        </div>

      </Modal> */}
      <Modal isOpen={openEdit} onClose={() => setIsOpenEdit(false)} title={t("microfinace.edit_document")}>
        {updateDocument && <UpdateDocument updateDocument={updateDocument} setUpdateDocument={setUpdateDocument} />}
      </Modal>
      <Modal isOpen={openAddDoc} onClose={() => setOppenAddDoc(false)} title={t("microfinace.edit_document")} >
        <AddDocument />
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