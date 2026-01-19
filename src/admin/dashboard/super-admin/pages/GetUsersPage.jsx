import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, ArrowLeft, User, Mail, Calendar, Shield } from 'lucide-react';
import { Card, Button, Select } from '../../../../components/common';
import { superAdminService } from '../../../services/superAdminService';
import { ROLES, ROLE_NAMES } from '../../../../utils/roles';

/**
 * Get Users Page Container
 * View users by role
 */
export const GetUsersPage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const roleOptions = [
    { value: ROLES.ADMIN, label: 'Admin' },
    { value: ROLES.TECHNICAL_HEAD, label: 'Technical Head' },
    { value: ROLES.TEACHER, label: 'Teacher' },
    { value: ROLES.STUDENT, label: 'Student' },
    { value: ROLES.PARENT, label: 'Parent' },
  ];

  const handleSearch = async () => {
    if (!selectedRole) {
      toast.error('Please select a role', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await superAdminService.getUsersByRole(selectedRole);
      setUsers(data);
      
      if (data.length === 0) {
        toast.info('No users found for this role', {
          duration: 3000,
          position: 'top-center',
        });
      } else {
        toast.success(`Found ${data.length} user(s)`, {
          duration: 2000,
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error(error || 'Failed to fetch users', {
        duration: 4000,
        position: 'top-center',
      });
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Search className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Get Users</h1>
          </div>
          <p className="text-gray-600">Search and view users by role</p>
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

      {/* Search Section */}
      <Card className="p-6 mb-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a role...</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="primary"
            onClick={handleSearch}
            loading={isLoading}
            className="flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Button>
        </div>
      </Card>

      {/* Results */}
      {users.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Results ({users.length})
          </h2>
          <div className="space-y-4">
            {users.map((user, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="font-medium text-gray-900">
                        {ROLE_NAMES[user.role] || user.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">User ID</p>
                      <p className="font-medium text-gray-900">
                        {user.id || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* No Results */}
      {!isLoading && users.length === 0 && selectedRole && (
        <Card className="p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
          <p className="text-gray-500">
            No users found for the selected role. Try another role.
          </p>
        </Card>
      )}
    </div>
  );
};

