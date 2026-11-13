import React from 'react';
import { ExternalLink, Sparkles, Mail, Instagram, ShieldCheck, Flame, Zap } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { sponsorsList, Sponsor } from '../content/sponsorsData';
import { siteConfig } from '../content/siteContent';

export const SponsorsPage: React.FC = () => {
  // Duplicate for smooth marquee loop
  const marqueeSponsors = [...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList];

  const renderSponsorLogo = (sponsor: Sponsor) => {
    return (
      <div
        className="sponsor-logo-box"
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '16px',
          background: sponsor.logoBg || '#070a0e',
          border: `2px solid ${sponsor.accentColor}`,
          boxShadow: `0 0 18px ${sponsor.glowColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          padding: '6px',
        }}
      >
        <img
          src={sponsor.image}
          alt={sponsor.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: sponsor.logoFit || 'contain',
            borderRadius: '10px',
            display: 'block',
          }}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <div
      className="sponsors-page"
      style={{
        paddingTop: 'calc(var(--header-height) + 32px)',
        paddingBottom: '100px',
        minHeight: '85vh',
      }}
    >
      <PageMeta
        title={`Våra Sponsorer & Samarbetspartners | ${siteConfig.projectName} - Trollhättan`}
        description="Möt de officiella sponsorerna och partnerna som stöttar Futsal Boys: Abnormal, Wild Chips och Adamas. Läs om våra samarbeten och besök deras hemsidor."
        canonicalPath="/sponsorer"
      />

      <div className="container">
        {/* H1 Hero Banner with Team Image and Text Over It */}
        <div className="sponsors-hero-banner">
          <img
            src="/images/players/Lagfoto.JPG"
            alt="Futsal Boys Lagfoto & Sponsorer"
            className="sponsors-hero-bg"
            loading="eager"
          />
          <div className="sponsors-hero-overlay" />

          <div className="sponsors-hero-content">
            <p className="sponsors-hero-sub">
              OFFICIELLA KLUBBPARTNERS • TROLLHÄTTAN
            </p>

            <h1 className="sponsors-hero-h1">
              VÅRA <span className="text-neon">SPONSORER</span> & SAMARBETEN
            </h1>

            <p className="sponsors-hero-desc">
              Framgång på futsalplanen bygger på hårt arbete, passion och starka samarbeten. Vi är otroligt stolta över att representera och backas upp av ledande svenska varumärken inom energi, nutrition och sportutrustning.
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

      {/* Infinite Rolling Ticker */}
      <div className="sponsors-ticker-wrap" style={{ margin: '30px 0 60px' }}>
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

      <div className="container">
        {/* Main Sponsors Cards Grid */}
        <div className="sponsors-featured-grid" style={{ marginBottom: '60px' }}>
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {renderSponsorLogo(sponsor)}
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '30px',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {sponsor.name}
                    </h2>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
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
                  fontSize: '15px',
                  fontWeight: 700,
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
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  margin: '0 0 24px',
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
                    fontWeight: 700,
                  }}
                >
                  {sponsor.displayUrl}
                </span>

                <span className="sponsor-cta-pill">
                  <span>BESÖK HEMSIDA</span>
                  <ExternalLink size={13} style={{ color: sponsor.accentColor }} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Detailed Collaboration Spotlight */}
        <div style={{ marginBottom: '60px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '34px',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            HUR VÅRA SPONSORER <span className="text-neon">STÄRKER LAGET</span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Abnormal Spotlight */}
            <div
              style={{
                background: 'rgba(14, 20, 28, 0.85)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: '#00e5ff' }}>
                <Zap size={22} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: 0, color: '#fff' }}>
                  ABNORMAL ENERGY
                </h3>
              </div>
              <p style={{ color: 'var(--silver-dim)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                Håller intensiteten och fokusen på topp under 40 minuters tufft futsalspel med hög koffeinhalt (55mg/100ml) och välsmakande vitaminboost.
              </p>
            </div>

            {/* Wild Chips Spotlight */}
            <div
              style={{
                background: 'rgba(14, 20, 28, 0.85)',
                border: '1px solid rgba(255, 153, 0, 0.3)',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: '#ff9900' }}>
                <Flame size={22} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: 0, color: '#fff' }}>
                  WILD CHIPS NUTRITION
                </h3>
              </div>
              <p style={{ color: 'var(--silver-dim)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                Naturligt lättrökt svenskt viltkött från älg, hjort och ren. Packat med 42% rent protein för optimal muskelåterhämtning efter matcherna.
              </p>
            </div>

            {/* Adamas Spotlight */}
            <div
              style={{
                background: 'rgba(14, 20, 28, 0.85)',
                border: '1px solid rgba(16, 255, 96, 0.3)',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: 'var(--neon-green)' }}>
                <ShieldCheck size={22} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: 0, color: '#fff' }}>
                  ADAMAS PERFORMANCE
                </h3>
              </div>
              <p style={{ color: 'var(--silver-dim)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                Ultralätta svenska benskydd på endast 25g. Stötdämpande hex-skydd och perfekt passform utan tejp ger spelarna maximal fart och rörelsefrihet.
              </p>
            </div>
          </div>
        </div>

        {/* Become a Partner Call-to-Action Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 255, 96, 0.12) 0%, rgba(12, 17, 24, 0.95) 100%)',
            border: '1px solid rgba(16, 255, 96, 0.4)',
            borderRadius: '24px',
            padding: '48px 36px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 255, 96, 0.15)',
            maxWidth: '860px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--neon-green)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={16} />
            <span>BLI EN PARTNER TILL FUTSAL BOYS</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4.5vw, 46px)',
              color: '#ffffff',
              margin: '0 0 14px',
              lineHeight: 1.15,
            }}
          >
            VILL DITT FÖRETAG <span className="text-neon">SYNAS MED OSS?</span>
          </h2>

          <p
            style={{
              color: '#d0d8e0',
              fontSize: '15px',
              lineHeight: 1.6,
              maxWidth: '640px',
              margin: '0 auto 28px',
            }}
          >
            Vi erbjuder skräddarsydda sponsorskap med stark exponering på våra matchställ, ledarkläder, cuper och sociala medier till tusentals engagerade följare. Kontakta oss för att diskutera ett samarbete!
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={`mailto:${siteConfig.email}?subject=Sponsorskap%20och%20samarbete%20med%20Futsal%20Boys`}
              className="btn btn--neon"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: 800,
              }}
            >
              <Mail size={16} />
              <span>MEJLA KLUBBEN ({siteConfig.email})</span>
            </a>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: 800,
              }}
            >
              <Instagram size={16} />
              <span>DM PÅ INSTAGRAM</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
