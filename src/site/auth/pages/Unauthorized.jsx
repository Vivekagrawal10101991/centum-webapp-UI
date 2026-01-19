import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import { Button } from '../../../components/common';
import { useAuth } from '../../context/AuthContext';

/**
 * Unauthorized Page
 * Shown when user tries to access a route they don't have permission for
 */
const Unauthorized = () => {
  const { getUserDashboard } = useAuth();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-6">
          <ShieldOff className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator
          if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={getUserDashboard()}>
            <Button variant="primary">Go to My Dashboard</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
