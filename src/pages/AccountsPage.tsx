import React from 'react';
import { format } from 'date-fns';

const accountRequests = [
  {
    id: '1',
    clientName: 'Entreprise ABC',
    type: 'Professionnel',
    status: 'pending' as const,
    submittedDate: '2024-03-15T08:30:00',
    documents: ['ID', 'Business Registration', 'Tax Certificate']
  },
  {
    id: '2',
    clientName: 'John Smith',
    type: 'Particulier',
    status: 'approved' as const,
    submittedDate: '2024-03-15T09:00:00',
    documents: ['ID', 'Proof of Address']
  },
  {
    id: '3',
    clientName: 'Boutique XYZ',
    type: 'Professionnel',
    status: 'rejected' as const,
    submittedDate: '2024-03-15T07:45:00',
    documents: ['ID', 'Business Registration']
  },
];

export default function AccountsPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Demandes de compte</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {accountRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{request.clientName}</div>
                <div className="text-sm text-gray-500">ID: {request.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.documents.map((doc, idx) => (
                  <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1">
                    {doc}
                  </span>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(request.submittedDate), 'dd/MM/yyyy HH:mm')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status === 'approved' ? 'Approuvée' : request.status === 'pending' ? 'En attente' : 'Rejetée'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
