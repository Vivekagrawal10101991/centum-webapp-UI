import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';
import { TeacherDashboard as FacultyDashboard } from '../dashboard/teacher';
// REQUIRED IMPORT: Bringing in the new schedule page
import FacultySchedule from '../dashboard/teacher/pages/FacultySchedule';

/**
 * Faculty Dashboard Routes
 * All routes for faculty functionality
 */
export const facultyRoutes = ( 
  <>
    <Route
      path="/dashboard/faculty" 
      element={
        <ProtectedRoute allowedRoles={[ROLES.FACULTY]}> 
          <DashboardLayout>
            <FacultyDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    
    {/* THE MISSING ROUTE: This connects the URL to your new UI component */}
    <Route
      path="/dashboard/faculty/schedule" 
      element={
        <ProtectedRoute allowedRoles={[ROLES.FACULTY]}> 
          <DashboardLayout>
            <FacultySchedule />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/dashboard/faculty/courses" 
      element={
        <ProtectedRoute allowedRoles={[ROLES.FACULTY]}> 
          <DashboardLayout>
            <div className="text-2xl font-bold">My Courses (Coming Soon)</div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);