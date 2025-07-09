import { Download, Filter, Search } from 'lucide-react';
import {motion } from 'framer-motion'
import React from 'react'

const TableHeader = ({ title, onSearch, onFilter }: { title: string, onSearch: (value: string) => void, onFilter: () => void }) => (
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center space-x-4">
            <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={onFilter}
            >
                <Filter className="h-5 w-5 text-gray-600" />
                <span>Filtres</span>
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
                <Download className="h-5 w-5 text-gray-600" />
                <span>Exporter</span>
            </motion.button>
        </div>
    </div>
);

export default TableHeader