import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { Button, Modal } from '../../../components/common';
import EnquiryForm from './EnquiryForm';

/**
 * HeroSection Component
 * UPDATED: Added Flexbox centering (items-center) to the main container.
 * This ensures that if the screen resize causes the image to be shorter than the container,
 * the image remains vertically centered with equal spacing top and bottom.
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
        console.error('Error fetching banners:', error);
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
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Fallback if no banners
  if (banners.length === 0) {
    return (
      <div className="relative w-full py-32 bg-gradient-to-r from-primary-600 to-primary-800 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Welcome to Centum Academy</h1>
            <Button 
              variant="outline" 
              className="bg-white text-primary border-white hover:bg-gray-100"
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
      {/* Main Container
         - added 'flex items-center justify-center': This centers the image vertically if the container is taller than the image.
         - bg-black: Ensures the "bars" are black as requested.
      */}
      <div className="relative w-full h-[400px] md:h-auto md:min-h-[300px] overflow-hidden group bg-black flex items-center justify-center">
        
        {/* Mobile View: Absolute fill (Standard mobile behavior) */}
        <div className="md:hidden absolute inset-0 w-full h-full">
           <img
             src={currentBanner.imageUrl}
             alt={currentBanner.title}
             className="w-full h-full object-cover object-center"
           />
        </div>

        {/* Desktop View: Natural Scaling + Centered by Parent Flex */}
        <div className="hidden md:block w-full">
           <img
             src={currentBanner.imageUrl}
             alt={currentBanner.title}
             className="w-full h-auto block" 
           />
        </div>

        {/* Dark Overlay - Absolute to cover everything */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Content Layer - Absolute centered */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl lg:max-w-2xl text-white drop-shadow-xl">
              {/* Text hidden on mobile if image is small, visible on desktop */}
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 hidden sm:block">
                {currentBanner.title}
              </h1>
              
              {currentBanner.description && (
                <p className="text-lg lg:text-xl mb-6 opacity-90 hidden sm:block">
                  {currentBanner.description}
                </p>
              )}
              
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="shadow-xl hover:scale-105 transition-transform"
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white w-6'
                      : 'bg-white/50 w-1.5 hover:bg-white/80'
                  }`}
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