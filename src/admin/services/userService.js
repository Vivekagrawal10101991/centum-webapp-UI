// src/admin/services/userService.js
import api from '../../services/api';

export const userService = {
    // Get profile of the logged-in user
    getMyProfile: async () => {
        try {
            const response = await api.get('/api/users/me');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch profile data'
            };
        }
    },

    // Update profile of the logged-in user
    updateMyProfile: async (profileData) => {
        try {
            const response = await api.put('/api/users/me', profileData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update profile'
            };
        }
    }
};