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
  },

  // --- Video Library Endpoints (Media Center) ---
  getAllVideos: async () => {
    const response = await api.get('/api/tech/videos/all');
    return response.data;
  },

  addVideo: async (videoData) => {
    // Matches: POST /api/tech/videos/add
    const response = await api.post('/api/tech/videos/add', videoData);
    return response.data;
  },

  updateVideo: async (id, videoData) => {
    // Matches: PUT /api/tech/videos/{id}
    const response = await api.put(`/api/tech/videos/${id}`, videoData);
    return response.data;
  },

  deleteVideo: async (id) => {
    // Matches: DELETE /api/tech/videos/{id}
    const response = await api.delete(`/api/tech/videos/${id}`);
    return response.data;
  },

  // --- Success Stories Endpoints (Social Proof) ---
  getStories: async () => {
    const response = await api.get('/api/tech/social/stories');
    return response.data;
  },

  createStory: async (storyData) => {
    const response = await api.post('/api/tech/social/stories', storyData);
    return response.data;
  },

  updateStory: async (id, storyData) => {
    const response = await api.put(`/api/tech/social/stories/${id}`, storyData);
    return response.data;
  },

  deleteStory: async (id) => {
    const response = await api.delete(`/api/tech/social/stories/${id}`);
    return response.data;
  },

  // --- Contributors (Team) Endpoints ---
  getContributors: async () => {
    const response = await api.get('/api/tech/social/contributors');
    return response.data;
  },

  addContributor: async (data) => {
    const response = await api.post('/api/tech/social/contributors', data);
    return response.data;
  },

  updateContributor: async (id, data) => {
    const response = await api.put(`/api/tech/social/contributors/${id}`, data);
    return response.data;
  },

  deleteContributor: async (id) => {
    const response = await api.delete(`/api/tech/social/contributors/${id}`);
    return response.data;
  }
};