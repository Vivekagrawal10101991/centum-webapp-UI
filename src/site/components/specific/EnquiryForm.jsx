import React, { useState } from 'react';
import { X, Mail, User, Phone, CheckCircle, Loader2, Sparkles } from 'lucide-react';

const EnquiryForm = ({ onClose }) => {
  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 to-emerald-500"></div>
          <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Request Received!</h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Your enquiry is being processed. An advisor will contact you within 24 hours to discuss your academic path.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registration ID</p>
             <p className="text-xl font-black text-purple-600">CENT-2026-X892</p>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 transition-all shadow-lg"
          >
            Close Window
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] p-10 md:p-14 max-w-2xl w-full relative shadow-2xl my-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 h-10 w-10 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Enquire Now</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Your Path to <span className="text-purple-600">Success</span></h2>
          <p className="text-slate-500 font-medium">Fill in your details for a personalized academic consultation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Student Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input required type="text" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900" placeholder="Aarav Sharma" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input required type="email" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900" placeholder="aarav@example.com" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contact Phone</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input required type="tel" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900" placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Program</label>
              <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-900 appearance-none cursor-pointer">
                <option>JEE Preparation</option>
                <option>NEET Preparation</option>
                <option>Foundation (8-10)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-slate-900 hover:bg-purple-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Request Enrollment Info"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EnquiryForm;