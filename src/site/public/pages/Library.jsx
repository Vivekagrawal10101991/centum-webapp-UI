import React, { useState, useEffect, useRef } from 'react';
import usePageTitle from '../hooks/usePageTitle';
import { Search, FileText, Download, Calendar, X, Loader2, ChevronLeft, ChevronRight, Filter, ChevronDown } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { enquiryService } from '../../services/enquiryService';

// Premium Custom Dropdown Component
const CustomDropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between min-w-[170px] bg-white border ${isOpen ? 'border-purple-500 ring-4 ring-purple-50' : 'border-slate-200'} rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-400 cursor-pointer shadow-sm transition-all duration-200 group`}
      >
        <span className="truncate pr-3">
          {value === 'All' ? placeholder : value}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:text-purple-500 ${isOpen ? 'rotate-180 text-purple-600' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full min-w-[170px] mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top">
          <div className="max-h-64 overflow-y-auto custom-scrollbar p-1.5">
            {options.map((option) => (
              <div 
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-3 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-150 ${
                  value === option 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {option === 'All' ? placeholder : option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Library = () => {
  usePageTitle('Digital Library & Free Study Resources | Centum Academy');
  
  const [materials, setMaterials] = useState([]);
  const [masterPrograms, setMasterPrograms] = useState([]);
  const [masterCategories, setMasterCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Advanced Filters
  const [selectedProgram, setSelectedProgram] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  // --- Lead Capture State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materialsData, programsData, categoriesData] = await Promise.all([
          cmsService.getLibraryContents(),
          cmsService.getLibraryPrograms(),
          cmsService.getLibraryCategories()
        ]);
        
        setMaterials(materialsData || []);
        setMasterPrograms(programsData || []);
        setMasterCategories(categoriesData || []);
      } catch (error) {
        console.error("Failed to load library data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProgram, selectedCategory, selectedYear, searchQuery]);

  const programs = ['All', ...masterPrograms.map(p => p.name)];
  const categories = ['All', ...masterCategories.map(c => c.name)];
  const academicYears = ['All', ...new Set(materials.map(m => m.academicYear).filter(Boolean))];

  const filteredMaterials = materials.filter((material) => {
    const matchesProgram = selectedProgram === 'All' || material.program === selectedProgram;
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || material.academicYear === selectedYear;
    const matchesSearch = material.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProgram && matchesCategory && matchesYear && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getThumbnailByProgram = (program) => {
    switch(program?.toUpperCase()) {
      case 'JEE': return '🎓';
      case 'NEET': return '🧬';
      case 'FOUNDATION': return '🏗️';
      case 'OLYMPIAD': return '🏆';
      default: return '📚';
    }
  };

  // --- Download & Lead Logic ---
  const handleDownloadClick = (material) => {
    const isUnlocked = localStorage.getItem('centum_library_unlocked');
    
    if (isUnlocked === 'true') {
      window.open(material.fileUrl, '_blank');
    } else {
      setSelectedDoc(material);
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setLeadForm({ ...leadForm, [e.target.name]: e.target.value });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await enquiryService.submitEnquiry({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        city: leadForm.location,
        message: `Library Download Request: ${selectedDoc?.name} (${selectedDoc?.program})`
      });

      localStorage.setItem('centum_library_unlocked', 'true');
      setIsModalOpen(false);
      window.open(selectedDoc.fileUrl, '_blank');
      
    } catch (error) {
      console.error("Failed to submit lead data", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Premium Hero Section */}
      <div className="relative bg-[#0f172a] text-white py-24 overflow-hidden border-b border-slate-800">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-sm font-semibold mb-4 backdrop-blur-sm">
              Free Resources & Study Materials
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Potential</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 font-light">
              Access our comprehensive digital library containing premium notes, previous year papers, and expert-curated study guides.
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Filters Section - Sticky & Glassmorphism */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-slate-800 font-bold mr-2">
              <Filter className="h-5 w-5 text-purple-600" /> Filters:
            </div>
            
            {/* Replaced native <select> with Premium CustomDropdown */}
            <CustomDropdown 
              options={programs}
              value={selectedProgram}
              onChange={setSelectedProgram}
              placeholder="All Programs"
            />

            <CustomDropdown 
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="All Categories"
            />

            <CustomDropdown 
              options={academicYears}
              value={selectedYear}
              onChange={setSelectedYear}
              placeholder="All Years"
            />
          </div>
          
          {(selectedProgram !== 'All' || selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery !== '') && (
            <button 
              onClick={() => { setSelectedProgram('All'); setSelectedCategory('All'); setSelectedYear('All'); setSearchQuery(''); }}
              className="text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Materials Grid (Row Strips Layout) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Resources'}
          </h2>
          <p className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {filteredMaterials.length} {filteredMaterials.length === 1 ? 'Item' : 'Items'} Found
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading Library Contents...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {paginatedMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between group relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(126,58,242,0.12)] hover:border-purple-300"
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                  
                  <div className="flex flex-1 items-center gap-5 w-full mb-4 sm:mb-0">
                    <div className="w-16 h-16 rounded-2xl bg-purple-50 text-3xl flex items-center justify-center border border-purple-100 shadow-sm select-none flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                      {getThumbnailByProgram(material.program)}
                    </div>
                    
                    <div className="flex flex-col flex-1 min-w-0 pr-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          {material.program}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                          {material.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {material.academicYear}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-purple-700 transition-colors">
                        {material.name}
                      </h3>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex-shrink-0">
                    <button 
                      onClick={() => handleDownloadClick(material)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-50 hover:bg-purple-600 text-slate-700 hover:text-white py-2.5 px-6 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md border border-slate-200 hover:border-transparent"
                    >
                      <Download className="h-5 w-5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        currentPage === page 
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-200' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-purple-200 shadow-sm'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && filteredMaterials.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
              <span className="text-5xl opacity-50">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No resources found</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
              We couldn't find any study materials matching your current filters. Try adjusting your search criteria.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedProgram('All'); setSelectedCategory('All'); setSelectedYear('All'); }}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Lead Capture Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all animate-in zoom-in-95 duration-200 border border-slate-100">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 border border-purple-200 shadow-inner">
                <Download className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Unlock Material</h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">
                Enter your details to instantly download <span className="font-bold text-slate-900 bg-slate-100 px-1 rounded">"{selectedDoc?.name}"</span>. 
                You only need to do this once.
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input required type="text" name="name" value={leadForm.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-sm font-medium" placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input required type="email" name="email" value={leadForm.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-sm font-medium" placeholder="e.g. rahul@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                    <input required type="tel" name="phone" value={leadForm.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-sm font-medium" placeholder="9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">City</label>
                    <input required type="text" name="location" value={leadForm.location} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-sm font-medium" placeholder="Bangalore" />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-slate-900 hover:bg-purple-600 text-white py-4 px-4 rounded-xl font-bold transition-all disabled:opacity-70 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking File...</>
                    ) : (
                      'Unlock & Download'
                    )}
                  </button>
                </div>
                <p className="text-xs text-center text-slate-400 font-medium mt-4">
                  By downloading, you agree to receive academic updates.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;