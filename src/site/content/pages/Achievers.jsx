import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ImageIcon, Sparkles } from 'lucide-react';
import { cmsService } from '../../services/cmsService';

const Achievers = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Tripling the array ensures there are no gaps during the infinite scroll animation
  const infiniteGallery = [...gallery, ...gallery, ...gallery];

  return (
    <div className="bg-secondary-50 min-h-screen pb-24">
      {/* Restored Original Hero Section Colors */}
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

      <section className="py-20 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : gallery.length === 0 ? (
          <div className="container mx-auto px-4">
            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border-2 border-dashed border-secondary-200">
              <ImageIcon className="w-12 h-12 text-secondary-200 mb-2" />
              <p className="text-secondary-400">No gallery items found.</p>
            </div>
          </div>
        ) : (
          <div className="relative flex items-center">
            {/* Seamless Side-wise Infinite Scroll Track */}
            <motion.div 
              className="flex gap-6"
              animate={{
                x: [0, -100 * gallery.length + "%"], 
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: gallery.length * 6, // Adjust speed: higher is slower
                  ease: "linear",
                },
              }}
              style={{ width: "fit-content" }}
            >
              {infiniteGallery.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-[280px] md:w-[350px]" // Sized to fit approximately 3 cards on screen
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group">
                    {/* Square Image Section */}
                    <div className="aspect-square w-full bg-secondary-50 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Reduced Text Area with Center Alignment */}
                    <div className="p-5 flex flex-col items-center text-center bg-white">
                      <div className="w-6 h-0.5 bg-primary-400 rounded-full mb-3 opacity-30" />
                      <p className="text-secondary-900 text-sm md:text-base font-bold leading-snug line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-50 text-[9px] font-bold text-secondary-500 uppercase tracking-wider">
                        <Sparkles size={10} className="text-primary-500" />
                        Achiever
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Achievers;