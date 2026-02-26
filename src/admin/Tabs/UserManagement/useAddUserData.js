import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { superAdminService } from '../../services/superAdminService';
import { validators } from '../../../utils/validators';
import { ROLES } from '../../../utils/roles';

/**
 * Custom hook for Add User functionality
 * Handles form state, validation, and submission
 */
export const useAddUserData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Updated role dropdown options to include Reporting Manager
  const roleOptions = [
    { value: ROLES.ADMIN, label: 'Admin' },
    { value: ROLES.TECHNICAL_HEAD, label: 'Technical Head' },
    { value: ROLES.FACULTY, label: 'Faculty' }, 
    { value: ROLES.COORDINATOR, label: 'Coordinator' },
    { value: ROLES.OPERATIONS_MANAGER, label: 'Operations Manager' },
    { value: ROLES.REPORTING_MANAGER, label: 'Reporting Manager' }, // <--- ADDED REPORTING MANAGER
    { value: ROLES.HR, label: 'HR' },
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

  return {
    isSubmitting,
    register,
    handleSubmit,
    errors,
    reset,
    roleOptions,
    onSubmit,
    navigate,
    validators,
  };
};