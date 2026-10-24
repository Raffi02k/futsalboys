import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { siteConfig } from '../content/siteContent';

export const LeadersPage: React.FC = () => {
  const leadersList = [
    {
      name: 'Raffi Medz',
      role: 'CEO & Content Manager',
      number: 7,
      image: '/images/players/raffi7K.JPG',
      historik: 'Raffi tog initiativet till Futsal Boys för att skapa en strukturerad, ambitiös futsalmiljö i Trollhättan. Som CEO och mediachef driver han klubbens varumärke, media och strategiska utveckling.',
      ansvar: 'Övergripande klubbledning, mediaproduktion, sociala medier och content management samt föreningsadministration.',
      egenskaper: ['CEO', 'Content Management', 'Klubbledning', 'Varumärkesbyggande'],
    },
    {
      name: 'Elvis Mesic',
      role: 'Sportchefen & Målvakten',
      number: 1,
      image: '/images/players/elvis1M.JPG',
      historik: 'Elvis är klubbens sportchef och vaktar kassen med järnhand. Med sin vinnarskalle och engagemang sätter han kravbilden i truppen och styr maskineriet på och utanför planen.',
      ansvar: 'Sportchef med ansvar för truppbygget, målvaktsspelet, matchförberedelser och lagets sammanhållning.',
      egenskaper: ['Sportchef', 'Målvakt', 'Truppbygge', 'Vinnarskalle'],
    },
    {
      name: 'Marcelo Villa',
      role: 'Generalen & Lagkapten',
      number: 3,
      image: '/images/players/marcelo3B.PNG',
      historik: 'Marcelo är lagets naturliga general och kapten på parketten. Med sin kompromisslösa fysik och spelförståelse leder han grabbarna genom tuffa drabbningar och sätter tonen.',
      ansvar: 'Kaptensbindeln, lagmoralen, fysisk status och att leda laget med maximal intensitet och hårdhet från första till sista sekund.',
      egenskaper: ['Generalen', 'Lagkapten', 'Fysik & Skärpa', 'Spelförståelse'],
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
    <div className="leaders-page" style={{ paddingTop: 'var(--header-height)', paddingBottom: '90px' }}>
      <PageMeta
        title={`Ledarna | ${siteConfig.projectName} - Trollhättan`}
        description="Möt ledarstaben bakom Futsal Boys Trollhättan: Raffi Medz, Elvis Mesic och Marcelo Villa. Historik, roller och framtida mål."
        canonicalPath="/ledarna"
      />

      {/* ==================================================================
          1. RESPONSIVE HERO - MOBIL ANVÄNDER STÅENDE FORMAT (futsalboys-ledare.JPG)
             DESKTOP ANVÄNDER BRED WIDESCREEN (futsalboys-ledare-breden.JPG)
         ================================================================== */}
      <section className="leaders-hero">
        <picture className="leaders-hero__picture">
          {/* Mobil: Stående 928x1152 bild så att hela trion syns i bild utan beskärning */}
          <source
            media="(max-width: 767px)"
            srcSet="/images/futsalboys-ledare.JPG"
          />
          {/* Desktop/Tablet: Liggande widescreen 1376x768 bild */}
          <img
            src="/images/futsalboys-ledare-breden.JPG"
            alt="Ledarstaben Futsal Boys Trollhättan - Raffi Medz, Elvis Mesic, Marcelo Villa"
            className="leaders-hero__img"
          />
        </picture>

        {/* Mjuk övergång till nästa sektion */}
        <div className="leaders-hero__overlay" aria-hidden="true" />
      </section>

      <div className="container">

          {/* Quick Leader Badges Strip under Image */}
          <div className="leaders-strip-grid">
            <div className="leaders-strip-card">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--neon-green)', minWidth: '40px' }}>
                #7
              </span>
              <div>
                <strong style={{ color: '#fff', fontSize: '16px', display: 'block' }}>Raffi Medz</strong>
                <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>CEO & Content Manager</span>
              </div>
            </div>

            <div className="leaders-strip-card">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--neon-green)', minWidth: '40px' }}>
                #1
              </span>
              <div>
                <strong style={{ color: '#fff', fontSize: '16px', display: 'block' }}>Elvis Mesic</strong>
                <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Sportchefen & Målvakten</span>
              </div>
            </div>

            <div className="leaders-strip-card">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--neon-green)', minWidth: '40px' }}>
                #3
              </span>
              <div>
                <strong style={{ color: '#fff', fontSize: '16px', display: 'block' }}>Marcelo Villa</strong>
                <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Generalen & Lagkapten</span>
              </div>
            </div>
          </div>

          {/* Vision card & CTA */}
          <div className="leaders-vision-card">
            <h2>
              TRE LEDARE, EN <span className="text-neon">GEMENSAM VISION</span>
            </h2>
            <p>
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
            SNABB-Q&A: MÖT LEDARNA BAKOM FUTSAL BOYS!
           ================================================================== */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#fff', margin: '0 0 8px' }}>
              LEDARNAS TANKAR • <span className="text-neon">SNABB-Q&A 🧠⚽️</span>
            </h2>
            <p style={{ color: 'var(--silver)', fontSize: '15px', maxWidth: '820px', lineHeight: 1.6, margin: 0 }}>
              Det är vi som styr skutan, lägger taktiken och ser till att maskineriet rullar. För att ni ska lära känna oss lite bättre tog vi en snabb Q&A där svaren visar ganska exakt hur olika (och sköna) vi är!
            </p>
          </div>

          <div className="leaders-qa-grid">
            {/* Fråga 1 */}
            <div className="leaders-qa-card news-card-hover">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: 'var(--neon-green)',
                    background: 'rgba(16,255,96,0.1)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(16,255,96,0.25)',
                  }}
                >
                  Q1
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                  BESKRIV ÅRETS FUTSAL BOYS MED TRE ORD!
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid var(--neon-green)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--neon-green)', display: 'block', marginBottom: '2px' }}>
                    💬 Elvis (Sportchefen & Målvakten)
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Helt topp topp!"
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid #60a5fa' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', display: 'block', marginBottom: '2px' }}>
                    💬 Raffi (CEO & Content Manager)
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Vänskap, show, framtiden."
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid #f59e0b' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', display: 'block', marginBottom: '2px' }}>
                    💬 Marcelo (Generalen & Lagkapten)
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Snabba, Faden, Snygga. 😉"
                  </p>
                </div>
              </div>
            </div>

            {/* Fråga 2 */}
            <div className="leaders-qa-card news-card-hover">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: 'var(--neon-green)',
                    background: 'rgba(16,255,96,0.1)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(16,255,96,0.25)',
                  }}
                >
                  Q2
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                  MÅL ELLER ASSIST? VAD VÄLJER DU?
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid var(--neon-green)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--neon-green)', display: 'block', marginBottom: '2px' }}>
                    💬 Elvis
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Assist. (Lagspelaren!)"
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid #60a5fa' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', display: 'block', marginBottom: '2px' }}>
                    💬 Raffi
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Mål! ⚽️"
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid #f59e0b' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', display: 'block', marginBottom: '2px' }}>
                    💬 Marcelo
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Mål. Assist är för dem som missar. 🤷‍♂️🔥"
                  </p>
                </div>
              </div>
            </div>

            {/* Fråga 3 (tidigare 4) */}
            <div className="leaders-qa-card news-card-hover">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: 'var(--neon-green)',
                    background: 'rgba(16,255,96,0.1)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(16,255,96,0.25)',
                  }}
                >
                  Q3
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                  VAD SER NI MEST FRAM EMOT MED ÅRETS SÄSONG?
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid var(--neon-green)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--neon-green)', display: 'block', marginBottom: '2px' }}>
                    💬 Elvis
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Att lyfta bucklan! 🏆"
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid #60a5fa' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', display: 'block', marginBottom: '2px' }}>
                    💬 Raffi
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Att visa hur ett lag kan ledas med tre stabila klassmän."
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', borderLeft: '3px solid #f59e0b' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', display: 'block', marginBottom: '2px' }}>
                    💬 Marcelo
                  </span>
                  <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontStyle: 'italic' }}>
                    "Att knäna håller hela säsongen... 🙏🩹"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Community Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16,255,96,0.08) 0%, var(--bg-card) 100%)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '22px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#fff', margin: '0 0 6px' }}>
                VILKEN LEDARE KÄNNER DU IGEN DIG MEST I?
              </h4>
              <p style={{ color: 'var(--silver)', fontSize: '14px', margin: 0 }}>
                Vad har ni för frågor till ledarna och vad vill ni se för content? Kommentera och följ oss på Instagram! 💚🖤
              </p>
            </div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--neon btn--sm"
            >
              <Instagram size={15} />
              <span>KOMMENTERA PÅ INSTAGRAM</span>
            </a>
          </div>
        </section>

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {leadersList.map((leader) => (
              <div
                key={leader.name}
                className="leader-profile-card news-card-hover"
              >
                {/* Image side */}
                <div className="leader-profile-img-wrap">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="leader-profile-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14,18,23,0.85) 0%, transparent 40%)',
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
                <div className="leader-profile-content">
                  <div style={{ marginBottom: '10px' }}>
                    <span className="leader-profile-role">
                      {leader.role}
                    </span>
                    <h3 className="leader-profile-name">
                      {leader.name}
                    </h3>
                  </div>

                  <div className="leader-profile-block">
                    <strong className="leader-profile-label">
                      Bakgrund:
                    </strong>
                    <span className="leader-profile-text">
                      {leader.historik}
                    </span>
                  </div>

                  <div className="leader-profile-block" style={{ marginBottom: 0 }}>
                    <strong className="leader-profile-label text-neon">
                      Ansvar:
                    </strong>
                    <span className="leader-profile-text">
                      {leader.ansvar}
                    </span>
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
