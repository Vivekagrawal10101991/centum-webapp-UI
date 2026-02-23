import api from '../../services/api';

export const hrService = {
  // --- LEAVE MANAGEMENT ---
  getAllLeaves: () => api.get('/api/hr/leaves'),
  
  updateLeaveStatus: (id, status, remarks = '') => 
    api.put(`/api/hr/leaves/${id}/status`, null, { 
      params: { status, remarks } 
    }),

  // --- RECRUITMENT MANAGEMENT ---
  createJob: (jobData) => api.post('/api/hr/jobs', jobData),
  
  getAllJobs: () => api.get('/api/hr/jobs'),
  
  toggleJobStatus: (id) => api.put(`/api/hr/jobs/${id}/toggle`),
  
  getJobApplications: (jobId) => api.get(`/api/hr/jobs/${jobId}/applications`),
  
  updateApplicationStatus: (id, status) => 
    api.put(`/api/hr/applications/${id}/status`, null, { 
      params: { status } 
    }),
};