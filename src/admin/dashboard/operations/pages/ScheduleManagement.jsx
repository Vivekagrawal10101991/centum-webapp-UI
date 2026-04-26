import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, Calendar, Download, X, FileText, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ScheduleBySubjects from './ScheduleBySubjects';
import ScheduleByBatches from './ScheduleByBatches'; 
import MasterTimetable from './MasterTimetable'; 
import api from '../../../../services/api';

// Import the logo directly from your assets folder
import logo from '../../../../assets/logo.png';

const ScheduleManagement = () => {
  const [activeTab, setActiveTab] = useState('subjects');

  // ==========================================
  // EXPORT MODAL STATES
  // ==========================================
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [allSchedules, setAllSchedules] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Available options mapped from the database
  const [availableBatches, setAvailableBatches] = useState([]);
  const [availableFaculties, setAvailableFaculties] = useState([]);

  // User's Selected Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');

  // Fetch all schedules when opening the export modal
  const openExportModal = async () => {
    setIsExportModalOpen(true);
    setIsFetching(true);
    try {
      const { data } = await api.get('/api/admin/lms/scheduling/all');
      if (data.success) {
        setAllSchedules(data.data);
        
        // Extract unique batches and faculties to populate the filter options
        const batches = [...new Set(data.data.map(s => s.batchName).filter(Boolean))].sort();
        const faculties = [...new Set(data.data.map(s => s.facultyName).filter(Boolean))].sort();
        
        setAvailableBatches(batches);
        setAvailableFaculties(faculties);
      }
    } catch (error) {
      toast.error('Failed to fetch schedules for export');
    } finally {
      setIsFetching(false);
    }
  };

  const toggleBatch = (batch) => {
    setSelectedBatches(prev =>
      prev.includes(batch) ? prev.filter(b => b !== batch) : [...prev, batch]
    );
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, ' ');
  };

  // Helper to pre-load image safely for jsPDF
  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  };

  // ==========================================
  // PREMIUM PDF GENERATION ENGINE
  // ==========================================
  const generatePDF = async () => {
    // 1. Apply Filters
    const filteredSchedules = allSchedules.filter(s => {
       let sDate = new Date(s.startTime);
       sDate.setHours(0,0,0,0);
       
       let start = startDate ? new Date(startDate) : null;
       let end = endDate ? new Date(endDate) : null;
       if (start) start.setHours(0,0,0,0);
       if (end) end.setHours(0,0,0,0);

       if (start && sDate < start) return false;
       if (end && sDate > end) return false;
       if (selectedBatches.length > 0 && !selectedBatches.includes(s.batchName)) return false;
       if (selectedFaculty && s.facultyName !== selectedFaculty) return false;

       return true;
    });

    if (filteredSchedules.length === 0) {
      toast.error("No schedules found for the selected filters.");
      return;
    }

    // 2. Group by Date
    const grouped = filteredSchedules.reduce((acc, curr) => {
      const dateStr = new Date(curr.startTime).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
      });
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(curr);
      return acc;
    }, {});

    try {
      const doc = new jsPDF('p', 'pt', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();

      // 3. Print Premium Header Information
      
      // Load and add the logo (Top Left) - Increased size by 25% (from 40x40 to 50x50)
      const logoImg = await loadImage(logo);
      if (logoImg) {
        doc.addImage(logoImg, 'PNG', 40, 25, 50, 50); 
      }

      // Main Title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42); // Slate-900
      doc.text("Centum Academy", pageWidth / 2, 45, { align: "center" });

      // Address Block
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(71, 85, 105); // Slate-600
      doc.text("Bangalore, Centum Academy, BDA Site, 1514, 19th Main Rd, near MTR, 1st Sector, HSR Layout,", pageWidth / 2, 58, { align: "center" });
      doc.text("Bengaluru, Karnataka, 560102 | +91-9108933332 | contactus@centumacademy.com |", pageWidth / 2, 68, { align: "center" });
      doc.text("https://centumacademy.com", pageWidth / 2, 78, { align: "center" });

      // Divider Line - Made significantly darker (Slate-500 instead of Slate-200)
      doc.setDrawColor(100, 116, 139); 
      doc.setLineWidth(1);
      doc.line(40, 90, pageWidth - 40, 90);

      // 4. Print Meta Information (Duration & Lectures)
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      
      let durText = "Duration : All Time";
      if (startDate && endDate) {
        durText = `Duration : ${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
      } else if (startDate) {
        durText = `Duration : From ${formatShortDate(startDate)}`;
      }

      doc.text(durText, 40, 110);
      
      let batchText = selectedBatches.length > 0 ? selectedBatches.join(', ') : 'All';
      if (batchText.length > 80) batchText = batchText.substring(0, 80) + '...';
      doc.text(`Lectures : ${batchText}`, 40, 125);

      let currentY = 150;

      // 5. Render Tables Grouped By Date
      const sortedDates = Object.keys(grouped).sort((a,b) => new Date(a) - new Date(b));

      sortedDates.forEach((dateKey) => {
        const daySchedules = grouped[dateKey].sort((a,b) => new Date(a.startTime) - new Date(b.startTime));

        // Sub-header for the Date
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(dateKey, 40, currentY);
        currentY += 12;

        // Map data to match exact requested columns
        const tableData = daySchedules.map(s => [
          `${formatTime(s.startTime)} - ${formatTime(s.endTime)}`, // Single Line Time
          s.subjectName,
          s.facultyName,
          s.batchName,
          s.topics || '-'
        ]);

        autoTable(doc, {
          startY: currentY,
          head: [['Time', 'Subject', 'Faculty', 'Batch', 'Topics']],
          body: tableData,
          theme: 'grid',
          headStyles: { 
            fillColor: [226, 232, 240], // Light Grey Background (Slate-200)
            textColor: [15, 23, 42],    // Dark Text (Slate-900)
            fontStyle: 'bold', 
            cellPadding: 6
          },
          bodyStyles: { 
            textColor: [51, 65, 85], // Slate-700
            cellPadding: 5,
            lineColor: [226, 232, 240], // Slate-200
            lineWidth: 0.1 
          },
          alternateRowStyles: { 
            fillColor: [248, 250, 252] // Slate-50
          },
          styles: { 
            font: 'helvetica', 
            fontSize: 9, 
            overflow: 'linebreak' 
          },
          margin: { left: 40, right: 40 },
          columnStyles: {
            0: { cellWidth: 115 }, // Expanded to fit single-line time
            1: { cellWidth: 90 },
            2: { cellWidth: 90 },
            3: { cellWidth: 100 },
            4: { cellWidth: 'auto' }
          }
        });

        currentY = doc.lastAutoTable.finalY + 25;
        
        // Page break logic
        if (currentY > doc.internal.pageSize.getHeight() - 50) {
          doc.addPage();
          currentY = 40;
        }
      });

      doc.save(`Master_Schedule.pdf`);
      toast.success("Schedule PDF downloaded successfully!");
      setIsExportModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Schedule Management</h1>
          <p className="text-slate-500 mt-2">Manage your institution's master timetable by subjects, batches, or view the overall calendar.</p>
        </div>

        {/* EXPORT PDF BUTTON */}
        <button 
          onClick={openExportModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors shrink-0"
        >
          <FileText className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl w-fit mb-8 border border-slate-200 shadow-sm">
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

        <div className="w-px bg-slate-200 mx-1"></div>

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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[500px]">
        {activeTab === 'subjects' && <ScheduleBySubjects />}
        {activeTab === 'batches' && <ScheduleByBatches />}
        {activeTab === 'timetable' && <MasterTimetable />}
      </div>

      {/* ========================================== */}
      {/* EXPORT MODAL UI */}
      {/* ========================================== */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Download Schedule PDF</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Filter the master timetable for export</p>
                </div>
              </div>
              <button onClick={() => setIsExportModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {isFetching ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-slate-500 font-medium">Loading parameters...</p>
                </div>
              ) : (
                <>
                  {/* Date Range Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Start Date</label>
                      <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">End Date</label>
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Faculty Selection */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Filter by Faculty</label>
                    <select 
                      value={selectedFaculty}
                      onChange={(e) => setSelectedFaculty(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                    >
                      <option value="">All Faculties</option>
                      {availableFaculties.map((fac, idx) => (
                        <option key={idx} value={fac}>{fac}</option>
                      ))}
                    </select>
                  </div>

                  {/* Batches Selection (Multiple) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-slate-700">Select Batches</label>
                      <span className="text-xs font-medium text-slate-400">
                        {selectedBatches.length === 0 ? 'All Selected' : `${selectedBatches.length} Selected`}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
                      {availableBatches.length === 0 ? (
                        <p className="text-sm text-slate-500 col-span-2 text-center py-4">No batches available.</p>
                      ) : (
                        availableBatches.map((batch, idx) => (
                          <label key={idx} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 hover:shadow-sm">
                            <input 
                              type="checkbox"
                              checked={selectedBatches.includes(batch)}
                              onChange={() => toggleBatch(batch)}
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-sm font-medium text-slate-700">{batch}</span>
                          </label>
                        ))
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5" /> Leave empty to export all batches
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsExportModalOpen(false)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={generatePDF}
                disabled={isFetching || allSchedules.length === 0}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Generate PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ScheduleManagement;