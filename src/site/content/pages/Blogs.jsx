import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Calendar, User, ArrowRight, Search, 
  Sparkles, Filter, ChevronRight, Clock, Share2 
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const data = await cmsService.getBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', 'JEE', 'NEET', 'Mentorship', 'Parenting', 'News'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Extract the first blog as the Featured Post (Figma Layout)
  const featuredBlog = blogs[0];
  const regularBlogs = filteredBlogs.slice(activeCategory === 'All' ? 1 : 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-20">
      {/* 1. FIGMA HERO HEADER */}
      <section className="bg-white pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[120px] -mr-64 -mt-64 opacity-60"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-full mb-8 shadow-xl shadow-purple-200"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Centum Insights</span>
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
            Perspective <span className="text-purple-600">&</span> Knowledge
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Deep dives into competitive excellence, conceptual mastery, and the future of ed-tech.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER DUAL-BAR (Figma Design) */}
      <div className="sticky top-[80px] z-[40] bg-white/80 backdrop-blur-xl border-y border-slate-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-600" />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        {/* 3. FEATURED POST (Exclusive to Figma Layout) */}
        {activeCategory === 'All' && featuredBlog && !searchQuery && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <Link to={`/blogs/${featuredBlog.slug || featuredBlog.id}`} className="group relative block bg-slate-900 rounded-[3.5rem] overflow-hidden min-h-[500px] shadow-3xl">
              <div className="absolute inset-0">
                <img 
                  src={featuredBlog.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"} 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
                  alt="Featured"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-10 md:p-20 z-10 max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Featured Story</span>
                  <div className="text-white/60 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" /> 10 Min Read
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                  {featuredBlog.title}
                </h2>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-0.5">
                       <div className="w-full h-full bg-slate-700 rounded-full flex items-center justify-center font-black">C</div>
                    </div>
                    <div>
                      <p className="text-white font-black text-sm uppercase">Editorial Team</p>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Academic Board</p>
                    </div>
                  </div>
                  <button className="h-14 w-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all shadow-xl">
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* 4. BLOG GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {regularBlogs.map((blog, idx) => (
              <motion.article 
                key={blog.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
              >
                <Link to={`/blogs/${blog.slug || blog.id}`} className="block relative h-72 overflow-hidden bg-slate-100">
                  <img 
                    src={blog.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-lg px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-purple-600 shadow-xl border border-white">
                      {blog.category}
                    </span>
                  </div>
                </Link>

                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar className="h-3.5 w-3.5" /> {blog.date || "Feb 13, 2026"}
                    </div>
                    <button className="text-slate-300 hover:text-purple-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Link to={`/blogs/${blog.slug || blog.id}`}>
                    <h2 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-purple-600 transition-colors leading-[1.2] tracking-tight">
                      {blog.title}
                    </h2>
                  </Link>
                  
                  <p className="text-slate-500 font-medium mb-10 line-clamp-3 leading-relaxed text-sm">
                    {blog.excerpt || "Unlock your potential with our latest insights into competitive examination preparation and strategy."}
                  </p>

                  <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">C</div>
                      <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase">Centum Faculty</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified Author</p>
                      </div>
                    </div>
                    <Link 
                      to={`/blogs/${blog.slug || blog.id}`}
                      className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                    >
                      Read More <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* 5. EMPTY STATE */}
        {filteredBlogs.length === 0 && (
          <div className="py-40 text-center">
            <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
              <Search className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-2">No matching articles</h3>
            <p className="text-slate-400 font-medium">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;