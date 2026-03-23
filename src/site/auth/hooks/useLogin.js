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
        const isFirstLogin = result.data.firstLogin === true;
        
        if (isFirstLogin) {
          authService.setFirstLogin(true);
          
          toast.success(result.data.message || 'Login successful! Please change your password.', {
            duration: 3000,
            position: 'top-center',
          });
          
          setTimeout(() => {
            window.location.href = result.dashboardRoute + '/settings';
          }, 500);
        } else {
          const dashboardRoute = result.dashboardRoute || '/dashboard';
          
          toast.success('Login successful! Welcome back.', {
            duration: 3000,
            position: 'top-center',
          });
          
          setTimeout(() => {
            window.location.href = dashboardRoute;
          }, 500);
        }
      } else {
        // ✅ FIX: Force the message to be exactly "Invalid Credentials" 
        // unless it is specifically a network connection error.
        let errorMessage = 'Invalid Credentials';
        
        if (typeof result.error === 'string' && result.error.toLowerCase().includes('network')) {
          errorMessage = result.error;
        }

        toast.error(errorMessage, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Login error catch block:', error);
      
      // ✅ FIX: Fallback catch block also shows "Invalid Credentials"
      toast.error('Invalid Credentials', {
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