import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, Button, Input, Select, Textarea } from '../../../components/common';
import { attendanceService } from '../../services/attendanceService';

const LeaveApplicationWidget = () => {
  const [activeTab, setActiveTab] = useState('apply'); 
  
  // Balance State
  const [balances, setBalances] = useState({
    remainingCasualLeaves: 12,
    pendingCasualLeaves: 0,
    remainingSickLeaves: 6,
    pendingSickLeaves: 0,
    totalCasualLeaves: 12,
    totalSickLeaves: 6
  });
  const [loadingBalances, setLoadingBalances] = useState(true);

  // Apply Leave State
  const [formData, setFormData] = useState({
    leaveType: 'CASUAL_LEAVE',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    fetchBalances();
  }, []);

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchBalances = async () => {
    try {
      setLoadingBalances(true);
      const data = await attendanceService.getLeaveBalances();
      setBalances(data);
    } catch (error) {
      console.error("Failed to fetch leave balances", error);
    } finally {
      setLoadingBalances(false);
    }
  };

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

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const sDate = new Date(start);
    const eDate = new Date(end);
    if (eDate < sDate) return -1;
    return Math.ceil(Math.abs(eDate - sDate) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const requestedDays = calculateDays(formData.startDate, formData.endDate);
    if (requestedDays <= 0) {
      setMessage({ type: 'error', text: 'End date must be after or equal to start date.' });
      return;
    }

    // Strict Client-Side Balance Validation considering pending leaves
    const availableCasual = balances.remainingCasualLeaves - (balances.pendingCasualLeaves || 0);
    const availableSick = balances.remainingSickLeaves - (balances.pendingSickLeaves || 0);

    if (formData.leaveType === 'CASUAL_LEAVE' && requestedDays > availableCasual) {
      setMessage({ type: 'error', text: `Cannot apply! You have ${balances.remainingCasualLeaves} left, but ${balances.pendingCasualLeaves || 0} are currently pending.` });
      return;
    }
    if (formData.leaveType === 'SICK_LEAVE' && requestedDays > availableSick) {
      setMessage({ type: 'error', text: `Cannot apply! You have ${balances.remainingSickLeaves} left, but ${balances.pendingSickLeaves || 0} are currently pending.` });
      return;
    }

    setIsSubmitting(true);

    try {
      await attendanceService.applyLeave(formData);
      setMessage({ type: 'success', text: 'Leave application submitted successfully!' });
      setFormData({ leaveType: 'CASUAL_LEAVE', startDate: '', endDate: '', reason: '' });
      
      fetchBalances();
      setTimeout(() => setActiveTab('history'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to submit leave.' });
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

      {activeTab === 'apply' && !loadingBalances && (
        <div className="grid grid-cols-2 gap-4 mb-6 animate-in fade-in">
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 flex flex-col items-center justify-center relative">
            <p className="text-[10px] tracking-wider text-orange-600 font-bold mb-1 uppercase">Casual Leaves</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-orange-700 leading-none">{balances.remainingCasualLeaves}</span>
              <span className="text-xs text-orange-600 font-medium">/ {balances.totalCasualLeaves}</span>
            </div>
            {balances.pendingCasualLeaves > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-yellow-500">
                {balances.pendingCasualLeaves} Pending
              </span>
            )}
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 flex flex-col items-center justify-center relative">
            <p className="text-[10px] tracking-wider text-blue-600 font-bold mb-1 uppercase">Sick Leaves</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-blue-700 leading-none">{balances.remainingSickLeaves}</span>
              <span className="text-xs text-blue-600 font-medium">/ {balances.totalSickLeaves}</span>
            </div>
            {balances.pendingSickLeaves > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-yellow-500">
                {balances.pendingSickLeaves} Pending
              </span>
            )}
          </div>
        </div>
      )}

      {activeTab === 'apply' && (
        <form onSubmit={handleApplyLeave} className="space-y-4 animate-in fade-in">
          {message.text && (
            <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}
          
          <Select 
            label="Leave Type"
            value={formData.leaveType}
            onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
            options={[
              { value: 'CASUAL_LEAVE', label: 'Casual Leave' },
              { value: 'SICK_LEAVE', label: 'Sick Leave' },
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
              min={new Date().toISOString().split('T')[0]}
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
            <Input 
              label="End Date" 
              type="date" 
              required
              min={formData.startDate || new Date().toISOString().split('T')[0]}
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
            {isSubmitting ? 'Submitting Application...' : 'Submit Leave Request'}
          </Button>
        </form>
      )}

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