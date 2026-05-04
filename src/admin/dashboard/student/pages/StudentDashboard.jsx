import React, { useState, useEffect } from 'react';
import { studentLmsService } from '../../../services/studentLmsService';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Video, 
  ArrowLeft,
  ArrowRight,
  Upload, 
  CheckCircle,
  Link as LinkIcon,
  X,
  Layers,
  Users,
  BookMarked,
  CalendarDays,
  User as UserIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard = ({ section }) => {
  // --- STATE MANAGEMENT ---
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [batches, setBatches] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Tab State
  const [mainTab, setMainTab] = useState(section === 'batches' ? 'batches' : 'courses');
  const [scheduleFilter, setScheduleFilter] = useState('upcoming'); // 'upcoming', 'today', 'past'

  // Classroom Mode State
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [viewMode, setViewMode] = useState('assignments'); 
  
  // Batch Detail Mode State
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [resourceTab, setResourceTab] = useState('VIDEO');

  // Submission Modal State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionComment, setSubmissionComment] = useState('');

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    fetchDashboardData();

    if (section === 'assignments') {
      toast('Please select a course first to view assignments', { icon: '👈', duration: 4000 });
    }

    if (section === 'batches') setMainTab('batches');
    else if (section === 'schedule') setMainTab('schedule');
    else if (section === 'courses' || !section) setMainTab('courses');
  }, [section]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const safeFetch = async (apiCall, name) => {
        if (typeof apiCall !== 'function') {
          console.warn(`Missing API function for: ${name}`);
          return [];
        }
        try {
          const res = await apiCall();
          return res || [];
        } catch (err) {
          console.error(`Error fetching ${name}:`, err);
          return [];
        }
      };

      const [coursesData, resourcesData, batchesData, schedulesData] = await Promise.all([
        safeFetch(studentLmsService.getMyCourses, "Courses"),
        safeFetch(studentLmsService.getMyResources, "Resources"),
        safeFetch(studentLmsService.getMyBatches, "Batches"),
        safeFetch(studentLmsService.getMySchedules, "Schedules")
      ]);
      
      setCourses(Array.isArray(coursesData) ? coursesData : (coursesData?.data || []));
      setResources(Array.isArray(resourcesData) ? resourcesData : (resourcesData?.data || []));
      setBatches(Array.isArray(batchesData) ? batchesData : (batchesData?.data || []));
      setSchedules(Array.isArray(schedulesData) ? schedulesData : (schedulesData?.data || []));
      
    } catch (error) {
      console.error("Dashboard Load Error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---
  const handleEnterClassroom = async (course) => {
    setSelectedCourse(course);
    setLoading(true);
    setViewMode('assignments');

    try {
      const [assData, schData] = await Promise.all([
        studentLmsService.getCourseAssignments(course.courseId).catch(() => []),
        studentLmsService.getCourseSchedule(course.courseId).catch(() => [])
      ]);
      setAssignments(assData || []);
      setCourseSchedule(schData || []);
    } catch (error) {
      toast.error("Failed to load classroom data");
    } finally {
      setLoading(false);
    }
  };

  const openSubmitModal = (assignment) => {
    setActiveAssignment(assignment);
    setSubmissionUrl('');
    setSubmissionComment('');
    setShowSubmitModal(true);
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (!submissionUrl) {
      toast.error("Please provide a file URL");
      return;
    }

    try {
      await studentLmsService.submitAssignment({
        assignmentId: activeAssignment.id,
        fileUrl: submissionUrl,
        comments: submissionComment
      });
      toast.success("Assignment submitted successfully!");
      setShowSubmitModal(false);
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    }
  };

  // --- HELPERS ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getDayOfWeek = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getBatchResources = (type) => {
    if (!selectedBatch || !resources) return [];
    return resources.filter((res) => res.batchName === selectedBatch.name && res.type === type);
  };

  const getFilteredSchedules = () => {
    if (!schedules || !Array.isArray(schedules)) return [];
    
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    return schedules.filter(schedule => {
      if (!schedule.startTime) return false;
      const scheduleDate = new Date(schedule.startTime);
      
      if (scheduleFilter === 'today') {
        return scheduleDate >= todayStart && scheduleDate < todayEnd;
      } else if (scheduleFilter === 'upcoming') {
        return scheduleDate >= todayEnd;
      } else if (scheduleFilter === 'past') {
        return scheduleDate < todayStart;
      }
      return true;
    }).sort((a, b) => {
      if (scheduleFilter === 'past') return new Date(b.startTime) - new Date(a.startTime);
      return new Date(a.startTime) - new Date(b.startTime);
    });
  };

  // --- RENDER ---
  if (loading && !selectedCourse) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // === VIEW 1: CLASSROOM (Specific Course) ===
  if (selectedCourse) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setSelectedCourse(null)}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{selectedCourse.courseTitle}</h1>
            <p className="text-sm text-slate-500">Classroom Portal</p>
          </div>
        </div>

        <div className="flex gap-6 border-b border-slate-200">
          <button
            onClick={() => setViewMode('assignments')}
            className={`pb-3 px-2 font-medium text-sm transition-all relative ${
              viewMode === 'assignments' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Assignments
            </div>
            {viewMode === 'assignments' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
          </button>
        </div>

        <div className="min-h-[400px]">
          {viewMode === 'assignments' && (
            <div className="grid gap-4">
              {!assignments || assignments.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No assignments posted yet</p>
                </div>
              ) : (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-slate-800">{assignment.title}</h3>
                        <p className="text-slate-600 mt-2 text-sm leading-relaxed">{assignment.description}</p>
                        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 font-medium bg-slate-50 w-fit px-3 py-1 rounded-md border border-slate-100">
                          <Clock className="w-3 h-3" />
                          Due: {formatDate(assignment.dueDate)}
                        </div>
                      </div>
                      <button 
                        onClick={() => openSubmitModal(assignment)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors shrink-0"
                      >
                        <Upload className="w-4 h-4" /> Submit Work
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Submit Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Submit Assignment</h3>
                <button onClick={() => setShowSubmitModal(false)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitAssignment} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Submission Link (Drive/PDF URL)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="url" 
                      required
                      placeholder="https://drive.google.com/..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Comments (Optional)</label>
                  <textarea 
                    placeholder="Notes for the teacher..."
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none h-24 text-sm"
                    value={submissionComment}
                    onChange={(e) => setSubmissionComment(e.target.value)}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // === VIEW 2: DASHBOARD HOME (Course, Batches & Global Schedule) ===
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-[#4169E1] rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl font-semibold mb-1">My Learning Dashboard</h1>
          <p className="text-blue-100 text-sm font-light">Track your progress, access your classroom, and stay updated with your schedule.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex gap-8 border-b border-slate-200 overflow-x-auto pb-0 px-2">
        <button
          onClick={() => { setMainTab('courses'); setSelectedBatch(null); }}
          className={`pb-3 font-medium text-sm transition-all whitespace-nowrap relative ${
            mainTab === 'courses' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> My Courses</div>
          {mainTab === 'courses' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
        </button>
        <button
          onClick={() => { setMainTab('batches'); setSelectedBatch(null); }}
          className={`pb-3 font-medium text-sm transition-all whitespace-nowrap relative ${
            mainTab === 'batches' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> My Batches
            {batches?.length > 0 && <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{batches.length}</span>}
          </div>
          {mainTab === 'batches' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
        </button>
        <button
          onClick={() => { setMainTab('schedule'); setSelectedBatch(null); }}
          className={`pb-3 font-medium text-sm transition-all whitespace-nowrap relative ${
            mainTab === 'schedule' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> Class Schedule
          </div>
          {mainTab === 'schedule' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
        </button>
      </div>

      <div className="space-y-4">
        
        {/* ================= COURSES TAB ================= */}
        {mainTab === 'courses' && (
          <>
            {!courses || courses.length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center border border-dashed border-slate-200 shadow-sm">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-700">No Active Courses</h3>
                <p className="text-slate-500 text-sm mt-1">You haven't enrolled in any courses yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((enrollment) => (
                  <div key={enrollment.id} className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                    <div className="h-40 bg-slate-100 relative overflow-hidden">
                      {enrollment.courseImage ? (
                        <img src={enrollment.courseImage} alt={enrollment.courseTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
                          <BookOpen className="w-8 h-8 mb-2 opacity-50" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-emerald-600 flex items-center gap-1 shadow-sm">
                        <CheckCircle className="w-3 h-3" /> {enrollment.status}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-semibold text-base text-slate-800 mb-1 line-clamp-1">{enrollment.courseTitle}</h3>
                      <div className="text-xs text-slate-500 mb-5 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </div>
                      <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-600">
                          <span>Progress</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${enrollment.progress}%` }} />
                        </div>
                        <button onClick={() => handleEnterClassroom(enrollment)} className="w-full mt-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all shadow-sm flex items-center justify-center gap-2">
                          Go to Class <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= BATCHES TAB ================= */}
        {mainTab === 'batches' && (
          <>
            {!selectedBatch ? (
              // BATCH GRID VIEW
              !batches || batches.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center border border-dashed border-slate-200 shadow-sm">
                  <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-slate-700">No Batches Assigned</h3>
                  <p className="text-slate-500 text-sm mt-1">Contact your administrator for batch assignments.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {batches.map((batch) => (
                    <div key={batch.id} onClick={() => setSelectedBatch(batch)} className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-blue-200 cursor-pointer transition-all duration-300 flex flex-col h-full">
                      <div className="h-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden p-5 flex flex-col justify-center">
                        <div className="relative z-10 flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-base text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{batch.name}</h3>
                            <p className="text-slate-500 text-xs mt-0.5">{batch.academicYear || 'N/A'}</p>
                          </div>
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${batch.active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                            {batch.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <BookMarked className="w-3 h-3" /> Subjects
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {batch.subjects?.slice(0, 4).map((sub) => (
                              <span key={sub.id} className="inline-flex items-center px-2 py-1 bg-slate-50 text-slate-600 rounded text-[11px] font-medium border border-slate-100">{sub.name}</span>
                            ))}
                            {batch.subjects?.length > 4 && <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded text-[11px] font-medium border border-slate-100">+{batch.subjects.length - 4}</span>}
                          </div>
                        </div>
                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <Users className="w-3.5 h-3.5 text-slate-400" /> {batch.students?.length || 0} peers
                          </div>
                          <div className="flex items-center text-blue-600 font-medium text-xs group-hover:underline">
                            Open Resources <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              // BATCH DETAIL & RESOURCES VIEW
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button onClick={() => setSelectedBatch(null)} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-4 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                </button>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h1 className="text-xl font-bold text-slate-800">{selectedBatch.name}</h1>
                    <p className="text-slate-500 text-sm mt-1">Academic Year: {selectedBatch.academicYear}</p>
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-wrap gap-1.5">
                    {selectedBatch.subjects?.map((sub, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-600 px-2.5 py-1 rounded text-xs font-medium border border-slate-100">{sub.name}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex border-b border-slate-100">
                    <button onClick={() => setResourceTab('VIDEO')} className={`flex-1 py-3 text-center font-medium text-sm transition-colors flex items-center justify-center gap-2 ${resourceTab === 'VIDEO' ? 'border-b-2 border-blue-600 text-blue-700 bg-blue-50/20' : 'text-slate-500 hover:bg-slate-50'}`}>
                      <Video className="w-4 h-4" /> Recorded Videos
                    </button>
                    <button onClick={() => setResourceTab('DOCUMENT')} className={`flex-1 py-3 text-center font-medium text-sm transition-colors flex items-center justify-center gap-2 ${resourceTab === 'DOCUMENT' ? 'border-b-2 border-blue-600 text-blue-700 bg-blue-50/20' : 'text-slate-500 hover:bg-slate-50'}`}>
                      <FileText className="w-4 h-4" /> Study Documents
                    </button>
                  </div>
                  <div className="p-6">
                    {getBatchResources(resourceTab).length === 0 ? (
                      <div className="text-center py-10">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                          {resourceTab === 'VIDEO' ? <Video className="w-5 h-5 text-slate-300" /> : <FileText className="w-5 h-5 text-slate-300" />}
                        </div>
                        <h3 className="text-sm font-medium text-slate-700">No {resourceTab.toLowerCase()}s posted</h3>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getBatchResources(resourceTab).map((resource) => (
                          <a key={resource.id} href={resourceTab === 'VIDEO' ? resource.url : resource.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-slate-100 rounded-lg hover:shadow-md hover:border-slate-200 transition-all group bg-white">
                            <div className={`p-2.5 rounded-lg shrink-0 mr-4 transition-colors ${resourceTab === 'VIDEO' ? 'bg-rose-50 text-rose-500 group-hover:bg-rose-100' : 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100'}`}>
                              {resourceTab === 'VIDEO' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-slate-800 text-sm truncate group-hover:text-blue-600 transition-colors">{resource.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{resource.subjectName || 'General'}</span>
                                <span className="text-[10px] text-slate-400">{formatDate(resource.date)}</span>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ================= SCHEDULE TAB (POLISHED UI) ================= */}
        {mainTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* Header & Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg font-bold text-slate-800">Live Class Schedule</h2>
                <span className="text-slate-400 text-sm font-normal hidden md:inline-block ml-2">View timings and links for your batch classes.</span>
              </div>

              {/* Segmented Control for Filters */}
              <div className="bg-slate-100/70 p-1 rounded-lg flex items-center border border-slate-200/50">
                <button 
                  onClick={() => setScheduleFilter('past')} 
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${scheduleFilter === 'past' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Past
                </button>
                <button 
                  onClick={() => setScheduleFilter('today')} 
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${scheduleFilter === 'today' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Today
                </button>
                <button 
                  onClick={() => setScheduleFilter('upcoming')} 
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${scheduleFilter === 'upcoming' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Upcoming
                </button>
              </div>
            </div>

            {/* Schedule List */}
            {getFilteredSchedules().length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center border border-slate-100 shadow-sm">
                <CalendarDays className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <h3 className="text-base font-medium text-slate-600">No {scheduleFilter} Classes</h3>
                <p className="text-slate-400 text-sm mt-1">Your schedule looks clear for now.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {getFilteredSchedules().map((schedule) => (
                  <div key={schedule.id} className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-all duration-200 group">
                    
                    {/* Date Block (Left Side) */}
                    <div className="md:w-32 p-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/30 shrink-0">
                      <span className="text-3xl font-bold text-slate-700 tracking-tight">
                        {new Date(schedule.startTime).getDate()}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                        {new Date(schedule.startTime).toLocaleString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-xs font-medium text-slate-500 mt-0.5">
                        {getDayOfWeek(schedule.startTime)}
                      </span>
                    </div>

                    {/* Content Block (Right Side) */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col justify-center relative">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-1">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{schedule.title}</h3>
                          {schedule.topics && <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{schedule.topics}</p>}
                        </div>
                        
                        {/* Join Button */}
                        {schedule.meetingLink && scheduleFilter !== 'past' && (
                          <a 
                            href={schedule.meetingLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-semibold rounded-lg transition-colors border border-blue-100 hover:border-blue-600"
                          >
                            <Video className="w-3.5 h-3.5" /> Join
                          </a>
                        )}
                      </div>

                      {/* Info Tags */}
                      <div className="flex flex-wrap gap-2.5 mt-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600">
                          <Layers className="w-3 h-3 text-slate-400" /> 
                          {schedule.batchName || 'General Batch'}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50/50 border border-indigo-100/50 text-[11px] font-medium text-indigo-700">
                          <BookMarked className="w-3 h-3 text-indigo-400" /> 
                          {schedule.subjectName || 'General Subject'}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50/50 border border-emerald-100/50 text-[11px] font-medium text-emerald-700">
                          <Clock className="w-3 h-3 text-emerald-500" /> 
                          {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50/50 border border-amber-100/50 text-[11px] font-medium text-amber-700">
                          <UserIcon className="w-3 h-3 text-amber-500" /> 
                          {schedule.facultyName || 'Unassigned'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;