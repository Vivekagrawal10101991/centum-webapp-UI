import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserX, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, Input, Button } from '../../../components/common';
import { superAdminService } from '../../../services/superAdminService';

/**
 * Delete User Page
 * Remove users from system
 */
const DeleteUserPage = () => {
  const [customUserId, setCustomUserId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!customUserId.trim()) {
      toast.error('Please enter a user ID', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeleting(true);
    try {
      await superAdminService.deleteUser(customUserId.trim());
      
      toast.success('User deleted successfully!', {
        duration: 3000,
        position: 'top-center',
      });

      setCustomUserId('');
      setShowConfirm(false);
    } catch (error) {
      toast.error(error || 'Failed to delete user', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <UserX className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Delete User</h1>
          </div>
          <p className="text-gray-600">Remove a user from the system</p>
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

      {/* Delete Form */}
      <Card className="p-8 max-w-2xl">
        <div className="space-y-6">
          {/* Input */}
          <Input
            label="Custom User ID"
            placeholder="Enter the custom user ID"
            value={customUserId}
            onChange={(e) => {
              setCustomUserId(e.target.value);
              setShowConfirm(false);
            }}
            required
          />

          {/* Warning Message */}
          {showConfirm && (
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">
                    Confirm Deletion
                  </h3>
                  <p className="text-sm text-red-800 mb-3">
                    Are you sure you want to delete this user? This action cannot be undone.
                    The user with ID "{customUserId}" will be permanently removed from the system.
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleDelete}
                      loading={isDeleting}
                      className="flex items-center space-x-2"
                    >
                      <UserX className="w-4 h-4" />
                      <span>Yes, Delete User</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          {!showConfirm && (
            <div className="flex space-x-4">
              <Button
                variant="danger"
                size="lg"
                onClick={handleDelete}
                disabled={!customUserId.trim()}
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <UserX className="w-5 h-5" />
                <span>Delete User</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setCustomUserId('')}
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 mt-6 max-w-2xl bg-yellow-50 border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-2 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Important Information:</span>
        </h3>
        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
          <li>Cannot delete SUPER_ADMIN users</li>
          <li>This action is permanent and cannot be undone</li>
          <li>All user data will be permanently removed</li>
          <li>User's associated records may also be affected</li>
          <li>You must enter the exact custom user ID</li>
        </ul>
      </Card>
    </div>
  );
};

export default DeleteUserPage;
