import api from '../../services/api';

/**
 * Admin Authentication Service
 * Handles all admin authentication-related API calls
 */

export const authService = {
  /**
   * Admin login
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with token and user data
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/admin/login', credentials);
      console.log('Admin login response:', response);
      return response.data;
    } catch (error) {
      console.error('Admin login error:', error.response?.data || error);
      throw error.response?.data?.message || error.message || 'Admin login failed';
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
   * Logout admin user (client-side)
   * Clears authentication token from storage
   */
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isFirstLogin');
  },

  /**
   * Get current admin user from storage
   * @returns {Object|null} User object or null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if admin is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },

  /**
   * Check if this is admin's first login
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
