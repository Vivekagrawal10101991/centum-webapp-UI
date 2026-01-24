import React, { useState } from 'react';
import { 
  Atom, 
  Brain, 
  Zap, 
  TrendingUp, 
  FileText,
  Download,
  AlertTriangle
} from 'lucide-react';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal'; 
import EnquiryForm from '../../components/specific/EnquiryForm';

const JeeAdvance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle PDF download
  const handleDownloadEligibility = () => {
    // Replace with actual file link later
    alert("JEE Advanced Eligibility PDF download started...");
  };

  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 overflow-hidden border-b border-primary-100">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0056D2 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100">
            IIT Entrance
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
            JEE Advanced <span className="text-primary-600">Mastery</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Deep dive into advanced concepts, analytical problem solving, and rigorous testing for the world's toughest engineering exam.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto opacity-90"></div>
        </div>
      </div>

      {/* ==================== KEY STATS ==================== */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center border-r border-secondary-100 last:border-0">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Exam Mode</p>
            <p className="text-primary-700 font-bold">CBT (Online)</p>
          </div>
          <div className="text-center border-r border-secondary-100 last:border-0">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Papers</p>
            <p className="text-primary-700 font-bold">Paper 1 & 2</p>
          </div>
          <div className="text-center border-r border-secondary-100 last:border-0">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Total Duration</p>
            <p className="text-primary-700 font-bold">6 Hours</p>
          </div>
          <div className="text-center">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Selection</p>
            <p className="text-primary-700 font-bold">Top Rankers</p>
          </div>
        </div>
      </div>

      {/* ==================== CENTUM'S STRATEGY (Orange Theme) ==================== */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Centum's Advanced Strategy</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            We move beyond standard coaching to develop "First Principles" thinking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
              <Atom className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-3">Multi-Concept Problems</h3>
            <p className="text-secondary-600 leading-relaxed font-light">
              JEE Advanced rarely asks direct questions. We train you to connect dots between Mechanics and Electromagnetism, or Calculus and Coordinate Geometry.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 group">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
              <Brain className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-3">Analytical Thinking</h3>
            <p className="text-secondary-600 leading-relaxed font-light">
              Rote learning fails here. Our "Thinking Classrooms" encourage you to derive solutions from scratch, ensuring you can handle new, unseen problems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-xl hover:border-rose-200 transition-all duration-300 group">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500 transition-colors">
              <TrendingUp className="w-7 h-7 text-rose-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-3">Rigorous Testing</h3>
            <p className="text-secondary-600 leading-relaxed font-light">
              6-hour marathon mock tests simulated on actual TCS-iON interface. We accustom your brain to maintain peak performance during the 5th and 6th hour.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== EXAM INFO & ELIGIBILITY (STATIC) ==================== */}
      <div className="bg-white py-20 border-y border-secondary-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Exam Pattern (Dynamic Disclaimer) */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 text-orange-500 mr-2" />
                Exam Pattern
              </h2>
              <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
                <p className="text-sm text-secondary-600 mb-4 italic">
                  *The pattern changes every year to test adaptability. Common types include:
                </p>
                <div className="space-y-3">
                  {[
                    "One or More Correct Options (Partial Marking)",
                    "Numerical Value Type (Decimal/Integer)",
                    "Matching Lists (Matrix Match)",
                    "Paragraph Based Comprehension",
                    "Stem Questions (Linked Comprehension)"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-xl shadow-sm border border-orange-100/50">
                      <Zap className="w-4 h-4 text-orange-500 mr-3" />
                      <span className="font-medium text-secondary-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-orange-200">
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center text-secondary-700 font-bold bg-white px-3 py-1 rounded-lg border border-orange-100">
                      Paper 1 (Morning)
                    </span>
                    <span className="flex items-center text-secondary-700 font-bold bg-white px-3 py-1 rounded-lg border border-orange-100">
                      Paper 2 (Afternoon)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Eligibility Criteria (Document Download) */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
                Eligibility Criteria
              </h2>
              
              <div className="bg-secondary-50 p-8 rounded-2xl border border-secondary-200 flex flex-col justify-center h-[calc(100%-3rem)]">
                <div className="mb-6">
                  <h4 className="font-bold text-secondary-900 mb-2">Important Requirements</h4>
                  <ul className="space-y-3 text-secondary-700 text-sm mb-6">
                    <li>• Must be among the top successful candidates in JEE Main (approx. top 2.5 Lakhs).</li>
                    <li>• Should have appeared for Class 12 (or equivalent) for the first time in the previous or current year.</li>
                  </ul>
                  <p className="text-secondary-600 text-sm leading-relaxed italic">
                    Note: Detailed criteria regarding Age Limit, Attempt Limit, and Foreign Nationals are subject to the conducting IIT's brochure.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-secondary-200 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all" onClick={handleDownloadEligibility}>
                  <div className="flex items-center">
                    <div className="bg-orange-50 p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary-900">Download Information Brochure</p>
                      <p className="text-xs text-secondary-500">Official Rules & Regulations</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ==================== CTA SECTION ==================== */}
      <div className="container mx-auto px-4 mt-20 text-center">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -ml-20 -mb-20"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready for the Ultimate Challenge?
            </h2>
            <p className="text-gray-300 text-lg mb-8 font-light">
              Join the league of top rankers. Our Advanced batch starts soon.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={openModal}
                className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg transform hover:-translate-y-1"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MODAL ==================== */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Enquire for JEE Advanced"
      >
        <EnquiryForm onSuccess={closeModal} />
      </Modal>

    </div>
  );
};

export default JeeAdvance;