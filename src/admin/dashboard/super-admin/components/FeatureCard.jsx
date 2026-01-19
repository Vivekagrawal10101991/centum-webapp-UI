import { Link } from 'react-router-dom';
import { Card } from '../../../../components/common';

/**
 * Feature Card Component
 * Displays a feature option with icon and description
 */
export const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <Link to={feature.path}>
      <Card className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
        <div className={`w-16 h-16 rounded-full bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className={`w-8 h-8 text-${feature.color}-600`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600">{feature.description}</p>
      </Card>
    </Link>
  );
};
