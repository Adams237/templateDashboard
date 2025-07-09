import React from 'react';
import { UserCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const collectors = [
  {
    id: '1',
    name: 'Jean Dupont',
    zone: 'Akwa Nord',
    status: 'active',
    performance: 92,
    collectionsToday: 15,
    totalAmount: 450000,
  },
  {
    id: '2',
    name: 'Marie Claire',
    zone: 'Bonanjo',
    status: 'active',
    performance: 88,
    collectionsToday: 12,
    totalAmount: 380000,
  },
  {
    id: '3',
    name: 'Paul Michel',
    zone: 'Deido',
    status: 'inactive',
    performance: 75,
    collectionsToday: 8,
    totalAmount: 220000,
  },
];

export default function CollectorsPage() {
  const navigate = useNavigate();

  return (
    <div className="  rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Gestion des collecteurs</h2>
      <div className=" w-[72vw] overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collecteur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collections</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collectors.map((collector) => (
              <tr key={collector.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircle className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{collector.name}</div>
                      <div className="text-sm text-gray-500">ID: {collector.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{collector.zone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 mr-2">{collector.performance}%</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: `${collector.performance}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{collector.collectionsToday}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{collector.totalAmount.toLocaleString()} FCFA</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    collector.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {collector.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <motion.button onClick={() => navigate(`/collectors/${collector.id}`)} whileHover={{ scale: 1.1 }} className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-5 w-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="text-yellow-600 hover:text-yellow-800">
                      <Edit className="h-5 w-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
