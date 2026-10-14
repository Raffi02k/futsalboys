import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, ArrowLeft, Target, Compass, Sparkles, BookOpen } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { siteConfig } from '../content/siteContent';

export const LeadersPage: React.FC = () => {
  const leadersList = [
    {
      name: 'Raffi Medz',
      role: 'Huvudtränare & Klubbansvarig',
      number: 7,
      image: '/images/players/raffi.jpg',
      historik: 'Raffi var initiativtagaren som grundade Futsal Boys ur passionen för det snabba inomhusspelet i Trollhättan. Med erfarenhet från både föreningsidrott och ledarskap satte han strukturen, värderingarna och den långsiktiga planen från dag ett.',
      planer: 'Att bygga en taktisk identitet i världsklass för Futsal Boys – med snabba spelvändningar, hög press och disciplinerat försvarsspel. Raffi ansvarar för lagets spelsystem, matchanalyser och för att utveckla truppens spelförståelse inför seriespelet och kommande cuper som Färgelanda Cup.',
      skills: ['Taktik & Speluppbyggnad', 'Matchcoachning', 'Klubbadministration', 'Spelarutveckling'],
    },
    {
      name: 'Elvis Mesic',
      role: 'Lagkapten & Spelande Ledare',
      number: 10,
      image: '/images/players/elvis.jpg',
      historik: 'Elvis har varit lagets naturliga kapten och pådrivare sedan starten. Som en av regionens skickligaste offensiva spelare leder han genom exempel i varje match och varje träning. Han bär kaptensbindeln och sätter vinnarmentaliteten i omklädningsrummet.',
      planer: 'Att leda Futsal Boys till cupguld och topplaceringar. Elvis fokuserar på att svetsa samman spelartruppen till en enhet där alla kämpar för varandra, lyfter nyförvärv och ser till att energinivån alltid är på max när domaren blåser igång.',
      skills: ['Ledarskap på Planen', 'Offensiv Spets', 'Vinnarmentalitet', 'Teambuilding'],
    },
    {
      name: 'Marcelo Villa',
      role: 'Sportchef & Fysansvarig',
      number: 9,
      image: '/images/players/marcelo.jpg',
      historik: 'Marcelo anslöt som en central pelare i ledarstaben med stor rutin från intensiv futsal. Hans kompromisslösa fysik och målsinne har format lagets fysiska status och kravbild under försäsong och cuper.',
      planer: 'Att säkerställa att Futsal Boys är det bäst tränade och mest uthålliga laget i Västra Götaland. Marcelo planerar fysupplägget för att klara tuffa cuper med täta matcher och ansvarar för scouting och truppbalans.',
      skills: ['Fysisk Träning & Uthållighet', 'Avslutsteknik', 'Defensiv Organisation', 'Scouting'],
    },
  ];

  const futurePlans = [
    {
      icon: Target,
      title: 'Seriespel & Cuper 2026/27',
      desc: 'Målet är glasklart: att etablera Futsal Boys i den absoluta toppen. Ledarna förbereder truppen inför seriespelet och höstens stora turneringar, med Färgelanda Futsal Cup i december som nästa stora delmål.',
    },
    {
      icon: Compass,
      title: 'Taktisk Profil & Identitet',
      desc: 'Ett modernt spelsystem med 3-1 och 4-0 rotationer, blixtsnabba kontringar och aggressivt presspel över hela banan. Ledarna tränar laget att spela under hög press med millimeterprecision.',
    },
    {
      icon: Sparkles,
      title: 'Gemenskap & Föreningskultur',
      desc: 'Futsal Boys ska vara en samlingspunkt för Trollhättans ungdomar och talanger. Genom respekt, disciplin och passion bygger ledarna en kultur där alla utvecklas som både spelare och individer.',
    },
  ];

  return (
    <div className="leaders-page" style={{ paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: '80px' }}>
      <PageMeta
        title={`Ledarna | ${siteConfig.projectName} - Trollhättan`}
        description="Möt ledarstaben bakom Futsal Boys Trollhättan: Raffi Medz, Elvis Mesic och Marcelo Villa. Läs om historiken, filosofin och planerna."
        canonicalPath="/ledarna"
      />

      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <Link to="/" className="gallery-back-link">
            <ArrowLeft size={16} />
            <span>Tillbaka till start</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px, 6vw, 64px)', marginBottom: '16px' }}>
            LEADERS OF THE <span className="text-neon">CLUB</span>
          </h1>
          <p className="section-desc" style={{ margin: '0 auto 28px', fontSize: '17px' }}>
            Trion bakom Futsal Boys. Möt ledarna, upptäck klubbens historia och ta del av framtidsplanerna för futsalen i Trollhättan.
          </p>
        </div>

        {/* ==================================================================
            1. FEATURED BIG LEADER HERO CARD
           ================================================================== */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid var(--neon-green)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(16, 255, 96, 0.2)',
            marginBottom: '72px',
            background: 'var(--bg-card)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center' }}>
            <div style={{ position: 'relative', minHeight: '420px', maxHeight: '540px', overflow: 'hidden' }}>
              <img
                src="/images/futsalboys-ledare.JPG"
                alt="Ledarstaben Futsal Boys - Raffi Medz, Elvis Mesic, Marcelo Villa"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(10,13,16,0.1) 0%, rgba(10,13,16,0.88) 100%)',
                }}
              />
            </div>

            <div style={{ padding: '44px 36px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 42px)', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
                TRE LEDARE, EN <span className="text-neon">GEMENSAM VISION</span>
              </h2>
              <p style={{ color: 'var(--silver)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Futsal Boys är mer än ett lag – det är en rörelse grundad av Raffi Medz, Elvis Mesic och Marcelo Villa. Genom att kombinera passion för sporten med stenhård träning och taktisk disciplin har ledarna skapat en plattform där lokala talanger från Trollhättan utvecklas till vinnare.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--neon btn--sm"
                >
                  <Instagram size={15} />
                  <span>FÖLJ VÅR RESA PÅ INSTAGRAM</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn btn--outline btn--sm"
                >
                  <Mail size={15} />
                  <span>KONTAKTA LEDARSTABEN</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            2. KLUBBENS HISTORIK & HUR ALLT STARTADE
           ================================================================== */}
        <section
          style={{
            background: 'linear-gradient(135deg, #10141a 0%, #171e27 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '40px 32px',
            marginBottom: '72px',
          }}
        >
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <BookOpen size={24} className="text-neon" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#fff', margin: 0 }}>
                HISTORIKEN BAKOM <span className="text-neon">FUTSAL BOYS</span>
              </h2>
            </div>

            <p style={{ color: 'var(--silver)', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Allt började på Trollhättans inomhusplaner och gator. Raffi, Elvis och Marcelo spelade tillsammans under många år och såg hur mycket futsalkompetens och råtalang som fanns i staden, men som saknade en dedikerad struktur.
            </p>

            <p style={{ color: 'var(--silver)', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Under 2024 tog trion beslutet att formalisera satsningen: <strong>Futsal Boys Trollhättan</strong> föddes. Med egna resurser, sponsorer och ett brinnande hjärta för sporten togs matchtröjor fram, träningspass i Arena Älvhögsborg spikades, och de främsta spelarna handplockades. Redan under första året visade laget framfötterna i lokala och regionala cuper med starka resultat.
            </p>

            <blockquote
              style={{
                borderLeft: '4px solid var(--neon-green)',
                paddingLeft: '20px',
                fontStyle: 'italic',
                color: '#ffffff',
                fontSize: '16px',
                margin: '28px 0 0',
                background: 'rgba(255,255,255,0.02)',
                padding: '16px 20px',
                borderRadius: '0 10px 10px 0',
              }}
            >
              "Vi startade detta för att vi älskar futsal och ville ge Trollhättan ett lag som spelar med hjärta, snabbhet och vinnarmentalitet. När vi kliver in på planen representerar vi hela staden." — Ledarstaben
            </blockquote>
          </div>
        </section>

        {/* ==================================================================
            3. LEDARNAS FRAMTIDSPLANER & VISION 2026/27
           ================================================================== */}
        <section style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', color: '#fff', margin: '0 0 12px' }}>
              LEDARNAS <span className="text-neon">FRAMTIDSPLANER</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '15px' }}>
              Här är målen och de strategiska stegen som ledarstaben arbetar mot under säsongen 2026/27.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {futurePlans.map((plan, idx) => {
              const IconComp = plan.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '30px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
                  }}
                  className="leader-profile-card"
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'rgba(16, 255, 96, 0.12)',
                      border: '1px solid var(--neon-green-glow)',
                      color: 'var(--neon-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <IconComp size={26} />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', margin: '0 0 12px' }}>
                    {plan.title}
                  </h3>

                  <p style={{ color: 'var(--silver-dim)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    {plan.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================================
            4. DJUPA PROFILER FÖR VARJE LEDARE
           ================================================================== */}
        <section>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', color: '#fff', margin: '0 0 12px' }}>
              MÖT <span className="text-neon">LEDARNA</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '15px' }}>
              En närmare titt på Raffi, Elvis och Marcelo – deras bakgrund, ansvarsområden och individuella planer.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {leadersList.map((leader) => (
              <div
                key={leader.name}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  alignItems: 'stretch',
                }}
                className="leader-profile-card"
              >
                <div style={{ position: 'relative', minHeight: '340px', overflow: 'hidden' }}>
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
                      top: '20px',
                      left: '20px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '36px',
                      color: 'var(--neon-green)',
                      background: 'rgba(7,9,11,0.88)',
                      padding: '4px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--neon-green-glow)',
                    }}
                  >
                    #{leader.number}
                  </div>
                </div>

                <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--neon-green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {leader.role}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', margin: '4px 0 16px' }}>
                    {leader.name}
                  </h3>

                  <div style={{ marginBottom: '18px' }}>
                    <strong style={{ color: '#fff', fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Bakgrund & Historik:
                    </strong>
                    <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                      {leader.historik}
                    </p>
                  </div>

                  <div style={{ marginBottom: '22px' }}>
                    <strong style={{ color: 'var(--neon-green)', fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      Mål & Framtidsplaner:
                    </strong>
                    <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                      {leader.planer}
                    </p>
                  </div>

                  <div>
                    <strong style={{ fontSize: '11px', color: 'var(--silver-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
                      Specialområden:
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {leader.skills.map((skill) => (
                        <span
                          key={skill}
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
                          {skill}
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
