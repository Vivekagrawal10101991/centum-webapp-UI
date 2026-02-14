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

      {/* 3. DISCOVER YOUR PATH */}
      <CourseOfferings />

      {/* 4. EXPLORE ALL PROGRAMS */}
      <FeaturedCourses />

      {/* 5. OUR STUDENTS' ACHIEVEMENTS */}
      <AchieversGrid />

      {/* 6. WHAT PARENTS SAY ABOUT US - MOVED EXACTLY HERE */}
      <TestimonialsSection />

      {/* 7. STATS SECTION */}
      <StatsSection />

      {/* 8. EXPERT FACULTY */}
      <MentorsSection />

      {/* 9. FINAL CALL TO ACTION */}
      <CallToAction />

    </div>
  );
};

export default Home;