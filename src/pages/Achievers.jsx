import { Trophy, Star, Award } from 'lucide-react';
import { Card } from '../components/common';

/**
 * Achievers Page
 * Showcase of top performers and success stories
 */
const Achievers = () => {
  const achievers = [
    {
      name: 'Rahul Sharma',
      exam: 'JEE Advanced 2025',
      rank: 'AIR 45',
      college: 'IIT Bombay',
      image: null,
    },
    {
      name: 'Priya Patel',
      exam: 'NEET 2025',
      rank: 'AIR 120',
      college: 'AIIMS Delhi',
      image: null,
    },
    {
      name: 'Amit Kumar',
      exam: 'JEE Main 2025',
      rank: 'AIR 250',
      college: 'IIT Delhi',
      image: null,
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Achievers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the success of our brilliant students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievers.map((achiever, index) => (
            <Card key={index} className="p-6 text-center" hover>
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-primary-600 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{achiever.name}</h3>
              <p className="text-primary font-semibold mb-1">{achiever.rank}</p>
              <p className="text-gray-600 text-sm mb-2">{achiever.exam}</p>
              <p className="text-gray-700 font-medium">{achiever.college}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievers;
