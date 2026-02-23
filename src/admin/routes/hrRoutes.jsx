import { Routes, Route, Navigate } from 'react-router-dom';
import HRDashboard from '../dashboard/hr/pages/HRDashboard';

/**
 * HR Routes
 * Protected routes specific to the HR role
 */
export const hrRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HRDashboard />} />
      <Route path="/dashboard" element={<HRDashboard />} />
      
      {/* THESE TABS NOW LOAD THE DASHBOARD COMPONENT */}
      <Route path="/leaves" element={<HRDashboard />} />
      <Route path="/recruitment" element={<HRDashboard />} />
      
      {/* Placeholders for future HR tabs */}
      <Route path="/employees" element={<div className="p-8"><h2>Employee Directory (Coming Soon)</h2></div>} />
      <Route path="/attendance" element={<div className="p-8"><h2>Attendance Management (Coming Soon)</h2></div>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard/hr" replace />} />
    </Routes>
  );
};