import React from 'react';
import { Image as ImageIcon, Layout, PenTool, Video, Upload, Edit, Eye, Settings } from 'lucide-react';
import { Card } from '../../../../components/common';
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';
import { useAuth } from '../../../context/AuthContext';

const DtpDashboard = () => {
  const { user } = useAuth();

  // Mock data tailored for DTP - replace with actual API calls later
  const stats = [
    {
      title: 'Pending Graphics',
      value: '0',
      change: '-0',
      icon: ImageIcon,
      color: 'pink',
    },
    {
      title: 'Completed Banners',
      value: '0',
      change: '+0',
      icon: Layout,
      color: 'emerald',
    },
    {
      title: 'Active Revisions',
      value: '0',
      change: '0',
      icon: PenTool,
      color: 'yellow',
    },
    {
      title: 'Media Uploads',
      value: '0',
      change: '+0',
      icon: Video,
      color: 'blue',
    },
  ];

  const recentActivities = [
    { action: 'New promotional banner uploaded', user: 'Self', time: '1 hour ago' },
    { action: 'Revision requested for course thumbnail', user: 'Admin', time: '3 hours ago' },
    { action: 'Media center assets updated', user: 'Self', time: '1 day ago' },
  ];

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">DTP Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'Designer'}! Manage your creative assets.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Updates</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-0 border-gray-100">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
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
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group">
              <Upload className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Upload Media</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group">
              <Layout className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Manage Banners</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group">
              <Edit className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">View Revisions</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group">
              <Settings className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Settings</p>
            </button>
          </div>
        </Card>
      </div>

      {/* Leave Application Widget Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveApplicationWidget />
      </div>
    </div>
  );
};

export default DtpDashboard;