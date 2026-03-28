import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DtpDashboard from '../dashboard/dtp/pages/DtpDashboard';

export const dtpRoutes = (
  <Routes>
    <Route path="/" element={<DtpDashboard />} />
    {/* Add more specific routes for DTP here later */}
  </Routes>
);