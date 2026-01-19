import { 
  Users, 
  UserPlus, 
  UserX, 
  Search, 
  BarChart, 
  Megaphone, 
  Award, 
  BookOpen, 
  Star, 
  Video, 
  MessageCircle 
} from 'lucide-react';
import { FeatureCard, SystemStats } from '../components';
import { useAuth } from '../../../context/AuthContext';
import { canAccessRoute } from '../../../helpers/navigationPermissions';

/**
 * Super Admin Dashboard Container
 * Main dashboard for super administrator
 */
export const SuperAdminDashboard = () => {
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

  const contentManagementFeatures = [
    {
      title: 'Dashboard Analytics',
      description: 'View website statistics and activity',
      icon: BarChart,
      path: '/dashboard/super-admin/dashboard',
      color: 'blue',
    },
    {
      title: 'Promotions & Banners',
      description: 'Manage hero banners and announcements',
      icon: Megaphone,
      path: '/dashboard/super-admin/promotions-banners',
      color: 'purple',
    },
    {
      title: 'Academics & Results',
      description: 'Manage toppers, results, and achievers',
      icon: Award,
      path: '/dashboard/super-admin/academics-results',
      color: 'yellow',
    },
    {
      title: 'Course Management',
      description: 'Manage courses and video library',
      icon: BookOpen,
      path: '/dashboard/super-admin/course-management',
      color: 'green',
    },
    {
      title: 'Social Proof',
      description: 'Manage testimonials and success stories',
      icon: Star,
      path: '/dashboard/super-admin/social-proof',
      color: 'orange',
    },
    {
      title: 'Media Center',
      description: 'Manage blogs, videos, and team',
      icon: Video,
      path: '/dashboard/super-admin/media-center',
      color: 'red',
    },
    {
      title: 'Leads & Enquiries',
      description: 'Manage contact forms and admissions',
      icon: MessageCircle,
      path: '/dashboard/super-admin/leads-enquiries',
      color: 'teal',
    },
  ];

  // Filter features based on user permissions
  const filteredUserManagementFeatures = userManagementFeatures.filter(feature => 
    canAccessRoute(feature.path, user)
  );

  const filteredContentManagementFeatures = contentManagementFeatures.filter(feature => 
    canAccessRoute(feature.path, user)
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users, content, and system configuration</p>
      </div>

      {/* User Management Section */}
      {filteredUserManagementFeatures.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredUserManagementFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      )}

      {/* Content Management Section */}
      {filteredContentManagementFeatures.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredContentManagementFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <SystemStats />
    </div>
  );
};
