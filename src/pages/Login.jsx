import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input, Button, Card } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { validators } from '../utils/validators';

/**
 * Login Page
 * User authentication page
 */
const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = await login(data);

      if (result.success) {
        // Check if this is first login (password needs to be changed)
        // Check multiple possible field names for first-time login flag
        const isFirstLogin = 
          result.data.isFirstTimeLogin || 
          result.data.firstLogin || 
          result.data.user?.isFirstTimeLogin || 
          result.data.user?.firstLogin ||
          result.data.isFirstLogin;
        
        if (isFirstLogin) {
          // Set first login flag
          authService.setFirstLogin(true);
          
          toast.success('Login successful! Please change your password.', {
            duration: 3000,
            position: 'top-center',
          });
          
          // Redirect to change password page
          navigate('/change-password');
        } else {
          toast.success('Login successful! Welcome back.', {
            duration: 3000,
            position: 'top-center',
          });
          // Redirect to role-specific dashboard
          navigate(result.dashboardRoute || '/');
        }
      } else {
        toast.error(result.error || 'Login failed. Please check your credentials.', {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error?.message || 'An unexpected error occurred. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-600 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary hover:text-primary-600 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
