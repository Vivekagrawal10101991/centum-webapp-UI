// src/admin/Tabs/Employees.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Mail, Phone, Calendar, Loader2, 
  Briefcase, Droplets, CreditCard, ShieldCheck, Eye, UserCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import superAdminService from '../services/superAdminService';
import { ROLE_NAMES } from '../../utils/roles';
import Modal from '../../components/common/Modal';

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  
  // Modal State for viewing full profile
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDirectoryData();
  }, []);

  const fetchDirectoryData = async () => {
    setLoading(true);
    try {
      const [usersResponse, rolesResponse] = await Promise.all([
        superAdminService.getAllUsers(),
        superAdminService.getAllRoles()
      ]);

      const employeeRoleKeys = rolesResponse.filter(role => role !== 'STUDENT' && role !== 'PARENT');
      setAllRoles(employeeRoleKeys);

      const filteredUsers = usersResponse.filter(user => employeeRoleKeys.includes(user.role));
      setUsers(filteredUsers);
      
    } catch (error) {
      toast.error('Failed to fetch employee directory data.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-medium">Loading Employee Directory...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header & Stats Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" /> Employee Directory
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Manage and view details of all internal staff members.</p>
        </div>
        
        {/* Premium Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 min-w-[160px]">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Staff</p>
              <p className="text-2xl font-extrabold text-slate-800 leading-tight">{users.length}</p>
            </div>
          </div>
          
          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 min-w-[160px]">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active</p>
              <p className="text-2xl font-extrabold text-slate-800 leading-tight">{users.filter(u => u.active).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search employees by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:bg-slate-50 outline-none transition-all text-sm font-medium text-slate-700 placeholder:font-normal"
          />
        </div>

        <div className="w-px bg-slate-200 hidden md:block my-2"></div>

        <div className="relative w-full md:w-64 flex-shrink-0">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-transparent rounded-xl focus:bg-slate-50 outline-none transition-all appearance-none text-sm font-semibold text-slate-700 cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            {allRoles.map(role => (
              <option key={role} value={role}>{ROLE_NAMES[role] || role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Employee Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role & ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                    
                    {/* Employee Name & Avatar */}
                    <td className="px-6 py-5 align-middle">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#002B6B] to-blue-500 text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0 text-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role & ID */}
                    <td className="px-6 py-5 align-middle">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 mb-1.5">
                        {ROLE_NAMES[user.role] || user.role}
                      </span>
                      <p className="text-xs font-mono font-medium text-slate-400">{user.id}</p>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5 align-middle">
                      {user.contactNumber ? (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {user.contactNumber}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Not provided</span>
                      )}
                    </td>

                    {/* Status - Upgraded to elegant badges */}
                    <td className="px-6 py-5 align-middle">
                      {user.active ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions - Upgraded to sleek icon button */}
                    <td className="px-6 py-5 align-middle text-right">
                      <button 
                        onClick={() => handleViewProfile(user)}
                        title="View Full Profile"
                        className="inline-flex items-center justify-center w-9 h-9 text-slate-400 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-slate-500 bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4">
                        <Users className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-lg font-bold text-slate-700">No employees found</p>
                      <p className="text-sm mt-1 text-slate-400">Try adjusting your search or role filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal - Remains unchanged as it was already premium */}
      {selectedUser && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Employee Profile"
          size="lg"
        >
          <div className="p-1">
            
            <div className="flex items-center gap-5 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#002B6B] to-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{selectedUser.name}</h2>
                <p className="text-blue-600 font-bold text-xs tracking-wider uppercase mt-1">
                  {ROLE_NAMES[selectedUser.role] || selectedUser.role} • <span className="text-slate-500">{selectedUser.id}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4" /> Professional Info
                  </h3>
                  <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">System Email</p>
                      <p className="text-sm font-semibold text-slate-800 break-all">{selectedUser.email}</p>
                    </div>
                    <div className="h-px w-full bg-slate-100"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date of Joining</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedUser.dateOfJoining || 'Not updated'}</p>
                    </div>
                    <div className="h-px w-full bg-slate-100"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                      <p className={`text-sm font-bold ${selectedUser.active ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {selectedUser.active ? 'Active Employee' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4" /> Identity & Health
                  </h3>
                  <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Aadhar Card</p>
                      <p className="text-sm font-semibold text-slate-800 uppercase tracking-wider">{selectedUser.aadharCard || 'Not updated'}</p>
                    </div>
                    <div className="h-px w-full bg-slate-100"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">PAN Card</p>
                      <p className="text-sm font-semibold text-slate-800 uppercase tracking-wider">{selectedUser.panCard || 'Not updated'}</p>
                    </div>
                    <div className="h-px w-full bg-slate-100"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Blood Group</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedUser.bloodGroup || 'Not updated'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4" /> Personal Contact
                  </h3>
                  <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedUser.contactNumber || 'Not updated'}</p>
                    </div>
                    <div className="h-px w-full bg-slate-100"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Personal Email</p>
                      <p className="text-sm font-semibold text-slate-800 break-all">{selectedUser.personalEmail || 'Not updated'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4" /> Personal Details
                  </h3>
                  <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date of Birth</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedUser.dob || 'Not updated'}</p>
                    </div>
                    <div className="h-px w-full bg-slate-100"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Father's Name</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedUser.fatherName || 'Not updated'}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Employees;