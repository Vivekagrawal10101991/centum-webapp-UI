import api from '../../services/api';

export const attendanceService = {
  /**
   * Mark user Check-In
   * @param {Object} data - { latitude, longitude, address }
   */
  checkIn: async (data) => {
    try {
      const response = await api.post('/api/attendance/check-in', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark user Check-Out
   * @param {Object} data - { latitude, longitude, address }
   */
  checkOut: async (data) => {
    try {
      const response = await api.post('/api/attendance/check-out', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch User's Attendance History
   */
  getHistory: async () => {
    try {
      const response = await api.get('/api/attendance/my-history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --- LEAVE MANAGEMENT ---

  /**
   * Fetch eligible reporting persons (Super Admins & Reporting Managers)
   */
  getApprovers: async () => {
    try {
      const response = await api.get('/api/attendance/leave/approvers');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Apply for a new Leave
   * @param {Object} data - { leaveType, startDate, endDate, reason, approver: { id } }
   */
  applyLeave: async (data) => {
    try {
      const response = await api.post('/api/attendance/leave', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch User's Leave History
   */
  getLeaveHistory: async () => {
    try {
      const response = await api.get('/api/attendance/leave/my-history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch User's Leave Balances (Casual/Sick)
   */
  getLeaveBalances: async () => {
    try {
      const response = await api.get('/api/attendance/leave/balances');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch Pending Approvals for a Reporting Manager/Super Admin
   */
  getPendingApprovals: async () => {
    try {
      const response = await api.get('/api/attendance/leave/approvals');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update Status of a Leave (Approve/Reject)
   */
  updateLeaveStatus: async (id, status, remarks = '') => {
    try {
      const response = await api.put(`/api/attendance/leave/${id}/status`, null, {
        params: { status, remarks }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};