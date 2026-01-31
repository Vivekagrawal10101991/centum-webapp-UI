import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Clock, Sparkles, ChevronRight, Bookmark, ArrowUpRight } from 'lucide-react';
import { getAllBlogs } from '../../../admin/services/blogService';

/**
 * Blog Detail Page
 * UPDATED: 
 * - Fixed Heading sizes (h1, h2, h3) appearing same as normal text.
 * - Added explicit styling for lists and spacing within blog content.
 */
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
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
    const fetchBlogData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllBlogs();
        const publishedBlogs = data.filter(b => b.published);
        
        const foundBlog = publishedBlogs.find(b => String(b.id) === String(id));
        
        if (foundBlog) {
          setBlog(foundBlog);
          const others = publishedBlogs.filter(b => String(b.id) !== String(id)).slice(0, 5);
          setRelatedBlogs(others);
        } else {
          setError('Story not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogData();
  }, [id]);

  // Helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    });
  };

  const estimateReadingTime = (content) => {
    if (!content) return 1;
    const textOnly = content.replace(/<[^>]*>/g, ''); 
    return Math.ceil(textOnly.split(/\s+/).length / 200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
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
      <nav className="fixed top-24 left-0 w-full z-40 px-4 md:px-8 pointer-events-none">
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
              style={{ transform: `translateY(${scrollProgress * 100}px)` }}
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

      {/* --- Main Content Container (Grid Layout) --- */}
      <div className="relative z-10 container mx-auto px-4 -mt-20 md:-mt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ================= LEFT COLUMN: MAIN CONTENT (Span 2) ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white p-6 md:p-12 animate-fade-in-up w-full overflow-hidden">
              
              {/* Header Metadata */}
              <div className="flex flex-col gap-6 mb-12">
                
                {/* Category Badge */}
                {blog.category && (
                  <div className="flex">
                    <span className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg bg-gradient-to-r ${getBadgeStyle(blog.category)}`}>
                      {blog.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight drop-shadow-sm">
                  {blog.title}
                </h1>

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
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
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm mb-12">
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
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12"></div>

              {/* Blog Body Content - FIXED */}
              <div 
                 className="
                  w-full max-w-none prose prose-lg md:prose-xl prose-slate mx-auto
                  
                  text-gray-600 leading-relaxed font-serif text-[1.15rem] md:text-[1.25rem] break-words
                  
                  prose-headings:font-bold prose-headings:text-gray-900 
                  prose-p:text-gray-600 prose-p:leading-relaxed 
                  prose-a:text-indigo-600 hover:prose-a:text-indigo-500 
                  prose-img:rounded-3xl prose-img:shadow-xl
                  
                  /* EXPLICIT HEADING & LIST OVERRIDES to fix size issues */
                  [&>h1]:text-3xl [&>h1]:md:text-4xl [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:font-black
                  [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:mb-4 [&>h2]:mt-6 [&>h2]:font-bold
                  [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:mb-3 [&>h3]:mt-5 [&>h3]:font-bold
                  [&>p]:mb-6
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
                  [&>li]:mb-2
                  [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:bg-gray-50 [&>blockquote]:p-4 [&>blockquote]:rounded-r-xl
                 "
                 dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Footer Share */}
              <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                 <span className="font-bold text-gray-900">Share this story</span>
                 <div className="flex gap-2">
                    <button onClick={handleShare} className="p-3 bg-gray-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                       <Share2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN: SIDEBAR (Span 1) ================= */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Sidebar Heading */}
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-xl font-bold text-gray-900">More to Read</h3>
                <button onClick={() => navigate('/blogs')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                  View All
                </button>
              </div>

              {/* Sidebar Cards List */}
              <div className="flex flex-col gap-4">
                {relatedBlogs.length === 0 ? (
                  <p className="text-gray-400 text-sm italic px-2">No other stories found.</p>
                ) : (
                  relatedBlogs.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/blogs/${item.id}`);
                      }}
                      className="group bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex gap-4 items-start"
                    >
                      {/* Sidebar Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                            <Sparkles className="w-5 h-5 text-indigo-200" />
                          </div>
                        )}
                      </div>

                      {/* Sidebar Text */}
                      <div className="flex-1 flex flex-col justify-between h-24 py-1">
                        <div className="space-y-1">
                          {item.category && (
                            <span className="text-[10px] font-bold uppercase text-indigo-500 tracking-wider">
                              {item.category}
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                             <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Newsletter / Promo Box (Optional) */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white text-center mt-8 shadow-xl">
                <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <h4 className="font-bold text-lg mb-2">Crack JEE/NEET with us!</h4>
                <p className="text-sm text-white/80 mb-4">Join Centum Academy for expert guidance and top results.</p>
                <button onClick={() => navigate('/contact')} className="w-full py-3 bg-white text-indigo-700 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                  Enquire Now
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