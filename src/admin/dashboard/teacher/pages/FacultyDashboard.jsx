import { Users, BookOpen, ClipboardList, Calendar } from 'lucide-react';
import { Card } from '../../../../components/common';

/**
 * Faculty Dashboard
 */
const FacultyDashboard = () => {
  const stats = [
    { title: 'My Courses', value: '6', icon: BookOpen },
    { title: 'Total Students', value: '145', icon: Users },
    { title: 'Assignments to Grade', value: '23', icon: ClipboardList },
    { title: 'Classes Today', value: '4', icon: Calendar },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your courses and students</p>
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

export default FacultyDashboard;