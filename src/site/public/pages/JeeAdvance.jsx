import React from 'react';
import { Zap, Brain, TrendingUp } from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';

const JeeAdvance = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">JEE ADVANCE</h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            For the ambitious. Rigorous training for the toughest engineering entrance in the world.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-orange-700 hover:bg-orange-50 font-bold border-none" size="lg">Enquire Now</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={Brain} title="Deep Concepts" desc="Going beyond formulas to understand the physics and logic behind every problem." />
          <FeatureCard icon={Zap} title="Complex Problems" desc="Training on multi-concept problems that are typical of JEE Advanced." />
          <FeatureCard icon={TrendingUp} title="All India Level" desc="Competitor analysis against top brains across the country." />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default JeeAdvance;