import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { siteConfig } from '../content/siteContent';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero" id="ledarna">
      {/* Background with futsalboys-ledare.JPG */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src={siteConfig.heroPosterUrl}
          alt="Futsal Boys Ledarna - Raffi Medz, Elvis Mesic, Marcelo Villa"
          className="hero__image"
        />
      </div>

      {/* Dark gradient overlay so text is 100% legible */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Hero Foreground Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero__content">

          <h1 className="hero__title">
            LEADERS OF <br />
            <span className="text-neon">THE CLUB</span>
          </h1>

          <div className="hero__leaders-tag">
            <span>RAFFI MEDZ</span> • <span>ELVIS MESIC</span> • <span>MARCELO VILLA</span>
          </div>

          <p className="hero__desc">
            Välkommen till Futsal Boys – hjärtat och passionen i Trollhättan.
            Stark sammanhållning och offensiv futsal.
          </p>

          <div className="hero__ctas">
            <Link
              to="/truppen"
              className="btn btn--neon"
            >
              <span>MÖT TRUPPEN</span>
              <ArrowRight size={18} />
            </Link>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              <Instagram size={18} />
              <span>FÖLJ OSS PÅ INSTAGRAM</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
