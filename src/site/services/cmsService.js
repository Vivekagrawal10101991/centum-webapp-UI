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
  
  // ✅ NEW: Get Success Stories (YouTube Videos) from Backend
  getStories: async () => {
    const response = await api.get('/api/tech/social/stories');
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

  getCourseBySlug: async (slugOrId) => {
    const response = await api.get('/api/tech/courses/all');
    const courses = response.data;
    if (!Array.isArray(courses)) return null;
    return courses.find(c => c.slug === slugOrId || c.id === slugOrId);
  }
};

export default cmsService;