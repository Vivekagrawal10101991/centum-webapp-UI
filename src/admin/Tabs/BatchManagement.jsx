import React, { useState, useEffect, useRef } from 'react';
import { Layers, Plus, Loader2, CheckCircle, AlertCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../services/api';

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [masterGrades, setMasterGrades] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // UI States for the complex dropdown
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [expandedGrades, setExpandedGrades] = useState({}); // Track which grades are open in the accordion
  const dropdownRef = useRef(null);

  // States for On-the-fly creation
  const [newGradeName, setNewGradeName] = useState('');
  const [newSubjectNames, setNewSubjectNames] = useState({}); // Map of gradeId -> new subject input string
  const [isAddingMaster, setIsAddingMaster] = useState(false);

  const initialFormState = {
    batchName: '',
    academicYear: '2024-2025',
    subjectIds: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedSubjectDetails, setSelectedSubjectDetails] = useState([]); // To display the pills on the left

  // Academic Year Options
  const academicYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];

  useEffect(() => {
    fetchData();

    // Click outside listener for custom dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSubjectDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Active Batches
      const batchesRes = await api.get('/api/batches');
      setBatches(batchesRes.data?.data || batchesRes.data || []);

      // Fetch Master Grades & Subjects
      await fetchMasterData();

    } catch (error) {
      showNotification('Failed to load initial data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchMasterData = async () => {
    try {
      const gradesRes = await api.get('/api/lms-master/grades');
      setMasterGrades(gradesRes.data?.data || gradesRes.data || []);
    } catch (err) {
      console.error("Failed to fetch master grades", err);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Subject Selection Logic ---
  const toggleSubjectSelection = (subject, gradeName) => {
    const isSelected = formData.subjectIds.includes(subject.id);
    
    if (isSelected) {
      // Remove
      setFormData(prev => ({
        ...prev,
        subjectIds: prev.subjectIds.filter(id => id !== subject.id)
      }));
      setSelectedSubjectDetails(prev => prev.filter(s => s.id !== subject.id));
    } else {
      // Add
      setFormData(prev => ({
        ...prev,
        subjectIds: [...prev.subjectIds, subject.id]
      }));
      setSelectedSubjectDetails(prev => [...prev, { ...subject, gradeName }]);
    }
  };

  const removeSubjectPill = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      subjectIds: prev.subjectIds.filter(id => id !== subjectId)
    }));
    setSelectedSubjectDetails(prev => prev.filter(s => s.id !== subjectId));
  };

  const toggleGradeAccordion = (gradeId) => {
    setExpandedGrades(prev => ({ ...prev, [gradeId]: !prev[gradeId] }));
  };

  // --- On-the-fly Creation Logic ---
  const handleAddNewGrade = async () => {
    if (!newGradeName.trim()) return;
    setIsAddingMaster(true);
    try {
      await api.post('/api/lms-master/grades', { name: newGradeName.trim() });
      setNewGradeName('');
      await fetchMasterData(); // Refresh list
      showNotification('Grade added successfully', 'success');
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to add Grade', 'error');
    } finally {
      setIsAddingMaster(false);
    }
  };

  const handleAddNewSubject = async (gradeId) => {
    const subjectName = newSubjectNames[gradeId];
    if (!subjectName || !subjectName.trim()) return;
    
    setIsAddingMaster(true);
    try {
      await api.post('/api/lms-master/subjects', { name: subjectName.trim(), gradeId });
      setNewSubjectNames(prev => ({ ...prev, [gradeId]: '' }));
      await fetchMasterData(); // Refresh list
      showNotification('Subject added successfully', 'success');
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to add Subject', 'error');
    } finally {
      setIsAddingMaster(false);
    }
  };

  // --- Form Submission ---
  const handleSubmit = async (actionType) => {
    if (!formData.batchName || !formData.academicYear) {
      showNotification('Batch Name and Academic Year are required.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/batches/create', formData);
      showNotification('Batch created successfully!', 'success');
      
      fetchData(); // Refresh active batches list

      if (actionType === 'SAVE_AND_ADD_ANOTHER') {
        // Clear specific fields, keep academic year
        setFormData({ ...initialFormState, academicYear: formData.academicYear });
        setSelectedSubjectDetails([]);
      } else if (actionType === 'SAVE') {
        // Just clear form
        setFormData(initialFormState);
        setSelectedSubjectDetails([]);
      }
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to create batch.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setSelectedSubjectDetails([]);
    setIsSubjectDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-600" />
          Batch Management
        </h1>
        <p className="text-slate-500 mt-1">Create and manage academic batches with dynamic subjects.</p>
      </div>

      {notification.show && (
        <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* === CREATION FORM (Left/Top Side) === INCREASED WIDTH from col-span-5 to col-span-6 */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-visible">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">Create New Batch</h2>
            </div>

            <div className="p-5 space-y-5">
              
              {/* Batch Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Batch Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="batchName"
                  value={formData.batchName}
                  onChange={handleInputChange}
                  placeholder="e.g. JEE Target 2026 - Batch A"
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Academic Year Row (Course link removed) */}
              <div className="w-full sm:w-1/2 space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Academic Year <span className="text-red-500">*</span></label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none appearance-none text-sm"
                >
                  {academicYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* === THE COMPLEX SUBJECT SELECTION UI === */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-slate-700">Selected Subjects</label>
                
                {/* 1. Selected Subjects "Pill" Box */}
                <div className="min-h-[60px] p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-2 items-start">
                  {selectedSubjectDetails.length === 0 ? (
                    <span className="text-sm text-slate-400 mt-1 ml-1">No subjects selected yet...</span>
                  ) : (
                    selectedSubjectDetails.map(subject => (
                      <div key={subject.id} className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200">
                        <span>{subject.gradeName} - {subject.name}</span>
                        <button onClick={() => removeSubjectPill(subject.id)} className="hover:bg-blue-200 p-0.5 rounded-full transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* 2. Custom Hierarchical Dropdown (Now pushes content down) */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm text-slate-600">Click to add subjects...</span>
                    {isSubjectDropdownOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {/* Dropdown Menu Body - Removed 'absolute' to prevent overlapping the buttons below */}
                  {isSubjectDropdownOpen && (
                    <div className="w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-sm max-h-[400px] overflow-y-auto flex flex-col transition-all">
                      
                      {/* Master Grades List */}
                      <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {masterGrades.length === 0 ? (
                          <p className="p-3 text-sm text-slate-500 text-center">No grades available. Add one below.</p>
                        ) : (
                          masterGrades.map(grade => (
                            <div key={grade.id} className="border border-slate-100 rounded-lg overflow-hidden">
                              {/* Grade Accordion Header */}
                              <button
                                type="button"
                                onClick={() => toggleGradeAccordion(grade.id)}
                                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                              >
                                <span className="font-semibold text-slate-700 text-sm">Grade: {grade.name}</span>
                                {expandedGrades[grade.id] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                              </button>

                              {/* Subjects List inside Grade */}
                              {expandedGrades[grade.id] && (
                                <div className="p-3 bg-white border-t border-slate-100 space-y-3">
                                  {/* Render existing subjects */}
                                  {grade.subjects?.length > 0 ? (
                                    <div className="space-y-2">
                                      {grade.subjects.map(subject => (
                                        <label key={subject.id} className="flex items-center gap-3 p-1 hover:bg-slate-50 rounded cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={formData.subjectIds.includes(subject.id)}
                                            onChange={() => toggleSubjectSelection(subject, grade.name)}
                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                          />
                                          <span className="text-sm text-slate-700">{subject.name}</span>
                                        </label>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-xs text-slate-400 italic">No subjects in this grade yet.</p>
                                  )}

                                  {/* Add Subject Inline Input */}
                                  <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                                    <input
                                      type="text"
                                      placeholder="New subject name..."
                                      value={newSubjectNames[grade.id] || ''}
                                      onChange={(e) => setNewSubjectNames(prev => ({...prev, [grade.id]: e.target.value}))}
                                      className="flex-1 px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleAddNewSubject(grade.id)}
                                      disabled={isAddingMaster || !newSubjectNames[grade.id]}
                                      className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 disabled:opacity-50"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Grade Input Fixed at Bottom */}
                      <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Add New Grade</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="e.g. XII, Foundation..."
                            value={newGradeName}
                            onChange={(e) => setNewGradeName(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleAddNewGrade}
                            disabled={isAddingMaster || !newGradeName}
                            className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 disabled:opacity-50 whitespace-nowrap"
                          >
                            Add Grade
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              </div>
              {/* === END OF SUBJECT SELECTION UI === */}

              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => handleSubmit('SAVE')}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Batch'}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSubmit('SAVE_AND_ADD_ANOTHER')}
                    disabled={submitting}
                    className="w-full px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all text-sm"
                  >
                    Save & Add Another
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={submitting}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* === LIST SECTION (Right Side) === DECREASED WIDTH from col-span-7 to col-span-6 */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Active Batches</h2>
            </div>
            
            <div className="overflow-x-auto">
              {batches.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 font-semibold">Batch Name</th>
                      <th className="px-6 py-4 font-semibold">Academic Yr</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch) => (
                      <tr key={batch.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">{batch.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">{batch.academicYear || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${batch.active ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                            {batch.active ? 'Ongoing' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <Layers className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-medium text-slate-700 text-lg">No batches found</p>
                  <p className="text-sm mt-1 max-w-xs">Use the form on the left to configure and create your first academic batch.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchManagement;