import React from 'react';
import { ExternalLink, Handshake } from 'lucide-react';
import { sponsorsList, Sponsor } from '../content/sponsorsData';

export const SponsorsSection: React.FC = () => {
  // Duplicate for smooth infinite CSS marquee loop
  const marqueeSponsors = [...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList];

  const renderSponsorLogo = (sponsor: Sponsor) => {
    switch (sponsor.id) {
      case 'abnormal':
        return (
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #061822 0%, #030a0f 100%)',
              border: `2px solid ${sponsor.accentColor}`,
              boxShadow: `0 0 20px ${sponsor.glowColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              lineHeight: 0.9,
              letterSpacing: '0.08em',
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '15px', color: '#ffffff' }}>ABNO</span>
            <span style={{ fontSize: '15px', color: sponsor.accentColor }}>RMAL</span>
          </div>
        );

      case 'wildchips':
        return (
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #221406 0%, #0f0903 100%)',
              border: `2px solid ${sponsor.accentColor}`,
              boxShadow: `0 0 20px ${sponsor.glowColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              letterSpacing: '0.04em',
              flexShrink: 0,
              padding: '4px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '18px', color: sponsor.accentColor, fontWeight: 900 }}>WILD</span>
            <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 800, letterSpacing: '0.12em' }}>CHIPS</span>
          </div>
        );

      case 'adamas':
      default:
        return (
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0a140d 0%, #050a06 100%)',
              border: `2px solid ${sponsor.accentColor}`,
              boxShadow: `0 0 20px ${sponsor.glowColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {/* Diamond polygon icon */}
            <svg
              width="26"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={sponsor.accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 8px ${sponsor.accentColor})`, marginBottom: '2px' }}
            >
              <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
              <path d="M10 3l-2 7 4 11 4-11-2-7" />
              <path d="M2 10h20" />
            </svg>
            <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 900, letterSpacing: '0.14em' }}>
              ADAMAS
            </span>
          </div>
        );
    }
  };

  return (
    <section className="sponsors-section" id="sponsorer" aria-label="Våra sponsorer">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(16, 255, 96, 0.1)',
              border: '1px solid var(--border-neon)',
              color: 'var(--neon-green)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <Handshake size={15} />
            <span>OFFICIELLA SPONSORER & PARTNERS</span>
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              marginBottom: '12px',
            }}
          >
            VÅRA <span className="text-neon">SPONSORER</span>
          </h2>

          <p
            className="section-desc"
            style={{
              margin: '0 auto',
              fontSize: '15.5px',
              lineHeight: 1.6,
              color: 'var(--silver-dim)',
            }}
          >
            Vi är stolta över att samarbeta med ledande varumärken som delar vår ambition, energi och passion för futsal. Klicka på en sponsor för att besöka deras officiella sida!
          </p>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span
                    className="sponsor-category-pill"
                    style={{
                      background: `rgba(${sponsor.id === 'abnormal' ? '0, 229, 255' : sponsor.id === 'wildchips' ? '255, 153, 0' : '16, 255, 96'}, 0.15)`,
                      color: sponsor.accentColor,
                      border: `1px solid ${sponsor.accentColor}`,
                    }}
                  >
                    {sponsor.badge}
                  </span>
                </div>

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

                <div
                  className="sponsor-visit-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: sponsor.accentColor,
                    flexShrink: 0,
                  }}
                >
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  marginTop: 'auto',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    color: sponsor.accentColor,
                    letterSpacing: '0.06em',
                  }}
                >
                  {sponsor.displayUrl}
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                  }}
                  className="sponsor-cta-pill"
                >
                  <span>BESÖK HEMSIDA</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
