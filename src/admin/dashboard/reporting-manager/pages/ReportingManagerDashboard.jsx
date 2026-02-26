import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';
import { BarChart, Users, TrendingUp, Inbox } from 'lucide-react';

const ReportingManagerDashboard = () => {
  const { user } = useAuth();

  // Mock stats for the Reporting Manager
  const stats = [
    { title: 'Team Members', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pending Reports', value: '7', icon: Inbox, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Performance Avg', value: '88%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Analytics Views', value: '1.2k', icon: BarChart, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reporting Manager Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Manager'}</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 transition-transform hover:-translate-y-1">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) - Analytics Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full h-full min-h-[400px] flex flex-col items-center justify-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                <BarChart className="w-10 h-10 text-slate-300" />
             </div>
             <h2 className="text-xl font-bold text-slate-900 mb-2">Team Analytics & Reports</h2>
             <p className="text-slate-500 text-center max-w-md">The detailed performance tracking and reporting modules will appear here.</p>
          </div>
        </div>

        {/* Right Column (Narrower) - Leave Widget */}
        <div className="space-y-6">
          <LeaveApplicationWidget />
        </div>

      </div>
    </div>
  );
};

export default ReportingManagerDashboard;