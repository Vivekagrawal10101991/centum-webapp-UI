import { UserPlus, ArrowLeft } from 'lucide-react';
import { Card, Button } from '../../../../components/common';
import { useAddUserData } from '../hooks';
import { AddUserForm } from '../components';

/**
 * Add User Page Container
 * Form to create new users
 */
export const AddUserPage = () => {
  const {
    isSubmitting,
    register,
    handleSubmit,
    errors,
    reset,
    roleOptions,
    onSubmit,
    navigate,
    validators,
  } = useAddUserData();

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
      <AddUserForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        roleOptions={roleOptions}
        isSubmitting={isSubmitting}
        reset={reset}
      />

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
