import { useState } from 'react';
import { Plus, Edit2, Trash2, Medal, Award, Star } from 'lucide-react';

export default function AcademicsResults() {
  const [activeSubTab, setActiveSubTab] = useState('toppers');
  const [showTopperForm, setShowTopperForm] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);
  const [showAchieverForm, setShowAchieverForm] = useState(false);
  const [editingTopper, setEditingTopper] = useState(null);
  const [editingResult, setEditingResult] = useState(null);
  const [editingAchiever, setEditingAchiever] = useState(null);

  const [toppers, setToppers] = useState([
    {
      id: 1,
      name: 'Arjun Mehta',
      course: 'JEE Advanced',
      rank: 12,
      score: '326/360',
      year: 2025,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      achievement: 'AIR 12 in JEE Advanced',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      course: 'NEET',
      rank: 45,
      score: '715/720',
      year: 2025,
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      achievement: 'AIR 45 in NEET',
    },
  ]);

  const [results, setResults] = useState([
    {
      id: 1,
      examName: 'JEE Main 2025',
      totalStudents: 240,
      qualified: 228,
      topRank: 156,
      year: 2025,
      highlights: '95% qualification rate, 15 students in top 1000',
    },
    {
      id: 2,
      examName: 'NEET 2025',
      totalStudents: 180,
      qualified: 172,
      topRank: 45,
      year: 2025,
      highlights: '96% qualification rate, 12 students in top 500',
    },
  ]);

  const [achievers, setAchievers] = useState([
    {
      id: 1,
      name: 'Rahul Kumar',
      title: 'From 60% to AIR 234',
      description: 'Started with basics, improved consistently, achieved dream rank',
      course: 'JEE Mains',
      year: 2025,
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      achievements: ['AIR 234', 'School Topper', '99.8 Percentile'],
    },
  ]);

  const [topperForm, setTopperForm] = useState({
    name: '',
    course: '',
    rank: 0,
    score: '',
    year: 2026,
    photo: '',
    achievement: '',
  });

  const [resultForm, setResultForm] = useState({
    examName: '',
    totalStudents: 0,
    qualified: 0,
    topRank: 0,
    year: 2026,
    highlights: '',
  });

  const [achieverForm, setAchieverForm] = useState({
    name: '',
    title: '',
    description: '',
    course: '',
    year: 2026,
    photo: '',
    achievements: [''],
  });

  const handleAddTopper = () => {
    if (editingTopper) {
      setToppers(toppers.map(t => t.id === editingTopper.id ? { ...topperForm, id: editingTopper.id } : t));
      setEditingTopper(null);
    } else {
      setToppers([...toppers, { ...topperForm, id: Date.now() }]);
    }
    setTopperForm({ name: '', course: '', rank: 0, score: '', year: 2026, photo: '', achievement: '' });
    setShowTopperForm(false);
  };

  const handleAddResult = () => {
    if (editingResult) {
      setResults(results.map(r => r.id === editingResult.id ? { ...resultForm, id: editingResult.id } : r));
      setEditingResult(null);
    } else {
      setResults([...results, { ...resultForm, id: Date.now() }]);
    }
    setResultForm({ examName: '', totalStudents: 0, qualified: 0, topRank: 0, year: 2026, highlights: '' });
    setShowResultForm(false);
  };

  const handleAddAchiever = () => {
    if (editingAchiever) {
      setAchievers(achievers.map(a => a.id === editingAchiever.id ? { ...achieverForm, id: editingAchiever.id } : a));
      setEditingAchiever(null);
    } else {
      setAchievers([...achievers, { ...achieverForm, id: Date.now() }]);
    }
    setAchieverForm({ name: '', title: '', description: '', course: '', year: 2026, photo: '', achievements: [''] });
    setShowAchieverForm(false);
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
                setTopperForm({ name: '', course: '', rank: 0, score: '', year: 2026, photo: '', achievement: '' });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Topper
            </button>
          </div>

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
                    value={topperForm.name}
                    onChange={(e) => setTopperForm({ ...topperForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Arjun Mehta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course/Exam</label>
                  <input
                    type="text"
                    value={topperForm.course}
                    onChange={(e) => setTopperForm({ ...topperForm, course: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Advanced"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rank (AIR)</label>
                  <input
                    type="number"
                    value={topperForm.rank}
                    onChange={(e) => setTopperForm({ ...topperForm, rank: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
                  <input
                    type="text"
                    value={topperForm.score}
                    onChange={(e) => setTopperForm({ ...topperForm, score: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="326/360"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={topperForm.year}
                    onChange={(e) => setTopperForm({ ...topperForm, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                  <input
                    type="text"
                    value={topperForm.photo}
                    onChange={(e) => setTopperForm({ ...topperForm, photo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Description</label>
                  <input
                    type="text"
                    value={topperForm.achievement}
                    onChange={(e) => setTopperForm({ ...topperForm, achievement: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AIR 12 in JEE Advanced"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddTopper}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingTopper ? 'Update Topper' : 'Add Topper'}
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

          {/* Toppers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toppers.map((topper) => (
              <div key={topper.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={topper.photo}
                    alt={topper.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{topper.name}</h4>
                        <p className="text-sm text-gray-600">{topper.course}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-yellow-600 text-sm">
                            <Medal className="w-4 h-4" />
                            AIR {topper.rank}
                          </span>
                          <span className="text-sm text-gray-600">{topper.score}</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {topper.year}
                          </span>
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
                          onClick={() => setToppers(toppers.filter(t => t.id !== topper.id))}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeSubTab === 'results' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Display overall exam performance statistics</p>
            <button
              onClick={() => {
                setShowResultForm(true);
                setEditingResult(null);
                setResultForm({ examName: '', totalStudents: 0, qualified: 0, topRank: 0, year: 2026, highlights: '' });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Result
            </button>
          </div>

          {/* Result Form */}
          {showResultForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingResult ? 'Edit Result' : 'Add New Result'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name</label>
                  <input
                    type="text"
                    value={resultForm.examName}
                    onChange={(e) => setResultForm({ ...resultForm, examName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Main 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={resultForm.year}
                    onChange={(e) => setResultForm({ ...resultForm, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
                  <input
                    type="number"
                    value={resultForm.totalStudents}
                    onChange={(e) => setResultForm({ ...resultForm, totalStudents: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="240"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualified Students</label>
                  <input
                    type="number"
                    value={resultForm.qualified}
                    onChange={(e) => setResultForm({ ...resultForm, qualified: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="228"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Top Rank (AIR)</label>
                  <input
                    type="number"
                    value={resultForm.topRank}
                    onChange={(e) => setResultForm({ ...resultForm, topRank: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="156"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                  <textarea
                    value={resultForm.highlights}
                    onChange={(e) => setResultForm({ ...resultForm, highlights: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="95% qualification rate, 15 students in top 1000"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddResult}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingResult ? 'Update Result' : 'Add Result'}
                </button>
                <button
                  onClick={() => {
                    setShowResultForm(false);
                    setEditingResult(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{result.examName}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{result.year}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingResult(result);
                        setResultForm(result);
                        setShowResultForm(true);
                      }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setResults(results.filter(r => r.id !== result.id))}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{result.totalStudents}</p>
                    <p className="text-xs text-gray-600 mt-1">Total Students</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{result.qualified}</p>
                    <p className="text-xs text-gray-600 mt-1">Qualified</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {((result.qualified / result.totalStudents) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Success Rate</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{result.topRank}</p>
                    <p className="text-xs text-gray-600 mt-1">Top AIR</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4 italic">{result.highlights}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievers Tab */}
      {activeSubTab === 'achievers' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Success stories and detailed student journeys</p>
            <button
              onClick={() => {
                setShowAchieverForm(true);
                setEditingAchiever(null);
                setAchieverForm({ name: '', title: '', description: '', course: '', year: 2026, photo: '', achievements: [''] });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Achiever
            </button>
          </div>

          {/* Achiever Form */}
          {showAchieverForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingAchiever ? 'Edit Achiever Story' : 'Add New Achiever Story'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={achieverForm.name}
                    onChange={(e) => setAchieverForm({ ...achieverForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rahul Kumar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                  <input
                    type="text"
                    value={achieverForm.title}
                    onChange={(e) => setAchieverForm({ ...achieverForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From 60% to AIR 234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    value={achieverForm.course}
                    onChange={(e) => setAchieverForm({ ...achieverForm, course: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Mains"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={achieverForm.year}
                    onChange={(e) => setAchieverForm({ ...achieverForm, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2026"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                  <input
                    type="text"
                    value={achieverForm.photo}
                    onChange={(e) => setAchieverForm({ ...achieverForm, photo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={achieverForm.description}
                    onChange={(e) => setAchieverForm({ ...achieverForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Started with basics, improved consistently, achieved dream rank"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements (comma separated)</label>
                  <input
                    type="text"
                    value={achieverForm.achievements.join(', ')}
                    onChange={(e) => setAchieverForm({ ...achieverForm, achievements: e.target.value.split(',').map(a => a.trim()) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AIR 234, School Topper, 99.8 Percentile"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddAchiever}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingAchiever ? 'Update Story' : 'Add Story'}
                </button>
                <button
                  onClick={() => {
                    setShowAchieverForm(false);
                    setEditingAchiever(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Achievers List */}
          <div className="space-y-4">
            {achievers.map((achiever) => (
              <div key={achiever.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-6">
                  <img
                    src={achiever.photo}
                    alt={achiever.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{achiever.name}</h4>
                        <p className="text-blue-600 font-medium">{achiever.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">{achiever.course}</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {achiever.year}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingAchiever(achiever);
                            setAchieverForm(achiever);
                            setShowAchieverForm(true);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setAchievers(achievers.filter(a => a.id !== achiever.id))}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{achiever.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {achiever.achievements.map((achievement, index) => (
                        <span key={index} className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                          <Star className="w-3 h-3" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
