import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, Clock, FileText, Calendar, Building2, UserCheck, 
  Briefcase, Plus, CheckCircle, XCircle, ChevronRight,
  Search, MapPin, Inbox, Mail, Phone, ExternalLink
} from 'lucide-react';
import { Card, Button, Modal, Input, Select, Textarea } from '../../../../components/common';
import { hrService } from '../../../services/hrService';

/**
 * HR Dashboard Page
 * Main dashboard for Human Resources
 */
const HRDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Helper to determine which tab should be active based on URL
  const getTabFromURL = () => {
    if (location.pathname.includes('/recruitment')) return 'recruitment';
    if (location.pathname.includes('/leaves')) return 'leaves';
    return 'overview';
  };

  // 2. Initialize state immediately based on URL
  const [activeTab, setActiveTab] = useState(getTabFromURL());

  // 3. Listen to URL changes
  useEffect(() => {
    setActiveTab(getTabFromURL());
  }, [location.pathname]);

  // 4. Handle internal tab clicks smoothly
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'overview') {
      navigate('/dashboard/hr');
    } else {
      navigate(`/dashboard/hr/${tabId}`);
    }
  };

  // Navigation Tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'leaves', label: 'Leave Approvals', icon: Calendar },
    { id: 'recruitment', label: 'Recruitment', icon: Briefcase },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage personnel, attendance, and recruitment.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b border-gray-200 pb-4 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Active Tab safely */}
      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab changeTab={handleTabChange} />}
        {activeTab === 'leaves' && <LeaveManagementTab />}
        {activeTab === 'recruitment' && <RecruitmentTab />}
      </div>
    </div>
  );
};

// ==========================================
// 1. OVERVIEW TAB
// ==========================================
const OverviewTab = ({ changeTab }) => {
  const stats = [
    { title: 'Total Employees', value: '142', change: '+5 this month', icon: Users, color: 'blue' },
    { title: 'Present Today', value: '135', change: '95% attendance', icon: UserCheck, color: 'green' },
    { title: 'Open Positions', value: '8', change: 'Active hiring', icon: Building2, color: 'purple' },
    { title: 'Leave Requests', value: '12', change: '5 pending approval', icon: Calendar, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => changeTab('leaves')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left group"
            >
              <FileText className="w-6 h-6 text-primary mb-2 transform group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Leave Approvals</p>
            </button>
            <button 
              onClick={() => changeTab('recruitment')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left group"
            >
              <Building2 className="w-6 h-6 text-primary mb-2 transform group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Manage Recruitment</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ==========================================
// 2. LEAVE MANAGEMENT TAB
// ==========================================
const LeaveManagementTab = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await hrService.getAllLeaves();
      if (res.data?.success || res.data) {
        setLeaves(res.data.data || res.data);
      }
    } catch (error) {
      console.error('Failed to fetch leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const remarks = window.prompt(`Add remarks for ${status} (Optional):`);
      if (remarks === null) return;
      
      const res = await hrService.updateLeaveStatus(id, status, remarks);
      if (res.data) fetchLeaves();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Leave Requests</h2>
        <Button variant="secondary" onClick={fetchLeaves}>Refresh</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : leaves.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
           <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
           <p className="text-gray-500 font-medium">No leave requests found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                <th className="p-3 font-semibold">Employee</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Dates</th>
                <th className="p-3 font-semibold">Reason</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-900">{leave.user?.name || 'Unknown User'}</td>
                  <td className="p-3 text-sm text-gray-600">{leave.leaveType?.replace('_', ' ')}</td>
                  <td className="p-3 text-sm text-gray-600">{leave.startDate} <span className="text-gray-400 mx-1">to</span> {leave.endDate}</td>
                  <td className="p-3 text-sm text-gray-600 max-w-xs truncate" title={leave.reason}>{leave.reason}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-xs rounded-full font-bold tracking-wide ${
                      leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    {leave.status === 'PENDING' && (
                      <>
                        <button onClick={() => handleStatusUpdate(leave.id, 'APPROVED')} className="text-green-600 hover:text-green-800 transition-colors" title="Approve">
                          <CheckCircle className="w-6 h-6 inline" />
                        </button>
                        <button onClick={() => handleStatusUpdate(leave.id, 'REJECTED')} className="text-red-600 hover:text-red-800 transition-colors" title="Reject">
                          <XCircle className="w-6 h-6 inline" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

// ==========================================
// 3. RECRUITMENT TAB 
// ==========================================
const RecruitmentTab = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppsModalOpen, setIsAppsModalOpen] = useState(false);
  
  // Application Data state
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, OPEN, CLOSED

  const [formData, setFormData] = useState({
    title: '', department: '', employmentType: 'Full-time', location: '', description: ''
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await hrService.getAllJobs();
      if (res.data?.success) {
        setJobs(res.data.data);
      } else if (Array.isArray(res.data)) {
        setJobs(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: 0,
        title: formData.title,
        department: formData.department,
        employmentType: formData.employmentType,
        description: formData.description,
        location: formData.location,
        postedDate: new Date().toISOString(), 
        open: true
      };

      const res = await hrService.createJob(payload);
      
      if (res.data || res.status === 200 || res.status === 201) {
        setIsModalOpen(false);
        setFormData({ title: '', department: '', employmentType: 'Full-time', location: '', description: '' });
        fetchJobs(); 
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job posting. Check console for details.");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await hrService.toggleJobStatus(id);
      fetchJobs();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // --- APPLICATIONS LOGIC ---
  const handleViewApplications = async (job) => {
    setSelectedJob(job);
    setIsAppsModalOpen(true);
    setAppsLoading(true);
    
    try {
      const res = await hrService.getJobApplications(job.id);
      if (res.data?.success) {
        setApplications(res.data.data);
      } else if (Array.isArray(res.data)) {
        setApplications(res.data);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setApplications([]);
    } finally {
      setAppsLoading(false);
    }
  };

  const handleUpdateAppStatus = async (appId, newStatus) => {
    try {
      await hrService.updateApplicationStatus(appId, newStatus);
      
      // Update local state to avoid refetching everything
      setApplications(prevApps => 
        prevApps.map(app => app.id === appId ? { ...app, status: newStatus } : app)
      );
    } catch (error) {
      console.error("Failed to update app status:", error);
      alert("Failed to update application status");
    }
  };

  // Derived filtered jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' ? true : 
                          statusFilter === 'OPEN' ? job.open === true : job.open === false;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recruitment Hub</h2>
          <p className="text-sm text-gray-500 mt-1">Manage job postings, requirements, and statuses.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center shadow-md hover:shadow-lg transition-shadow">
          <Plus className="w-5 h-5 mr-2" /> Post New Job
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search roles by title or department..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[160px] font-medium text-gray-700 shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="OPEN">🟢 Open Roles</option>
          <option value="CLOSED">🔴 Closed Roles</option>
        </select>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No roles found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or create a new job posting.</p>
          <Button onClick={() => setIsModalOpen(true)} variant="secondary">Create Job Posting</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className={`flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
              ${job.open ? 'border-t-4 border-t-green-500' : 'border-t-4 border-t-gray-400 opacity-80'}`}
            >
              <div className="p-6 flex-1">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md mb-3">
                      {job.department}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1" title={job.title}>
                      {job.title}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                    job.open 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {job.open ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>

                {/* Card Body - Details */}
                <div className="space-y-2.5 mt-5">
                  <div className="flex items-center text-sm text-gray-600 font-medium">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-medium">
                    <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
                    {job.employmentType}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                    {job.postedDate ? `Posted ${new Date(job.postedDate).toLocaleDateString()}` : 'Recently posted'}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                <button 
                  onClick={() => handleViewApplications(job)}
                  className="text-sm font-bold text-primary flex items-center group transition-colors hover:text-blue-700"
                >
                  Applications 
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <Button 
                  variant={job.open ? "danger" : "secondary"} 
                  onClick={() => handleToggleStatus(job.id)} 
                  size="sm"
                  className={job.open ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100" : ""}
                >
                  {job.open ? 'Close Role' : 'Reopen Role'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* --- APPLICATIONS MODAL --- */}
      <Modal 
        isOpen={isAppsModalOpen} 
        onClose={() => setIsAppsModalOpen(false)} 
        title={selectedJob ? `Applications: ${selectedJob.title}` : 'Applications'}
      >
        <div className="py-2">
          {appsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-10">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Applications Yet</h3>
              <p className="text-gray-500">Applications for this role will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {applications.map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all bg-white">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    {/* Applicant Info */}
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{app.applicantName}</h4>
                      <div className="mt-2 space-y-1.5 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <a href={`mailto:${app.email}`} className="hover:text-primary transition-colors">{app.email}</a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <a href={`tel:${app.phone}`} className="hover:text-primary transition-colors">{app.phone}</a>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          Applied: {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'Recently'}
                        </div>
                      </div>
                    </div>

                    {/* Actions & Status */}
                    <div className="flex flex-col items-start md:items-end space-y-3">
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Resume
                      </a>
                      
                      <select 
                        className={`text-sm font-bold rounded-lg px-3 py-2 border outline-none cursor-pointer
                          ${app.status === 'NEW' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                            app.status === 'SHORTLISTED' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                            app.status === 'INTERVIEWED' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                            app.status === 'HIRED' ? 'bg-green-50 border-green-200 text-green-700' :
                            'bg-red-50 border-red-200 text-red-700'
                          }
                        `}
                        value={app.status || 'NEW'}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                      >
                        <option value="NEW">New</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                        <option value="INTERVIEWED">Interviewed</option>
                        <option value="HIRED">Hired</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* Create Job Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Post a New Job">
        <form onSubmit={handleCreateJob} className="space-y-5">
          <Input 
            label="Job Title" 
            placeholder="e.g. Senior Frontend Developer"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Department" 
              placeholder="e.g. Engineering"
              value={formData.department} 
              onChange={(e) => setFormData({...formData, department: e.target.value})} 
              required 
            />
            <Select 
              label="Employment Type"
              value={formData.employmentType}
              onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
              options={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Internship', label: 'Internship' }
              ]}
            />
          </div>
          <Input 
            label="Location" 
            placeholder="e.g. Bangalore, India (or Remote)"
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})} 
            required 
          />
          <Textarea 
            label="Job Description" 
            placeholder="Describe the responsibilities and requirements..."
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
            rows={5} 
            required 
          />
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button type="submit" className="shadow-md">Publish Job</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HRDashboard;