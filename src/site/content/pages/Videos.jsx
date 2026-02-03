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

// --- Custom Video Card Component ---
const VideoCard = ({ video, index, onPlay }) => {
  const theme = PASTEL_COLORS[index % PASTEL_COLORS.length];
  const videoId = getYoutubeId(video.videoUrl);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-2xl overflow-hidden ${theme.bg} shadow-sm hover:shadow-lg border border-white/60 flex flex-col h-full transition-all duration-300 group cursor-pointer`}
      onClick={() => onPlay(videoId)}
    >
      {/* Thumbnail Container */}
      <div className="p-2 pb-0">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner bg-black/10">
          {videoId ? (
             <img
               src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
               alt={video.title}
               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
             />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">
                <VideoIcon className="w-10 h-10 opacity-20" />
             </div>
          )}
          
          {/* Custom Play Button Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className={`w-12 h-12 ${theme.bg} rounded-full flex items-center justify-center shadow-lg backdrop-blur-md bg-opacity-90 group-hover:scale-110 transition-transform duration-300`}>
              <Play className={`w-5 h-5 ${theme.text} fill-current ml-1`} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className={`inline-flex self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${theme.accent} ${theme.text} bg-opacity-60`}>
          Video
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
          {video.description}
        </p>
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
    <div className="bg-white min-h-screen">
      {/* 1. HERO HEADER */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 overflow-hidden border-b border-blue-100">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-blue-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-blue-100">
            Media Center
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Explore Our Video Library
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Curated educational content, expert sessions, and concept explainers to boost your preparation.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. VIDEO GRID SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="text-center py-20 text-gray-500">
              <VideoIcon className="w-16 h-16 mx-auto mb-4 text-gray-200" />
              <p>No videos found matching your search.</p>
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