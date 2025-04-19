import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import DeliveriesPage from '../pages/DeliveriesPage/DeliveriesPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/deliveries" element={<DeliveriesPage />} />
    </Routes>
  );
};

export default AppRoutes;
