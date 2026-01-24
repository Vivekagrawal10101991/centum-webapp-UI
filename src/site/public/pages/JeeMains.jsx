import React, { useState } from 'react';
import { 
  Target, 
  Clock, 
  CheckCircle, 
  TrendingUp, // Updated icon for Strategy/Confidence
  Brain,
  Download,
  FileText
} from 'lucide-react';
import Modal from '../../../components/common/Modal'; 
import EnquiryForm from '../../components/specific/EnquiryForm';

const JeeMains = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle PDF download
  const handleDownloadEligibility = () => {
    // In the future, replace this with the actual path to your PDF in the public folder
    alert("Eligibility PDF download started...");
  };

  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 overflow-hidden border-b border-primary-100">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0056D2 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100">
            Engineering Entrance
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
            JEE Mains Preparation
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Master the fundamentals with our NCERT-focused approach. Your first solid step towards NITs, IIITs, and JEE Advanced.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto opacity-90"></div>
        </div>
      </div>

      {/* ==================== KEY STATS ==================== */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center border-r border-secondary-100 last:border-0">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Exam Mode</p>
            <p className="text-primary-700 font-bold">Online (CBT)</p>
          </div>
          <div className="text-center border-r border-secondary-100 last:border-0">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Duration</p>
            <p className="text-primary-700 font-bold">3 Hours</p>
          </div>
          <div className="text-center border-r border-secondary-100 last:border-0">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Total Questions</p>
            <p className="text-primary-700 font-bold">90 (75 Attempt)</p>
          </div>
          <div className="text-center">
            <p className="text-secondary-500 text-xs font-bold uppercase tracking-wider mb-1">Max Marks</p>
            <p className="text-primary-700 font-bold">300 Marks</p>
          </div>
        </div>
      </div>

      {/* ==================== SUCCESS FORMULA ==================== */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Centum's Success Formula</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Our proven three-layer approach designed to maximize your potential.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Concept Mastery */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
              <Brain className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-3">Concept Mastery</h3>
            <p className="text-secondary-600 leading-relaxed font-light">
              We focus on building absolute clarity in fundamentals. Understanding the 'Why' behind every formula ensures you can tackle any twist in the question paper.
            </p>
          </div>

          {/* Card 2: Speed & Accuracy */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
              <Target className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-3">Speed & Accuracy</h3>
            <p className="text-secondary-600 leading-relaxed font-light">
              Special techniques for tricky JEE problems. Rigorous training on time management strategies to maximize your score within the time limit.
            </p>
          </div>

          {/* Card 3: Exam Strategy & Confidence (UPDATED) */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
              <TrendingUp className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-3">Exam Strategy & Confidence</h3>
            <p className="text-secondary-600 leading-relaxed font-light">
              Train with mocks, analytics, and personalised mentoring. We simulate the real exam environment to help you manage pressure and optimize your attempt strategy.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== EXAM PATTERN & ELIGIBILITY (STATIC) ==================== */}
      <div className="bg-white py-20 border-y border-secondary-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Exam Pattern (Stable) */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 text-primary-500 mr-2" />
                Standard Exam Pattern
              </h2>
              <div className="bg-secondary-50 rounded-2xl p-6 border border-secondary-200">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="font-semibold text-secondary-700">Physics</span>
                    <span className="text-sm text-secondary-500">MCQs + Numerical Value Qs</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="font-semibold text-secondary-700">Chemistry</span>
                    <span className="text-sm text-secondary-500">MCQs + Numerical Value Qs</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="font-semibold text-secondary-700">Mathematics</span>
                    <span className="text-sm text-secondary-500">MCQs + Numerical Value Qs</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <p className="text-xs text-secondary-500 italic">
                    *Pattern is subject to change by NTA. Numerical questions usually have internal choices.
                  </p>
                  <div className="mt-4 flex gap-4 text-sm">
                    <span className="flex items-center text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg">
                      <span className="mr-1">+4</span> Correct
                    </span>
                    <span className="flex items-center text-red-600 font-bold bg-red-50 px-3 py-1 rounded-lg">
                      <span className="mr-1">-1</span> Incorrect
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Eligibility Criteria (Document Download) */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-primary-500 mr-2" />
                Eligibility Criteria
              </h2>
              
              <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100 flex flex-col justify-center h-[calc(100%-3rem)]">
                <div className="mb-6">
                  <h4 className="font-bold text-secondary-900 mb-2">Detailed Eligibility Guidelines</h4>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    Eligibility criteria regarding age limit, number of attempts, and Year of Passing Class 12 are subject to regulations released by the National Testing Agency (NTA) for the current academic session.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-primary-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all" onClick={handleDownloadEligibility}>
                  <div className="flex items-center">
                    <div className="bg-red-50 p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary-900">Official Eligibility Information</p>
                      <p className="text-xs text-secondary-500">PDF Document • Updated Annually</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-primary-500 group-hover:scale-110 transition-transform" />
                </div>

                <p className="text-xs text-secondary-400 mt-4 text-center">
                  Click the card above to download the detailed brochure.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ==================== CTA SECTION ==================== */}
      <div className="container mx-auto px-4 mt-20 text-center">
        <div className="bg-primary-900 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full mix-blend-screen filter blur-3xl opacity-20 -ml-20 -mb-20"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Start Your Journey to a Top Engineering College
            </h2>
            <p className="text-primary-100 text-lg mb-8 font-light">
              Join Centum Academy's focused JEE Mains program. Small batches, expert faculty, and a proven track record.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={openModal}
                className="bg-white text-primary-900 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all shadow-lg transform hover:-translate-y-1"
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
        title="Enquire for JEE Mains"
      >
        <EnquiryForm onSuccess={closeModal} />
      </Modal>

    </div>
  );
};

export default JeeMains;