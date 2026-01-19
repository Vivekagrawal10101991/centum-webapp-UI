import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Input, Select, Textarea, Button } from '../../../components/common';
import { enquiryService } from '../../services/enquiryService';
import { validators } from '../../../utils/validators';

/**
 * EnquiryForm Component
 * Reusable form for lead generation
 * Can be used in Modal or embedded on Contact page
 */
const EnquiryForm = ({ onSuccess, embedded = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const courseOptions = [
    { value: 'JEE', label: 'JEE Preparation' },
    { value: 'NEET', label: 'NEET Preparation' },
    { value: 'FOUNDATIONAL', label: 'Foundation Course' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await enquiryService.submitEnquiry(data);
      
      toast.success('Enquiry submitted successfully! We will contact you soon.', {
        duration: 4000,
        position: 'top-center',
      });
      
      reset(); // Clear form
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error || 'Failed to submit enquiry. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {embedded && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-600">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
      )}

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

      {/* Location */}
      <Input
        label="Location"
        placeholder="Enter your city/location"
        required
        error={errors.location?.message}
        {...register('location', {
          required: 'Location is required',
        })}
      />

      {/* Course */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Interested In
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
            errors.course ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('course', {
            required: 'Please select a course',
          })}
        >
          <option value="">Select a course</option>
          {courseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.course && (
          <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
        )}
      </div>

      {/* Message */}
      <Textarea
        label="Message (Optional)"
        placeholder="Any specific questions or requirements?"
        rows={4}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        className="w-full"
      >
        Submit Enquiry
      </Button>
    </form>
  );
};

export default EnquiryForm;
