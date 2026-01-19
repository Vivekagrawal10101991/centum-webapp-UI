import { Award, Target, Users, Heart } from 'lucide-react';
import { Card } from '../components/common';

/**
 * About Page
 * Information about Centum Academy
 */
const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from teaching to student support.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Every student has unique goals, and we help them achieve their dreams.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build a supportive community where students learn and grow together.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our passionate faculty is dedicated to nurturing young minds.',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Centum Academy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students to achieve their dreams through quality education and personalized guidance
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At Centum Academy, we are committed to providing world-class education that prepares
              students for competitive examinations like JEE and NEET. Our mission is to create
              an environment where students can thrive academically while developing critical
              thinking and problem-solving skills.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With experienced faculty, comprehensive study materials, and personalized attention,
              we ensure that every student reaches their full potential and achieves their academic goals.
            </p>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Centum Academy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Experienced and qualified faculty',
              'Comprehensive study materials',
              'Regular tests and assessments',
              'Personalized attention to each student',
              'State-of-the-art infrastructure',
              'Proven track record of success',
              'Flexible batch timings',
              'Affordable fee structure',
            ].map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <p className="text-gray-700 font-medium">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
