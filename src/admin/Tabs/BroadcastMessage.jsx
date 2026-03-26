import React, { useState, useEffect } from 'react';
import { Send, AlertTriangle, Users } from 'lucide-react';
import Button from '../../components/common/Button';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import notificationService from '../services/notificationService';
import api from '../../services/api'; // Use direct API call to bypass missing service methods

const BroadcastMessage = () => {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('NORMAL');
  const [targetRole, setTargetRole] = useState('');
  
  const [users, setUsers] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const getUserId = (u) => u.id || u.userId || u._id || u.email;

  // 1. Fetch Users on Mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Direct API call to the endpoint we created
        const response = await api.get('/api/super-admin/manage-users/get/all');
        
        // Axios wraps the backend raw array inside its own 'data' property
        const allUsers = response.data || [];

        if (Array.isArray(allUsers) && allUsers.length > 0) {
          setUsers(allUsers);

          // Extract unique roles, excluding students and parents
          const uniqueRoles = [...new Set(allUsers.map(u => u.role))]
            .filter(role => role && role !== 'STUDENT' && role !== 'PARENT');
          
          const roleOptions = uniqueRoles.map(role => ({
            value: role,
            label: role.replace(/_/g, ' ') 
          }));

          setAvailableRoles([
            { value: 'ALL', label: 'All Employees (Entire Company)' },
            ...roleOptions
          ]);
        }
      } catch (error) {
        console.error("Error fetching users for broadcast:", error);
      }
    };
    
    fetchUsers();
  }, []);

  // 2. Handle Role Selection Change
  useEffect(() => {
    if (!targetRole) {
      setFilteredUsers([]);
      setSelectedUserIds([]);
      return;
    }

    let matchingUsers = [];
    if (targetRole === 'ALL') {
      matchingUsers = users.filter(u => u.role !== 'STUDENT' && u.role !== 'PARENT');
    } else {
      matchingUsers = users.filter(u => u.role === targetRole);
    }

    setFilteredUsers(matchingUsers);
    setSelectedUserIds([]); 
  }, [targetRole, users]);

  // 3. Handle Individual Checkbox Toggle
  const handleToggleUser = (user) => {
    const uid = getUserId(user);
    if (!uid) return;

    setSelectedUserIds(prev => 
      prev.includes(uid) 
        ? prev.filter(id => id !== uid) 
        : [...prev, uid] 
    );
  };

  // 4. Handle "Select All" / "Deselect All" button
  const handleToggleAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]); // Deselect all
    } else {
      setSelectedUserIds(filteredUsers.map(u => getUserId(u)).filter(Boolean)); 
    }
  };

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setStatus({ type: 'error', msg: 'Please enter a message.' });
      return;
    }
    if (selectedUserIds.length === 0) {
      setStatus({ type: 'error', msg: 'Please select at least one person to receive this message.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      const payload = {
        message: message,
        priority: priority,
        receiverIds: selectedUserIds
      };

      const response = await notificationService.sendNotification(payload);
      
      if (response.success) {
        setStatus({ type: 'success', msg: `Successfully sent to ${selectedUserIds.length} employee(s)!` });
        setMessage(''); 
        setPriority('NORMAL');
        setTargetRole(''); 
        setSelectedUserIds([]);
      } else {
        setStatus({ type: 'error', msg: response.message || 'Failed to send broadcast.' });
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'An error occurred while sending the broadcast.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Internal Broadcast</h1>
        <p className="text-gray-600 mt-1">Target specific departments or individual employees.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {status.msg && (
          <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
            status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {status.type === 'error' && <AlertTriangle size={20} />}
            <p className="font-medium">{status.msg}</p>
          </div>
        )}

        <form onSubmit={handleSendBroadcast} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role</label>
              <Select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                options={[
                  { value: '', label: 'Select a Department / Role...' },
                  ...availableRoles
                ]}
                className="w-full capitalize"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message Priority</label>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                options={[
                  { value: 'NORMAL', label: 'Normal (Standard Notification)' },
                  { value: 'IMPORTANT', label: 'Important (Highlighted in Red)' }
                ]}
                className="w-full"
              />
            </div>
          </div>

          {/* === SELECT PERSON FILTER UI === */}
          {targetRole && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Users size={16} className="text-blue-600" />
                  Select Person(s)
                  <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs ml-2">
                    {selectedUserIds.length} selected
                  </span>
                </div>
                
                {filteredUsers.length > 0 && (
                  <button 
                    type="button"
                    onClick={handleToggleAll}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100"
                  >
                    {selectedUserIds.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>

              <div className="max-h-56 overflow-y-auto custom-scrollbar border border-slate-200 bg-white rounded-lg">
                {filteredUsers.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    No users found assigned to this role.
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {filteredUsers.map((u, index) => {
                      const uid = getUserId(u);
                      return (
                        <li key={uid || index}>
                          <label className="flex items-center px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors group">
                            <input 
                              type="checkbox" 
                              checked={selectedUserIds.includes(uid)}
                              onChange={() => handleToggleUser(u)}
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 transition-all cursor-pointer"
                            />
                            <div className="ml-3 flex flex-col">
                              <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                                {u.name}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">
                                {u.email || uid}
                              </span>
                            </div>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Broadcast Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your announcement here... (Employees cannot reply to this message)"
              rows={5}
              className="w-full resize-none"
              required
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button 
              type="submit" 
              disabled={loading || selectedUserIds.length === 0}
              className={`flex items-center gap-2 px-6 py-2.5 ${selectedUserIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending Broadcast...' : (
                <>
                  <Send size={18} />
                  Send to {selectedUserIds.length} Dashboard(s)
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BroadcastMessage;