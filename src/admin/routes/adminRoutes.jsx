import { Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import PermissionProtectedRoute from '../../components/common/PermissionProtectedRoute';
import { ROLES } from '../../utils/roles';
import { PERMISSIONS } from '../helpers/rolePermissions';

// Super Admin Components
import UserManagement from '../dashboard/super-admin/pages/UserManagement';
import { AddUser, GetUser, DeleteUser } from '../Tabs/UserManagement';
import Dashboard from '../Tabs/Dashboard';
import PromotionsBanners from '../Tabs/PromotionsBanners';
import AcademicsResults from '../Tabs/AcademicsResults';
import CourseManagement from '../Tabs/CourseManagement';
import SocialProof from '../Tabs/SocialProof';
import MediaCenter from '../Tabs/MediaCenter';
import LeadsEnquiries from '../Tabs/LeadsEnquiries';
import Settings from '../Tabs/Settings';
import LmsManagement from '../Tabs/LmsManagement';

// Admin Components
import { AdminDashboard, UsersPage } from '../dashboard/admin';

// Technical Components
import { TechnicalDashboard } from '../dashboard/technical';

// Teacher Components
import { TeacherDashboard } from '../dashboard/teacher';

// Student Components
import { StudentDashboard } from '../dashboard/student';

// Parent Components
import { ParentDashboard } from '../dashboard/parent';

/**
 * Admin Routes Component
 * All admin dashboard routes with role-based protection
 */
export const AdminRoutes = () => {
  return (
    <>
      {/* ================= SUPER ADMIN ROUTES ================= */}
      
      {/* Root Landing Redirect */}
      <Route
        path="/dashboard/super-admin"
        element={<Navigate to="/dashboard/super-admin/dashboard" replace />}
      />

      {/* Analytical Dashboard (Overview) */}
      <Route
        path="/dashboard/super-admin/dashboard"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.SUPER_ADMIN]} 
            requiredPermissions={[PERMISSIONS.VIEW_REPORTS, PERMISSIONS.SYSTEM_ADMIN]}
            routePath="/dashboard/super-admin/dashboard"
          >
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />

      {/* User Management Hub */}
      <Route
        path="/dashboard/super-admin/user-management"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <UserManagement />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Individual User Pages */}
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
      
      {/* CMS Management Routes */}
      <Route
        path="/dashboard/super-admin/promotions-banners"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.SUPER_ADMIN]} 
            requiredPermissions={[PERMISSIONS.MANAGE_BANNERS, PERMISSIONS.MANAGE_CMS, PERMISSIONS.SYSTEM_ADMIN]}
            routePath="/dashboard/super-admin/promotions-banners"
          >
            <DashboardLayout>
              <PromotionsBanners />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/academics-results"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.SUPER_ADMIN]} 
            requiredPermissions={[PERMISSIONS.VIEW_ACADEMIC, PERMISSIONS.MANAGE_ACADEMIC, PERMISSIONS.SYSTEM_ADMIN]}
            routePath="/dashboard/super-admin/academics-results"
          >
            <DashboardLayout>
              <AcademicsResults />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/course-management"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.SUPER_ADMIN]} 
            requiredPermissions={[PERMISSIONS.VIEW_COURSES, PERMISSIONS.MANAGE_CMS, PERMISSIONS.SYSTEM_ADMIN]}
            routePath="/dashboard/super-admin/course-management"
          >
            <DashboardLayout>
              <CourseManagement />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />

      {/* LMS Center Route */}
      <Route
        path="/dashboard/super-admin/lms-center"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.TECHNICAL_HEAD]}>
            <DashboardLayout>
              <LmsManagement />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/super-admin/social-proof"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.SUPER_ADMIN]} 
            requiredPermissions={[PERMISSIONS.VIEW_SOCIAL, PERMISSIONS.MANAGE_SOCIAL, PERMISSIONS.SYSTEM_ADMIN]}
            routePath="/dashboard/super-admin/social-proof"
          >
            <DashboardLayout>
              <SocialProof />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/media-center"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.SUPER_ADMIN]} 
            requiredPermissions={[PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS, PERMISSIONS.MANAGE_CMS, PERMISSIONS.SYSTEM_ADMIN]}
            routePath="/dashboard/super-admin/media-center"
          >
            <DashboardLayout>
              <MediaCenter />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/super-admin/leads-enquiries"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.SUPER_ADMIN]} 
            requiredPermissions={[PERMISSIONS.ENQUIRE_LIST, PERMISSIONS.SYSTEM_ADMIN]}
            routePath="/dashboard/super-admin/leads-enquiries"
          >
            <DashboardLayout>
              <LeadsEnquiries />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
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

      {/* ================= ADMIN ROUTES ================= */}
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
      <Route
        path="/dashboard/admin/media-center"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.ADMIN]} 
            requiredPermissions={[PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS]}
            routePath="/dashboard/admin/media-center"
          >
            <DashboardLayout>
              <MediaCenter />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= TECHNICAL HEAD ROUTES ================= */}
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
        path="/dashboard/technical/media-center"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.TECHNICAL_HEAD]} 
            requiredPermissions={[PERMISSIONS.VIEW_BLOGS, PERMISSIONS.VIEW_VIDEOS]}
            routePath="/dashboard/technical/media-center"
          >
            <DashboardLayout>
              <MediaCenter />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/technical/course-management"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.TECHNICAL_HEAD]} 
            requiredPermissions={[PERMISSIONS.VIEW_COURSES]}
            routePath="/dashboard/technical/course-management"
          >
            <DashboardLayout>
              <CourseManagement />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/technical/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TECHNICAL_HEAD]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= TEACHER ROUTES ================= */}
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
        path="/dashboard/teacher/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= STUDENT ROUTES ================= */}
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
              <StudentDashboard section="courses" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/student/assignments"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <DashboardLayout>
              <StudentDashboard section="assignments" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/student/schedule"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <DashboardLayout>
              <StudentDashboard section="schedule" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/student/grades"
        element={<Navigate to="/dashboard/student" replace />}
      />
      <Route
        path="/dashboard/student/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= PARENT ROUTES ================= */}
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
      <Route
        path="/dashboard/parent/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard/parent/*" element={<Navigate to="/dashboard/parent" replace />} />
    </>
  );
};