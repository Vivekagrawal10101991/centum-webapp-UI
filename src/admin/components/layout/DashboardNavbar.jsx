import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu, Home, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_NAMES } from '../../../utils/roles';
import logo from '../../../assets/logo.png';

/**
 * DashboardNavbar Component
 * UPDATED: Logo and Brand Text moved here from Sidebar.
 */
const DashboardNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Click outside handler
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section: Mobile Toggle & BRANDING */}
          <div className="flex items-center gap-4">
            {/* Mobile Toggle */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* BRANDING - Now Visible on All Screens */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Centum Academy" 
                  className="h-9 w-9 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-800 tracking-tight leading-none group-hover:text-[#002B6B] transition-colors">
                  Centum Academy
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Education with Emotion
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Home Link */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#002B6B] transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Website</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-[#002B6B] transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 py-2 animate-in fade-in zoom-in-95 origin-top-right">
                  <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto py-2">
                    <div className="px-4 py-8 text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                        <Bell className="w-6 h-6" />
                      </div>
                      <p className="text-sm text-slate-500">No new notifications</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 pl-2 pr-1 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#002B6B] to-blue-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                  <span className="text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <div className="hidden sm:block text-left mr-1">
                  <p className="text-sm font-semibold text-slate-700 leading-none mb-0.5">{user?.name?.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase">{ROLE_NAMES[user?.role]}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 py-2 animate-in fade-in zoom-in-95 origin-top-right overflow-hidden">
                  <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  
                  <div className="p-2 space-y-1">
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 rounded-2xl hover:bg-slate-50 hover:text-[#002B6B] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 rounded-2xl hover:bg-slate-50 hover:text-[#002B6B] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 p-2 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 rounded-2xl hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;