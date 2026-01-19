import { useState } from 'react';
import { X } from 'lucide-react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

/**
 * DashboardLayout Component
 * Layout wrapper for all dashboard pages
 */
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <DashboardNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 lg:hidden shadow-xl">
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <DashboardSidebar />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
