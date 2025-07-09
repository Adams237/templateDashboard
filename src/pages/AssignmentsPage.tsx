import React from 'react';
import AssignmentButton from '../components/affectation/AssignmentButton';
import ZoneButton from '../components/zone/ZoneButton';

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end gap-4 mb-6">
          <ZoneButton />
          <AssignmentButton />
        </div>
      </main>
    </div>
  );
}
