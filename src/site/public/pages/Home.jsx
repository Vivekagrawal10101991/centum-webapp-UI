import React from 'react';
import { 
  HeroSection, 
  StatsSection, 
  ToppersSection, 
  TestimonialsSection,
  MentorsSection 
} from '../../components/specific';

// These components are derived from your Figma codebase to ensure exact styling
import { CourseOfferings } from '../../components/specific/CourseOfferings';
import { CallToAction } from '../../components/specific/CallToAction';
import AchieversGrid from '../../components/specific/AchieversGrid';

/**
 * FULLY UPDATED HOME PAGE
 * Matches the exact sequence and design logic of the Centum Academy Figma export.
 */
const Home = () => {
  return (
    <div className="flex flex-col gap-0 bg-white font-sans overflow-x-hidden">
      {/* 1. HERO CAROUSEL: High-impact entrance with dynamic slides (Figma: HeroCarousel.tsx) */}
      <HeroSection />

      {/* 2. RESULTS BANNER: Hall of Fame infinite scroll for social proof (Figma: ResultsBanner.tsx) */}
      <ToppersSection />

      {/* 3. PROGRAM OFFERINGS: Category-based discovery hub for JEE, NEET, and Foundation (Figma: CourseOfferings.tsx) */}
      <CourseOfferings />

      {/* 4. STATISTICS: Animated achievement metrics using modern grid layout (Figma: Statistics.tsx) */}
      <StatsSection />

      {/* 5. FACULTY: Authority section highlighting IIT/AIIMS alumni mentors (Figma: Faculty.tsx) */}
      <MentorsSection />

      {/* 6. ACHIEVERS GRID: Detailed student profiles and success stories (Figma: StudentProfiles.tsx) */}
      <AchieversGrid />

      {/* 7. PARENT TESTIMONIALS: Auto-scrolling horizontal feedback carousel (Figma: ParentTestimonials.tsx) */}
      <TestimonialsSection />

      {/* 8. CALL TO ACTION: The final conversion engine with animated background elements (Figma: CallToAction.tsx) */}
      <CallToAction />
    </div>
  );
};

export default Home;