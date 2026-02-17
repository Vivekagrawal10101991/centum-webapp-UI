import React, { useState } from 'react';
import { Search, Atom, TestTube, GraduationCap, FileText, BookOpen, Lightbulb, Download, Eye, Filter } from 'lucide-react';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Materials', icon: BookOpen },
    { id: 'jee', name: 'JEE', icon: Atom },
    { id: 'neet', name: 'NEET', icon: TestTube },
    { id: 'foundation', name: 'Foundation', icon: GraduationCap },
    { id: 'free', name: 'Free Resources', icon: Lightbulb },
  ];

  const materials = [
    {
      id: 1,
      title: 'JEE Main Physics Chapter-wise Solutions 2025',
      category: 'jee',
      type: 'Previous Year Papers',
      subject: 'Physics',
      downloads: 1245,
      badge: 'NEW',
      badgeColor: 'green',
      thumbnail: '📚',
    },
    {
      id: 2,
      title: 'JEE Advanced Mathematics Practice Set',
      category: 'jee',
      type: 'Sample Papers',
      subject: 'Mathematics',
      downloads: 980,
      badge: null,
      thumbnail: '📐',
    },
    {
      id: 3,
      title: 'NEET Biology Complete Notes 2025-26',
      category: 'neet',
      type: 'Topic-wise Notes',
      subject: 'Biology',
      downloads: 2156,
      badge: 'POPULAR',
      badgeColor: 'orange',
      thumbnail: '🧬',
    },
    {
      id: 4,
      title: 'NEET Previous Year Papers (2020-2024)',
      category: 'neet',
      type: 'Previous Year Papers',
      subject: 'All Subjects',
      downloads: 1876,
      badge: null,
      thumbnail: '📝',
    },
    {
      id: 5,
      title: 'Class 10 Foundation Mathematics',
      category: 'foundation',
      type: 'Study Material',
      subject: 'Mathematics',
      downloads: 654,
      badge: null,
      thumbnail: '🔢',
    },
    {
      id: 6,
      title: 'JEE Chemistry Organic Revision Notes',
      category: 'jee',
      type: 'Topic-wise Notes',
      subject: 'Chemistry',
      downloads: 1432,
      badge: 'NEW',
      badgeColor: 'green',
      thumbnail: '⚗️',
    },
    {
      id: 7,
      title: 'NEET Physics Formula Sheet',
      category: 'neet',
      type: 'Quick Reference',
      subject: 'Physics',
      downloads: 892,
      badge: null,
      thumbnail: '⚡',
    },
    {
      id: 8,
      title: 'Free Sample Papers - All Subjects',
      category: 'free',
      type: 'Sample Papers',
      subject: 'All Subjects',
      downloads: 3421,
      badge: 'FREE',
      badgeColor: 'blue',
      thumbnail: '🎁',
    },
    {
      id: 9,
      title: 'Olympiad Mathematics Question Bank',
      category: 'foundation',
      type: 'Practice Questions',
      subject: 'Mathematics',
      downloads: 567,
      badge: null,
      thumbnail: '🏆',
    },
    {
      id: 10,
      title: 'JEE Main Mock Test Series 2025',
      category: 'jee',
      type: 'Mock Tests',
      subject: 'All Subjects',
      downloads: 1765,
      badge: 'POPULAR',
      badgeColor: 'orange',
      thumbnail: '📋',
    },
  ];

  const filteredMaterials = materials.filter((material) => {
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#7E3AF2] to-[#6C2BD9] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-black mb-4">📚 Library</h1>
            <p className="text-xl text-white/90 mb-8">
              Access comprehensive study materials, previous year papers, sample papers, and expert notes for JEE, NEET, and Foundation programs
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search by subject, topic, or material type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg text-slate-900 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 py-4 overflow-x-auto no-scrollbar">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-100 text-[#7E3AF2] ring-2 ring-[#7E3AF2]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredMaterials.length}</span> materials
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:text-[#7E3AF2] hover:border-[#7E3AF2] transition-all">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#7E3AF2] p-6 transition-all hover:shadow-xl group"
            >
              {/* Thumbnail & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl select-none">{material.thumbnail}</div>
                {material.badge && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      material.badgeColor === 'green'
                        ? 'bg-green-100 text-green-700'
                        : material.badgeColor === 'orange'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {material.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#7E3AF2] transition-colors line-clamp-2">
                {material.title}
              </h3>

              {/* Meta Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span>{material.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span>{material.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Download className="h-4 w-4 text-slate-400" />
                  <span>{material.downloads.toLocaleString()} downloads</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#7E3AF2] hover:bg-[#6C2BD9] text-white py-2.5 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button className="flex items-center justify-center p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#7E3AF2] hover:border-[#7E3AF2] hover:bg-slate-50 transition-all">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No materials found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-6 py-2 bg-[#7E3AF2] hover:bg-[#6C2BD9] text-white rounded-xl font-bold transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-[#7E3AF2] to-[#6C2BD9] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">🎁 Can't Find What You're Looking For?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Request specific study materials and our team will upload them within 24 hours
          </p>
          <button className="bg-white text-[#7E3AF2] hover:bg-slate-50 font-bold px-8 py-4 rounded-xl shadow-xl transition-all hover:scale-105">
            Request Materials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;