import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Medal, Loader } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { toast } from 'react-hot-toast';

export default function AcademicsResults() {
  const [activeSubTab, setActiveSubTab] = useState('toppers');
  const [loading, setLoading] = useState(false);

  // --- Toppers State ---
  const [toppers, setToppers] = useState([]);
  const [showTopperForm, setShowTopperForm] = useState(false);
  const [editingTopper, setEditingTopper] = useState(null);

  // --- Other Tabs State (Mock for now) ---
  const [results, setResults] = useState([
    {
      id: 1,
      examName: 'JEE Main 2025',
      totalStudents: 240,
      qualified: 228,
      topRank: 156,
      year: 2025,
      highlights: '95% qualification rate, 15 students in top 1000',
    }
  ]);
  const [achievers, setAchievers] = useState([]);
  const [showResultForm, setShowResultForm] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [showAchieverForm, setShowAchieverForm] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState(null);

  // --- Fetch Data on Mount ---
  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getToppers();
      setToppers(data || []);
    } catch (error) {
      console.error('Failed to fetch toppers:', error);
      toast.error('Failed to load toppers');
    } finally {
      setLoading(false);
    }
  };

  // --- Topper Form State (Matches API JSON) ---
  const [topperForm, setTopperForm] = useState({
    studentName: '',
    rank: '',
    examName: '',
    year: new Date().getFullYear(),
    imageUrl: '',
    isPublished: true
  });

  const resetTopperForm = () => {
    setTopperForm({
      studentName: '',
      rank: '',
      examName: '',
      year: new Date().getFullYear(),
      imageUrl: '',
      isPublished: true
    });
  };

  // --- Handlers ---
  const handleSaveTopper = async () => {
    try {
      setLoading(true);
      if (editingTopper) {
        await cmsService.updateTopper(editingTopper.id, topperForm);
        toast.success('Topper updated successfully');
      } else {
        await cmsService.createTopper(topperForm);
        toast.success('Topper added successfully');
      }
      
      setEditingTopper(null);
      setShowTopperForm(false);
      resetTopperForm();
      fetchToppers();
    } catch (error) {
      console.error('Error saving topper:', error);
      toast.error('Failed to save topper');
    } finally {
      setLoading(false);
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
      console.error('Error deleting topper:', error);
      toast.error('Failed to delete topper');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Academics & Results</h2>
        <p className="text-gray-600 mt-1">Showcase student achievements and exam performance</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('toppers')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'toppers'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Toppers List
        </button>
        <button
          onClick={() => setActiveSubTab('results')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'results'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Exam Results
        </button>
        <button
          onClick={() => setActiveSubTab('achievers')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'achievers'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Achievers Gallery
        </button>
      </div>

      {/* Toppers Tab */}
      {activeSubTab === 'toppers' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Highlight top-ranking students</p>
            <button
              onClick={() => {
                setShowTopperForm(true);
                setEditingTopper(null);
                resetTopperForm();
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Topper
            </button>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* Topper Form */}
          {showTopperForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingTopper ? 'Edit Topper' : 'Add New Topper'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={topperForm.studentName}
                    onChange={(e) => setTopperForm({ ...topperForm, studentName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Vikram Rathore"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rank / Score (e.g. AIR 15)</label>
                  <input
                    type="text"
                    value={topperForm.rank}
                    onChange={(e) => setTopperForm({ ...topperForm, rank: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AIR 15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name</label>
                  <input
                    type="text"
                    value={topperForm.examName}
                    onChange={(e) => setTopperForm({ ...topperForm, examName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Advanced"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={topperForm.year}
                    onChange={(e) => setTopperForm({ ...topperForm, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2025"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={topperForm.imageUrl}
                    onChange={(e) => setTopperForm({ ...topperForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/topper.jpg"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={topperForm.isPublished}
                    onChange={(e) => setTopperForm({ ...topperForm, isPublished: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Publish to Website</label>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleSaveTopper}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingTopper ? 'Update Topper' : 'Add Topper')}
                </button>
                <button
                  onClick={() => {
                    setShowTopperForm(false);
                    setEditingTopper(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Toppers List (Fetched from DB) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!loading && toppers.length === 0 ? (
               <div className="col-span-2 text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                 No toppers found. Click "Add Topper" to create one.
               </div>
            ) : (
              toppers.map((topper) => (
                <div key={topper.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={topper.imageUrl || 'https://via.placeholder.com/150'}
                      alt={topper.studentName}
                      className="w-20 h-20 rounded-full object-cover border border-gray-100"
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{topper.studentName}</h4>
                          <p className="text-sm text-gray-600">{topper.examName}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-yellow-600 text-sm font-bold">
                              <Medal className="w-4 h-4" />
                              {topper.rank}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {topper.year}
                            </span>
                            {!topper.isPublished && (
                              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Draft</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingTopper(topper);
                              setTopperForm(topper);
                              setShowTopperForm(true);
                            }}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTopper(topper.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Results Tab (Preserved Mock UI for now) */}
      {activeSubTab === 'results' && (
        <div className="text-gray-500 text-center py-10">
           <p>Exam Results Management coming soon...</p>
        </div>
      )}

      {/* Achievers Tab (Preserved Mock UI for now) */}
      {activeSubTab === 'achievers' && (
         <div className="text-gray-500 text-center py-10">
           <p>Achievers Gallery coming soon...</p>
         </div>
      )}
    </div>
  );
}