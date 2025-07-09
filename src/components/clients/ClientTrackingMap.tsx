import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AlertTriangle } from 'lucide-react';
import { mockClients } from '../../data/mockClients';
import Card from '../ui/Card';

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 14.7167,
  lng: -17.4677
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const ClientTrackingMap = () => {
  const clientsWithLocation = mockClients.filter(
    client => client.transactions[0]?.location
  );

  return (
    <div className="space-y-4">
      <Card>
        <Card.Body>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Suivi des clients en temps réel
          </h2>
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
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
              >
                {clientsWithLocation.map((client) => {
                  const location = client.transactions[0]?.location;
                  if (!location) return null;

                  return (
                    <Marker
                      key={client.id}
                      position={{
                        lat: location.latitude,
                        lng: location.longitude
                      }}
                      title={`${client.firstName} ${client.lastName}${client.businessName ? ` - ${client.businessName}` : ''}`}
                    />
                  );
                })}
              </GoogleMap>
            </LoadScript>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Liste des clients suivis ({clientsWithLocation.length})
          </h3>
          <div className="space-y-4">
            {clientsWithLocation.map((client) => {
              const location = client.transactions[0]?.location;
              if (!location) return null;

              return (
                <div key={client.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">
                      {client.firstName} {client.lastName}
                    </div>
                    {client.businessName && (
                      <div className="text-sm text-gray-500">
                        {client.businessName}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    <div>Lat: {location.latitude.toFixed(6)}</div>
                    <div>Lng: {location.longitude.toFixed(6)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientTrackingMap;