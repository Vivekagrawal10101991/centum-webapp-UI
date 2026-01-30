import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Clock, Sparkles, ChevronRight, Bookmark } from 'lucide-react';
import { getAllBlogs } from '../../../admin/services/blogService';

/**
 * Blog Detail Page - "Ultra Premium Design"
 * Features:
 * - Reading Progress Bar
 * - Parallax Hero Image
 * - Deep Glassmorphism
 * - Magazine-style Typography
 * - Interactive Floating Actions
 */
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllBlogs();
        // Loose comparison for ID to handle string/number mismatch
        const foundBlog = data.find(b => String(b.id) === String(id));
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError('Story not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  // Helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  const estimateReadingTime = (content) => {
    if (!content) return 1;
    return Math.ceil(content.split(/\s+/).length / 200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Could show a toast here
      alert('Link copied!'); 
    }
  };

  const getBadgeStyle = (category) => {
    const styles = {
      'Academic': 'from-blue-500 to-cyan-400 text-white shadow-blue-200',
      'Tips': 'from-emerald-500 to-teal-400 text-white shadow-emerald-200',
      'News': 'from-purple-500 to-indigo-400 text-white shadow-purple-200',
      'Exam': 'from-rose-500 to-pink-400 text-white shadow-rose-200',
      'default': 'from-gray-800 to-gray-700 text-white shadow-gray-200'
    };
    return styles[category] || styles['default'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-md w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Story Unavailable</h3>
          <p className="text-gray-500 mb-8">We couldn't find the blog post you're looking for.</p>
          <button
            onClick={() => navigate('/blogs')}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-transform active:scale-95"
          >
            Return to Blog Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdff] font-sans relative">
      
      {/* --- Reading Progress Bar --- */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[60] bg-gray-100">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* --- Floating Navigation --- */}
      <nav className="fixed top-6 left-0 w-full z-50 px-4 md:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/blogs')}
            className="pointer-events-auto w-12 h-12 bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 border border-white rounded-full flex items-center justify-center text-gray-700 hover:scale-110 hover:bg-white hover:text-indigo-600 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-3 pointer-events-auto">
            <button className="w-12 h-12 bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 border border-white rounded-full flex items-center justify-center text-gray-700 hover:scale-110 hover:bg-white hover:text-rose-500 transition-all duration-300">
               <Bookmark className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="w-12 h-12 bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 border border-white rounded-full flex items-center justify-center text-gray-700 hover:scale-110 hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Parallax Hero Section --- */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover opacity-90"
              style={{ transform: `translateY(${scrollProgress * 100}px)` }} // Subtle parallax
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center">
               <Sparkles className="w-32 h-32 text-white/20" />
            </div>
          )}
          {/* Cinema Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#fcfdff]" />
        </div>
      </div>

      {/* --- Main Content Container --- */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 -mt-40 md:-mt-56 pb-20">
        
        {/* --- Glass Card --- */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white p-6 md:p-12 lg:p-16 animate-fade-in-up">
          
          {/* Header Metadata */}
          <div className="flex flex-col gap-6 mb-12 text-center">
            
            {/* Category Badge */}
            {blog.category && (
              <div className="flex justify-center">
                <span className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg bg-gradient-to-r ${getBadgeStyle(blog.category)}`}>
                  {blog.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight drop-shadow-sm">
              {blog.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-500">
               <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100/50 rounded-full border border-gray-100">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  {formatDate(blog.createdAt)}
               </div>
               <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100/50 rounded-full border border-gray-100">
                  <Clock className="w-4 h-4 text-rose-500" />
                  {estimateReadingTime(blog.content)} min read
               </div>
            </div>
          </div>

          {/* Author Floating Card */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm mb-12 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
              {blog.author ? blog.author.charAt(0) : 'C'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Written by {blog.author || 'Centum Team'}</p>
              <p className="text-xs text-gray-500">Educational Content Creator</p>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Follow
            </button>
          </div>

          {/* Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-12 opacity-50"></div>

          {/* Blog Body Content */}
          <article className="prose prose-lg md:prose-xl prose-slate mx-auto prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-3xl prose-img:shadow-xl">
             <div className="text-gray-600 leading-relaxed font-serif text-[1.15rem] md:text-[1.25rem] whitespace-pre-line">
                {blog.content}
             </div>
          </article>

          {/* Footer Actions */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                 <h4 className="text-lg font-bold text-gray-900">Enjoyed this article?</h4>
                 <p className="text-gray-500 text-sm">Share it with your friends and help them learn.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <button 
                   onClick={handleShare}
                   className="flex-1 md:flex-none px-8 py-4 bg-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                 >
                    <Share2 className="w-5 h-5" />
                    Share
                 </button>
                 <button 
                   onClick={() => navigate('/blogs')}
                   className="flex-1 md:flex-none px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                 >
                    Next Article
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Ambient Footer Glow */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none -z-10" />

    </div>
  );
};

export default BlogDetail;