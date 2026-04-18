import React, { useState, useEffect, useRef } from "react";
import { 
  CalendarPlus, Search, Filter, Loader2, Layers, BookOpen,
  X, Calendar, Clock, User, CheckCircle2, Ban, CalendarOff, ChevronDown, AlertTriangle
} from "lucide-react";
import toast from 'react-hot-toast';

import { Card } from "../../../../components/common";
import api from "../../../../services/api";

const ScheduleByBatches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [batchesData, setBatchesData] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for Scheduling UI
  const [activeMenuId, setActiveMenuId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  
  // Custom Cancel Confirmation State
  const [showCancelConfirm, setShowCancelConfirm] = useState({ isOpen: false, targetModal: null });

  // Single Schedule Form State (Master-Detail)
  const [batchScheduleForms, setBatchScheduleForms] = useState({});
  const [activeSubjectTab, setActiveSubjectTab] = useState(null);

  // Multi Schedule Form State (Master-Detail)
  const [batchMultiScheduleForms, setBatchMultiScheduleForms] = useState({});
  const [activeMultiSubjectTab, setActiveMultiSubjectTab] = useState(null);

  const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);
  const [facultySearch, setFacultySearch] = useState("");
  const [availableFaculties, setAvailableFaculties] = useState([]);
  const [isFetchingFaculties, setIsFetchingFaculties] = useState(false);
  const facultyDropdownRef = useRef(null);

  // Fetch initial batches and subjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [batchesRes, subjectsRes] = await Promise.all([
          api.get('/api/batches'),
          api.get('/api/batches/scheduling-subjects')
        ]);

        if (batchesRes.data?.success) setBatchesData(batchesRes.data.data);
        if (subjectsRes.data?.success) setAllSubjects(subjectsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch faculties for SINGLE Schedule
  const currentSingleForm = batchScheduleForms[activeSubjectTab] || {};
  useEffect(() => {
    const fetchFacultiesSingle = async () => {
      if (isModalOpen && currentSingleForm.date && currentSingleForm.startTime && currentSingleForm.endTime) {
        setIsFetchingFaculties(true);
        try {
          const response = await api.get(`/api/admin/lms/scheduling/faculties?date=${currentSingleForm.date}&startTime=${currentSingleForm.startTime}&endTime=${currentSingleForm.endTime}`);
          if (response.data?.success) setAvailableFaculties(response.data.data);
        } catch (error) {
          console.error("Failed to fetch faculties:", error);
        } finally {
          setIsFetchingFaculties(false);
        }
      } else if (isModalOpen) {
        setAvailableFaculties([]); 
      }
    };
    fetchFacultiesSingle();
  }, [isModalOpen, activeSubjectTab, currentSingleForm.date, currentSingleForm.startTime, currentSingleForm.endTime]);

  // Fetch faculties for MULTI Schedule
  const currentMultiForm = batchMultiScheduleForms[activeMultiSubjectTab] || {};
  useEffect(() => {
    const fetchFacultiesMulti = async () => {
      if (isMultiModalOpen && currentMultiForm.startDate) {
        let st = "09:00", et = "17:00";
        if (currentMultiForm.applySameTime && currentMultiForm.sameStartTime && currentMultiForm.sameEndTime) {
          st = currentMultiForm.sameStartTime;
          et = currentMultiForm.sameEndTime;
        }
        setIsFetchingFaculties(true);
        try {
          const response = await api.get(`/api/admin/lms/scheduling/faculties?date=${currentMultiForm.startDate}&startTime=${st}&endTime=${et}`);
          if (response.data?.success) setAvailableFaculties(response.data.data);
        } catch (error) {
          console.error("Failed to fetch faculties:", error);
        } finally {
          setIsFetchingFaculties(false);
        }
      } else if (isMultiModalOpen) {
        setAvailableFaculties([]);
      }
    };
    fetchFacultiesMulti();
  }, [isMultiModalOpen, activeMultiSubjectTab, currentMultiForm.startDate, currentMultiForm.applySameTime, currentMultiForm.sameStartTime, currentMultiForm.sameEndTime]);

  // Handle clicking outside custom dropdowns
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

  const filteredBatches = batchesData.filter((batch) => {
    const batchName = batch.name || "";
    return batchName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const groupedBatches = filteredBatches.reduce((acc, batch) => {
    const year = batch.academicYear || "Current Academic Year";
    if (!acc[year]) { acc[year] = { color: 'blue', batches: [] }; }
    acc[year].batches.push(batch);
    return acc;
  }, {});

  const getSubjectsForBatch = (batchId) => allSubjects.filter(sub => sub.batchId === batchId);

  // ===================== SINGLE SCHEDULE LOGIC =====================
  const isSubjectComplete = (subjectId) => {
    const form = batchScheduleForms[subjectId];
    return form && form.date && form.startTime && form.endTime && form.facultyId;
  };

  const handleSubjectFormChange = (field, value) => {
    setBatchScheduleForms(prev => ({
      ...prev, [activeSubjectTab]: { ...prev[activeSubjectTab], [field]: value }
    }));
  };

  const handleOpenModal = (batch) => {
    const batchSubs = getSubjectsForBatch(batch.id);
    if (batchSubs.length === 0) { toast.error("This batch has no subjects assigned yet."); return; }
    setSelectedBatch(batch);
    
    const initialForms = {};
    batchSubs.forEach(sub => {
      initialForms[sub.subjectId] = { date: "", startTime: "", endTime: "", topics: "", facultyId: null, facultyName: "" };
    });
    
    setBatchScheduleForms(initialForms);
    setActiveSubjectTab(batchSubs[0].subjectId);
    setIsModalOpen(true);
    setActiveMenuId(null); 
  };

  const handleSaveSingleSchedule = async () => {
    const batchSubs = getSubjectsForBatch(selectedBatch.id);
    const incompleteSubjects = [];
    const payloads = [];

    batchSubs.forEach(sub => {
      if (!isSubjectComplete(sub.subjectId)) {
        incompleteSubjects.push(sub.subjectName);
      } else {
        const form = batchScheduleForms[sub.subjectId];
        payloads.push({
          batchId: selectedBatch.id, subjectId: sub.subjectId, facultyId: form.facultyId,
          date: form.date, startTime: form.startTime, endTime: form.endTime, topics: form.topics
        });
      }
    });

    if (incompleteSubjects.length > 0) {
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm">Incomplete Batch Schedule!</span>
          <span className="text-xs text-slate-600">Please complete schedules for the following subjects before saving:</span>
          <ul className="text-xs font-semibold text-rose-600 list-disc list-inside mt-1">
            {incompleteSubjects.map((name, i) => <li key={i}>{name}</li>)}
          </ul>
        </div>, { duration: 5000 }
      );
      return;
    }

    try {
      await Promise.all(payloads.map(payload => api.post('/api/admin/lms/scheduling/create', payload)));
      toast.success("All subject schedules saved successfully for the batch!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save schedule:", error);
      toast.error("Failed to save schedules. Please try again.");
    }
  };

  // ===================== MULTIPLE SCHEDULE LOGIC =====================
  const isMultiSubjectComplete = (subjectId) => {
    const form = batchMultiScheduleForms[subjectId];
    if (!form || !form.startDate || !form.endDate || !form.facultyId) return false;
    
    // Validate if time is provided based on the checkbox mode
    if (form.applySameTime) {
      if (!form.sameStartTime || !form.sameEndTime) return false;
    } else {
      const hasDailyTime = Object.values(form.dailyTimes).some(day => day.start && day.end);
      if (!hasDailyTime) return false;
    }
    return true;
  };

  const handleMultiSubjectFormChange = (field, value) => {
    setBatchMultiScheduleForms(prev => ({
      ...prev, [activeMultiSubjectTab]: { ...prev[activeMultiSubjectTab], [field]: value }
    }));
  };

  const handleMultiDailyTimeChange = (day, type, value) => {
    setBatchMultiScheduleForms(prev => ({
      ...prev,
      [activeMultiSubjectTab]: {
        ...prev[activeMultiSubjectTab],
        dailyTimes: {
          ...prev[activeMultiSubjectTab].dailyTimes,
          [day]: {
            ...prev[activeMultiSubjectTab].dailyTimes[day],
            [type]: value
          }
        }
      }
    }));
  };

  const handleOpenMultiModal = (batch) => {
    const batchSubs = getSubjectsForBatch(batch.id);
    if (batchSubs.length === 0) { toast.error("This batch has no subjects assigned yet."); return; }
    setSelectedBatch(batch);
    
    const initialForms = {};
    batchSubs.forEach(sub => {
      initialForms[sub.subjectId] = {
        startDate: "", endDate: "", applySameTime: true, sameStartTime: "", sameEndTime: "",
        dailyTimes: {
          Monday: { start: "", end: "" }, Tuesday: { start: "", end: "" }, Wednesday: { start: "", end: "" },
          Thursday: { start: "", end: "" }, Friday: { start: "", end: "" }, Saturday: { start: "", end: "" }
        },
        topics: "", facultyId: null, facultyName: ""
      };
    });
    
    setBatchMultiScheduleForms(initialForms);
    setActiveMultiSubjectTab(batchSubs[0].subjectId);
    setIsMultiModalOpen(true);
    setActiveMenuId(null);
  };

  const handleSaveMultiSchedule = async () => {
    const batchSubs = getSubjectsForBatch(selectedBatch.id);
    const incompleteSubjects = [];
    const payloads = [];

    batchSubs.forEach(sub => {
      if (!isMultiSubjectComplete(sub.subjectId)) {
        incompleteSubjects.push(sub.subjectName);
      } else {
        const form = batchMultiScheduleForms[sub.subjectId];
        let currDate = new Date(form.startDate);
        const endDate = new Date(form.endDate);

        currDate.setHours(0, 0, 0, 0); endDate.setHours(0, 0, 0, 0);

        while (currDate <= endDate) {
          const dayName = currDate.toLocaleDateString('en-US', { weekday: 'long' });
          if (dayName !== 'Sunday') {
            let startTime = form.applySameTime ? form.sameStartTime : form.dailyTimes[dayName].start;
            let endTime = form.applySameTime ? form.sameEndTime : form.dailyTimes[dayName].end;
            
            if (startTime && endTime) {
              const dateStr = `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`;
              payloads.push({
                batchId: selectedBatch.id, subjectId: sub.subjectId, facultyId: form.facultyId,
                date: dateStr, startTime: startTime, endTime: endTime, topics: form.topics
              });
            }
          }
          currDate.setDate(currDate.getDate() + 1);
        }
      }
    });

    if (incompleteSubjects.length > 0) {
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm">Incomplete Batch Schedule!</span>
          <span className="text-xs text-slate-600">Please complete schedules for the following subjects before saving:</span>
          <ul className="text-xs font-semibold text-rose-600 list-disc list-inside mt-1">
            {incompleteSubjects.map((name, i) => <li key={i}>{name}</li>)}
          </ul>
        </div>, { duration: 5000 }
      );
      return;
    }

    if (payloads.length === 0) {
      toast.error("No valid schedules generated. Please verify start and end dates.");
      return;
    }

    try {
      await Promise.all(payloads.map(payload => api.post('/api/admin/lms/scheduling/create', payload)));
      toast.success(`Successfully saved ${payloads.length} schedules across all subjects!`);
      setIsMultiModalOpen(false);
    } catch (error) {
      console.error("Failed to save multiple schedules:", error);
      toast.error("Failed to save some or all schedules. Please try again.");
    }
  };

  const handleCancelSingle = () => setShowCancelConfirm({ isOpen: true, targetModal: 'single' });
  const handleCancelMulti = () => setShowCancelConfirm({ isOpen: true, targetModal: 'multi' });

  const filteredFacultiesList = availableFaculties.filter(f => f.name.toLowerCase().includes(facultySearch.toLowerCase()));
  const activeBatchSubjects = selectedBatch ? getSubjectsForBatch(selectedBatch.id) : [];

  return (
    <div className="animate-in fade-in duration-500 pb-8 relative">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Available Batches</h2>
          <p className="text-sm text-slate-500 mt-1">Select an entire batch to manage its timeline</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search batch name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-72 bg-white shadow-sm" />
          </div>
          <button className="flex items-center gap-2 rounded-xl px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm font-medium">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">Loading batches...</p>
        </div>
      ) : filteredBatches.length === 0 ? (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">No batches found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your search terms.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedBatches).map(([year, groupData]) => {
            const isCardActive = groupData.batches.some(b => b.id === activeMenuId);

            return (
              <Card 
                key={year} 
                className={`p-0 overflow-visible border border-slate-200/60 shadow-sm relative transition-all ${isCardActive ? 'z-[60]' : 'z-10'}`}
              >
                <div className={`px-6 py-4 bg-${groupData.color}-50/50 border-b border-slate-100 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${groupData.color}-100 text-${groupData.color}-600 rounded-lg shadow-sm`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">{year}</h3>
                  </div>
                  <span className={`bg-white border border-${groupData.color}-200 text-${groupData.color}-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                    {groupData.batches.length} Batch{groupData.batches.length !== 1 ? 'es' : ''}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50/30">
                  {groupData.batches.map((batch) => {
                    const isActive = activeMenuId === batch.id;
                    const batchSubsCount = getSubjectsForBatch(batch.id).length;

                    return (
                      <div
                        key={batch.id}
                        className={`group flex items-center justify-between p-3.5 rounded-xl border bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 relative schedule-menu-container ${isActive ? 'z-[70] border-blue-300 ring-2 ring-blue-500/20 shadow-md' : 'z-10 border-slate-200'}`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={`w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                            <Layers className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="truncate">
                            <h4 className="font-semibold text-slate-900 text-sm truncate tracking-tight">
                              {batch.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {batchSubsCount} Assigned Subjects
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <button 
                            onClick={() => setActiveMenuId(isActive ? null : batch.id)}
                            className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border transition-all shadow-sm group-hover:shadow ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600'}`}
                          >
                            <CalendarPlus className="w-4 h-4" />
                          </button>

                          {isActive && (
                            <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-[100] animate-in slide-in-from-top-2 fade-in duration-200 origin-top-right">
                              <button 
                                onClick={() => handleOpenModal(batch)}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium"
                              >
                                <Calendar className="w-4 h-4" />
                                Single Schedule
                              </button>
                              <button 
                                onClick={() => handleOpenMultiModal(batch)}
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
          SINGLE SCHEDULE MODAL (MASTER-DETAIL LAYOUT)
          ========================================================= */}
      {isModalOpen && selectedBatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[90vh]">
            
            <div className={`px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between shrink-0`}>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Create Batch Daily Schedule</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200`}>
                    {selectedBatch.name}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">You must configure all subjects to save.</span>
                </div>
              </div>
              <button onClick={handleCancelSingle} className="p-2 rounded-full hover:bg-slate-200/50 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              
              {/* Sidebar: Subject Navigation */}
              <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto custom-scrollbar shrink-0">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Subjects to Schedule</h3>
                <div className="space-y-2">
                  {activeBatchSubjects.map(sub => {
                    const isComplete = isSubjectComplete(sub.subjectId);
                    const isActive = activeSubjectTab === sub.subjectId;
                    
                    return (
                      <button 
                        key={sub.subjectId}
                        onClick={() => setActiveSubjectTab(sub.subjectId)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                          isActive ? 'bg-white border-blue-400 ring-2 ring-blue-500/20 shadow-sm' : 'bg-transparent border-slate-200 hover:bg-slate-200/50 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className={`text-sm font-semibold truncate ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                            {sub.subjectName}
                          </span>
                        </div>
                        {isComplete ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 drop-shadow-sm" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Content: Form for Active Subject */}
              <div className="w-full md:w-2/3 p-6 overflow-y-auto custom-scrollbar bg-white">
                <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    {activeBatchSubjects.find(s => s.subjectId === activeSubjectTab)?.subjectName} Configuration
                  </h3>
                  {isSubjectComplete(activeSubjectTab) && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="date" value={currentSingleForm.date || ""} onChange={(e) => handleSubjectFormChange('date', e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Start Time <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="time" value={currentSingleForm.startTime || ""} onChange={(e) => handleSubjectFormChange('startTime', e.target.value)} className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">End Time <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="time" value={currentSingleForm.endTime || ""} onChange={(e) => handleSubjectFormChange('endTime', e.target.value)} className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2 relative" ref={isModalOpen ? facultyDropdownRef : null}>
                    <label className="text-sm font-semibold text-slate-700">Assign Faculty <span className="text-red-500">*</span></label>
                    <div onClick={() => {
                        if (!currentSingleForm.date || !currentSingleForm.startTime || !currentSingleForm.endTime) { toast.error("Please select Date and Time first."); return; }
                        setIsFacultyDropdownOpen(!isFacultyDropdownOpen);
                      }}
                      className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${isFacultyDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-2 text-slate-700">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className={currentSingleForm.facultyName ? "font-medium" : "text-slate-400"}>{currentSingleForm.facultyName || "Select a faculty member..."}</span>
                      </div>
                      {isFetchingFaculties ? <Loader2 className="w-4 h-4 text-slate-400 animate-spin" /> : <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFacultyDropdownOpen ? 'rotate-180' : ''}`} />}
                    </div>

                    {isFacultyDropdownOpen && (
                      <div className="absolute top-[72px] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" autoFocus placeholder="Search faculty name..." value={facultySearch} onChange={(e) => setFacultySearch(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                          </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto custom-scrollbar p-2 space-y-1">
                          {filteredFacultiesList.length === 0 ? (
                            <div className="p-4 text-center text-sm text-slate-500">No faculty found.</div>
                          ) : (
                            filteredFacultiesList.map((fac) => {
                              const isAvailable = fac.status === "AVAILABLE", isOnLeave = fac.status === "ON_LEAVE", isBusy = fac.status === "BUSY";
                              return (
                                <div key={fac.id} onClick={() => { 
                                    if (isAvailable) { 
                                      handleSubjectFormChange('facultyId', fac.id);
                                      handleSubjectFormChange('facultyName', fac.name);
                                      setIsFacultyDropdownOpen(false); 
                                    } 
                                  }}
                                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isAvailable ? "bg-white border-transparent hover:bg-blue-50 hover:border-blue-100 cursor-pointer" : "bg-slate-50 border-slate-100 opacity-80 cursor-not-allowed"}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAvailable ? 'bg-blue-100' : 'bg-slate-200'}`}><User className={`w-4 h-4 ${isAvailable ? 'text-blue-600' : 'text-slate-400'}`} /></div>
                                    <span className={`font-semibold ${isAvailable ? 'text-slate-800' : 'text-slate-500'}`}>{fac.name}</span>
                                  </div>
                                  <div>
                                    {isAvailable && <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200"><CheckCircle2 className="w-3 h-3" /> Available</span>}
                                    {isOnLeave && <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200"><CalendarOff className="w-3 h-3" /> On Leave</span>}
                                    {isBusy && <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200"><Ban className="w-3 h-3" /> Busy: {fac.busyBatch}</span>}
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Topics / Description</label>
                    <textarea 
                      rows="3" placeholder="Enter topics to be covered for this subject..." 
                      value={currentSingleForm.topics || ""} 
                      onChange={(e) => handleSubjectFormChange('topics', e.target.value)} 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-xs font-medium text-slate-500">
                {activeBatchSubjects.filter(sub => isSubjectComplete(sub.subjectId)).length} / {activeBatchSubjects.length} Subjects Configured
              </span>
              <div className="flex items-center gap-3">
                <button onClick={handleCancelSingle} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-colors">Cancel</button>
                <button onClick={handleSaveSingleSchedule} className={`px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-all flex items-center gap-2 bg-blue-600 hover:bg-blue-700`}>
                  <CalendarPlus className="w-4 h-4" /> Save All Schedules
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          MULTIPLE SCHEDULE MODAL (MASTER-DETAIL LAYOUT)
          ========================================================= */}
      {isMultiModalOpen && selectedBatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[95vh]">
            
            {/* Modal Header */}
            <div className={`px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between shrink-0`}>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Create Multiple Batch Schedules</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200`}>
                    {selectedBatch.name}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">Configure repeating timelines for all subjects.</span>
                </div>
              </div>
              <button onClick={handleCancelMulti} className="p-2 rounded-full hover:bg-slate-200/50 text-slate-500 transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Modal Body (Sidebar + Content) */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              
              {/* Sidebar: Subject Navigation */}
              <div className="w-full md:w-[30%] bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto custom-scrollbar shrink-0">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Subjects to Schedule</h3>
                <div className="space-y-2">
                  {activeBatchSubjects.map(sub => {
                    const isComplete = isMultiSubjectComplete(sub.subjectId);
                    const isActive = activeMultiSubjectTab === sub.subjectId;
                    
                    return (
                      <button 
                        key={sub.subjectId}
                        onClick={() => setActiveMultiSubjectTab(sub.subjectId)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                          isActive ? 'bg-white border-blue-400 ring-2 ring-blue-500/20 shadow-sm' : 'bg-transparent border-slate-200 hover:bg-slate-200/50 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className={`text-sm font-semibold truncate ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                            {sub.subjectName}
                          </span>
                        </div>
                        {isComplete ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 drop-shadow-sm" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Content: Form for Active Subject */}
              <div className="w-full md:w-[70%] p-6 overflow-y-auto custom-scrollbar bg-white">
                <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    {activeBatchSubjects.find(s => s.subjectId === activeMultiSubjectTab)?.subjectName} Configuration
                  </h3>
                  {isMultiSubjectComplete(activeMultiSubjectTab) && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Start Date <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="date" value={currentMultiForm.startDate || ""} onChange={(e) => handleMultiSubjectFormChange('startDate', e.target.value)} className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">End Date <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="date" value={currentMultiForm.endDate || ""} min={currentMultiForm.startDate} onChange={(e) => handleMultiSubjectFormChange('endDate', e.target.value)} className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 pb-1 border-b border-slate-100">
                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                      <input type="checkbox" checked={currentMultiForm.applySameTime ?? true} onChange={(e) => handleMultiSubjectFormChange('applySameTime', e.target.checked)} className="w-5 h-5 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Apply same time to all days (Mon - Sat)</span>
                    </label>
                  </div>

                  {currentMultiForm.applySameTime ? (
                    <div className="grid grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Common Start Time</label>
                        <div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="time" value={currentMultiForm.sameStartTime || ""} onChange={(e) => handleMultiSubjectFormChange('sameStartTime', e.target.value)} className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700" /></div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Common End Time</label>
                        <div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="time" value={currentMultiForm.sameEndTime || ""} onChange={(e) => handleMultiSubjectFormChange('sameEndTime', e.target.value)} className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-700" /></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Configure Daily Timings</p>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                        <div key={day} className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-12 md:col-span-4 font-medium text-slate-700 text-sm">{day}</div>
                          <div className="col-span-6 md:col-span-4 relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="time" placeholder="Start" value={currentMultiForm.dailyTimes?.[day]?.start || ""} onChange={(e) => handleMultiDailyTimeChange(day, 'start', e.target.value)} className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" /></div>
                          <div className="col-span-6 md:col-span-4 relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="time" placeholder="End" value={currentMultiForm.dailyTimes?.[day]?.end || ""} onChange={(e) => handleMultiDailyTimeChange(day, 'end', e.target.value)} className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700" /></div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1.5 relative" ref={isMultiModalOpen ? facultyDropdownRef : null}>
                    <label className="text-sm font-semibold text-slate-700">Assign Faculty <span className="text-red-500">*</span></label>
                    <div onClick={() => {
                        if (!currentMultiForm.startDate) { toast.error("Please select Start Date first."); return; }
                        setIsFacultyDropdownOpen(!isFacultyDropdownOpen);
                      }}
                      className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${isFacultyDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-2 text-slate-700"><User className="w-4 h-4 text-slate-400" /><span className={currentMultiForm.facultyName ? "font-medium" : "text-slate-400"}>{currentMultiForm.facultyName || "Select a faculty member..."}</span></div>
                      {isFetchingFaculties ? <Loader2 className="w-4 h-4 text-slate-400 animate-spin" /> : <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFacultyDropdownOpen ? 'rotate-180' : ''}`} />}
                    </div>
                    {isFacultyDropdownOpen && (
                      <div className="absolute top-[72px] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                        <div className="p-3 border-b border-slate-100 bg-slate-50/50"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" autoFocus placeholder="Search faculty name..." value={facultySearch} onChange={(e) => setFacultySearch(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div></div>
                        <div className="max-h-60 overflow-y-auto custom-scrollbar p-2 space-y-1">
                          {filteredFacultiesList.map((fac) => {
                            const isAvailable = fac.status === "AVAILABLE", isOnLeave = fac.status === "ON_LEAVE", isBusy = fac.status === "BUSY";
                            return (
                              <div key={fac.id} onClick={() => { 
                                  if (isAvailable) { 
                                    handleMultiSubjectFormChange('facultyId', fac.id); 
                                    handleMultiSubjectFormChange('facultyName', fac.name); 
                                    setIsFacultyDropdownOpen(false); 
                                  } 
                                }} 
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isAvailable ? "bg-white border-transparent hover:bg-blue-50 hover:border-blue-100 cursor-pointer" : "bg-slate-50 border-slate-100 opacity-80 cursor-not-allowed"}`}
                              >
                                <div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAvailable ? 'bg-blue-100' : 'bg-slate-200'}`}><User className={`w-4 h-4 ${isAvailable ? 'text-blue-600' : 'text-slate-400'}`} /></div><span className={`font-semibold ${isAvailable ? 'text-slate-800' : 'text-slate-500'}`}>{fac.name}</span></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Topics / Description</label>
                    <textarea rows="3" placeholder="Enter topics..." value={currentMultiForm.topics || ""} onChange={(e) => handleMultiSubjectFormChange('topics', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-xs font-medium text-slate-500">
                {activeBatchSubjects.filter(sub => isMultiSubjectComplete(sub.subjectId)).length} / {activeBatchSubjects.length} Subjects Configured
              </span>
              <div className="flex items-center gap-3">
                <button onClick={handleCancelMulti} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-colors">Cancel</button>
                <button onClick={handleSaveMultiSchedule} className={`px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-all flex items-center gap-2 bg-blue-600 hover:bg-blue-700`}>
                  <Layers className="w-4 h-4" /> Save All Schedules
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Cancel Confirmation Popup */}
      {showCancelConfirm.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Cancel Changes?</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to cancel? All unsaved changes will be lost.</p>
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => setShowCancelConfirm({ isOpen: false, targetModal: null })} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">No, Keep Editing</button>
              <button onClick={() => { if (showCancelConfirm.targetModal === 'single') setIsModalOpen(false); if (showCancelConfirm.targetModal === 'multi') setIsMultiModalOpen(false); setShowCancelConfirm({ isOpen: false, targetModal: null }); }} className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-rose-600/20">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleByBatches;