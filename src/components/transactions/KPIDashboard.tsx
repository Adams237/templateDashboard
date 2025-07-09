import React from 'react';
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';
import { Users, Clock, AlertTriangle, Repeat, ArrowUpRight, ArrowDownRight, Bell, RefreshCw, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../data/mockClients';

// Mock data for KPIs
const kpiData = {
  activeClients: {
    current: 2850,
    previous: 2650,
    trend: [2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850],
    isPositive: true
  },
  activeCollectors: {
    current: 45,
    previous: 42,
    trend: [38, 40, 41, 42, 43, 44, 45],
    isPositive: true
  },
  monthlyVolume: {
    current: 152000000,
    previous: 145000000,
    trend: [130000000, 135000000, 140000000, 145000000, 148000000, 150000000, 152000000],
    isPositive: true
  },
  rejectionRate: {
    current: 2.8,
    previous: 3.2,
    trend: [3.5, 3.4, 3.3, 3.2, 3.0, 2.9, 2.8],
    isPositive: true
  },
  avgCollectionTime: {
    current: 12,
    previous: 15,
    trend: [18, 17, 16, 15, 14, 13, 12],
    isPositive: true
  },
  depositFrequency: {
    current: 3.2,
    previous: 2.8,
    trend: [2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.2],
    isPositive: true
  },
  timeBetweenCollections: {
    current: 48,
    previous: 52,
    trend: [60, 58, 55, 52, 50, 49, 48],
    isPositive: true
  },
  alertsSent: {
    current: 125,
    previous: 145,
    trend: [160, 155, 150, 145, 140, 130, 125],
    isPositive: true
  },
  syncRate: {
    current: 98.5,
    previous: 97.8,
    trend: [96.5, 96.8, 97.2, 97.8, 98.0, 98.2, 98.5],
    isPositive: true
  }
};

const KPIDashboard = () => {
  const calculateVariation = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Clients */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Clients actifs</h3>
                  <p className="text-2xl font-semibold">{kpiData.activeClients.current.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                {kpiData.activeClients.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${kpiData.activeClients.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(calculateVariation(kpiData.activeClients.current, kpiData.activeClients.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.activeClients.trend} height={50}>
              <SparklinesLine color="#2563EB" />
            </Sparklines>
          </Card.Body>
        </Card>

        {/* Monthly Volume */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <RefreshCw className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Volume mensuel</h3>
                  <p className="text-2xl font-semibold">{formatCurrency(kpiData.monthlyVolume.current)}</p>
                </div>
              </div>
              <div className="flex items-center">
                {kpiData.monthlyVolume.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${kpiData.monthlyVolume.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(calculateVariation(kpiData.monthlyVolume.current, kpiData.monthlyVolume.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.monthlyVolume.trend} height={50}>
              <SparklinesLine color="#059669" />
            </Sparklines>
          </Card.Body>
        </Card>

        {/* Rejection Rate */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg mr-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Taux de rejet</h3>
                  <p className="text-2xl font-semibold">{kpiData.rejectionRate.current}%</p>
                </div>
              </div>
              <div className="flex items-center">
                {!kpiData.rejectionRate.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm ${!kpiData.rejectionRate.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {Math.abs(calculateVariation(kpiData.rejectionRate.current, kpiData.rejectionRate.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.rejectionRate.trend} height={50}>
              <SparklinesLine color="#DC2626" />
            </Sparklines>
          </Card.Body>
        </Card>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Collection Time */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Durée moyenne collecte</h3>
                  <p className="text-2xl font-semibold">{kpiData.avgCollectionTime.current} min</p>
                </div>
              </div>
              <div className="flex items-center">
                {!kpiData.avgCollectionTime.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm ${!kpiData.avgCollectionTime.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {Math.abs(calculateVariation(kpiData.avgCollectionTime.current, kpiData.avgCollectionTime.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.avgCollectionTime.trend} height={50}>
              <SparklinesBars color="#7C3AED" />
            </Sparklines>
          </Card.Body>
        </Card>

        {/* Deposit Frequency */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Repeat className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fréquence versements</h3>
                  <p className="text-2xl font-semibold">{kpiData.depositFrequency.current}/semaine</p>
                </div>
              </div>
              <div className="flex items-center">
                {kpiData.depositFrequency.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${kpiData.depositFrequency.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(calculateVariation(kpiData.depositFrequency.current, kpiData.depositFrequency.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.depositFrequency.trend} height={50}>
              <SparklinesLine color="#D97706" />
            </Sparklines>
          </Card.Body>
        </Card>

        {/* Time Between Collections */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Délai entre collectes</h3>
                  <p className="text-2xl font-semibold">{kpiData.timeBetweenCollections.current}h</p>
                </div>
              </div>
              <div className="flex items-center">
                {!kpiData.timeBetweenCollections.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm ${!kpiData.timeBetweenCollections.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {Math.abs(calculateVariation(kpiData.timeBetweenCollections.current, kpiData.timeBetweenCollections.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.timeBetweenCollections.trend} height={50}>
              <SparklinesLine color="#4F46E5" />
            </Sparklines>
          </Card.Body>
        </Card>
      </div>

      {/* Additional KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Alerts Sent */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Alertes envoyées</h3>
                  <p className="text-2xl font-semibold">{kpiData.alertsSent.current}</p>
                </div>
              </div>
              <div className="flex items-center">
                {!kpiData.alertsSent.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm ${!kpiData.alertsSent.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {Math.abs(calculateVariation(kpiData.alertsSent.current, kpiData.alertsSent.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.alertsSent.trend} height={50}>
              <SparklinesBars color="#EA580C" />
            </Sparklines>
          </Card.Body>
        </Card>

        {/* Active Collectors */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-teal-100 rounded-lg mr-3">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Collecteurs actifs</h3>
                  <p className="text-2xl font-semibold">{kpiData.activeCollectors.current}</p>
                </div>
              </div>
              <div className="flex items-center">
                {kpiData.activeCollectors.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${kpiData.activeCollectors.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(calculateVariation(kpiData.activeCollectors.current, kpiData.activeCollectors.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.activeCollectors.trend} height={50}>
              <SparklinesLine color="#0D9488" />
            </Sparklines>
          </Card.Body>
        </Card>

        {/* Sync Rate */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-cyan-100 rounded-lg mr-3">
                  <Zap className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Taux de synchronisation</h3>
                  <p className="text-2xl font-semibold">{kpiData.syncRate.current}%</p>
                </div>
              </div>
              <div className="flex items-center">
                {kpiData.syncRate.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${kpiData.syncRate.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(calculateVariation(kpiData.syncRate.current, kpiData.syncRate.previous)).toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparklines data={kpiData.syncRate.trend} height={50}>
              <SparklinesLine color="#0891B2" />
            </Sparklines>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default KPIDashboard;