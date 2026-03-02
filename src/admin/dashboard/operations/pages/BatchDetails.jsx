import React, { useState, useEffect } from 'react';
import { Layers, Calendar, Users, Loader2, BookOpen, GraduationCap } from 'lucide-react';
import api from '../../../../services/api';

const BatchDetails = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  // Fetch dropdown list of batches on mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await api.get('/api/batches');
        setBatches(res.data?.data || res.data || []);
      } catch (error) {
        console.error('Failed to fetch batches', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  // Fetch detailed info when a batch is selected
  const handleBatchSelect = async (e) => {
    const batchId = e.target.value;
    setSelectedBatchId(batchId);
    
    if (!batchId) {
      setBatchDetails(null);
      return;
    }

    setFetchingDetails(true);
    try {
      const res = await api.get(`/api/batches/${batchId}`);
      setBatchDetails(res.data?.data || res.data);
    } catch (error) {
      console.error('Failed to fetch batch details', error);
      setBatchDetails(null);
    } finally {
      setFetchingDetails(false);
    }
  };

  const getBatchStatus = (batch) => {
    if (!batch.startDate || !batch.endDate) return { label: 'Active', color: 'bg-green-100 text-green-700' };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(batch.startDate);
    const endDate = new Date(batch.endDate);

    if (today < startDate) return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700 border border-blue-200' };
    if (today > endDate) return { label: 'Completed', color: 'bg-slate-100 text-slate-600 border border-slate-200' };
    return { label: 'Ongoing', color: 'bg-green-100 text-green-700 border border-green-200' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Batch Overview
        </h1>
        <p className="text-slate-500 mt-1">Select a batch to view its schedule and enrolled students.</p>
      </div>

      {/* Selection Dropdown */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <label className="text-sm font-medium text-slate-700 block mb-2">Select a Batch</label>
        <div className="relative max-w-md">
          <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <select
            value={selectedBatchId}
            onChange={handleBatchSelect}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-slate-700 font-medium"
          >
            <option value="">-- Choose a Batch to View --</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>{batch.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State for Details */}
      {fetchingDetails && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Batch Details Section */}
      {batchDetails && !fetchingDetails && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Start Date</p>
                <p className="text-lg font-bold text-slate-800">{batchDetails.startDate || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">End Date</p>
                <p className="text-lg font-bold text-slate-800">{batchDetails.endDate || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Students</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-lg font-bold text-slate-800 leading-none">
                    {batchDetails.students?.length || 0}
                  </p>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getBatchStatus(batchDetails).color}`}>
                    {getBatchStatus(batchDetails).label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Student List Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-slate-500" /> Enrolled Students
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              {batchDetails.students && batchDetails.students.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-sm border-b border-slate-200">
                      <th className="px-6 py-4 font-medium">Student ID</th>
                      <th className="px-6 py-4 font-medium">Full Name</th>
                      <th className="px-6 py-4 font-medium">Email Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchDetails.students.map((student, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-blue-600 font-medium">{student.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-slate-500">
                  <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="font-medium text-slate-700">No students enrolled yet</p>
                  <p className="text-sm mt-1">Students assigned to this batch will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchDetails;