import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, Tag, BookOpen, Clock } from 'lucide-react';
import { Card, Button } from '../../../components/common';
import { cmsService } from '../../services/cmsService'; 
import { Link } from 'react-router-dom';

// Helper to strip HTML tags for excerpts
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...";
};

// Helper to format dates
const formatDate = (dateString) => {
  if (!dateString) return "Recent";
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const Blogs = () => {
  const categories = [
    "All Posts",
    "JEE Preparation",
    "NEET Preparation",
    "Study Tips",
    "Foundation",
    "Test Strategy",
    "Parent Guide",
    "Subject Focus",
    "Mental Health"
  ];

  // 1. State Management - Initialized as empty
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch Backend Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const backendBlogs = await cmsService.getBlogs();
        
        if (backendBlogs && backendBlogs.length > 0) {
          // Transform Backend Data
          const formattedBackendBlogs = backendBlogs.map(blog => ({
            id: blog.id || blog._id,
            title: blog.title,
            excerpt: stripHtml(blog.content), 
            image: blog.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070", 
            author: blog.author || "Centum Team",
            date: formatDate(blog.createdAt),
            category: blog.category || "General",
            readTime: "5 min read" 
          }));

          // Set display blogs to only backend data
          setDisplayBlogs(formattedBackendBlogs);
        }
      } catch (err) {
        console.error("Error fetching backend blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#7E3AF2] via-[#1C64F2] to-[#0D9488] text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Centum Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Educational Blogs & Resources
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Expert insights, study strategies, and success tips from IIT alumni and experienced educators
          </p>
          
          {/* Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for topics, strategies, exam tips..."
                className="w-full pl-12 pr-4 py-4 rounded-full text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-[#7E3AF2]" />
            <h2 className="text-lg font-bold text-slate-900">Browse by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === "All Posts"
                    ? "bg-[#7E3AF2] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid (Backend-Only Content) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
          
          {isLoading ? (
            <div className="text-center py-20 text-slate-500">Loading articles...</div>
          ) : displayBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBlogs.map((post) => (post && (
                <Card key={post.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group flex flex-col h-full">
                  <Link to={`/blogs/${post.id}`} className="block relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[#7E3AF2] px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <Link to={`/blogs/${post.id}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#7E3AF2] transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-slate-500">{post.date}</span>
                      
                      <Link to={`/blogs/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-[#7E3AF2] hover:text-[#6749D4] hover:bg-purple-50 p-0 hover:bg-transparent pointer-events-none">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 font-medium border-2 border-dashed border-slate-200 rounded-3xl">
              No articles found in our library. Please check back later!
            </div>
          )}
        </div>

        {/* Load More */}
        {displayBlogs.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-[#7E3AF2] text-[#7E3AF2] hover:bg-[#7E3AF2] hover:text-white px-8 py-6 text-base"
            >
              Load More Articles
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-24 bg-gradient-to-br from-[#7E3AF2] to-[#1C64F2] rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <BookOpen className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss an Update
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest study tips, exam strategies, and educational insights delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-slate-900"
            />
            <Button className="bg-white text-[#7E3AF2] hover:bg-slate-100 px-6 border-none">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;