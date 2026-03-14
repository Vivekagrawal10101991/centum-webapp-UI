import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import { SuperAdminDashboard } from '../dashboard/super-admin';
import { AddUser, GetUser, DeleteUser } from '../Tabs/UserManagement';
import LeaveApprovals from '../Tabs/LeaveApprovals';
import LibraryContentManagement from '../Tabs/LibraryContentManagement'; 
import Settings from '../Tabs/Settings'; // <-- IMPORT SETTINGS HERE

/**
 * Super Admin Dashboard Routes
 * All routes for super admin functionality
 */
export const superAdminRoutes = (
  <>
    <Route
      path="/dashboard/super-admin"
      element={
        <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
          <DashboardLayout>
            <SuperAdminDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/super-admin/add-user"
      element={
        <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
          <DashboardLayout>
            <AddUser />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/super-admin/get-users"
      element={
        <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
          <DashboardLayout>
            <GetUser />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/super-admin/delete-user"
      element={
        <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
          <DashboardLayout>
            <DeleteUser />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/super-admin/leave-approvals"
      element={
        <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
          <DashboardLayout>
            <LeaveApprovals />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/super-admin/library-content"
      element={
        <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
          <DashboardLayout>
            <LibraryContentManagement />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    {/* ✅ ADDED SETTINGS ROUTE FOR FIRST LOGIN PASSWORD CHANGE */}
    <Route
      path="/dashboard/super-admin/settings"
      element={
        <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);