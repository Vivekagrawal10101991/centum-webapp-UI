import React, { useState } from 'react';
import { createPortal } from 'react-dom'; // ✅ NEW: Imported createPortal
import { Download, X, Loader2 } from 'lucide-react';
import enquiryService from '../../services/enquiryService';

const DownloadBrochureButton = ({ isFixed = true, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    studentName: '',
    phoneNumber: '',
    email: '',
    courseInterest: 'Brochure Download', 
    message: 'Requested Brochure Download'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Save data to database via API
      await enquiryService.submitEnquiry(formData);
      
      // 2. Trigger Brochure Download
      const link = document.createElement('a');
      link.href = '/brochure.pdf'; // Ensure your actual brochure PDF is in the public folder
      link.download = 'Centum_Academy_Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Show success state and auto-close
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({ studentName: '', phoneNumber: '', email: '', courseInterest: 'Brochure Download', message: 'Requested Brochure Download' });
      }, 3000);
    } catch (error) {
      console.error("Failed to save enquiry:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const buttonClasses = isFixed
    ? `fixed right-0 top-[45%] -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 text-sm rounded-r-xl shadow-2xl z-40 transition-transform transform hover:-translate-x-1 flex items-center gap-2 [writing-mode:vertical-rl] rotate-180 cursor-pointer ${className}`
    : `bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer w-fit ${className}`;

  const iconClasses = isFixed ? "h-4 w-4 mb-2 rotate-90" : "h-5 w-5";

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={buttonClasses}>
        <Download className={iconClasses} />
        Download Brochure
      </button>

      {/* ✅ FIX: Wrapped the modal in createPortal to teleport it to document.body. Also bumped z-index to 9999 so it covers the Navbar */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-fade-in-up" style={{ animation: "fadeIn 0.3s ease-out" }}>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="p-8">
              <h3 className="text-2xl font-extrabold text-[#27295c] mb-2 font-display">Download Brochure</h3>
              <p className="text-slate-600 mb-6 text-sm font-medium">
                Please enter your details to receive the complete Centum Academy academic brochure.
              </p>

              {success ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center font-bold border border-green-200">
                  Thank you! Your brochure is downloading...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm"
                      placeholder="+91 xxxxx xxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#27295c] hover:bg-indigo-900 text-white font-bold py-3 rounded-lg transition-colors mt-2 flex justify-center items-center gap-2 shadow-md"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                    {loading ? "Processing..." : "Download Now"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DownloadBrochureButton;