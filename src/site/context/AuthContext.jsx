import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getDashboardRoute } from '../../utils/roles';

const AuthContext = createContext(null);

/**
 * Site AuthProvider Component
 * Manages site authentication state
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
      
      console.log('Login response:', response);
      
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
        
        console.log('First login data:', {
          tempToken: tempToken ? 'present' : 'missing',
          role: role,
          permissions: permissions
        });
        
        if (!tempToken) {
          throw new Error('No temporary token received for first login');
        }
        
        if (!role) {
          throw new Error('No role received from server. Please contact your backend team to include role in the login response.');
        }
        
        const userData = {
          email: data.email,
          role: role,
          permissions: permissions,
          name: data.name || data.email,
        };
        
        localStorage.setItem('authToken', tempToken);
        localStorage.setItem('adminToken', tempToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('adminUser', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        const dashboardRoute = getDashboardRoute(role);
        console.log('Calculated dashboard route for role', role, ':', dashboardRoute);
        
        return { 
          success: true, 
          data: data,
          dashboardRoute: dashboardRoute
        };
      }
      
      const token = data.token || data.accessToken || data.authToken;
      const permissions = data.permissions || [];
      
      if (!token) {
        throw new Error('No authentication token received from server');
      }
      
      const userData = {
        email: data.email,
        role: data.role,
        permissions: permissions,
        name: data.name || data.email,
      };
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      const dashboardRoute = userData.role ? getDashboardRoute(userData.role) : '/dashboard';
      console.log('Dashboard route:', dashboardRoute);
      
      return { 
        success: true, 
        data: data,
        dashboardRoute: dashboardRoute
      };
    } catch (error) {
      console.error('Login error:', error);
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
    // Also clear admin tokens
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setIsAuthenticated(false);
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
    signup,
    logout,
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
