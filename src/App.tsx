import { Routes, Route, Navigate } from 'react-router-dom';

import { ToastProvider } from '@/components/ui/Toast';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { AboutPage } from '@/pages/AboutPage';
import { PricingPage } from '@/pages/PricingPage';
import { ContactPage } from '@/pages/ContactPage';
import { ROUTES } from '@/lib/constants';

export function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.services} element={<ServicesPage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.pricing} element={<PricingPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
