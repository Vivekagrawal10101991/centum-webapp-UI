import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import { StudentDashboard } from '../dashboard/student';

/**
 * Student Dashboard Routes
 * All routes for student functionality
 */
export const studentRoutes = (
  <>
    <Route
      path="/dashboard/student"
      element={
        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/student/courses"
      element={
        <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
          <DashboardLayout>
            <div className="text-2xl font-bold">My Courses (Coming Soon)</div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);
