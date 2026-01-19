import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Card, Input, Select, Button } from '../../../components/common';
import { superAdminService } from '../../../services/superAdminService';
import { validators } from '../../../utils/validators';
import { ROLES } from '../../../utils/roles';

/**
 * Add User Page
 * Form to create new users
 */
const AddUserPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const roleOptions = [
    { value: ROLES.ADMIN, label: 'Admin' },
    { value: ROLES.TECHNICAL_HEAD, label: 'Technical Head' },
    { value: ROLES.TEACHER, label: 'Teacher' },
    { value: ROLES.STUDENT, label: 'Student' },
    { value: ROLES.PARENT, label: 'Parent' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await superAdminService.addUser(data);
      
      toast.success('User created successfully!', {
        duration: 3000,
        position: 'top-center',
      });

      reset();
      // Optionally navigate back
      // navigate('/dashboard/super-admin');
    } catch (error) {
      toast.error(error || 'Failed to create user', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <UserPlus className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
          </div>
          <p className="text-gray-600">Create a new user account with specific role</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/super-admin')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Form */}
      <Card className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <Input
            label="Full Name"
            placeholder="Enter full name"
            required
            error={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            required
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              validate: (value) =>
                validators.isValidEmail(value) || 'Please enter a valid email',
            })}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            required
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />

          {/* Date of Birth */}
          <Input
            label="Date of Birth"
            type="date"
            required
            error={errors.dob?.message}
            {...register('dob', {
              required: 'Date of birth is required',
            })}
          />

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('role', {
                required: 'Please select a role',
              })}
            >
              <option value="">Select role</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="flex-1"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create User
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      {/* Info Card */}
      <Card className="p-6 mt-6 max-w-2xl bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>User will receive login credentials via email (if configured)</li>
          <li>User must change password on first login</li>
          <li>All fields are required to create a user</li>
          <li>Email must be unique in the system</li>
        </ul>
      </Card>
    </div>
  );
};

export default AddUserPage;
