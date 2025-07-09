import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Map as MapIcon,
  List,
  BarChart3,
  Download,
  Upload,
  Filter,
  Plus,
  Search,
} from 'lucide-react';
import CollectorList from '../../components/collectors/CollectorList';
import CollectorMap from '../../components/collectors/CollectorMap';
import CollectorForm from '../../components/collectors/CollectorForm';
import CollectorDetails from '../../components/collectors/CollectorDetails';
import Button from '../../components/common/Button';
import { SearchInput } from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Tabs from '../../components/common/Tabs';
import { useCollectorsStore } from '../../store/collectors';
import { useToast } from '../../hooks/useToast';

type ViewMode = 'list' | 'map' | 'analytics';

const CollectorsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: [] as string[],
    zone: [] as string[],
    performance: [0, 100],
  });

  const {
    collectors,
    addCollector,
    updateCollector,
    deleteCollector,
    loading,
    error,
  } = useCollectorsStore();
  const { toast } = useToast();

  const handleAddCollector = async (data: any) => {
    try {
      await addCollector(data);
      setShowAddModal(false);
      toast.success('Collecteur ajouté avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du collecteur');
    }
  };

  const handleEditCollector = async (data: any) => {
    try {
      await updateCollector(selectedCollector!, data);
      setShowEditModal(false);
      toast.success('Collecteur mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du collecteur');
    }
  };

  const handleDeleteCollector = async () => {
    try {
      await deleteCollector(selectedCollector!);
      setShowDeleteModal(false);
      toast.success('Collecteur supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du collecteur');
    }
  };

  const filteredCollectors = collectors.filter((collector) => {
    const matchesSearch = collector.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(collector.status);
    const matchesZone =
      filters.zone.length === 0 || filters.zone.includes(collector.zone);
    const matchesPerformance =
      collector.performance >= filters.performance[0] &&
      collector.performance <= filters.performance[1];

    return matchesSearch && matchesStatus && matchesZone && matchesPerformance;
  });

  const collectorsStats = {
    total: collectors.length,
    active: collectors.filter((c) => c.status === 'active').length,
    totalCollected: collectors.reduce((sum, c) => sum + c.totalAmount, 0),
    averagePerformance:
      collectors.reduce((sum, c) => sum + c.performance, 0) / collectors.length,
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des collecteurs
          </h1>
          <p className="text-gray-500 mt-1">
            {collectorsStats.total} collecteurs • {collectorsStats.active} actifs
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="h-4 w-4" />}
          >
            Exporter
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Upload className="h-4 w-4" />}
          >
            Importerer
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Nouveau collecteur
          </Button>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un collecteur..."
          />
          <Button
            variant="secondary"
            size="sm"
            icon={<Filter className="h-4 w-4" />}
          >
            Filtres
          </Button>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="sm"
            icon={<List className="h-4 w-4" />}
            onClick={() => setViewMode('list')}
          >
            Liste
          </Button>
          <Button
            variant={viewMode === 'map' ? 'primary' : 'ghost'}
            size="sm"
            icon={<MapIcon className="h-4 w-4" />}
            onClick={() => setViewMode('map')}
          >
            Carte
          </Button>
          <Button
            variant={viewMode === 'analytics' ? 'primary' : 'ghost'}
            size="sm"
            icon={<BarChart3 className="h-4 w-4" />}
            onClick={() => setViewMode('analytics')}
          >
            Analyses
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      {viewMode === 'list' && (
        <CollectorList
          collectors={filteredCollectors}
          onView={(id) => setSelectedCollector(id)}
          onEdit={(id) => {
            setSelectedCollector(id);
            setShowEditModal(true);
          }}
          onDelete={(id) => {
            setSelectedCollector(id);
            setShowDeleteModal(true);
          }}
          onAdd={() => setShowAddModal(true)}
        />
      )}

      {viewMode === 'map' && (
        <CollectorMap
          collectors={filteredCollectors}
          onSelectCollector={(id) => setSelectedCollector(id)}
        />
      )}

      {viewMode === 'analytics' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Graphiques et analyses à implémenter */}
        </div>
      )}

      {/* Modales */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un collecteur"
      >
        <CollectorForm
          onSubmit={handleAddCollector}
          onCancel={() => setShowAddModal(false)}
          loading={loading}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Modifier le collecteur"
      >
        <CollectorForm
          initialData={collectors.find((c) => c.id === selectedCollector)}
          onSubmit={handleEditCollector}
          onCancel={() => setShowEditModal(false)}
          loading={loading}
        />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer le collecteur"
      >
        <div className="p-6">
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer ce collecteur ? Cette action est
            irréversible.
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteCollector}
              loading={loading}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CollectorsPage;