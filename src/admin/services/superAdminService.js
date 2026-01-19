import api from '../../services/api';

/**
 * Super Admin Service
 * Handles all super admin user management API calls
 */

export const superAdminService = {
  /**
   * Add a new user
   * @param {Object} userData - { name, email, password, dob, role }
   * @returns {Promise} Response with created user
   */
  addUser: async (userData) => {
    const response = await api.post('/api/super-admin/manage-users/add', userData);
    return response.data;
  },

  /**
   * Get users by role
   * @param {string} role - User role to filter
   * @returns {Promise} Array of users
   */
  getUsersByRole: async (role) => {
    const response = await api.get(`/api/super-admin/manage-users/get?role=${role}`);
    return response.data;
  },

  /**
   * Delete a user by custom user ID
   * @param {string} customUserId - User's custom ID
   * @returns {Promise} Response
   */
  deleteUser: async (customUserId) => {
    const response = await api.delete(`/api/super-admin/manage-users/delete/${customUserId}`);
    return response.data;
  },
};

export default superAdminService;
