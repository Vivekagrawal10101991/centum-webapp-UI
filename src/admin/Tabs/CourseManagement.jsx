import { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Video, Clock, Users } from 'lucide-react';

export default function CourseManagement() {
  const [activeSubTab, setActiveSubTab] = useState('courses');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'JEE Mains 2026',
      description: 'Comprehensive preparation for JEE Mains with expert faculty',
      duration: '12 Months',
      batchSize: 30,
      fee: 85000,
      features: ['Live Classes', 'Study Material', 'Mock Tests', 'Doubt Solving'],
      category: 'JEE',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
      active: true,
    },
    {
      id: 2,
      name: 'NEET 2026 Batch',
      description: 'Complete NEET preparation with Biology, Chemistry, and Physics',
      duration: '12 Months',
      batchSize: 25,
      fee: 80000,
      features: ['Live Classes', 'NCERT Focus', 'Daily Tests', 'Previous Year Papers'],
      category: 'NEET',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      active: true,
    },
  ]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Organic Chemistry - Introduction to Reactions',
      course: 'JEE Mains 2026',
      instructor: 'Dr. Sharma',
      duration: '45:30',
      videoUrl: 'https://youtube.com/watch?v=example1',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      views: 1247,
      topic: 'Chemistry',
    },
    {
      id: 2,
      title: 'Physics - Laws of Motion Part 1',
      course: 'JEE Mains 2026',
      instructor: 'Prof. Patel',
      duration: '52:15',
      videoUrl: 'https://youtube.com/watch?v=example2',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      views: 2134,
      topic: 'Physics',
    },
  ]);

  const [courseForm, setCourseForm] = useState({
    name: '',
    description: '',
    duration: '',
    batchSize: 30,
    fee: 0,
    features: [''],
    category: 'JEE',
    image: '',
    active: true,
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    course: '',
    instructor: '',
    duration: '',
    videoUrl: '',
    thumbnail: '',
    views: 0,
    topic: '',
  });

  const handleAddCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...courseForm, id: editingCourse.id } : c));
      setEditingCourse(null);
    } else {
      setCourses([...courses, { ...courseForm, id: Date.now() }]);
    }
    setCourseForm({ name: '', description: '', duration: '', batchSize: 30, fee: 0, features: [''], category: 'JEE', image: '', active: true });
    setShowCourseForm(false);
  };

  const handleAddVideo = () => {
    if (editingVideo) {
      setVideos(videos.map(v => v.id === editingVideo.id ? { ...videoForm, id: editingVideo.id } : v));
      setEditingVideo(null);
    } else {
      setVideos([...videos, { ...videoForm, id: Date.now() }]);
    }
    setVideoForm({ title: '', course: '', instructor: '', duration: '', videoUrl: '', thumbnail: '', views: 0, topic: '' });
    setShowVideoForm(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
        <p className="text-gray-600 mt-1">Manage course offerings and video lectures</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('courses')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'courses'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Course Details
        </button>
        <button
          onClick={() => setActiveSubTab('videos')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'videos'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Video Library
        </button>
      </div>

      {/* Courses Tab */}
      {activeSubTab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage JEE, NEET, and Foundation course details</p>
            <button
              onClick={() => {
                setShowCourseForm(true);
                setEditingCourse(null);
                setCourseForm({ name: '', description: '', duration: '', batchSize: 30, fee: 0, features: [''], category: 'JEE', image: '', active: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>

          {/* Course Form */}
          {showCourseForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                  <input
                    type="text"
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Mains 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Comprehensive preparation for JEE Mains with expert faculty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12 Months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
                  <input
                    type="number"
                    value={courseForm.batchSize}
                    onChange={(e) => setCourseForm({ ...courseForm, batchSize: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Fee (₹)</label>
                  <input
                    type="number"
                    value={courseForm.fee}
                    onChange={(e) => setCourseForm({ ...courseForm, fee: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="85000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Image URL</label>
                  <input
                    type="text"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/course.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
                  <input
                    type="text"
                    value={courseForm.features.join(', ')}
                    onChange={(e) => setCourseForm({ ...courseForm, features: e.target.value.split(',').map(f => f.trim()) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Live Classes, Study Material, Mock Tests"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddCourse}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
                <button
                  onClick={() => {
                    setShowCourseForm(false);
                    setEditingCourse(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded mb-2">
                        {course.category}
                      </span>
                      <h4 className="font-semibold text-gray-800 text-lg">{course.name}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCourse(course);
                          setCourseForm(course);
                          setShowCourseForm(true);
                        }}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCourses(courses.filter(c => c.id !== course.id))}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {course.batchSize} seats
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      ₹{course.fee.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Tab */}
      {activeSubTab === 'videos' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage video lecture library</p>
            <button
              onClick={() => {
                setShowVideoForm(true);
                setEditingVideo(null);
                setVideoForm({ title: '', course: '', instructor: '', duration: '', videoUrl: '', thumbnail: '', views: 0, topic: '' });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Video
            </button>
          </div>

          {/* Video Form */}
          {showVideoForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingVideo ? 'Edit Video' : 'Add New Video'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Organic Chemistry - Introduction to Reactions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    value={videoForm.course}
                    onChange={(e) => setVideoForm({ ...videoForm, course: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Mains 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                  <input
                    type="text"
                    value={videoForm.instructor}
                    onChange={(e) => setVideoForm({ ...videoForm, instructor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dr. Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Subject</label>
                  <input
                    type="text"
                    value={videoForm.topic}
                    onChange={(e) => setVideoForm({ ...videoForm, topic: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chemistry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="45:30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                  <input
                    type="text"
                    value={videoForm.videoUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                  <input
                    type="text"
                    value={videoForm.thumbnail}
                    onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddVideo}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </button>
                <button
                  onClick={() => {
                    setShowVideoForm(false);
                    setEditingVideo(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Videos List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-gray-600">{video.instructor}</p>
                    <p className="text-xs text-gray-500">{video.course}</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {video.topic}
                      </span>
                      <span className="text-xs text-gray-500">{video.views} views</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingVideo(video);
                        setVideoForm(video);
                        setShowVideoForm(true);
                      }}
                      className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span className="text-xs">Edit</span>
                    </button>
                    <button
                      onClick={() => setVideos(videos.filter(v => v.id !== video.id))}
                      className="flex-1 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span className="text-xs">Delete</span>
                    </button>
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
