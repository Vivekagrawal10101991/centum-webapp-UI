import { BookOpen, Users, FileText, TrendingUp, Megaphone, Video, Award, Star } from 'lucide-react';
import { Card } from '../../../../components/common';
import { FeatureCard } from '../../super-admin/components';
import { useAuth } from '../../../context/AuthContext';
import { canAccessRoute } from '../../../helpers/navigationPermissions';
// FIXED: Corrected import path (3 levels up, not 4)
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';

/**
 * Technical Head Dashboard
 */
const TechnicalDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Courses', value: '45', icon: BookOpen, color: 'blue' },
    { title: 'Teachers', value: '28', icon: Users, color: 'green' },
    { title: 'Content Items', value: '342', icon: FileText, color: 'purple' },
    { title: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'orange' },
  ];

  // All management modules for the Technical Head
  const contentManagementFeatures = [
    {
      title: 'Course Management',
      description: 'Manage course content and structure',
      icon: BookOpen,
      path: '/dashboard/technical/course-management',
      color: 'blue',
    },
    {
      title: 'Promotions & Banners',
      description: 'Manage hero banners and announcements',
      icon: Megaphone,
      path: '/dashboard/technical/promotions-banners',
      color: 'purple',
    },
    {
      title: 'Academics & Results',
      description: 'Manage toppers, results, and achievers',
      icon: Award,
      path: '/dashboard/technical/academics-results',
      color: 'yellow',
    },
    {
      title: 'Social Proof',
      description: 'Manage testimonials and success stories',
      icon: Star,
      path: '/dashboard/technical/social-proof',
      color: 'orange',
    },
    {
      title: 'Media Center',
      description: 'Manage blogs, videos, and team',
      icon: Video,
      path: '/dashboard/technical/media-center',
      color: 'red',
    }
  ];

  // Filter based on user permissions
  const filteredFeatures = contentManagementFeatures.filter(feature => 
    canAccessRoute(feature.path, user)
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Technical Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor courses and manage website content</p>
      </div>

      {/* Content Management Section */}
      {filteredFeatures.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Management Modules</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats Section & Leave Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6" hover>
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Added Leave Widget Here */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Personal</h2>
          <LeaveApplicationWidget />
        </div>
      </div>
    </div>
  );
};

export default TechnicalDashboard;