import React from 'react';
import { Target, Clock, BookOpen, CheckCircle } from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';

const JeeMains = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">JEE MAINS</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Master the fundamentals. Ace the exam. Your first step towards NITs and IIITs.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold border-none" size="lg">Enquire Now</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={Target} title="NCERT Focused" desc="Deep coverage of NCERT syllabus which forms the core of JEE Mains." />
          <FeatureCard icon={Clock} title="Speed & Accuracy" desc="Intensive training to improve question solving speed and reduce negative marking." />
          <FeatureCard icon={BookOpen} title="Previous Years" desc="Systematic solving of last 10 years' JEE Mains papers." />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default JeeMains;