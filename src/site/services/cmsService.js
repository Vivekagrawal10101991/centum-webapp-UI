import api from '../../services/api';

export const cmsService = {
  getBanners: async () => {
    const response = await api.get('/api/tech/cms/banners');
    return response.data;
  },
  getToppers: async () => {
    const response = await api.get('/api/tech/academic/toppers');
    return response.data;
  },
  /**
   * Fetches data from Dashboard > Academics & Results > Achiever Gallery
   */
  getAchieverGallery: async () => {
    const response = await api.get('/api/tech/academic/results');
    return response.data;
  },
  getTestimonials: async () => {
    const response = await api.get('/api/tech/social/testimonials');
    return response.data;
  },
  getAnnouncements: async () => {
    const response = await api.get('/api/tech/announcements/all');
    return response.data;
  }
};

export default cmsService;