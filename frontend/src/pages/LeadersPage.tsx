import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, ArrowLeft } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { siteConfig } from '../content/siteContent';

export const LeadersPage: React.FC = () => {
  const leadersList = [
    {
      name: 'Raffi Medz',
      role: 'Huvudtränare & Klubbansvarig',
      number: 7,
      image: '/images/players/raffi.jpg',
      historik: 'Raffi tog initiativet till Futsal Boys för att skapa en strukturerad, ambitiös futsalmiljö i Trollhättan. Med gedigen fotbollsbakgrund och passion för sporten har han satt klubbens struktur, taktiska linjer och organisation från start.',
      ansvar: 'Huvudansvarig för matchtaktik, speluppbyggnad och träningsupplägg. Raffi leder lagets förberedelser inför seriespel och cuper och driver föreningens administration.',
      egenskaper: ['Taktik & Speluppbyggnad', 'Matchcoachning', 'Klubborganisation'],
    },
    {
      name: 'Elvis Mesic',
      role: 'Lagkapten & Spelande Ledare',
      number: 10,
      image: '/images/players/elvis.jpg',
      historik: 'Elvis är lagets naturlige pådrivare och offensiva härförare på parketten. Med sin blixtsnabba teknik och starka vinnarskalle sätter han kravbilden i omklädningsrummet och leder laget i matchernas mest avgörande moment.',
      ansvar: 'Kaptensbindeln och lagets sammanhållning. Elvis ansvarar för energin på planen, peppar medspelare under press och driver lagets offensiva spets.',
      egenskaper: ['Ledarskap på Planen', 'Offensiv Spets', 'Vinnarmentalitet'],
    },
    {
      name: 'Marcelo Villa',
      role: 'Sportchef & Fysansvarig',
      number: 9,
      image: '/images/players/marcelo.jpg',
      historik: 'Marcelo är en kompromisslös avslutare med mångårig futsalerfarenhet. Hans fysik och spelförståelse gör honom till en nyckelfigur i truppbygget och ledarstaben.',
      ansvar: 'Sportsligt ansvarig för spelartruppens fysiska status, uthållighet och truppbalans. Marcelo ser till att laget orkar pressa intensivt i 40 effektiva minuter under tuffa turneringshelger.',
      egenskaper: ['Fysik & Uthållighet', 'Avslutsmiljö', 'Truppharmoni'],
    },
  ];

  const futurePlans = [
    {
      step: '01',
      title: 'SERIEDOMINANS I ARENA ÄLVHÖGSBORG',
      period: 'HÖST / VINTER 2026',
      desc: 'Etablera ett starkt hemmaspel med snabba omställningar, hög press och underhållande futsal inför Trollhättepubliken.',
    },
    {
      step: '02',
      title: 'POKALJAKT I FÄRGELANDA CUP & REGIONALA TURNERINGAR',
      period: 'DECEMBER 2026',
      desc: 'Mäta oss mot de skickligaste inomhuslagen i regionen med Färgelanda Futsal Cup som årets stora turneringsmål.',
    },
    {
      step: '03',
      title: 'TALANGUTVECKLING & LÅNGSIKTIG FÖRENINGSKULTUR',
      period: '2027 OCH FRAMÅT',
      desc: 'Ge Trollhättans hungrigaste unga talanger en seriös plattform att växa på med professionellt ledarskap och gemenskap.',
    },
  ];

  return (
    <div className="leaders-page" style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '90px' }}>
      <PageMeta
        title={`Ledarna | ${siteConfig.projectName} - Trollhättan`}
        description="Möt ledarstaben bakom Futsal Boys Trollhättan: Raffi Medz, Elvis Mesic och Marcelo Villa. Historik, roller och framtida mål."
        canonicalPath="/ledarna"
      />

      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '28px' }}>
          <Link to="/" className="gallery-back-link">
            <ArrowLeft size={16} />
            <span>Tillbaka till start</span>
          </Link>
        </div>

        {/* Clean, authentic Page Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(40px, 6vw, 68px)', marginBottom: '12px', lineHeight: 0.95 }}>
            LEDARNA • <span className="text-neon">FUTSAL BOYS</span>
          </h1>
          <p style={{ color: 'var(--silver)', fontSize: '17px', maxWidth: '780px', lineHeight: 1.6 }}>
            Klubbens grundare och tränarstab. Här möter du trion bakom lagets spelsystem, gemenskap och sportsliga satsning i Trollhättan.
          </p>
        </div>

        {/* ==================================================================
            1. FULL POSTER SHOWCASE (Ingen beskärning av bilden!)
           ================================================================== */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-neon)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 35px rgba(16, 255, 96, 0.15)',
            marginBottom: '72px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* The Full, Uncropped Poster */}
            <div style={{ textAlign: 'center' }}>
              <img
                src="/images/futsalboys-ledare.JPG"
                alt="Ledarstaben Futsal Boys - Raffi Medz, Elvis Mesic, Marcelo Villa"
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.7)',
                }}
              />
            </div>

            {/* Explanatory text & Leadership details */}
            <div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: 'var(--neon-green)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                GRUNDARNA AV FUTSAL BOYS
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 3.8vw, 44px)',
                  color: '#ffffff',
                  lineHeight: 1.05,
                  margin: '0 0 16px',
                }}
              >
                TRE LEDARE, EN <span className="text-neon">GEMENSAM VISION</span>
              </h2>

              <p style={{ color: 'var(--silver)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Futsal Boys föddes ur en gemensam övertygelse: att Trollhättan förtjänar ett futsallag som spelar med hög intensitet, teknisk skicklighet och fullständigt engagemang. Genom att kombinera Raffis taktiska öga, Elvis ledarskap på parketten och Marcelos fysiska kravbild driver ledarna klubben framåt med vinnarmentalitet.
              </p>

              {/* Leader trio pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--neon-green)', minWidth: '34px' }}>
                    #7
                  </span>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>Raffi Medz</strong>
                    <span style={{ color: 'var(--silver-dim)', fontSize: '12px' }}>Huvudtränare & Klubbansvarig</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--neon-green)', minWidth: '34px' }}>
                    #10
                  </span>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>Elvis Mesic</strong>
                    <span style={{ color: 'var(--silver-dim)', fontSize: '12px' }}>Lagkapten & Spelande Ledare</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--neon-green)', minWidth: '34px' }}>
                    #9
                  </span>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>Marcelo Villa</strong>
                    <span style={{ color: 'var(--silver-dim)', fontSize: '12px' }}>Sportchef & Fysansvarig</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--neon btn--sm"
                >
                  <Instagram size={15} />
                  <span>FÖLJ RESAN PÅ INSTAGRAM</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn btn--outline btn--sm"
                >
                  <Mail size={15} />
                  <span>KONTAKTA LEDARNA</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            2. FRAMTIDSPLANER & STRATEGISK PLAN (Proffsig, sportig layout)
           ================================================================== */}
        <section style={{ marginBottom: '72px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', color: '#fff', margin: '0 0 8px' }}>
              FRAMTIDA PLANER & <span className="text-neon">STRATEGI</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '15px' }}>
              Hur ledarstaben bygger Futsal Boys mot toppen säsongen 2026/27.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {futurePlans.map((plan) => (
              <div
                key={plan.step}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '32px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
                }}
                className="news-card-hover"
              >
                {/* Big Step Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '54px',
                    color: 'var(--neon-green)',
                    lineHeight: 1,
                    marginBottom: '12px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {plan.step}
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--silver-dim)',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    display: 'block',
                  }}
                >
                  {plan.period}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    color: '#ffffff',
                    lineHeight: 1.15,
                    marginBottom: '12px',
                  }}
                >
                  {plan.title}
                </h3>

                <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {plan.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            3. LEDARPROFILER (Raffi, Elvis, Marcelo)
           ================================================================== */}
        <section>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', color: '#fff', margin: '0 0 8px' }}>
              MÖT <span className="text-neon">LEDARNA</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '15px' }}>
              En närmare presentation av varje ledares bakgrund och ansvarsområde.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {leadersList.map((leader) => (
              <div
                key={leader.name}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  alignItems: 'stretch',
                }}
                className="leader-profile-card"
              >
                <div style={{ position: 'relative', minHeight: '300px', overflow: 'hidden' }}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(10,13,16,0.95) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '18px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      color: 'var(--neon-green)',
                      background: 'rgba(7,9,11,0.88)',
                      padding: '4px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--neon-green-glow)',
                    }}
                  >
                    #{leader.number}
                  </div>
                </div>

                <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--neon-green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {leader.role}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', color: '#fff', margin: '4px 0 16px' }}>
                    {leader.name}
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      Bakgrund:
                    </strong>
                    <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                      {leader.historik}
                    </p>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ color: 'var(--neon-green)', fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      Ansvarsområde i klubben:
                    </strong>
                    <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                      {leader.ansvar}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {leader.egenskaper.map((prop) => (
                        <span
                          key={prop}
                          style={{
                            fontSize: '11px',
                            padding: '4px 10px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '6px',
                            border: '1px solid var(--border-subtle)',
                            color: '#fff',
                            fontWeight: 600,
                          }}
                        >
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
