import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserX, ArrowLeft, AlertTriangle, Search, User, Mail, ShieldAlert, Loader2 } from 'lucide-react';
import { Card, Input, Button } from '../../../components/common';
import { superAdminService } from '../../services/superAdminService';
import { useAuth } from '../../context/AuthContext';

/**
 * Delete User Page Container
 * Fetch by email, confirm via checkbox, and delete
 */
export const DeleteUserPage = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  
  // Deletion States
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsSearching(true);
    setFoundUser(null);
    setIsConfirmed(false);

    try {
      const res = await superAdminService.getUserByEmail(email.trim());
      
      if (res && res.data) {
        setFoundUser(res.data);
      } else if (res && res.email) {
        setFoundUser(res);
      } else {
        toast.error('No user found with that email address');
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error?.response?.data?.message || 'Failed to find user. Ensure the email is correct.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleDelete = async () => {
    // ✅ FIX: Check for both 'id' and 'customUserId' depending on how the backend maps it
    const userIdToDelete = foundUser?.customUserId || foundUser?.id;

    if (!foundUser || !userIdToDelete) {
      toast.error('Invalid user data. Missing User ID.');
      return;
    }

    if (!isConfirmed) {
      toast.error('Please check the confirmation box first.');
      return;
    }

    setIsDeleting(true);
    try {
      // Pass the correctly identified ID
      await superAdminService.deleteUser(userIdToDelete);
      
      toast.success('User deleted successfully!', {
        duration: 3000,
        position: 'top-center',
      });

      // Reset everything after successful deletion
      setEmail('');
      setFoundUser(null);
      setIsConfirmed(false);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete user', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClear = () => {
    setEmail('');
    setFoundUser(null);
    setIsConfirmed(false);
  };

  const handleBack = () => {
    const basePath = user?.role === 'HR' ? '/dashboard/hr' : '/dashboard/super-admin';
    navigate(`${basePath}/user-management`);
  };

  return (
    <div className="animate-fade-in pb-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Delete User</h1>
          </div>
          <p className="text-gray-600">Search by email to locate and remove a user account</p>
        </div>
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center space-x-2 bg-white shadow-sm hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to List</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl">
        
        {/* Left Column: Search & Action */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6 shadow-sm border border-gray-100">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Search User by Email</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                      placeholder="e.g. employee@centumacademy.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (foundUser) setFoundUser(null);
                      }}
                      disabled={isSearching || isDeleting}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={!email.trim() || isSearching}
                    className="flex items-center gap-2 px-6"
                  >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* User Details & Deletion Confirmation */}
          {foundUser && (
            <Card className="overflow-hidden border border-red-100 shadow-md animate-in slide-in-from-bottom-4 duration-300">
              <div className="bg-red-50 border-b border-red-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-red-900">User Account Found</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* User Data Display */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Full Name</p>
                    <p className="font-bold text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" /> {foundUser.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">System Role</p>
                    <p className="font-bold text-indigo-700">
                      {foundUser.role || 'N/A'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Account Email</p>
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" /> {foundUser.email || 'N/A'}
                    </p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Custom User ID (For Internal System Deletion)</p>
                    <code className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-800 font-mono">
                      {foundUser.customUserId || foundUser.id || 'ID_MISSING'}
                    </code>
                  </div>
                </div>

                {/* Protection logic for Super Admins */}
                {foundUser.role === 'SUPER_ADMIN' ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-yellow-800">
                      Security Exception: You cannot delete another SUPER_ADMIN account from this interface.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Confirmation Checkbox */}
                    <label className="flex items-start gap-3 p-4 border-2 border-red-100 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-600 cursor-pointer"
                          checked={isConfirmed}
                          onChange={(e) => setIsConfirmed(e.target.checked)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-red-900">I understand the consequences</span>
                        <span className="text-xs text-red-700 mt-1">
                          By checking this box, I confirm that I want to permanently delete <strong>{foundUser.name}</strong>'s account. This will erase their data, access, and history. This action cannot be undone.
                        </span>
                      </div>
                    </label>

                    {/* Final Action Buttons */}
                    <div className="flex space-x-4 pt-2">
                      <Button
                        variant="danger"
                        size="lg"
                        onClick={handleDelete}
                        disabled={!isConfirmed || isDeleting}
                        className="flex-1 flex items-center justify-center space-x-2"
                      >
                        {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserX className="w-5 h-5" />}
                        <span>{isDeleting ? 'Deleting...' : 'Permanently Delete User'}</span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={handleClear}
                        disabled={isDeleting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Warning Information */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-slate-50 border-slate-200 h-full">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Deletion Rules & Info
            </h3>
            <ul className="text-sm text-slate-700 space-y-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                <p><strong>Irreversible Action:</strong> Deleting a user account completely wipes their authentication records from the system permanently.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                <p><strong>Cascading Data:</strong> Associated HR records, LMS enrollments, and attendance logs linked to this user may also be affected or deleted based on database rules.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                <p><strong>Super Admin Protection:</strong> Users with the <code>SUPER_ADMIN</code> role are locked and cannot be deleted via this tool to prevent system lockouts.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                <p><strong>Email Accuracy:</strong> Please ensure you double-check the email address before confirming the deletion to avoid removing the wrong employee.</p>
              </li>
            </ul>
          </Card>
        </div>

      </div>
    </div>
  );
};