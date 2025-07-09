import React, { useState } from 'react';
import Modal from '../ui/Modal';
import AssignmentTabs from './AssignmentTabs';
import AssignmentsList from './AssignmentsList';
import PendingAssignments from './PendingAssignments';
import AssignmentHistory from './AssignmentHistory';
import NewAssignment from './NewAssignment';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'current' | 'pending' | 'history' | 'new';

const AssignmentModal = ({ isOpen, onClose }: AssignmentModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('current');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gestion des affectations" size="xl">
      <div className="space-y-4">
        <AssignmentTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="pt-2">
          {activeTab === 'current' && <AssignmentsList />}
          {activeTab === 'pending' && <PendingAssignments />}
          {activeTab === 'history' && <AssignmentHistory />}
          {activeTab === 'new' && <NewAssignment onSuccess={() => setActiveTab('current')} />}
        </div>
      </div>
    </Modal>
  );
};

export default AssignmentModal;