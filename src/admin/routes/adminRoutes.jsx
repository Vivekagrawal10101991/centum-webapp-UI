import { Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { ROLES } from '../../utils/roles';

// Super Admin
import { SuperAdminDashboard } from '../dashboard/super-admin';
import { AddUser, GetUser, DeleteUser } from '../Tabs/UserManagement';
import Dashboard from '../Tabs/Dashboard';
import PromotionsBanners from '../Tabs/PromotionsBanners';
import AcademicsResults from '../Tabs/AcademicsResults';
import CourseManagement from '../Tabs/CourseManagement';
import SocialProof from '../Tabs/SocialProof';
import MediaCenter from '../Tabs/MediaCenter';
import LeadsEnquiries from '../Tabs/LeadsEnquiries';

// Admin
import {
  AdminDashboard,
  UsersPage,
} from '../dashboard/admin';

// Technical
import { TechnicalDashboard } from '../dashboard/technical';

// Teacher
import { TeacherDashboard } from '../dashboard/teacher';

// Student
import { StudentDashboard } from '../dashboard/student';

// Parent
import { ParentDashboard } from '../dashboard/parent';

/**
 * Admin Routes Component
 * All admin dashboard routes with role-based protection
 */
export const AdminRoutes = () => {
  return (
    <>
      {/* Super Admin Routes */}
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
        path="/dashboard/super-admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/promotions-banners"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <PromotionsBanners />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/academics-results"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <AcademicsResults />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/course-management"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <CourseManagement />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/social-proof"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <SocialProof />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/media-center"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <MediaCenter />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/leads-enquiries"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <LeadsEnquiries />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Technical Routes */}
      <Route
        path="/dashboard/technical"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TECHNICAL_ADMIN]}>
            <DashboardLayout>
              <TechnicalDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Teacher Routes */}
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

      {/* Student Routes */}
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

      {/* Parent Routes */}
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
};
