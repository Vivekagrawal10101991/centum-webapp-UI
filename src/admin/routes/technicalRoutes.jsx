import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import { TechnicalDashboard } from '../dashboard/technical';

/**
 * Technical Head Dashboard Routes
 * All routes for technical head functionality
 */
export const technicalRoutes = (
  <>
    <Route
      path="/dashboard/technical"
      element={
        <ProtectedRoute allowedRoles={[ROLES.TECHNICAL_HEAD]}>
          <DashboardLayout>
            <TechnicalDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/technical/content"
      element={
        <ProtectedRoute allowedRoles={[ROLES.TECHNICAL_HEAD]}>
          <DashboardLayout>
            <div className="text-2xl font-bold">Content Management (Coming Soon)</div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/technical/courses"
      element={
        <ProtectedRoute allowedRoles={[ROLES.TECHNICAL_HEAD]}>
          <DashboardLayout>
            <div className="text-2xl font-bold">Courses (Coming Soon)</div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);
