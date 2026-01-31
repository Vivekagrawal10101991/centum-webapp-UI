import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cmsService } from "../../services/cmsService";
import { Button, Modal } from "../../../components/common";
import EnquiryForm from "./EnquiryForm";

/**
 * HeroSection Component
 * UPDATED:
 * - Replaced fixed 'px' height with 'vh' (viewport height) for better responsiveness.
 * - Mobile: min-h-[30vh] (approx 30% of screen height).
 * - Desktop: min-h-[40vh] (approx 40% of screen height).
 * - This ensures the text overlay always has room, regardless of device size.
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
        setBanners(data);
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

  // Loading State
  if (loading) {
    return (
      // Also updated loading state to use vh
      <div className="w-full h-[30vh] md:h-[40vh] bg-gray-100 flex items-center justify-center">
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
      <div className="relative w-full py-20 md:py-32 bg-gradient-to-r from-[#002B6B] to-indigo-900 flex items-center">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="max-w-2xl text-white mx-auto md:mx-0">
            <h1 className="text-2xl md:text-5xl font-bold mb-4">
              Welcome to Centum Academy
            </h1>
            <p className="text-blue-100 mb-6 text-sm md:text-lg">
              Empowering students to achieve their dreams.
            </p>
            <Button
              variant="outline"
              className="bg-white text-[#002B6B] border-white hover:bg-gray-100 font-semibold px-6 py-2"
              onClick={() => setIsEnquiryModalOpen(true)}
            >
              Enquire Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentBanner = banners[currentSlide];

  return (
    <>
      <div className="relative w-full group bg-black overflow-hidden">
        {/* Responsive Image Container
           min-h-[30vh]: Mobile - Ensures at least 30% of screen height is used.
           md:min-h-[40vh]: Desktop - Ensures at least 40% of screen height is used.
           This is much better than fixed pixels because it adapts to the device.
        */}
        <div className="relative w-full md:min-h-[40vh] flex items-center justify-center">
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            // max-h-[85vh] prevents the image from taking up the WHOLE screen on very tall images
            className="w-full h-auto object-contain md:object-cover max-h-[85vh] block"
          />
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-full md:max-w-2xl text-white text-center md:text-left">
              {/* Title */}
              {currentBanner.title && (
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg tracking-tight">
                  {currentBanner.title}
                </h1>
              )}

              {/* Description */}
              {currentBanner.description && (
                <p className="text-sm sm:text-base md:text-xl mb-4 md:mb-6 opacity-95 drop-shadow-md hidden sm:block">
                  {currentBanner.description}
                </p>
              )}

              {/* Button */}
              <div className="mt-2 md:mt-4">
                <Button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="bg-[#002B6B] hover:bg-[#001c45] text-white px-6 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-lg shadow-xl hover:scale-105 transition-transform duration-200 border border-white/20"
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on Mobile */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors backdrop-blur-sm z-20"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors backdrop-blur-sm z-20"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
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

      {/* Modal */}
      <Modal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        title="Enquire Now"
        size="md"
      >
        <EnquiryForm onSuccess={() => setIsEnquiryModalOpen(false)} />
      </Modal>
    </>
  );
};

export default HeroSection;
