import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, XCircle, AlertCircle, Filter } from 'lucide-react';
import { Card, Button } from '../../components/common';
import { attendanceService } from '../services/attendanceService';
import { useAuth } from '../context/AuthContext';

const LeaveApprovals = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my_approvals'); // 'my_approvals' | 'directory'
  const [approvals, setApprovals] = useState([]);
  const [loadingApprovals, setLoadingApprovals] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setLoadingApprovals(true);
      setError(null);
      const res = await attendanceService.getPendingApprovals();
      
      let dataToSet = [];
      if (res && res.data && Array.isArray(res.data)) {
        dataToSet = res.data;
      } else if (Array.isArray(res)) {
        dataToSet = res;
      }
      
      setApprovals(dataToSet);
    } catch (err) {
      console.error("Failed to fetch approvals", err);
      setError("Failed to load approvals. Please try again.");
    } finally {
      setLoadingApprovals(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const remarks = window.prompt(`Add remarks for ${status} (Optional):`);
      if (remarks === null) return; 
      
      await attendanceService.updateLeaveStatus(id, status, remarks);
      fetchApprovals(); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status. You may not be authorized.");
    }
  };

  // Logic to determine if the current logged-in user is the assigned approver
  const isAssignedApprover = (leave) => {
    if (!leave?.approver || !user) return false;
    // Check by ID (Strings to be safe)
    if (String(leave.approver.id) === String(user.id)) return true;
    // Fallback: Check by Email (if IDs are inconsistent)
    if (leave.approver.email && user.email && leave.approver.email === user.email) return true;
    return false;
  };

  // Filter lists based on the tab
  const myPendingLeaves = approvals.filter(leave => isAssignedApprover(leave) && leave.status === 'PENDING');
  const allLeaves = approvals; // Directory shows everything

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage approvals and view employee leave history</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg self-start md:self-auto">
          <button 
            onClick={() => setActiveTab('my_approvals')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTab === 'my_approvals' 
                ? 'bg-white shadow text-primary' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Needs Approval
            {myPendingLeaves.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {myPendingLeaves.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTab === 'directory' 
                ? 'bg-white shadow text-primary' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Filter className="w-4 h-4" />
            Leave Directory
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-medium mb-4 border border-red-100">
          {error}
        </div>
      )}

      {/* CONTENT AREA */}
      <Card className="p-0 overflow-hidden border border-gray-200 shadow-sm bg-white min-h-[400px]">
        {loadingApprovals ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* TAB 1: MY PENDING APPROVALS */}
            {activeTab === 'my_approvals' && (
              <div>
                {myPendingLeaves.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                    <CheckCircle className="w-12 h-12 mb-3 text-green-100" />
                    <h3 className="text-gray-900 font-medium">No Pending Actions</h3>
                    <p className="text-sm">You have no leave requests waiting for your approval.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {myPendingLeaves.map((leave, idx) => (
                      <div key={leave.id || idx} className="p-6 hover:bg-red-50/30 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                             <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase">
                               {leave.leaveType?.replace(/_/g, ' ')}
                             </span>
                             <h4 className="font-bold text-gray-900 text-lg">{leave.user?.name}</h4>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                               <Calendar className="w-4 h-4 text-gray-400" />
                               <span className="font-medium text-gray-900">{leave.startDate}</span>
                               <span className="text-gray-400">to</span>
                               <span className="font-medium text-gray-900">{leave.endDate}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 italic border-l-2 border-gray-200 pl-3 mt-2">
                            "{leave.reason}"
                          </p>
                        </div>

                        {/* ACTION BUTTONS SECTION - FIXED REJECT BUTTON STYLING HERE */}
                        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                           <Button 
                             className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white shadow-md border-transparent"
                             onClick={() => handleStatusUpdate(leave.id, 'REJECTED')}
                           >
                             <XCircle className="w-4 h-4 mr-2" />
                             Reject
                           </Button>
                           <Button 
                             className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white shadow-md border-transparent"
                             onClick={() => handleStatusUpdate(leave.id, 'APPROVED')}
                           >
                             <CheckCircle className="w-4 h-4 mr-2" />
                             Approve Request
                           </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: FULL DIRECTORY (VIEW ONLY) */}
            {activeTab === 'directory' && (
              <div>
                {allLeaves.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">No records found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Leave Type</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned To</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {allLeaves.map((leave, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-medium text-gray-900">{leave.user?.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{leave.leaveType?.replace(/_/g, ' ')}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {leave.startDate} <span className="text-xs text-gray-300 mx-1">to</span> {leave.endDate}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {leave.approver?.name || 'Super Admin'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {leave.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default LeaveApprovals;