import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Mail } from 'lucide-react';
import { siteConfig } from '../content/siteContent';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Col */}
          <div className="footer__brand-block">
            {/* Brand Logo Clickable to Scroll to Top */}
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="footer__brand-link"
              aria-label="Futsal Boys Hem - Scrolla till toppen"
              title="Klicka för att scrolla till toppen"
            >
              <img
                src={siteConfig.logoUrl}
                alt="Futsal Boys Logo"
                className="footer__brand-logo"
              />
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '26px',
                    color: '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  FUTSAL BOYS
                </h3>
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    color: 'var(--neon-green)',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  TROLLHÄTTAN
                </span>
              </div>
            </Link>

            <p className="footer__desc">
              {siteConfig.description}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
              >
                <Instagram size={15} />
                <span>{siteConfig.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer__col">
            <h4>NAVIGERING</h4>
            <ul className="footer__links">
              <li><Link to="/">Hem</Link></li>
              <li><Link to="/ledarna">Ledarna</Link></li>
              <li><Link to="/truppen">Spelartruppen</Link></li>
              <li><Link to="/matcher">Schema & Matcher</Link></li>
              <li><Link to="/merch">Officiell Merch</Link></li>
              <li><Link to="/galleri">Galleri & Video</Link></li>
              <li><Link to="/instagram">Instagram Feed</Link></li>
            </ul>
          </div>

          {/* Arena & Kontakt */}
          <div className="footer__col">
            <h4>HEMMAARENA & KONTAKT</h4>
            <ul className="footer__links">
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={16} className="text-neon" />
                <span>{siteConfig.arena}, {siteConfig.city}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} className="text-neon" />
                <span>{siteConfig.email}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Instagram size={16} className="text-neon" />
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
                  DM på Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Sponsors Strip in Footer */}
        <div
          style={{
            padding: '20px 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            margin: '36px 0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--neon-green)',
                textTransform: 'uppercase',
              }}
            >
              OFFICIELLA SPONSORER:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a
              href="https://drinkabnormal.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e5ff' }} />
              <span>ABNORMAL</span>
              <span style={{ color: 'var(--silver-dim)', fontSize: '11px', fontWeight: 500 }}>(drinkabnormal.com)</span>
            </a>

            <a
              href="https://wildchips.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff9900' }} />
              <span>WILD CHIPS</span>
              <span style={{ color: 'var(--silver-dim)', fontSize: '11px', fontWeight: 500 }}>(wildchips.com)</span>
            </a>

            <a
              href="https://adamaswear.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10ff60' }} />
              <span>ADAMAS</span>
              <span style={{ color: 'var(--silver-dim)', fontSize: '11px', fontWeight: 500 }}>(adamswear.com)</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <div>
            © {new Date().getFullYear()} Futsal Boys Trollhättan. Alla rättigheter förbehållna.
          </div>
          <a
            href="https://mediamagnet.se"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__mm-link"
            title="Byggd av Media Magnet"
          >
            <span>Byggd av</span>
            <img
              src="/images/mediamagnet_logo_with_text_vit.png"
              alt="Media Magnet"
              className="footer__mm-logo"
              style={{
                height: '24px',
                width: 'auto',
                maxHeight: '26px',
                objectFit: 'contain',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
