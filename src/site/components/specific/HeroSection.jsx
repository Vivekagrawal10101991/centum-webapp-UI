import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Loader2 } from 'lucide-react';
import cmsService from '../../services/cmsService';

/**
 * HeroSection Component
 * Displays dynamic banners from the backend.
 * Updated: Ensured rounded corners are visible in mobile view by adding padding 
 * and forcing side-by-side buttons.
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
      <div className="h-[70vh] bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full bg-white overflow-hidden font-sans">
      {banners.map((banner, i) => (
        <div 
          key={banner.id || i} 
          className={`w-full flex flex-col transition-opacity duration-1000 ${i === active ? 'opacity-100 relative z-10' : 'opacity-0 absolute top-0 left-0 h-full z-0 pointer-events-none'}`}
        >
          {/* Top: Banner Image Section with Round Corners in Mobile & Desktop */}
          {/* Added p-4 on mobile to ensure the rounded corners don't touch the screen edge */}
          <div className="w-full bg-white p-4 pb-2 md:p-4 md:pb-6 flex justify-center">
            <div className="max-w-screen-2xl w-full relative">
              <picture>
                <source media="(max-width: 768px)" srcSet={banner.mobileImageUrl || banner.imageUrl} />
                <img 
                  src={banner.imageUrl} 
                  /* rounded-xl for mobile, rounded-2xl for desktop */
                  className="w-full h-auto block object-top rounded-xl md:rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-200" 
                  alt={banner.title} 
                />
              </picture>
            </div>
          </div>

          {/* Bottom: Action Bar - Centered Content */}
          <div className="bg-white border-t border-slate-100 w-full py-5 md:py-8 z-20 relative mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4 md:gap-6">
              
              {/* Navigation Dots */}
              <div className="flex gap-2 mb-1">
                {banners.map((_, dotIndex) => (
                  <button 
                    key={dotIndex} 
                    onClick={() => setActive(dotIndex)} 
                    className={`h-1.5 rounded-full transition-all shadow-sm ${dotIndex === active ? 'w-8 bg-indigo-600' : 'w-3 bg-slate-200 hover:bg-slate-300'}`} 
                    aria-label={`Go to slide ${dotIndex + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons - Side-by-Side on Mobile */}
              <div className="flex flex-row items-center justify-center gap-3 md:gap-6 w-full animate-fade-in">
                <a 
                  href={banner.redirectUrl || "/courses"}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 md:px-8 py-3 md:py-4 rounded-xl text-xs md:text-base font-bold uppercase tracking-wide text-white flex items-center gap-2 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                  View Programs <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <button className="bg-slate-50 hover:bg-slate-100 px-4 md:px-8 py-3 md:py-4 rounded-xl text-xs md:text-base font-bold uppercase tracking-wide text-slate-700 border border-slate-200 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap">
                  <Play className="h-3 w-3 md:h-4 md:w-4 fill-slate-700" /> Demo Class
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;