import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { siteConfig } from '../content/siteContent';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          {/* Logo & Club Name */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="header__brand"
            aria-label="Futsal Boys Hem"
          >
            <img
              src={siteConfig.logoUrl}
              alt="Futsal Boys Logo"
              className="header__logo-img"
            />
            <div className="header__brand-text">
              <span className="header__brand-title">FUTSAL BOYS</span>
              <span className="header__brand-sub">TROLLHÄTTAN</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Huvudmeny">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="header__nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & Mobile Button */}
          <div className="header__actions">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--neon btn--sm header__cta-btn"
            >
              <Instagram size={16} />
              <span>FÖLJ OSS</span>
            </a>

            <button
              className="header__menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Stäng meny' : 'Öppna meny'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav__links">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className="mobile-nav__link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--neon"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Instagram size={18} />
          <span>FÖLJ @{siteConfig.instagramHandle}</span>
        </a>
      </div>
    </>
  );
};
