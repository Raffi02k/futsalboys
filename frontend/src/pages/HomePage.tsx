import React from 'react';
import { PageMeta } from '../components/PageMeta';
import { HeroSection } from '../components/HeroSection';
import { StatsBar } from '../components/StatsBar';
import { PlayerCarousel } from '../components/PlayerCarousel';
import { MatchAndNewsSection } from '../components/MatchAndNewsSection';
import { GallerySection } from '../components/GallerySection';
import { InstagramSection } from '../components/InstagramSection';
import { siteConfig } from '../content/siteContent';

export const HomePage: React.FC = () => {
  return (
    <>
      <PageMeta
        title={`${siteConfig.projectName} | Officiell Webbplats - Trollhättan`}
        description={siteConfig.description}
        canonicalPath="/"
      />

      {/* 1. HERO SECTION (Featuring Ledarbild IMG_1062 2.JPG) */}
      <HeroSection />

      {/* 2. STATS COUNTER BAR (Victory United inspired) */}
      <StatsBar />

      {/* 3. INTERACTIVE SQUAD CAROUSEL (image_140650.png Chelsea style) */}
      <PlayerCarousel />

      {/* 4. UPCOMING MATCH & CLUB NEWS (image_13b2de.png style) */}
      <MatchAndNewsSection />

      {/* 5. GALLERY & MEDIA HIGHLIGHTS */}
      <GallerySection />

      {/* 6. INSTAGRAM PROFILE & GRID (IMG_1064.PNG inspired) */}
      <InstagramSection />
    </>
  );
};
