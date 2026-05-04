import api from '../../services/api';

export const studentLmsService = {
  getMyCourses: async () => {
    try {
      const response = await api.get('/api/student/lms/my-courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching my courses:', error);
      throw error;
    }
  },

  getMyResources: async () => {
    try {
      const response = await api.get('/api/student/lms/my-resources');
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },

  getCourseAssignments: async (courseId) => {
    try {
      const response = await api.get(`/api/student/lms/assignments/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching assignments:', error);
      throw error;
    }
  },

  getCourseSchedule: async (courseId) => {
    try {
      const response = await api.get(`/api/student/lms/schedule/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },

  submitAssignment: async (submissionData) => {
    try {
      const response = await api.post('/api/student/lms/submit-assignment', submissionData);
      return response.data;
    } catch (error) {
      console.error('Error submitting assignment:', error);
      throw error;
    }
  },

  getMyBatches: async () => {
    try {
      const response = await api.get('/api/student/lms/my-batches');
      return response.data;
    } catch (error) {
      console.error('Error fetching my batches:', error);
      throw error;
    }
  },

  // NEW: Fetch global live schedules mapped to the student's batches
  getMySchedules: async () => {
    try {
      const response = await api.get('/api/student/lms/my-schedules');
      return response.data;
    } catch (error) {
      console.error('Error fetching my schedules:', error);
      throw error;
    }
  }
};