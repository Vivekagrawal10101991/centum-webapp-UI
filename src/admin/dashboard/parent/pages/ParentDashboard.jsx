import { TrendingUp, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import { Card } from '../../../../components/common';

/**
 * Parent Dashboard
 */
const ParentDashboard = () => {
  const stats = [
    { title: "Child's Courses", value: '5', icon: BookOpen },
    { title: 'Overall Progress', value: '82%', icon: TrendingUp },
    { title: 'Average Grade', value: '85%', icon: GraduationCap },
    { title: 'Classes This Week', value: '12', icon: Calendar },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your child's progress</p>
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

export default ParentDashboard;
