import { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Quote, Video } from 'lucide-react';

export default function SocialProof() {
  const [activeSubTab, setActiveSubTab] = useState('testimonials');
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

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

  const [stories, setStories] = useState([
    {
      id: 1,
      studentName: 'Karan Patel',
      title: 'Journey from 45% to AIR 156',
      story: 'I struggled initially but with consistent effort and guidance from teachers, I improved dramatically. The mock tests and doubt-clearing sessions were game-changers.',
      course: 'JEE Mains',
      beforeScore: '45%',
      afterScore: 'AIR 156',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
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

  const [testimonialForm, setTestimonialForm] = useState({
    studentName: '',
    course: '',
    rating: 5,
    review: '',
    photo: '',
    achievement: '',
    year: 2026,
  });

  const [storyForm, setStoryForm] = useState({
    studentName: '',
    title: '',
    story: '',
    course: '',
    beforeScore: '',
    afterScore: '',
    photo: '',
    videoUrl: '',
    year: 2026,
  });

  const [reviewForm, setReviewForm] = useState({
    reviewerName: '',
    platform: 'Google',
    rating: 5,
    review: '',
    date: '',
    verified: true,
  });

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

  const handleAddStory = () => {
    if (editingStory) {
      setStories(stories.map(s => s.id === editingStory.id ? { ...storyForm, id: editingStory.id } : s));
      setEditingStory(null);
    } else {
      setStories([...stories, { ...storyForm, id: Date.now() }]);
    }
    setStoryForm({ studentName: '', title: '', story: '', course: '', beforeScore: '', afterScore: '', photo: '', videoUrl: '', year: 2026 });
    setShowStoryForm(false);
  };

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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Social Proof</h2>
        <p className="text-gray-600 mt-1">Build trust with testimonials and success stories</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('testimonials')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'testimonials'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Student Testimonials
        </button>
        <button
          onClick={() => setActiveSubTab('stories')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'stories'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Success Stories
        </button>
        <button
          onClick={() => setActiveSubTab('reviews')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'reviews'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Google/Web Reviews
        </button>
      </div>

      {/* Testimonials Tab */}
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

          {/* Testimonials List */}
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
                      onClick={() => setTestimonials(testimonials.filter(t => t.id !== testimonial.id))}
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

      {/* Success Stories Tab */}
      {activeSubTab === 'stories' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Detailed student transformation stories</p>
            <button
              onClick={() => {
                setShowStoryForm(true);
                setEditingStory(null);
                setStoryForm({ studentName: '', title: '', story: '', course: '', beforeScore: '', afterScore: '', photo: '', videoUrl: '', year: 2026 });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Success Story
            </button>
          </div>

          {/* Story Form */}
          {showStoryForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingStory ? 'Edit Success Story' : 'Add New Success Story'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={storyForm.studentName}
                    onChange={(e) => setStoryForm({ ...storyForm, studentName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Karan Patel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                  <input
                    type="text"
                    value={storyForm.title}
                    onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Journey from 45% to AIR 156"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    value={storyForm.course}
                    onChange={(e) => setStoryForm({ ...storyForm, course: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Mains"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={storyForm.year}
                    onChange={(e) => setStoryForm({ ...storyForm, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Before Score</label>
                  <input
                    type="text"
                    value={storyForm.beforeScore}
                    onChange={(e) => setStoryForm({ ...storyForm, beforeScore: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="45%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">After Score</label>
                  <input
                    type="text"
                    value={storyForm.afterScore}
                    onChange={(e) => setStoryForm({ ...storyForm, afterScore: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AIR 156"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                  <input
                    type="text"
                    value={storyForm.photo}
                    onChange={(e) => setStoryForm({ ...storyForm, photo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (Optional)</label>
                  <input
                    type="text"
                    value={storyForm.videoUrl}
                    onChange={(e) => setStoryForm({ ...storyForm, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Story</label>
                  <textarea
                    value={storyForm.story}
                    onChange={(e) => setStoryForm({ ...storyForm, story: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="I struggled initially but with consistent effort and guidance..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddStory}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingStory ? 'Update Story' : 'Add Story'}
                </button>
                <button
                  onClick={() => {
                    setShowStoryForm(false);
                    setEditingStory(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Stories List */}
          <div className="space-y-6">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-6">
                  <img
                    src={story.photo}
                    alt={story.studentName}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{story.studentName}</h4>
                        <p className="text-blue-600 font-medium">{story.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">{story.course}</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {story.year}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingStory(story);
                            setStoryForm(story);
                            setShowStoryForm(true);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setStories(stories.filter(s => s.id !== story.id))}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-red-50 px-4 py-2 rounded">
                        <p className="text-xs text-gray-600">Before</p>
                        <p className="font-semibold text-red-600">{story.beforeScore}</p>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="bg-green-50 px-4 py-2 rounded">
                        <p className="text-xs text-gray-600">After</p>
                        <p className="font-semibold text-green-600">{story.afterScore}</p>
                      </div>
                      {story.videoUrl && (
                        <a
                          href={story.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                        >
                          <Video className="w-4 h-4" />
                          Watch Video
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm">{story.story}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Tab */}
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

          {/* Reviews List */}
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
