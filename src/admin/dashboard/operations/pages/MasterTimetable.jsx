import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, Clock, User, BookOpen, 
  ChevronLeft, ChevronRight, Loader2, MapPin, MoreVertical, ChevronDown
} from "lucide-react";
import api from "../../../../services/api";

const MasterTimetable = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await api.get('/api/admin/lms/scheduling/all');
      if (response.data && response.data.success) {
        setSchedules(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeekDays = (date) => {
    const days = [];
    const current = new Date(date);
    const first = current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1);
    
    for (let i = 0; i < 7; i++) {
      days.push(new Date(new Date(current).setDate(first + i)));
    }
    return days;
  };

  const changeWeek = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (offset * 7));
    setSelectedDate(newDate);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleQuickDateJump = (e) => {
    if (e.target.value) {
      // Append time to prevent UTC timezone shifting
      const jumpedDate = new Date(e.target.value + 'T12:00:00');
      setSelectedDate(jumpedDate);
    }
  };

  const weekDays = getWeekDays(selectedDate);
  const selectedDateStr = selectedDate.toDateString();
  const dailySchedules = schedules.filter(
    (s) => new Date(s.startTime).toDateString() === selectedDateStr
  ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      
      {/* ==========================================
          COMPACT PREMIUM CALENDAR STRIP
          ========================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 mb-6 overflow-hidden shadow-sm flex flex-col">
        
        {/* Header Bar */}
        <div className="px-5 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
          
          {/* Quick Jump Date Picker (Hidden over text) */}
          <div className="relative group flex items-center gap-2 cursor-pointer rounded-lg hover:bg-slate-100 px-2 py-1 -ml-2 transition-colors">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors flex items-center gap-1">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              <ChevronDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <input 
              type="date" 
              onChange={handleQuickDateJump}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Click to jump to any date"
            />
          </div>

          {/* Week Navigation */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
            <button onClick={() => changeWeek(-1)} className="p-1 rounded-md hover:bg-slate-50 text-slate-500 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-3 bg-slate-200 mx-1"></div>
            <button onClick={() => setSelectedDate(new Date())} className="px-3 py-1 text-[11px] font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-wider">
              Today
            </button>
            <div className="w-px h-3 bg-slate-200 mx-1"></div>
            <button onClick={() => changeWeek(1)} className="p-1 rounded-md hover:bg-slate-50 text-slate-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Strip */}
        <div className="px-2 py-3 grid grid-cols-7 gap-1">
          {weekDays.map((date, idx) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();
            const dayScheduleCount = schedules.filter(s => new Date(s.startTime).toDateString() === date.toDateString()).length;

            return (
              <div 
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={`group flex flex-col items-center justify-center py-2.5 rounded-xl cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105 z-10' 
                    : isToday 
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                      : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-500'}`}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={`text-base font-black tracking-tight ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {date.getDate()}
                </span>
                
                {/* Minimal Event Dot */}
                <div className="h-1 mt-1 flex gap-0.5">
                  {dayScheduleCount > 0 ? (
                    <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                  ) : (
                    <span className="w-1 h-1 opacity-0"></span> // Placeholder to keep heights consistent
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* ==========================================
          SCHEDULES TIMELINE AREA
          ========================================== */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            Timeline Agenda
            <span className="bg-blue-50 text-blue-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-blue-100">
              {dailySchedules.length} Sessions
            </span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin mb-3" />
            <p className="text-sm text-slate-500 font-medium">Loading timeline...</p>
          </div>
        ) : dailySchedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
              <CalendarIcon className="w-6 h-6 text-slate-300" />
            </div>
            <h4 className="text-base font-bold text-slate-700">No Classes Scheduled</h4>
            <p className="text-xs text-slate-500 mt-1">Take a break or switch to another date.</p>
          </div>
        ) : (
          <div className="relative pl-5 border-l-2 border-slate-100 space-y-5 ml-1">
            {dailySchedules.map((schedule) => (
              <div key={schedule.id} className="relative group">
                
                {/* Timeline Node Indicator */}
                <div className={`absolute -left-[27px] top-4 w-3.5 h-3.5 rounded-full border-[2px] border-white bg-${schedule.batchColor || 'blue'}-500 shadow-sm transition-transform duration-300 group-hover:scale-125 z-10`}></div>
                
                {/* Compact Premium Card */}
                <div className={`flex flex-col lg:flex-row gap-3 lg:gap-4 p-3.5 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:shadow-${schedule.batchColor || 'blue'}-500/5 hover:border-${schedule.batchColor || 'blue'}-300 transition-all duration-300`}>
                  
                  {/* Left: Time & Core Identity */}
                  <div className="flex items-center gap-4 lg:min-w-[220px]">
                    <div className="flex flex-col shrink-0 w-[70px]">
                      <span className="text-sm font-black text-slate-900 tracking-tight">{formatTime(schedule.startTime)}</span>
                      <span className="text-[10px] font-bold text-slate-400">to {formatTime(schedule.endTime)}</span>
                    </div>
                    
                    <div className="w-px h-8 bg-slate-200 hidden lg:block"></div>

                    <div className="flex flex-col overflow-hidden">
                      <span className={`w-fit px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest bg-${schedule.batchColor || 'blue'}-50 text-${schedule.batchColor || 'blue'}-700 border border-${schedule.batchColor || 'blue'}-100 mb-1`}>
                        {schedule.batchName}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight flex items-center gap-1.5 truncate">
                        <BookOpen className={`w-3.5 h-3.5 shrink-0 text-${schedule.batchColor || 'blue'}-500`} />
                        <span className="truncate">{schedule.subjectName}</span>
                      </h4>
                    </div>
                  </div>

                  {/* Middle: Expanding Topics */}
                  <div className="flex-1 px-0 lg:px-2 flex items-center">
                    {schedule.topics ? (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                        <span className="font-semibold text-slate-400 mr-1.5 uppercase tracking-wider text-[9px]">Topics:</span> 
                        {schedule.topics}
                      </p>
                    ) : (
                      <span className="text-[11px] text-slate-300 italic">No topics specified</span>
                    )}
                  </div>

                  {/* Right: Faculty & Meta Data */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 border-t lg:border-t-0 border-slate-100 pt-2.5 lg:pt-0 mt-1 lg:mt-0">
                    
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-500">
                      <MapPin className="w-2.5 h-2.5 text-slate-400" /> Offline
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Faculty</span>
                        <span className="text-xs font-bold text-slate-800 truncate max-w-[90px]">{schedule.facultyName}</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </div>
                    
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded transition-all text-slate-400 hover:text-blue-600 hidden lg:block">
                      <MoreVertical className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MasterTimetable;