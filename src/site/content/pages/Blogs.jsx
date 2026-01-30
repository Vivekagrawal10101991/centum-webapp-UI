import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, ArrowRight, Search } from 'lucide-react';
import { getAllBlogs } from '../../../admin/services/blogService';

/**
 * Blogs Page
 * UPDATED: 
 * - Removed Category Filter Bar
 * - Displays all published blogs directly
 */
const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBlogs();
      // Filter only published blogs
      const publishedBlogs = data.filter(blog => blog.published);
      setBlogs(publishedBlogs);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (!content) return '';
    return content.length <= maxLength ? content : content.substring(0, maxLength).trim() + '...';
  };

  // Helper for dynamic gradient badges
  const getBadgeColor = (category) => {
    const colors = {
      'Academic': 'bg-blue-100 text-blue-700',
      'Tips': 'bg-emerald-100 text-emerald-700',
      'News': 'bg-purple-100 text-purple-700',
      'Exam': 'bg-rose-100 text-rose-700',
      'default': 'bg-gray-200 text-gray-700'
    };
    return colors[category] || colors['default'];
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative font-sans pb-20">
      
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 overflow-hidden border-b border-primary-100 mb-12">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0056D2 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100">
            Knowledge Hub
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
            Our Blogs
          </h1>
          
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Discover expert study tips, exam strategies, and the latest educational updates curated just for you.
          </p>
          
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto opacity-90"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- Loading State --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Curating content...</p>
          </div>
        )}

        {/* --- Error State --- */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 rounded-2xl p-8 text-center border border-red-100">
            <p className="text-red-600 font-medium">Unable to load blogs at the moment.</p>
            <p className="text-sm text-red-400 mt-2">{error}</p>
          </div>
        )}

        {/* --- Empty State --- */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No blogs published yet</h3>
            <p className="text-gray-500">Check back soon for new updates.</p>
          </div>
        )}

        {/* --- Blog Grid --- */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="group bg-gradient-to-br from-white via-white to-indigo-50 rounded-[1.25rem] p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-white/50"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gray-100 mb-6 shadow-inner">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50/50">
                      <BookOpen className="w-12 h-12 text-indigo-200" />
                    </div>
                  )}
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                    {formatDate(blog.createdAt)}
                  </div>
                </div>

                {/* Content */}
                <div className="px-2 pb-4 flex-1 flex flex-col">
                  
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase ${getBadgeColor(blog.category)}`}>
                      {blog.category || 'General'}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                      <User className="w-3 h-3" />
                      <span>{blog.author || 'Centum Team'}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {truncateContent(blog.content)}
                  </p>

                  {/* Action Button */}
                  <button 
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                    className="w-full py-3.5 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm border border-gray-100 group-btn"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;