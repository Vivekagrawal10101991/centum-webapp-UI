import { useState } from 'react';
import { Plus, Edit2, Trash2, FileText, Video, Users, Eye } from 'lucide-react';

export default function MediaCenter() {
  const [activeSubTab, setActiveSubTab] = useState('blogs');
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showContributorForm, setShowContributorForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [editingContributor, setEditingContributor] = useState(null);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Top 10 Study Tips for JEE Preparation',
      excerpt: 'Learn the most effective strategies to crack JEE with flying colors',
      content: 'Detailed blog content here...',
      author: 'Dr. Sharma',
      category: 'Study Tips',
      publishDate: '2026-01-08',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
      views: 1247,
      published: true,
    },
    {
      id: 2,
      title: 'NEET Biology: High-Yield Topics',
      excerpt: 'Focus on these Biology topics for maximum NEET score',
      content: 'Detailed blog content here...',
      author: 'Prof. Patel',
      category: 'NEET',
      publishDate: '2026-01-05',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      views: 892,
      published: true,
    },
  ]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'JEE Physics Marathon - Complete Mechanics',
      description: '5-hour complete revision of JEE Mechanics',
      videoUrl: 'https://youtube.com/watch?v=example1',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      category: 'Physics',
      uploadDate: '2026-01-07',
      views: 3421,
    },
    {
      id: 2,
      title: 'NEET Chemistry: Organic Reactions',
      description: 'Complete guide to organic chemistry reactions for NEET',
      videoUrl: 'https://youtube.com/watch?v=example2',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      category: 'Chemistry',
      uploadDate: '2026-01-03',
      views: 2134,
    },
  ]);

  const [contributors, setContributors] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Sharma',
      role: 'Physics Faculty',
      bio: 'IIT Delhi alumnus with 15 years of teaching experience',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      qualifications: ['PhD in Physics', 'IIT Delhi'],
      experience: '15 years',
      email: 'rajesh@institute.com',
    },
    {
      id: 2,
      name: 'Prof. Anjali Patel',
      role: 'Chemistry Faculty',
      bio: 'Expert in Organic Chemistry with proven track record',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      qualifications: ['MSc Chemistry', 'IIT Bombay'],
      experience: '12 years',
      email: 'anjali@institute.com',
    },
  ]);

  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Study Tips',
    publishDate: '',
    thumbnail: '',
    views: 0,
    published: true,
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    category: 'Physics',
    uploadDate: '',
    views: 0,
  });

  const [contributorForm, setContributorForm] = useState({
    name: '',
    role: '',
    bio: '',
    photo: '',
    qualifications: [''],
    experience: '',
    email: '',
  });

  const handleAddBlog = () => {
    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...blogForm, id: editingBlog.id } : b));
      setEditingBlog(null);
    } else {
      setBlogs([...blogs, { ...blogForm, id: Date.now() }]);
    }
    setBlogForm({ title: '', excerpt: '', content: '', author: '', category: 'Study Tips', publishDate: '', thumbnail: '', views: 0, published: true });
    setShowBlogForm(false);
  };

  const handleAddVideo = () => {
    if (editingVideo) {
      setVideos(videos.map(v => v.id === editingVideo.id ? { ...videoForm, id: editingVideo.id } : v));
      setEditingVideo(null);
    } else {
      setVideos([...videos, { ...videoForm, id: Date.now() }]);
    }
    setVideoForm({ title: '', description: '', videoUrl: '', thumbnail: '', category: 'Physics', uploadDate: '', views: 0 });
    setShowVideoForm(false);
  };

  const handleAddContributor = () => {
    if (editingContributor) {
      setContributors(contributors.map(c => c.id === editingContributor.id ? { ...contributorForm, id: editingContributor.id } : c));
      setEditingContributor(null);
    } else {
      setContributors([...contributors, { ...contributorForm, id: Date.now() }]);
    }
    setContributorForm({ name: '', role: '', bio: '', photo: '', qualifications: [''], experience: '', email: '' });
    setShowContributorForm(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Media Center</h2>
        <p className="text-gray-600 mt-1">Manage content marketing and team information</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('blogs')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'blogs'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Blogs
        </button>
        <button
          onClick={() => setActiveSubTab('youtube')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'youtube'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          YouTube Videos
        </button>
        <button
          onClick={() => setActiveSubTab('team')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'team'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Contributors/Team
        </button>
      </div>

      {/* Blogs Tab */}
      {activeSubTab === 'blogs' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Educational blog posts and articles</p>
            <button
              onClick={() => {
                setShowBlogForm(true);
                setEditingBlog(null);
                setBlogForm({ title: '', excerpt: '', content: '', author: '', category: 'Study Tips', publishDate: '', thumbnail: '', views: 0, published: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Blog
            </button>
          </div>

          {/* Blog Form */}
          {showBlogForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Top 10 Study Tips for JEE Preparation"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt/Summary</label>
                  <textarea
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Brief summary of the blog post..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Content</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    placeholder="Full blog content goes here..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dr. Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Study Tips">Study Tips</option>
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="Motivation">Motivation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={blogForm.publishDate}
                    onChange={(e) => setBlogForm({ ...blogForm, publishDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                  <input
                    type="text"
                    value={blogForm.thumbnail}
                    onChange={(e) => setBlogForm({ ...blogForm, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={blogForm.published}
                      onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Published (visible to public)</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddBlog}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBlog ? 'Update Blog' : 'Add Blog'}
                </button>
                <button
                  onClick={() => {
                    setShowBlogForm(false);
                    setEditingBlog(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Blogs List */}
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex gap-4">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{blog.title}</h4>
                          {blog.published ? (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                              Published
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>By {blog.author}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {blog.category}
                          </span>
                          <span>{blog.publishDate}</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {blog.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingBlog(blog);
                            setBlogForm(blog);
                            setShowBlogForm(true);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setBlogs(blogs.filter(b => b.id !== blog.id))}
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

      {/* YouTube Videos Tab */}
      {activeSubTab === 'youtube' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Featured YouTube content and educational videos</p>
            <button
              onClick={() => {
                setShowVideoForm(true);
                setEditingVideo(null);
                setVideoForm({ title: '', description: '', videoUrl: '', thumbnail: '', category: 'Physics', uploadDate: '', views: 0 });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add YouTube Video
            </button>
          </div>

          {/* Video Form */}
          {showVideoForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingVideo ? 'Edit YouTube Video' : 'Add New YouTube Video'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Physics Marathon - Complete Mechanics"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="5-hour complete revision of JEE Mechanics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Date</label>
                  <input
                    type="date"
                    value={videoForm.uploadDate}
                    onChange={(e) => setVideoForm({ ...videoForm, uploadDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                      {video.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views}
                    </span>
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

      {/* Contributors/Team Tab */}
      {activeSubTab === 'team' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Faculty and team member profiles</p>
            <button
              onClick={() => {
                setShowContributorForm(true);
                setEditingContributor(null);
                setContributorForm({ name: '', role: '', bio: '', photo: '', qualifications: [''], experience: '', email: '' });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Team Member
            </button>
          </div>

          {/* Contributor Form */}
          {showContributorForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingContributor ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={contributorForm.name}
                    onChange={(e) => setContributorForm({ ...contributorForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dr. Rajesh Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role/Position</label>
                  <input
                    type="text"
                    value={contributorForm.role}
                    onChange={(e) => setContributorForm({ ...contributorForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Physics Faculty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input
                    type="text"
                    value={contributorForm.experience}
                    onChange={(e) => setContributorForm({ ...contributorForm, experience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="15 years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contributorForm.email}
                    onChange={(e) => setContributorForm({ ...contributorForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="rajesh@institute.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                  <input
                    type="text"
                    value={contributorForm.photo}
                    onChange={(e) => setContributorForm({ ...contributorForm, photo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={contributorForm.bio}
                    onChange={(e) => setContributorForm({ ...contributorForm, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="IIT Delhi alumnus with 15 years of teaching experience"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications (comma separated)</label>
                  <input
                    type="text"
                    value={contributorForm.qualifications.join(', ')}
                    onChange={(e) => setContributorForm({ ...contributorForm, qualifications: e.target.value.split(',').map(q => q.trim()) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="PhD in Physics, IIT Delhi"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddContributor}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingContributor ? 'Update Member' : 'Add Member'}
                </button>
                <button
                  onClick={() => {
                    setShowContributorForm(false);
                    setEditingContributor(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Contributors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contributors.map((contributor) => (
              <div key={contributor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={contributor.photo}
                    alt={contributor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{contributor.name}</h4>
                        <p className="text-blue-600 text-sm">{contributor.role}</p>
                        <p className="text-xs text-gray-500 mt-1">{contributor.experience} experience</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingContributor(contributor);
                            setContributorForm(contributor);
                            setShowContributorForm(true);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setContributors(contributors.filter(c => c.id !== contributor.id))}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mt-3 mb-3">{contributor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {contributor.qualifications.map((qual, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs">
                      {qual}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">{contributor.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
