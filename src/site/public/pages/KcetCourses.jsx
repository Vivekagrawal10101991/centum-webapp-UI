import React from 'react';
import { Award, MapPin, BookOpen } from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';

const KcetCourses = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">KCET Coaching</h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Secure your seat in Karnataka's top engineering colleges. Specialized state-syllabus focused training.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-purple-700 hover:bg-purple-50 font-bold border-none" size="lg">Enquire Now</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={MapPin} title="State Focused" desc="Curriculum aligned strictly with Karnataka PU Board syllabus." />
          <FeatureCard icon={Award} title="Rank Booster" desc="Strategies to maximize score in minimum time for top ranks." />
          <FeatureCard icon={BookOpen} title="Mock Tests" desc="Regular full-length mock tests based on actual KCET patterns." />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default KcetCourses;