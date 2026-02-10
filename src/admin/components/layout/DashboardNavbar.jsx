// src/admin/components/layout/DashboardNavbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu, Home, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_NAMES } from '../../../utils/roles';
import logo from '../../../assets/logo.png';

const DashboardNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
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
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Logo" className="h-9 w-9 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-all" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#002B6B] tracking-tight leading-none uppercase">Centum Academy</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Education with Emotion</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all">
              <Home className="w-4 h-4" />
              <span>Visit Site</span>
            </Link>

            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#002B6B] to-blue-500 text-white flex items-center justify-center font-bold shadow-md">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-slate-800 leading-none">{user?.name?.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{ROLE_NAMES[user?.role]}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 animate-in fade-in zoom-in-95 origin-top-right overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 rounded-xl hover:bg-rose-50 transition-colors">
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