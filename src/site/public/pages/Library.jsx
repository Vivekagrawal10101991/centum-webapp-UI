import React, { useState, useEffect } from 'react';
import usePageTitle from '../hooks/usePageTitle';
import { Search, FileText, Download, Calendar, X, Loader2 } from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { enquiryService } from '../../services/enquiryService';

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
    // Check if the user has already unlocked downloads in this browser
    const isUnlocked = localStorage.getItem('centum_library_unlocked');
    
    if (isUnlocked === 'true') {
      // Direct download if already verified
      window.open(material.fileUrl, '_blank');
    } else {
      // Open modal if not verified
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
      // Submit data to your backend
      await enquiryService.submitEnquiry({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        city: leadForm.location, // Mapped to city, adjust if your backend expects 'location'
        message: `Library Download Request: ${selectedDoc?.name} (${selectedDoc?.program})`
      });

      // Save success token in local storage so they don't have to fill it out again
      localStorage.setItem('centum_library_unlocked', 'true');
      
      // Close modal and trigger the download
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#7E3AF2] to-[#6C2BD9] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-black mb-4">📚 Digital Library</h1>
            <p className="text-xl text-white/90 mb-8">
              Access comprehensive study materials, previous year papers, sample papers, and expert notes.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search by material name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg text-slate-900 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 items-center">
          <span className="font-bold text-slate-700 mr-2">Filters:</span>
          
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 font-medium mb-1">Program</label>
            <select 
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#7E3AF2] cursor-pointer"
            >
              {programs.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 font-medium mb-1">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#7E3AF2] cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-slate-500 font-medium mb-1">Academic Year</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#7E3AF2] cursor-pointer"
            >
              {academicYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          
          <div className="ml-auto mt-4 md:mt-0">
             <button 
                onClick={() => { setSelectedProgram('All'); setSelectedCategory('All'); setSelectedYear('All'); setSearchQuery(''); }}
                className="text-sm font-bold text-[#7E3AF2] hover:underline"
              >
                Clear Filters
             </button>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredMaterials.length}</span> materials
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7E3AF2]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#7E3AF2] p-6 transition-all hover:shadow-xl group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl select-none">{getThumbnailByProgram(material.program)}</div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#7E3AF2]">
                    {material.program}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-[#7E3AF2] transition-colors line-clamp-2">
                  {material.name}
                </h3>

                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span>{material.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Year: {material.academicYear}</span>
                  </div>
                </div>

                {/* Changed from <a> tag to <button> to trigger lead form check */}
                <button 
                  onClick={() => handleDownloadClick(material)}
                  className="w-full flex items-center justify-center gap-2 bg-[#7E3AF2] hover:bg-[#6C2BD9] text-white py-2.5 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="h-4 w-4" />
                  Download Material
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMaterials.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No materials found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedProgram('All'); setSelectedCategory('All'); setSelectedYear('All'); }}
              className="px-6 py-2 bg-[#7E3AF2] hover:bg-[#6C2BD9] text-white rounded-xl font-bold transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Lead Capture Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8">
              <div className="w-12 h-12 bg-purple-100 text-[#7E3AF2] rounded-xl flex items-center justify-center mb-5">
                <Download className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Unlock Study Material</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Enter your details below to download <span className="font-semibold text-slate-800">"{selectedDoc?.name}"</span>. 
                You will only need to do this once.
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required type="text" name="name" value={leadForm.name} onChange={handleInputChange} className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#7E3AF2] text-sm" placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input required type="email" name="email" value={leadForm.email} onChange={handleInputChange} className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#7E3AF2] text-sm" placeholder="e.g. rahul@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={leadForm.phone} onChange={handleInputChange} className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#7E3AF2] text-sm" placeholder="e.g. 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location / City</label>
                  <input required type="text" name="location" value={leadForm.location} onChange={handleInputChange} className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#7E3AF2] text-sm" placeholder="e.g. Bangalore" />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-[#7E3AF2] hover:bg-[#6C2BD9] text-white py-3 px-4 rounded-xl font-bold transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking...</>
                    ) : (
                      'Download Now'
                    )}
                  </button>
                </div>
                <p className="text-xs text-center text-slate-500 mt-4">
                  By downloading, you agree to receive academic updates from Centum Academy.
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