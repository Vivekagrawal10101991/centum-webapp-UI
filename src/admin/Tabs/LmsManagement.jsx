import React, { useState, useEffect } from 'react';
import { adminLmsService } from '../services/adminLmsService';
import { cmsService } from '../services/cmsService'; 
import { 
  Users, 
  FileText, 
  Video, 
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';

const LmsManagement = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('enrollment');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [enrollForm, setEnrollForm] = useState({ email: '', courseId: '' });
  const [assignForm, setAssignForm] = useState({ courseId: '', title: '', description: '', dueDate: '' });
  const [scheduleForm, setScheduleForm] = useState({ courseId: '', title: '', meetingLink: '', startTime: '', endTime: '' });

  // --- FETCH COURSES (For Dropdowns) ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // ✅ FIXED: Changed getAllCourses() to getCourses() to match your cmsService.js
        const data = await cmsService.getCourses();
        
        // Map to format required by Select component
        const formatted = data.map(c => ({ value: c.id, label: c.title }));
        setCourses(formatted);
      } catch (error) {
        console.error("Course fetch error:", error); // Added console log for easier debugging
        toast.error("Failed to load courses list");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- HANDLERS ---

  // 1. Enroll Handler
  const handleEnroll = async (e) => {
    e.preventDefault();
    if(!enrollForm.courseId || !enrollForm.email) {
       toast.error("Please fill all fields");
       return;
    }

    try {
      await adminLmsService.enrollStudent(enrollForm.email, enrollForm.courseId);
      toast.success("Student enrolled successfully!");
      setEnrollForm({ ...enrollForm, email: '' }); 
    } catch (error) {
      const msg = error.response?.data?.message || "Enrollment failed";
      toast.error(msg);
    }
  };

  // 2. Create Assignment Handler
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...assignForm,
        dueDate: new Date(assignForm.dueDate).toISOString()
      };
      await adminLmsService.createAssignment(payload);
      toast.success("Assignment created successfully!");
      setAssignForm({ courseId: '', title: '', description: '', dueDate: '' });
    } catch (error) {
      toast.error("Failed to create assignment");
    }
  };

  // 3. Create Schedule Handler
  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...scheduleForm,
        startTime: new Date(scheduleForm.startTime).toISOString(),
        endTime: new Date(scheduleForm.endTime).toISOString()
      };
      await adminLmsService.createSchedule(payload);
      toast.success("Class scheduled successfully!");
      setScheduleForm({ courseId: '', title: '', meetingLink: '', startTime: '', endTime: '' });
    } catch (error) {
      toast.error("Failed to schedule class");
    }
  };

  if (loading) return <div className="p-8">Loading resources...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">LMS Center</h1>
          <p className="text-slate-500">Manage student access and course content.</p>
        </div>
      </div>

      {/* --- TABS HEADER --- */}
      <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm">
        <button
          onClick={() => setActiveTab('enrollment')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'enrollment' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Users className="w-4 h-4" /> Enroll Students
        </button>
        <button
          onClick={() => setActiveTab('assignment')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'assignment' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" /> Create Assignment
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'schedule' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Video className="w-4 h-4" /> Schedule Class
        </button>
      </div>

      {/* ================= TAB 1: ENROLLMENT ================= */}
      {activeTab === 'enrollment' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" /> Enroll New Student
          </h2>
          <form onSubmit={handleEnroll} className="space-y-5">
            <Select
              label="Select Course"
              options={courses}
              value={enrollForm.courseId}
              onChange={(e) => setEnrollForm({...enrollForm, courseId: e.target.value})}
              required
            />
            
            <Input
              label="Student Email"
              type="email"
              placeholder="student@example.com"
              value={enrollForm.email}
              onChange={(e) => setEnrollForm({...enrollForm, email: e.target.value})}
              helperText="The student must already have an account."
              required
            />
            
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center">
                Confirm Enrollment
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 2: ASSIGNMENTS ================= */}
      {activeTab === 'assignment' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" /> Create Assignment
          </h2>
          <form onSubmit={handleCreateAssignment} className="space-y-5">
            <Select
              label="Target Course"
              options={courses}
              value={assignForm.courseId}
              onChange={(e) => setAssignForm({...assignForm, courseId: e.target.value})}
              required
            />
            
            <Input
              label="Assignment Title"
              placeholder="e.g. Physics Chapter 1 Homework"
              value={assignForm.title}
              onChange={(e) => setAssignForm({...assignForm, title: e.target.value})}
              required
            />
            
            <Textarea
              label="Description / Instructions"
              placeholder="Explain what the student needs to do..."
              value={assignForm.description}
              onChange={(e) => setAssignForm({...assignForm, description: e.target.value})}
              rows={4}
              required
            />
            
            <Input
              label="Due Date & Time"
              type="datetime-local"
              value={assignForm.dueDate}
              onChange={(e) => setAssignForm({...assignForm, dueDate: e.target.value})}
              required
            />
            
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center">
                Post Assignment
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 3: SCHEDULE ================= */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Video className="w-5 h-5 text-rose-600" /> Schedule Live Class
          </h2>
          <form onSubmit={handleCreateSchedule} className="space-y-5">
            <Select
              label="Target Course"
              options={courses}
              value={scheduleForm.courseId}
              onChange={(e) => setScheduleForm({...scheduleForm, courseId: e.target.value})}
              required
            />
            
            <Input
              label="Session Title"
              placeholder="e.g. Doubt Clearing Session"
              value={scheduleForm.title}
              onChange={(e) => setScheduleForm({...scheduleForm, title: e.target.value})}
              required
            />
            
            <Input
              label="Meeting Link (Zoom/Meet)"
              placeholder="https://meet.google.com/..."
              value={scheduleForm.meetingLink}
              onChange={(e) => setScheduleForm({...scheduleForm, meetingLink: e.target.value})}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="datetime-local"
                value={scheduleForm.startTime}
                onChange={(e) => setScheduleForm({...scheduleForm, startTime: e.target.value})}
                required
              />
              <Input
                label="End Time"
                type="datetime-local"
                value={scheduleForm.endTime}
                onChange={(e) => setScheduleForm({...scheduleForm, endTime: e.target.value})}
                required
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center">
                Schedule Class
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LmsManagement;