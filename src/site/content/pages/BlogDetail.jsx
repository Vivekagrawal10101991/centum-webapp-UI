import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Clock } from 'lucide-react';
import { Card } from '../../../components/common';
import { getAllBlogs } from '../../../admin/services/blogService';

/**
 * Blog Detail Page
 * Shows full blog content
 */
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('BlogDetail component rendered with ID:', id);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching blog with ID:', id);
        const data = await getAllBlogs();
        console.log('All blogs:', data);
        console.log('Looking for blog with ID:', id);
        
        // Try to find blog - check both string and exact match
        const foundBlog = data.find(b => {
          console.log('Comparing:', b.id, 'with', id, 'Match:', b.id === id, 'Published:', b.published);
          // Compare IDs as strings and check if published (handle both boolean and undefined)
          return String(b.id) === String(id) && (b.published === true || b.published === undefined);
        });
        
        console.log('Found blog:', foundBlog);
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError('Blog not found or not published');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

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

  // Estimate reading time
  const estimateReadingTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Share function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.title,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary"></div>
            <p className="mt-4 text-gray-600">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-8 max-w-2xl mx-auto border-red-200 bg-red-50">
            <p className="text-center text-red-600 mb-4">
              {error || 'Blog not found'}
            </p>
            <div className="text-center">
              <button
                onClick={() => navigate('/blogs')}
                className="inline-flex items-center gap-2 text-primary hover:text-primary-600"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Blogs</span>
        </button>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            {/* Hero Image */}
            {blog.imageUrl && (
              <div className="relative h-96 overflow-hidden bg-gray-200">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Category Tag */}
              {blog.category && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    {blog.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{estimateReadingTime(blog.content)} min read</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 ml-auto text-primary hover:text-primary-600 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
