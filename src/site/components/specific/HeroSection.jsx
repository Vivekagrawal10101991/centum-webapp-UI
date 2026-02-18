import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Loader2 } from 'lucide-react';
import cmsService from '../../services/cmsService';

/**
 * HeroSection Component
 * Displays dynamic banners from the backend.
 * Updated: Changed text color to Light Indigo and added a 10% dark film overlay.
 */
const HeroSection = () => {
  const [active, setActive] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await cmsService.getBanners();
        const activeBanners = data
          .filter(b => b.active)
          .sort((a, b) => a.displayOrder - b.displayOrder);
        
        setBanners(activeBanners);
      } catch (error) {
        console.error("Failed to load banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const timer = setInterval(() => {
        setActive(prev => (prev + 1) % banners.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [banners]);

  if (loading) {
    return (
      <div className="h-[85vh] bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="relative h-[85vh] bg-slate-950 overflow-hidden font-sans">
      {banners.map((banner, i) => (
        <div 
          key={banner.id || i} 
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image Container */}
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 768px)" srcSet={banner.mobileImageUrl || banner.imageUrl} />
              <img 
                src={banner.imageUrl} 
                className="w-full h-full object-cover" 
                alt={banner.title} 
              />
            </picture>
            
            {/* Subtle 10% Film Overlay - Added back with low opacity as requested */}
            <div className="absolute inset-0 bg-slate-950/10"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-2xl">
              
              {/* Main Headline - Updated to Light Indigo color */}
              <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-indigo-50 drop-shadow-2xl animate-fade-in">
                {banner.title}
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 animate-fade-in delay-200">
                <a 
                  href={banner.redirectUrl || "/courses"}
                  className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl text-base font-bold uppercase tracking-wide text-white flex items-center gap-2 transition-all shadow-xl"
                >
                  View Programs <ArrowRight className="h-5 w-5" />
                </a>
                <button className="bg-black/20 hover:bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl text-base font-bold uppercase tracking-wide text-white border border-white/20 flex items-center gap-2">
                  <Play className="h-4 w-4 fill-current" /> Demo Class
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {banners.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActive(i)} 
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-12 bg-indigo-500' : 'w-4 bg-white/30'}`} 
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;