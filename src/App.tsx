import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import CollectorsPage from './pages/CollectorsPage';
import CollectorDetailsPage from './pages/CollectorDetailsPage';
import TransactionsPage from './pages/TransactionsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import SettingsPage from './pages/SettingsPage';
import 'react-toastify/dist/ReactToastify.css';
import "./i18n";
import { initCryptoKeys } from './utils/feature/key';
import LoginPage from './pages/LoginPage';
import VerifyOtp from './pages/VerifyOtp';
import PivateRoute from './components/layout/PivateRoute';
import Layout from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import ClientDetailsModal from './components/clients/ClientDetailsModal';
import NewMicrofinance from './pages/NewMicrofinance';
import LicencePage from './pages/LicencePage';

export default function App() {
  initCryptoKeys().catch(console.error);
  console.log(";;;;;;;;;;;")
  return (
    <BrowserRouter>
      <Routes>
        {/* routes publiques */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* routes privées */}
        <Route element={<PivateRoute />}>
          {/* Layout englobe Sidebar/Header */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:id" element={<ClientDetailsModal />} />
            <Route path="collectors" element={<CollectorsPage />} />
            <Route path="collectors/:id" element={<CollectorDetailsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="accounts" element={<LicencePage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="new-microfinance" element={<NewMicrofinance />} />
            <Route path="*" element={<div>404 - Page non trouvée</div>} />
          </Route>
        </Route>

        {/* tout le reste → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}
