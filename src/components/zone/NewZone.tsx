import React, { useState, useCallback, useRef } from 'react';
import { MapPin, Users, AlertTriangle } from 'lucide-react';
import { GoogleMap, LoadScript, LoadScriptProps, Polygon, Marker } from '@react-google-maps/api';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { mockCollectors } from '../../data/mockAssignments';

interface NewZoneProps {
  onSuccess: () => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 14.7167,
  lng: -17.4677
};

// Replace this with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const NewZone = ({ onSuccess }: NewZoneProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [collectorId, setCollectorId] = useState('');
  const [securityLevel, setSecurityLevel] = useState('');
  const [collectionFrequency, setCollectionFrequency] = useState('');
  const [requiredCertifications, setRequiredCertifications] = useState<string[]>([]);
  const [accessPoints, setAccessPoints] = useState<string[]>([]);
  const [backupCollectors, setBackupCollectors] = useState<string[]>([]);
  const [peakHours, setPeakHours] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [paths, setPaths] = useState<google.maps.LatLngLiteral[]>([]);
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const polygonRef = useRef<google.maps.Polygon>(null);
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const clickedPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setPaths(prev => [...prev, clickedPos]);
      setMarkers(prev => [...prev, clickedPos]);
    }
  }, []);

  const onLoad = useCallback((polygon: google.maps.Polygon) => {
    polygonRef.current = polygon;
    const path = polygon.getPath();
    listenersRef.current.push(
      path.addListener('set_at', () => {
        const newPaths = Array(path.getLength())
          .fill(null)
          .map((_, i) => {
            const point = path.getAt(i);
            return { lat: point.lat(), lng: point.lng() };
          });
        setPaths(newPaths);
      }),
      path.addListener('insert_at', () => {
        const newPaths = Array(path.getLength())
          .fill(null)
          .map((_, i) => {
            const point = path.getAt(i);
            return { lat: point.lat(), lng: point.lng() };
          });
        setPaths(newPaths);
      })
    );
  }, []);

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((listener) => {
      google.maps.event.removeListener(listener);
    });
  }, []);

  const handleLoadError: LoadScriptProps['onError'] = () => {
    setMapError("Impossible de charger Google Maps. Veuillez vérifier votre connexion internet et réessayer.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paths.length < 3) {
      setMapError("Veuillez délimiter la zone en marquant au moins 3 points sur la carte.");
      return;
    }
    // Here you would implement the actual API call to create the zone
    console.log('Zone boundaries:', paths);
    
    // Simulate success after 1 second
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const certificationOptions = [
    'Gestion de risque',
    'Conformité bancaire',
    'Service client avancé',
    'Gestion de conflit',
    'Sécurité'
  ];

  const accessPointOptions = [
    'Entrée principale',
    'Entrée secondaire',
    'Entrée sud',
    'Entrée nord',
    'Entrée est',
    'Entrée ouest',
    'Entrée sécurisée',
    'Entrée livraison'
  ];

  const resetZone = () => {
    setPaths([]);
    setMarkers([]);
    setMapError(null);
  };

  const selectedCollectorData = mockCollectors.find(c => c.id === collectorId);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              La création d'une nouvelle zone nécessite une validation du responsable régional.
              Assurez-vous de fournir toutes les informations nécessaires et de bien délimiter la zone sur la carte.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom de la zone
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type de zone
            </label>
            <select
              id="type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Sélectionner un type</option>
              <option value="Marché">Marché</option>
              <option value="Commercial">Commercial</option>
              <option value="Industriel">Industriel</option>
              <option value="Résidentiel">Résidentiel</option>
              <option value="Mixte">Mixte</option>
            </select>
          </div>
        </div>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Délimitation de la zone</h3>
            <div className="space-y-4">
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
                <LoadScript 
                  googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                  onError={handleLoadError}
                >
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                    onClick={onMapClick}
                  >
                    {paths.length > 0 && (
                      <Polygon
                        path={paths}
                        options={{
                          fillColor: '#4338ca',
                          fillOpacity: 0.3,
                          strokeColor: '#4338ca',
                          strokeOpacity: 1,
                          strokeWeight: 2,
                          editable: true,
                          draggable: true,
                        }}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                      />
                    )}
                    {markers.map((marker, index) => (
                      <Marker
                        key={index}
                        position={marker}
                        label={`${index + 1}`}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              )}
              {mapError && (
                <div className="text-sm text-red-600">
                  {mapError}
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetZone}
                >
                  Réinitialiser la zone
                </Button>
              </div>
              {paths.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Coordonnées de la zone</h4>
                  <div className="bg-gray-50 p-2 rounded-md text-sm">
                    {paths.map((point, index) => (
                      <div key={index} className="mb-1">
                        Point {index + 1}: Lat: {point.lat.toFixed(6)}, Lng: {point.lng.toFixed(6)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="collector" className="block text-sm font-medium text-gray-700">
              Collecteur principal
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={16} className="text-gray-400" />
              </div>
              <select
                id="collector"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={collectorId}
                onChange={(e) => setCollectorId(e.target.value)}
                required
              >
                <option value="">Sélectionner un collecteur</option>
                {mockCollectors.map((collector) => (
                  <option key={collector.id} value={collector.id}>
                    {collector.name} - {collector.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="securityLevel" className="block text-sm font-medium text-gray-700">
              Niveau de sécurité
            </label>
            <select
              id="securityLevel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={securityLevel}
              onChange={(e) => setSecurityLevel(e.target.value)}
              required
            >
              <option value="">Sélectionner un niveau</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Élevé">Élevé</option>
              <option value="Très élevé">Très élevé</option>
            </select>
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
              Fréquence de collecte
            </label>
            <select
              id="frequency"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={collectionFrequency}
              onChange={(e) => setCollectionFrequency(e.target.value)}
              required
            >
              <option value="">Sélectionner une fréquence</option>
              <option value="Quotidienne">Quotidienne</option>
              <option value="Hebdomadaire">Hebdomadaire</option>
              <option value="Bi-hebdomadaire">Bi-hebdomadaire</option>
              <option value="Mensuelle">Mensuelle</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certifications requises
          </label>
          <div className="space-y-2">
            {certificationOptions.map((cert) => (
              <div key={cert} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cert-${cert}`}
                  checked={requiredCertifications.includes(cert)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRequiredCertifications([...requiredCertifications, cert]);
                    } else {
                      setRequiredCertifications(requiredCertifications.filter(c => c !== cert));
                    }
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`cert-${cert}`} className="ml-2 block text-sm text-gray-700">
                  {cert}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Points d'accès
          </label>
          <div className="space-y-2">
            {accessPointOptions.map((point) => (
              <div key={point} className="flex items-center">
                <input
                  type="checkbox"
                  id={`access-${point}`}
                  checked={accessPoints.includes(point)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAccessPoints([...accessPoints, point]);
                    } else {
                      setAccessPoints(accessPoints.filter(p => p !== point));
                    }
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`access-${point}`} className="ml-2 block text-sm text-gray-700">
                  {point}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Collecteurs de backup
          </label>
          <div className="space-y-2">
            {mockCollectors
              .filter(c => c.id !== collectorId)
              .map((collector) => (
                <div key={collector.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`backup-${collector.id}`}
                    checked={backupCollectors.includes(collector.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setBackupCollectors([...backupCollectors, collector.id]);
                      } else {
                        setBackupCollectors(backupCollectors.filter(id => id !== collector.id));
                      }
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`backup-${collector.id}`} className="ml-2 block text-sm text-gray-700">
                    {collector.name} ({collector.id})
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heures de pointe
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Matin</label>
              <div className="space-y-2">
                {['08:00-10:00', '10:00-12:00'].map((slot) => (
                  <div key={slot} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`peak-${slot}`}
                      checked={peakHours.includes(slot)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPeakHours([...peakHours, slot]);
                        } else {
                          setPeakHours(peakHours.filter(h => h !== slot));
                        }
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`peak-${slot}`} className="ml-2 block text-sm text-gray-700">
                      {slot}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Après-midi</label>
              <div className="space-y-2">
                {['14:00-16:00', '16:00-18:00'].map((slot) => (
                  <div key={slot} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`peak-${slot}`}
                      checked={peakHours.includes(slot)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPeakHours([...peakHours, slot]);
                        } else {
                          setPeakHours(peakHours.filter(h => h !== slot));
                        }
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`peak-${slot}`} className="ml-2 block text-sm text-gray-700">
                      {slot}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes et instructions spéciales
          </label>
          <div className="mt-1">
            <textarea
              id="notes"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Instructions spécifiques, points d'attention..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {selectedCollectorData && (
          <Card className="bg-gray-50">
            <Card.Body>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Profil du collecteur sélectionné</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Expérience:</span>
                  <span className="font-medium">{selectedCollectorData.experience} ans</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Note moyenne:</span>
                  <span className="font-medium">{selectedCollectorData.rating}/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taux de collecte:</span>
                  <span className="font-medium">{selectedCollectorData.collectionRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Certifications:</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {selectedCollectorData.certifications.map((cert) => (
                      <Badge key={cert} variant="primary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            icon={<MapPin size={16} />}
          >
            Créer la zone
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewZone;