import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public/User Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import EcommerceUserPage from '../features/ecommerce/EcommerceUserPage';
import TurfUserPage from '../features/turf/TurfUserPage';

// Admin Pages
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
import AcademyPage from '../features/academy/AcademyPage';
import EcommerceAdminPage from '../features/ecommerce/EcommerceAdminPage';
import TurfAdminPage from '../features/turf/TurfAdminPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* User / Storefront / Bookings Portal */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="ecommerce" element={<EcommerceUserPage />} />
        <Route path="turf" element={<TurfUserPage />} />
      </Route>

      {/* Standalone Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Super Admin Dashboard Portal */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Redirect /admin directly to /admin/dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="ecommerce" element={<EcommerceAdminPage />} />
        <Route path="turf" element={<TurfAdminPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
