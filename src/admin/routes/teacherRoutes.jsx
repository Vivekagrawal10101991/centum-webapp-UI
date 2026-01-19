import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import { TeacherDashboard } from '../dashboard/teacher';

/**
 * Teacher Dashboard Routes
 * All routes for teacher functionality
 */
export const teacherRoutes = (
  <>
    <Route
      path="/dashboard/teacher"
      element={
        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
          <DashboardLayout>
            <TeacherDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/teacher/courses"
      element={
        <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
          <DashboardLayout>
            <div className="text-2xl font-bold">My Courses (Coming Soon)</div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);
