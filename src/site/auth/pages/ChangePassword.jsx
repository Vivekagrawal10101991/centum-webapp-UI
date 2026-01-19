import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Card, Input, Button } from '../../../components/common';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

/**
 * Change Password Page
 * Mandatory for first-time login users
 */
const ChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { getUserDashboard } = useAuth();
  const isFirstLogin = authService.isFirstLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      // Clear first login flag
      authService.setFirstLogin(false);

      toast.success('Password changed successfully!', {
        duration: 3000,
        position: 'top-center',
      });

      // Redirect to dashboard
      setTimeout(() => {
        navigate(getUserDashboard());
      }, 1000);
    } catch (error) {
      toast.error(error || 'Failed to change password', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* First Login Notice */}
        {isFirstLogin && (
          <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">
                  First Time Login
                </h3>
                <p className="text-sm text-yellow-800">
                  For security reasons, you must change your password before accessing your dashboard.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Card */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
            <p className="text-gray-600">
              {isFirstLogin ? 'Set your new password' : 'Update your account password'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Password */}
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

            {/* New Password */}
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

            {/* Confirm New Password */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="w-full"
            >
              Change Password
            </Button>
          </form>

          {/* Password Requirements */}
          <Card className="p-4 mt-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm">
              Password Requirements:
            </h3>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>At least 6 characters long</li>
              <li>Must be different from current password</li>
              <li>Use a strong, unique password</li>
            </ul>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
