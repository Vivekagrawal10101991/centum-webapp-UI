import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ZonalHeadDashboard from '../dashboard/zonal-head/pages/ZonalHeadDashboard';

export const zonalHeadRoutes = (
  <Routes>
    <Route path="/" element={<ZonalHeadDashboard />} />
    {/* Add more specific routes for Zonal Head here later */}
  </Routes>
);