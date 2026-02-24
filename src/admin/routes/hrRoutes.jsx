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
      
      {/* CRITICAL FIX: 
        We must route these to HRDashboard so the internal tabs can show the UI! 
        Remove any old "Coming Soon" placeholders for /recruitment and /leaves.
      */}
      <Route path="/leaves" element={<HRDashboard />} />
      <Route path="/recruitment" element={<HRDashboard />} />
      
      {/* Placeholders for other future HR tabs */}
      <Route path="/employees" element={<div className="p-8"><h2 className="text-xl font-bold">Employees (Coming Soon)</h2></div>} />
      <Route path="/attendance" element={<div className="p-8"><h2 className="text-xl font-bold">Attendance (Coming Soon)</h2></div>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard/hr" replace />} />
    </Routes>
  );
};