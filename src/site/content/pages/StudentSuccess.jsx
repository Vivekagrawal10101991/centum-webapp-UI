import React from 'react';
import AchieversGrid from '../../components/specific/AchieversGrid';
import { TestimonialsSection } from '../../components/specific';

/**
 * Student Success Page
 * Displays success stories and parent testimonials.
 * UPDATED: Removed StatsSection ("Why Choose Centum") as per request.
 */
const StudentSuccess = () => {
  return (
    <div className="bg-white font-sans">
      {/* 1. Our Students' Achievements (Includes the black stats strip) */}
      <AchieversGrid />

      {/* 2. Parent Testimonials (Matches Figma "Parents Speak") */}
      <TestimonialsSection />
    </div>
  );
};

export default StudentSuccess;