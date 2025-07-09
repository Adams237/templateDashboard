import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { validateCollector } from '../../utils/validation';

interface CollectorFormProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    zone: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

const CollectorForm: React.FC<CollectorFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState(
    initialData || {
      name: '',
      email: '',
      phone: '',
      zone: '',
    }
  );

  const [errors, setErrors] = React.useState<{
    [key: string]: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateCollector(formData);
    
    if (!validation.success) {
      const newErrors: { [key: string]: string } = {};
      validation.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Nom complet"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<User className="h-5 w-5" />}
          placeholder="Jean Dupont"
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<Mail className="h-5 w-5" />}
          placeholder="jean.dupont@example.com"
        />
        
        <Input
          label="Téléphone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          icon={<Phone className="h-5 w-5" />}
          placeholder="+237 691234567"
        />
        
        <Select
          label="Zone"
          name="zone"
          value={formData.zone}
          onChange={handleChange}
          error={errors.zone}
          options={[
            { value: '', label: 'Sélectionner une zone', disabled: true },
            { value: 'akwa_nord', label: 'Akwa Nord' },
            { value: 'bonanjo', label: 'Bonanjo' },
            { value: 'deido', label: 'Deido' },
            { value: 'bali', label: 'Bali' },
            { value: 'bonapriso', label: 'Bonapriso' },
          ]}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          {initialData ? 'Mettre à jour' : 'Créer le collecteur'}
        </Button>
      </div>
    </form>
  );
};

export default CollectorForm;