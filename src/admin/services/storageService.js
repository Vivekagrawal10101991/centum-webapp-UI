// src/admin/services/storageService.js
import api from '../../services/api';

export const storageService = {
  // Upload a new image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/tech/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Returns { url: "..." }
  },

  // Get list of all images
  getImages: async () => {
    const response = await api.get('/api/tech/storage/list');
    return response.data; // Returns ["url1", "url2", ...]
  },

  // Delete an image
  deleteImage: async (fileName) => {
    const response = await api.delete(`/api/tech/storage/delete/${fileName}`);
    return response.data;
  }
};