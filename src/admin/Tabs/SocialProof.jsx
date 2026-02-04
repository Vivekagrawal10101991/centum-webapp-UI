import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star, Quote, Video, ExternalLink, PlayCircle, Loader2, CheckCircle, XCircle } from 'lucide-react';
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
  const [stories, setStories] = useState([]); 
  const [testimonials, setTestimonials] = useState([]); // Dynamic data from backend

  // Mock Reviews (Preserved)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewerName: 'Rajesh Kumar (Parent)',
      platform: 'Google',
      rating: 5,
      review: 'Excellent coaching center. My son improved tremendously. Faculty is very supportive.',
      date: '2026-01-05',
      verified: true,
    }
  ]);

  // --- FORMS ---
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', message: '', rating: 5, published: true,
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
    if (activeSubTab === 'testimonials') fetchTestimonials();
  }, [activeSubTab]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const data = await cmsService.getStories();
      setStories(data || []);
    } catch (err) {
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await cmsService.getTestimonials();
      setTestimonials(data || []);
    } catch (err) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---
  
  // 1. Success Stories Handlers
  const handleAddStory = async () => {
    if (!storyForm.title || !storyForm.videoUrl) {
      toast.error('Title and Video URL are required');
      return;
    }
    
    setLoading(true);
    try {
      if (editingStory) {
        await cmsService.updateStory(editingStory.id, storyForm);
        toast.success('Story updated successfully');
      } else {
        await cmsService.createStory(storyForm);
        toast.success('Story added successfully');
      }
      await fetchStories();
      setStoryForm({ title: '', description: '', videoUrl: '' });
      setShowStoryForm(false);
      setEditingStory(null);
    } catch (err) {
      toast.error('Failed to save story');
    } finally {
      setLoading(false);
    }
  };

  // 2. Testimonial Handlers (Connected to Backend)
  const handleAddTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.message) {
      toast.error('Name and Message are required');
      return;
    }

    setLoading(true);
    try {
      if (editingTestimonial) {
        await cmsService.updateTestimonial(editingTestimonial.id, testimonialForm);
        toast.success('Testimonial updated successfully');
      } else {
        await cmsService.createTestimonial(testimonialForm);
        toast.success('Testimonial added successfully');
      }
      await fetchTestimonials();
      setTestimonialForm({ name: '', message: '', rating: 5, published: true });
      setShowTestimonialForm(false);
      setEditingTestimonial(null);
    } catch (err) {
      toast.error('Failed to save testimonial');
    } finally {
      setLoading(false);
    }
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
    
    setLoading(true);
    try {
      if (type === 'story') {
         await cmsService.deleteStory(itemId);
         await fetchStories();
         toast.success('Story deleted');
      } else if (type === 'testimonial') {
         await cmsService.deleteTestimonial(itemId);
         await fetchTestimonials();
         toast.success('Testimonial deleted');
      } else if (type === 'review') {
          setReviews(reviews.filter(r => r.id !== itemId));
          toast.success('Review removed');
      }
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setLoading(false);
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
          Testimonials
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

      {/* 1. SUCCESS STORIES TAB */}
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

          {showStoryForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 animate-in fade-in slide-in-from-top-4">
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
                      placeholder="e.g. JEE Advanced Topper Story"
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
                    />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center">
                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Preview</span>
                   {getYoutubeId(storyForm.videoUrl) ? (
                     <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={`https://img.youtube.com/vi/${getYoutubeId(storyForm.videoUrl)}/mqdefault.jpg`} 
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                     </div>
                   ) : (
                     <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                        <Video className="w-12 h-12 opacity-20" />
                     </div>
                   )}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handleAddStory}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={`https://img.youtube.com/vi/${getYoutubeId(story.videoUrl)}/hqdefault.jpg`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <a 
                    href={story.videoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 line-clamp-1">{story.title}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2 h-10">{story.description}</p>
                  <div className="flex gap-2 border-t mt-3 pt-3">
                    <button
                      onClick={() => {
                        setEditingStory(story);
                        setStoryForm(story);
                        setShowStoryForm(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-blue-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(story.id, 'story')}
                      className="flex-1 p-2 bg-red-50 text-red-600 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-red-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TESTIMONIALS TAB (CONNECTED TO BACKEND) */}
      {activeSubTab === 'testimonials' && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Student feedback and academic ratings</p>
            <button
              onClick={() => {
                setShowTestimonialForm(true);
                setEditingTestimonial(null);
                setTestimonialForm({ name: '', message: '', rating: 5, published: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>

          {/* Testimonial Form */}
          {showTestimonialForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 animate-in fade-in slide-in-from-top-4">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                    <select
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num}>{num} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        checked={testimonialForm.published}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, published: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Published and Visible</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={testimonialForm.message}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    placeholder="Enter the student testimonial content..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handleAddTestimonial}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                  {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                <button
                  onClick={() => { setShowTestimonialForm(false); setEditingTestimonial(null); }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Testimonial List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.length === 0 && !loading && (
              <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <Quote className="w-12 h-12 mx-auto mb-3 opacity-20"/>
                <p>No testimonials found. Add your first testimonial!</p>
              </div>
            )}

            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">{t.name}</h4>
                      {t.published ? (
                        <CheckCircle className="w-4 h-4 text-green-500" title="Published" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" title="Draft" />
                      )}
                    </div>
                    <div className="flex mt-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTestimonial(t);
                        setTestimonialForm({ name: t.name, message: t.message, rating: t.rating, published: t.published });
                        setShowTestimonialForm(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(t.id, 'testimonial')}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="relative pl-6 mt-2">
                  <Quote className="w-5 h-5 text-blue-100 absolute left-0 top-0" />
                  <p className="text-gray-700 text-sm italic line-clamp-4">{t.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. REVIEWS TAB (Preserved Mock) */}
      {activeSubTab === 'reviews' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Platform-specific reviews from Google and Facebook</p>
            <button
              onClick={() => {
                setShowReviewForm(true);
                setEditingReview(null);
                setReviewForm({ reviewerName: '', platform: 'Google', rating: 5, review: '', date: '', verified: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Review
            </button>
          </div>

          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">✓ Verified</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">{review.platform}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => openDeleteModal(review.id, 'review')} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{review.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}