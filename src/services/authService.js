import api from './api';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with token and user data
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      console.log('Raw API response:', response); // Debug log
      console.log('Response data:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Login API error:', error.response?.data || error);
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
   * Signup new user (Super Admin)
   * @param {Object} userData - User registration data
   * @returns {Promise} Response with created user
   */
  signup: async (userData) => {
    const response = await api.post('/api/auth/super-admin/signup', userData);
    return response.data;
  },

  /**
   * Logout user (client-side)
   * Clears authentication token from storage
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isFirstLogin');
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
