import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Layout } from "./components/layout/Layout"
import { DashboardPage } from "./pages/DashboardPage"
import { initCryptoKeys } from "./utils/features/key";
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/auth/LoginPage';
import VerifyOtp from './pages/auth/VerifyOtp';
import PivateRoute from './components/layout/PivateRoute';
import "./i18n";

function App() {
  initCryptoKeys().catch(console.error);
  return (
    <BrowserRouter>
      <Routes>
        {/* routes publiques */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* routes privées */}
        <Route element={<PivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
