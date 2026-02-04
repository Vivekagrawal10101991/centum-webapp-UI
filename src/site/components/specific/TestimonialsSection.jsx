import { useState, useEffect, useCallback } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Heart, 
  UserCircle2, 
  Sparkles 
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';

/**
 * TestimonialsSection Component
 * Enhanced with auto-sliding, infinite loop, and decorative background icons.
 */
const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await cmsService.getTestimonials();
        // Filter only published testimonials
        const publishedData = Array.isArray(data) ? data.filter(t => t.published !== false) : [];
        setTestimonials(publishedData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-sliding logic
  useEffect(() => {
    let interval;
    if (isAutoPlaying && testimonials.length > 0) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length, nextTestimonial]);

  if (loading || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#f8faff] overflow-hidden relative">
      
      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <div className="absolute top-20 left-10 text-blue-100 opacity-20 rotate-12 animate-float hidden lg:block">
        <MessageCircle size={120} />
      </div>
      <div className="absolute bottom-20 right-10 text-indigo-100 opacity-20 -rotate-12 animate-float-delayed hidden lg:block">
        <Quote size={150} />
      </div>
      <div className="absolute top-1/2 left-1/4 text-purple-100 opacity-10 animate-pulse">
        <Heart size={40} />
      </div>
      <div className="absolute top-1/3 right-1/4 text-yellow-100 opacity-20 animate-bounce">
        <Sparkles size={30} />
      </div>

      <div className="max-container px-4 relative z-10">
        
        {/* Updated Heading based on your request */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
            Explore Genuine Feedback
          </h2>
          <div className="relative inline-block">
            <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif tracking-wide">
              from Happy Parents
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full w-1/2 mx-auto shadow-sm"></div>
          </div>
          <p className="text-gray-500 text-lg mt-8 font-medium max-w-2xl mx-auto leading-relaxed">
            Education with emotion. Discover why parents trust Centum Academy 
            for their children's academic excellence and future success.
          </p>
        </div>

        {/* Enhanced UI Card with Pause on Hover */}
        <div 
          className="max-w-4xl mx-auto relative group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_20px_60px_rgba(79,70,229,0.08)] border border-blue-50 relative overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(79,70,229,0.12)]">
            
            {/* Inner background highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -z-0"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              
              {/* Star Rating */}
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < (current.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                  />
                ))}
              </div>

              {/* Message with smooth fade animation class */}
              <div className="relative mb-10 px-4 md:px-10 min-h-[120px] flex items-center justify-center">
                <Quote className="absolute -top-6 -left-4 w-12 h-12 text-indigo-500/10" />
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic transition-opacity duration-500">
                  "{current.message || current.content}"
                </p>
                <Quote className="absolute -bottom-6 -right-4 w-12 h-12 text-indigo-500/10 rotate-180" />
              </div>

              {/* Author Info */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-4 p-1 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-2xl shadow-lg">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-indigo-600 text-2xl font-bold">
                    {current.image ? (
                        <img src={current.image} alt={current.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <UserCircle2 className="w-12 h-12 opacity-80" />
                    )}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-[#1e1b4b] uppercase tracking-wider">
                  {current.name}
                </h4>
                <p className="text-indigo-600 text-sm font-semibold mt-1">
                    {current.designation || "Proud Parent"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls - Visible on Hover */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-14 h-14 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-xl border border-gray-50 hover:bg-indigo-600 hover:text-white transition-all active:scale-90 z-20 opacity-0 group-hover:opacity-100"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-14 h-14 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-xl border border-gray-50 hover:bg-indigo-600 hover:text-white transition-all active:scale-90 z-20 opacity-0 group-hover:opacity-100"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Progress Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-12 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                    ? 'bg-indigo-600 w-12 shadow-[0_0_10px_rgba(79,70,229,0.4)]' 
                    : 'bg-gray-300 w-2.5 hover:bg-indigo-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;