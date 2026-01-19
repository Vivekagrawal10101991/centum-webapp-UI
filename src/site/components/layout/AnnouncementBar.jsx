import { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';
import { cmsService } from '../../services/cmsService';

/**
 * Announcement Bar Component
 * Displays a ticker of announcements at the top of the page
 */
const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch announcements on mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await cmsService.getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [announcements.length]);

  if (!isVisible || loading || announcements.length === 0) {
    return null;
  }

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div className="bg-primary text-white py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center flex-1 justify-center">
          <Megaphone className="w-4 h-4 mr-2 flex-shrink-0" />
          <p className="text-sm font-medium animate-fade-in">
            {currentAnnouncement?.message || currentAnnouncement?.title}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 transition-colors ml-4"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
