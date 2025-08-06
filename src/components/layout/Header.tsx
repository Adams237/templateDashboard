import React, { useState } from 'react';
import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import {  ChevronDown,  UserCircle } from 'lucide-react';
import Notification from './Notification';
import Menu from './Menu';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  message: string;
  time: string;
  read: boolean;
}
export default function Header() {
  const { i18n } = useTranslation()
  const today = format(new Date(), 'EEEE d MMMM yyyy', { locale: i18n.language === 'fr' ? fr : enUS });
 
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Collecteur #2 inactif depuis 30 minutes',
      time: '10:30',
      read: false
    },
    {
      id: '2',
      type: 'success',
      message: 'Objectif journalier atteint pour la zone Akwa',
      time: '10:15',
      read: false
    },
    {
      id: '3',
      type: 'error',
      message: 'Échec de transaction #T123 - Montant important',
      time: '10:00',
      read: true
    }
  ]);

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        {/* <h1 className="text-2xl font-bold text-gray-900">
          {currentView === 'dashboard' && 'Tableau de bord'}
          {currentView === 'clients' && 'Gestion des clients'}
          {currentView === 'collectors' && 'Gestion des collecteurs'}
          {currentView === 'affectation' && 'Gestion des affectations'}
          {currentView === 'transactions' && 'Historique des transactions'}
          {currentView === 'accounts' && 'Demandes de compte'}
          {currentView === 'settings' && 'Paramètres'}
        </h1> */}
        <p className="text-gray-500">
          {/* {format(new Date(), 'EEEE d MMMM yyyy', { locale: fr })} */}
          {today}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        
        <div className='flex items-center space-x-2'>
          <Button variant={i18n.language === 'fr' ? 'primary' : 'outline'} onClick={() => handleChangeLanguage('fr')}>FR</Button>
          <Button variant={i18n.language === 'en' ? 'primary' : 'outline'} onClick={() => handleChangeLanguage('en')}>EN</Button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="flex items-center space-x-2">
           <UserCircle className='w-8 h-8'/>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </div>
        </motion.button>
      </div>
      {/* Notification */}
          <Notification showNotifications={showNotifications} setShowNotifications={setShowNotifications} alerts={alerts} />
      {/* User Menu */}
      <Menu showUserMenu={showUserMenu} />
    </header>
  );
}
