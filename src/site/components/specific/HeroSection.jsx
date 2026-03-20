import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import cmsService from '../../services/cmsService';

/**
 * HeroSection Component
 * Displays dynamic banners from the backend with an attractive SEO-optimized call-to-action area.
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
    <section className="relative w-full bg-slate-50 overflow-hidden font-sans flex flex-col">
      
      {/* ============================================== */}
      {/* TOP: BANNER IMAGE SLIDER & DOTS                */}
      {/* ============================================== */}
      <div className="relative w-full flex flex-col items-center flex-grow">
        
        {/* Banner Images */}
        <div className="relative w-full">
          {banners.map((banner, i) => (
            <div 
              key={banner.id || i} 
              className={`w-full transition-opacity duration-1000 ${i === active ? 'opacity-100 relative z-10' : 'opacity-0 absolute top-0 left-0 h-full z-0 pointer-events-none'}`}
            >
              <div className="w-full bg-slate-50 p-4 pb-0 md:p-6 md:pb-0 flex justify-center">
                <div className="max-w-screen-2xl w-full relative">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={banner.mobileImageUrl || banner.imageUrl} />
                    <img 
                      src={banner.imageUrl} 
                      className="w-full h-auto block object-top rounded-xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/60" 
                      alt={banner.title} 
                    />
                  </picture>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots - MOVED HERE (Just below the banners) */}
        <div className="flex gap-3 py-6 relative z-20">
          {banners.map((_, dotIndex) => (
            <button 
              key={dotIndex} 
              onClick={() => setActive(dotIndex)} 
              className={`h-2 rounded-full transition-all duration-500 ${dotIndex === active ? 'w-10 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`} 
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>

      </div>

      {/* ============================================== */}
      {/* BOTTOM: STATIC CALL-TO-ACTION AREA             */}
      {/* ============================================== */}
      <div className="bg-white w-full py-12 md:py-20 z-20 relative border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center gap-6 md:gap-8">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight md:leading-tight">
            Prepare for JEE, NEET, and <br className="hidden md:block" /> Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">CENTUM</span>
          </h1>
          
          <p className="text-slate-500 font-normal text-base md:text-xl max-w-2xl mb-2">
            Join Bangalore's premier coaching institute. Expert faculty, personalized mentoring, and a proven track record of success.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full">
            <Link 
              to={banners[active]?.redirectUrl || "/program"}
              onClick={() => window.scrollTo(0, 0)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 px-8 md:px-10 py-4 md:py-5 rounded-2xl text-sm md:text-base font-semibold uppercase tracking-widest text-white flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
            >
              View Programs <ArrowRight className="h-5 w-5" />
            </Link>
            
            {/* Specific YouTube Link Button */}
            <a 
              href="https://www.youtube.com/watch?v=pzjJeLviWdk&list=PLiQ62JOkts64CdQlZjxrnlal1H24ozykJ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 px-8 md:px-10 py-4 md:py-5 rounded-2xl text-sm md:text-base font-semibold uppercase tracking-widest text-slate-800 border-2 border-slate-200 flex items-center justify-center gap-3 transition-all active:scale-95 shadow-sm hover:shadow-md"
            >
              <div className="bg-slate-900 rounded-full p-1">
                <Play className="h-3 w-3 md:h-4 md:w-4 fill-white text-white" /> 
              </div>
              Demo Class
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;