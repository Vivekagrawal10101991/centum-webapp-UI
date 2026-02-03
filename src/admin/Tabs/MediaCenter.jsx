import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Image as ImageIcon, Loader2, Video, ExternalLink, PlayCircle } from 'lucide-react';
import { getAllBlogs, addBlog, updateBlog, deleteBlog } from '../services/blogService';
import { cmsService } from '../services/cmsService';
import ConfirmModal from '../../components/common/ConfirmModal';
import { hasPermission } from '../helpers/authHelper';
import { PERMISSIONS } from '../helpers/rolePermissions';
import ImagePicker from '../components/ImagePicker';
import { toast } from 'react-hot-toast';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function MediaCenter() {
  const [activeSubTab, setActiveSubTab] = useState('blogs');
  
  // Forms Visibility
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showContributorForm, setShowContributorForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  
  // Image Picker State
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imagePickerMode, setImagePickerMode] = useState('gallery'); // 'gallery' | 'select'

  // Editing States
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingContributor, setEditingContributor] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ isOpen: false, itemId: null, type: null });

  // Data States
  const [blogs, setBlogs] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [videos, setVideos] = useState([]);

  // --- FORMS ---
  const [blogForm, setBlogForm] = useState({
    title: '', content: '', author: '', imageUrl: '', category: '', published: true,
  });

  const [contributorForm, setContributorForm] = useState({
    title: '', description: '', imageUrl: ''
  });

  const [videoForm, setVideoForm] = useState({
    title: '', description: '', videoUrl: '', visibility: 'PUBLIC'
  });

  // --- EDITOR CONFIGURATION ---
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block', 'color', 'background', 'link'
  ];

  // --- HELPERS ---
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // --- FETCHING DATA ---
  useEffect(() => {
    if (activeSubTab === 'blogs') fetchBlogs();
    if (activeSubTab === 'team') fetchContributors();
    if (activeSubTab === 'videos') fetchVideos();
  }, [activeSubTab]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchContributors = async () => {
    setLoading(true);
    try {
      const data = await cmsService.getContributors();
      setContributors(data || []);
    } catch (err) {
      toast.error('Failed to load contributions');
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await cmsService.getAllVideos();
      setVideos(data || []);
    } catch (err) {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  // 1. Blog Handlers
  const handleAddBlog = async () => {
    setLoading(true);
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, blogForm);
        toast.success('Blog updated successfully');
      } else {
        await addBlog(blogForm);
        toast.success('Blog created successfully');
      }
      await fetchBlogs();
      setBlogForm({ title: '', content: '', author: '', imageUrl: '', category: '', published: true });
      setShowBlogForm(false);
      setEditingBlog(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  // 2. Contributor Handlers
  const handleAddContributor = async () => {
    if (!contributorForm.title || !contributorForm.description) {
      toast.error('Title and Description are required');
      return;
    }

    setLoading(true);
    try {
      if (editingContributor) {
        await cmsService.updateContributor(editingContributor.id, contributorForm);
        toast.success('Contribution updated successfully');
      } else {
        await cmsService.addContributor(contributorForm);
        toast.success('Contribution added successfully');
      }
      await fetchContributors();
      setContributorForm({ title: '', description: '', imageUrl: '' });
      setShowContributorForm(false);
      setEditingContributor(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save contribution');
    } finally {
      setLoading(false);
    }
  };

  // 3. Video Handlers
  const handleAddVideo = async () => {
    if (!videoForm.title || !videoForm.videoUrl) {
      toast.error('Title and Video URL are required');
      return;
    }

    setLoading(true);
    try {
      if (editingVideo) {
        await cmsService.updateVideo(editingVideo.id, videoForm);
        toast.success('Video updated successfully');
      } else {
        await cmsService.addVideo(videoForm);
        toast.success('Video added successfully');
      }
      await fetchVideos();
      setVideoForm({ title: '', description: '', videoUrl: '', visibility: 'PUBLIC' });
      setShowVideoForm(false);
      setEditingVideo(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE LOGIC ---
  const openDeleteModal = (id, type) => {
    setDeleteConfirmModal({ isOpen: true, itemId: id, type });
  };

  const closeDeleteModal = () => {
    setDeleteConfirmModal({ isOpen: false, itemId: null, type: null });
  };

  const handleDelete = async () => {
    const { itemId, type } = deleteConfirmModal;
    if (!itemId) return;
    
    setLoading(true);
    try {
      if (type === 'blog') {
        await deleteBlog(itemId);
        await fetchBlogs();
        toast.success('Blog deleted');
      } else if (type === 'contributor') {
        await cmsService.deleteContributor(itemId);
        await fetchContributors();
        toast.success('Contribution removed');
      } else if (type === 'video') {
        await cmsService.deleteVideo(itemId);
        await fetchVideos();
        toast.success('Video deleted');
      }
    } catch (err) {
      setError(err.message);
      toast.error('Delete failed');
    } finally {
      setLoading(false);
    }
    closeDeleteModal();
  };

  const getDeleteModalContent = () => {
    const { type } = deleteConfirmModal;
    switch (type) {
      case 'blog': return { title: 'Delete Blog Post', message: 'Are you sure you want to delete this blog post?' };
      case 'contributor': return { title: 'Delete Contribution', message: 'Are you sure you want to remove this contribution?' };
      case 'video': return { title: 'Delete Video', message: 'Are you sure you want to remove this video from the library?' };
      default: return { title: 'Confirm Delete', message: 'Are you sure you want to delete this item?' };
    }
  };

  const modalContent = getDeleteModalContent();

  return (
    <div className="w-full max-w-full overflow-hidden">
      <ConfirmModal
        isOpen={deleteConfirmModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title={modalContent.title}
        message={modalContent.message}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <ImagePicker 
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        title={imagePickerMode === 'gallery' ? "Media Gallery" : "Select Image"}
        onSelect={imagePickerMode === 'select' ? (url) => {
          if (showBlogForm) {
             setBlogForm({ ...blogForm, imageUrl: url });
          } else if (showContributorForm) {
             setContributorForm({ ...contributorForm, imageUrl: url });
          }
        } : undefined}
      />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Media Center</h2>
        <p className="text-gray-600 mt-1">Manage blogs, videos, and team contributions</p>
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto pb-1 mb-6 border-b border-gray-200">
        <div className="flex gap-4 min-w-max">
          <button
            onClick={() => setActiveSubTab('blogs')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSubTab === 'blogs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveSubTab('videos')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSubTab === 'videos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            YouTube Videos
          </button>
          <button
            onClick={() => { setActiveSubTab('gallery'); setImagePickerMode('gallery'); setShowImagePicker(true); }}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSubTab === 'gallery' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Gallery (Uploads)
          </button>
          <button
            onClick={() => setActiveSubTab('team')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSubTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Contributions
          </button>
        </div>
      </div>

      {/* 1. GALLERY TAB */}
      {activeSubTab === 'gallery' && (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
           <div className="bg-white p-4 rounded-full shadow-sm mb-4">
             <ImageIcon className="w-10 h-10 text-blue-600" />
           </div>
           <h3 className="text-xl font-bold text-gray-800 mb-2">Media Gallery</h3>
           <p className="text-gray-500 mb-6 text-center max-w-md">
             View, upload and manage all your images here.
           </p>
           <button 
             onClick={() => { setImagePickerMode('gallery'); setShowImagePicker(true); }}
             className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow-lg font-medium flex items-center gap-2"
           >
             <ImageIcon className="w-5 h-5" /> Open Full Gallery
           </button>
        </div>
      )}

      {/* 2. BLOGS TAB */}
      {activeSubTab === 'blogs' && (
        <div className="w-full">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Educational blog posts and articles</p>
            {hasPermission(PERMISSIONS.ADD_BLOG) && (
              <button
                onClick={() => {
                  setShowBlogForm(true);
                  setEditingBlog(null);
                  setBlogForm({ title: '', content: '', author: '', imageUrl: '', category: '', published: true });
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                <Plus className="w-4 h-4" /> Add Blog
              </button>
            )}
          </div>

          {/* Blog Form */}
          {showBlogForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 w-full max-w-full">
              <h3 className="font-semibold text-gray-800 mb-4">{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Top 10 Study Tips"
                  />
                </div>
                <div className="md:col-span-2 w-full max-w-full overflow-hidden">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Content *</label>
                  <div className="bg-white w-full">
                    <ReactQuill
                      theme="snow"
                      value={blogForm.content}
                      onChange={(content) => setBlogForm({ ...blogForm, content })}
                      modules={quillModules}
                      formats={quillFormats}
                      className="h-64 mb-12 w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={blogForm.imageUrl}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Select image..."
                    />
                    <button
                      onClick={() => { setImagePickerMode('select'); setShowImagePicker(true); }}
                      className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg border border-blue-100 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" /> Select
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                   <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                    <span className="text-sm text-gray-700">Published</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddBlog}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : (editingBlog ? 'Update Blog' : 'Add Blog')}
                </button>
                <button onClick={() => setShowBlogForm(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          {/* Blogs Grid */}
          <div className="space-y-4 w-full">
            {blogs.length === 0 && !loading && <div className="text-center py-10 text-gray-500">No blogs found.</div>}
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
                <div className="flex gap-4 w-full">
                  {blog.imageUrl && <img src={blog.imageUrl} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" alt="Blog" />}
                  <div className="flex-1 w-0">
                    <div className="flex justify-between">
                        <h4 className="font-semibold text-gray-800 truncate">{blog.title}</h4>
                        <div className="flex gap-2">
                          {hasPermission(PERMISSIONS.EDIT_BLOG) && (
                            <button onClick={() => { setEditingBlog(blog); setBlogForm(blog); setShowBlogForm(true); }} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                          )}
                          {hasPermission(PERMISSIONS.DELETE_BLOG) && (
                            <button onClick={() => openDeleteModal(blog.id, 'blog')} className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{stripHtml(blog.content)}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                      <span>By {blog.author}</span>
                      {blog.category && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{blog.category}</span>}
                      {blog.published ? <span className="text-green-600">Published</span> : <span className="text-gray-400">Draft</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. YOUTUBE VIDEOS TAB (NEW) */}
      {activeSubTab === 'videos' && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage video library for courses and resources</p>
            {hasPermission(PERMISSIONS.ADD_VIDEO) && (
              <button
                onClick={() => {
                  setShowVideoForm(true);
                  setEditingVideo(null);
                  setVideoForm({ title: '', description: '', videoUrl: '', visibility: 'PUBLIC' });
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Video
              </button>
            )}
          </div>

          {/* Video Form */}
          {showVideoForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 w-full max-w-full animate-in fade-in slide-in-from-top-4">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingVideo ? 'Edit Video' : 'Add New Video'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                    <input
                      type="text"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Intro to Calculus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={videoForm.videoUrl}
                      onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                    <select
                      value={videoForm.visibility}
                      onChange={(e) => setVideoForm({ ...videoForm, visibility: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PUBLIC">Public</option>
                      <option value="PRIVATE">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Brief description..."
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center">
                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Preview</span>
                   {getYoutubeId(videoForm.videoUrl) ? (
                     <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md relative group">
                        <img 
                          src={`https://img.youtube.com/vi/${getYoutubeId(videoForm.videoUrl)}/mqdefault.jpg`} 
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                           <PlayCircle className="w-12 h-12 text-white opacity-80" />
                        </div>
                     </div>
                   ) : (
                     <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                        <Video className="w-12 h-12 opacity-20" />
                     </div>
                   )}
                   <p className="mt-3 font-medium text-gray-700 text-center w-full truncate px-4">
                     {videoForm.title || "Video Title"}
                   </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handleAddVideo}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : (editingVideo ? 'Update Video' : 'Add Video')}
                </button>
                <button
                  onClick={() => setShowVideoForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.length === 0 && !loading && (
               <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                 <Video className="w-12 h-12 mx-auto mb-3 opacity-20"/>
                 <p>No videos found. Add your first YouTube video!</p>
               </div>
            )}

            {videos.map((video) => {
              const videoId = getYoutubeId(video.videoUrl);
              return (
                <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
                  <div className="relative h-48 bg-gray-100">
                    {videoId ? (
                       <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                       />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-400">
                         <Video className="w-10 h-10" />
                       </div>
                    )}
                    <a 
                       href={video.videoUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
                       title="Open on YouTube"
                    >
                       <ExternalLink className="w-4 h-4" />
                    </a>
                    {video.visibility === 'PRIVATE' && (
                       <span className="absolute top-2 left-2 px-2 py-0.5 bg-gray-800 text-white text-xs rounded">Private</span>
                    )}
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1" title={video.title}>{video.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{video.description}</p>
                    
                    <div className="flex gap-2 border-t pt-3">
                      {hasPermission(PERMISSIONS.EDIT_VIDEO) && (
                        <button
                          onClick={() => {
                            setEditingVideo(video);
                            setVideoForm({
                              title: video.title,
                              description: video.description,
                              videoUrl: video.videoUrl,
                              visibility: video.visibility || 'PUBLIC'
                            });
                            setShowVideoForm(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 font-medium text-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                      )}
                      {hasPermission(PERMISSIONS.DELETE_VIDEO) && (
                        <button
                          onClick={() => openDeleteModal(video.id, 'video')}
                          className="flex-1 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5 font-medium text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. CONTRIBUTIONS TAB */}
      {activeSubTab === 'team' && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Faculty and team member profiles</p>
            <button
              onClick={() => {
                setShowContributorForm(true);
                setEditingContributor(null);
                setContributorForm({ title: '', description: '', imageUrl: '' });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Contribution
            </button>
          </div>

          {/* Contributor Form */}
          {showContributorForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 w-full max-w-full">
              <h3 className="font-semibold text-gray-800 mb-4">{editingContributor ? 'Edit Contribution' : 'Add New Contribution'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input 
                    type="text" 
                    value={contributorForm.title} 
                    onChange={(e) => setContributorForm({ ...contributorForm, title: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g. Dr. Rajesh Sharma" 
                  />
                </div>
                
                {/* Image Picker Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={contributorForm.imageUrl} 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" 
                      placeholder="Select profile photo..." 
                    />
                    <button 
                      onClick={() => { setImagePickerMode('select'); setShowImagePicker(true); }} 
                      className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg border border-blue-100 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" /> Select
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 w-full max-w-full overflow-hidden">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div className="bg-white w-full">
                    <ReactQuill
                      theme="snow"
                      value={contributorForm.description}
                      onChange={(content) => setContributorForm({ ...contributorForm, description: content })}
                      modules={quillModules}
                      formats={quillFormats}
                      className="h-64 mb-12 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button 
                  onClick={handleAddContributor} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : (editingContributor ? 'Update Contribution' : 'Add Contribution')}
                </button>
                <button onClick={() => setShowContributorForm(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          {/* Contributors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contributors.length === 0 && !loading && (
               <div className="col-span-full text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-20"/>
                  <p>No contributions found.</p>
               </div>
            )}

            {contributors.map((contributor) => (
              <div key={contributor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-start gap-4">
                <img 
                  src={contributor.imageUrl || 'https://via.placeholder.com/150'} 
                  alt={contributor.title} 
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0 bg-gray-100" 
                />
                <div className="flex-1 w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-semibold text-gray-800 text-lg truncate">{contributor.title}</h4>
                      <p className="text-gray-600 text-sm line-clamp-3 mt-1">{stripHtml(contributor.description)}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 flex-col">
                      <button 
                        onClick={() => { 
                          setEditingContributor(contributor); 
                          setContributorForm({ 
                            title: contributor.title, 
                            description: contributor.description, 
                            imageUrl: contributor.imageUrl 
                          }); 
                          setShowContributorForm(true); 
                        }} 
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(contributor.id, 'contributor')} 
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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