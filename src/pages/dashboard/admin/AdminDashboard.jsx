import { Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '../../../components/common';

/**
 * Admin Dashboard Page
 * Main dashboard for administrators
 */
const AdminDashboard = () => {
  // Mock data - replace with API calls
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Active Courses',
      value: '45',
      change: '+3',
      icon: BookOpen,
      color: 'green',
    },
    {
      title: 'Revenue',
      value: '₹12.5L',
      change: '+18.2%',
      icon: DollarSign,
      color: 'purple',
    },
    {
      title: 'Growth',
      value: '23.4%',
      change: '+5.1%',
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  const recentActivities = [
    { action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { action: 'Course updated', user: 'Admin', time: '15 minutes ago' },
    { action: 'Payment received', user: 'Jane Smith', time: '1 hour ago' },
    { action: 'Announcement published', user: 'Admin', time: '2 hours ago' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Manage Users</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left">
              <BookOpen className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Add Course</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left">
              <TrendingUp className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">View Reports</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left">
              <DollarSign className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Payments</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
