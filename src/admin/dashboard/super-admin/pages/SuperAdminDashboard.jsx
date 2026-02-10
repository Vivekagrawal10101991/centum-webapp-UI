import { 
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
 * Super Admin Overview Dashboard
 * Focuses on Content Management and System Analytics
 */
export const SuperAdminDashboard = () => {
  const { user } = useAuth();

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

  const filteredContentManagementFeatures = contentManagementFeatures.filter(feature => 
    canAccessRoute(feature.path, user)
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <p className="text-gray-600 mt-2">Monitor system activity and manage website content</p>
      </div>

      {/* Content Management Section */}
      {filteredContentManagementFeatures.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Content Management</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredContentManagementFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12">
        <SystemStats />
      </div>
    </div>
  );
};