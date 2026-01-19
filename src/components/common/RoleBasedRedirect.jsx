import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * RoleBasedRedirect Component
 * Redirects user to their role-specific dashboard
 * Used on login success or when accessing /dashboard
 */
const RoleBasedRedirect = () => {
  const { isAuthenticated, getUserDashboard, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        const dashboardRoute = getUserDashboard();
        navigate(dashboardRoute, { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, loading, getUserDashboard, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default RoleBasedRedirect;
