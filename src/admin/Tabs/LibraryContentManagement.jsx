import React, { useState, useEffect, useRef } from 'react';
import { Plus, FileText, Edit2, Trash2, AlertTriangle } from 'lucide-react'; 
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
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-slate-300 rounded-lg p-2.5 flex justify-between items-center bg-white cursor-pointer hover:border-blue-500"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>{value || placeholder}</span>
        <span className="text-slate-400 text-xs">▼</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ maxHeight: '250px' }}>
          <div className="overflow-y-auto flex-1">
            {items.length === 0 && <div className="p-3 text-sm text-slate-500 text-center">No options available</div>}
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center px-4 py-2 hover:bg-slate-50 group border-b border-slate-50 last:border-0">
                <div 
                  className="flex-1 cursor-pointer text-sm"
                  onClick={() => { onChange(item.name); setIsOpen(false); }}
                >
                  {item.name}
                </div>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onDelete(item.id, item.name); }}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  title="Delete Option"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-2 border-t bg-slate-50 flex gap-2">
            <input 
              type="text" 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new..."
              className="flex-1 border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
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
              className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
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

  // --- Delete Confirmation State ---
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    type: '', // 'program', 'category', or 'content'
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
      const progs = await cmsService.getLibraryPrograms();
      const cats = await cmsService.getLibraryCategories();
      setPrograms(progs);
      setCategories(cats);
    } catch (error) {
      console.error("Failed to fetch master data", error);
    }
  };

  // --- Dynamic List Handlers ---
  const handleAddProgram = async (name) => {
    try {
      await cmsService.addLibraryProgram(name);
      fetchMasterData(); // Refresh list
    } catch(err) { console.error("Failed to add program", err); }
  };

  const promptDeleteProgram = (id, name) => {
    setDeleteConfirm({ isOpen: true, type: 'program', id, itemName: name });
  };

  const handleAddCategory = async (name) => {
    try {
      await cmsService.addLibraryCategory(name);
      fetchMasterData(); // Refresh list
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

    setUploading(true);
    try {
      const result = await storageService.uploadFile(file);
      setFormData(prev => ({ ...prev, fileUrl: result.url }));
      alert('File uploaded successfully!');
    } catch (error) {
      console.error("File upload failed", error);
      alert('File upload failed.');
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

  // --- Centralized Delete Execution ---
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
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Library Content Management</h1>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Content
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">File</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {Array.isArray(contents) && contents.map((item) => (
              <tr key={item?.id || Math.random()} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item?.program}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item?.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item?.academicYear}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {item?.fileUrl && (
                    <a href={item.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                      <FileText className="w-4 h-4" /> View
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => promptDeleteContent(item.id, item.name)} className="text-red-600 hover:text-red-900 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {(!contents || contents.length === 0) && (
              <tr><td colSpan="6" className="px-6 py-4 text-center text-slate-500">No library content found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">{formData.id ? 'Edit Content' : 'Add Content'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. JEE Mains 2024 Math Paper" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <EditableDropdown 
                  label="Program"
                  placeholder="Select Program"
                  items={programs}
                  value={formData.program}
                  onChange={(val) => setFormData({ ...formData, program: val })}
                  onAdd={handleAddProgram}
                  onDelete={promptDeleteProgram}
                />
                
                <EditableDropdown 
                  label="Category"
                  placeholder="Select Category"
                  items={categories}
                  value={formData.category}
                  onChange={(val) => setFormData({ ...formData, category: val })}
                  onAdd={handleAddCategory}
                  onDelete={promptDeleteCategory}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Academic Year</label>
                <input required type="text" name="academicYear" value={formData.academicYear} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g. 2024-2025" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">File (PDF/Doc)</label>
                <input type="file" onChange={handleFileChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {uploading && <p className="text-xs text-blue-600 mt-2 font-medium">Uploading file...</p>}
                {formData.fileUrl && !uploading && <p className="text-xs text-emerald-600 mt-2 truncate font-medium">✓ File attached</p>}
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={loading || uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors">
                  {loading ? 'Saving...' : 'Save Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Custom Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[60] backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all scale-100">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete {deleteConfirm.type}</h3>
            <p className="text-slate-500 mb-6">
              Are you sure you want to permanently delete <br/>
              <span className="font-semibold text-slate-800">"{deleteConfirm.itemName}"</span>? <br/>
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={closeDeleteConfirm} 
                className="flex-1 px-4 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeDelete} 
                className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors shadow-sm shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryContentManagement;