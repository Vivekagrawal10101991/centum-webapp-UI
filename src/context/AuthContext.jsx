import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getDashboardRoute } from '../utils/roles';

const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Manages global authentication state with role-based access
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = authService.getCurrentUser();
        
        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login function
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      console.log('Login response:', response); // Debug log
      
      // Handle different response structures
      // Backend might return { data: { token, user } } or { token, user } directly
      const data = response.data || response;
      const token = data.token || data.accessToken || data.authToken;
      const userData = data.user || data.userData || data;
      
      // Validate that we have required data
      if (!token) {
        throw new Error('No authentication token received from server');
      }
      
      if (!userData || !userData.role) {
        console.error('Invalid user data:', userData);
        throw new Error('Invalid user data received from server');
      }
      
      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { 
        success: true, 
        data: data,
        dashboardRoute: getDashboardRoute(userData.role)
      };
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed'
      };
    }
  };

  /**
   * Signup function
   * @param {Object} userData - User registration data
   */
  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
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
    if (!user || !user.role) return '/';
    return getDashboardRoute(user.role);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    hasRole,
    getUserDashboard,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
