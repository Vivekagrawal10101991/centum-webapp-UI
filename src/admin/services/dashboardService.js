import api from '../../services/api';

/**
 * Dashboard Service
 * Handles dashboard-related API calls for all roles
 */

export const dashboardService = {
  // Admin Dashboard APIs
  admin: {
    /**
     * Get admin dashboard statistics
     */
    getStats: async () => {
      const response = await api.get('/api/admin/dashboard/stats');
      return response.data;
    },

    /**
     * Get recent activities
     */
    getRecentActivities: async () => {
      const response = await api.get('/api/admin/dashboard/activities');
      return response.data;
    },

    /**
     * Get all users
     */
    getUsers: async (params = {}) => {
      const response = await api.get('/api/admin/users', { params });
      return response.data;
    },

    /**
     * Create new user
     */
    createUser: async (userData) => {
      const response = await api.post('/api/admin/users', userData);
      return response.data;
    },

    /**
     * Update user
     */
    updateUser: async (userId, userData) => {
      const response = await api.put(`/api/admin/users/${userId}`, userData);
      return response.data;
    },

    /**
     * Delete user
     */
    deleteUser: async (userId) => {
      const response = await api.delete(`/api/admin/users/${userId}`);
      return response.data;
    },
  },

  // Technical Head Dashboard APIs
  technical: {
    /**
     * Get technical dashboard statistics
     */
    getStats: async () => {
      const response = await api.get('/api/technical/dashboard/stats');
      return response.data;
    },

    /**
     * Get courses managed by technical head
     */
    getCourses: async () => {
      const response = await api.get('/api/technical/courses');
      return response.data;
    },

    /**
     * Get content statistics
     */
    getContentStats: async () => {
      const response = await api.get('/api/technical/content/stats');
      return response.data;
    },

    /**
     * Get technical reports
     */
    getReports: async (params = {}) => {
      const response = await api.get('/api/technical/reports', { params });
      return response.data;
    },
  },

  // Teacher Dashboard APIs
  teacher: {
    /**
     * Get teacher dashboard statistics
     */
    getStats: async () => {
      const response = await api.get('/api/teacher/dashboard/stats');
      return response.data;
    },

    /**
     * Get teacher's courses
     */
    getCourses: async () => {
      const response = await api.get('/api/teacher/courses');
      return response.data;
    },

    /**
     * Get students for teacher
     */
    getStudents: async () => {
      const response = await api.get('/api/teacher/students');
      return response.data;
    },

    /**
     * Get assignments to grade
     */
    getAssignments: async () => {
      const response = await api.get('/api/teacher/assignments');
      return response.data;
    },

    /**
     * Grade assignment
     */
    gradeAssignment: async (assignmentId, gradeData) => {
      const response = await api.post(`/api/teacher/assignments/${assignmentId}/grade`, gradeData);
      return response.data;
    },
  },

  // Student Dashboard APIs
  student: {
    /**
     * Get student dashboard statistics
     */
    getStats: async () => {
      const response = await api.get('/api/student/dashboard/stats');
      return response.data;
    },

    /**
     * Get enrolled courses
     */
    getCourses: async () => {
      const response = await api.get('/api/student/courses');
      return response.data;
    },

    /**
     * Get assignments
     */
    getAssignments: async () => {
      const response = await api.get('/api/student/assignments');
      return response.data;
    },

    /**
     * Submit assignment
     */
    submitAssignment: async (assignmentId, submissionData) => {
      const response = await api.post(`/api/student/assignments/${assignmentId}/submit`, submissionData);
      return response.data;
    },

    /**
     * Get grades
     */
    getGrades: async () => {
      const response = await api.get('/api/student/grades');
      return response.data;
    },

    /**
     * Get upcoming classes
     */
    getUpcomingClasses: async () => {
      const response = await api.get('/api/student/schedule/upcoming');
      return response.data;
    },
  },

  // Parent Dashboard APIs
  parent: {
    /**
     * Get parent dashboard statistics
     */
    getStats: async (studentId) => {
      const response = await api.get(`/api/parent/dashboard/stats/${studentId}`);
      return response.data;
    },

    /**
     * Get child's progress
     */
    getChildProgress: async (studentId) => {
      const response = await api.get(`/api/parent/students/${studentId}/progress`);
      return response.data;
    },

    /**
     * Get child's courses
     */
    getChildCourses: async (studentId) => {
      const response = await api.get(`/api/parent/students/${studentId}/courses`);
      return response.data;
    },

    /**
     * Get child's grades
     */
    getChildGrades: async (studentId) => {
      const response = await api.get(`/api/parent/students/${studentId}/grades`);
      return response.data;
    },
  },
};

export default dashboardService;
