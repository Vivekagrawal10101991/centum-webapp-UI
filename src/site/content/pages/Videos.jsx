import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Play, X, Search, Video as VideoIcon } from 'lucide-react';
import { cmsService } from '../../services/cmsService';

/**
 * 🎨 Samsung One UI Inspired Pastel Colors
 * Consistent with Achievers page for brand uniformity.
 */
const PASTEL_COLORS = [
  { bg: 'bg-[#E3F2FD]', text: 'text-[#1565C0]', accent: 'bg-[#BBDEFB]' }, // Soft Blue
  { bg: 'bg-[#F3E5F5]', text: 'text-[#7B1FA2]', accent: 'bg-[#E1BEE7]' }, // Soft Purple
  { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', accent: 'bg-[#C8E6C9]' }, // Soft Green
  { bg: 'bg-[#FFF3E0]', text: 'text-[#E65100]', accent: 'bg-[#FFE0B2]' }, // Soft Orange
  { bg: 'bg-[#FCE4EC]', text: 'text-[#C2185B]', accent: 'bg-[#F8BBD0]' }, // Soft Pink
  { bg: 'bg-[#E0F2F1]', text: 'text-[#00695C]', accent: 'bg-[#B2DFDB]' }, // Soft Teal
];

// Helper to extract Video ID
const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- Custom Video Row Component ---
const VideoCard = ({ video, index, onPlay }) => {
  const theme = PASTEL_COLORS[index % PASTEL_COLORS.length];
  const videoId = getYoutubeId(video.videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between group relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(30,58,138,0.08)] hover:border-blue-300 cursor-pointer"
      onClick={() => onPlay(videoId)}
    >
      {/* Premium Side Accent */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>

      <div className="flex flex-1 items-center gap-6 w-full mb-5 sm:mb-0">
        {/* Thumbnail Container - Large & Row Styled */}
        <div className="relative w-full sm:w-64 aspect-video rounded-xl overflow-hidden shadow-md bg-slate-100 flex-shrink-0 group-hover:shadow-xl transition-all duration-500">
          {videoId ? (
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <VideoIcon className="w-12 h-12 opacity-20" />
            </div>
          )}
          
          {/* Glassmorphism Play Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-2xl transform scale-90 group-hover:scale-110 transition-transform duration-500">
              <Play className="w-6 h-6 text-white fill-current ml-1 drop-shadow-lg" />
            </div>
          </div>
          
          {/* Duration/Status Badge (Placeholder/Style) */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-md border border-white/10">
            {video.visibility === 'PRIVATE' ? 'PRIVATE' : 'HD VIDEO'}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
             <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${theme.bg} ${theme.text} border border-white/50 shadow-sm`}>
               Video Tutorial
             </span>
             <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
               Centum Academy
             </span>
          </div>
          
          <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
            {video.title}
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 max-w-2xl">
            {video.description || "Unlock key insights and expert strategies in this comprehensive session curated by Centum Academy faculty."}
          </p>
        </div>
      </div>

      {/* Action Section */}
      <div className="w-full sm:w-auto flex-shrink-0 sm:pl-6 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0">
        <button 
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white py-3 px-8 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/30 hover:-translate-y-0.5 active:scale-95"
        >
          <Play className="h-4 w-4 fill-current" />
          Play Now
        </button>
      </div>
    </motion.div>
  );
};

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Video Modal State
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getAllVideos();
        // Filter out private videos if any leaked through, though backend usually handles this
        const publicVideos = Array.isArray(data) ? data.filter(v => v.visibility !== 'PRIVATE') : [];
        setVideos(publicVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Filter Logic
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. PREMIUM HERO HEADER */}
      <div className="relative bg-[#0f172a] text-white py-24 overflow-hidden border-b border-slate-800">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[11px] font-black text-blue-400 bg-blue-400/10 rounded-full uppercase tracking-[0.2em] shadow-inner border border-blue-400/20">
              Centum Media Center
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Concepts</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Curated educational content, expert sessions, and high-quality concept explainers to give your preparation the Centum edge.
            </p>
          </motion.div>
          
          {/* Search Bar - Refined */}
          <div className="max-w-xl mx-auto mt-12 relative group">
            <input
              type="text"
              placeholder="Search concepts, topics or videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 shadow-2xl focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 text-base font-medium"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 w-6 h-6 transition-colors" />
          </div>
        </div>
      </div>

      {/* 2. VIDEO LIST SECTION (ROW STRIPS) */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Play className="w-6 h-6 text-blue-600 fill-current" />
              {searchTerm ? `Search Results for "${searchTerm}"` : 'Latest Uploads'}
            </h2>
            <div className="hidden sm:block text-sm font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
              {filteredVideos.length} {filteredVideos.length === 1 ? 'Video' : 'Videos'} Available
            </div>
          </div>

          {filteredVideos.length > 0 ? (
            <div className="flex flex-col gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  index={index} 
                  onPlay={setPlayingVideoId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-300 shadow-inner">
              <VideoIcon className="w-20 h-20 mx-auto mb-6 text-slate-200" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No videos found</h3>
              <p className="text-slate-500">We couldn't find any videos matching your search criteria.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {playingVideoId && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setPlayingVideoId(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;