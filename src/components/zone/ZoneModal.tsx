import React, { useState } from 'react';
import Modal from '../ui/Modal';
import ZoneTabs from './ZoneTabs';
import ZonesList from './ZonesList';
import NewZone from './NewZone';

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'list' | 'new';

const ZoneModal = ({ isOpen, onClose }: ZoneModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('list');

  return (
    <Modal  isOpen={isOpen} onClose={onClose} title="Gestion des zones" size="xl">
      <div className="space-y-4">
        <ZoneTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="pt-2">
          {activeTab === 'list' && <ZonesList />}
          {activeTab === 'new' && <NewZone onSuccess={() => setActiveTab('list')} />}
        </div>
      </div>
    </Modal>
  );
};

export default ZoneModal;