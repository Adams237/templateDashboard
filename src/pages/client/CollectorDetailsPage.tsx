import React from 'react';
import { useParams } from 'react-router-dom';
import CollectorDetails from '../../components/collectors/CollectorDetails';

const mockCollector = {
  id: '1',
  name: 'Jean Dupont',
  zone: 'Akwa Nord',
  status: 'active' as const,
  performance: 92,
  collectionsToday: 15,
  totalAmount: 450000,
  lastActive: '2024-03-15T10:30:00',
};

export default function CollectorDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Détails du collecteur #{id}</h2>
      <CollectorDetails
        collector={{ ...mockCollector, id: id || mockCollector.id }}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
}
