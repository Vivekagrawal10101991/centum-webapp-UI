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
  BookMarked
} from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard = ({ section }) => {
  // --- STATE MANAGEMENT ---
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Tab State
  const [mainTab, setMainTab] = useState(section === 'batches' ? 'batches' : 'courses');

  // Classroom Mode State
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [viewMode, setViewMode] = useState('assignments'); 
  
  // Submission Modal State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionComment, setSubmissionComment] = useState('');

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    fetchDashboardData();

    if (section === 'assignments' || section === 'schedule') {
      toast('Please select a course first to view ' + section, {
        icon: '👈',
        duration: 4000
      });
    }

    // Sync the active tab when navigating via sidebar
    if (section === 'batches') {
      setMainTab('batches');
    } else if (section === 'courses' || !section) {
      setMainTab('courses');
    } else if (section === 'resources') {
      setMainTab('resources');
    }
  }, [section]);

  const fetchDashboardData = async () => {
    try {
      // Parallel fetch for courses and personal batch resources
      const [coursesData, resourcesData, batchesData] = await Promise.all([
        studentLmsService.getMyCourses(),
        studentLmsService.getMyResources(),
        studentLmsService.getMyBatches()
      ]);
      setCourses(coursesData);
      setResources(resourcesData);
      setBatches(Array.isArray(batchesData) ? batchesData : (batchesData?.data || []));
    } catch (error) {
      toast.error("Failed to load your dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleEnterClassroom = async (course) => {
    setSelectedCourse(course);
    setLoading(true);
    
    if (section === 'schedule') setViewMode('schedule');
    else setViewMode('assignments');

    try {
      const [assData, schData] = await Promise.all([
        studentLmsService.getCourseAssignments(course.courseId),
        studentLmsService.getCourseSchedule(course.courseId)
      ]);
      setAssignments(assData);
      setSchedule(schData);
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

  // --- HELPER ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
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
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setSelectedCourse(null)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
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
              viewMode === 'assignments' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Assignments
            </div>
            {viewMode === 'assignments' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setViewMode('schedule')}
            className={`pb-3 px-2 font-medium text-sm transition-all relative ${
              viewMode === 'schedule' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Live Schedule
            </div>
            {viewMode === 'schedule' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
        </div>

        <div className="min-h-[400px]">
          {viewMode === 'assignments' && (
            <div className="grid gap-4">
              {assignments.length === 0 ? (
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
                        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 font-medium bg-slate-50 w-fit px-3 py-1 rounded-full border border-slate-100">
                          <Clock className="w-3 h-3" />
                          Due: {formatDate(assignment.dueDate)}
                        </div>
                      </div>
                      <button 
                        onClick={() => openSubmitModal(assignment)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors shrink-0"
                      >
                        <Upload className="w-4 h-4" />
                        Submit Work
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {viewMode === 'schedule' && (
            <div className="space-y-4">
              {schedule.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No upcoming classes scheduled</p>
                </div>
              ) : (
                schedule.map((event) => (
                  <div key={event.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{event.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(event.startTime)}
                          </span>
                          <span className="hidden sm:inline">-</span>
                          <span>{new Date(event.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                    </div>
                    <a 
                      href={event.meetingLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full sm:w-auto text-center px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                    >
                      Join Class
                    </a>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Submit Assignment</h3>
                <button onClick={() => setShowSubmitModal(false)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitAssignment} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Submission Link (Google Drive/PDF URL)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="url" 
                      required
                      placeholder="https://drive.google.com/file/..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Comments (Optional)</label>
                  <textarea 
                    placeholder="Any notes for the teacher..."
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-24"
                    value={submissionComment}
                    onChange={(e) => setSubmissionComment(e.target.value)}
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
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

  // === VIEW 2: DASHBOARD HOME (Course & Resources Grid) ===
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
          <p className="text-blue-100 text-lg">Track your progress, access your classroom, and stay updated with your schedule.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex gap-6 border-b border-slate-200">
        <button
          onClick={() => setMainTab('courses')}
          className={`pb-3 px-2 font-medium text-sm transition-all relative ${
            mainTab === 'courses' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            My Courses
          </div>
          {mainTab === 'courses' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setMainTab('batches')}
          className={`pb-3 px-2 font-medium text-sm transition-all relative ${
            mainTab === 'batches' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            My Batches
            {batches.length > 0 && (
              <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{batches.length}</span>
            )}
          </div>
          {mainTab === 'batches' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setMainTab('resources')}
          className={`pb-3 px-2 font-medium text-sm transition-all relative ${
            mainTab === 'resources' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Shared Resources
          </div>
          {mainTab === 'resources' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
          )}
        </button>
      </div>

      {/* Main Content Render */}
      <div className="space-y-4">
        {mainTab === 'courses' && (
          <>
            {courses.length === 0 ? (
              <div className="bg-white p-16 rounded-2xl text-center border border-dashed border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">No Active Courses</h3>
                <p className="text-slate-500 mt-1 max-w-sm mx-auto">You haven't enrolled in any courses yet. Contact your administrator to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((enrollment) => (
                  <div 
                    key={enrollment.id} 
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full ring-1 ring-slate-900/5"
                  >
                    <div className="h-44 bg-slate-100 relative overflow-hidden">
                      {enrollment.courseImage ? (
                        <img 
                          src={enrollment.courseImage} 
                          alt={enrollment.courseTitle} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
                          <BookOpen className="w-10 h-10 mb-2" />
                          <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-green-600 flex items-center gap-1 shadow-sm border border-green-100">
                        <CheckCircle className="w-3 h-3" />
                        {enrollment.status}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">{enrollment.courseTitle}</h3>
                      <div className="text-xs text-slate-500 mb-5 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </div>
                      
                      <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-600">
                          <span>Course Progress</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        
                        <button 
                          onClick={() => handleEnterClassroom(enrollment)}
                          className="w-full mt-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          Go to Class
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* RESOURCES TAB RENDER (NEW PREMIUM DESIGN) */}
        {mainTab === 'resources' && (
          <>
            {resources.length === 0 ? (
              <div className="bg-white p-16 rounded-2xl text-center border border-dashed border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">No Resources Found</h3>
                <p className="text-slate-500 mt-1 max-w-sm mx-auto">Your teachers haven't shared any documents or videos for your batches yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {resources.map((res) => (
                  <div 
                    key={res.id} 
                    className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                  >
                    {/* Subtle decorative background on hover */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-xl flex items-center justify-center ${res.type === 'VIDEO' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                              {res.type === 'VIDEO' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            </div>
                            <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                              {res.batchName}
                            </div>
                          </div>
                        </div>
                        {res.subjectName && (
                          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50/50 px-2 py-1 rounded-md text-right max-w-[50%] truncate">
                            {res.subjectName}
                          </span>
                        )}
                      </div>
                      
                      {/* Content */}
                      <h3 className="font-bold text-slate-800 text-sm mb-1.5 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {res.title}
                      </h3>
                      
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
                        {res.description}
                      </p>
                      
                      {/* Footer */}
                      <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {formatDate(res.date)}
                        </span>
                        <a 
                          href={res.url || res.fileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                            res.type === 'VIDEO' 
                              ? 'text-rose-600 bg-rose-50 hover:bg-rose-100' 
                              : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                          }`}
                        >
                          {res.type === 'VIDEO' ? 'Watch' : 'Open'}
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* BATCHES TAB RENDER */}
        {mainTab === 'batches' && (
          <>
            {batches.length === 0 ? (
              <div className="bg-white p-16 rounded-2xl text-center border border-dashed border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">No Batches Assigned</h3>
                <p className="text-slate-500 mt-1 max-w-sm mx-auto">You haven't been assigned to any batches yet. Contact your administrator.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {batches.map((batch) => (
                  <div
                    key={batch.id}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full ring-1 ring-slate-900/5"
                  >
                    {/* Batch Header */}
                    <div className="h-28 bg-gradient-to-br from-indigo-500 to-blue-600 relative overflow-hidden p-5 flex flex-col justify-between">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-400/20 rounded-full -ml-6 -mb-6 blur-xl" />
                      <div className="relative z-10">
                        <h3 className="font-bold text-lg text-white line-clamp-1">{batch.name}</h3>
                        <p className="text-blue-100 text-sm mt-0.5">{batch.academicYear || 'N/A'}</p>
                      </div>
                      <div className="relative z-10 flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                          batch.active
                            ? 'bg-emerald-400/20 text-emerald-100 border border-emerald-300/30'
                            : 'bg-white/10 text-white/70 border border-white/20'
                        }`}>
                          {batch.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Batch Body */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Subjects */}
                      <div className="mb-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookMarked className="w-3.5 h-3.5" />
                          Subjects ({batch.subjects?.length || 0})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {batch.subjects && batch.subjects.length > 0 ? (
                            batch.subjects.slice(0, 4).map((sub) => (
                              <span key={sub.id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-semibold border border-indigo-100">
                                {sub.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 italic">No subjects</span>
                          )}
                          {batch.subjects && batch.subjects.length > 4 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[11px] font-semibold">
                              +{batch.subjects.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Students count */}
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{batch.students?.length || 0} students</span>
                        </div>
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500 group-hover:bg-indigo-100 transition-colors">
                          <Layers className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;