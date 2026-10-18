import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LeadersPage } from './pages/LeadersPage';
import { SquadPage } from './pages/SquadPage';
import { MatchesPage } from './pages/MatchesPage';
import { GalleryPage } from './pages/GalleryPage';
import { InstagramPage } from './pages/InstagramPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ledarna" element={<LeadersPage />} />
        <Route path="/truppen" element={<SquadPage />} />
        <Route path="/matcher" element={<MatchesPage />} />
        <Route path="/galleri" element={<GalleryPage />} />
        <Route path="/instagram" element={<InstagramPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        {/* Custom 404 page for any unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};
