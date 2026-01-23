import React from 'react';
import { 
  HeroSection, 
  StatsSection, 
  TestimonialsSection,
  ToppersSection 
} from '../../components/specific';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Main Hero Banner */}
      <HeroSection />

      {/* Stats Section (4 Cards: Students, Success Rate, Faculty...) */}
      <StatsSection />

      {/* Toppers Section - Placed BELOW Stats Section as requested */}
      <ToppersSection />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default Home;