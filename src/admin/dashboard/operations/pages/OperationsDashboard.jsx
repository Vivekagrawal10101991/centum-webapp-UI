import React from 'react';
import { Building2, Calendar, ClipboardCheck, AlertTriangle } from 'lucide-react';
import { Card } from '../../../../components/common';
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';

const OperationsDashboard = () => {
  const stats = [
    { title: 'Active Facilities', value: '4', icon: Building2, color: 'blue' },
    { title: 'Scheduled Events', value: '12', icon: Calendar, color: 'green' },
    { title: 'Pending Maintenance', value: '3', icon: AlertTriangle, color: 'orange' },
    { title: 'Completed Tasks', value: '45', icon: ClipboardCheck, color: 'purple' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Operations Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage facilities, logistics, and daily schedules.</p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 h-full min-h-[400px]">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Operations Overview</h2>
             <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Building2 className="w-12 h-12 text-gray-300 mb-3" />
                <p>Logistics and tracking modules will appear here.</p>
             </div>
          </Card>
        </div>
        
        {/* Personal Leave Widget */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Personal</h2>
          <LeaveApplicationWidget />
        </div>
      </div>
    </div>
  );
};

export default OperationsDashboard;