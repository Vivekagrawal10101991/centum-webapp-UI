import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { validators } from '../../../utils/validators';

/**
 * Custom hook for Login functionality
 * Handles login form state and submission logic
 */
export const useLogin = () => {
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
      console.log('Login result in useLogin:', result);

      if (result.success) {
        // Check if this is first login (password needs to be changed)
        const isFirstLogin = 
          result.data.isFirstTimeLogin || 
          result.data.firstLogin || 
          result.data.user?.isFirstTimeLogin || 
          result.data.user?.firstLogin ||
          result.data.isFirstLogin;
        
        if (isFirstLogin) {
          authService.setFirstLogin(true);
          
          toast.success('Login successful! Please change your password.', {
            duration: 3000,
            position: 'top-center',
          });
          
          navigate('/change-password');
        } else {
          const dashboardRoute = result.dashboardRoute || '/dashboard';
          console.log('Navigating to dashboard:', dashboardRoute);
          
          toast.success('Login successful! Welcome back.', {
            duration: 3000,
            position: 'top-center',
          });
          
          // Use window.location to force page reload and reinitialize admin context
          setTimeout(() => {
            window.location.href = dashboardRoute;
          }, 500);
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

  return {
    isSubmitting,
    register,
    handleSubmit,
    errors,
    onSubmit,
    validators,
  };
};
