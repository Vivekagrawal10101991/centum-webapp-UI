import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Clock, Sparkles, ArrowUpRight, User, BookOpen } from 'lucide-react';
import { getAllBlogs } from '../../../admin/services/blogService';

// --- STATIC DATA ---
const STATIC_BLOGS = [
  {
    id: 'static-1',
    title: "The Ultimate Guide to JEE Main 2026: Preparation Strategies That Work",
    content: `
      <p><strong>Success in JEE Main is not just about hard work; it's about working smart.</strong> As the competition intensifies every year, students need a strategic approach to secure a top rank.</p>
      <h3>1. Understand the Syllabus & Exam Pattern</h3>
      <p>Before diving into books, analyze the official syllabus. Focus on high-weightage chapters. For Physics, Mechanics and Electrodynamics are crucial. In Chemistry, Organic and Physical Chemistry hold significant weight.</p>
      <h3>2. Time Management is Key</h3>
      <p>Create a realistic timetable. Allocate time for revision and mock tests. The <strong>Pomodoro technique</strong> (25 minutes study, 5 minutes break) can help maintain focus during long study sessions.</p>
      <h3>3. Mock Tests & Analysis</h3>
      <p>Taking mock tests is only half the battle. The real learning comes from analyzing your mistakes. Identify whether the error was conceptual, calculation-based, or due to a lack of time.</p>
      <blockquote>"Consistency is the hallmark of a topper. It's not about studying 15 hours for one day, but 6 hours every day for two years."</blockquote>
      <h3>Conclusion</h3>
      <p>Stay healthy, stay positive, and trust your preparation. The journey to IIT begins with a single step of disciplined effort.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    author: "Mr. Tushar Sinha",
    createdAt: "2026-02-05",
    category: "JEE Preparation"
  },
  {
    id: 'static-2',
    title: "NEET 2026: How to Master Biology in 6 Months",
    content: "<p>Biology constitutes 50% of the NEET paper. Mastering NCERT is non-negotiable...</p>",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    author: "Mr. Dheeraj Singh",
    createdAt: "2026-02-03",
    category: "NEET Preparation"
  },
  {
    id: 'static-3',
    title: "Time Management Secrets for Competitive Exam Success",
    content: "<p>Time is your most valuable asset. Learn how to prioritize tasks and avoid burnout...</p>",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
    author: "Mr. Akhil Upadhyay",
    createdAt: "2026-01-30",
    category: "Study Tips"
  },
  {
    id: 'static-4',
    title: "Foundation Programs: Building Strong Basics for Class 9 & 10",
    content: "<p>Early starters have a significant advantage. Foundation courses bridge the gap between school and competitive exams...</p>",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    author: "Centum Faculty",
    createdAt: "2026-01-28",
    category: "Foundation"
  },
  {
    id: 'static-5',
    title: "Mock Tests: Your Secret Weapon for JEE & NEET",
    content: "<p>Mock tests simulate the exam environment. They help in building stamina and managing exam pressure...</p>",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    author: "Mr. Tushar Sinha",
    createdAt: "2026-01-25",
    category: "Test Strategy"
  },
  {
    id: 'static-6',
    title: "Parent's Guide: Supporting Your Child Through Competitive Exams",
    content: "<p>Parents play a crucial role. Be a pillar of support, not a source of pressure...</p>",
    imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600&q=80",
    author: "Mr. Dheeraj Singh",
    createdAt: "2026-01-22",
    category: "Parent Guide"
  },
  {
    id: 'static-7',
    title: "Physics Problem-Solving: Techniques from IIT Alumni",
    content: "<p>Physics is about visualization. Don't just memorize formulas; understand the 'Why' and 'How'...</p>",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    author: "Mr. Akhil Upadhyay",
    createdAt: "2026-01-20",
    category: "Subject Focus"
  },
  {
    id: 'static-8',
    title: "Overcoming Exam Anxiety: Mental Health Tips for Students",
    content: "<p>Mental health is as important as physical health. Yoga and meditation can improve concentration...</p>",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80",
    author: "Centum Faculty",
    createdAt: "2026-01-18",
    category: "Mental Health"
  },
  {
    id: 'static-9',
    title: "Chemistry for NEET: Mastering Organic & Inorganic",
    content: "<p>Chemistry is high-scoring. Regular revision of the periodic table and reaction mechanisms is essential...</p>",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    author: "Mr. Dheeraj Singh",
    createdAt: "2026-01-15",
    category: "NEET Preparation"
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Logic (Native JS)
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
    // Scroll to top when ID changes
    window.scrollTo(0, 0);

    const fetchBlogData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Try to find in STATIC data first (Instant load)
        const staticMatch = STATIC_BLOGS.find(b => b.id === id);
        
        let allBlogs = [];
        
        // 2. Fetch Backend Data
        try {
          const data = await getAllBlogs();
          if (Array.isArray(data)) {
            // Transform backend data to match schema if needed
            const formattedBackend = data.map(b => ({
              ...b,
              id: b.id || b._id,
              imageUrl: b.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
            }));
            allBlogs = formattedBackend;
          }
        } catch (backendErr) {
          console.warn("Backend fetch failed, using static only", backendErr);
        }

        // 3. Combine Static + Backend for "Related Posts"
        const combinedBlogs = [...allBlogs, ...STATIC_BLOGS];

        // 4. Determine which blog to show
        const foundBlog = staticMatch || combinedBlogs.find(b => String(b.id) === String(id));
        
        if (foundBlog) {
          setBlog(foundBlog);
          // Filter out current blog for "Related" section
          const others = combinedBlogs.filter(b => String(b.id) !== String(id)).slice(0, 4);
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
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Progress Bar (Native CSS) --- */}
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
              className="w-full h-full object-cover opacity-80"
              style={{ transform: `translateY(${scrollProgress * 50}px)` }} // Simple Parallax
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center">
               <Sparkles className="w-20 h-20 text-white/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full pb-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
              <BookOpen className="w-3 h-3" />
              {blog.category || 'Article'}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {blog.title}
            </h1>

            {/* UPDATED: Metadata Pill Box */}
            <div 
              className="inline-flex items-center justify-center gap-6 bg-indigo-50 border border-indigo-100 shadow-sm text-slate-700 font-medium text-sm md:text-base px-8 py-3 rounded-full animate-fade-in-up" 
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
            {/* Article Body - Optimized for Readability */}
            <article 
               className="
                prose prose-slate max-w-none
                prose-lg md:prose-xl 
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-p:text-slate-600 prose-p:leading-8 prose-p:font-serif prose-p:text-[1.125rem]
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700 hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-indigo-900
                prose-li:text-slate-600 prose-li:font-serif
                
                /* Explicit overrides to fix 'too big' text issues */
                [&>h1]:text-3xl [&>h1]:mb-6
                [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4
                [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3
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
                       <p className="text-slate-400 text-sm italic">No related stories available yet.</p>
                    ) : (
                      relatedBlogs.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/blogs/${item.id}`);
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
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
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