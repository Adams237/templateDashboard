import {motion, AnimatePresence } from 'framer-motion'
import {   LogOut,      UserCircle } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../utils/redux/slice/user.slice';
import { useTranslation } from 'react-i18next';
import type { UserInterface } from '../../utils/redux/slice/user.interface';



interface MenyProps{
    showUserMenu:boolean
}

function MenuProfile({ showUserMenu }:MenyProps) {
    const {t} = useTranslation()
    const dispatch = useDispatch()
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const currentUser:UserInterface = useSelector((state:any)=>state.user.value[0])

    return (
        <>
            <AnimatePresence>
                {showUserMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-8 w-64 bg-white dark:border-slate-800/70 dark:bg-slate-900 rounded-lg shadow-xl z-50"
                    >
                        <div className="p-4">
                            <div className="flex items-center space-x-3 mb-4 pb-4 border-b">
                                <UserCircle className='w-10 h-10 dark:text-white'/>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{currentUser?.name}</p>
                                    <p className="text-sm text-gray-500 ">{currentUser?.email}</p>
                                </div>
                            </div>
                            <nav className="space-y-1">
                                {/* {[
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
                                ))} */}
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: '#fee2e2' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={()=>{
                                        dispatch(logOut())
                                    }}
                                    className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 mt-4"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>{t("login.logout")}</span>
                                </motion.button>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default MenuProfile