import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Layers, Calendar, CheckCircle, 
  Users, BookOpen, Loader2, AlertCircle, Plus, 
  X, Search, Activity, GraduationCap, IdCard, Mail, BookMarked,
  Video, FileText, Link, Trash2 
} from 'lucide-react';
import api from '../../services/api';

const BatchDetails = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  
  // Base State
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Add Student Modal State
  const [showModal, setShowModal] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [isFetchingStudents, setIsFetchingStudents] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assigningId, setAssigningId] = useState(null);

  // --- Video & Document Modal States ---
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  
  // Forms to include subjectId
  const [videoForm, setVideoForm] = useState({ title: '', url: '', description: '', subjectId: '' });
  const [docForm, setDocForm] = useState({ title: '', fileUrl: '', description: '', subjectId: '' });

  useEffect(() => {
    if (batchId) {
      fetchBatchDetails();
    }
  }, [batchId]);

  const fetchBatchDetails = async () => {
    try {
      const response = await api.get(`/api/batches/${batchId}`);
      setBatchData(response.data?.data || response.data);
    } catch (err) {
      setError('Failed to load batch details. Please try again.');
      console.error("Error fetching batch details:", err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  };

  // --- Add Student Logic ---
  const handleOpenModal = () => {
    setShowModal(true);
    if (allStudents.length === 0) {
      fetchAllStudents();
    }
  };

  const fetchAllStudents = async () => {
    setIsFetchingStudents(true);
    try {
      const res = await api.get('/api/batches/students');
      setAllStudents(res.data?.data || res.data || []);
    } catch (err) {
      showNotification('Failed to fetch students list', 'error');
    } finally {
      setIsFetchingStudents(false);
    }
  };

  const handleAssignStudent = async (student) => {
    setAssigningId(student.id);
    try {
      const studentIdToPass = student.customUserId || student.id;
      
      await api.post('/api/batches/assign', {
        batchId: batchId,
        studentId: studentIdToPass
      });
      
      showNotification(`${student.name} assigned successfully!`, 'success');
      await fetchBatchDetails();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to assign student', 'error');
    } finally {
      setAssigningId(null);
    }
  };

  // --- Remove Student Logic (Wired to Backend) ---
  const handleRemoveStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to remove this student from the batch?")) {
      return;
    }

    try {
      // Calling the backend remove endpoint
      await api.post('/api/batches/remove', { 
        batchId: batchId, 
        studentId: studentId 
      });
      
      showNotification("Student removed successfully!", "success");
      
      // Update UI immediately without needing to refresh
      setBatchData(prev => ({
        ...prev,
        students: prev.students.filter(s => s.id !== studentId)
      }));
    } catch (err) {
      console.error("Error removing student:", err);
      showNotification(err.response?.data?.message || 'Failed to remove student', 'error');
    }
  };

  // --- Handlers for Video & Document (Wired to Backend) ---
  const handleShareVideo = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/batches/${batchId}/videos`, videoForm);
      showNotification("Video shared successfully!", "success");
      setShowVideoModal(false);
      setVideoForm({ title: '', url: '', description: '', subjectId: '' }); // Reset
    } catch (err) {
      console.error("Failed to share video:", err);
      showNotification(err.response?.data?.message || "Failed to share video", "error");
    }
  };

  const handleShareDocument = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/batches/${batchId}/documents`, docForm);
      showNotification("Document shared successfully!", "success");
      setShowDocModal(false);
      setDocForm({ title: '', fileUrl: '', description: '', subjectId: '' }); // Reset
    } catch (err) {
      console.error("Failed to share document:", err);
      showNotification(err.response?.data?.message || "Failed to share document", "error");
    }
  };

  const unassignedStudents = allStudents.filter(student => {
    return !batchData?.students?.some(enrolled => enrolled.email === student.email);
  }).filter(student => {
    const term = searchQuery.toLowerCase();
    return (
      (student.name && student.name.toLowerCase().includes(term)) || 
      (student.email && student.email.toLowerCase().includes(term)) ||
      (student.customUserId && student.customUserId.toLowerCase().includes(term))
    );
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-medium animate-pulse">Loading batch data...</p>
      </div>
    );
  }

  if (error || !batchData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Error Loading Data</h2>
        <p className="text-slate-600 mb-8 max-w-md">{error || 'Batch not found. It may have been deleted or removed.'}</p>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium shadow-lg shadow-slate-200"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Batches
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in relative">
      
      {/* Global Notification */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-[100] p-4 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-2 ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium text-sm pr-2">{notification.message}</p>
        </div>
      )}

      {/* Premium Header Section */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-5 w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Batches
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{batchData.name}</h1>
                <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${batchData.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {batchData.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <p className="text-slate-500 font-medium">Manage curriculum, subjects, and student enrollments.</p>
              
              {/* --- ACTION NAVBAR --- */}
              <div className="flex flex-wrap items-center gap-2 mt-5 p-1.5 bg-slate-50 border border-slate-200/60 rounded-xl w-fit shadow-sm">
                
                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 text-sm font-semibold rounded-lg hover:text-blue-600 hover:bg-blue-50 border border-slate-200/50 transition-all shadow-sm group"
                >
                  <Video className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> Share Video
                </button>
                
                <button 
                  onClick={() => setShowDocModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 text-sm font-semibold rounded-lg hover:text-purple-600 hover:bg-purple-50 border border-slate-200/50 transition-all shadow-sm group"
                >
                  <FileText className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" /> Share Document
                </button>

                <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>

                <button 
                  onClick={handleOpenModal}
                  className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 hover:-translate-y-0.5 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Student
                </button>

              </div>
              {/* --------------------------------------------------------- */}

            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Info & Subjects */}
        <div className="xl:col-span-1 space-y-6 lg:space-y-8">
          
          {/* Enhanced Quick Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-800">Batch Statistics</h3>
            </div>
            
            <div className="p-5 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100/80 flex flex-col justify-center transition-colors hover:border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Academic Yr</p>
                </div>
                <p className="text-lg font-bold text-slate-800">{batchData.academicYear || 'N/A'}</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100/80 flex flex-col justify-center transition-colors hover:border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <GraduationCap className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Students</p>
                </div>
                <p className="text-lg font-bold text-slate-800">{batchData.students?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Subjects Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-800">Curriculum</h3>
                </div>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                  {batchData.subjects?.length || 0} Subjects
                </span>
             </div>
             
             <div className="p-2">
               {batchData.subjects && batchData.subjects.length > 0 ? (
                 <div className="flex flex-col">
                   {batchData.subjects.map(subject => (
                     <div key={subject.id} className="p-3 hover:bg-slate-50 rounded-xl flex items-center justify-between transition-colors group">
                       <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                           <BookMarked className="w-4 h-4" />
                         </div>
                         <span className="font-semibold text-slate-700">{subject.name}</span>
                       </div>
                       <span className="text-xs font-bold text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md bg-white">
                         {subject.gradeName}
                       </span>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-10 text-slate-500">
                   <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100">
                     <BookOpen className="w-5 h-5 text-slate-300" />
                   </div>
                   <p className="text-sm font-medium">No subjects assigned.</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Right Column: Premium Students Table */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
            
            {/* Enhanced Table Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Enrolled Students</h3>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">Currently managing {batchData.students?.length || 0} active students</p>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="flex-1 overflow-auto p-0">
              {batchData.students && batchData.students.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50/80 backdrop-blur-sm z-10 border-b border-slate-200">
                    <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <IdCard className="w-4 h-4 text-slate-400" /> Student ID
                        </div>
                      </th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" /> Email Address
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {batchData.students.map(student => (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                             onClick={() => handleRemoveStudent(student.id)}
                             className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                             title="Remove from batch"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-500 p-8 text-center bg-slate-50/30">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-sm">
                    <Users className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="font-bold text-slate-700 text-xl mb-2">No Students Enrolled</p>
                  <p className="text-sm max-w-sm leading-relaxed mb-6">Your student roster is currently empty. Start building your batch by assigning students from the database.</p>
                  <button 
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Enroll First Student
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD STUDENT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-extrabold text-slate-900">Add Students</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">Search and select students to enroll.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="relative z-10 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Decorative background element */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-2xl"></div>
            </div>
            
            {/* Search Bar */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="relative group">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Modal Body - Student List */}
            <div className="flex-1 overflow-y-auto p-3 bg-slate-50/30">
              {isFetchingStudents ? (
                <div className="flex flex-col justify-center items-center py-16 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-sm text-slate-500 font-medium">Fetching students database...</p>
                </div>
              ) : unassignedStudents.length === 0 ? (
                <div className="text-center py-16 text-slate-500 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm mb-4">
                    <Search className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="font-bold text-slate-700 text-lg">No matches found</p>
                  <p className="text-sm mt-1 max-w-xs">All matching students may already be enrolled, or the search term is incorrect.</p>
                </div>
              ) : (
                <div className="space-y-2 p-1">
                  {unassignedStudents.map(student => (
                    <label 
                      key={student.id} 
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all group ${assigningId === student.id ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox"
                            checked={false} 
                            onChange={() => handleAssignStudent(student)}
                            disabled={assigningId === student.id}
                            className={`w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-opacity ${assigningId === student.id ? 'opacity-0' : 'opacity-100'}`}
                          />
                          {assigningId === student.id && (
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600 absolute" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                            {student.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                              {student.customUserId || 'NO ID'}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}

      {/* --- SHARE VIDEO MODAL --- */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white relative">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" /> Share Video
              </h3>
              <button onClick={() => setShowVideoModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleShareVideo} className="p-5 space-y-4 bg-slate-50/30">
              
              {/* Subject Dropdown */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Batch Subject <span className="text-red-500">*</span></label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select 
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm appearance-none cursor-pointer"
                    value={videoForm.subjectId} 
                    onChange={(e) => setVideoForm({...videoForm, subjectId: e.target.value})}
                  >
                    <option value="" disabled>-- Select Subject --</option>
                    {batchData?.subjects?.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Video Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" required
                  placeholder="e.g., Introduction to Algebra"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm"
                  value={videoForm.title} onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Video URL / Link <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="url" required
                    placeholder="https://youtube.com/..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm"
                    value={videoForm.url} onChange={(e) => setVideoForm({...videoForm, url: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
                <textarea 
                  rows="3"
                  placeholder="What is this video about?"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm shadow-sm"
                  value={videoForm.description} onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                />
              </div>
              <div className="pt-3 flex gap-3">
                <button type="button" onClick={() => setShowVideoModal(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm shadow-sm">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-sm shadow-sm">Share to Batch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SHARE DOCUMENT MODAL --- */}
      {showDocModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white relative">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" /> Share Document
              </h3>
              <button onClick={() => setShowDocModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleShareDocument} className="p-5 space-y-4 bg-slate-50/30">
              
              {/* Subject Dropdown */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Batch Subject <span className="text-red-500">*</span></label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select 
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm shadow-sm appearance-none cursor-pointer"
                    value={docForm.subjectId} 
                    onChange={(e) => setDocForm({...docForm, subjectId: e.target.value})}
                  >
                    <option value="" disabled>-- Select Subject --</option>
                    {batchData?.subjects?.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Document Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" required
                  placeholder="e.g., Chapter 1 Notes (PDF)"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm shadow-sm"
                  value={docForm.title} onChange={(e) => setDocForm({...docForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">File URL / Drive Link <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="url" required
                    placeholder="https://drive.google.com/..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm shadow-sm"
                    value={docForm.fileUrl} onChange={(e) => setDocForm({...docForm, fileUrl: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Instructions / Description</label>
                <textarea 
                  rows="3"
                  placeholder="Any specific instructions for reading?"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none text-sm shadow-sm"
                  value={docForm.description} onChange={(e) => setDocForm({...docForm, description: e.target.value})}
                />
              </div>
              <div className="pt-3 flex gap-3">
                <button type="button" onClick={() => setShowDocModal(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm shadow-sm">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-bold text-sm shadow-sm">Share Document</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BatchDetails;