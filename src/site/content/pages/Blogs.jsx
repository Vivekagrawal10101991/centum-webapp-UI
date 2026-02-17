import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, Tag, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { Card, Button } from '../../../components/common';
import { cmsService } from '../../services/cmsService'; 
import { Link } from 'react-router-dom'; // Added for navigation

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
  // 1. Define Static Data (The Figma Design)
  const staticFeaturedBlog = {
    id: 'static-1',
    title: "The Ultimate Guide to JEE Main 2026: Preparation Strategies That Work",
    excerpt: "Discover proven strategies and time-tested techniques that have helped thousands of students crack JEE Main with top ranks. Learn from IIT alumni and expert educators.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    author: "Mr. Tushar Sinha",
    date: "February 5, 2026",
    category: "JEE Preparation",
    readTime: "8 min read",
    featured: true
  };

  const staticBlogPosts = [
    {
      id: 'static-2',
      title: "NEET 2026: How to Master Biology in 6 Months",
      excerpt: "A comprehensive roadmap for NEET aspirants to build a strong foundation in Biology and excel in the medical entrance exam.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
      author: "Mr. Dheeraj Singh",
      date: "February 3, 2026",
      category: "NEET Preparation",
      readTime: "6 min read"
    },
    {
      id: 'static-3',
      title: "Time Management Secrets for Competitive Exam Success",
      excerpt: "Learn how to optimize your study schedule, balance multiple subjects, and maximize productivity during exam preparation.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
      author: "Mr. Akhil Upadhyay",
      date: "January 30, 2026",
      category: "Study Tips",
      readTime: "5 min read"
    },
    {
      id: 'static-4',
      title: "Foundation Programs: Building Strong Basics for Class 9 & 10",
      excerpt: "Why early preparation matters and how foundation courses set students up for success in competitive exams.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
      author: "Centum Faculty",
      date: "January 28, 2026",
      category: "Foundation",
      readTime: "4 min read"
    },
    {
      id: 'static-5',
      title: "Mock Tests: Your Secret Weapon for JEE & NEET",
      excerpt: "Understanding the power of regular testing, performance analysis, and how to leverage mock tests for maximum benefit.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
      author: "Mr. Tushar Sinha",
      date: "January 25, 2026",
      category: "Test Strategy",
      readTime: "7 min read"
    },
    {
      id: 'static-6',
      title: "Parent's Guide: Supporting Your Child Through Competitive Exams",
      excerpt: "Practical advice for parents on how to provide emotional support, manage expectations, and create a positive learning environment.",
      image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600&q=80",
      author: "Mr. Dheeraj Singh",
      date: "January 22, 2026",
      category: "Parent Guide",
      readTime: "5 min read"
    },
    {
      id: 'static-7',
      title: "Physics Problem-Solving: Techniques from IIT Alumni",
      excerpt: "Expert strategies to approach complex physics problems, develop intuition, and build conceptual clarity.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
      author: "Mr. Akhil Upadhyay",
      date: "January 20, 2026",
      category: "Subject Focus",
      readTime: "6 min read"
    },
    {
      id: 'static-8',
      title: "Overcoming Exam Anxiety: Mental Health Tips for Students",
      excerpt: "Evidence-based techniques to manage stress, build confidence, and maintain mental wellness during preparation.",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80",
      author: "Centum Faculty",
      date: "January 18, 2026",
      category: "Mental Health",
      readTime: "5 min read"
    },
    {
      id: 'static-9',
      title: "Chemistry for NEET: Mastering Organic & Inorganic",
      excerpt: "A structured approach to tackle Chemistry effectively, with mnemonics, shortcuts, and concept-building strategies.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
      author: "Mr. Dheeraj Singh",
      date: "January 15, 2026",
      category: "NEET Preparation",
      readTime: "7 min read"
    }
  ];

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

  // 2. State Management
  const [displayBlogs, setDisplayBlogs] = useState(staticBlogPosts);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch Real Blogs & Merge
  useEffect(() => {
    const fetchAndMergeBlogs = async () => {
      try {
        const backendBlogs = await cmsService.getBlogs();
        
        if (backendBlogs && backendBlogs.length > 0) {
          // Transform Backend Data to match Figma Design Structure
          const formattedBackendBlogs = backendBlogs.map(blog => ({
            id: blog.id || blog._id,
            title: blog.title,
            excerpt: stripHtml(blog.content), // Strip HTML for excerpt
            image: blog.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070", // Fallback image
            author: blog.author || "Centum Team",
            date: formatDate(blog.createdAt),
            category: blog.category || "General",
            readTime: "5 min read" // Default if not calculated
          }));

          // Merge: Backend blogs first, then static blogs
          setDisplayBlogs([...formattedBackendBlogs, ...staticBlogPosts]);
        }
      } catch (err) {
        console.error("Error fetching backend blogs:", err);
        // On error, we still show static blogs, so no empty screen
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndMergeBlogs();
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

        {/* Featured Blog (Static Highlight) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-[#F59E0B]" />
            <h2 className="text-2xl font-bold text-slate-900">Featured Article</h2>
          </div>
          <Card className="overflow-hidden border-none shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <img
                  src={staticFeaturedBlog.image}
                  alt={staticFeaturedBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#F59E0B] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block bg-purple-100 text-[#7E3AF2] px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                  {staticFeaturedBlog.category}
                </span>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {staticFeaturedBlog.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {staticFeaturedBlog.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{staticFeaturedBlog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{staticFeaturedBlog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{staticFeaturedBlog.readTime}</span>
                  </div>
                </div>
                {/* Updated: Using Link for Navigation */}
                <Link to={`/blogs/${staticFeaturedBlog.id}`}>
                  <Button className="bg-[#7E3AF2] hover:bg-[#6749D4] text-white w-fit border-none pointer-events-none">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Grid (Mixed Content) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((post) => (
              <Card key={post.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group flex flex-col h-full">
                {/* Wrap Image in Link */}
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
                  {/* Wrap Title in Link */}
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
                    
                    {/* Updated: Using Link for Read More */}
                    <Link to={`/blogs/${post.id}`}>
                      <Button variant="ghost" size="sm" className="text-[#7E3AF2] hover:text-[#6749D4] hover:bg-purple-50 p-0 hover:bg-transparent pointer-events-none">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-[#7E3AF2] text-[#7E3AF2] hover:bg-[#7E3AF2] hover:text-white px-8 py-6 text-base"
          >
            Load More Articles
          </Button>
        </div>

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