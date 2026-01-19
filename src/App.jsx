import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider as AdminAuthProvider } from './admin/context/AuthContext';
import { AuthProvider as SiteAuthProvider } from './site/context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleBasedRedirect from './components/common/RoleBasedRedirect';

// Route Wrappers
import { SiteRoutes } from './site/routes';
import { AdminRoutes } from './admin/routes';

/**
 * Main App Component
 * Sets up routing with role-based access control
 * Provides both Site and Admin auth contexts
 */
function App() {
  return (
    <SiteAuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* Site Routes - All public-facing pages */}
            {SiteRoutes()}

            {/* Dashboard Redirect - Redirects to role-specific dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RoleBasedRedirect />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - All protected dashboard routes */}
            {AdminRoutes()}
          </Routes>

          {/* Toast Notifications */}
          <Toaster />
        </Router>
      </AdminAuthProvider>
    </SiteAuthProvider>
  );
}

export default App;
