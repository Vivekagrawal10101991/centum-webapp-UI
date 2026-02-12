import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cmsService } from "../../services/cmsService";
import { Button, Modal } from "../../../components/common";
import EnquiryForm from "./EnquiryForm";

/**
 * HeroSection Component
 * UPDATED:
 * - Fixed banner container height: h-[50vh] (mobile) -> h-[70vh] (tablet) -> h-[85vh] (desktop).
 * - Forced image to fill fixed dimensions using w-full h-full object-cover.
 */
const HeroSection = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await cmsService.getBanners();
        const activeBanners = Array.isArray(data) ? data.filter(b => b.active) : [];
        setBanners(activeBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Loading State - Matches the fixed responsive height
  if (loading) {
    return (
      <div className="w-full h-[50vh] md:h-[70vh] lg:h-[85vh] bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="text-gray-400 text-sm">Loading Banner...</div>
        </div>
      </div>
    );
  }

  // Fallback if no banners
  if (banners.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[85vh] bg-gradient-to-r from-[#002B6B] to-indigo-900 flex items-center">
          <div className="container mx-auto px-4 text-center md:text-left">
            <div className="max-w-2xl text-white mx-auto md:mx-0">
              <h1 className="text-2xl md:text-5xl font-bold mb-4">
                Welcome to Centum Academy
              </h1>
              <p className="text-blue-100 text-sm md:text-lg">
                Empowering students to achieve their dreams.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white py-8 border-b border-gray-100">
          <div className="container mx-auto px-4 text-center">
             <h3 className="text-xl font-bold text-gray-800 mb-4">Start Your Journey With Us</h3>
             <Button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="bg-[#002B6B] hover:bg-[#001c45] text-white px-10 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Enquire Now
              </Button>
          </div>
        </div>

        <Modal
          isOpen={isEnquiryModalOpen}
          onClose={() => setIsEnquiryModalOpen(false)}
          title="Enquire Now"
          size="md"
        >
          <EnquiryForm onSuccess={() => setIsEnquiryModalOpen(false)} />
        </Modal>
      </div>
    );
  }

  const currentBanner = banners[currentSlide];

  return (
    <div className="flex flex-col">
      {/* 1. Banner Section - FIXED RESPONSIVE HEIGHT */}
      <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[85vh] group bg-gray-900 overflow-hidden">
        
        <div className="relative w-full h-full flex items-center justify-center">
          <a 
            href={currentBanner.redirectUrl || '#'} 
            className={`block w-full h-full ${!currentBanner.redirectUrl && 'cursor-default'}`}
          >
             <picture className="w-full h-full block">
                {/* Mobile Image (< 768px) */}
                <source 
                   media="(max-width: 768px)" 
                   srcSet={currentBanner.mobileImageUrl || currentBanner.imageUrl} 
                />
                
                {/* Desktop Image */}
                <img
                  src={currentBanner.imageUrl}
                  alt={currentBanner.title}
                  className="w-full h-full object-cover object-center block transition-opacity duration-500"
                />
             </picture>
          </a>
        </div>

        {/* Content Layer (Desktop Only) */}
        <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-start">
          <div className="container mx-auto px-8">
            <div className="max-w-2xl text-white text-left">
              {currentBanner.description && (
                <p className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 p-4 rounded-lg backdrop-blur-sm inline-block">
                  {currentBanner.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors backdrop-blur-sm z-20"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors backdrop-blur-sm z-20"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-sm ${
                    index === currentSlide
                      ? "bg-white w-6 md:w-8"
                      : "bg-white/50 w-1.5 md:w-2 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 2. Call To Action Section */}
      <div className="bg-white py-8 border-b border-gray-100 shadow-sm relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">
              Ready to excel in your studies?
            </h3>
            <p className="text-gray-500 text-sm">Join Centum Academy today and achieve your academic goals.</p>
          </div>
          <Button
            onClick={() => setIsEnquiryModalOpen(true)}
            className="bg-[#002B6B] hover:bg-[#001c45] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold whitespace-nowrap"
          >
            Enquire Now
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        title="Enquire Now"
        size="md"
      >
        <EnquiryForm onSuccess={() => setIsEnquiryModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HeroSection;