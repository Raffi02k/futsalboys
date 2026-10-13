import React from 'react';
import { ScrollToTop } from './ScrollToTop';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from './PageTransition';
import { CookieModal } from './CookieModal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ScrollToTop />
      <Header />
      <main id="main-content" style={{ flexGrow: 1 }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <CookieModal />
      <Footer />
    </div>
  );
};
