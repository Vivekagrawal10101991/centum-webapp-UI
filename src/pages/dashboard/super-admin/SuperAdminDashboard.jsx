import { Users, UserPlus, UserX, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/common';

/**
 * Super Admin Dashboard
 * Main dashboard for super administrator
 */
const SuperAdminDashboard = () => {
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
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.path}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <div className={`w-16 h-16 rounded-full bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">--</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">--</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">--</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">--</p>
            <p className="text-sm text-gray-600">Roles</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
