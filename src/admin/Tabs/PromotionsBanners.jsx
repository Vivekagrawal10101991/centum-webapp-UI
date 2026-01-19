import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

export default function PromotionsBanners() {
  const [activeSubTab, setActiveSubTab] = useState('banners');
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

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
    {
      id: 2,
      title: 'NEET 2026 Crash Course',
      subtitle: 'Limited Seats Available - Register Today',
      ctaText: 'Register',
      ctaLink: '/register-neet',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      position: 2,
      active: true,
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      message: '🎉 New batch starting from Jan 15, 2026 - Hurry, limited seats!',
      type: 'success',
      startDate: '2026-01-01',
      endDate: '2026-01-15',
      active: true,
    },
    {
      id: 2,
      message: '⚠️ Office will be closed on Jan 26 for Republic Day',
      type: 'warning',
      startDate: '2026-01-20',
      endDate: '2026-01-26',
      active: true,
    },
  ]);

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
    active: true,
  });

  const handleAddBanner = () => {
    if (editingBanner) {
      setBanners(banners.map(b => b.id === editingBanner.id ? { ...bannerForm, id: editingBanner.id } : b));
      setEditingBanner(null);
    } else {
      setBanners([...banners, { ...bannerForm, id: Date.now() }]);
    }
    setBannerForm({ title: '', subtitle: '', ctaText: '', ctaLink: '', imageUrl: '', position: 1, active: true });
    setShowBannerForm(false);
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setBannerForm(banner);
    setShowBannerForm(true);
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const handleAddAnnouncement = () => {
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? { ...announcementForm, id: editingAnnouncement.id } : a));
      setEditingAnnouncement(null);
    } else {
      setAnnouncements([...announcements, { ...announcementForm, id: Date.now() }]);
    }
    setAnnouncementForm({ message: '', type: 'info', startDate: '', endDate: '', active: true });
    setShowAnnouncementForm(false);
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementForm(announcement);
    setShowAnnouncementForm(true);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const toggleBannerActive = (id) => {
    setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const toggleAnnouncementActive = (id) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, active: !a.active } : a));
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
                    placeholder="JEE 2026 Admissions Open"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Join India's Top Coaching Institute"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enroll Now"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <input
                    type="text"
                    value={bannerForm.ctaLink}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/enroll"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                  <input
                    type="text"
                    value={bannerForm.imageUrl}
                    onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
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
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">Button: {banner.ctaText}</span>
                          <span className="text-xs text-gray-500">Link: {banner.ctaLink}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBannerActive(banner.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            banner.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}
                          title={banner.active ? 'Active' : 'Inactive'}
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

      {/* Announcements Tab */}
      {activeSubTab === 'announcements' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Manage marquee announcements and popup notifications</p>
            <button
              onClick={() => {
                setShowAnnouncementForm(true);
                setEditingAnnouncement(null);
                setAnnouncementForm({ message: '', type: 'info', startDate: '', endDate: '', active: true });
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Announcement
            </button>
          </div>

          {/* Announcement Form */}
          {showAnnouncementForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="🎉 New batch starting from Jan 15, 2026 - Hurry, limited seats!"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={announcementForm.type}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="info">Info (Blue)</option>
                      <option value="warning">Warning (Yellow)</option>
                      <option value="success">Success (Green)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={announcementForm.startDate}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={announcementForm.endDate}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddAnnouncement}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
                </button>
                <button
                  onClick={() => {
                    setShowAnnouncementForm(false);
                    setEditingAnnouncement(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        announcement.type === 'info' ? 'bg-blue-100 text-blue-700' :
                        announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {announcement.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {announcement.startDate} to {announcement.endDate}
                      </span>
                    </div>
                    <p className="text-gray-800">{announcement.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAnnouncementActive(announcement.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        announcement.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}
                      title={announcement.active ? 'Active' : 'Inactive'}
                    >
                      {announcement.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEditAnnouncement(announcement)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
