import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, BookOpen, Layers, CheckCircle, Video, 
  Users, X, UserCheck, UserX, FileText, FileSpreadsheet 
} from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { adminLmsService } from '../../../services/adminLmsService';
import api from '../../../../services/api'; 

const FacultySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [viewMode, setViewMode] = useState('ALL'); 
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);

  // Attendance Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceState, setAttendanceState] = useState({});
  const [isFetchingStudents, setIsFetchingStudents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  const getToday = () => new Date();

  const filteredSchedules = schedules.filter((schedule) => {
    if (viewMode === 'ALL') return true;
    if (viewMode === 'TODAY') return isSameDay(schedule.startTime, getToday());
    if (viewMode === 'CUSTOM') return isSameDay(schedule.startTime, customDate);
    return true;
  });

  const groupedSchedules = filteredSchedules.reduce((groups, schedule) => {
    const dateObj = new Date(schedule.startTime);
    const dateKey = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).toISOString();
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(schedule);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedSchedules).sort((a, b) => new Date(a) - new Date(b));

  const handleOpenAttendance = async (schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
    setIsFetchingStudents(true);
    try {
      const { data } = await api.get(`/api/admin/lms/scheduling/${schedule.id}/students`);
      if (data.success) {
        setStudents(data.data);
        
        const initialState = {};
        data.data.forEach(s => { 
          initialState[s.studentId] = s.isPresent !== undefined ? s.isPresent : true; 
        });
        
        setAttendanceState(initialState);
      }
    } catch (err) {
      toast.error("Failed to fetch students roster.");
    } finally {
      setIsFetchingStudents(false);
    }
  };

  const toggleStudentAttendance = (studentId) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const submitAttendance = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        records: students.map(s => ({
          studentId: s.studentId,
          isPresent: attendanceState[s.studentId] !== undefined ? attendanceState[s.studentId] : true
        }))
      };

      const { data } = await api.post(`/api/admin/lms/scheduling/${selectedSchedule.id}/attendance`, payload);
      
      if (data.success) {
        toast.success("Attendance saved successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to save attendance.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("An error occurred while saving attendance.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.setTextColor(15, 23, 42); 
      doc.text('Class Attendance Report', 14, 22);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); 
      doc.text(`Batch: ${selectedSchedule?.batchName}`, 14, 34);
      doc.text(`Subject: ${selectedSchedule?.subjectName}`, 14, 40);
      doc.text(`Date: ${formatDate(selectedSchedule?.startTime)}`, 14, 46);
      doc.text(`Time: ${formatTime(selectedSchedule?.startTime)} to ${formatTime(selectedSchedule?.endTime)}`, 14, 52);

      // UPDATED DATA ORDER WITH EMAIL
      const tableData = students.map((s, index) => [
        index + 1,
        s.studentId.slice(0, 8).toUpperCase(), 
        s.email, // Added Email
        s.name,
        attendanceState[s.studentId] ? 'Present' : 'Absent'
      ]);

      autoTable(doc, {
        startY: 60,
        // UPDATED HEADERS
        head: [['S.No', 'Student ID', 'Email.id', 'Name', 'Status']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [15, 23, 42], 
          textColor: 255, 
          fontStyle: 'bold' 
        },
        alternateRowStyles: { 
          fillColor: [248, 250, 252] 
        },
        styles: { 
          font: 'helvetica', 
          fontSize: 9, 
          cellPadding: 2, 
          lineColor: [226, 232, 240], 
          lineWidth: 0.1,
        },
        columnStyles: {
          4: { fontStyle: 'bold' } // Moved target from 3 to 4 because Status is now the 5th column
        },
        didParseCell: function (data) {
          // Check column index 4 for Status colors
          if (data.column.index === 4 && data.section === 'body') {
            if (data.cell.raw === 'Present') {
              data.cell.styles.textColor = [34, 197, 94]; 
            } else if (data.cell.raw === 'Absent') {
              data.cell.styles.textColor = [239, 68, 68]; 
            }
          }
        }
      });

      doc.save(`${selectedSchedule?.batchName}_Attendance.pdf`);
      toast.success("PDF Downloaded successfully!");
    } catch (error) {
      console.error("PDF Generation Error: ", error);
      toast.error("Failed to generate PDF. Check console.");
    }
  };

  const exportToExcel = () => {
    try {
      const wsData = [
        ['Class Attendance Report'],
        [],
        ['Batch', selectedSchedule?.batchName],
        ['Subject', selectedSchedule?.subjectName],
        ['Date', formatDate(selectedSchedule?.startTime)],
        ['Time', `${formatTime(selectedSchedule?.startTime)} to ${formatTime(selectedSchedule?.endTime)}`],
        [],
        // UPDATED COLUMNS FOR EXCEL
        ['S.No', 'Student ID', 'Email.id', 'Name', 'Status'],
        ...students.map((s, i) => [
          i + 1,
          s.studentId,
          s.email,
          s.name,
          attendanceState[s.studentId] ? 'Present' : 'Absent'
        ])
      ];

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
      XLSX.writeFile(wb, `${selectedSchedule?.batchName}_Attendance.xlsx`);
      toast.success("Excel Downloaded successfully!");
    } catch (error) {
      console.error("Excel Generation Error: ", error);
      toast.error("Failed to generate Excel file.");
    }
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
      
      {/* Header */}
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

        {/* Filter */}
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
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                    {dateKey === new Date().toISOString() ? "Today" : new Date(dateKey).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h2>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                <div className="flex flex-col gap-3 pl-1 md:pl-3">
                  {daySchedules.map((schedule, index) => (
                    <div key={schedule.id || index} className="group bg-white flex flex-col md:flex-row md:items-center rounded-xl border border-slate-200 hover:border-slate-300 transition-colors overflow-hidden relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
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

                      <div className="flex-1 px-5 py-4 flex flex-col justify-center">
                        <h3 className="text-base font-bold text-slate-900 mb-1.5">{schedule.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            <Layers className="w-3 h-3" />
                            {schedule.batchName}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-white">
                            <BookOpen className="w-3 h-3" />
                            {schedule.subjectName}
                          </span>
                        </div>
                      </div>

                      <div className="px-5 py-3 md:py-4 border-t md:border-t-0 border-slate-100 flex justify-end items-center gap-3 bg-slate-50/30 md:bg-transparent">
                        <button 
                          onClick={() => handleOpenAttendance(schedule)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg transition-all"
                        >
                          <Users className="w-4 h-4 text-slate-500" />
                          Students
                        </button>
                        {schedule.meetingLink && (
                          <a href={schedule.meetingLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                            <Video className="w-4 h-4" />
                            Join
                          </a>
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

      {/* Premium Attendance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Class Attendance</h3>
                <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <span className="font-medium text-slate-700">{selectedSchedule?.batchName}</span> 
                  • {selectedSchedule?.subjectName}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {isFetchingStudents ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-slate-500">Loading student roster...</p>
                </div>
              ) : students.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                  <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">No students enrolled in this batch.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {students.map((student) => {
                    const isPresent = attendanceState[student.studentId];
                    return (
                      <div 
                        key={student.studentId}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          isPresent ? 'border-green-200 bg-green-50/30' : 'border-red-100 bg-red-50/30'
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{student.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{student.email}</p>
                        </div>
                        
                        <button
                          onClick={() => toggleStudentAttendance(student.studentId)}
                          className={`relative inline-flex h-8 w-24 items-center rounded-full transition-colors focus:outline-none ${
                            isPresent ? 'bg-green-500' : 'bg-red-400'
                          }`}
                        >
                          <span 
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform flex items-center justify-center shadow-sm ${
                              isPresent ? 'translate-x-17' : 'translate-x-1'
                            }`}
                            style={{ transform: isPresent ? 'translateX(68px)' : 'translateX(4px)' }}
                          >
                            {isPresent ? <UserCheck className="w-3.5 h-3.5 text-green-500" /> : <UserX className="w-3.5 h-3.5 text-red-400" />}
                          </span>
                          <span className={`absolute text-xs font-bold text-white transition-opacity ${isPresent ? 'left-3' : 'right-3'}`}>
                            {isPresent ? 'Present' : 'Absent'}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer with Export Tools */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Export Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button 
                  onClick={exportToPDF}
                  disabled={students.length === 0}
                  className="flex flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4 text-red-500" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
                <button 
                  onClick={exportToExcel}
                  disabled={students.length === 0}
                  className="flex flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4 text-green-600" />
                  <span className="hidden sm:inline">Excel</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 md:flex-none px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitAttendance}
                  disabled={isSubmitting || students.length === 0}
                  className="flex-1 md:flex-none inline-flex justify-center items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
                >
                  {isSubmitting && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                  {isSubmitting ? 'Saving...' : 'Save Attendance'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultySchedule;