import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, CalendarPlus, Search, Filter, Loader2, Layers, 
  X, Calendar, Clock, User, CheckCircle2, Ban, CalendarOff, ChevronDown, AlertTriangle
} from "lucide-react";
import toast from 'react-hot-toast';

import { Card } from "../../../../components/common";
import api from "../../../../services/api";

const ScheduleBySubjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectsData, setSubjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for Scheduling UI
  const [activeMenuId, setActiveMenuId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  // Custom Cancel Confirmation State
  const [showCancelConfirm, setShowCancelConfirm] = useState({ isOpen: false, targetModal: null });

  // Single Schedule Form State
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    topics: "",
    facultyId: null,
    facultyName: ""
  });

  // Multi Schedule Form State
  const [multiScheduleForm, setMultiScheduleForm] = useState({
    startDate: "",
    endDate: "",
    applySameTime: true,
    sameStartTime: "",
    sameEndTime: "",
    dailyTimes: {
      Monday: { start: "", end: "" },
      Tuesday: { start: "", end: "" },
      Wednesday: { start: "", end: "" },
      Thursday: { start: "", end: "" },
      Friday: { start: "", end: "" },
      Saturday: { start: "", end: "" }
    },
    topics: "",
    facultyId: null,
    facultyName: ""
  });

  // Custom Faculty Dropdown State (Shared between single and multi)
  const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);
  const [facultySearch, setFacultySearch] = useState("");
  const [availableFaculties, setAvailableFaculties] = useState([]);
  const [isFetchingFaculties, setIsFetchingFaculties] = useState(false);
  const facultyDropdownRef = useRef(null);

  // Fetch initial subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get('/api/batches/scheduling-subjects');
        if (response.data && response.data.success) {
          setSubjectsData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch scheduling subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch faculties for SINGLE Schedule whenever Date or Time changes
  useEffect(() => {
    const fetchFacultiesSingle = async () => {
      if (isModalOpen && scheduleForm.date && scheduleForm.startTime && scheduleForm.endTime) {
        setIsFetchingFaculties(true);
        try {
          const response = await api.get(`/api/admin/lms/scheduling/faculties?date=${scheduleForm.date}&startTime=${scheduleForm.startTime}&endTime=${scheduleForm.endTime}`);
          if (response.data && response.data.success) {
            setAvailableFaculties(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch faculties:", error);
        } finally {
          setIsFetchingFaculties(false);
        }
      } else if (isModalOpen) {
        setAvailableFaculties([]); 
      }
    };
    
    if (isModalOpen) {
      setScheduleForm(prev => ({...prev, facultyId: null, facultyName: ""}));
      fetchFacultiesSingle();
    }
  }, [isModalOpen, scheduleForm.date, scheduleForm.startTime, scheduleForm.endTime]);

  // Fetch faculties for MULTI Schedule based on Start Date
  useEffect(() => {
    const fetchFacultiesMulti = async () => {
      if (isMultiModalOpen && multiScheduleForm.startDate) {
        let st = "09:00";
        let et = "17:00";
        if (multiScheduleForm.applySameTime && multiScheduleForm.sameStartTime && multiScheduleForm.sameEndTime) {
          st = multiScheduleForm.sameStartTime;
          et = multiScheduleForm.sameEndTime;
        }

        setIsFetchingFaculties(true);
        try {
          const response = await api.get(`/api/admin/lms/scheduling/faculties?date=${multiScheduleForm.startDate}&startTime=${st}&endTime=${et}`);
          if (response.data && response.data.success) {
            setAvailableFaculties(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch faculties for multi-schedule:", error);
        } finally {
          setIsFetchingFaculties(false);
        }
      } else if (isMultiModalOpen) {
        setAvailableFaculties([]);
      }
    };
    
    if (isMultiModalOpen) {
      setMultiScheduleForm(prev => ({...prev, facultyId: null, facultyName: ""}));
      fetchFacultiesMulti();
    }
  }, [isMultiModalOpen, multiScheduleForm.startDate, multiScheduleForm.applySameTime, multiScheduleForm.sameStartTime, multiScheduleForm.sameEndTime]);

  // Close custom dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (facultyDropdownRef.current && !facultyDropdownRef.current.contains(event.target)) {
        setIsFacultyDropdownOpen(false);
      }
      if (!event.target.closest('.schedule-menu-container')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtering & Grouping Logic
  const filteredSubjects = subjectsData.filter(
    (sub) =>
      sub.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.batchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
    if (!acc[subject.batchName]) {
      acc[subject.batchName] = { color: subject.color, subjects: [] };
    }
    acc[subject.batchName].subjects.push(subject);
    return acc;
  }, {});

  // Handlers
  const handleOpenModal = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
    setActiveMenuId(null); 
    setScheduleForm({ date: "", startTime: "", endTime: "", topics: "", facultyId: null, facultyName: "" });
  };

  const handleOpenMultiModal = (subject) => {
    setSelectedSubject(subject);
    setIsMultiModalOpen(true);
    setActiveMenuId(null);
    setMultiScheduleForm({
      startDate: "",
      endDate: "",
      applySameTime: true,
      sameStartTime: "",
      sameEndTime: "",
      dailyTimes: {
        Monday: { start: "", end: "" },
        Tuesday: { start: "", end: "" },
        Wednesday: { start: "", end: "" },
        Thursday: { start: "", end: "" },
        Friday: { start: "", end: "" },
        Saturday: { start: "", end: "" }
      },
      topics: "",
      facultyId: null,
      facultyName: ""
    });
  };

  const handleDailyTimeChange = (day, type, value) => {
    setMultiScheduleForm(prev => ({
      ...prev,
      dailyTimes: {
        ...prev.dailyTimes,
        [day]: {
          ...prev.dailyTimes[day],
          [type]: value
        }
      }
    }));
  };

  const handleSaveSingleSchedule = async () => {
    try {
      if (!scheduleForm.date || !scheduleForm.startTime || !scheduleForm.endTime || !scheduleForm.facultyId) {
        toast.error("Please fill in all required fields (Date, Times, Faculty).");
        return;
      }

      const payload = {
        batchId: selectedSubject.batchId,
        subjectId: selectedSubject.subjectId,
        facultyId: scheduleForm.facultyId,
        date: scheduleForm.date,
        startTime: scheduleForm.startTime,
        endTime: scheduleForm.endTime,
        topics: scheduleForm.topics
      };

      const response = await api.post('/api/admin/lms/scheduling/create', payload);
      
      if (response.data && response.data.success) {
        toast.success("Schedule saved successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to save schedule:", error);
      toast.error("Failed to save schedule. Please try again.");
    }
  };

  const handleSaveMultiSchedule = async () => {
    try {
      if (!multiScheduleForm.startDate || !multiScheduleForm.endDate || !multiScheduleForm.facultyId) {
        toast.error("Please fill in Start Date, End Date, and assign a Faculty.");
        return;
      }

      const payloads = [];
      let currDate = new Date(multiScheduleForm.startDate);
      const endDate = new Date(multiScheduleForm.endDate);

      currDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (currDate > endDate) {
        toast.error("Start Date cannot be after End Date.");
        return;
      }

      while (currDate <= endDate) {
        const dayName = currDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (dayName !== 'Sunday') {
          let startTime = "";
          let endTime = "";
          
          if (multiScheduleForm.applySameTime) {
            startTime = multiScheduleForm.sameStartTime;
            endTime = multiScheduleForm.sameEndTime;
          } else {
            startTime = multiScheduleForm.dailyTimes[dayName].start;
            endTime = multiScheduleForm.dailyTimes[dayName].end;
          }
          
          if (startTime && endTime) {
            const year = currDate.getFullYear();
            const month = String(currDate.getMonth() + 1).padStart(2, '0');
            const day = String(currDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            payloads.push({
              batchId: selectedSubject.batchId,
              subjectId: selectedSubject.subjectId,
              facultyId: multiScheduleForm.facultyId,
              date: dateStr,
              startTime: startTime,
              endTime: endTime,
              topics: multiScheduleForm.topics
            });
          }
        }
        currDate.setDate(currDate.getDate() + 1);
      }

      if (payloads.length === 0) {
        toast.error("No valid schedules generated. Please provide times for the selected dates.");
        return;
      }

      await Promise.all(payloads.map(payload => api.post('/api/admin/lms/scheduling/create', payload)));
      
      toast.success(`Successfully saved ${payloads.length} schedules!`);
      setIsMultiModalOpen(false);
      
    } catch (error) {
      console.error("Failed to save multiple schedules:", error);
      toast.error("Failed to save some or all schedules. Please try again.");
    }
  };

  const handleCancelSingle = () => setShowCancelConfirm({ isOpen: true, targetModal: 'single' });
  const handleCancelMulti = () => setShowCancelConfirm({ isOpen: true, targetModal: 'multi' });

  const filteredFacultiesList = availableFaculties.filter(f => 
    f.name.toLowerCase().includes(facultySearch.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-8 relative">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Available Subjects</h2>
          <p className="text-sm text-slate-500 mt-1">Select a subject to manage its timeline</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search subject or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-72 bg-white shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">Loading subjects...</p>
        </div>
      ) : filteredSubjects.length === 0 ? (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">No subjects found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your search terms.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSubjects).map(([batchName, groupData]) => {
            // Check if any subject in this specific batch card has an active menu opened
            const isCardActive = groupData.subjects.some(sub => `${sub.batchId}-${sub.subjectId}` === activeMenuId);

            return (
              <Card 
                key={batchName} 
                className={`p-0 overflow-visible border border-slate-200/60 shadow-sm relative transition-all ${isCardActive ? 'z-[60]' : 'z-10'}`}
              >
                <div className={`px-6 py-4 bg-${groupData.color}-50/50 border-b border-slate-100 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${groupData.color}-100 text-${groupData.color}-600 rounded-lg shadow-sm`}>
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">{batchName}</h3>
                  </div>
                  <span className={`bg-white border border-${groupData.color}-200 text-${groupData.color}-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                    {groupData.subjects.length} Subject{groupData.subjects.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50/30">
                  {groupData.subjects.map((subject) => {
                    const uniqueId = `${subject.batchId}-${subject.subjectId}`;
                    const isActive = activeMenuId === uniqueId;

                    return (
                      <div
                        key={uniqueId}
                        className={`group flex items-center justify-between p-3.5 rounded-xl border bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 relative schedule-menu-container ${isActive ? 'z-[70] border-blue-300 ring-2 ring-blue-500/20 shadow-md' : 'z-10 border-slate-200'}`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={`w-10 h-10 rounded-full bg-${subject.color}-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                            <BookOpen className={`w-4 h-4 text-${subject.color}-600`} />
                          </div>
                          <div className="truncate">
                            <h4 className="font-semibold text-slate-900 text-sm truncate tracking-tight">
                              {subject.subjectName}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              Manage Schedule
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <button 
                            onClick={() => setActiveMenuId(isActive ? null : uniqueId)}
                            className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border transition-all shadow-sm group-hover:shadow ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600'}`}
                          >
                            <CalendarPlus className="w-4 h-4" />
                          </button>

                          {isActive && (
                            <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-[100] animate-in slide-in-from-top-2 fade-in duration-200 origin-top-right">
                              <button 
                                onClick={() => handleOpenModal(subject)}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium"
                              >
                                <Calendar className="w-4 h-4" />
                                Single Schedule
                              </button>
                              <button 
                                onClick={() => handleOpenMultiModal(subject)}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium"
                              >
                                <Layers className="w-4 h-4" />
                                Multiple Schedule
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* =========================================================
          SINGLE SCHEDULE MODAL OVERLAY
          ========================================================= */}
      {isModalOpen && selectedSubject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className={`px-6 py-4 bg-${selectedSubject.color}-50 border-b border-${selectedSubject.color}-100 flex items-center justify-between`}>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Create Single Schedule</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-${selectedSubject.color}-100 text-${selectedSubject.color}-700 border border-${selectedSubject.color}-200`}>
                    {selectedSubject.batchName}
                  </span>
                  <span className="text-sm font-medium text-slate-600 border-l border-slate-300 pl-2">
                    {selectedSubject.subjectName}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleCancelSingle}
                className="p-2 rounded-full hover:bg-slate-200/50 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* DATE */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="date" 
                      value={scheduleForm.date}
                      onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                    />
                  </div>
                </div>

                {/* TIME (Start & End) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Start Time <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="time" 
                        value={scheduleForm.startTime}
                        onChange={(e) => setScheduleForm({...scheduleForm, startTime: e.target.value})}
                        className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">End Time <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="time" 
                        value={scheduleForm.endTime}
                        onChange={(e) => setScheduleForm({...scheduleForm, endTime: e.target.value})}
                        className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* SMART FACULTY DROPDOWN */}
                <div className="space-y-1.5 md:col-span-2 relative" ref={isModalOpen ? facultyDropdownRef : null}>
                  <label className="text-sm font-semibold text-slate-700">Assign Faculty <span className="text-red-500">*</span></label>
                  
                  <div 
                    onClick={() => {
                      if (!scheduleForm.date || !scheduleForm.startTime || !scheduleForm.endTime) {
                        toast.error("Please select a Date and Time first to check faculty availability.");
                        return;
                      }
                      setIsFacultyDropdownOpen(!isFacultyDropdownOpen);
                    }}
                    className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${isFacultyDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="flex items-center gap-2 text-slate-700">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className={scheduleForm.facultyName ? "font-medium" : "text-slate-400"}>
                        {scheduleForm.facultyName || "Select a faculty member..."}
                      </span>
                    </div>
                    {isFetchingFaculties ? (
                      <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                    ) : (
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFacultyDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </div>

                  {isFacultyDropdownOpen && (
                    <div className="absolute top-[72px] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                      
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            autoFocus
                            placeholder="Search by faculty name..."
                            value={facultySearch}
                            onChange={(e) => setFacultySearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="max-h-60 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {filteredFacultiesList.length === 0 ? (
                          <div className="p-4 text-center text-sm text-slate-500">No faculty found.</div>
                        ) : (
                          filteredFacultiesList.map((fac) => {
                            const isAvailable = fac.status === "AVAILABLE";
                            const isOnLeave = fac.status === "ON_LEAVE";
                            const isBusy = fac.status === "BUSY";

                            return (
                              <div 
                                key={fac.id}
                                onClick={() => {
                                  if (isAvailable) {
                                    setScheduleForm({...scheduleForm, facultyId: fac.id, facultyName: fac.name});
                                    setIsFacultyDropdownOpen(false);
                                  }
                                }}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                  isAvailable 
                                    ? "bg-white border-transparent hover:bg-blue-50 hover:border-blue-100 cursor-pointer" 
                                    : "bg-slate-50 border-slate-100 opacity-80 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAvailable ? 'bg-blue-100' : 'bg-slate-200'}`}>
                                    <User className={`w-4 h-4 ${isAvailable ? 'text-blue-600' : 'text-slate-400'}`} />
                                  </div>
                                  <span className={`font-semibold ${isAvailable ? 'text-slate-800' : 'text-slate-500'}`}>
                                    {fac.name}
                                  </span>
                                </div>

                                <div>
                                  {isAvailable && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                                      <CheckCircle2 className="w-3 h-3" /> Available
                                    </span>
                                  )}
                                  {isOnLeave && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200">
                                      <CalendarOff className="w-3 h-3" /> On Leave
                                    </span>
                                  )}
                                  {isBusy && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                                      <Ban className="w-3 h-3" /> Busy: {fac.busyBatch}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* TOPICS */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Topics / Description</label>
                  <textarea 
                    rows="3"
                    placeholder="Enter the topics to be covered..."
                    value={scheduleForm.topics}
                    onChange={(e) => setScheduleForm({...scheduleForm, topics: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 resize-none"
                  ></textarea>
                </div>

              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={handleCancelSingle}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSingleSchedule}
                className={`px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-all flex items-center gap-2 bg-${selectedSubject.color}-600 hover:bg-${selectedSubject.color}-700`}
              >
                <CalendarPlus className="w-4 h-4" />
                Save Schedule
              </button>
            </div>

          </div>
        </div>
      )}


      {/* =========================================================
          MULTIPLE SCHEDULE MODAL OVERLAY
          ========================================================= */}
      {isMultiModalOpen && selectedSubject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[95vh]">
            
            <div className={`px-6 py-4 bg-${selectedSubject.color}-50 border-b border-${selectedSubject.color}-100 flex items-center justify-between`}>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Create Multiple Schedules</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-${selectedSubject.color}-100 text-${selectedSubject.color}-700 border border-${selectedSubject.color}-200`}>
                    {selectedSubject.batchName}
                  </span>
                  <span className="text-sm font-medium text-slate-600 border-l border-slate-300 pl-2">
                    {selectedSubject.subjectName}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleCancelMulti}
                className="p-2 rounded-full hover:bg-slate-200/50 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="space-y-6">
                
                {/* DATE RANGE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Start Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="date" 
                        value={multiScheduleForm.startDate}
                        onChange={(e) => setMultiScheduleForm({...multiScheduleForm, startDate: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">End Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="date" 
                        value={multiScheduleForm.endDate}
                        min={multiScheduleForm.startDate}
                        onChange={(e) => setMultiScheduleForm({...multiScheduleForm, endDate: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* SAME TIME CHECKBOX */}
                <div className="pt-2 pb-1 border-b border-slate-100">
                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={multiScheduleForm.applySameTime}
                        onChange={(e) => setMultiScheduleForm({...multiScheduleForm, applySameTime: e.target.checked})}
                        className="w-5 h-5 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer transition-colors"
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                      Apply same time to all days (Mon - Sat)
                    </span>
                  </label>
                </div>

                {/* TIME INPUTS */}
                {multiScheduleForm.applySameTime ? (
                  <div className="grid grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Common Start Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="time" 
                          value={multiScheduleForm.sameStartTime}
                          onChange={(e) => setMultiScheduleForm({...multiScheduleForm, sameStartTime: e.target.value})}
                          className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Common End Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="time" 
                          value={multiScheduleForm.sameEndTime}
                          onChange={(e) => setMultiScheduleForm({...multiScheduleForm, sameEndTime: e.target.value})}
                          className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Configure Daily Timings</p>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <div key={day} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 md:col-span-4 font-medium text-slate-700 text-sm">
                          {day}
                        </div>
                        <div className="col-span-6 md:col-span-4 relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="time" 
                            placeholder="Start"
                            value={multiScheduleForm.dailyTimes[day].start}
                            onChange={(e) => handleDailyTimeChange(day, 'start', e.target.value)}
                            className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-4 relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="time" 
                            placeholder="End"
                            value={multiScheduleForm.dailyTimes[day].end}
                            onChange={(e) => handleDailyTimeChange(day, 'end', e.target.value)}
                            className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SMART FACULTY DROPDOWN */}
                <div className="space-y-1.5 relative" ref={isMultiModalOpen ? facultyDropdownRef : null}>
                  <label className="text-sm font-semibold text-slate-700">Assign Faculty <span className="text-red-500">*</span></label>
                  
                  <div 
                    onClick={() => {
                      if (!multiScheduleForm.startDate) {
                        toast.error("Please select a Start Date first to check faculty availability.");
                        return;
                      }
                      setIsFacultyDropdownOpen(!isFacultyDropdownOpen);
                    }}
                    className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${isFacultyDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="flex items-center gap-2 text-slate-700">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className={multiScheduleForm.facultyName ? "font-medium" : "text-slate-400"}>
                        {multiScheduleForm.facultyName || "Select a faculty member..."}
                      </span>
                    </div>
                    {isFetchingFaculties ? (
                      <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                    ) : (
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFacultyDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </div>

                  {isFacultyDropdownOpen && (
                    <div className="absolute top-[72px] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                      
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            autoFocus
                            placeholder="Search by faculty name..."
                            value={facultySearch}
                            onChange={(e) => setFacultySearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="max-h-60 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {filteredFacultiesList.length === 0 ? (
                          <div className="p-4 text-center text-sm text-slate-500">No faculty found.</div>
                        ) : (
                          filteredFacultiesList.map((fac) => {
                            const isAvailable = fac.status === "AVAILABLE";
                            const isOnLeave = fac.status === "ON_LEAVE";
                            const isBusy = fac.status === "BUSY";

                            return (
                              <div 
                                key={fac.id}
                                onClick={() => {
                                  if (isAvailable) {
                                    setMultiScheduleForm({...multiScheduleForm, facultyId: fac.id, facultyName: fac.name});
                                    setIsFacultyDropdownOpen(false);
                                  }
                                }}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                  isAvailable 
                                    ? "bg-white border-transparent hover:bg-blue-50 hover:border-blue-100 cursor-pointer" 
                                    : "bg-slate-50 border-slate-100 opacity-80 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAvailable ? 'bg-blue-100' : 'bg-slate-200'}`}>
                                    <User className={`w-4 h-4 ${isAvailable ? 'text-blue-600' : 'text-slate-400'}`} />
                                  </div>
                                  <span className={`font-semibold ${isAvailable ? 'text-slate-800' : 'text-slate-500'}`}>
                                    {fac.name}
                                  </span>
                                </div>

                                <div>
                                  {isAvailable && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                                      <CheckCircle2 className="w-3 h-3" /> Available
                                    </span>
                                  )}
                                  {isOnLeave && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200">
                                      <CalendarOff className="w-3 h-3" /> On Leave
                                    </span>
                                  )}
                                  {isBusy && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                                      <Ban className="w-3 h-3" /> Busy: {fac.busyBatch}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* TOPICS */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Topics / Description</label>
                  <textarea 
                    rows="3"
                    placeholder="Enter the topics to be covered across these sessions..."
                    value={multiScheduleForm.topics}
                    onChange={(e) => setMultiScheduleForm({...multiScheduleForm, topics: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 resize-none"
                  ></textarea>
                </div>

              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={handleCancelMulti}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveMultiSchedule}
                className={`px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-all flex items-center gap-2 bg-${selectedSubject.color}-600 hover:bg-${selectedSubject.color}-700`}
              >
                <Layers className="w-4 h-4" />
                Save All Schedules
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          CANCEL CONFIRMATION OVERLAY (CUSTOM SITE POPUP)
          ========================================================= */}
      {showCancelConfirm.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Cancel Changes?</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to cancel? All your unsaved changes will be lost.</p>
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => setShowCancelConfirm({ isOpen: false, targetModal: null })}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                No, Keep Editing
              </button>
              <button 
                onClick={() => {
                  if (showCancelConfirm.targetModal === 'single') setIsModalOpen(false);
                  if (showCancelConfirm.targetModal === 'multi') setIsMultiModalOpen(false);
                  setShowCancelConfirm({ isOpen: false, targetModal: null });
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-rose-600/20"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ScheduleBySubjects;