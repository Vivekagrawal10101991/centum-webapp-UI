import React from 'react';
import { Heart, Activity, Microscope, CheckCircle } from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';

const NeetCourses = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Preparation
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Your pathway to becoming a doctor. Expert guidance for Physics, Chemistry, and Biology
              to help you crack NEET with top ranks.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold border-none" size="lg">
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">NCERT Focus</h3>
            <p className="text-gray-600">
              Strict adherence to NCERT curriculum with in-depth analysis and application-based learning.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Rigorous Testing</h3>
            <p className="text-gray-600">
              Weekly tests and cumulative assessments to improve speed and accuracy for the exam day.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Expert Faculty</h3>
            <p className="text-gray-600">
              Learn from doctors and subject matter experts with years of experience in medical coaching.
            </p>
          </div>
        </div>
      </div>

      {/* Course Structure */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Course Offerings</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              "Two Year Classroom Program (11th & 12th)",
              "One Year Dropper Batch",
              "Crash Course Series",
              "Biology Masterclass",
              "Physics Numerical Workshop",
              "Chemistry Reaction Mechanism"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeetCourses;