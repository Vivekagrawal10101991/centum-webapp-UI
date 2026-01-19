import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleBasedRedirect from './components/common/RoleBasedRedirect';
import { ROLES } from './utils/roles';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';
import Contributions from './pages/Contributions';
import Achievers from './pages/Achievers';
import StudentSuccess from './pages/StudentSuccess';
import Blogs from './pages/Blogs';
import Videos from './pages/Videos';
import ChangePassword from './pages/ChangePassword';

// Super Admin Dashboard
import SuperAdminDashboard from './pages/dashboard/super-admin/SuperAdminDashboard';
import AddUserPage from './pages/dashboard/super-admin/AddUserPage';
import GetUsersPage from './pages/dashboard/super-admin/GetUsersPage';
import DeleteUserPage from './pages/dashboard/super-admin/DeleteUserPage';

// Admin Dashboard
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import UsersPage from './pages/dashboard/admin/UsersPage';

// Technical Head Dashboard
import TechnicalDashboard from './pages/dashboard/technical/TechnicalDashboard';

// Teacher Dashboard
import TeacherDashboard from './pages/dashboard/teacher/TeacherDashboard';

// Student Dashboard
import StudentDashboard from './pages/dashboard/student/StudentDashboard';

// Parent Dashboard
import ParentDashboard from './pages/dashboard/parent/ParentDashboard';

/**
 * Main App Component
 * Sets up routing with role-based access control
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <Courses />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/contributions"
            element={
              <Layout>
                <Contributions />
              </Layout>
            }
          />
          <Route
            path="/achievers"
            element={
              <Layout>
                <Achievers />
              </Layout>
            }
          />
          <Route
            path="/student-success"
            element={
              <Layout>
                <StudentSuccess />
              </Layout>
            }
          />
          <Route
            path="/blogs"
            element={
              <Layout>
                <Blogs />
              </Layout>
            }
          />
          <Route
            path="/videos"
            element={
              <Layout>
                <Videos />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/unauthorized"
            element={
              <Layout>
                <Unauthorized />
              </Layout>
            }
          />

          {/* Dashboard Redirect - Redirects to role-specific dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleBasedRedirect />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Dashboard Routes */}
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
                  <AddUserPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/super-admin/get-users"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                <DashboardLayout>
                  <GetUsersPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/super-admin/delete-user"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                <DashboardLayout>
                  <DeleteUserPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Routes */}
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
            path="/dashboard/admin/courses"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <DashboardLayout>
                  <div className="text-2xl font-bold">Courses Management (Coming Soon)</div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/content"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <DashboardLayout>
                  <div className="text-2xl font-bold">Content Management (Coming Soon)</div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/announcements"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <DashboardLayout>
                  <div className="text-2xl font-bold">Announcements (Coming Soon)</div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/testimonials"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <DashboardLayout>
                  <div className="text-2xl font-bold">Testimonials (Coming Soon)</div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <DashboardLayout>
                  <div className="text-2xl font-bold">Analytics (Coming Soon)</div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/settings"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <DashboardLayout>
                  <div className="text-2xl font-bold">Settings (Coming Soon)</div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Technical Head Dashboard Routes */}
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

          {/* Teacher Dashboard Routes */}
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

          {/* Student Dashboard Routes */}
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

          {/* Parent Dashboard Routes */}
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
        </Routes>

        {/* Toast Notifications */}
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
