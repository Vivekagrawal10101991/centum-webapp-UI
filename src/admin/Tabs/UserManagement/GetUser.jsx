import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Users, Search, Mail, Shield, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Card, Button } from '../../../components/common';
import { superAdminService } from '../../services/superAdminService';

export const GetUsersPage = () => {
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [users, setUsers] = useState([]);
  const [dynamicRoles, setDynamicRoles] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingRoles, setIsFetchingRoles] = useState(true);

  // 1. Fetch exact roles from backend to prevent mismatch errors
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await superAdminService.getAllRoles();
        if (res && Array.isArray(res)) {
            // Converts "OPERATIONS_MANAGER" into "Operations Manager" automatically
            const formattedRoles = res.map(role => ({
                value: role,
                label: role.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
            }));
            setDynamicRoles(formattedRoles);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
        toast.error("Could not load system roles from the server.");
      } finally {
        setIsFetchingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // 2. Fetch Users based on selection
  const fetchUsers = async (roleToFetch) => {
    setIsLoading(true);
    setUsers([]);
    
    try {
      let response;
      if (roleToFetch === 'ALL') {
          response = await superAdminService.getAllUsers();
      } else {
          response = await superAdminService.getUsersByRole(roleToFetch);
      }
      
      if (response?.success && response?.data) {
        setUsers(response.data);
      } else if (Array.isArray(response)) {
        setUsers(response);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error?.response?.data?.message || `Failed to fetch users.`);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch when role selection changes
  useEffect(() => {
    if (!isFetchingRoles) {
        fetchUsers(selectedRole);
    }
  }, [selectedRole, isFetchingRoles]);

  return (
    <div className="animate-fade-in pb-10">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users className="w-6 h-6 text-indigo-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
        </div>
        <p className="text-gray-600">Filter and view registered accounts across the entire platform.</p>
      </div>

      <Card className="p-6 mb-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select System Role to View
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-gray-700 font-medium appearance-none cursor-pointer shadow-sm"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                disabled={isLoading || isFetchingRoles}
              >
                <option value="ALL" className="font-bold text-indigo-700">All System Roles</option>
                {dynamicRoles.map((role) => (
                  <option key={role.value} value={role.value} className="font-medium">
                    {role.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {isFetchingRoles ? <Loader2 className="h-4 w-4 text-gray-400 animate-spin" /> : 
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => fetchUsers(selectedRole)}
            disabled={isLoading || isFetchingRoles}
            className="flex items-center gap-2 py-3 px-6 shadow-sm"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Refresh List
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            {selectedRole === 'ALL' ? 'All' : dynamicRoles.find(r => r.value === selectedRole)?.label} Accounts
          </h2>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full">
            {users.length} {users.length === 1 ? 'User' : 'Users'} Found
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Fetching user records from database...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Records Found</h3>
            <p className="text-gray-500 max-w-sm">
              There are currently no users assigned to this role in the system.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-bold">Custom ID</th>
                  <th className="p-4 font-bold">System Role</th>
                  <th className="p-4 font-bold">Full Name</th>
                  <th className="p-4 font-bold">Email Address</th>
                  <th className="p-4 font-bold hidden md:table-cell">Date of Birth</th>
                  <th className="p-4 font-bold">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <code className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">
                        {user.id}
                      </code>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{user.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
                        {user.dob ? new Date(user.dob).toLocaleDateString() : '--'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {user.active ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            Inactive
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};