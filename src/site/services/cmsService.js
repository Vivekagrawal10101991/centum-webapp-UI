import api from '../../services/api';

/**
 * CMS Service
 * Handles fetching all dynamic content for the public site including
 * courses, testimonials, achievers, and announcements from the Spring Boot backend.
 */
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
  
  // Success Stories / Student Profiles
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

  /**
   * Fetches a specific course by its slug or ID.
   * Current implementation fetches all and filters client-side to ensure 
   * compatibility if a dedicated single-course endpoint is not yet ready.
   */
  getCourseBySlug: async (slugOrId) => {
    try {
      const response = await api.get('/api/tech/courses/all');
      const courses = response.data;
      if (!Array.isArray(courses)) return null;
      // Matches slug for SEO-friendly URLs or ID for legacy links
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

  // Used for the "Explore Videos" page in Media Center
  getAllVideos: async () => {
    try {
      const response = await api.get('/api/tech/videos/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching video library:", error);
      throw error;
    }
  },

  // Placeholder for upcoming Blog section
  getBlogs: async () => {
    try {
      const response = await api.get('/api/tech/blogs/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return []; // Returns empty array to prevent UI crashes
    }
  }
};

export default cmsService;