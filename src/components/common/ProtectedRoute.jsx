import { Navigate } from 'react-router-dom';
import { useAuth } from '../../admin/context/AuthContext';

/**
 * ProtectedRoute Component
 * Restricts access based on authentication and user roles
 * 
 * @param {React.ReactNode} children - Protected content
 * @param {Array<string>} allowedRoles - Array of roles that can access this route
 * @param {string} redirectTo - Route to redirect unauthorized users
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0) {
    const userRole = user?.role;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      // User doesn't have required role - redirect to their dashboard or unauthorized page
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has required role
  return children;
};

export default ProtectedRoute;
