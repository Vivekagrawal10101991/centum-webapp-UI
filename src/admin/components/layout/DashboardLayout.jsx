import { useState } from 'react';
import { X } from 'lucide-react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

/**
 * DashboardLayout Component
 * UPDATED: Added a premium, subtle gradient background (Samsung UI style).
 */
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Samsung UI Effect: Subtle gradient background instead of flat gray
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex flex-col font-sans text-slate-900 selection:bg-blue-100">
      
      {/* 1. Top Navbar (Sticky) */}
      <DashboardNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* 2. Sidebar - Desktop (Sticky) */}
        <div className="hidden lg:block h-[calc(100vh-64px)] sticky top-16">
          <DashboardSidebar />
        </div>

        {/* 3. Sidebar - Mobile (Overlay) */}
        {sidebarOpen && (
          <div className="lg:hidden relative z-50">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Slide-in Sidebar */}
            <div className="fixed left-0 top-0 h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-left duration-300 border-r border-white/20">
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <DashboardSidebar />
            </div>
          </div>
        )}

        {/* 4. Main Content Area */}
        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto h-[calc(100vh-64px)] scroll-smooth">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;