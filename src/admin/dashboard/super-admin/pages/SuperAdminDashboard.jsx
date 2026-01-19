import { Users, UserPlus, UserX, Search } from 'lucide-react';
import { FeatureCard, SystemStats } from '../components';

/**
 * Super Admin Dashboard Container
 * Main dashboard for super administrator
 */
export const SuperAdminDashboard = () => {
  const features = [
    {
      title: 'Add User',
      description: 'Create new users with different roles',
      icon: UserPlus,
      path: '/dashboard/super-admin/add-user',
      color: 'green',
    },
    {
      title: 'Get Users',
      description: 'View and search users by role',
      icon: Search,
      path: '/dashboard/super-admin/get-users',
      color: 'blue',
    },
    {
      title: 'Delete User',
      description: 'Remove users from the system',
      icon: UserX,
      path: '/dashboard/super-admin/delete-user',
      color: 'red',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users and system configuration</p>
      </div>

      {/* User Management Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <SystemStats />
    </div>
  );
};
