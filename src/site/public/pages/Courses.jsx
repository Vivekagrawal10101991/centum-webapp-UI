import { BookOpen, Users, Clock, Award } from 'lucide-react';
import { Card, Button } from '../../../components/common';

/**
 * Courses Page
 * Display available courses
 */
const Courses = () => {
  const courses = [
    {
      title: 'JEE Preparation',
      description: 'Comprehensive coaching for JEE Main and Advanced with expert faculty and proven methodology.',
      features: [
        'Complete syllabus coverage',
        'Regular mock tests',
        'Doubt clearing sessions',
        'Study materials included',
      ],
      duration: '2 Years',
      students: '500+',
      successRate: '95%',
    },
    {
      title: 'NEET Preparation',
      description: 'Specialized coaching for NEET examination with focus on Biology, Physics, and Chemistry.',
      features: [
        'NCERT-based teaching',
        'Weekly assessments',
        'Previous year papers',
        'Personal mentorship',
      ],
      duration: '2 Years',
      students: '400+',
      successRate: '93%',
    },
    {
      title: 'Foundation Course',
      description: 'Building strong fundamentals for students in classes 8-10 to prepare for competitive exams.',
      features: [
        'Concept building focus',
        'Interactive learning',
        'Regular parent meetings',
        'Olympiad preparation',
      ],
      duration: '1-3 Years',
      students: '300+',
      successRate: '98%',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of courses designed to help you achieve your academic goals
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="flex flex-col" hover>
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-6">{course.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-semibold">{course.duration}</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Students</p>
                    <p className="text-sm font-semibold">{course.students}</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Success</p>
                    <p className="text-sm font-semibold">{course.successRate}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0">
                <Button variant="primary" className="w-full">
                  Enroll Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
