import { Outlet } from 'react-router-dom';

import { Header } from '@/components/sections/Header';
import { LetsTalk } from '@/components/sections/LetsTalk';
import { Footer } from '@/components/sections/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { CursorTrail } from '@/components/layout/CursorTrail';

export function RootLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <CursorTrail />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <LetsTalk />
      <Footer />
    </>
  );
}
