import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Button from '../ui/Button';
import ZoneModal from './ZoneModal';

interface ZoneButtonProps {
  className?: string;
}

const ZoneButton = ({ className = '' }: ZoneButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        variant="primary"
        icon={<MapPin size={16} />}
        className={`bg-green-600 hover:bg-green-700 ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        Zones
      </Button>

      <ZoneModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ZoneButton;