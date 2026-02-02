import api from '../../services/api';

export const studentLmsService = {
  /**
   * Fetch all courses the current student is enrolled in.
   * Endpoint: GET /api/student/lms/my-courses
   */
  getMyCourses: async () => {
    try {
      const response = await api.get('/api/student/lms/my-courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching my courses:', error);
      throw error;
    }
  },

  /**
   * Fetch assignments for a specific course.
   * Endpoint: GET /api/student/lms/assignments/{courseId}
   */
  getCourseAssignments: async (courseId) => {
    try {
      const response = await api.get(`/api/student/lms/assignments/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching assignments:', error);
      throw error;
    }
  },

  /**
   * Fetch the live class schedule for a specific course.
   * Endpoint: GET /api/student/lms/schedule/{courseId}
   */
  getCourseSchedule: async (courseId) => {
    try {
      const response = await api.get(`/api/student/lms/schedule/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },

  /**
   * Submit an assignment.
   * Endpoint: POST /api/student/lms/submit-assignment
   * Payload: { assignmentId, fileUrl, comments }
   */
  submitAssignment: async (submissionData) => {
    try {
      const response = await api.post('/api/student/lms/submit-assignment', submissionData);
      return response.data;
    } catch (error) {
      console.error('Error submitting assignment:', error);
      throw error;
    }
  }
};