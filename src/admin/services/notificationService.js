import api from '../../services/api';

const notificationService = {
  // For Receivers
  getMyNotifications: async () => {
    const response = await api.get('/api/notifications/my-notifications');
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get('/api/notifications/unread-count');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/api/notifications/${id}/mark-read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put('/api/notifications/mark-all-read');
    return response.data;
  },

  // For Senders (Admins/HR)
  sendNotification: async (data) => {
    const response = await api.post('/api/notifications/send', data);
    return response.data;
  }
};

export default notificationService;