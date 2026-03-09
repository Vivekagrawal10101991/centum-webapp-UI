import api from '../../services/api';

export const storageService = {
  // Generic Upload (Works for Images and PDFs)
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/tech/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; 
  },

  // Kept for backward compatibility with existing Image Pickers
  uploadImage: async (file) => {
    return storageService.uploadFile(file);
  },

  // Get list of all files
  getFiles: async () => {
    const response = await api.get('/api/tech/storage/list');
    return response.data;
  },

  // Kept for backward compatibility
  getImages: async () => {
    return storageService.getFiles();
  },

  // Generic Delete
  deleteFile: async (fileName) => {
    const response = await api.delete(`/api/tech/storage/delete/${fileName}`);
    return response.data;
  },

  // Kept for backward compatibility
  deleteImage: async (fileName) => {
    return storageService.deleteFile(fileName);
  }
};