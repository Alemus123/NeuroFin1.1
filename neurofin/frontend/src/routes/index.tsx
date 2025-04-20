import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import RecurringPayments from '../pages/RecurringPayments';
import FinancialEducation from '../pages/FinancialEducation';
import SafeBox from '../pages/SafeBox';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payments" element={<RecurringPayments />} />
        <Route path="/education" element={<FinancialEducation />} />
        <Route path="/safebox" element={<SafeBox />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
