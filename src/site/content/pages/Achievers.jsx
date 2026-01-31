import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronLeft, ChevronRight, Sparkles, Youtube, ExternalLink } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { Button, Modal } from '../../../components/common';
import EnquiryForm from '../../components/specific/EnquiryForm';

/**
 * VideosSection Component
 * Fetches and displays YouTube videos in a 3-column grid
 */
const VideosSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Replace with your actual YouTube API Key
  const API_KEY = 'YOUR_YOUTUBE_API_KEY'; 
  const CHANNEL_ID = 'UC_x5XG1OV2P6uSZw9H2of7Q'; // Derived from @CentumAcademy

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        // Fetching latest 3 videos from the channel
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3&type=video`
        );
        const data = await response.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  if (videos.length === 0 && !loading) return null;

  return (
    <section className="py-20 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Watch Our Success Stories
            </h2>
            <p className="text-secondary-600 text-lg">
              Explore our latest educational content and student testimonials on YouTube.
            </p>
          </div>
          <a 
            href="https://www.youtube.com/@CentumAcademy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-bold rounded-xl shadow-sm border border-primary-100 hover:bg-primary-50 transition-colors group"
          >
            Explore More
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <motion.div 
                key={video.id.videoId}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-secondary-100 flex flex-col h-full"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video group cursor-pointer">
                  <img 
                    src={video.snippet.thumbnails.high.url} 
                    alt={video.snippet.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Youtube size={24} fill="currentColor" />
                    </div>
                  </div>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  />
                </div>

                {/* Video Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-secondary-900 mb-3 line-clamp-2 leading-snug">
                    {video.snippet.title}
                  </h3>
                  <p className="text-secondary-500 text-sm line-clamp-2 mb-6 flex-1">
                    {video.snippet.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-secondary-50">
                    <span className="text-xs font-medium text-secondary-400 uppercase tracking-wider">
                      {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 text-sm font-bold hover:text-primary-700"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Achievers = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getAchieverGallery();
        const galleryData = Array.isArray(data) ? data : (data?.data || []);
        setGallery(galleryData);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* 1. BLUE HERO SECTION */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 overflow-hidden border-b border-primary-100">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100">
            Success Gallery
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
            Our Success Gallery
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto font-light">
            Celebrating the extraordinary journey of our trailblazing students.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto mt-6 opacity-90"></div>
        </div>
      </div>

      {/* 2. ACHIEVER BANNER SECTION (UPDATED RESPONSIVE) */}
      {gallery.length > 0 ? (
        <div className="relative w-full group bg-black overflow-hidden">
            
            {/* RESPONSIVENESS UPDATE:
              - Matched HeroSection structure.
              - Uses vh units and object-contain/cover logic.
              - Replaced split mobile/desktop implementation with unified responsive image.
            */}
            <div className="relative w-full md:min-h-[40vh] flex items-center justify-center">
               <img
                 src={gallery[currentSlide].imageUrl} 
                 alt={gallery[currentSlide].description}
                 className="w-full h-auto object-contain md:object-cover max-h-[85vh] block"
               />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Content Layer */}
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
                  
                  {/* Title hidden on mobile to avoid covering small images */}
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

      {/* 3. NEW YOUTUBE VIDEOS SECTION */}
      <VideosSection />

      {/* 4. FOOTER STATS SECTION */}
      <section className="py-16 bg-white border-b border-secondary-100">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">Celebrating Excellence</h2>
              <p className="text-secondary-600 mt-2">Every student at Centum Academy has a unique story of growth and achievement.</p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-4 bg-secondary-50 rounded-2xl text-center"><span className="block text-2xl font-bold text-primary-600">100%</span><span className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">Dedication</span></div>
              <div className="px-6 py-4 bg-secondary-50 rounded-2xl text-center"><span className="block text-2xl font-bold text-primary-600">Top</span><span className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">Results</span></div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} title="Start Your Success Story" size="md">
        <EnquiryForm onSuccess={() => setIsEnquiryModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Achievers;