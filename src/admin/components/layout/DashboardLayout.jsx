// src/admin/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import { X } from 'lucide-react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 selection:bg-blue-100 antialiased tracking-tight">
      <DashboardNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
        <div className="hidden lg:block h-[calc(100vh-64px)] sticky top-16 transition-all duration-500">
          <DashboardSidebar />
        </div>

        {sidebarOpen && (
          <div className="lg:hidden relative z-50">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-72 bg-[#001529] shadow-2xl animate-in slide-in-from-left duration-300">
              <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-rose-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <DashboardSidebar />
            </div>
          </div>
        )}

        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto h-[calc(100vh-64px)] scroll-smooth bg-gradient-to-br from-slate-50 to-blue-50/20">
          <div className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;