import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  FileText,
  BarChart,
  Megaphone,
  Star,
  UserCog,
  GraduationCap,
  ClipboardList,
  Calendar,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/roles';
import logo from '../../assets/logo.png';

/**
 * DashboardSidebar Component
 * Role-based navigation sidebar for dashboards
 */
const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Navigation items for each role
  const navigationItems = {
    [ROLES.SUPER_ADMIN]: [
      { name: 'Dashboard', path: '/dashboard/super-admin', icon: LayoutDashboard },
      { name: 'Add User', path: '/dashboard/super-admin/add-user', icon: Users },
      { name: 'Get Users', path: '/dashboard/super-admin/get-users', icon: FileText },
      { name: 'Delete User', path: '/dashboard/super-admin/delete-user', icon: UserCog },
      { name: 'Settings', path: '/dashboard/super-admin/settings', icon: Settings },
    ],

    [ROLES.ADMIN]: [
      { name: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
      { name: 'Users', path: '/dashboard/admin/users', icon: Users },
      { name: 'Courses', path: '/dashboard/admin/courses', icon: BookOpen },
      { name: 'Content', path: '/dashboard/admin/content', icon: FileText },
      { name: 'Announcements', path: '/dashboard/admin/announcements', icon: Megaphone },
      { name: 'Testimonials', path: '/dashboard/admin/testimonials', icon: Star },
      { name: 'Analytics', path: '/dashboard/admin/analytics', icon: BarChart },
      { name: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
    ],

    [ROLES.TECHNICAL_HEAD]: [
      { name: 'Dashboard', path: '/dashboard/technical', icon: LayoutDashboard },
      { name: 'Content', path: '/dashboard/technical/content', icon: FileText },
      { name: 'Courses', path: '/dashboard/technical/courses', icon: BookOpen },
      { name: 'Teachers', path: '/dashboard/technical/teachers', icon: UserCog },
      { name: 'Announcements', path: '/dashboard/technical/announcements', icon: Megaphone },
      { name: 'Analytics', path: '/dashboard/technical/analytics', icon: BarChart },
      { name: 'Reports', path: '/dashboard/technical/reports', icon: TrendingUp },
    ],

    [ROLES.TEACHER]: [
      { name: 'Dashboard', path: '/dashboard/teacher', icon: LayoutDashboard },
      { name: 'My Courses', path: '/dashboard/teacher/courses', icon: BookOpen },
      { name: 'Students', path: '/dashboard/teacher/students', icon: Users },
      { name: 'Assignments', path: '/dashboard/teacher/assignments', icon: ClipboardList },
      { name: 'Schedule', path: '/dashboard/teacher/schedule', icon: Calendar },
      { name: 'Analytics', path: '/dashboard/teacher/analytics', icon: BarChart },
    ],

    [ROLES.STUDENT]: [
      { name: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard },
      { name: 'My Courses', path: '/dashboard/student/courses', icon: BookOpen },
      { name: 'Assignments', path: '/dashboard/student/assignments', icon: ClipboardList },
      { name: 'Grades', path: '/dashboard/student/grades', icon: GraduationCap },
      { name: 'Schedule', path: '/dashboard/student/schedule', icon: Calendar },
      { name: 'Messages', path: '/dashboard/student/messages', icon: MessageSquare },
    ],

    [ROLES.PARENT]: [
      { name: 'Dashboard', path: '/dashboard/parent', icon: LayoutDashboard },
      { name: 'Child Progress', path: '/dashboard/parent/progress', icon: TrendingUp },
      { name: 'Courses', path: '/dashboard/parent/courses', icon: BookOpen },
      { name: 'Grades', path: '/dashboard/parent/grades', icon: GraduationCap },
      { name: 'Messages', path: '/dashboard/parent/messages', icon: MessageSquare },
    ],
  };

  const items = navigationItems[user?.role] || [];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 mb-4 group">
          <img 
            src={logo} 
            alt="Centum Academy" 
            className="h-12 w-12 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary leading-tight">
              Centum Academy
            </h3>
            <p className="text-xs text-primary-600 italic">Education with Emotion</p>
          </div>
        </Link>
        
        {/* Dashboard Title */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {user?.role === ROLES.SUPER_ADMIN && 'Super Admin Panel'}
            {user?.role === ROLES.ADMIN && 'Admin Panel'}
            {user?.role === ROLES.TECHNICAL_HEAD && 'Technical Dashboard'}
            {user?.role === ROLES.TEACHER && 'Teacher Portal'}
            {user?.role === ROLES.STUDENT && 'Student Portal'}
            {user?.role === ROLES.PARENT && 'Parent Portal'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">{user?.name}</p>
        </div>
      </div>

      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
