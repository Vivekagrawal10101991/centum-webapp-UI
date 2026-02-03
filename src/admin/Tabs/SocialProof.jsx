import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star, Quote, Video, ExternalLink, PlayCircle, Loader2 } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { toast } from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';
import { hasPermission } from '../helpers/authHelper';
import { PERMISSIONS } from '../helpers/rolePermissions';

export default function SocialProof() {
  const [activeSubTab, setActiveSubTab] = useState('stories'); // Default to Success Stories
  
  // Forms Visibility
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);

  // Editing States
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editingStory, setEditingStory] = useState(null);

  const [loading, setLoading] = useState(false);
  
  // Data States
  const [stories, setStories] = useState([]); // Stores data from /api/tech/social/stories

  // Mock Data (Preserved from your upload)
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      studentName: 'Rohan Verma',
      course: 'JEE Advanced',
      rating: 5,
      review: 'The faculty and study material helped me secure AIR 142. Highly recommend!',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      achievement: 'AIR 142',
      year: 2025,
    },
    {
      id: 2,
      studentName: 'Ananya Singh',
      course: 'NEET',
      rating: 5,
      review: 'Best coaching institute! Got AIR 67 in NEET. Thank you to all teachers.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      achievement: 'AIR 67',
      year: 2025,
    },
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewerName: 'Rajesh Kumar (Parent)',
      platform: 'Google',
      rating: 5,
      review: 'Excellent coaching center. My son improved tremendously. Faculty is very supportive.',
      date: '2026-01-05',
      verified: true,
    },
    {
      id: 2,
      reviewerName: 'Meera Sharma',
      platform: 'Facebook',
      rating: 5,
      review: 'Best institute in the city for JEE preparation. Highly professional staff.',
      date: '2025-12-28',
      verified: true,
    },
  ]);

  // --- FORMS ---
  const [testimonialForm, setTestimonialForm] = useState({
    studentName: '', course: '', rating: 5, review: '', photo: '', achievement: '', year: 2026,
  });

  const [reviewForm, setReviewForm] = useState({
    reviewerName: '', platform: 'Google', rating: 5, review: '', date: '', verified: true,
  });

  const [storyForm, setStoryForm] = useState({
    title: '', description: '', videoUrl: '' 
  });

  // Delete Modal State
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ isOpen: false, itemId: null, type: null });

  // --- HELPERS ---
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // --- FETCHING DATA ---
  useEffect(() => {
    if (activeSubTab === 'stories') fetchStories();
  }, [activeSubTab]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      // Calls GET /api/tech/social/stories
      const data = await cmsService.getStories();
      setStories(data || []);
    } catch (err) {
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---
  
  // 1. Success Stories Handlers (Connected to Backend)
  const handleAddStory = async () => {
    if (!storyForm.title || !storyForm.videoUrl) {
      toast.error('Title and Video URL are required');
      return;
    }
    
    setLoading(true);
    try {
      if (editingStory) {
        // Calls PUT /api/tech/social/stories/{id}
        await cmsService.updateStory(editingStory.id, storyForm);
        toast.success('Story updated successfully');
      } else {
        // Calls POST /api/tech/social/stories
        await cmsService.createStory(storyForm);
        toast.success('Story added successfully');
      }
      await fetchStories();
      setStoryForm({ title: '', description: '', videoUrl: '' });
      setShowStoryForm(false);
      setEditingStory(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save story');
    } finally {
      setLoading(false);
    }
  };

  // 2. Testimonial Handlers (Mock)
  const handleAddTestimonial = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? { ...testimonialForm, id: editingTestimonial.id } : t));
      setEditingTestimonial(null);
    } else {
      setTestimonials([...testimonials, { ...testimonialForm, id: Date.now() }]);
    }
    setTestimonialForm({ studentName: '', course: '', rating: 5, review: '', photo: '', achievement: '', year: 2026 });
    setShowTestimonialForm(false);
  };

  // 3. Review Handlers (Mock)
  const handleAddReview = () => {
    if (editingReview) {
      setReviews(reviews.map(r => r.id === editingReview.id ? { ...reviewForm, id: editingReview.id } : r));
      setEditingReview(null);
    } else {
      setReviews([...reviews, { ...reviewForm, id: Date.now() }]);
    }
    setReviewForm({ reviewerName: '', platform: 'Google', rating: 5, review: '', date: '', verified: true });
    setShowReviewForm(false);
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
    
    if (type === 'story') {
       // Calls DELETE /api/tech/social/stories/{id}
       setLoading(true);
       try {
         await cmsService.deleteStory(itemId);
         await fetchStories();
         toast.success('Story deleted');
       } catch (err) {
         toast.error('Delete failed');
       } finally {
         setLoading(false);
       }
    } else if (type === 'testimonial') {
        setTestimonials(testimonials.filter(t => t.id !== itemId));
        toast.success('Testimonial removed');
    } else if (type === 'review') {
        setReviews(reviews.filter(r => r.id !== itemId));
        toast.success('Review removed');
    }
    closeDeleteModal();
  };

  return (
    <div className="w-full">
      <ConfirmModal
        isOpen={deleteConfirmModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Social Proof</h2>
        <p className="text-gray-600 mt-1">Manage success stories and student testimonials.</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSubTab('stories')}
          className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
            activeSubTab === 'stories'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Success Stories
        </button>
        <button
          onClick={() => setActiveSubTab('testimonials')}
          className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
            activeSubTab === 'testimonials'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Student Testimonials
        </button>
        <button
          onClick={() => setActiveSubTab('reviews')}
          className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
            activeSubTab === 'reviews'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Web Reviews
        </button>
      </div>

      {/* 1. SUCCESS STORIES TAB (Previously YouTube Videos) */}
      {activeSubTab === 'stories' && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Inspiring student success stories and video testimonials</p>
            {hasPermission(PERMISSIONS.ADD_VIDEO) && (
              <button
                onClick={() => {
                  setShowStoryForm(true);
                  setEditingStory(null);
                  setStoryForm({ title: '', description: '', videoUrl: '' });
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Success Story
              </button>
            )}
          </div>

          {/* Story Form */}
          {showStoryForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 w-full max-w-full animate-in fade-in slide-in-from-top-4">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingStory ? 'Edit Success Story' : 'Add New Success Story'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
                    <input
                      type="text"
                      value={storyForm.title}
                      onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="JEE Physics Marathon / AIR 1 Story"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube)</label>
                    <input
                      type="text"
                      value={storyForm.videoUrl}
                      onChange={(e) => setStoryForm({ ...storyForm, videoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={storyForm.description}
                      onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Brief description of the success story..."
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center">
                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Preview</span>
                   {getYoutubeId(storyForm.videoUrl) ? (
                     <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md relative group">
                        <img 
                          src={`https://img.youtube.com/vi/${getYoutubeId(storyForm.videoUrl)}/mqdefault.jpg`} 
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
                     {storyForm.title || "Story Title"}
                   </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handleAddStory}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : (editingStory ? 'Update Story' : 'Add Story')}
                </button>
                <button
                  onClick={() => setShowStoryForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.length === 0 && !loading && (
               <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                 <Video className="w-12 h-12 mx-auto mb-3 opacity-20"/>
                 <p>No success stories found. Add your first story!</p>
               </div>
            )}

            {stories.map((story) => {
              const videoId = getYoutubeId(story.videoUrl);
              return (
                <div key={story.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
                  <div className="relative h-48 bg-gray-100">
                    {videoId ? (
                       <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={story.title}
                        className="w-full h-full object-cover"
                       />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-400">
                         <Video className="w-10 h-10" />
                       </div>
                    )}
                    <a 
                       href={story.videoUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
                       title="Open on YouTube"
                    >
                       <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1" title={story.title}>{story.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{story.description}</p>
                    
                    <div className="flex gap-2 border-t pt-3">
                      {hasPermission(PERMISSIONS.EDIT_VIDEO) && (
                        <button
                          onClick={() => {
                            setEditingStory(story);
                            setStoryForm({
                              title: story.title,
                              description: story.description,
                              videoUrl: story.videoUrl
                            });
                            setShowStoryForm(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 font-medium text-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                      )}
                      {hasPermission(PERMISSIONS.DELETE_VIDEO) && (
                        <button
                          onClick={() => openDeleteModal(story.id, 'story')}
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

      {/* 2. Testimonials Tab */}
      {activeSubTab === 'testimonials' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Short student reviews and ratings</p>
            <button
              onClick={() => {
                setShowTestimonialForm(true);
                setEditingTestimonial(null);
                setTestimonialForm({ studentName: '', course: '', rating: 5, review: '', photo: '', achievement: '', year: 2026 });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
            </button>
          </div>

          {/* Testimonial Form */}
          {showTestimonialForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={testimonialForm.studentName}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, studentName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rohan Verma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    value={testimonialForm.course}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, course: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Advanced"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievement</label>
                  <input
                    type="text"
                    value={testimonialForm.achievement}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, achievement: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AIR 142"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={testimonialForm.year}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                  <input
                    type="text"
                    value={testimonialForm.photo}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, photo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                  <textarea
                    value={testimonialForm.review}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="The faculty and study material helped me secure AIR 142..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddTestimonial}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                <button
                  onClick={() => {
                    setShowTestimonialForm(false);
                    setEditingTestimonial(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4 mb-3">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.studentName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{testimonial.studentName}</h4>
                    <p className="text-sm text-gray-600">{testimonial.course}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {testimonial.achievement}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTestimonial(testimonial);
                        setTestimonialForm(testimonial);
                        setShowTestimonialForm(true);
                      }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(testimonial.id, 'testimonial')}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="w-6 h-6 text-blue-200 absolute -top-1 -left-1" />
                  <p className="text-gray-700 text-sm italic pl-5">{testimonial.review}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">Class of {testimonial.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Reviews Tab */}
      {activeSubTab === 'reviews' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Google, Facebook, and other platform reviews</p>
            <button
              onClick={() => {
                setShowReviewForm(true);
                setEditingReview(null);
                setReviewForm({ reviewerName: '', platform: 'Google', rating: 5, review: '', date: '', verified: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Name</label>
                  <input
                    type="text"
                    value={reviewForm.reviewerName}
                    onChange={(e) => setReviewForm({ ...reviewForm, reviewerName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rajesh Kumar (Parent)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <select
                    value={reviewForm.platform}
                    onChange={(e) => setReviewForm({ ...reviewForm, platform: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Trustpilot">Trustpilot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={reviewForm.date}
                    onChange={(e) => setReviewForm({ ...reviewForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                  <textarea
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Excellent coaching center..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={reviewForm.verified}
                      onChange={(e) => setReviewForm({ ...reviewForm, verified: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Verified Review</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddReview}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingReview ? 'Update Review' : 'Add Review'}
                </button>
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setEditingReview(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm px-2 py-1 rounded ${
                        review.platform === 'Google' ? 'bg-blue-100 text-blue-700' :
                        review.platform === 'Facebook' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {review.platform}
                      </span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingReview(review);
                        setReviewForm(review);
                        setShowReviewForm(true);
                      }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setReviews(reviews.filter(r => r.id !== review.id))}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}