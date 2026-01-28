import React, { useState } from 'react';

// --- IMPORTING IMAGES ---
// Note: Ensure these images exist in your assets folder as they were used in About.jsx
import tusharImg from '../../../assets/About/Tushar Sinha.png';
import dheerajImg from '../../../assets/About/Dheeraj Singh.png';
import akhilImg from '../../../assets/About/Akhil Kumar.png';

// --- MENTOR CARD COMPONENT ---
const MentorCard = ({ name, degree, college, shortBio, fullBio, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_15px_30px_rgb(0,0,0,0.08)] hover:border-blue-200 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
      <div className="h-72 bg-gradient-to-b from-blue-50 via-blue-50/30 to-white relative flex items-end justify-center pt-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/40 to-transparent"></div>
        <img 
          src={image} 
          alt={name} 
          className="h-full w-auto object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105 relative z-10"
        />
      </div>
      <div className="p-8 text-center flex flex-col flex-grow relative z-10 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{name}</h3>
        <p className="text-blue-600 text-sm font-bold uppercase tracking-wide mb-4">{degree}</p>
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-bold text-gray-600 uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors shadow-sm">
            {college}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow transition-all duration-300 font-light">
          {isExpanded ? fullBio : shortBio}
        </p>
        <div className="mt-auto">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center text-gray-900 font-bold text-sm hover:text-blue-600 transition-colors group/btn"
          >
            {isExpanded ? "Read Less" : "Read More"}
            <span className={`ml-2 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-300 transform ${isExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MentorsSection = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Styled to match Home Page Aesthetics */}
        <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Meet Our
            </h2>
            <div className="relative inline-block">
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif tracking-wide">
                Expert Mentors
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full w-1/2 mx-auto shadow-sm"></div>
            </div>
            <p className="text-gray-500 text-lg mt-6 font-medium max-w-xl mx-auto">
                Learn directly from those who have cracked the toughest exams.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <MentorCard 
            image={tusharImg}
            name="Tushar Sinha"
            degree="B.Tech & M.Tech"
            college="IIT Kharagpur"
            shortBio="Tushar is an IIT Kharagpur alumnus in Mechanical & Manufacturing Systems. With experience in AI and Robotics research..."
            fullBio="Tushar is an IIT Kharagpur alumnus in Mechanical & Manufacturing Systems. With experience in AI and Robotics research and industry exposure in manufacturing, he followed his passion for teaching. Today, he leads a team dedicated to simplifying learning for school students."
          />
          <MentorCard 
            image={dheerajImg}
            name="Dheeraj Singh"
            degree="B.Tech & M.Tech"
            college="IIT Bombay"
            shortBio="Dheeraj, an IIT Bombay graduate and former Lead Analyst at Honeywell, combines academic brilliance with corporate expertise."
            fullBio="Dheeraj, an IIT Bombay graduate and former Lead Analyst at Honeywell, combines academic brilliance with corporate expertise. He is passionate about Physics, making it relatable to daily life through engaging examples. His mission: help students develop strong problem-solving skills using advanced visualisation techniques."
          />
          <MentorCard 
            image={akhilImg}
            name="Akhil Kumar"
            degree="B.Tech & M.Tech"
            college="IIT Kharagpur"
            shortBio="Akhil is an IIT Kharagpur alumnus in Electrical Engineering. With professional experience in Austin, Texas..."
            fullBio="Akhil is an IIT Kharagpur alumnus in Electrical Engineering. With professional experience in Austin, Texas, he left a promising corporate career to pursue his vision: “Padhega India, Badhega India.” An ardent lover of Mathematics, he is dedicated to making math accessible, enjoyable, and deeply impactful for every student."
          />
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;