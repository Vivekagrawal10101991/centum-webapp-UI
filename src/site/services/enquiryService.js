import api from '../../services/api';

/**
 * Enquiry Service
 * Handles enquiry/lead submission
 */

export const enquiryService = {
  /**
   * Submit enquiry form
   * @param {Object} enquiryData - Payload matching /api/public/enquire structure
   * @returns {Promise} Response from server
   */
  submitEnquiry: async (enquiryData) => {
    // Updated endpoint to /api/public/enquire
    const response = await api.post('/api/public/enquire', enquiryData);
    return response.data;
  },
};

export default enquiryService;