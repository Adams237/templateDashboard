import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    danger?: boolean;
  }>;
  align?: 'left' | 'right';
  width?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'left',
  width = 200,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute
              z-50
              mt-2
              rounded-lg
              bg-white
              shadow-lg
              ring-1
              ring-black
              ring-opacity-5
              ${align === 'left' ? 'left-0' : 'right-0'}
            `}
            style={{ width }}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                  className={`
                    ${
                      item.danger
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    group
                    flex
                    w-full
                    items-center
                    px-4
                    py-2
                    text-sm
                  `}
                >
                  {item.icon && (
                    <span className="mr-3 h-5 w-5">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;

export const DropdownButton: React.FC<{
  label: string;
  items: DropdownProps['items'];
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}> = ({ label, items, variant = 'primary', size = 'md' }) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <Dropdown
      trigger={
        <button
          className={`
            ${variants[variant]}
            ${sizes[size]}
            inline-flex
            items-center
            justify-center
            rounded-lg
            font-medium
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-primary-500
          `}
        >
          {label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      }
      items={items}
    />
  );
};