import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { sponsorsList, Sponsor } from '../content/sponsorsData';
import { siteConfig } from '../content/siteContent';

export const SponsorsSection: React.FC = () => {
  // Duplicate for smooth infinite CSS marquee loop
  const marqueeSponsors = [...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList];

  const renderSponsorLogo = (sponsor: Sponsor) => {
    return (
      <div
        className="sponsor-logo-box"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '14px',
          background: sponsor.logoBg || '#070a0e',
          border: `2px solid ${sponsor.accentColor}`,
          boxShadow: `0 0 16px ${sponsor.glowColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          padding: '4px',
        }}
      >
        <img
          src={sponsor.image}
          alt={sponsor.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: sponsor.logoFit || 'contain',
            borderRadius: '8px',
            display: 'block',
          }}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <section className="sponsors-section" id="sponsorer" aria-label="Våra sponsorer">
      <div className="container">
        {/* H1 Hero Banner with Team Image and Text Over It */}
        <div className="sponsors-hero-banner">
          <img
            src="/images/players/Lagfoto.JPG"
            alt="Futsal Boys Lagfoto & Sponsorer"
            className="sponsors-hero-bg"
            loading="lazy"
          />
          <div className="sponsors-hero-overlay" />

          <div className="sponsors-hero-content">
            <p className="sponsors-hero-sub">
              OFFICIELLA KLUBBPARTNERS & SPONSORER
            </p>

            <h2 className="sponsors-hero-h1">
              VÅRA <span className="text-neon">SPONSORER</span>
            </h2>

            <p className="sponsors-hero-desc">
              Vi är stolta över att samarbeta med ledande varumärken som delar vår ambition, energi och passion för futsal. Klicka på en sponsor för att besöka deras officiella sida!
            </p>

            {/* Quick action strip */}
            <div
              style={{
                marginTop: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 18px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(16, 255, 96, 0.4)',
                fontSize: '12.5px',
                color: '#ffffff',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'var(--neon-green)', fontWeight: 800 }}>PARTNERSKAP</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <a
                href={`mailto:${siteConfig.email}`}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 700,
                }}
              >
                <Mail size={13} color="var(--neon-green)" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          1. INFINITE ROLLING TICKER (TYPP TYLLANDE VÅRA SPONSORER)
         ==================================================================== */}
      <div className="sponsors-ticker-wrap">
        <div className="sponsors-ticker-track">
          {marqueeSponsors.map((sponsor, idx) => (
            <a
              key={`${sponsor.id}-${idx}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-ticker-card"
              title={`Besök ${sponsor.name} (${sponsor.displayUrl})`}
              aria-label={`Besök ${sponsor.name} på ${sponsor.displayUrl}`}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {renderSponsorLogo(sponsor)}

              <div className="sponsor-ticker-info">
                <div className="sponsor-ticker-name-row">
                  <span className="sponsor-ticker-name">{sponsor.name}</span>
                  <ExternalLink size={14} className="sponsor-ticker-ext-icon" />
                </div>

                <span className="sponsor-ticker-url">{sponsor.displayUrl}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ====================================================================
          2. FEATURED 3-SPONSOR INTERACTIVE GRID
         ==================================================================== */}
      <div className="container" style={{ marginTop: '36px' }}>
        <div className="sponsors-featured-grid">
          {sponsorsList.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-feature-card"
              title={`Gå till ${sponsor.displayUrl}`}
              style={{
                ['--sponsor-accent' as any]: sponsor.accentColor,
                ['--sponsor-glow' as any]: sponsor.glowColor,
              }}
            >
              {/* Header inside card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {renderSponsorLogo(sponsor)}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {sponsor.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        color: sponsor.accentColor,
                        textTransform: 'uppercase',
                        display: 'block',
                        marginTop: '4px',
                      }}
                    >
                      {sponsor.category}
                    </span>
                  </div>
                </div>

                <div className="sponsor-visit-btn" aria-hidden="true">
                  <ExternalLink size={18} />
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <p
                style={{
                  color: '#ffffff',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  margin: '0 0 10px',
                  lineHeight: 1.4,
                }}
              >
                {sponsor.tagline}
              </p>

              {/* Description */}
              <p
                style={{
                  color: 'var(--silver-dim)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  margin: '0 0 20px',
                  flex: 1,
                }}
              >
                {sponsor.description}
              </p>

              {/* Card Footer with Website link button */}
              <div className="sponsor-card-footer">
                <span
                  className="sponsor-card-footer-url"
                  style={{
                    color: sponsor.accentColor,
                  }}
                >
                  {sponsor.displayUrl}
                </span>

                <span className="sponsor-cta-pill">
                  <span>BESÖK HEMSIDA</span>
                  <ExternalLink size={12} style={{ color: sponsor.accentColor }} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
