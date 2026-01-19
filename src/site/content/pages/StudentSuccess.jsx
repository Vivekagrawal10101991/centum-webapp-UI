import { TrendingUp } from 'lucide-react';
import { Card } from '../../../components/common';

/**
 * Student Success Page
 * Student testimonials and success stories
 */
const StudentSuccess = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Student Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from students who achieved their dreams with Centum Academy
          </p>
        </div>

        <Card className="p-8">
          <p className="text-center text-gray-600">
            Success stories coming soon...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default StudentSuccess;
