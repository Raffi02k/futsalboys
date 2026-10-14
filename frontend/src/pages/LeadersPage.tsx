import React from 'react';
import { Mail, Instagram } from 'lucide-react';
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
    <div className="leaders-page" style={{ paddingTop: 'calc(var(--header-height) + 16px)', paddingBottom: '90px' }}>
      <PageMeta
        title={`Ledarna | ${siteConfig.projectName} - Trollhättan`}
        description="Möt ledarstaben bakom Futsal Boys Trollhättan: Raffi Medz, Elvis Mesic och Marcelo Villa. Historik, roller och framtida mål."
        canonicalPath="/ledarna"
      />

      <div className="container">
        {/* ==================================================================
            1. WIDESCREEN HERO - FYLLER HELA SEKTIONEN I SIDAN
           ================================================================== */}
        <section style={{ width: '100%', marginBottom: '32px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              background: '#07090b',
            }}
          >
            <img
              src="/images/futsalboys-ledare-breden.JPG"
              alt="Ledarstaben Futsal Boys Trollhättan - Raffi Medz, Elvis Mesic, Marcelo Villa"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '1376 / 768',
                objectFit: 'cover',
              }}
            />
          </div>
        </section>

          {/* Quick Leader Badges Strip under Image */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--neon-green)', minWidth: '40px' }}>
                #7
              </span>
              <div>
                <strong style={{ color: '#fff', fontSize: '16px', display: 'block' }}>Raffi Medz</strong>
                <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Huvudtränare & Klubbansvarig</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--neon-green)', minWidth: '40px' }}>
                #10
              </span>
              <div>
                <strong style={{ color: '#fff', fontSize: '16px', display: 'block' }}>Elvis Mesic</strong>
                <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Lagkapten & Spelande Ledare</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--neon-green)', minWidth: '40px' }}>
                #9
              </span>
              <div>
                <strong style={{ color: '#fff', fontSize: '16px', display: 'block' }}>Marcelo Villa</strong>
                <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Sportchef & Fysansvarig</span>
              </div>
            </div>
          </div>

          {/* Vision card & CTA */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '36px',
              textAlign: 'center',
              marginBottom: '72px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#ffffff',
                lineHeight: 1.1,
                margin: '0 0 16px',
              }}
            >
              TRE LEDARE, EN <span className="text-neon">GEMENSAM VISION</span>
            </h2>
            <p
              style={{
                color: 'var(--silver)',
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '720px',
                margin: '0 auto 28px',
              }}
            >
              Futsal Boys föddes ur en gemensam övertygelse: att Trollhättan förtjänar ett futsallag som spelar med hög intensitet, teknisk skicklighet och fullständigt engagemang. Genom att kombinera Raffis taktiska öga, Elvis ledarskap på parketten och Marcelos fysiska kravbild driver ledarna klubben framåt med vinnarmentalitet.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--neon btn--sm"
              >
                <Instagram size={16} />
                <span>FÖLJ RESAN PÅ INSTAGRAM</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn btn--outline btn--sm"
              >
                <Mail size={16} />
                <span>KONTAKTA LEDARNA</span>
              </a>
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
            3. LEDARPROFILER (Raffi, Elvis, Marcelo) - HORISONTELLA & KOMPAKTA
           ================================================================== */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#fff', margin: '0 0 6px' }}>
              MÖT <span className="text-neon">LEDARNA</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '14px', margin: 0 }}>
              En närmare presentation av varje ledares bakgrund och ansvarsområde.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {leadersList.map((leader) => (
              <div
                key={leader.name}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(180px, 240px) 1fr',
                  alignItems: 'stretch',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
                }}
                className="leader-profile-card news-card-hover"
              >
                {/* Image side */}
                <div style={{ position: 'relative', minHeight: '180px', overflow: 'hidden' }}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent 60%, rgba(18,22,28,0.95) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px',
                      color: 'var(--neon-green)',
                      background: 'rgba(7,9,11,0.9)',
                      padding: '2px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    #{leader.number}
                  </div>
                </div>

                {/* Content side */}
                <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--neon-green)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {leader.role}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#fff', margin: '2px 0 0' }}>
                      {leader.name}
                    </h3>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#fff', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '6px' }}>
                      Bakgrund:
                    </strong>
                    <span style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.45 }}>
                      {leader.historik}
                    </span>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: 'var(--neon-green)', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '6px' }}>
                      Ansvar:
                    </strong>
                    <span style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.45 }}>
                      {leader.ansvar}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {leader.egenskaper.map((prop) => (
                        <span
                          key={prop}
                          style={{
                            fontSize: '10.5px',
                            padding: '3px 8px',
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '6px',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--silver)',
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
