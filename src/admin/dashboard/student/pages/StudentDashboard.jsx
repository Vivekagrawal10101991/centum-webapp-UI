import { BookOpen, ClipboardList, GraduationCap, Calendar } from 'lucide-react';
import { Card, Button } from '../../../../components/common';

/**
 * Student Dashboard
 */
const StudentDashboard = () => {
  const stats = [
    { title: 'Enrolled Courses', value: '5', icon: BookOpen },
    { title: 'Pending Assignments', value: '3', icon: ClipboardList },
    { title: 'Average Grade', value: '85%', icon: GraduationCap },
    { title: 'Classes This Week', value: '12', icon: Calendar },
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', time: 'Today, 10:00 AM', teacher: 'Dr. Smith' },
    { subject: 'Physics', time: 'Today, 2:00 PM', teacher: 'Prof. Johnson' },
    { subject: 'Chemistry', time: 'Tomorrow, 11:00 AM', teacher: 'Dr. Brown' },
  ];

  const recentAssignments = [
    { title: 'Math Assignment 5', dueDate: 'Due in 2 days', status: 'Pending' },
    { title: 'Physics Lab Report', dueDate: 'Due in 4 days', status: 'In Progress' },
    { title: 'Chemistry Quiz', dueDate: 'Due in 1 week', status: 'Not Started' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your learning overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Classes</h2>
          <div className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-start justify-between pb-4 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{cls.subject}</p>
                  <p className="text-sm text-gray-500">{cls.time}</p>
                  <p className="text-xs text-gray-400">{cls.teacher}</p>
                </div>
                <Button variant="outline" size="sm">Join</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Assignments */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Assignments</h2>
          <div className="space-y-4">
            {recentAssignments.map((assignment, index) => (
              <div key={index} className="pb-4 border-b last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-gray-900">{assignment.title}</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      assignment.status === 'Pending'
                        ? 'bg-red-100 text-red-700'
                        : assignment.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{assignment.dueDate}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
