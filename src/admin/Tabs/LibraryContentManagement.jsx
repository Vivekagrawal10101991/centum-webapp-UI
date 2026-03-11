import React, { useState, useEffect } from 'react';
import { Plus, FileText, Edit2, Trash2 } from 'lucide-react'; 
import { cmsService } from '../services/cmsService';
import { storageService } from '../services/storageService';

const LibraryContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    program: 'JEE',
    category: 'Sample Paper',
    academicYear: new Date().getFullYear().toString(),
    fileUrl: ''
  });

  const programs = ['JEE', 'NEET', 'FOUNDATION', 'OLYMPIAD', 'ENTRANCE EXAM'];
  const categories = ['Sample Paper', 'Previous yr Paper', 'Answer Key'];

  useEffect(() => {
    fetchContents();
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await cmsService.deleteLibraryContent(id);
        fetchContents();
      } catch (error) {
        console.error("Failed to delete", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      program: 'JEE',
      category: 'Sample Paper',
      academicYear: new Date().getFullYear().toString(),
      fileUrl: ''
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Library Content Management</h1>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
              <tr key={item?.id || Math.random()}>
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
                  <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">{formData.id ? 'Edit Content' : 'Add Content'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. JEE Mains 2024 Math Paper" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Program</label>
                  <select name="program" value={formData.program} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
                    {programs.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Academic Year</label>
                <input required type="text" name="academicYear" value={formData.academicYear} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2024-2025" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">File (PDF/Doc)</label>
                <input type="file" onChange={handleFileChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm" />
                {uploading && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                {formData.fileUrl && !uploading && <p className="text-xs text-green-600 mt-1 truncate">File attached: {formData.fileUrl}</p>}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading || uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryContentManagement;