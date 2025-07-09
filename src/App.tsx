import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import CollectorsPage from './pages/CollectorsPage';
import CollectorDetailsPage from './pages/CollectorDetailsPage';
import TransactionsPage from './pages/TransactionsPage';
import AccountsPage from './pages/AccountsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 ml-64">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/collectors" element={<CollectorsPage />} />
            <Route path="/collectors/:id" element={<CollectorDetailsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<div>404 - Page non trouvée</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
