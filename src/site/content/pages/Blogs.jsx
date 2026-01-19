import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';
import { Card } from '../../../components/common';
import { getAllBlogs } from '../../../admin/services/blogService';

/**
 * Blogs Page
 * Educational blogs and articles
 */
const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBlogs();
      // Filter only published blogs for public view
      const publishedBlogs = data.filter(blog => blog.published);
      setBlogs(publishedBlogs);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['All', ...new Set(blogs.map(blog => blog.category).filter(Boolean))];

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Truncate content
  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Blogs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, study tips, and educational content to help you succeed
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-8 border-red-200 bg-red-50">
            <p className="text-center text-red-600">
              Failed to load blogs: {error}
            </p>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && filteredBlogs.length === 0 && (
          <Card className="p-8">
            <p className="text-center text-gray-600">
              {searchTerm || selectedCategory !== 'All' 
                ? 'No blogs found matching your criteria.' 
                : 'No blog posts available yet.'}
            </p>
          </Card>
        )}

        {/* Blogs Grid */}
        {!loading && !error && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card 
                key={blog.id} 
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                hover
              >
                {/* Blog Image */}
                {blog.imageUrl ? (
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category Tag */}
                  {blog.category && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {blog.category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                    {truncateContent(blog.content)}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button 
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary-600 transition-colors group"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && filteredBlogs.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredBlogs.length} of {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
