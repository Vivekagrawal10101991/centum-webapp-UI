import { Card } from '../../../../components/common';

/**
 * System Stats Component
 * Displays system overview statistics
 */
export const SystemStats = ({ stats = [] }) => {
  const defaultStats = [
    { label: 'Total Users', value: '--', color: 'primary' },
    { label: 'Active', value: '--', color: 'green-600' },
    { label: 'Pending', value: '--', color: 'orange-600' },
    { label: 'Roles', value: '--', color: 'blue-600' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayStats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className={`text-2xl font-bold text-${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
