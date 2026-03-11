import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Clock, Sparkles, ArrowUpRight, User, BookOpen } from 'lucide-react';
import { getAllBlogs, getBlogBySlug } from '../../../admin/services/blogService';
import usePageTitle from '../../public/hooks/usePageTitle'; // <-- Imported Custom Hook

const BlogDetail = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- Dynamic SEO Meta Title ---
  const pageTitle = blog 
    ? `${blog.title} | Centum Academy Blog` 
    : 'Loading Article... | Centum Academy';
  usePageTitle(pageTitle);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlogData = async () => {
      setLoading(true);
      setError(null);
      try {
        const rawSlug = slug || id || '';
        const safeSlug = decodeURIComponent(rawSlug).trim().toLowerCase();
        
        let fetchedBlog = null;
        let allBlogs = [];
        
        // 1. Fetch master list directly from your Backend
        try {
          const data = await getAllBlogs();
          if (Array.isArray(data)) {
            allBlogs = data.map(b => ({
              ...b,
              id: b.id || b._id,
              slug: b.slug || b.id, 
              imageUrl: b.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
            }));
          }
        } catch (backendErr) {
          console.warn("Backend fetch failed for all blogs", backendErr);
        }

        // 2. Find the requested blog in the master list
        fetchedBlog = allBlogs.find(b => {
            const bSlug = b.slug ? String(b.slug).trim().toLowerCase() : '';
            const bId = b.id ? String(b.id).trim().toLowerCase() : '';
            return bSlug === safeSlug || bId === safeSlug;
        });

        // 3. If STILL not found, try the specific backend API as a last resort
        if (!fetchedBlog && rawSlug.trim() !== '') {
            try {
                fetchedBlog = await getBlogBySlug(rawSlug.trim());
                if (fetchedBlog && !fetchedBlog.imageUrl) {
                    fetchedBlog.imageUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070";
                }
            } catch (err) {
                console.warn("Backend threw an error for specific slug (likely string mismatch)", err);
            }
        }

        if (fetchedBlog) {
          setBlog(fetchedBlog);
          
          // 4. Setup Related Blogs (Only from Database)
          const others = allBlogs.filter(b => {
             const bSlug = b.slug ? String(b.slug).trim().toLowerCase() : '';
             const bId = b.id ? String(b.id).trim().toLowerCase() : '';
             return bSlug !== safeSlug && bId !== safeSlug;
          }).slice(0, 4);
          
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
  }, [slug, id]);

  // Helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
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
        title: blog?.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-900 font-medium animate-pulse">Loading Story...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm w-full border border-slate-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Story Unavailable</h3>
          <p className="text-slate-500 mb-6 text-sm">We couldn't find the blog post you're looking for.</p>
          <button
            onClick={() => navigate('/blogs')}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* --- Progress Bar --- */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* --- Floating Nav --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/blogs')}
            className="pointer-events-auto w-10 h-10 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleShare}
            className="pointer-events-auto px-4 py-2 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200 rounded-full flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <div className="relative w-full h-[60vh] overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollProgress * 50}px)` }} 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center">
               <Sparkles className="w-20 h-20 text-white/10" />
            </div>
          )}
          
          {/* THE NEW FILM OVERLAY */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full pb-24 px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
              <BookOpen className="w-3 h-3" />
              {blog.category || 'Article'}
            </div>
            
            {/* UPDATED TITLE: Premium typography (smaller, tighter tracking, slightly less heavy) */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6 drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {blog.title}
            </h1>

            {/* FROSTED WHITE METADATA PILL */}
            <div 
              className="inline-flex items-center justify-center gap-6 bg-white/90 backdrop-blur-md border border-white/50 shadow-lg text-slate-800 font-semibold text-sm md:text-base px-8 py-3 rounded-full animate-fade-in-up" 
              style={{ animationDelay: '0.2s' }}
            >
               <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  {blog.author || 'Centum Team'}
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
               <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  {formatDate(blog.createdAt)}
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
               <div className="hidden sm:flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  {estimateReadingTime(blog.content)} min read
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* CONTENT COLUMN */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Article Body */}
            <article 
               className="
                prose prose-slate max-w-none w-full break-words overflow-hidden
                prose-lg md:prose-xl 
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-headings:break-words
                prose-p:text-slate-600 prose-p:leading-8 prose-p:font-serif prose-p:text-[1.125rem] prose-p:break-words
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700 hover:prose-a:underline prose-a:break-all
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-img:max-w-full prose-img:h-auto
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-indigo-900
                prose-li:text-slate-600 prose-li:font-serif prose-li:break-words
                prose-pre:overflow-x-auto prose-pre:max-w-full
                prose-table:overflow-x-auto prose-table:block
                
                [&>h1]:text-3xl [&>h1]:mb-6
                [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4
                [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3
                [&>*]:max-w-full
               "
               dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Author Footer */}
            <div className="mt-16 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold shrink-0">
                  {blog.author ? blog.author.charAt(0) : 'C'}
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">About the Author</p>
                  <h4 className="text-lg font-bold text-slate-900">{blog.author || 'Centum Academy Team'}</h4>
                  <p className="text-sm text-slate-500">Dedicated to empowering students with expert educational content.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR COLUMN */}
          <div className="lg:col-span-4 space-y-8">
             {/* Sticky Wrapper */}
             <div className="sticky top-24">
                
                {/* Related Posts Widget */}
                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Recommended for you
                  </h3>
                  
                  <div className="space-y-6">
                    {relatedBlogs.length === 0 ? (
                       <p className="text-slate-400 text-sm italic">No other stories available yet.</p>
                    ) : (
                      relatedBlogs.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/blogs/${item.slug || item.id}`);
                          }}
                          className="group cursor-pointer flex gap-4 items-start"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                            {item.imageUrl && (
                              <img 
                                src={item.imageUrl} 
                                alt="" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2 break-words">
                              {item.title}
                            </h4>
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                               <span>{formatDate(item.createdAt)}</span>
                               <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                               <span className="group-hover:translate-x-1 transition-transform flex items-center gap-0.5 text-indigo-500 font-medium">
                                 Read <ArrowUpRight className="w-3 h-3" />
                               </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Newsletter Card */}
                <div className="mt-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white text-center shadow-xl shadow-indigo-200 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-xl mb-2">Ace Your Exams</h4>
                  <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                    Get free study materials, tips, and mock tests delivered to your inbox.
                  </p>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="w-full py-3 bg-white text-indigo-700 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    Start Learning
                  </button>
                </div>

             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BlogDetail;