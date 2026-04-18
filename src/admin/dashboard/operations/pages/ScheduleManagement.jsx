import React, { useState } from 'react';
import { BookOpen, Layers, Calendar } from 'lucide-react';
import ScheduleBySubjects from './ScheduleBySubjects';
import ScheduleByBatches from './ScheduleByBatches'; // NEW COMPONENT IMPORTED
import MasterTimetable from './MasterTimetable'; 

const ScheduleManagement = () => {
  const [activeTab, setActiveTab] = useState('subjects');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Schedule Management</h1>
        <p className="text-slate-500 mt-2">Manage your institution's master timetable by subjects, batches, or view the overall calendar.</p>
      </div>

      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl w-fit mb-8 border border-slate-200 shadow-sm">
        
        {/* TAB 1: CREATE BY SUBJECTS */}
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
            activeTab === 'subjects' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Create By Subjects
        </button>

        {/* TAB 2: CREATE BY BATCHES */}
        <button
          onClick={() => setActiveTab('batches')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
            activeTab === 'batches' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Create By Batches
        </button>

        <div className="w-px bg-slate-200 mx-1"></div> {/* Divider */}

        {/* TAB 3: VIEW TIMETABLE */}
        <button
          onClick={() => setActiveTab('timetable')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
            activeTab === 'timetable' 
              ? 'bg-slate-800 text-white shadow-md' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Master Timetable
        </button>

      </div>

      {/* Render the Active Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[500px]">
        
        {activeTab === 'subjects' && <ScheduleBySubjects />}
        
        {/* REPLACED PLACEHOLDER WITH NEW COMPONENT */}
        {activeTab === 'batches' && <ScheduleByBatches />}

        {activeTab === 'timetable' && <MasterTimetable />}

      </div>
    </div>
  );
};

export default ScheduleManagement;