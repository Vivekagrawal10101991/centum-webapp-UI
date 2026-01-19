import { Heart, Users, BookOpen, Award } from 'lucide-react';
import { Card } from '../../../components/common';

/**
 * Contributions Page
 * Showcase of contributions and social initiatives
 */
const Contributions = () => {
  const contributions = [
    {
      icon: Heart,
      title: 'Community Outreach',
      description: 'Providing free education to underprivileged students',
      impact: '500+ Students',
    },
    {
      icon: Users,
      title: 'Scholarship Programs',
      description: 'Merit-based and need-based scholarships',
      impact: '₹50L+ Distributed',
    },
    {
      icon: BookOpen,
      title: 'Free Study Materials',
      description: 'Digital resources accessible to all',
      impact: '10,000+ Downloads',
    },
    {
      icon: Award,
      title: 'Teacher Training',
      description: 'Upskilling educators across India',
      impact: '200+ Teachers',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Contributions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making a difference in education through various social initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contributions.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="p-8" hover>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <p className="text-primary font-semibold text-lg">{item.impact}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contributions;
