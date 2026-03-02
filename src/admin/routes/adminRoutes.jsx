import { Route, Navigate } from 'react-router-dom';
import { Inbox } from 'lucide-react';
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
import LeaveApprovals from '../Tabs/LeaveApprovals'; 
import BatchManagement from '../Tabs/BatchManagement'; // <-- ADDED: Batch Management Import

// Admin Components
import { AdminDashboard, UsersPage } from '../dashboard/admin';

// Technical Components
import { TechnicalDashboard } from '../dashboard/technical';

// Faculty Components
import { TeacherDashboard as FacultyDashboard } from '../dashboard/teacher';

// Student Components
import { StudentDashboard } from '../dashboard/student';

// Parent Components
import { ParentDashboard } from '../dashboard/parent';

// HR Components
import HRDashboard from '../dashboard/hr/pages/HRDashboard';

// Operations Components
import OperationsDashboard from '../dashboard/operations/pages/OperationsDashboard';

// Reporting Manager Component
import ReportingManagerDashboard from '../dashboard/reporting-manager/pages/ReportingManagerDashboard';

// Admission Manager Components
import AdmissionManagerDashboard from '../dashboard/admission-manager/pages/AdmissionManagerDashboard';
import StudentManagement from '../dashboard/admission-manager/pages/StudentManagement'; // <-- ADDED: Student Management Import

// Common Components
import LeaveApplicationWidget from '../components/common/LeaveApplicationWidget';

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

      {/* NEW: Batch Management Hub */}
      <Route
        path="/dashboard/super-admin/batch-management"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <DashboardLayout>
              <BatchManagement />
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

      {/* Leave Approvals for Super Admin */}
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
        path="/dashboard/admin/leave-approvals" 
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout>
              <LeaveApprovals />
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
        path="/dashboard/technical/promotions-banners"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.TECHNICAL_HEAD]} 
            requiredPermissions={[PERMISSIONS.MANAGE_BANNERS, PERMISSIONS.MANAGE_CMS]}
            routePath="/dashboard/technical/promotions-banners"
          >
            <DashboardLayout>
              <PromotionsBanners />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/technical/academics-results"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.TECHNICAL_HEAD]} 
            requiredPermissions={[PERMISSIONS.VIEW_ACADEMIC, PERMISSIONS.MANAGE_ACADEMIC]}
            routePath="/dashboard/technical/academics-results"
          >
            <DashboardLayout>
              <AcademicsResults />
            </DashboardLayout>
          </PermissionProtectedRoute>
        }
      />
      <Route
        path="/dashboard/technical/social-proof"
        element={
          <PermissionProtectedRoute 
            allowedRoles={[ROLES.TECHNICAL_HEAD]} 
            requiredPermissions={[PERMISSIONS.VIEW_SOCIAL, PERMISSIONS.MANAGE_SOCIAL]}
            routePath="/dashboard/technical/social-proof"
          >
            <DashboardLayout>
              <SocialProof />
            </DashboardLayout>
          </PermissionProtectedRoute>
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

      {/* ================= OPERATIONS ROUTES ================= */}
      <Route
        path="/dashboard/operations"
        element={
          <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
            <DashboardLayout>
              <OperationsDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/dashboard/operations/leave-approvals" 
        element={
          <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
            <DashboardLayout>
              <LeaveApprovals />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route
        path="/dashboard/operations/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/operations/logistics"
        element={
          <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
            <DashboardLayout>
              <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                  <Inbox className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">No Data</h2>
                <p className="text-slate-500 text-center max-w-md">Logistics module is currently empty.</p>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/operations/schedule"
        element={
          <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
            <DashboardLayout>
              <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                  <Inbox className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">No Schedules</h2>
                <p className="text-slate-500 text-center max-w-md">There are no active schedules to display.</p>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= HR ROUTES ================= */}
      <Route
        path="/dashboard/hr"
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <DashboardLayout>
              <HRDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hr/employees"
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <DashboardLayout>
              <div className="p-8"><h2>Employee Directory (Coming Soon)</h2></div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hr/attendance"
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <DashboardLayout>
              <div className="p-8"><h2>Attendance Management (Coming Soon)</h2></div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hr/leaves"
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <DashboardLayout>
              <HRDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/hr/leave-approvals" 
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <DashboardLayout>
              <LeaveApprovals />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route
        path="/dashboard/hr/recruitment"
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <DashboardLayout>
              <HRDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hr/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= FACULTY ROUTES ================= */}
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
      <Route
        path="/dashboard/faculty/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
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
      
      {/* ================= COORDINATOR ROUTES ================= */}
      <Route
        path="/dashboard/coordinator"
        element={
          <ProtectedRoute allowedRoles={[ROLES.COORDINATOR]}>
            <DashboardLayout>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 animate-fade-in">
                <div className="lg:col-span-2 w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                    <Inbox className="w-10 h-10 text-slate-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Coordinator Dashboard</h2>
                  <p className="text-slate-500 text-center max-w-md">Welcome to the coordinator panel. Features are coming soon.</p>
                </div>
                <div className="space-y-6">
                  <LeaveApplicationWidget />
                </div>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/coordinator/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.COORDINATOR]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= REPORTING MANAGER ROUTES ================= */}
      <Route
        path="/dashboard/reporting-manager"
        element={
          <ProtectedRoute allowedRoles={[ROLES.REPORTING_MANAGER]}>
            <DashboardLayout>
              <ReportingManagerDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reporting-manager/leave-approvals"
        element={
          <ProtectedRoute allowedRoles={[ROLES.REPORTING_MANAGER]}>
            <DashboardLayout>
              <LeaveApprovals />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reporting-manager/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.REPORTING_MANAGER]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= ADMISSION MANAGER ROUTES ================= */}
      <Route
        path="/dashboard/admission-manager"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMISSION_MANAGER]}>
            <DashboardLayout>
              <AdmissionManagerDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admission-manager/leads"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMISSION_MANAGER]}>
            <DashboardLayout>
              <LeadsEnquiries />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      
      {/* NEW: Student Management Route */}
      <Route
        path="/dashboard/admission-manager/student-management"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMISSION_MANAGER]}>
            <DashboardLayout>
              <StudentManagement />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/dashboard/admission-manager/settings"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMISSION_MANAGER]}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </>
  );
};