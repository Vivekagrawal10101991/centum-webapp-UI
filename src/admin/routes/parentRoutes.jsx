import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import { ParentDashboard } from '../dashboard/parent';

/**
 * Parent Dashboard Routes
 * All routes for parent functionality
 */
export const parentRoutes = (
  <>
    <Route
      path="/dashboard/parent"
      element={
        <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
          <DashboardLayout>
            <ParentDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);
