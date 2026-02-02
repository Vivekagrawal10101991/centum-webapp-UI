import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Medal, Loader, Image as ImageIcon, Loader2, Smartphone, Monitor } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import api from '../../services/api'; 
import { toast } from 'react-hot-toast';
import ImagePicker from '../components/ImagePicker';

export default function AcademicsResults() {
  const [activeSubTab, setActiveSubTab] = useState('toppers');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // --- Image Picker State ---
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null); // 'topper', 'achiever-desktop', 'achiever-mobile'

  // --- Toppers State ---
  const [toppers, setToppers] = useState([]);
  const [showTopperForm, setShowTopperForm] = useState(false);
  const [editingTopper, setEditingTopper] = useState(null);
  const [topperForm, setTopperForm] = useState({
    studentName: '',
    rank: '',
    examName: '',
    year: new Date().getFullYear(),
    imageUrl: '',
    isPublished: true
  });

  // --- Achiever Gallery State ---
  const [achievers, setAchievers] = useState([]);
  const [showAchieverForm, setShowAchieverForm] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState(null);
  const [achieverForm, setAchieverForm] = useState({
    description: '',
    imageUrl: '',       // Desktop
    mobileImageUrl: ''  // ✅ Mobile
  });

  // --- Fetch Data ---
  useEffect(() => {
    if (activeSubTab === 'toppers') {
      fetchToppers();
    } else if (activeSubTab === 'achievers') {
      fetchAchievers();
    }
  }, [activeSubTab]);

  const fetchToppers = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getToppers();
      setToppers(data || []);
    } catch (error) {
      toast.error('Failed to load toppers');
    } finally {
      setLoading(false);
    }
  };

  const fetchAchievers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/tech/academic/results');
      setAchievers(response.data || []);
    } catch (error) {
      toast.error('Failed to load achiever gallery');
    } finally {
      setLoading(false);
    }
  };

  // --- Topper Handlers ---
  const handleSaveTopper = async () => {
    try {
      setSubmitLoading(true);
      if (editingTopper) {
        await cmsService.updateTopper(editingTopper.id, topperForm);
        toast.success('Topper updated successfully');
      } else {
        await cmsService.createTopper(topperForm);
        toast.success('Topper added successfully');
      }
      setShowTopperForm(false);
      setEditingTopper(null);
      fetchToppers();
    } catch (error) {
      toast.error('Failed to save topper');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteTopper = async (id) => {
    if (!window.confirm('Are you sure you want to delete this topper?')) return;
    try {
      setLoading(true);
      await cmsService.deleteTopper(id);
      toast.success('Topper deleted successfully');
      fetchToppers();
    } catch (error) {
      toast.error('Failed to delete topper');
    } finally {
      setLoading(false);
    }
  };

  // --- Achiever Handlers ---
  const handleSaveAchiever = async () => {
    if (!achieverForm.imageUrl) return toast.error('Desktop Image is required');
    try {
      setSubmitLoading(true);
      if (editingAchiever) {
        await api.put(`/api/tech/academic/results/${editingAchiever.id}`, achieverForm);
        toast.success('Gallery item updated');
      } else {
        await api.post('/api/tech/academic/results', achieverForm);
        toast.success('Gallery item added');
      }
      setShowAchieverForm(false);
      setAchieverForm({ description: '', imageUrl: '', mobileImageUrl: '' });
      fetchAchievers();
    } catch (error) {
      toast.error('Failed to save gallery item');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteAchiever = async (id) => {
    if (!window.confirm('Delete this achiever image?')) return;
    try {
      await api.delete(`/api/tech/academic/results/${id}`);
      toast.success('Deleted successfully');
      fetchAchievers();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  // ✅ Unified Image Selection
  const handleImageSelect = (url) => {
    if (pickerTarget === 'topper') {
        setTopperForm({ ...topperForm, imageUrl: url });
    } else if (pickerTarget === 'achiever-desktop') {
        setAchieverForm({ ...achieverForm, imageUrl: url });
    } else if (pickerTarget === 'achiever-mobile') {
        setAchieverForm({ ...achieverForm, mobileImageUrl: url });
    }
    setShowImagePicker(false);
  };

  return (
    <div>
      <ImagePicker 
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        title={pickerTarget?.includes('mobile') ? "Select Mobile Image (Portrait)" : "Select Image"}
        onSelect={handleImageSelect}
      />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Academics & Results</h2>
        <p className="text-gray-600 mt-1">Showcase student achievements and exam performance</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {['toppers', 'results', 'achievers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeSubTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab === 'toppers' ? 'Toppers List' : tab === 'results' ? 'Exam Results' : 'Achievers Gallery'}
          </button>
        ))}
      </div>

      {/* TOPPERS TAB CONTENT */}
      {activeSubTab === 'toppers' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Highlight top-ranking students</p>
            <button
              onClick={() => {
                setShowTopperForm(true);
                setEditingTopper(null);
                setTopperForm({ studentName: '', rank: '', examName: '', year: 2025, imageUrl: '', isPublished: true });
                setPickerTarget('topper');
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Topper
            </button>
          </div>

          {showTopperForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">{editingTopper ? 'Edit Topper' : 'Add New Topper'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Student Name" value={topperForm.studentName} onChange={(e) => setTopperForm({...topperForm, studentName: e.target.value})} className="px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="Rank (e.g. AIR 15)" value={topperForm.rank} onChange={(e) => setTopperForm({...topperForm, rank: e.target.value})} className="px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="Exam Name" value={topperForm.examName} onChange={(e) => setTopperForm({...topperForm, examName: e.target.value})} className="px-3 py-2 border rounded-lg" />
                <input type="number" placeholder="Year" value={topperForm.year} onChange={(e) => setTopperForm({...topperForm, year: e.target.value})} className="px-3 py-2 border rounded-lg" />
                
                <div className="md:col-span-2">
                  <div className="flex gap-2">
                    <input type="text" readOnly value={topperForm.imageUrl} className="flex-1 px-3 py-2 border rounded-lg bg-gray-50" placeholder="Image URL..." />
                    <button onClick={() => { setPickerTarget('topper'); setShowImagePicker(true); }} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-100 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Select
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={handleSaveTopper} disabled={submitLoading} className="bg-blue-600 text-white px-6 py-2 rounded-lg">{submitLoading ? 'Saving...' : 'Save Topper'}</button>
                <button onClick={() => setShowTopperForm(false)} className="bg-gray-200 px-6 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-10"><Loader className="w-8 h-8 animate-spin text-blue-600" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toppers.map((topper) => (
                <div key={topper.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex gap-4">
                  <img src={topper.imageUrl || 'https://via.placeholder.com/150'} className="w-20 h-20 rounded-full object-cover border" alt="Topper"/>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold">{topper.studentName}</h4>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingTopper(topper); setTopperForm(topper); setShowTopperForm(true); setPickerTarget('topper'); }} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
                        <button onClick={() => handleDeleteTopper(topper.id)} className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{topper.examName} • {topper.year}</p>
                    <span className="flex items-center gap-1 text-yellow-600 font-bold"><Medal size={14}/> {topper.rank}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ACHIEVERS GALLERY CONTENT */}
      {activeSubTab === 'achievers' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage student success gallery</p>
            <button
              onClick={() => {
                setShowAchieverForm(true);
                setEditingAchiever(null);
                setAchieverForm({ description: '', imageUrl: '', mobileImageUrl: '' });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Gallery Image
            </button>
          </div>

          {showAchieverForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <input 
                type="text" 
                placeholder="Caption / Title" 
                value={achieverForm.description} 
                onChange={(e) => setAchieverForm({...achieverForm, description: e.target.value})} 
                className="w-full px-3 py-2 border rounded-lg mb-4" 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Desktop Image */}
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-blue-600" /> Desktop Image *
                   </label>
                   <div className="flex gap-2">
                        <input type="text" readOnly value={achieverForm.imageUrl} className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm" placeholder="Desktop URL..." />
                        <button onClick={() => { setPickerTarget('achiever-desktop'); setShowImagePicker(true); }} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg border border-blue-100 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Select
                        </button>
                   </div>
                </div>

                {/* Mobile Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-purple-600" /> Mobile Image (Optional)
                   </label>
                   <div className="flex gap-2">
                        <input type="text" readOnly value={achieverForm.mobileImageUrl} className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm" placeholder="Mobile URL..." />
                        <button onClick={() => { setPickerTarget('achiever-mobile'); setShowImagePicker(true); }} className="bg-purple-50 text-purple-600 px-3 py-2 rounded-lg border border-purple-100 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Select
                        </button>
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleSaveAchiever} disabled={submitLoading} className="bg-blue-600 text-white px-6 py-2 rounded-lg">{submitLoading ? 'Saving...' : 'Save Image'}</button>
                <button onClick={() => setShowAchieverForm(false)} className="bg-gray-200 px-6 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          {loading ? (
             <div className="flex justify-center py-10"><Loader className="w-8 h-8 animate-spin text-blue-600" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievers.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group relative">
                   {/* Thumbnail Preview: Shows Desktop by default, Mobile indicator if present */}
                   <div className="relative aspect-video">
                        <img src={item.imageUrl} className="w-full h-full object-cover" alt="Gallery Item"/>
                        {item.mobileImageUrl && (
                            <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full shadow-md" title="Has Mobile Image">
                                <Smartphone size={12} />
                            </div>
                        )}
                   </div>
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => { setEditingAchiever(item); setAchieverForm({
                        description: item.description || '',
                        imageUrl: item.imageUrl || '',
                        mobileImageUrl: item.mobileImageUrl || ''
                    }); setShowAchieverForm(true); }} className="p-2 bg-white text-blue-600 rounded-full"><Edit2 size={16}/></button>
                    <button onClick={() => handleDeleteAchiever(item.id)} className="p-2 bg-white text-red-600 rounded-full"><Trash2 size={16}/></button>
                  </div>
                  <div className="p-2 text-sm text-gray-700 truncate">{item.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'results' && <div className="text-center py-10 text-gray-500">Coming soon...</div>}
    </div>
  );
}