import { Video } from 'lucide-react';
import { Card } from '../components/common';

/**
 * Videos Page
 * Educational videos and tutorials
 */
const Videos = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Video className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Explore Videos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our educational content and tutorials
          </p>
        </div>

        <Card className="p-8">
          <p className="text-center text-gray-600">
            Video content coming soon...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Videos;
