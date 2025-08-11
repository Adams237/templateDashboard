import React from 'react';
import ClientDashboard from '../../components/clients/ClientDashboard';

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-full  py-6 ">
        <div className="w-full py-6 sm:px-0">
          <ClientDashboard />
        </div>
      </main>
    </div>
  );
}
