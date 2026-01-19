import { BookOpen } from 'lucide-react';
import { Card } from '../../../components/common';

/**
 * Blogs Page
 * Educational blogs and articles
 */
const Blogs = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Blogs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and educational content
          </p>
        </div>

        <Card className="p-8">
          <p className="text-center text-gray-600">
            Blog posts coming soon...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Blogs;
