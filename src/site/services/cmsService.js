import api from '../../services/api';

/**
 * CMS Service
 * Handles all CMS-related API calls (banners, testimonials, toppers)
 */

export const cmsService = {
  /**
   * Get all banners for hero section
   */
  getBanners: async () => {
    const response = await api.get('/api/tech/cms/banners');
    return response.data;
  },

  /**
   * Get all testimonials
   */
  getTestimonials: async () => {
    const response = await api.get('/api/tech/social/testimonials');
    return response.data;
  },

  /**
   * Get all announcements
   */
  getAnnouncements: async () => {
    const response = await api.get('/api/tech/announcements/all');
    return response.data;
  },

  /**
   * Get all toppers (Academic API)
   */
  getToppers: async () => {
    const response = await api.get('/api/tech/academic/toppers');
    return response.data;
  }
};

export default cmsService;