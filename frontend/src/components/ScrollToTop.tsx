import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Always ensure the page starts at the very top on load/navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
