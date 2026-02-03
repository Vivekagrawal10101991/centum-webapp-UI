import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Pin, 
  ChevronRight,
  Search,
  Loader2,
  BellRing
} from 'lucide-react';
import Button from '../../../components/common/Button';
// 1. UPDATED: Import useLocation
import { Link, useLocation } from 'react-router-dom';
import { cmsService } from '../../services/cmsService';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 2. UPDATED: Hook to access navigation state
  const location = useLocation();

  // --- FETCH REAL DATA ---
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getAnnouncements();
        const activeData = (Array.isArray(data) ? data : [])
          .filter(item => item.active)
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        
        setAnnouncements(activeData);
      } catch (error) {
        console.error("Failed to load announcements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // 3. UPDATED: Scroll to specific announcement if targetId exists
  useEffect(() => {
    if (!loading && announcements.length > 0 && location.state?.targetId) {
      const targetId = location.state.targetId;
      const element = document.getElementById(`announcement-${targetId}`);
      
      if (element) {
        // Wait a brief moment for layout to settle
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a temporary ring effect for visual feedback
          element.classList.add('ring-4', 'ring-primary-400/50');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-primary-400/50');
          }, 2000);
        }, 300);
      }
    }
  }, [loading, announcements, location.state]);

  const filteredList = announcements.filter(item => {
    const itemType = item.type || 'Info';
    const matchesFilter = filter === 'all' || itemType.toLowerCase() === filter.toLowerCase();
    const matchesSearch = (item.message || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pinnedItems = filteredList.filter(item => (item.type || '').toLowerCase() === 'exam update').slice(0, 1);
  const regularItems = filteredList.filter(item => !pinnedItems.includes(item));

  // --- STYLING HELPERS ---
  const getCategoryTheme = (type) => {
    const typeLower = (type || '').toLowerCase();
    switch (typeLower) {
      case 'admission': return { color: 'emerald', hex: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
      case 'schedule': return { color: 'orange', hex: '#f97316', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
      case 'event': return { color: 'purple', hex: '#8b5cf6', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
      case 'exam update': return { color: 'red', hex: '#ef4444', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      default: return { color: 'blue', hex: '#3b82f6', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    }
  };

  // --- DATE BOX COMPONENT ---
  const DateBox = ({ dateStr, theme }) => {
    const date = new Date(dateStr || Date.now());
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

    return (
      <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border ${theme.border} ${theme.bg} flex-shrink-0 shadow-sm`}>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.text}`}>{month}</span>
        <span className={`text-xl font-extrabold ${theme.text} leading-none`}>{day}</span>
      </div>
    );
  };

  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 overflow-hidden border-b border-primary-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[10px] font-bold text-primary-700 bg-white/80 rounded-full uppercase tracking-widest shadow-sm border border-primary-100 backdrop-blur-sm">
            <BellRing className="w-3 h-3" /> Official News
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 tracking-tight mb-4">
            Announcements & Updates
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Keep track of exam dates, schedule changes, and upcoming events at Centum.
          </p>
        </div>
      </div>

      {/* ==================== SEARCH & FILTERS ==================== */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 mb-12">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-1/2 group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search updates..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-secondary-200 bg-secondary-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Exam Update', 'Schedule', 'Event', 'Admission'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat === 'All' ? 'all' : cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                  (filter === 'all' && cat === 'All') || filter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20'
                    : 'bg-white text-secondary-600 border-secondary-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
            <p className="text-secondary-500 font-medium">Fetching updates...</p>
          </div>
        ) : (
          <>
            {/* ==================== PINNED ITEM (FEATURED) ==================== */}
            {pinnedItems.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600">
                    <Pin className="w-5 h-5 fill-current" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary-900">Latest Exam Update</h2>
                </div>
                
                {pinnedItems.map((item) => (
                  <div 
                    key={item.id} 
                    // 4. UPDATED: Add ID for scrolling
                    id={`announcement-${item.id}`}
                    className="relative group transition-all duration-500"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                    <div className="relative bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                      
                      {/* Left: Date & Badge */}
                      <div className="flex flex-row md:flex-col items-center md:items-start gap-4 flex-shrink-0">
                        <DateBox dateStr={item.startDate} theme={getCategoryTheme(item.type)} />
                        <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider rounded-lg border border-red-100">
                          {item.type}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-xl md:text-2xl font-bold text-secondary-900 mb-3 leading-snug group-hover:text-red-600 transition-colors">
                          {item.message}
                        </h3>
                        {item.linkUrl && (
                          <div className="mt-4">
                            <a 
                              href={item.linkUrl} 
                              target={item.linkUrl.startsWith('http') ? "_blank" : "_self"}
                              rel="noreferrer"
                            >
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-500/20">
                                View Details <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ==================== TIMELINE FEED ==================== */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-secondary-900">Recent Updates</h2>
              </div>

              {regularItems.length > 0 ? (
                <div className="space-y-0 relative border-l-2 border-secondary-200 ml-4 md:ml-6 pb-4">
                  {regularItems.map((item, index) => {
                    const theme = getCategoryTheme(item.type);

                    return (
                      <div 
                        key={item.id} 
                        // 5. UPDATED: Add ID for scrolling
                        id={`announcement-${item.id}`}
                        className="relative pl-8 md:pl-12 py-4 group transition-all duration-500"
                      >
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[9px] top-10 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-125 z-10`} style={{ backgroundColor: theme.hex }}></div>
                        
                        <div className={`bg-white rounded-2xl p-6 border border-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group-hover:border-${theme.color}-100`}>
                          
                          {/* Colored Top Border */}
                          <div className={`absolute top-0 left-0 right-0 h-1`} style={{ backgroundColor: theme.hex }}></div>

                          <div className="flex flex-col md:flex-row gap-5 items-start">
                            
                            {/* Date Box */}
                            <DateBox dateStr={item.startDate} theme={theme} />

                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.text}`}>
                                  {item.type || 'Info'}
                                </span>
                                <span className="text-secondary-300 text-xs">•</span>
                                <span className="text-xs text-secondary-400 font-medium flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {item.startDate ? new Date(item.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'All Day'}
                                </span>
                              </div>
                              
                              <p className="text-secondary-800 font-medium text-base leading-relaxed mb-4">
                                {item.message}
                              </p>

                              {item.linkUrl && (
                                <a 
                                  href={item.linkUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="inline-block"
                                >
                                  <button className={`text-sm font-bold flex items-center group/link ${theme.text} hover:opacity-80 transition-opacity`}>
                                    Read More <ChevronRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                                  </button>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary-200 shadow-sm">
                  <div className="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-secondary-300" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-1">No updates found</h3>
                  <p className="text-secondary-500 font-medium">We couldn't find any announcements matching your filters.</p>
                  <button onClick={() => setFilter('all')} className="mt-4 text-primary-600 font-bold hover:underline">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Announcements;