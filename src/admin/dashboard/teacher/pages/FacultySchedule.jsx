import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, Layers, CheckCircle, Video, ChevronRight, Filter } from 'lucide-react';
// FIX: Corrected the relative path to be exactly three levels up
import { adminLmsService } from '../../../services/adminLmsService';

const FacultySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [viewMode, setViewMode] = useState('ALL'); // 'ALL', 'TODAY', 'CUSTOM'
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchMySchedules = async () => {
      try {
        const response = await adminLmsService.getMySchedules();
        if (response.success) {
          setSchedules(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch schedules", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMySchedules();
  }, []);

  // Time Formatter
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Date Helpers
  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  const getToday = () => new Date();

  // Filter Logic
  const filteredSchedules = schedules.filter((schedule) => {
    if (viewMode === 'ALL') return true;
    if (viewMode === 'TODAY') return isSameDay(schedule.startTime, getToday());
    if (viewMode === 'CUSTOM') return isSameDay(schedule.startTime, customDate);
    return true;
  });

  // Group Logic (Only group if 'ALL' is selected, otherwise just show flat list)
  const groupedSchedules = filteredSchedules.reduce((groups, schedule) => {
    const dateObj = new Date(schedule.startTime);
    const dateKey = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).toISOString();
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(schedule);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedSchedules).sort((a, b) => new Date(a) - new Date(b));

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    if (isSameDay(dateString, getToday())) return "Today, " + date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (isSameDay(dateString, tomorrow)) {
      return "Tomorrow, " + date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }

    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse flex flex-col items-center">
         <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-4"></div>
         <p className="text-slate-500 font-medium text-sm tracking-wide uppercase">Syncing Schedule...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Classic Minimalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-slate-700" />
            My Schedule
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Overview of your assigned academic classes and timings.
          </p>
        </div>

        {/* Elegant Toggle Filter */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit">
          <button 
            onClick={() => setViewMode('ALL')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${viewMode === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            All
          </button>
          <button 
            onClick={() => setViewMode('TODAY')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${viewMode === 'TODAY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Today
          </button>
          <div className={`flex items-center rounded-lg transition-all ${viewMode === 'CUSTOM' ? 'bg-white shadow-sm ring-1 ring-slate-200' : ''}`}>
            <input 
              type="date" 
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setViewMode('CUSTOM');
              }}
              className="px-3 py-1.5 text-sm font-medium bg-transparent text-slate-600 outline-none border-none focus:ring-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="space-y-8">
        {filteredSchedules.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 flex flex-col items-center">
             <CheckCircle className="w-10 h-10 text-slate-300 mb-4" />
             <h3 className="text-lg font-bold text-slate-700 mb-1">No classes found</h3>
             <p className="text-slate-500 text-sm">
               {viewMode === 'TODAY' ? "You have no classes scheduled for today." : 
                viewMode === 'CUSTOM' ? "No classes found for the selected date." : 
                "You currently have no upcoming classes assigned."}
             </p>
          </div>
        ) : (
          sortedDates.map((dateKey) => {
            const daySchedules = groupedSchedules[dateKey];

            return (
              <div key={dateKey} className="space-y-3">
                
                {/* Minimalist Date Separator */}
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                    {formatDateHeader(dateKey)}
                  </h2>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                {/* Compact Horizontal Cards */}
                <div className="flex flex-col gap-3 pl-1 md:pl-3">
                  {daySchedules.map((schedule, index) => (
                    <div 
                      key={schedule.id || index} 
                      className="group bg-white flex flex-col md:flex-row md:items-center rounded-xl border border-slate-200 hover:border-slate-300 transition-colors overflow-hidden relative"
                    >
                      {/* Accent Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Left Block: Time */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center px-5 py-3 md:py-4 md:w-44 md:border-r border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                          <Clock className="w-3.5 h-3.5 text-slate-400 md:hidden" />
                          {formatTime(schedule.startTime)}
                        </div>
                        <div className="text-slate-400 font-medium text-xs hidden md:block">to</div>
                        <div className="text-slate-500 font-medium text-sm">
                          {formatTime(schedule.endTime)}
                        </div>
                      </div>

                      {/* Middle Block: Details */}
                      <div className="flex-1 px-5 py-4 flex flex-col justify-center">
                        <h3 className="text-base font-bold text-slate-900 mb-1.5">
                          {schedule.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            <Layers className="w-3 h-3" />
                            {schedule.batchName}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-white">
                            <BookOpen className="w-3 h-3" />
                            {schedule.subjectName}
                          </span>
                          {schedule.topics && (
                            <span className="text-xs text-slate-500 ml-2 truncate max-w-[200px]" title={schedule.topics}>
                              • {schedule.topics}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Block: Actions */}
                      <div className="px-5 py-3 md:py-4 border-t md:border-t-0 border-slate-100 flex justify-end items-center bg-slate-50/30 md:bg-transparent">
                        {schedule.meetingLink ? (
                          <a 
                            href={schedule.meetingLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Video className="w-4 h-4" />
                            Join
                          </a>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-100 transition-colors">
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FacultySchedule;