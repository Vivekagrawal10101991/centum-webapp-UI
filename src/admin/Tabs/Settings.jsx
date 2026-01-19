import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, Input, Button } from '../../components/common';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('change-password');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useAuth();
  const isFirstLogin = authService.isFirstLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      console.log('Password change response:', response);

      if (response.token) {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('authToken', response.token);
        
        const userData = {
          role: response.role,
          email: response.email,
          permissions: response.permissions || [],
          name: response.name || response.email,
        };
        
        localStorage.setItem('adminUser', JSON.stringify(userData));
        localStorage.setItem('user', JSON.stringify(userData));
      }

      authService.setFirstLogin(false);

      toast.success('Password changed successfully!', {
        duration: 3000,
        position: 'top-center',
      });

      reset();

      if (isFirstLogin) {
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (error) {
      console.error('Password change error:', error);
      toast.error(error || 'Failed to change password', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>
        <Shield className="w-10 h-10 text-primary" />
      </div>

      {isFirstLogin && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">
                First Time Login - Password Change Required
              </h3>
              <p className="text-sm text-yellow-800">
                For security reasons, you must change your password before accessing your dashboard.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('change-password')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'change-password'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Change Password
          </button>
        </nav>
      </div>

      {activeTab === 'change-password' && (
        <Card className="p-6">
          <div className="max-w-2xl">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Update your password to keep your account secure
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative">
                <Input
                  label="Current Password"
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  required
                  error={errors.currentPassword?.message}
                  {...register('currentPassword', {
                    required: 'Current password is required',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="New Password"
                  type={showNew ? 'text' : 'password'}
                  placeholder="Enter new password"
                  required
                  error={errors.newPassword?.message}
                  {...register('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    validate: (value) =>
                      value !== watch('currentPassword') ||
                      'New password must be different from current password',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm New Password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  required
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === newPassword || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                  Password Requirements:
                </h3>
                <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                  <li>At least 6 characters long</li>
                  <li>Must be different from current password</li>
                  <li>Use a strong, unique password</li>
                </ul>
              </Card>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Settings;
