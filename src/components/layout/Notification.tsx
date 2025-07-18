import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Bell, CheckCircle, XCircle } from 'lucide-react'
import React from 'react'
interface Alert {
    id: string;
    type: 'warning' | 'success' | 'error' | 'info';
    message: string;
    time: string;
    read: boolean;
}

interface NotificationProps {
    showNotifications: boolean
    setShowNotifications: (val: boolean) => void
    alerts: Alert[]
}
function Notification({ showNotifications, setShowNotifications, alerts }: NotificationProps) {
    return (
        <>
            {/* Notifications Panel */}
            <AnimatePresence>
                {showNotifications && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-8 w-96 bg-white rounded-lg shadow-xl z-50"
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Notifications</h3>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XCircle className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {alerts.map(alert => (
                                    <motion.div
                                        key={alert.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`p-4 rounded-lg ${alert.type === 'warning' ? 'bg-yellow-50' :
                                            alert.type === 'success' ? 'bg-green-50' :
                                                alert.type === 'error' ? 'bg-red-50' : 'bg-blue-50'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-full ${alert.type === 'warning' ? 'bg-yellow-100' :
                                                alert.type === 'success' ? 'bg-green-100' :
                                                    alert.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                                                }`}>
                                                {alert.type === 'warning' ? (
                                                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                                ) : alert.type === 'success' ? (
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                ) : alert.type === 'error' ? (
                                                    <XCircle className="h-5 w-5 text-red-600" />
                                                ) : (
                                                    <Bell className="h-5 w-5 text-blue-600" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                                                <p className="text-xs text-gray-500">{alert.time}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Notification