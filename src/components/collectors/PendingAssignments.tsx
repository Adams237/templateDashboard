import React, { useState } from 'react';
import Table from '../../utils/Table';
import Badge from '../../utils/Badge';
import Button from '../../utils/Button';
import Card from '../../utils/Card';
import { Check, X, Calendar, MapPin, AlertTriangle, Clock, Users } from 'lucide-react';
import { mockPendingAssignments } from '../../data/mockAssignments';

const PendingAssignments = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  // Calculate summary statistics
  const summaryStats = {
    totalPending: mockPendingAssignments.length,
    highPriority: mockPendingAssignments.filter(a => a.priority === 'high').length,
    averageApprovalStep: Math.round(
      mockPendingAssignments.reduce((acc, curr) => acc + curr.approvalWorkflow.currentStep, 0) /
      mockPendingAssignments.length
    ),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Demandes en attente</p>
                <p className="text-2xl font-semibold">{summaryStats.totalPending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock size={24} className="text-yellow-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Priorité haute</p>
                <p className="text-2xl font-semibold">{summaryStats.highPriority}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Étape moyenne</p>
                <p className="text-2xl font-semibold">{summaryStats.averageApprovalStep}/3</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            
            <p className="text-sm text-yellow-700">
              Les affectations en attente nécessitent une approbation avant d'être activées.
              Vérifiez les critères d'éligibilité et les risques avant d'approuver.
            </p>
          </div>
        </div>
      </div>

      {mockPendingAssignments.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune affectation en attente</h3>
          <p className="mt-1 text-sm text-gray-500">
            Toutes les demandes d'affectation ont été traitées.
          </p>
        </div>
      ) : (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Collecteur</Table.HeadCell>
              <Table.HeadCell>Zone demandée</Table.HeadCell>
              <Table.HeadCell>Période</Table.HeadCell>
              <Table.HeadCell>Raison</Table.HeadCell>
              <Table.HeadCell>Demandé par</Table.HeadCell>
              <Table.HeadCell>Priorité</Table.HeadCell>
              <Table.HeadCell>Statut</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {mockPendingAssignments.map((assignment) => (
              <React.Fragment key={assignment.id}>
                <Table.Row
                  className={selectedAssignment === assignment.id ? 'bg-gray-50' : ''}
                  onClick={() => setSelectedAssignment(
                    selectedAssignment === assignment.id ? null : assignment.id
                  )}
                >
                  <Table.Cell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        {assignment.collector?.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{assignment.collector?.name}</div>
                        <div className="text-gray-500">{assignment.collector?.id}</div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <span>{assignment.zone?.name}</span>
                      <Badge variant="primary" className="ml-2">
                        {assignment.originalCollector?.name}
                      </Badge>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div>{assignment.startDate}</div>
                        <div className="text-gray-500">{assignment.endDate}</div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="max-w-xs truncate">
                      {assignment.reason}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="font-medium">{assignment.requestedBy}</div>
                    <div className="text-sm text-gray-500">{assignment.requestDate}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge 
                      variant={
                        assignment.priority === 'high' ? 'danger' : 
                        assignment.priority === 'medium' ? 'warning' : 
                        'secondary'
                      }
                    >
                      {assignment.priority === 'high' ? 'Haute' : 
                       assignment.priority === 'medium' ? 'Moyenne' : 
                       'Basse'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(assignment.approvalWorkflow.currentStep / assignment.approvalWorkflow.totalSteps) * 100}%`
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Étape {assignment.approvalWorkflow.currentStep}/{assignment.approvalWorkflow.totalSteps}
                        </div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        icon={<Check size={14} />}
                      >
                        Approuver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        icon={<X size={14} />}
                      >
                        Refuser
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>

                {selectedAssignment === assignment.id && (
                  <Table.Row>
                    <Table.Cell colSpan={8}>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Workflow d'approbation</h4>
                            <div className="space-y-3">
                              {assignment.approvalWorkflow.steps.map((step) => (
                                <div
                                  key={step.step}
                                  className={`flex items-center ${
                                    step.status === 'completed'
                                      ? 'text-green-600'
                                      : step.status === 'in_progress'
                                      ? 'text-blue-600'
                                      : 'text-gray-400'
                                  }`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                      step.status === 'completed'
                                        ? 'bg-green-100'
                                        : step.status === 'in_progress'
                                        ? 'bg-blue-100'
                                        : 'bg-gray-100'
                                    }`}
                                  >
                                    {step.status === 'completed' ? (
                                      <Check size={14} />
                                    ) : step.status === 'in_progress' ? (
                                      <Clock size={14} />
                                    ) : (
                                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium">{step.name}</div>
                                    {step.status === 'completed' && (
                                      <div className="text-xs">
                                        Complété par {step.completedBy} le {step.completedAt}
                                      </div>
                                    )}
                                    {step.status === 'in_progress' && (
                                      <div className="text-xs">
                                        En attente de {step.assignedTo} - Échéance: {step.dueDate}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Vérifications préalables</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Disponibilité du collecteur</span>
                                <Badge
                                  variant={assignment.preAssignmentChecks.collectorAvailable ? 'success' : 'danger'}
                                >
                                  {assignment.preAssignmentChecks.collectorAvailable ? 'Disponible' : 'Indisponible'}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Certification valide</span>
                                <Badge
                                  variant={assignment.preAssignmentChecks.certificationValid ? 'success' : 'danger'}
                                >
                                  {assignment.preAssignmentChecks.certificationValid ? 'Valide' : 'Non valide'}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Formation requise</span>
                                <Badge
                                  variant={assignment.preAssignmentChecks.trainingRequired ? 'warning' : 'success'}
                                >
                                  {assignment.preAssignmentChecks.trainingRequired ? 'Requise' : 'Non requise'}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Habilitation sécurité</span>
                                <Badge
                                  variant={
                                    assignment.preAssignmentChecks.securityClearance === 'Validé'
                                      ? 'success'
                                      : 'warning'
                                  }
                                >
                                  {assignment.preAssignmentChecks.securityClearance}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Évaluation des risques</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Risque global</span>
                                <Badge
                                  variant={
                                    assignment.riskAssessment.overallRisk === 'Faible'
                                      ? 'success'
                                      : assignment.riskAssessment.overallRisk === 'Moyen'
                                      ? 'warning'
                                      : 'danger'
                                  }
                                >
                                  {assignment.riskAssessment.overallRisk}
                                </Badge>
                              </div>
                              <div className="mt-2 space-y-1">
                                <div className="text-sm flex justify-between">
                                  <span className="text-gray-500">Expérience</span>
                                  <span className="font-medium">{assignment.riskAssessment.factors.experienceMatch}</span>
                                </div>
                                <div className="text-sm flex justify-between">
                                  <span className="text-gray-500">Connaissance zone</span>
                                  <span className="font-medium">{assignment.riskAssessment.factors.zoneKnowledge}</span>
                                </div>
                                <div className="text-sm flex justify-between">
                                  <span className="text-gray-500">Relations clients</span>
                                  <span className="font-medium">{assignment.riskAssessment.factors.clientRelations}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default PendingAssignments;