import api from '../../services/api';

export const cmsService = {
  
  // --- Homepage & Hero Assets ---
  getBanners: async () => {
    try {
      const response = await api.get('/api/tech/cms/banners');
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  },

  // --- Results & Social Proof (Achievers) ---
  getToppers: async () => {
    try {
      const response = await api.get('/api/tech/academic/toppers');
      return response.data;
    } catch (error) {
      console.error("Error fetching toppers:", error);
      throw error;
    }
  },

  getAchieverGallery: async () => {
    try {
      const response = await api.get('/api/tech/academic/results');
      return response.data;
    } catch (error) {
      console.error("Error fetching achiever gallery:", error);
      throw error;
    }
  },
  
  getStories: async () => {
    try {
      const response = await api.get('/api/tech/social/stories');
      return response.data;
    } catch (error) {
      console.error("Error fetching success stories:", error);
      throw error;
    }
  },

  getTestimonials: async () => {
    try {
      const response = await api.get('/api/tech/social/testimonials');
      return response.data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw error;
    }
  },

  getContributors: async () => {
    try {
      const response = await api.get('/api/tech/social/contributors');
      return response.data;
    } catch (error) {
      console.error("Error fetching contributors:", error);
      throw error;
    }
  },

  // --- Course Management ---
  getCourses: async () => {
    try {
      const response = await api.get('/api/tech/courses/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching course catalog:", error);
      throw error;
    }
  },

  getCourseBySlug: async (slugOrId) => {
    try {
      const response = await api.get('/api/tech/courses/all');
      const courses = response.data;
      if (!Array.isArray(courses)) return null;
      return courses.find(c => c.slug === slugOrId || c.id === slugOrId);
    } catch (error) {
      console.error(`Error fetching course detail for: ${slugOrId}`, error);
      throw error;
    }
  },

  // --- Media, Videos & Announcements ---
  getAnnouncements: async () => {
    try {
      const response = await api.get('/api/tech/announcements/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching announcements:", error);
      throw error;
    }
  },

  getAllVideos: async () => {
    try {
      const response = await api.get('/api/tech/videos/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching video library:", error);
      throw error;
    }
  },

  getBlogs: async () => {
    try {
      const response = await api.get('/api/tech/blogs/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return []; 
    }
  },

  // --- Library Content (NEW) ---
  getLibraryContents: async () => {
    try {
      const response = await api.get('/api/tech/library/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching library contents:", error);
      return [];
    }
  }
};

export default cmsService;