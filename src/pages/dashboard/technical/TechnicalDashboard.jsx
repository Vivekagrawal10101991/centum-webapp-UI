import { BookOpen, Users, FileText, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/common';

/**
 * Technical Head Dashboard
 */
const TechnicalDashboard = () => {
  const stats = [
    { title: 'Active Courses', value: '45', icon: BookOpen, color: 'blue' },
    { title: 'Teachers', value: '28', icon: Users, color: 'green' },
    { title: 'Content Items', value: '342', icon: FileText, color: 'purple' },
    { title: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'orange' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Technical Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor courses and content management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );
};

export default TechnicalDashboard;
