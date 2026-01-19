import { UserPlus } from 'lucide-react';
import { Card, Input, Button } from '../../../components/common';

/**
 * Add User Form Component
 * Reusable form for adding new users
 */
export const AddUserForm = ({ 
  register, 
  handleSubmit, 
  onSubmit, 
  errors, 
  roleOptions, 
  isSubmitting, 
  reset 
}) => {
  return (
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
  );
};
