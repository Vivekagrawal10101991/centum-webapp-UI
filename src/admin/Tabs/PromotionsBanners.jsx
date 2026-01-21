import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Megaphone, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

export default function PromotionsBanners() {
  const [activeSubTab, setActiveSubTab] = useState('banners');
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showBannerForm, setShowBannerForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Banners State (Local/Dummy for now)
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'JEE 2026 Admissions Open',
      subtitle: 'Join India\'s Top Coaching Institute',
      ctaText: 'Enroll Now',
      ctaLink: '/enroll',
      imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
      position: 1,
      active: true,
    },
  ]);

  // Announcements State
  const [announcements, setAnnouncements] = useState([]);

  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    imageUrl: '',
    position: 1,
    active: true,
  });

  const [announcementForm, setAnnouncementForm] = useState({
    message: '',
    type: 'info',
    startDate: '',
    endDate: '',
    linkUrl: '', 
    active: true,
  });

  // --- Helpers for Styling ---
  const getTypeStyles = (type) => {
    const normalizedType = (type || 'info').toLowerCase();

    switch (normalizedType) {
      case 'warning':
        return {
          cardBg: 'bg-orange-50',
          cardBorder: 'border-orange-200',
          leftBorder: 'border-l-4 border-orange-400',
          badgeBg: 'bg-orange-100',
          badgeText: 'text-orange-800',
          iconBg: 'bg-orange-200',
          iconColor: 'text-orange-700',
          icon: <AlertTriangle className="w-5 h-5 text-orange-600" />
        };
      case 'success':
        return {
          cardBg: 'bg-green-50',
          cardBorder: 'border-green-200',
          leftBorder: 'border-l-4 border-green-400',
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-800',
          iconBg: 'bg-green-200',
          iconColor: 'text-green-700',
          icon: <CheckCircle className="w-5 h-5 text-green-600" />
        };
      case 'info':
      default:
        return {
          cardBg: 'bg-blue-50',
          cardBorder: 'border-blue-200',
          leftBorder: 'border-l-4 border-blue-400',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-800',
          iconBg: 'bg-blue-200',
          iconColor: 'text-blue-700',
          icon: <Info className="w-5 h-5 text-blue-600" />
        };
    }
  };

  // --- 1. FETCH DATA ---
  useEffect(() => {
    if (activeSubTab === 'announcements') {
      fetchAnnouncements();
    }
  }, [activeSubTab]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/tech/announcements/all');
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to sync announcements");
    } finally {
      setLoading(false);
    }
  };

  // --- Banner Handlers ---
  const handleAddBanner = () => {
    if (editingBanner) {
      setBanners(banners.map(b => b.id === editingBanner.id ? { ...bannerForm, id: editingBanner.id } : b));
      setEditingBanner(null);
    } else {
      setBanners([...banners, { ...bannerForm, id: Date.now() }]);
    }
    setBannerForm({ title: '', subtitle: '', ctaText: '', ctaLink: '', imageUrl: '', position: 1, active: true });
    setShowBannerForm(false);
    toast.success("Banner updated (Local Only)");
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setBannerForm(banner);
    setShowBannerForm(true);
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const toggleBannerActive = (id) => {
    setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  // --- 2. ANNOUNCEMENT HANDLERS ---
  const handleAddAnnouncement = async () => {
    if (!announcementForm.message) {
      toast.error("Message is required");
      return;
    }

    try {
      setSubmitLoading(true);
      
      const payload = {
        ...announcementForm,
        type: announcementForm.type.toLowerCase() // Ensure lowercase
      };

      if (editingAnnouncement) {
        // Update API
        await api.put(`/api/tech/announcements/${editingAnnouncement.id}`, payload);
        toast.success("Announcement updated successfully!");
      } else {
        // Create API
        await api.post('/api/tech/announcements/add', payload);
        toast.success("Announcement created successfully!");
      }

      setEditingAnnouncement(null);
      setAnnouncementForm({ message: '', type: 'info', startDate: '', endDate: '', linkUrl: '', active: true });
      setShowAnnouncementForm(false);
      fetchAnnouncements();

    } catch (error) {
      console.error("Error saving announcement:", error);
      toast.error(error.response?.data?.message || "Failed to save announcement");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementForm({
        ...announcement,
        type: (announcement.type || 'info').toLowerCase()
    });
    setShowAnnouncementForm(true);
    // Scroll to form if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAnnouncement = async (id) => {
    if(!window.confirm("Are you sure you want to delete this announcement? This action cannot be undone.")) {
      return;
    }

    const toastId = toast.loading("Deleting announcement...");

    try {
      // Delete API
      await api.delete(`/api/tech/announcements/${id}`);
      toast.success("Announcement deleted", { id: toastId });
      fetchAnnouncements(); // Refresh list
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Could not delete announcement", { id: toastId });
    }
  };

  const toggleAnnouncementActive = async (announcement) => {
    // Optimistic Update
    const updatedList = announcements.map(a => 
      a.id === announcement.id ? { ...a, active: !a.active } : a
    );
    setAnnouncements(updatedList);

    try {
      // Toggle Status API
      await api.put(`/api/tech/announcements/${announcement.id}`, {
        ...announcement,
        active: !announcement.active
      });
    } catch (error) {
      console.error("Toggle failed", error);
      toast.error("Failed to update status");
      fetchAnnouncements(); // Revert
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Promotions & Banners</h2>
        <p className="text-gray-600 mt-1">Manage hero banners and website announcements</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('banners')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'banners'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Home Banners
        </button>
        <button
          onClick={() => setActiveSubTab('announcements')}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeSubTab === 'announcements'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Announcements
        </button>
      </div>

      {/* Home Banners Tab */}
      {activeSubTab === 'banners' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage hero section banners on the homepage</p>
            <button
              onClick={() => {
                setShowBannerForm(true);
                setEditingBanner(null);
                setBannerForm({ title: '', subtitle: '', ctaText: '', ctaLink: '', imageUrl: '', position: 1, active: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Banner
            </button>
          </div>

          {/* Banner Form */}
          {showBannerForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <input
                    type="text"
                    value={bannerForm.ctaLink}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                  <input
                    type="text"
                    value={bannerForm.imageUrl}
                    onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position (Order)</label>
                  <input
                    type="number"
                    value={bannerForm.position}
                    onChange={(e) => setBannerForm({ ...bannerForm, position: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddBanner}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBanner ? 'Update Banner' : 'Add Banner'}
                </button>
                <button
                  onClick={() => {
                    setShowBannerForm(false);
                    setEditingBanner(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Banners List */}
          <div className="space-y-4">
            {banners.sort((a, b) => a.position - b.position).map((banner) => (
              <div key={banner.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">{banner.title}</h4>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Position {banner.position}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{banner.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBannerActive(banner.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            banner.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {banner.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEditBanner(banner)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Tab Content */}
      {activeSubTab === 'announcements' && (
         <>
         {/* HEADER - RESTORED */}
         <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage marquee announcements and popup notifications</p>
            <button
              onClick={() => {
                setShowAnnouncementForm(true);
                setEditingAnnouncement(null);
                setAnnouncementForm({ message: '', type: 'info', startDate: '', endDate: '', linkUrl: '', active: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Announcement
            </button>
         </div>

         {/* Announcement Form */}
         {showAnnouncementForm && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8 transition-all duration-200">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                 <Megaphone className="w-5 h-5 text-blue-600"/> 
                 {editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-50/50"
                    rows={3}
                    placeholder="Enter the main text for your announcement..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link URL (Optional)</label>
                  <input
                    type="text"
                    value={announcementForm.linkUrl || ''}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, linkUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-50/50"
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <div className="relative">
                      <select
                        value={announcementForm.type}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, type: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-50/50 appearance-none"
                      >
                        <option value="info">Info (Blue)</option>
                        <option value="warning">Warning (Orange)</option>
                        <option value="success">Success (Green)</option>
                      </select>
                      <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={announcementForm.startDate}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, startDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={announcementForm.endDate}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, endDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={handleAddAnnouncement}
                  disabled={submitLoading}
                  className="bg-blue-600 text-white px-8 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2 font-medium shadow-lg shadow-blue-200"
                >
                  {submitLoading && <Loader2 className="w-4 h-4 animate-spin"/>}
                  {editingAnnouncement ? 'Update' : 'Publish'}
                </button>
                <button
                  onClick={() => {
                    setShowAnnouncementForm(false);
                    setEditingAnnouncement(null);
                  }}
                  className="bg-gray-100 text-gray-700 px-8 py-2.5 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
         )}

         {/* Announcements List */}
         {loading ? (
             <div className="flex justify-center items-center py-10">
               <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
             </div>
          ) : (
            <div className="space-y-4">
              {announcements.length === 0 ? (
                <div className="text-center text-gray-500 py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                  <Megaphone className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p>No announcements found. Publish one to alert your students!</p>
                </div>
              ) : (
                announcements.map((announcement) => {
                    const styles = getTypeStyles(announcement.type);

                    return (
                        <div 
                            key={announcement.id} 
                            className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${styles.cardBg} ${styles.cardBorder} ${styles.leftBorder}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-1.5 rounded-full ${styles.iconBg}`}>
                                            {styles.icon}
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold tracking-wide uppercase ${styles.badgeBg} ${styles.badgeText}`}>
                                            {(announcement.type || 'INFO')}
                                        </span>

                                        {announcement.startDate && (
                                            <span className="text-xs text-gray-500 font-medium">
                                                {new Date(announcement.startDate).toLocaleDateString()} — {new Date(announcement.endDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-800 font-medium text-base ml-1 leading-relaxed">
                                        {announcement.message}
                                    </p>
                                    {announcement.linkUrl && (
                                        <a href={announcement.linkUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-2 ml-1 inline-block font-medium">
                                            🔗 {announcement.linkUrl}
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm">
                                    <button
                                        onClick={() => toggleAnnouncementActive(announcement)}
                                        className={`p-2 rounded-lg transition-all ${
                                            announcement.active 
                                            ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
                                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                        }`}
                                        title={announcement.active ? 'Active' : 'Hidden'}
                                    >
                                        {announcement.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => handleEditAnnouncement(announcement)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}