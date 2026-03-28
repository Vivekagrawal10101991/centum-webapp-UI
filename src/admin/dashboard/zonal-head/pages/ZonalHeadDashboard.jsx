import React from 'react';
import { Users, Briefcase, BarChart3, TrendingUp, Layers, Send, Settings, CheckCircle } from 'lucide-react';
import { Card } from '../../../../components/common';
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';
import { useAuth } from '../../../context/AuthContext';

const ZonalHeadDashboard = () => {
  const { user } = useAuth();

  // Mock data tailored for Zonal Head - replace with actual API calls later
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹0.00',
      change: '+0.0%',
      icon: BarChart3,
      color: 'blue',
    },
    {
      title: 'Active Students',
      value: '0',
      change: '+0',
      icon: Users,
      color: 'green',
    },
    {
      title: 'Pending Tasks',
      value: '0',
      change: '-0',
      icon: Briefcase,
      color: 'purple',
    },
    {
      title: 'Zone Growth',
      value: '0%',
      change: '+0.0%',
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  const recentActivities = [
    { action: 'New batch assigned to zone', user: 'Admin', time: '2 hours ago' },
    { action: 'Zone performance report generated', user: 'System', time: '5 hours ago' },
    { action: 'Internal broadcast received', user: 'Super Admin', time: '1 day ago' },
  ];

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Zonal_Head Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'Zonal Head'}! Here is what's happening in your zones.</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Zone Activities</h2>
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
              <Layers className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">View Batches</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group">
              <BarChart3 className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Zone Reports</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group">
              <Send className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Send Broadcast</p>
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

export default ZonalHeadDashboard;