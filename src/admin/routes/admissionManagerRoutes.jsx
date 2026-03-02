import React from 'react';
import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import PermissionProtectedRoute from '../components/common/PermissionProtectedRoute';
import { ROLES } from '../../utils/roles';

// Lazy load the Admission Manager pages
const AdmissionManagerDashboard = React.lazy(() => import('../dashboard/admission-manager/pages/AdmissionManagerDashboard'));
const StudentManagement = React.lazy(() => import('../dashboard/admission-manager/pages/StudentManagement'));

export const admissionManagerRoutes = (
  <Route
    path="/dashboard/admission-manager"
    element={
      <PermissionProtectedRoute requiredRole={ROLES.ADMISSION_MANAGER}>
        <DashboardLayout />
      </PermissionProtectedRoute>
    }
  >
    {/* Default Overview Dashboard */}
    <Route index element={<AdmissionManagerDashboard />} />
    
    {/* NEW: Student Management Route */}
    <Route path="student-management" element={<StudentManagement />} />
  </Route>
);