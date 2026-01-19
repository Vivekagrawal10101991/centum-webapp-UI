import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { validators } from '../../../utils/validators';

/**
 * Custom hook for Signup functionality
 * Handles signup form state and submission logic
 */
export const useSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Remove confirmPassword before sending to API
    const { confirmPassword, ...signupData } = data;

    try {
      const result = await signup(signupData);

      if (result.success) {
        toast.success('Account created successfully! Please login to continue.', {
          duration: 4000,
          position: 'top-center',
        });
        navigate('/login');
      } else {
        toast.error(result.error || 'Signup failed. Please try again.', {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.', {
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
    password,
    onSubmit,
    validators,
  };
};
