import api from '../../services/api';

/**
 * Enquiry Service
 * Handles enquiry/lead submission
 */

export const enquiryService = {
  /**
   * Submit enquiry form
   * @param {Object} enquiryData - { name, phone, email, location, course, message }
   * @returns {Promise} Response from server
   */
  submitEnquiry: async (enquiryData) => {
    const response = await api.post('/api/public/enquiry', enquiryData);
    return response.data;
  },
};

export default enquiryService;
