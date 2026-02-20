import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import { TeacherDashboard as FacultyDashboard } from '../dashboard/teacher';

/**
 * Faculty Dashboard Routes
 * All routes for faculty functionality
 */
export const facultyRoutes = ( // Renamed
  <>
    <Route
      path="/dashboard/faculty" // Updated path
      element={
        <ProtectedRoute allowedRoles={[ROLES.FACULTY]}> // Updated role
          <DashboardLayout>
            <FacultyDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/faculty/courses" // Updated path
      element={
        <ProtectedRoute allowedRoles={[ROLES.FACULTY]}> // Updated role
          <DashboardLayout>
            <div className="text-2xl font-bold">My Courses (Coming Soon)</div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);