import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Settings,
  RollerCoaster,
  User,
  Backpack,
} from 'lucide-react';
import { UserInterface } from '../../utils/interfaces/user.interface';

const links = [
  { path: '/dashboard', label: 'Tableau de bord', icon: BarChart3 },
  { path: '/clients', label: 'Microfinance', icon: Users },
  { path: '/accounts', label: 'Packages', icon: Backpack },
  { path: '/settings', label: 'Paramètres', icon: Settings },
  { path: '/account', label: 'Compte', icon: User },
];

const linksAdmin=[
  ...links,
  {path:'/roles', label:"Roles",icon:RollerCoaster },
  {path:'/users', label:"Users",icon:User },
]

interface SidebarProps{
  user:UserInterface
}
export default function Sidebar({user}:SidebarProps) {
  const [currentLink] = useState( linksAdmin)
  console.log(user)
  return (
    <aside className="fixed overflow-y-auto inset-y-0 left-0 w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">BankAdmin</h1>
        <nav className="space-y-2">
          {currentLink.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
