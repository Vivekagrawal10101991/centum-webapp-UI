import React from 'react';
import { Layers, Zap, Brain, CheckCircle } from 'lucide-react';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';

const FoundationCourses = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Foundation Courses
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Building a strong base for Class 8, 9 & 10 students. 
              Prepare early for JEE, NEET, NTSE, and Olympiads.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold border-none" size="lg">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Concept Clarity</h3>
            <p className="text-gray-600">
              Focus on fundamental concepts of Science and Mathematics to build a robust academic foundation.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Competitive Edge</h3>
            <p className="text-gray-600">
              Early exposure to competitive exam patterns like NTSE, KVPY, and Olympiads.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Analytical Skills</h3>
            <p className="text-gray-600">
              Development of logical reasoning and analytical thinking skills through specialized modules.
            </p>
          </div>
        </div>
      </div>

      {/* Course Structure */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Programs Available</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              "Class 8th Foundation",
              "Class 9th Advanced Foundation",
              "Class 10th Board + NTSE",
              "Math Olympiad (RMO/INMO)",
              "Science Olympiad (NSEJS)",
              "Mental Ability Workshops"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationCourses;