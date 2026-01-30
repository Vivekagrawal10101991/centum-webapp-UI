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
  },

  // --- Course Services ---
  getCourses: async () => {
    const response = await api.get('/api/tech/courses/all');
    return response.data;
  },

  /**
   * Fetches a single course by matching the Slug OR the ID.
   * Based on your DB schema, we check 'slug' (varchar) and 'id' (varchar).
   */
  getCourseBySlug: async (slugOrId) => {
    const response = await api.get('/api/tech/courses/all');
    const courses = response.data;
    
    if (!Array.isArray(courses)) return null;

    // Strict check based on your DB columns: id and slug
    return courses.find(c => 
      c.slug === slugOrId || 
      c.id === slugOrId
    );
  }
};

export default cmsService;