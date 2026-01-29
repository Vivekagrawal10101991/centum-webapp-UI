import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getDashboardRoute } from '../../utils/roles';

const AuthContext = createContext(null);

/**
 * Site AuthProvider Component
 * Manages site authentication state
 * UPDATED: Added Event Listeners to auto-detect logout from Dashboard
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper to check current auth status from storage
  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = authService.getCurrentUser();
      
      if (token && userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // If data is missing in storage, ensure state matches (Logged Out)
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Initialize auth state and set up listeners
  useEffect(() => {
    checkAuthStatus();

    // Listener 1: Listens for the custom 'auth:logout' event (from same tab)
    const handleLogoutEvent = () => {
      console.log('Logout event detected. Updating UI...');
      checkAuthStatus();
    };

    // Listener 2: Listens for 'storage' changes (from other tabs or manual triggers)
    const handleStorageChange = (e) => {
      if (e.key === 'authToken' || e.key === 'user' || e.type === 'storage') {
        console.log('Storage change detected. Syncing auth state...');
        checkAuthStatus();
      }
    };

    window.addEventListener('auth:logout', handleLogoutEvent);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('auth:logout', handleLogoutEvent);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  /**
   * Login function
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
          } catch (e) {
            console.error('Failed to decode JWT token:', e);
          }
        }
        
        if (!tempToken) {
          throw new Error('No temporary token received for first login');
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
    authService.logout(); // This now dispatches the event
    // Manually update state just in case
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