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
  TrendingUp,
  Award,
  Video,
  MessageCircle,
  UserPlus,
  UserX,
  Search,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../../utils/roles';
import { filterNavigationByPermissions } from '../../helpers/navigationPermissions';

/**
 * DashboardSidebar Component
 * UPDATED: Logo removed (moved to Navbar).
 * UPDATED: Active state uses Samsung-style gradients.
 */
const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Navigation items for each role
  const navigationItems = {
    [ROLES.SUPER_ADMIN]: [
      { name: 'Overview', path: '/dashboard/super-admin', icon: LayoutDashboard },
      { name: 'Dashboard', path: '/dashboard/super-admin/dashboard', icon: BarChart },
      { name: 'Add User', path: '/dashboard/super-admin/add-user', icon: UserPlus },
      { name: 'Get Users', path: '/dashboard/super-admin/get-users', icon: Search },
      { name: 'Delete User', path: '/dashboard/super-admin/delete-user', icon: UserX },
      { name: 'Promotions & Banners', path: '/dashboard/super-admin/promotions-banners', icon: Megaphone },
      { name: 'Academics & Results', path: '/dashboard/super-admin/academics-results', icon: Award },
      { name: 'Course Management', path: '/dashboard/super-admin/course-management', icon: BookOpen },
      { name: 'Social Proof', path: '/dashboard/super-admin/social-proof', icon: Star },
      { name: 'Media Center', path: '/dashboard/super-admin/media-center', icon: Video },
      { name: 'Leads & Enquiries', path: '/dashboard/super-admin/leads-enquiries', icon: MessageCircle },
      { name: 'Settings', path: '/dashboard/super-admin/settings', icon: Settings },
    ],

    [ROLES.ADMIN]: [
      { name: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
      { name: 'Users', path: '/dashboard/admin/users', icon: Users },
      { name: 'Courses', path: '/dashboard/admin/courses', icon: BookOpen },
      { name: 'Content', path: '/dashboard/admin/content', icon: FileText },
      { name: 'Media Center', path: '/dashboard/admin/media-center', icon: Video },
      { name: 'Announcements', path: '/dashboard/admin/announcements', icon: Megaphone },
      { name: 'Testimonials', path: '/dashboard/admin/testimonials', icon: Star },
      { name: 'Analytics', path: '/dashboard/admin/analytics', icon: BarChart },
      { name: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
    ],

    [ROLES.TECHNICAL_HEAD]: [
      { name: 'Dashboard', path: '/dashboard/technical', icon: LayoutDashboard },
      { name: 'Content', path: '/dashboard/technical/content', icon: FileText },
      { name: 'Courses', path: '/dashboard/technical/courses', icon: BookOpen },
      { name: 'Course Management', path: '/dashboard/technical/course-management', icon: BookOpen },
      { name: 'Media Center', path: '/dashboard/technical/media-center', icon: Video },
      { name: 'Teachers', path: '/dashboard/technical/teachers', icon: UserCog },
      { name: 'Announcements', path: '/dashboard/technical/announcements', icon: Megaphone },
      { name: 'Analytics', path: '/dashboard/technical/analytics', icon: BarChart },
      { name: 'Reports', path: '/dashboard/technical/reports', icon: TrendingUp },
      { name: 'Settings', path: '/dashboard/technical/settings', icon: Settings },
    ],

    [ROLES.TEACHER]: [
      { name: 'Dashboard', path: '/dashboard/teacher', icon: LayoutDashboard },
      { name: 'My Courses', path: '/dashboard/teacher/courses', icon: BookOpen },
      { name: 'Students', path: '/dashboard/teacher/students', icon: Users },
      { name: 'Assignments', path: '/dashboard/teacher/assignments', icon: ClipboardList },
      { name: 'Schedule', path: '/dashboard/teacher/schedule', icon: Calendar },
      { name: 'Analytics', path: '/dashboard/teacher/analytics', icon: BarChart },
      { name: 'Settings', path: '/dashboard/teacher/settings', icon: Settings },
    ],

    [ROLES.STUDENT]: [
      { name: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard },
      { name: 'My Courses', path: '/dashboard/student/courses', icon: BookOpen },
      { name: 'Assignments', path: '/dashboard/student/assignments', icon: ClipboardList },
      { name: 'Grades', path: '/dashboard/student/grades', icon: GraduationCap },
      { name: 'Schedule', path: '/dashboard/student/schedule', icon: Calendar },
      { name: 'Messages', path: '/dashboard/student/messages', icon: MessageSquare },
      { name: 'Settings', path: '/dashboard/student/settings', icon: Settings },
    ],

    [ROLES.PARENT]: [
      { name: 'Dashboard', path: '/dashboard/parent', icon: LayoutDashboard },
      { name: 'Child Progress', path: '/dashboard/parent/progress', icon: TrendingUp },
      { name: 'Courses', path: '/dashboard/parent/courses', icon: BookOpen },
      { name: 'Grades', path: '/dashboard/parent/grades', icon: GraduationCap },
      { name: 'Messages', path: '/dashboard/parent/messages', icon: MessageSquare },
      { name: 'Settings', path: '/dashboard/parent/settings', icon: Settings },
    ],
  };

  const allItems = navigationItems[user?.role] || [];
  const items = filterNavigationByPermissions(allItems, user);
  const isActive = (path) => location.pathname === path;

  // Helper to get Role Label
  const getRoleLabel = () => {
    switch(user?.role) {
      case ROLES.SUPER_ADMIN: return 'Super Admin';
      case ROLES.ADMIN: return 'Admin Portal';
      case ROLES.TECHNICAL_HEAD: return 'Technical Head';
      case ROLES.TEACHER: return 'Teacher Portal';
      case ROLES.STUDENT: return 'Student Portal';
      case ROLES.PARENT: return 'Parent Portal';
      default: return 'Dashboard';
    }
  };

  return (
    <aside className="w-72 bg-white/50 backdrop-blur-xl border-r border-white/50 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
      
      {/* 1. Context Header (Logo removed) */}
      <div className="p-6 pb-2">
        {/* Portal Badge */}
        <div className="px-5 py-4 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-white shadow-sm flex items-center justify-between group hover:shadow-md transition-all duration-300">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Current View</p>
            <p className="text-sm font-bold text-[#002B6B]">{getRoleLabel()}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#002B6B] shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
             {user?.role === ROLES.STUDENT ? <GraduationCap className="w-5 h-5" /> : <UserCog className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* 2. Navigation Section */}
      <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
        <nav className="space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden
                  ${active 
                    ? 'text-white shadow-lg shadow-blue-900/20 translate-x-1' 
                    : 'text-slate-500 hover:bg-white hover:text-[#002B6B] hover:shadow-sm hover:translate-x-1'
                  }
                `}
              >
                {/* Active Gradient Background */}
                {active && (
                   <div className="absolute inset-0 bg-gradient-to-r from-[#002B6B] to-[#0042a3] z-0"></div>
                )}

                <div className="flex items-center gap-3.5 relative z-10">
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-300 ${active ? 'text-white' : 'text-slate-400 group-hover:text-[#002B6B]'}`} 
                  />
                  <span className={`font-medium tracking-wide ${active ? 'font-semibold' : ''}`}>
                    {item.name}
                  </span>
                </div>
                
                {active && <ChevronRight className="w-4 h-4 text-white/70 relative z-10" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. Footer Decor */}
      <div className="p-6 border-t border-slate-100/50">
         <div className="text-center">
            <p className="text-[10px] text-slate-300 font-medium">v1.0.0 • Centum Dashboard</p>
         </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;