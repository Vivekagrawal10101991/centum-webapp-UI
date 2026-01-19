import { TrendingUp, Users, BookOpen, Mail, Eye, Trophy } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Enquiries', value: '47', icon: Mail, color: 'bg-blue-100 text-blue-600', trend: '+12%' },
    { label: 'Active Courses', value: '8', icon: BookOpen, color: 'bg-green-100 text-green-600', trend: '+2' },
    { label: 'Student Testimonials', value: '124', icon: Users, color: 'bg-purple-100 text-purple-600', trend: '+8' },
    { label: 'Toppers Listed', value: '35', icon: Trophy, color: 'bg-yellow-100 text-yellow-600', trend: '+5' },
  ];

  
  const recentEnquiries = [
    { name: 'Rahul Sharma', course: 'JEE Mains 2026', date: '2 hours ago', status: 'New' },
    { name: 'Priya Patel', course: 'NEET Preparation', date: '5 hours ago', status: 'New' },
    { name: 'Amit Kumar', course: 'Foundation Course', date: '1 day ago', status: 'Contacted' },
    { name: 'Sneha Reddy', course: 'JEE Advanced', date: '2 days ago', status: 'Contacted' },
  ];

  const websiteActivity = [
    { page: 'Home Page', views: 1247, bounce: '32%' },
    { page: 'JEE Courses', views: 892, bounce: '28%' },
    { page: 'NEET Courses', views: 756, bounce: '24%' },
    { page: 'Success Stories', views: 634, bounce: '18%' },
    { page: 'Contact Us', views: 423, bounce: '45%' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of your coaching institute's online presence</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.trend}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Enquiries</h3>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentEnquiries.map((enquiry, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{enquiry.name}</p>
                  <p className="text-sm text-gray-500">{enquiry.course}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    enquiry.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {enquiry.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{enquiry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Top Pages (This Week)</h3>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {websiteActivity.map((page, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-800">{page.page}</p>
                  <span className="text-sm font-semibold text-gray-700">{page.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-100 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(page.views / 1247) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">Bounce: {page.bounce}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
