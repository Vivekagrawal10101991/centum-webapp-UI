import api from '../../services/api';

export const adminLmsService = {
  // 1. Enroll a Student in a Course
  // Backend: POST /api/admin/lms/enroll
  enrollStudent: async (email, courseId) => {
    try {
      const response = await api.post('/api/admin/lms/enroll', { email, courseId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 2. Create an Assignment
  // Backend: POST /api/admin/lms/create-assignment
  createAssignment: async (assignmentData) => {
    try {
      const response = await api.post('/api/admin/lms/create-assignment', assignmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 3. Create a Live Class Schedule
  // Backend: POST /api/admin/lms/create-schedule
  createSchedule: async (scheduleData) => {
    try {
      const response = await api.post('/api/admin/lms/create-schedule', scheduleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 4. Fetch schedules assigned specifically to the logged-in faculty
  // Backend: GET /api/admin/lms/scheduling/my-schedules
  getMySchedules: async () => {
    try {
      const response = await api.get('/api/admin/lms/scheduling/my-schedules');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};