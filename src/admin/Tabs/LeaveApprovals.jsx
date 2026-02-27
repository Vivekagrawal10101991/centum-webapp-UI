import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Card, Button } from '../../components/common';
import { attendanceService } from '../services/attendanceService';

const LeaveApprovals = () => {
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
      
      // Highly defensive state setting to ensure it never crashes the .map()
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
      if (remarks === null) return; // User clicked cancel
      
      await attendanceService.updateLeaveStatus(id, status, remarks);
      fetchApprovals(); // Refresh list immediately after update
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leave Approvals</h1>
        <p className="text-gray-500 text-sm mt-1">Manage leave requests from your reporting employees</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {/* Show error if API fails instead of white screen */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          {loadingApprovals ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : approvals.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <CheckCircle className="w-12 h-12 mx-auto text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">All Caught Up!</h3>
              <p className="text-gray-500">No pending leave approvals in your queue.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvals.map((leave, idx) => (
                <div key={leave?.id || idx} className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      {/* Safe rendering with optional chaining (?.) */}
                      <h4 className="font-bold text-gray-900 text-base">{leave?.user?.name || 'Employee'}</h4>
                      <p className="text-xs font-semibold text-primary mt-1">
                        {leave?.leaveType ? leave.leaveType.replace(/_/g, ' ') : 'Leave Request'}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] rounded-full font-bold tracking-wide bg-yellow-100 text-yellow-700">
                      {leave?.status || 'PENDING'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{leave?.startDate || 'N/A'} to {leave?.endDate || 'N/A'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-4 border border-gray-100 min-h-[60px]">
                    <span className="text-xs font-semibold text-gray-500 block mb-1">Reason:</span>
                    {leave?.reason || 'No reason provided.'}
                  </div>

                  {leave?.status === 'PENDING' && (
                    <div className="flex space-x-3 pt-2">
                      <Button 
                        variant="danger" 
                        className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-none" 
                        onClick={() => handleStatusUpdate(leave.id, 'REJECTED')}
                      >
                        Reject
                      </Button>
                      <Button 
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white border-none shadow-sm" 
                        onClick={() => handleStatusUpdate(leave.id, 'APPROVED')}
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LeaveApprovals;