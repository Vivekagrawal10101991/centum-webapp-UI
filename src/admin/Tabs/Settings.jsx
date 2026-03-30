// src/admin/Tabs/Settings.jsx
import React, { useState, useEffect } from 'react';
import { 
    UserCircle, Mail, Phone, Calendar, Save, CreditCard, Droplets, 
    Briefcase, Loader2, Key, ShieldCheck, Lock, Eye, EyeOff 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';
import { authService } from '../services/authService'; 
import { ROLE_NAMES } from '../../utils/roles';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile, security

  // Password Visibility States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Read Only
    role: '',  // Read Only
    id: '',    // Read Only
    dob: '',
    fatherName: '',
    personalEmail: '',
    contactNumber: '',
    aadharCard: '',
    panCard: '',
    bloodGroup: '',
    dateOfJoining: '',
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const res = await userService.getMyProfile();
    if (res.success && res.data) {
      const d = res.data;
      setFormData({
        name: d.name || '',
        email: d.email || '',
        role: d.role || '',
        id: d.id || '',
        dob: d.dob || '',
        fatherName: d.fatherName || '',
        personalEmail: d.personalEmail || '',
        contactNumber: d.contactNumber || '',
        aadharCard: d.aadharCard || '',
        panCard: d.panCard || '',
        bloodGroup: d.bloodGroup || '',
        dateOfJoining: d.dateOfJoining || '',
      });
    } else {
      toast.error(res.message || "Failed to load profile.");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      name: formData.name,
      dob: formData.dob || null,
      fatherName: formData.fatherName,
      personalEmail: formData.personalEmail,
      contactNumber: formData.contactNumber,
      aadharCard: formData.aadharCard,
      panCard: formData.panCard,
      bloodGroup: formData.bloodGroup,
      dateOfJoining: formData.dateOfJoining || null,
    };

    const res = await userService.updateMyProfile(payload);
    
    if (res.success) {
      toast.success('Profile updated successfully!');
      fetchProfile(); 
    } else {
      toast.error(res.message || "Failed to update profile.");
    }
    setSaving(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword.length < 8) {
        toast.error('New password must be at least 8 characters long.');
        return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('New passwords do not match.');
        return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
        toast.error('New password must be different from the current one.');
        return;
    }

    setChangingPassword(true);
    
    try {
        const payload = {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        };
        
        const res = await authService.changePassword(payload);
        
        if (res.success) {
            toast.success('Password changed successfully!');
            // Clear the form and hide passwords again
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        } else {
            // As requested, display "Invalid credentials" if it fails
            toast.error('Invalid credentials');
        }
    } catch (error) {
        // Fallback catch for server errors
        toast.error('Invalid credentials');
    } finally {
        setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-2">Manage your personal information and security preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 mb-8">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`pb-3 font-semibold text-sm px-2 flex items-center gap-2 transition-all ${activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <UserCircle className="w-4 h-4" /> Personal Profile
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`pb-3 font-semibold text-sm px-2 flex items-center gap-2 transition-all ${activeTab === 'security' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Key className="w-4 h-4" /> Security
        </button>
      </div>

      {/* ================= PROFILE TAB ================= */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-8">
          
          {/* Section 1: System Info (Read Only) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-400" /> System Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">User ID</label>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-mono text-sm">{formData.id}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Email (Login)</label>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-sm">{formData.email}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">System Role</label>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold text-blue-700 bg-blue-50/50">
                  {ROLE_NAMES[formData.role] || formData.role}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">* System information is read-only. Contact administration for changes.</p>
          </div>

          {/* Section 2: Personal Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-blue-500" /> General Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter father's name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Date of Joining
                </label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Identity Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-500" /> Contact & Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="+91 00000 00000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Personal Email ID
                </label>
                <input
                  type="email"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="personal@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <CreditCard className="w-3 h-3" /> Aadhar Card Number
                </label>
                <input
                  type="text"
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase"
                  placeholder="0000 0000 0000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <CreditCard className="w-3 h-3" /> PAN Card Number
                </label>
                <input
                  type="text"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase"
                  placeholder="ABCDE1234F"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <Droplets className="w-3 h-3 text-red-500" /> Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </div>
        </form>
      )}

      {/* ================= SECURITY TAB ================= */}
      {activeTab === 'security' && (
        <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Info Banner */}
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="text-sm font-bold text-blue-900 mb-1">Secure Your Account</h3>
                    <p className="text-sm text-blue-700/80">
                        Ensure your account is using a strong, unique password. Do not share your password with anyone.
                    </p>
                </div>
            </div>

            {/* Change Password Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
                <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-slate-500" /> Change Password
                </h2>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                    
                    {/* Current Password Field */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 pr-12 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter current password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100"></div>

                    {/* New Password Field */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 pr-12 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter new password (min. 8 characters)"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 pr-12 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                placeholder="Confirm your new password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-start pt-4">
                        <button
                            type="submit"
                            disabled={changingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {changingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Key className="w-5 h-5" />}
                            {changingPassword ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default Settings;