import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const DownloadBrochureButton = () => {
  const [brochureUrl, setBrochureUrl] = useState(null);

  useEffect(() => {
    const fetchDynamicBrochure = async () => {
      try {
        // Fetch files from your backend storage controller
        const response = await api.get('/api/tech/storage/list');
        const files = response.data;
        
        // Find all PDFs
        const pdfs = files.filter(f => f.toLowerCase().endsWith('.pdf'));
        
        if (pdfs.length > 0) {
          // Assume the most recently uploaded PDF (last in the array) is the active one
          setBrochureUrl(pdfs[pdfs.length - 1]);
        } else {
          // Fallback to local if no PDFs in Supabase
          setBrochureUrl("/Centum Brochure  2025-2026.pdf");
        }
      } catch (error) {
        console.warn("Could not fetch dynamic brochure, using local fallback.", error);
        // Fallback to local if the API is secured/unreachable for public users
        setBrochureUrl("/Centum Brochure  2025-2026.pdf");
      }
    };

    fetchDynamicBrochure();
  }, []);

  // Hide the button entirely while checking, to prevent broken links
  if (!brochureUrl) return null;

  return (
    <a
      href={brochureUrl} 
      target="_blank"
      rel="noopener noreferrer"
      download="Centum_Academy_Brochure.pdf"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-red-600 text-white py-4 px-2.5 rounded-l-md shadow-2xl hover:bg-red-700 hover:pr-4 transition-all duration-300 flex items-center justify-center font-semibold tracking-wider cursor-pointer"
      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      title="Download Brochure"
    >
      <span className="flex items-center gap-2">
        Download Brochure
        {/* Download Icon rotated to match the vertical text */}
        <svg 
          className="w-5 h-5 rotate-90" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </span>
    </a>
  );
};

export default DownloadBrochureButton;