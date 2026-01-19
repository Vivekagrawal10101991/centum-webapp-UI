import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { Button, Modal } from '../../../components/common';
import EnquiryForm from './EnquiryForm';

/**
 * HeroSection Component
 * Dynamic banner carousel with enquiry modal
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

  // Auto-slide every 5 seconds
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

  const handleEnquirySuccess = () => {
    setIsEnquiryModalOpen(false);
  };

  if (loading) {
    return (
      <div className="relative h-[500px] bg-gradient-to-r from-primary-600 to-primary-400 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (banners.length === 0) {
    // Fallback hero if no banners
    return (
      <div className="relative h-[500px] bg-gradient-to-r from-primary-600 to-primary-400">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Centum Academy</h1>
            <p className="text-xl mb-8">
              Empowering students to achieve their dreams through quality education
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="bg-white text-primary hover:bg-gray-100"
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
      <div className="relative h-[500px] overflow-hidden">
        {/* Banner Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${currentBanner.imageUrl})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              {currentBanner.title}
            </h1>
            {currentBanner.description && (
              <p className="text-xl mb-8 drop-shadow-lg">
                {currentBanner.description}
              </p>
            )}
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="shadow-lg"
            >
              Enquire Now
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      <Modal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        title="Enquire Now"
        size="md"
      >
        <EnquiryForm onSuccess={handleEnquirySuccess} />
      </Modal>
    </>
  );
};

export default HeroSection;
