import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, ChevronRight, Sparkles, Play, X } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { Button, Modal } from '../../../components/common';
import EnquiryForm from '../../components/specific/EnquiryForm';

/**
 * 🎨 Samsung One UI Inspired Pastel Colors
 * Randomly assigned to cards to give that "faded/soft" professional look.
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
const StoryCard = ({ story, index, onPlay }) => {
  const theme = PASTEL_COLORS[index % PASTEL_COLORS.length];
  const videoId = getYoutubeId(story.videoUrl);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-2xl overflow-hidden ${theme.bg} shadow-sm hover:shadow-lg border border-white/60 flex flex-col h-full transition-all duration-300 group cursor-pointer`}
      onClick={() => onPlay(videoId)}
    >
      {/* Thumbnail Container */}
      {/* ✅ Changed padding to be tighter and radius to be smaller (50% reduction) */}
      <div className="p-2 pb-0">
        {/* ✅ Changed aspect-ratio to 'video' (16:9) for professional YouTube look */}
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner bg-black/10">
          {videoId ? (
             <img
               src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
               alt={story.title}
               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
             />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">No Preview</div>
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
          Success Story
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
          {story.title}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
          {story.description}
        </p>
      </div>
    </motion.div>
  );
};

const Achievers = () => {
  const [gallery, setGallery] = useState([]);
  const [stories, setStories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  
  // Video Modal State
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Banners (Achiever Gallery)
        const galleryData = await cmsService.getAchieverGallery();
        setGallery(Array.isArray(galleryData) ? galleryData : (galleryData?.data || []));

        // 2. Fetch Success Stories (Backend)
        const storiesData = await cmsService.getStories();
        setStories(Array.isArray(storiesData) ? storiesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Banner Slider Logic
  useEffect(() => {
    if (gallery.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % gallery.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [gallery.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % gallery.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* 1. HERO HEADER */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 overflow-hidden border-b border-primary-100">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100">
            Hall of Fame
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
            Our Success Gallery
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto font-light">
            Celebrating the extraordinary milestones of our brilliant students.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto mt-6 opacity-90"></div>
        </div>
      </div>

      {/* 2. ACHIEVER BANNER SECTION */}
      {gallery.length > 0 ? (
        <div className="relative w-full group bg-gray-900 overflow-hidden">
            <div className="relative w-full flex items-center justify-center">
               <picture className="w-full h-full block">
                   <source 
                        media="(max-width: 768px)" 
                        srcSet={gallery[currentSlide].mobileImageUrl || gallery[currentSlide].imageUrl} 
                   />
                   <img
                     src={gallery[currentSlide].imageUrl} 
                     alt={gallery[currentSlide].description}
                     className="w-full h-auto object-contain md:object-cover max-h-[85vh] block transition-opacity duration-500"
                   />
               </picture>
            </div>

            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl text-white drop-shadow-xl relative z-10">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-bold text-white bg-primary-950/40 backdrop-blur-sm rounded-full uppercase tracking-widest border border-white/20 hidden sm:inline-flex"
                  >
                    <Sparkles size={12} />
                    Success Story
                  </motion.div>
                  
                  <motion.h1 
                    key={currentSlide}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold mb-8 leading-tight drop-shadow-2xl hidden sm:block"
                  >
                    {gallery[currentSlide].description}
                  </motion.h1>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.4 }}
                    className="mt-4 sm:mt-0"
                  >
                    <Button variant="primary" size="lg" onClick={() => setIsEnquiryModalOpen(true)} className="shadow-xl bg-primary-600 hover:bg-primary-700 border-none px-8 hover:scale-105 transition-transform">
                      Start Your Journey
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button onClick={prevSlide} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-2 md:p-3 rounded-full z-20 transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-2 md:p-3 rounded-full z-20 transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500">
            No achiever stories found.
        </div>
      )}

      {/* 3. SUCCESS STORIES SECTION (VIDEO CARDS) */}
      {stories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Inspiring Success Stories
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Watch our students share their journey, struggles, and how they achieved their dreams with Centum Academy.
              </p>
            </div>

            {/* ✅ Updated Grid: 4 columns on large screens, reduced gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stories.map((story, index) => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  index={index} 
                  onPlay={setPlayingVideoId}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. FOOTER STATS SECTION */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Join the League of Achievers</h2>
              <p className="text-gray-500 mt-2">Your success story starts here.</p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-4 bg-white border border-gray-100 rounded-2xl text-center shadow-sm"><span className="block text-2xl font-bold text-primary-600">100%</span><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dedication</span></div>
              <div className="px-6 py-4 bg-white border border-gray-100 rounded-2xl text-center shadow-sm"><span className="block text-2xl font-bold text-primary-600">Top</span><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Results</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {playingVideoId && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
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

      <Modal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} title="Start Your Success Story" size="md">
        <EnquiryForm onSuccess={() => setIsEnquiryModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Achievers;