import React from 'react';
import ClientDashboard from '../components/clients/ClientDashboard';

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ClientDashboard />
        </div>
      </main>
    </div>
  );
}
