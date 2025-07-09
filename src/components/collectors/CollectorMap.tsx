import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Users, Wallet } from 'lucide-react';
import type { Collector } from '../../types';
import Card from '../common/Card';
import { StatusBadge } from '../common/Badge';
import Avatar from '../common/Avatar';
import { formatCurrency } from '../../utils/format';

interface CollectorMapProps {
  collectors: Collector[];
  onSelectCollector: (id: string) => void;
}

const CollectorMap: React.FC<CollectorMapProps> = ({
  collectors,
  onSelectCollector,
}) => {
  // Note: Dans un environnement de production, nous utiliserions une vraie carte
  // avec une bibliothèque comme Mapbox ou Google Maps
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Carte des collecteurs
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-500">Actif</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-gray-500">Inactif</span>
            </div>
          </div>
        </div>

        {/* Simulateur de carte */}
        <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          {/* Zones */}
          <div className="absolute inset-0 p-4">
            {/* Akwa Nord */}
            <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-blue-100 rounded-lg opacity-50" />
            <div className="absolute top-[22%] left-[32%] text-sm font-medium text-blue-800">
              Akwa Nord
            </div>

            {/* Bonanjo */}
            <div className="absolute top-[40%] left-[50%] w-32 h-32 bg-green-100 rounded-lg opacity-50" />
            <div className="absolute top-[42%] left-[52%] text-sm font-medium text-green-800">
              Bonanjo
            </div>

            {/* Deido */}
            <div className="absolute top-[60%] left-[20%] w-32 h-32 bg-purple-100 rounded-lg opacity-50" />
            <div className="absolute top-[62%] left-[22%] text-sm font-medium text-purple-800">
              Deido
            </div>

            {/* Collecteurs */}
            {collectors.map((collector) => (
              <motion.div
                key={collector.id}
                className="absolute cursor-pointer"
                style={{
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => onSelectCollector(collector.id)}
              >
                <div className="relative">
                  <Avatar
                    src={collector.avatar}
                    alt={collector.name}
                    size="md"
                    status={collector.status === 'active' ? 'online' : 'offline'}
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full">
                    <MapPin className="h-4 w-4 text-primary-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques par zone */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Akwa Nord
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Users className="h-5 w-5 mr-2" />
                <span>Collecteurs actifs</span>
              </div>
              <span className="font-medium text-gray-900">5/6</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Wallet className="h-5 w-5 mr-2" />
                <span>Montant collecté</span>
              </div>
              <span className="font-medium text-gray-900">
                {formatCurrency(850000)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Navigation className="h-5 w-5 mr-2" />
                <span>Couverture</span>
              </div>
              <span className="font-medium text-gray-900">92%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Bonanjo
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Users className="h-5 w-5 mr-2" />
                <span>Collecteurs actifs</span>
              </div>
              <span className="font-medium text-gray-900">4/4</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Wallet className="h-5 w-5 mr-2" />
                <span>Montant collecté</span>
              </div>
              <span className="font-medium text-gray-900">
                {formatCurrency(720000)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Navigation className="h-5 w-5 mr-2" />
                <span>Couverture</span>
              </div>
              <span className="font-medium text-gray-900">88%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Deido
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Users className="h-5 w-5 mr-2" />
                <span>Collecteurs actifs</span>
              </div>
              <span className="font-medium text-gray-900">3/5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Wallet className="h-5 w-5 mr-2" />
                <span>Montant collecté</span>
              </div>
              <span className="font-medium text-gray-900">
                {formatCurrency(580000)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <Navigation className="h-5 w-5 mr-2" />
                <span>Couverture</span>
              </div>
              <span className="font-medium text-gray-900">75%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CollectorMap;