import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cmsService } from '../../services/cmsService';

/**
 * SuccessStoriesVideos Component
 * Fetches and displays YouTube video success stories from the CMS database.
 * UPDATED: Added pagination (Show 6 initially) and professional refined card styling.
 */
const SuccessStoriesVideos = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await cmsService.getStories();
        setStories(data || []);
      } catch (error) {
        console.error("Failed to fetch success stories videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Helper to extract YouTube ID from various YouTube URL formats
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If there are no videos uploaded in the admin panel, hide the section entirely
  if (stories.length === 0) return null;

  const visibleStories = stories.slice(0, visibleCount);
  const hasMore = visibleCount < stories.length;

  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden border-t border-slate-200">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3 block">
            Video Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Achievers</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            Watch our students share their personal journeys, their preparation strategies, and how Centum Academy helped them conquer their dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleStories.map((story) => {
            const videoId = getYoutubeId(story.videoUrl);
            if (!videoId) return null;

            return (
              <div 
                key={story.id} 
                className="bg-white rounded-[1rem] shadow-sm hover:shadow-xl border border-slate-200/70 overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Video Container */}
                <div className="aspect-video relative bg-slate-900 w-full border-b border-slate-100">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title={story.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Content Container */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-slate-800 mb-2 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                    {story.title}
                  </h3>
                  {story.description && (
                    <p className="text-slate-500 text-[13px] line-clamp-3 leading-relaxed mt-auto">
                      {story.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-sm active:scale-95"
            >
              Explore More 
              <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStoriesVideos;