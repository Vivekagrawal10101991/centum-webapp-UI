import api from '../../services/api';

/**
 * CMS Service
 * Handles all CMS-related API calls (banners, testimonials, etc.)
 */

export const cmsService = {
  /**
   * Get all banners for hero section
   * @returns {Promise} Array of banner objects
   */
  getBanners: async () => {
    const response = await api.get('/api/tech/cms/banners');
    return response.data;
  },

  /**
   * Get all testimonials
   * @returns {Promise} Array of testimonial objects
   */
  getTestimonials: async () => {
    const response = await api.get('/api/tech/social/testimonials');
    return response.data;
  },

  /**
   * Get all announcements
   * @returns {Promise} Array of announcement objects
   */
  getAnnouncements: async () => {
    const response = await api.get('/api/tech/announcements/all');
    return response.data;
  },
};

export default cmsService;
