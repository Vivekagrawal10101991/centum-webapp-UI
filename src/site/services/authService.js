import api from '../../services/api';

/**
 * Site Authentication Service
 * Handles all site authentication-related API calls
 * UPDATED: Logout now dispatches a custom event to sync state across the app.
 */

export const authService = {
  /**
   * User login
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with token and user data
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      console.log('Site login response:', response);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      throw error.response?.data?.message || error.message || 'Login failed';
    }
  },

  /**
   * Change password
   * @param {Object} passwordData - { currentPassword, newPassword }
   * @returns {Promise} Response
   */
  changePassword: async (passwordData) => {
    const response = await api.post('/api/auth/change-password', passwordData);
    return response.data;
  },

  /**
   * Signup new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Response with created user
   */
  signup: async (userData) => {
    const response = await api.post('/api/public/signup', userData);
    return response.data;
  },

  /**
   * Logout user (client-side)
   * Clears authentication token from storage and Dispatches Event
   */
  logout: () => {
    // 1. Clear all auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isFirstLogin');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');

    // 2. Dispatch a custom event so the App knows logout happened
    // This fixes the issue where the Navbar still shows the User Icon
    window.dispatchEvent(new Event('auth:logout'));
    window.dispatchEvent(new Event('storage')); // Trigger storage listener manually for same-tab sync
  },

  /**
   * Get current user from storage
   * @returns {Object|null} User object or null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Check if this is user's first login
   * @returns {boolean}
   */
  isFirstLogin: () => {
    return localStorage.getItem('isFirstLogin') === 'true';
  },

  /**
   * Set first login flag
   * @param {boolean} value
   */
  setFirstLogin: (value) => {
    localStorage.setItem('isFirstLogin', value ? 'true' : 'false');
  },
};

export default authService;