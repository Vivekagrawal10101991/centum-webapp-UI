import { Navigate } from 'react-router-dom';
// Corrected import paths below (removed the extra 'admin/')
import { useAuth } from '../../context/AuthContext';
import { canAccessRoute } from '../../helpers/navigationPermissions';
import { ROLE_PERMISSIONS } from '../../helpers/permissions';

/**
 * PermissionProtectedRoute Component
 * Restricts access based on authentication, user roles, and permissions
 * @param {React.ReactNode} children - Protected content
 * @param {Array<string>} allowedRoles - Array of roles that can access this route
 * @param {Array<string>} requiredPermissions - Array of permissions (user needs at least one)
 * @param {string} routePath - Route path to check against navigation permissions
 * @param {string} redirectTo - Route to redirect unauthorized users
 */
const PermissionProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requiredPermissions = [],
  routePath = null,
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
      // Super admin has access to everything
      if (userRole !== 'SUPER_ADMIN') {
        return <Navigate to="/unauthorized" replace />;
      }
    }
  }

  // Check permission-based access if permissions are specified
  if (requiredPermissions.length > 0) {
    // Merge database permissions with frontend hardcoded permissions
    const backendPermissions = user?.permissions || [];
    const frontendPermissions = ROLE_PERMISSIONS[user?.role] || [];
    
    // Combine them into a single array to ensure no access gets blocked incorrectly
    const userPermissions = [...new Set([...backendPermissions, ...frontendPermissions])];
    
    // Super admin has all permissions
    if (user?.role !== 'SUPER_ADMIN') {
      const hasPermission = requiredPermissions.some(permission => 
        userPermissions.includes(permission)
      );
      
      if (!hasPermission) {
        return <Navigate to="/unauthorized" replace />;
      }
    }
  }

  // Check using navigation permissions helper if route path is provided
  if (routePath && !canAccessRoute(routePath, user)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required role/permissions
  return children;
};

export default PermissionProtectedRoute;