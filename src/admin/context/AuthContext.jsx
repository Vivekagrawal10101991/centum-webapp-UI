import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getDashboardRoute } from '../../utils/roles';

const AuthContext = createContext(null);

/**
 * Admin AuthProvider Component
 * Manages admin authentication state with role-based access
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('adminToken');
        const userData = authService.getCurrentUser();
        
        console.log('Admin AuthProvider init - token:', token);
        console.log('Admin AuthProvider init - userData:', userData);
        
        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing admin auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // Listen for storage changes (when site login updates admin tokens)
    const handleStorageChange = (e) => {
      if (e.key === 'adminToken' || e.key === 'adminUser') {
        console.log('Storage changed, reinitializing admin auth');
        initAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  /**
   * Admin login function
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      console.log('Admin login response:', response);
      
      const data = response.data || response;
      
      if (data.firstLogin === true) {
        const tempToken = data.temporaryToken;
        const permissions = data.permissions || [];
        let role = data.role;
        
        // If role is not in response, try to extract from JWT token
        if (!role && tempToken) {
          try {
            const tokenPayload = JSON.parse(atob(tempToken.split('.')[1]));
            role = tokenPayload.role;
            console.log('Role extracted from JWT token:', role);
          } catch (e) {
            console.error('Failed to decode JWT token:', e);
          }
        }
        
        if (!tempToken) {
          throw new Error('No temporary token received for first login');
        }
        
        if (!role) {
          throw new Error('No role received from server. Please contact your backend team to include role in the login response.');
        }
        
        const userData = {
          role: role,
          email: data.email,
          permissions: permissions,
          name: data.name || data.email,
        };
        
        localStorage.setItem('adminToken', tempToken);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { 
          success: true, 
          data: data,
          dashboardRoute: getDashboardRoute(userData.role)
        };
      }
      
      const token = data.token || data.accessToken || data.authToken;
      
      const userData = {
        role: data.role,
        email: data.email,
        permissions: data.permissions || [],
        name: data.name || data.email,
      };
      
      if (!token) {
        throw new Error('No authentication token received from server');
      }
      
      if (!userData.role || !userData.permissions) {
        console.error('Invalid user data:', userData);
        throw new Error('Invalid user data received from server');
      }
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { 
        success: true, 
        data: data,
        dashboardRoute: getDashboardRoute(userData.role)
      };
    } catch (error) {
      console.error('Admin login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Admin login failed'
      };
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Check if user has specific role
   * @param {Array<string>} allowedRoles - Array of allowed roles
   */
  const hasRole = (allowedRoles) => {
    if (!user || !user.role) return false;
    return allowedRoles.includes(user.role);
  };

  /**
   * Check if user has specific permission
   * @param {string} permission - Permission to check
   */
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  /**
   * Check if user has any of the specified permissions
   * @param {Array<string>} permissions - Array of permissions to check
   */
  const hasAnyPermission = (permissions) => {
    if (!user || !user.permissions) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  };

  /**
   * Check if user has all of the specified permissions
   * @param {Array<string>} permissions - Array of permissions to check
   */
  const hasAllPermissions = (permissions) => {
    if (!user || !user.permissions) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  };

  /**
   * Get user's dashboard route
   */
  const getUserDashboard = () => {
    if (!user || !user.role) return '/dashboard';
    return getDashboardRoute(user.role);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserDashboard,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use admin auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
