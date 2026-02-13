import React from 'react';

// Standard exports
import { 
  HeroSection, 
  StatsSection, 
  TestimonialsSection,
  MentorsSection 
} from '../../components/specific';

// Direct imports for specific sections
import { CourseOfferings } from '../../components/specific/CourseOfferings';
import { CallToAction } from '../../components/specific/CallToAction';
import EducationWithEmotion from '../../components/specific/EducationWithEmotion';
import FeaturedCourses from '../../components/specific/FeaturedCourses';
import AchieversGrid from '../../components/specific/AchieversGrid';

const Home = () => {
  return (
    <div className="flex flex-col gap-0 bg-white font-sans overflow-x-hidden">
      
      {/* 1. HERO CAROUSEL */}
      <HeroSection />

      {/* 2. EDUCATION WITH EMOTION */}
      <EducationWithEmotion />

      {/* 3. DISCOVER YOUR PATH (Program Categories & Highlights) */}
      <CourseOfferings />

      {/* 4. EXPLORE ALL PROGRAMS (6 Cards & Counseling Banner) */}
      <FeaturedCourses />

      {/* 5. SUCCESS STORIES MARQUEE (Moved up to be exactly here!) */}
      <AchieversGrid />

      {/* 6. STATS SECTION (Why Choose Centum Academy) */}
      <StatsSection />

      {/* 7. EXPERT FACULTY */}
      <MentorsSection />

      {/* 8. PARENT TESTIMONIALS (Community Voice) */}
      <TestimonialsSection />

      {/* 9. FINAL CALL TO ACTION */}
      <CallToAction />

    </div>
  );
};

export default Home;