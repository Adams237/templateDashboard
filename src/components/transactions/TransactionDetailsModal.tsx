import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Download,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { StatusBadge } from '../common/Badge';
import type { Transaction } from '../../types';
import { formatCurrency, formatDateTime } from '../../utils/format';
import  { useEffect, useRef } from 'react';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // / Ferme le modal si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Ajoute l'écouteur d'événements
    document.addEventListener('mousedown', handleClickOutside);
    
    // Nettoyage de l'écouteur d'événements
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  // Données simulées pour l'historique
  const history = [
    {
      date: '2024-03-15T10:15:00',
      status: 'completed',
      message: 'Transaction complétée avec succès',
      actor: 'Système',
    },
    {
      date: '2024-03-15T10:14:30',
      status: 'pending',
      message: 'Vérification du paiement en cours',
      actor: 'Système',
    },
    {
      date: '2024-03-15T10:14:00',
      status: 'pending',
      message: 'Paiement initié par le client',
      actor: transaction.collector.name,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails de la transaction"
      size="lg"
    >
      <div   ref={modalRef} className="space-y-6">
        {/* En-tête avec statut */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div>
            <div className="text-sm text-gray-500">ID Transaction</div>
            <div className="text-lg font-semibold text-gray-900">
              #{transaction.id}
            </div>
          </div>
          <StatusBadge status={transaction.status} />
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Informations client</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                {transaction.client.type === 'business' ? (
                  <Building className="h-5 w-5 text-gray-400" />
                ) : (
                  <User className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {transaction.client.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.client.type === 'business'
                      ? 'Entreprise'
                      : 'Particulier'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Informations collecteur</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={transaction.collector.avatar}
                  alt={transaction.collector.name}
                  size="sm"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {transaction.collector.name}
                  </div>
                  <div className="text-sm text-gray-500">{transaction.zone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Détails du paiement */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">
            Détails du paiement
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Montant</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatCurrency(transaction.amount)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Méthode</div>
              <div className="text-lg font-semibold text-gray-900">
                {transaction.paymentMethod === 'cash'
                  ? 'Espèces'
                  : transaction.paymentMethod === 'mobile_money'
                  ? 'Mobile Money'
                  : 'Carte bancaire'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatDateTime(transaction.date)}
              </div>
            </div>
          </div>
        </div>

        {/* Historique de la transaction */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">
            Historique de la transaction
          </h3>
          <div className="space-y-4">
            {history.map((event, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-200"
              >
                <div
                  className={`p-2 rounded-full ${
                    event.status === 'completed'
                      ? 'bg-green-100'
                      : event.status === 'pending'
                      ? 'bg-yellow-100'
                      : 'bg-red-100'
                  }`}
                >
                  {event.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : event.status === 'pending' ? (
                    <Clock className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">
                      {event.message}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(event.date), 'HH:mm')}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    par {event.actor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes et pièces jointes */}
        {(transaction.notes || transaction.attachments) && (
          <div className="space-y-4">
            {transaction.notes && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                <p className="text-gray-600">{transaction.notes}</p>
              </div>
            )}
            
            {transaction.attachments && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Pièces jointes
                </h3>
                <div className="space-y-2">
                  {transaction.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {attachment}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download className="h-4 w-4" />}
                      >
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            variant="secondary"
            icon={<MessageSquare className="h-4 w-4" />}
          >
            Contacter le support
          </Button>
          <Button
            variant="primary"
            icon={<Download className="h-4 w-4" />}
          >
            Télécharger le reçu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetailsModal;