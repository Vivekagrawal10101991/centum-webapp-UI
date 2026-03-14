import React from 'react';
import usePageTitle from '../../public/hooks/usePageTitle';
import AchieversGrid from '../../components/specific/AchieversGrid';
import { TestimonialsSection } from '../../components/specific';
import SuccessStoriesVideos from '../../components/specific/SuccessStoriesVideos';

/**
 * Student Success Page
 * Displays success stories and parent testimonials.
 * UPDATED: Added SuccessStoriesVideos section above Testimonials.
 */
const StudentSuccess = () => {
  usePageTitle('Student Success Stories & Testimonials | Centum Academy');
  return (
    <div className="bg-white font-sans">
      {/* 1. Our Students' Achievements (Includes the black stats strip) */}
      <AchieversGrid />

      {/* 2. Success Stories YouTube Videos (Fetched from DB) */}
      <SuccessStoriesVideos />

      {/* 3. Parent Testimonials (Matches Figma "Parents Speak") */}
      <TestimonialsSection />
    </div>
  );
};

export default StudentSuccess;