import React, { useState } from 'react';
import { Users } from 'lucide-react';
import Button from '../../utils/Button';
import AssignmentModal from './AssignmentModal';

interface AssignmentButtonProps {
  className?: string;
}

const AssignmentButton = ({ className = '' }: AssignmentButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        variant="primary"
        icon={<Users size={16} />}
        className={`bg-indigo-600 hover:bg-indigo-700 ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        Affectation
      </Button>

      <AssignmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AssignmentButton;