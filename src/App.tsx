import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Staff from './pages/Staff';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import AdminNotifications from './pages/AdminNotifications';
import AdminBanners from './pages/AdminBanners';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminSalons from './pages/AdminSalons';
import LandingPage from './pages/LandingPage';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const isAdmin = () => {
  const role = localStorage.getItem('role');
  return role === 'admin';
};

interface PrivateRouteProps {
  children: React.ReactNode;
  adminRequired?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminRequired = false }) => {
  if (!isAuthenticated()) {
    return <Navigate to={adminRequired ? "/admin/login" : "/login"} replace />;
  }

  if (adminRequired && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/staff"
          element={
            <PrivateRoute>
              <Staff />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/packages"
          element={
            <PrivateRoute>
              <Packages />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/salons"
          element={
            <PrivateRoute adminRequired>
              <AdminSalons />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <PrivateRoute adminRequired>
              <AdminSettings />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <PrivateRoute adminRequired>
              <AdminNotifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/banners"
          element={
            <PrivateRoute adminRequired>
              <AdminBanners />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;