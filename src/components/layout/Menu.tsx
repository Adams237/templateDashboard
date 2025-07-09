import {motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, LogOut, MessageSquare, Settings, UserCircle } from 'lucide-react';
import React from 'react'



interface MenyProps{
    showUserMenu:boolean
}

function Menu({ showUserMenu }:MenyProps) {
    return (
        <>
            <AnimatePresence>
                {showUserMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-8 w-64 bg-white rounded-lg shadow-xl z-50"
                    >
                        <div className="p-4">
                            <div className="flex items-center space-x-3 mb-4 pb-4 border-b">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Admin"
                                    className="h-10 w-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium text-gray-900">Admin User</p>
                                    <p className="text-sm text-gray-500">admin@bank.com</p>
                                </div>
                            </div>
                            <nav className="space-y-1">
                                {[
                                    { icon: UserCircle, label: 'Mon profil' },
                                    { icon: Settings, label: 'Paramètres' },
                                    { icon: HelpCircle, label: 'Aide' },
                                    { icon: MessageSquare, label: 'Support' }
                                ].map((item, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        <item.icon className="h-5 w-5 text-gray-500" />
                                        <span>{item.label}</span>
                                    </motion.button>
                                ))}
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: '#fee2e2' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 mt-4"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Déconnexion</span>
                                </motion.button>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Menu