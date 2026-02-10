import React from 'react';
import { Users, UserPlus, UserX, Search } from 'lucide-react';
import { FeatureCard } from '../components';
import { useAuth } from '../../../context/AuthContext';
import { canAccessRoute } from '../../../helpers/navigationPermissions';

/**
 * User Management Landing Page
 * Central hub for Add, Get, and Delete user actions
 */
const UserManagement = () => {
  const { user } = useAuth();

  const userManagementFeatures = [
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

  // Filter based on user permissions
  const filteredFeatures = userManagementFeatures.filter(feature => 
    canAccessRoute(feature.path, user)
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
        <p className="text-gray-600 mt-2">Centralized control for system access and user accounts</p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Administrative Actions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredFeatures.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;