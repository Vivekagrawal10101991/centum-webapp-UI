import React from 'react';
import { Image, Video, MonitorPlay } from 'lucide-react';
import LeaveApplicationWidget from '../../../components/common/LeaveApplicationWidget';

const GraphicDesignerDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Graphic Designer Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage all visual assets, banners, and media content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <Image className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Banners</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage active banners</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
                        <Video className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Videos</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage video library</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                        <MonitorPlay className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">CMS Media</h3>
                    <p className="text-sm text-slate-500 mt-1">Website assets</p>
                </div>
            </div>

            <div className="w-full min-h-[40vh] flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-inner">
                    <Image className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Workspace Central</h2>
                <p className="text-slate-500 text-center max-w-md">Use the sidebar to navigate to specific content management tabs.</p>
            </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <LeaveApplicationWidget />
        </div>
      </div>
    </div>
  );
};

export default GraphicDesignerDashboard;