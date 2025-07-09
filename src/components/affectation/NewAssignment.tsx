import React, { useState } from 'react';
import Button from '../ui/Button';
import { Calendar, MapPin, Users, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { mockCollectors, mockZones } from '../../data/mockAssignments';

interface NewAssignmentProps {
  onSuccess: () => void;
}

const NewAssignment = ({ onSuccess }: NewAssignmentProps) => {
  const [selectedCollector, setSelectedCollector] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');
  const [requiredTraining, setRequiredTraining] = useState<string[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual API call to create the assignment
    
    // Simulate success after 1 second
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const selectedCollectorData = mockCollectors.find(c => c.id === selectedCollector);
  const selectedZoneData = mockZones.find(z => z.id === selectedZone);

  const calculateCompatibility = () => {
    if (!selectedCollectorData || !selectedZoneData) return null;

    const checks = {
      certifications: selectedCollectorData.certifications.some(cert => 
        selectedZoneData.requiredCertifications.includes(cert)
      ),
      experience: selectedCollectorData.experience >= 3,
      rating: selectedCollectorData.rating >= 4.5,
      availability: selectedCollectorData.availability,
    };

    const score = Object.values(checks).filter(Boolean).length;
    return {
      score: (score / Object.keys(checks).length) * 100,
      checks
    };
  };

  const compatibility = calculateCompatibility();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              L'affectation sera soumise pour approbation au responsable de la zone.
              Assurez-vous de fournir toutes les informations nécessaires.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="collector" className="block text-sm font-medium text-gray-700">
              Collecteur à affecter
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={16} className="text-gray-400" />
              </div>
              <select
                id="collector"
                className="pl-10 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedCollector}
                onChange={(e) => setSelectedCollector(e.target.value)}
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
            <label htmlFor="zone" className="block text-sm font-medium text-gray-700">
              Zone d'affectation
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <select
                id="zone"
                className="pl-10 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                required
              >
                <option value="">Sélectionner une zone</option>
                {mockZones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} ({zone.collectorName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Date de début
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="startDate"
                className="pl-10 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Date de fin
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="endDate"
                className="pl-10 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Motif d'affectation
          </label>
          <div className="mt-1">
            <textarea
              id="reason"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Pourquoi souhaitez-vous affecter ce collecteur à cette zone ?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priorité
          </label>
          <div className="mt-2 flex items-center space-x-4">
            {['low', 'medium', 'high'].map((p) => (
              <div key={p} className="flex items-center">
                <input
                  id={`priority-${p}`}
                  name="priority"
                  type="radio"
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`priority-${p}`} className="ml-2 block text-sm text-gray-700">
                  {p === 'low' ? 'Basse' : p === 'medium' ? 'Moyenne' : 'Haute'}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes de passation
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formation requise
          </label>
          <div className="space-y-2">
            {['Procédures de collecte', 'Sécurité', 'Relation client', 'Utilisation application'].map((training) => (
              <div key={training} className="flex items-center">
                <input
                  type="checkbox"
                  id={`training-${training}`}
                  checked={requiredTraining.includes(training)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRequiredTraining([...requiredTraining, training]);
                    } else {
                      setRequiredTraining(requiredTraining.filter(t => t !== training));
                    }
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`training-${training}`} className="ml-2 block text-sm text-gray-700">
                  {training}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Documents requis
          </label>
          <div className="space-y-2">
            {['Fiche de poste', 'Plan de zone', 'Liste des clients', 'Procédures spécifiques'].map((doc) => (
              <div key={doc} className="flex items-center">
                <input
                  type="checkbox"
                  id={`doc-${doc}`}
                  checked={documents.includes(doc)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDocuments([...documents, doc]);
                    } else {
                      setDocuments(documents.filter(d => d !== doc));
                    }
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`doc-${doc}`} className="ml-2 block text-sm text-gray-700">
                  {doc}
                </label>
              </div>
            ))}
          </div>
        </div>

        {selectedCollectorData && selectedZoneData && (
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gray-50">
              <Card.Body>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Profil du collecteur</h3>
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

            <Card className="bg-gray-50">
              <Card.Body>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Informations sur la zone</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">{selectedZoneData.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Nombre de clients:</span>
                    <span className="font-medium">{selectedZoneData.clientCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Montant moyen:</span>
                    <span className="font-medium">{selectedZoneData.averageAmount} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Niveau de risque:</span>
                    <Badge 
                      variant={
                        selectedZoneData.riskLevel === 'Faible' ? 'success' :
                        selectedZoneData.riskLevel === 'Moyen' ? 'warning' :
                        'danger'
                      }
                    >
                      {selectedZoneData.riskLevel}
                    </Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {compatibility && (
              <Card className={`col-span-2 ${
                compatibility.score >= 75 ? 'bg-green-50' :
                compatibility.score >= 50 ? 'bg-yellow-50' :
                'bg-red-50'
              }`}>
                <Card.Body>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Compatibilité collecteur-zone</h3>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            compatibility.score >= 75 ? 'bg-green-600' :
                            compatibility.score >= 50 ? 'bg-yellow-500' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${compatibility.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{Math.round(compatibility.score)}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {Object.entries(compatibility.checks).map(([key, value]) => (
                        <div key={key} className="flex items-center text-sm">
                          {value ? (
                            <CheckCircle2 size={16} className="text-green-500 mr-2" />
                          ) : (
                            <AlertTriangle size={16} className="text-red-500 mr-2" />
                          )}
                          <span className="capitalize">
                            {key === 'certifications' ? 'Certifications requises' :
                             key === 'experience' ? 'Expérience suffisante' :
                             key === 'rating' ? 'Note minimale' :
                             'Disponibilité'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div>
                      {compatibility.score < 75 && (
                        <div className="text-sm text-gray-600">
                          <h4 className="font-medium mb-1">Recommandations:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {!compatibility.checks.certifications && (
                              <li>Formation complémentaire recommandée</li>
                            )}
                            {!compatibility.checks.experience && (
                              <li>Supervision renforcée conseillée</li>
                            )}
                            {!compatibility.checks.rating && (
                              <li>Évaluation supplémentaire suggérée</li>
                            )}
                            {!compatibility.checks.availability && (
                              <li>Vérifier les conflits d'emploi du temps</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            icon={<FileText size={16} />}
          >
            Sou
mettre l'affectation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewAssignment;