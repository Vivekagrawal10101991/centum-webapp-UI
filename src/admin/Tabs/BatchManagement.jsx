import React, { useState, useEffect } from 'react';
import { Layers, Plus, Calendar, BookOpen, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [formData, setFormData] = useState({
    batchName: '',
    courseId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const batchesRes = await api.get('/api/batches');
      setBatches(batchesRes.data?.data || batchesRes.data || []);

      try {
        const coursesRes = await api.get('/api/course-cms');
        setCourses(coursesRes.data?.data || coursesRes.data || []);
      } catch (courseErr) {
        console.warn('Could not fetch courses, using fallback data.', courseErr);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
      showNotification('Failed to load existing batches.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.batchName || !formData.startDate || !formData.endDate) {
      showNotification('Please fill all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/batches/create', formData);
      showNotification('Batch created successfully!', 'success');
      setFormData({ batchName: '', courseId: '', startDate: '', endDate: '' });
      fetchData(); 
    } catch (error) {
      console.error('Failed to create batch', error);
      showNotification(error.response?.data?.message || error.message || 'Failed to create batch.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to dynamically calculate professional status based on dates
  const getBatchStatus = (batch) => {
    // Fallback if backend hasn't been refreshed to send dates yet
    if (!batch.startDate || !batch.endDate) {
      return batch.active 
        ? { label: 'Ongoing', color: 'bg-green-100 text-green-700' }
        : { label: 'Inactive', color: 'bg-red-100 text-red-700' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Strip time for accurate day comparison

    const startDate = new Date(batch.startDate);
    const endDate = new Date(batch.endDate);

    if (today < startDate) {
      return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700 border border-blue-200' };
    } else if (today > endDate) {
      return { label: 'Completed', color: 'bg-slate-100 text-slate-600 border border-slate-200' };
    } else {
      return { label: 'Ongoing', color: 'bg-green-100 text-green-700 border border-green-200' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-600" />
          Batch Management
        </h1>
        <p className="text-slate-500 mt-1">Create and manage academic batches for student allocations.</p>
      </div>

      {notification.show && (
        <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">Create New Batch</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Batch Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="batchName"
                  value={formData.batchName}
                  onChange={handleInputChange}
                  placeholder="e.g. JEE Target 2026 - Batch A"
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Link to Course (Optional)</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Start Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">End Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-50 mt-4"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Batch'}
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Active Batches</h2>
            </div>
            
            <div className="overflow-x-auto">
              {batches.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-sm border-b border-slate-200">
                      <th className="px-6 py-4 font-medium">Batch Name</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">System ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch) => {
                      const status = getBatchStatus(batch);
                      return (
                        <tr key={batch.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-800">{batch.name}</td>
                          <td className="px-6 py-4">
                            {/* Updated Dynamic Status Tag */}
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 font-mono">{batch.id.substring(0, 8)}...</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <Layers className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="font-medium text-slate-700">No batches created yet</p>
                  <p className="text-sm mt-1">Use the form to create the first academic batch.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchManagement;