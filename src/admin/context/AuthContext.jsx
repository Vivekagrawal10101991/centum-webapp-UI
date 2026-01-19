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
      const token = data.token || data.accessToken || data.authToken;
      const userData = data.user || data.userData || data;
      
      if (!token) {
        throw new Error('No authentication token received from server');
      }
      
      if (!userData || !userData.role) {
        console.error('Invalid user data:', userData);
        throw new Error('Invalid user data received from server');
      }
      
      // Store admin token and user data
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
