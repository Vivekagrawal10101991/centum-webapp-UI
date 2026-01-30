import api from '../../services/api';

/**
 * Service for managing leads and enquiries
 * Base endpoint: /api/tech/leads/enquiries
 */
export const leadsService = {
  /**
   * Fetch all enquiries
   * GET /api/tech/leads/enquiries
   */
  getAllEnquiries: async () => {
    const response = await api.get('/api/tech/leads/enquiries');
    return response.data;
  },

  /**
   * Update enquiry status
   * PATCH /api/tech/leads/enquiries/{id}/status
   * @param {string|number} id - The enquiry ID
   * @param {string} status - New status
   */
  updateStatus: async (id, status) => {
    const response = await api.patch(`/api/tech/leads/enquiries/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  /**
   * Delete an enquiry
   * DELETE /api/tech/leads/enquiries/{id}
   * @param {string|number} id - The enquiry ID
   */
  deleteEnquiry: async (id) => {
    const response = await api.delete(`/api/tech/leads/enquiries/${id}`);
    return response.data;
  }
};