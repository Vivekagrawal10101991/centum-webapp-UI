import React from 'react';
import { Users, PhoneCall, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../../../../components/common';
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';

const AdmissionManagerDashboard = () => {
  // Mock data for admission metrics
  const stats = [
    { title: 'New Leads Today', value: '24', change: '+12%', icon: PhoneCall, color: 'blue' },
    { title: 'Active Queries', value: '142', change: '-5%', icon: Clock, color: 'yellow' },
    { title: 'Admissions This Month', value: '89', change: '+24%', icon: Users, color: 'green' },
    { title: 'Conversion Rate', value: '18.4%', change: '+2.1%', icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="pb-8 animate-in fade-in zoom-in duration-300">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admission Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your leads, queries, and enrollment conversions.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 border border-gray-100 shadow-sm" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
                  <p className={`text-xs font-bold mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.change} from last period
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center border border-${stat.color}-100`}>
                  <Icon className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Leads Module */}
        <Card className="p-6 lg:col-span-2 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Lead Activity</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All Leads</button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Rahul Sharma', course: 'JEE Advance', status: 'Hot', time: '10 mins ago' },
              { name: 'Priya Singh', course: 'NEET Foundation', status: 'Follow Up', time: '1 hour ago' },
              { name: 'Amit Kumar', course: 'Class 10 Board', status: 'Converted', time: '3 hours ago' },
            ].map((lead, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-primary shadow-sm">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{lead.name}</h4>
                    <p className="text-xs text-gray-500">{lead.course} • {lead.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lead.status === 'Converted' ? 'bg-green-100 text-green-700' : 
                  lead.status === 'Hot' ? 'bg-orange-100 text-orange-700' : 
                  'bg-blue-100 text-blue-700'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary to-blue-700 text-white shadow-md border-none">
            <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
            <p className="text-blue-100 text-sm mb-6">Manage your daily admission tasks efficiently.</p>
            <div className="space-y-3">
              <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                Add New Lead
              </button>
              <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                Send Follow-up Emails
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Leave Application Widget Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveApplicationWidget />
      </div>
    </div>
  );
};

export default AdmissionManagerDashboard;