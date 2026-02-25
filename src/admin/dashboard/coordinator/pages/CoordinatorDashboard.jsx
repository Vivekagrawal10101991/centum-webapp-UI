import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';
import { FaUserGraduate, FaCalendarAlt, FaClipboardList, FaBullhorn } from 'react-icons/fa';

const CoordinatorDashboard = () => {
  const { user } = useAuth();

  // Mock stats for the Coordinator Dashboard
  const stats = [
    { title: 'Total Students', value: '245', icon: FaUserGraduate, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Active Classes', value: '12', icon: FaCalendarAlt, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Pending Tasks', value: '8', icon: FaClipboardList, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Announcements', value: '3', icon: FaBullhorn, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coordinator Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Coordinator'}</p>
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
        
        {/* Left Column (Wider) - Coordinator Activities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Coordinator Activities</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-gray-700">Class 10A Mathematics schedule updated</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm text-gray-700">New batch creation request pending approval</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <p className="text-sm text-gray-700">Faculty alignment meeting scheduled for tomorrow</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Narrower) - Personal Widgets */}
        <div className="space-y-6">
          {/* ✅ The Leave Application Widget correctly placed here */}
          <LeaveApplicationWidget />
        </div>

      </div>
    </div>
  );
};

export default CoordinatorDashboard;