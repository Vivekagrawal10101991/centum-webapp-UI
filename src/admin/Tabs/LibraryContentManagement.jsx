import React, { useState, useEffect, useRef } from 'react';
import { Plus, FileText, Edit2, Trash2, AlertTriangle, Search, ChevronLeft, ChevronRight, X } from 'lucide-react'; 
import { cmsService } from '../services/cmsService';
import { storageService } from '../services/storageService';

// Custom Dropdown Component to handle dynamic Lists (Add & Delete capabilities inline)
const EditableDropdown = ({ label, items, value, onChange, onAdd, onDelete, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-slate-200 rounded-xl p-3 flex justify-between items-center bg-slate-50 cursor-pointer hover:border-blue-400 hover:bg-white transition-all shadow-sm"
      >
        <span className={value ? "text-slate-900 font-medium" : "text-slate-400"}>{value || placeholder}</span>
        <span className={`text-slate-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100" style={{ maxHeight: '250px' }}>
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {items.length === 0 && <div className="p-4 text-sm text-slate-500 text-center italic">No options available</div>}
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center px-4 py-2.5 hover:bg-slate-50 group border-b border-slate-50 last:border-0 transition-colors">
                <div 
                  className="flex-1 cursor-pointer text-sm font-medium text-slate-700 group-hover:text-blue-600"
                  onClick={() => { onChange(item.name); setIsOpen(false); }}
                >
                  {item.name}
                </div>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onDelete(item.id, item.name); }}
                  className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Option"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-3 border-t bg-slate-50 flex gap-2">
            <input 
              type="text" 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new..."
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (newItem.trim()) {
                    onAdd(newItem.trim());
                    setNewItem('');
                  }
                }
              }}
            />
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (newItem.trim()) {
                  onAdd(newItem.trim());
                  setNewItem('');
                }
              }}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const LibraryContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Advanced Filters State
  const [filterProgram, setFilterProgram] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterYear, setFilterYear] = useState('All');

  // Search and Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // --- Delete Confirmation State ---
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    type: '', 
    id: null,
    itemName: ''
  });

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    program: '',
    category: '',
    academicYear: new Date().getFullYear().toString(),
    fileUrl: ''
  });

  useEffect(() => {
    fetchContents();
    fetchMasterData();
  }, []);

  // Reset pagination when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterProgram, filterCategory, filterYear]);

  const fetchContents = async () => {
    try {
      const data = await cmsService.getLibraryContents();
      if (Array.isArray(data)) {
        setContents(data);
      } else {
        setContents([]); 
      }
    } catch (error) {
      console.error("Failed to fetch library contents", error);
      setContents([]); 
    }
  };

  const fetchMasterData = async () => {
    try {
      const [progs, cats] = await Promise.all([
        cmsService.getLibraryPrograms(),
        cmsService.getLibraryCategories()
      ]);
      setPrograms(progs || []);
      setCategories(cats || []);
    } catch (error) {
      console.error("Failed to fetch master data", error);
    }
  };

  // Extract unique academic years for filtering
  const academicYears = ['All', ...new Set(contents.map(item => item.academicYear).filter(Boolean))].sort((a, b) => b - a);

  // Compute filtered and paginated contents
  const filteredContents = contents.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.program?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgram = filterProgram === 'All' || item.program === filterProgram;
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    const matchesYear = filterYear === 'All' || item.academicYear === filterYear;

    return matchesSearch && matchesProgram && matchesCategory && matchesYear;
  });

  const totalPages = Math.ceil(filteredContents.length / ITEMS_PER_PAGE);
  const paginatedContents = filteredContents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddProgram = async (name) => {
    try {
      await cmsService.addLibraryProgram(name);
      fetchMasterData();
    } catch(err) { console.error("Failed to add program", err); }
  };

  const promptDeleteProgram = (id, name) => {
    setDeleteConfirm({ isOpen: true, type: 'program', id, itemName: name });
  };

  const handleAddCategory = async (name) => {
    try {
      await cmsService.addLibraryCategory(name);
      fetchMasterData(); 
    } catch(err) { console.error("Failed to add category", err); }
  };

  const promptDeleteCategory = (id, name) => {
    setDeleteConfirm({ isOpen: true, type: 'category', id, itemName: name });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // --- NEW: Frontend File Size Validation ---
    const MAX_FILE_SIZE_MB = 100; // Matches backend
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const actualSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      alert(`File is too large! You are trying to upload a ${actualSizeMB} MB file.\n\nThe maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`);
      e.target.value = ''; // Reset the input field
      return;
    }

    setUploading(true);
    try {
      const result = await storageService.uploadFile(file);
      setFormData(prev => ({ ...prev, fileUrl: result.url }));
      alert('File uploaded successfully!');
    } catch (error) {
      console.error("File upload failed", error);
      alert('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fileUrl) {
      alert("Please upload a file.");
      return;
    }
    if (!formData.program || !formData.category) {
      alert("Please select a Program and Category.");
      return;
    }

    setLoading(true);
    try {
      if (formData.id) {
        await cmsService.updateLibraryContent(formData.id, formData);
      } else {
        await cmsService.addLibraryContent(formData);
      }
      setIsModalOpen(false);
      fetchContents();
      resetForm();
    } catch (error) {
      console.error("Failed to save content", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const promptDeleteContent = (id, name) => {
    setDeleteConfirm({ isOpen: true, type: 'content', id, itemName: name });
  };

  const executeDelete = async () => {
    const { type, id } = deleteConfirm;
    try {
      if (type === 'program') {
        await cmsService.deleteLibraryProgram(id);
        fetchMasterData();
      } else if (type === 'category') {
        await cmsService.deleteLibraryCategory(id);
        fetchMasterData();
      } else if (type === 'content') {
        await cmsService.deleteLibraryContent(id);
        fetchContents();
      }
    } catch (error) {
      console.error(`Failed to delete ${type}`, error);
    } finally {
      closeDeleteConfirm();
    }
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({ isOpen: false, type: '', id: null, itemName: '' });
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      program: '',
      category: '',
      academicYear: new Date().getFullYear().toString(),
      fileUrl: ''
    });
  };

  return (
    <div className="p-4 md:p-8 relative bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Library Content</h1>
          <p className="text-slate-500 mt-1">Manage and organize all study materials and resources.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-5 h-5" /> Add New Material
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Toolbar & Filters */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/30 space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search by name, program, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium bg-white"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Program Filter */}
              <select 
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 cursor-pointer shadow-sm min-w-[140px]"
              >
                <option value="All">All Programs</option>
                {programs.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>

              {/* Category Filter */}
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 cursor-pointer shadow-sm min-w-[140px]"
              >
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>

              {/* Year Filter */}
              <select 
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 cursor-pointer shadow-sm min-w-[120px]"
              >
                <option value="All">All Years</option>
                {academicYears.filter(y => y !== 'All').map(year => <option key={year} value={year}>{year}</option>)}
              </select>

              {/* Clear Filters Button */}
              {(filterProgram !== 'All' || filterCategory !== 'All' || filterYear !== 'All' || searchQuery !== '') && (
                <button 
                  onClick={() => { setFilterProgram('All'); setFilterCategory('All'); setFilterYear('All'); setSearchQuery(''); }}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 shadow-sm bg-white"
                  title="Clear All Filters"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="text-sm font-bold text-slate-500 bg-slate-100/80 px-4 py-2.5 rounded-xl border border-slate-200 shadow-inner ml-auto lg:ml-0">
                Found: <span className="text-blue-600">{filteredContents.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Document Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {paginatedContents.map((item) => (
                <tr key={item?.id || Math.random()} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item?.name}</span>
                        {item?.fileUrl && (
                          <a href={item.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:text-blue-700 hover:underline font-medium w-fit mt-0.5">
                            View File ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                      {item?.program}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item?.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-500">
                    {item?.academicYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)} 
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-100"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => promptDeleteContent(item.id, item.name)} 
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!paginatedContents || paginatedContents.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                        <Search className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-500 font-medium">No library content found.</p>
                      {searchQuery && <p className="text-sm text-slate-400 mt-1">Try adjusting your search criteria.</p>}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredContents.length)}</span> of <span className="font-bold text-slate-900">{filteredContents.length}</span> entries
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show max 5 pages, with current page in middle if possible
                  if (totalPages > 5 && (page < currentPage - 2 || page > currentPage + 2)) {
                    if (page === 1 || page === totalPages) return <span key={page} className="px-1 text-slate-400">...</span>;
                    return null;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-bold text-sm transition-all ${
                        currentPage === page 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200 border-transparent' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-[100] backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-black text-slate-800">{formData.id ? 'Edit Material' : 'Add New Material'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Document Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium" placeholder="e.g. JEE Mains 2024 Math Paper" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <EditableDropdown 
                  label="Program"
                  placeholder="Select"
                  items={programs}
                  value={formData.program}
                  onChange={(val) => setFormData({ ...formData, program: val })}
                  onAdd={handleAddProgram}
                  onDelete={promptDeleteProgram}
                />
                
                <EditableDropdown 
                  label="Category"
                  placeholder="Select"
                  items={categories}
                  value={formData.category}
                  onChange={(val) => setFormData({ ...formData, category: val })}
                  onAdd={handleAddCategory}
                  onDelete={promptDeleteCategory}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Academic Year</label>
                <input required type="text" name="academicYear" value={formData.academicYear} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium" placeholder="e.g. 2024-2025" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">File Upload (PDF/Doc)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors">
                  <input type="file" onChange={handleFileChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer" />
                </div>
                {uploading && <div className="text-xs text-blue-600 mt-2 font-bold flex items-center gap-2"><div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> Uploading file...</div>}
                {formData.fileUrl && !uploading && <div className="text-xs text-emerald-600 mt-2 truncate font-bold flex items-center gap-1">✓ File securely attached</div>}
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" disabled={loading || uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all">
                  {loading ? 'Saving...' : 'Save Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Custom Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[120] backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center transform transition-all animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 border-4 border-white shadow-[0_0_0_4px_rgba(254,226,226,1)]">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Delete {deleteConfirm.type}</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Are you sure you want to permanently delete <br/>
              <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded inline-block mt-1">"{deleteConfirm.itemName}"</span>? <br/>
              <span className="text-sm mt-2 inline-block text-red-500 font-medium">This action cannot be undone.</span>
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={closeDeleteConfirm} 
                className="flex-1 px-4 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeDelete} 
                className="flex-1 px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-colors shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5"
              >
                Yes, Delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryContentManagement;