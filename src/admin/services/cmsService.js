import api from '../../services/api';

export const cmsService = {
  // --- Course Endpoints ---
  getCourses: async () => {
    const response = await api.get('/api/tech/courses/all');
    return response.data;
  },

  addCourse: async (courseData) => {
    const response = await api.post('/api/tech/courses/add', courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    // FIXED: Changed endpoint from '/api/tech/courses/all' to '/api/tech/courses/${id}'
    // This matches the pattern used by DELETE
    const response = await api.put(`/api/tech/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await api.delete(`/api/tech/courses/${id}`);
    return response.data;
  },

  // --- Banner Endpoints ---
  getBanners: async () => {
    const response = await api.get('/api/tech/cms/banners');
    return response.data;
  },

  createBanner: async (bannerData) => {
    const response = await api.post('/api/tech/cms/banners', bannerData);
    return response.data;
  },
  
  updateBanner: async (id, bannerData) => {
    const response = await api.put(`/api/tech/cms/banners/${id}`, bannerData);
    return response.data;
  },
  
  deleteBanner: async (id) => {
    const response = await api.delete(`/api/tech/cms/banners/${id}`);
    return response.data;
  },

  // --- Toppers Endpoints ---
  getToppers: async () => {
    const response = await api.get('/api/tech/academic/toppers');
    return response.data;
  },

  createTopper: async (topperData) => {
    const response = await api.post('/api/tech/academic/toppers', topperData);
    return response.data;
  },

  updateTopper: async (id, topperData) => {
    const response = await api.put(`/api/tech/academic/toppers/${id}`, topperData);
    return response.data;
  },

  deleteTopper: async (id) => {
    const response = await api.delete(`/api/tech/academic/toppers/${id}`);
    return response.data;
  }
};