import { motion, AnimatePresence } from 'framer-motion'
import { Bell, XCircle } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { NotificationDataResponse } from '../../utils/features/notification/type';


interface NotificationProps {
    showNotifications: boolean
    setShowNotifications: (val: boolean) => void
    alerts: NotificationDataResponse[]
}
function Notification({ showNotifications, setShowNotifications, alerts }: NotificationProps) {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    return (
        <>
            {/* Notifications Panel */}
            <AnimatePresence>
                {showNotifications && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-8 w-96 dark:border-slate-800/70 dark:bg-slate-900 bg-white rounded-lg shadow-xl z-50"
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">{t('notifications.title')}</h3>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XCircle className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {alerts.map(alert => {
                                    const time = new Date(alert.created_at).toLocaleString(i18n.language, {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    return <motion.div
                                        onClick={() => {
                                            setShowNotifications(false)
                                            navigate(`/notifications/${alert.notification_id}`)
                                        }}
                                        key={alert.notification_id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`cursor-pointer p-4 rounded-lg ${alert.is_read ? 'bg-gray-50' : 'bg-red-50'}`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-full ${alert.is_read ? 'bg-gray-50' : 'bg-red-50'}`}>
                                                {alert.is_read ?
                                                    <Bell className="h-5 w-5 text-blue-600" /> :
                                                    <Bell className="h-5 w-5 text-red-600" />
                                                }


                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{ i18n.language === "fr" ? alert.message : alert.messageEn}</p>
                                                <p className="text-xs text-gray-500">{time}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Notification