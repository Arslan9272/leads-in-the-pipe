import { ToastProvider } from '@/components/ui/Toast';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { RecipeForSuccess } from '@/components/sections/RecipeForSuccess';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Offering } from '@/components/sections/Offering';
import { Articles } from '@/components/sections/Articles';
import { LetsTalk } from '@/components/sections/LetsTalk';
import { Footer } from '@/components/sections/Footer';

export function App() {
  return (
    <ToastProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <RecipeForSuccess />
        <WhatWeDo />
        <Offering />
        <Articles />
        <LetsTalk />
      </main>
      <Footer />
    </ToastProvider>
  );
}
