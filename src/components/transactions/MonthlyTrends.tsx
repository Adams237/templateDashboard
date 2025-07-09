import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { TrendingUp, Users, Target, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../data/mockClients';

// Mock data for monthly trends
const monthlyData = [
  { month: 'Jan', collected: 12500000, objective: 15000000, transactions: 450 },
  { month: 'Fév', collected: 13800000, objective: 15000000, transactions: 480 },
  { month: 'Mar', collected: 15200000, objective: 15000000, transactions: 510 },
  { month: 'Avr', collected: 14700000, objective: 15000000, transactions: 495 },
  { month: 'Mai', collected: 16500000, objective: 16000000, transactions: 540 },
  { month: 'Juin', collected: 17800000, objective: 16000000, transactions: 580 },
  { month: 'Juil', collected: 16900000, objective: 16000000, transactions: 560 },
  { month: 'Aoû', collected: 18200000, objective: 17000000, transactions: 595 },
  { month: 'Sep', collected: 19500000, objective: 17000000, transactions: 620 },
  { month: 'Oct', collected: 20100000, objective: 18000000, transactions: 645 },
  { month: 'Nov', collected: 21500000, objective: 18000000, transactions: 670 },
  { month: 'Déc', collected: 23000000, objective: 20000000, transactions: 700 }
];

const years = ['2025', '2024', '2023'];
const months = [
  { value: 'all', label: 'Tous les mois' },
  { value: '01', label: 'Janvier' },
  { value: '02', label: 'Février' },
  { value: '03', label: 'Mars' },
  { value: '04', label: 'Avril' },
  { value: '05', label: 'Mai' },
  { value: '06', label: 'Juin' },
  { value: '07', label: 'Juillet' },
  { value: '08', label: 'Août' },
  { value: '09', label: 'Septembre' },
  { value: '10', label: 'Octobre' },
  { value: '11', label: 'Novembre' },
  { value: '12', label: 'Décembre' }
];

const MonthlyTrends = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedCollector, setSelectedCollector] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('all');

  // Calculate key metrics
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const monthlyGrowth = ((currentMonth.collected - previousMonth.collected) / previousMonth.collected) * 100;
  const objectiveAchievement = (currentMonth.collected / currentMonth.objective) * 100;
  const averageDaily = currentMonth.collected / 30; // Assuming 30 days per month

  // Filter data based on selected year and month
  const filteredData = monthlyData.filter(data => {
    if (selectedMonth === 'all') {
      return true;
    }
    const monthIndex = months.findIndex(m => m.value === selectedMonth) - 1;
    return monthIndex >= 0 && data.month === months[monthIndex + 1].label.substring(0, 3);
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <select
            className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>Année {year}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <select
            className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>

        <select
          className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          <option value="all">Toutes les zones</option>
          <option value="medina">Médina</option>
          <option value="plateau">Plateau</option>
          <option value="point-e">Point E</option>
        </select>

        <select
          className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedCollector}
          onChange={(e) => setSelectedCollector(e.target.value)}
        >
          <option value="all">Tous les collecteurs</option>
          <option value="col1">Jean Dupont</option>
          <option value="col2">Marie Lambert</option>
          <option value="col3">Amadou Diallo</option>
        </select>

        <select
          className="rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">Tous les types</option>
          <option value="deposit">Dépôts</option>
          <option value="withdrawal">Retraits</option>
          <option value="transfer">Transferts</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Montant total (Déc)</p>
                <p className="text-2xl font-semibold">{formatCurrency(currentMonth.collected)}</p>
                <div className="mt-1 flex items-center">
                  {monthlyGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlyGrowth.toFixed(1)}% vs Nov
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Nombre de transactions</p>
                <p className="text-2xl font-semibold">{currentMonth.transactions}</p>
                <div className="mt-1">
                  <span className="text-sm text-gray-500">
                    Moy. {Math.round(currentMonth.transactions / 30)}/jour
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users size={24} className="text-green-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Moyenne journalière</p>
                <p className="text-2xl font-semibold">{formatCurrency(averageDaily)}</p>
                <div className="mt-1">
                  <span className="text-sm text-gray-500">
                    {Math.round(currentMonth.transactions / 30)} transactions/jour
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Objectif mensuel</p>
                <p className="text-2xl font-semibold">{objectiveAchievement.toFixed(1)}%</p>
                <div className="mt-1">
                  <Badge variant={objectiveAchievement >= 100 ? 'success' : 'warning'}>
                    {objectiveAchievement >= 100 ? 'Atteint' : 'En cours'}
                  </Badge>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Target size={24} className="text-yellow-600" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <Card.Body>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution mensuelle des collectes</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Mois: ${label}`}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="collected"
                  name="Montant collecté"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="objective"
                  name="Objectif"
                  stroke="#EA580C"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="transactions"
                  name="Transactions"
                  stroke="#059669"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      {/* Monthly Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Comparaison mensuelle</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Décembre 2025</p>
                  <p className="font-medium">{formatCurrency(currentMonth.collected)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Novembre 2025</p>
                  <p className="font-medium">{formatCurrency(previousMonth.collected)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Variation</p>
                  <p className={`font-medium ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${monthlyGrowth >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(monthlyGrowth), 100)}%` }}
                />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Progression vers l'objectif</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Réalisé</p>
                  <p className="font-medium">{formatCurrency(currentMonth.collected)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Objectif</p>
                  <p className="font-medium">{formatCurrency(currentMonth.objective)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Taux</p>
                  <p className={`font-medium ${objectiveAchievement >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {objectiveAchievement.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    objectiveAchievement >= 100 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min(objectiveAchievement, 100)}%` }}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyTrends;