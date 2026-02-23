import { Users, Clock, FileText, Calendar, Building2, UserCheck } from 'lucide-react';
import { Card } from '../../../../components/common';

/**
 * HR Dashboard Page
 * Main dashboard for Human Resources
 */
const HRDashboard = () => {
  // Mock data - replace with API calls later
  const stats = [
    {
      title: 'Total Employees',
      value: '142',
      change: '+5 this month',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Present Today',
      value: '135',
      change: '95% attendance',
      icon: UserCheck,
      color: 'green',
    },
    {
      title: 'Open Positions',
      value: '8',
      change: 'Active hiring',
      icon: Building2,
      color: 'purple',
    },
    {
      title: 'Leave Requests',
      value: '12',
      change: '5 pending approval',
      icon: Calendar,
      color: 'orange',
    },
  ];

  const recentActivities = [
    { action: 'New Employee Onboarded', user: 'Sarah Jenkins', time: '1 hour ago' },
    { action: 'Leave Approved', user: 'Michael Chen', time: '3 hours ago' },
    { action: 'Payroll Processed', user: 'System', time: 'Yesterday' },
    { action: 'Interview Scheduled', user: 'David Smith', time: 'Yesterday' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage personnel, attendance, and recruitment.</p>
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
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${stat.color}-100`}>
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
              <p className="font-medium text-gray-900">Employee Directory</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left">
              <Clock className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Attendance</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left">
              <FileText className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Leave Management</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-all text-left">
              <Building2 className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-gray-900">Recruitment</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HRDashboard;