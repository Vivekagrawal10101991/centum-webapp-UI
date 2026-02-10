import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Settings, 
  FileText,
  BarChart,
  Megaphone,
  Star,
  GraduationCap,
  Award,
  Video,
  MessageCircle,
  ClipboardList,
  Calendar,
  MessageSquare,
  TrendingUp,
  UserCog
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../../utils/roles';
import { filterNavigationByPermissions } from '../../helpers/navigationPermissions';

/**
 * DashboardSidebar Component
 * UPDATED: Removed the "Portal View" badge bar and cleaned up redundant links.
 * UPDATED: Premium Soft Slate Gradient remains with high-end typography.
 */
const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems = {
    [ROLES.SUPER_ADMIN]: [
      // Primary Analytical Entry
      { name: 'Overview', path: '/dashboard/super-admin/dashboard', icon: BarChart },
      { name: 'User Management', path: '/dashboard/super-admin/user-management', icon: Users },
      
      { name: 'LMS Center', path: '/dashboard/super-admin/lms-center', icon: GraduationCap },
      { name: 'Promotions & Banners', path: '/dashboard/super-admin/promotions-banners', icon: Megaphone },
      { name: 'Academics & Results', path: '/dashboard/super-admin/academics-results', icon: Award },
      { name: 'Course Management', path: '/dashboard/super-admin/course-management', icon: BookOpen },
      { name: 'Social Proof', path: '/dashboard/super-admin/social-proof', icon: Star },
      { name: 'Media Center', path: '/dashboard/super-admin/media-center', icon: Video },
      { name: 'Leads & Enquiries', path: '/dashboard/super-admin/leads-enquiries', icon: MessageCircle },
      { name: 'Settings', path: '/dashboard/super-admin/settings', icon: Settings },
    ],

    [ROLES.ADMIN]: [
      { name: 'Overview', path: '/dashboard/admin', icon: BarChart },
      { name: 'Users', path: '/dashboard/admin/users', icon: Users },
      { name: 'Courses', path: '/dashboard/admin/courses', icon: BookOpen },
      { name: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
    ],

    [ROLES.TECHNICAL_HEAD]: [
      { name: 'Overview', path: '/dashboard/technical', icon: BarChart },
      { name: 'Content', path: '/dashboard/technical/content', icon: FileText },
      { name: 'Courses', path: '/dashboard/technical/courses', icon: BookOpen },
      { name: 'Settings', path: '/dashboard/technical/settings', icon: Settings },
    ],

    [ROLES.TEACHER]: [
      { name: 'Overview', path: '/dashboard/teacher', icon: BarChart },
      { name: 'My Courses', path: '/dashboard/teacher/courses', icon: BookOpen },
      { name: 'Students', path: '/dashboard/teacher/students', icon: Users },
      { name: 'Settings', path: '/dashboard/teacher/settings', icon: Settings },
    ],

    [ROLES.STUDENT]: [
      { name: 'Overview', path: '/dashboard/student', icon: BarChart },
      { name: 'My Courses', path: '/dashboard/student/courses', icon: BookOpen },
      { name: 'Assignments', path: '/dashboard/student/assignments', icon: ClipboardList },
      { name: 'Grades', path: '/dashboard/student/grades', icon: GraduationCap },
      { name: 'Schedule', path: '/dashboard/student/schedule', icon: Calendar },
      { name: 'Settings', path: '/dashboard/student/settings', icon: Settings },
    ],

    [ROLES.PARENT]: [
      { name: 'Overview', path: '/dashboard/parent', icon: BarChart },
      { name: 'Child Progress', path: '/dashboard/parent/progress', icon: TrendingUp },
      { name: 'Settings', path: '/dashboard/parent/settings', icon: Settings },
    ],
  };

  const allItems = navigationItems[user?.role] || [];
  const items = filterNavigationByPermissions(allItems, user);
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col h-full shadow-2xl relative z-20 border-r border-white/5">
      
      {/* 1. Header Spacing (Replaces the removed badge for a cleaner look) */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
             {user?.role === ROLES.STUDENT ? <GraduationCap className="w-5 h-5" /> : <UserCog className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none mb-1">Navigation</p>
            <p className="text-sm font-bold text-white tracking-tight">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Section */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <nav className="space-y-1.5 mt-4">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 relative
                  ${active 
                    ? 'text-white bg-blue-600 shadow-lg shadow-blue-900/40 translate-x-1' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }
                `}
              >
                <div className="flex items-center gap-3.5 relative z-10">
                  <Icon 
                    strokeWidth={active ? 2.5 : 2}
                    className={`w-[18px] h-[18px] transition-colors duration-300 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} 
                  />
                  <span className={`text-[14px] tracking-tight ${active ? 'font-bold' : 'font-medium'}`}>
                    {item.name}
                  </span>
                </div>
                
                {active && (
                   <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. Sidebar Footer */}
      <div className="p-6 border-t border-white/5 bg-slate-900/50">
         <div className="text-center">
            <p className="text-[10px] text-slate-600 font-bold tracking-[0.3em] uppercase">Centum Academy</p>
         </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;