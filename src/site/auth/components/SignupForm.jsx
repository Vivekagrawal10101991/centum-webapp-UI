import { Link } from 'react-router-dom';
import { Input, Button, Card } from '../../../components/common';

/**
 * SignupForm Component
 * Signup form UI presentation
 */
export const SignupForm = ({ 
  handleSubmit, 
  onSubmit, 
  register, 
  errors, 
  password, 
  isSubmitting, 
  validators 
}) => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Centum Academy today</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <Input
              label="Full Name"
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
              required
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                validate: (value) =>
                  validators.isValidEmail(value) || 'Please enter a valid email address',
              })}
            />

            {/* Phone */}
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              required
              error={errors.phone?.message}
              {...register('phone', {
                required: 'Phone number is required',
                validate: (value) =>
                  validators.isValidPhone(value) || 'Please enter a valid 10-digit phone number',
              })}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
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

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              required
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary-600 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
