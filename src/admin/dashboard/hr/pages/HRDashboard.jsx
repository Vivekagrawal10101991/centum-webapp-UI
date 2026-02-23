import React, { useState, useEffect } from 'react';
import { 
  Users, Clock, FileText, Calendar, Building2, UserCheck, 
  Briefcase, Plus, CheckCircle, XCircle, ChevronRight 
} from 'lucide-react';
import { Card, Button, Modal, Input, Select, Textarea } from '../../../../components/common';
import { hrService } from '../../../services/hrService';

/**
 * HR Dashboard Page
 * Main dashboard for Human Resources
 */
const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
      <div className="flex space-x-4 border-b border-gray-200 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Active Tab */}
      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab changeTab={setActiveTab} />}
        {activeTab === 'leaves' && <LeaveManagementTab />}
        {activeTab === 'recruitment' && <RecruitmentTab />}
      </div>
    </div>
  );
};

// ==========================================
// 1. OVERVIEW TAB (Existing Dashboard Stats)
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
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left"
            >
              <FileText className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Leave Approvals</p>
            </button>
            <button 
              onClick={() => changeTab('recruitment')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left"
            >
              <Building2 className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Post a Job</p>
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
      if (res.data?.success) setLeaves(res.data.data);
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
      // For now, using a simple browser prompt for remarks
      const remarks = window.prompt(`Add remarks for ${status} (Optional):`);
      if (remarks === null) return; // User cancelled
      
      const res = await hrService.updateLeaveStatus(id, status, remarks);
      if (res.data?.success) {
        fetchLeaves(); // Refresh list
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Leave Requests</h2>
        <Button variant="secondary" onClick={fetchLeaves}>Refresh</Button>
      </div>

      {loading ? (
        <p className="text-center py-4 text-gray-500">Loading leaves...</p>
      ) : leaves.length === 0 ? (
        <p className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed">No leave requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                <th className="p-3">Employee</th>
                <th className="p-3">Type</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{leave.user?.name || 'Unknown User'}</td>
                  <td className="p-3 text-sm">{leave.leaveType.replace('_', ' ')}</td>
                  <td className="p-3 text-sm">{leave.startDate} to {leave.endDate}</td>
                  <td className="p-3 text-sm max-w-xs truncate" title={leave.reason}>{leave.reason}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {leave.status === 'PENDING' && (
                      <>
                        <button onClick={() => handleStatusUpdate(leave.id, 'APPROVED')} className="text-green-600 hover:text-green-800" title="Approve">
                          <CheckCircle className="w-5 h-5 inline" />
                        </button>
                        <button onClick={() => handleStatusUpdate(leave.id, 'REJECTED')} className="text-red-600 hover:text-red-800" title="Reject">
                          <XCircle className="w-5 h-5 inline" />
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '', department: '', employmentType: 'Full-time', location: '', description: ''
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await hrService.getAllJobs();
      if (res.data?.success) setJobs(res.data.data);
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
      const res = await hrService.createJob(formData);
      if (res.data?.success) {
        setIsModalOpen(false);
        setFormData({ title: '', department: '', employmentType: 'Full-time', location: '', description: '' });
        fetchJobs(); // Refresh
      }
    } catch (error) {
      alert("Failed to create job posting.");
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

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Active Job Postings</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Post New Job
        </Button>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <p className="text-center py-4 text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <Card className="p-8 text-center text-gray-500 border-dashed">
          No job postings found. Click "Post New Job" to create one.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className={`p-6 border-l-4 ${job.open ? 'border-green-500' : 'border-gray-300'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-primary font-medium">{job.department}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${job.open ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {job.open ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>📍 {job.location}</p>
                <p>💼 {job.employmentType}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button className="text-sm font-medium text-primary flex items-center hover:underline">
                  View Applications <ChevronRight className="w-4 h-4 ml-1" />
                </button>
                <Button variant={job.open ? "danger" : "secondary"} onClick={() => handleToggleStatus(job.id)} size="sm">
                  {job.open ? 'Close Job' : 'Reopen Job'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Post a New Job">
        <form onSubmit={handleCreateJob} className="space-y-4">
          <Input 
            label="Job Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Department" 
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
                { value: 'Contract', label: 'Contract' }
              ]}
            />
          </div>
          <Input 
            label="Location" 
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})} 
            required 
          />
          <Textarea 
            label="Job Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
            rows={5} 
            required 
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button type="submit">Post Job</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HRDashboard;