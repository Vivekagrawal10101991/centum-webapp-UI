import HeroSection from '../components/specific/HeroSection';
import StatsSection from '../components/specific/StatsSection';
import TestimonialsSection from '../components/specific/TestimonialsSection';

/**
 * Home Page
 * Main landing page with hero, stats, and testimonials
 */
const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
