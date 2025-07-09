import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import type { Collector } from '../../types';
import Table from '../common/Table';
import Button from '../common/Button';
import { SearchInput } from '../common/Input';
import { StatusBadge } from '../common/Badge';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import { formatCurrency, formatDateTime } from '../../utils/format';

interface CollectorListProps {
  collectors: Collector[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const CollectorList: React.FC<CollectorListProps> = ({
  collectors,
  onView,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleZoneFilter = (zone: string) => {
    setSelectedZones((prev) =>
      prev.includes(zone)
        ? prev.filter((z) => z !== zone)
        : [...prev, zone]
    );
  };

  const filteredCollectors = collectors.filter((collector) => {
    const matchesSearch =
      collector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collector.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(collector.status);

    const matchesZone =
      selectedZones.length === 0 || selectedZones.includes(collector.zone);

    return matchesSearch && matchesStatus && matchesZone;
  });

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <SearchInput
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher un collecteur..."
          />
          <Dropdown
            trigger={
              <Button
                variant="secondary"
                size="sm"
                icon={<Filter className="h-4 w-4" />}
              >
                Filtres
              </Button>
            }
            items={[
              {
                label: 'Statut',
                icon: <CheckCircle className="h-4 w-4" />,
                onClick: () => handleStatusFilter('active'),
              },
              {
                label: 'Zone',
                icon: <CheckCircle className="h-4 w-4" />,
                onClick: () => handleZoneFilter('akwa_nord'),
              },
            ]}
          />
        </div>
        <div className="flex items-center space-x-3">
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
            Importer
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="h-4 w-4" />}
            onClick={onAdd}
          >
            Nouveau collecteur
          </Button>
        </div>
      </div>

      {/* Tableau des collecteurs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table
          data={filteredCollectors}
          columns={[
            {
              accessorKey: 'name',
              header: 'Collecteur',
              cell: (info) => {
                const collector = info.row.original;
                return (
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={collector.avatar}
                      alt={collector.name}
                      size="sm"
                      status={collector.status === 'active' ? 'online' : 'offline'}
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {collector.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {collector.email}
                      </div>
                    </div>
                  </div>
                );
              },
            },
            {
              accessorKey: 'zone',
              header: 'Zone',
            },
            {
              accessorKey: 'performance',
              header: 'Performance',
              cell: (info) => {
                const value = info.getValue() as number;
                return (
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {value}%
                    </span>
                  </div>
                );
              },
            },
            {
              accessorKey: 'collectionsToday',
              header: 'Collectes',
              cell: (info) => info.getValue(),
            },
            {
              accessorKey: 'totalAmount',
              header: 'Montant total',
              cell: (info) => formatCurrency(info.getValue() as number),
            },
            {
              accessorKey: 'status',
              header: 'Statut',
              cell: (info) => <StatusBadge status={info.getValue() as any} />,
            },
            {
              accessorKey: 'lastActive',
              header: 'Dernière activité',
              cell: (info) => formatDateTime(info.getValue() as string),
            },
            {
              id: 'actions',
              header: '',
              cell: (info) => (
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Eye className="h-4 w-4" />}
                    onClick={() => onView(info.row.original.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Edit className="h-4 w-4" />}
                    onClick={() => onEdit(info.row.original.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 className="h-4 w-4" />}
                    onClick={() => onDelete(info.row.original.id)}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CollectorList;