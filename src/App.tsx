import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/client/ClientsPage';
import CollectorsPage from './pages/CollectorsPage';
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
import LicencePage from './pages/Licences/LicencePage';
import UserLicencePage from './pages/UserLicencePage';
import SettingsUpdaInf from './pages/SettingsUpdaInf';
import CollectorDetailsPage from './pages/client/CollectorDetailsPage';
import UpdateClientPage from './pages/client/UpdateClientPage';
import Messages from './pages/Messages/Messages';
import NewTenantLicense from './components/forms/NewTenantLicense';

export default function App() {
  initCryptoKeys().catch(console.error);
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
            <Route path="/" element={<Navigate to="/clients" />} />
            {/* <Route path="dashboard" element={<DashboardPage />} /> */}
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:id" element={<ClientDetailsModal />} />
            <Route path="clients/update/:id" element={<UpdateClientPage />} />
            <Route path="clients/update/licence/:id" element={<NewTenantLicense />} />
            <Route path="collectors" element={<CollectorsPage />} />
            <Route path="collectors/:id" element={<CollectorDetailsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="accounts" element={<LicencePage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/update" element={<SettingsUpdaInf />} />
            <Route path="messages" element={<Messages />} />
            <Route path="new-microfinance" element={<NewMicrofinance />} />
            <Route path="licence-microfinance" element={<UserLicencePage />} />
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
