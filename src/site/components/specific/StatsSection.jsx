import { Users, Award, BookOpen, TrendingUp } from 'lucide-react';

/**
 * StatsSection Component
 * Displays key statistics about the academy
 */
const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '1000+',
      label: 'Students Enrolled',
      color: 'text-blue-600',
    },
    {
      icon: Award,
      value: '95%',
      label: 'Success Rate',
      color: 'text-green-600',
    },
    {
      icon: BookOpen,
      value: '50+',
      label: 'Expert Faculty',
      color: 'text-purple-600',
    },
    {
      icon: TrendingUp,
      value: '15+',
      label: 'Years of Excellence',
      color: 'text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
