import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
// FIXED: Adjusted the relative path to exactly 3 levels up
import { Card, Button, Input, Select, Textarea } from '../../../components/common';
import { attendanceService } from '../../services/attendanceService';

const LeaveApplicationWidget = () => {
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' or 'history'
  
  // Apply Leave State
  const [formData, setFormData] = useState({
    leaveType: 'CASUAL_LEAVE',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // History State
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await attendanceService.getLeaveHistory();
      if (res.success || Array.isArray(res.data)) {
        setHistory(res.data || res);
      }
    } catch (error) {
      console.error("Failed to fetch leave history", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await attendanceService.applyLeave(formData);
      setMessage({ type: 'success', text: 'Leave application submitted successfully!' });
      setFormData({ leaveType: 'CASUAL_LEAVE', startDate: '', endDate: '', reason: '' });
      
      // Auto-switch to history tab after 2 seconds
      setTimeout(() => setActiveTab('history'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit leave. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          Leave Management
        </h2>
        
        {/* Widget Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('apply')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'apply' ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Apply
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'history' ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'}`}
          >
            My History
          </button>
        </div>
      </div>

      {/* APPLY TAB */}
      {activeTab === 'apply' && (
        <form onSubmit={handleApplyLeave} className="space-y-4 animate-in fade-in">
          {message.text && (
            <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}
          
          <Select 
            label="Leave Type"
            value={formData.leaveType}
            onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
            options={[
              { value: 'SICK_LEAVE', label: 'Sick Leave' },
              { value: 'CASUAL_LEAVE', label: 'Casual Leave' },
              { value: 'EARNED_LEAVE', label: 'Earned Leave' },
              { value: 'MATERNITY_LEAVE', label: 'Maternity Leave' },
              { value: 'PATERNITY_LEAVE', label: 'Paternity Leave' },
              { value: 'UNPAID_LEAVE', label: 'Unpaid Leave' }
            ]}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Start Date" 
              type="date" 
              required
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
            <Input 
              label="End Date" 
              type="date" 
              required
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
          </div>
          
          <Textarea 
            label="Reason for Leave" 
            placeholder="Briefly explain your reason..."
            required
            rows={3}
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
          />
          
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
          </Button>
        </form>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="animate-in fade-in space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {loadingHistory ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p>You have not applied for any leaves yet.</p>
            </div>
          ) : (
            history.map((leave, idx) => (
              <div key={idx} className="border border-gray-100 bg-gray-50 p-4 rounded-xl flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{leave.leaveType.replace('_', ' ')}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {leave.startDate} to {leave.endDate}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-1" title={leave.reason}>{leave.reason}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold tracking-wide flex items-center gap-1 ${
                    leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {leave.status === 'APPROVED' && <CheckCircle className="w-3 h-3" />}
                    {leave.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                    {leave.status === 'PENDING' && <Clock className="w-3 h-3" />}
                    {leave.status}
                  </span>
                  {leave.hrRemarks && (
                    <p className="text-xs text-gray-400 mt-2 max-w-[120px] text-right truncate" title={`HR Remarks: ${leave.hrRemarks}`}>
                      Note: {leave.hrRemarks}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
};

export default LeaveApplicationWidget;