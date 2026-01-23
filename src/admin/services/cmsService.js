import api from '../../services/api';

export const cmsService = {
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

  // --- Toppers Endpoints (Academic) ---
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