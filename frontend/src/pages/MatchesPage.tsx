import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  Flame,
  Trophy,
  Users,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { upcomingMatch, clubNewsList, winterSchedule } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

// ============================================================================
// CUPTRUPPEN TILL FÄRGELANDA FUTSAL CUP 2026:
// 12 spelare uttagna (Kasper ersätter Mentor, Hugo ersätter John, Stefan ersätter Hüsnücan, Tro ersätter Ashraf, Marcelo ersätter Kemal)
// Endast förnamn visas enligt önskemål.
// ============================================================================
export interface CupPlayer {
  id: string;
  number: number;
  name: string;
  position: 'MÅLVAKT' | 'FÖRSVAR' | 'MITTFÄLT' | 'FORWARD' | 'SPELARE';
  status: 'UTTAGEN' | 'RESERV';
}

export const fargelandaCupSquad: CupPlayer[] = [
  { id: 'c1', number: 1, name: 'Elvis', position: 'MÅLVAKT', status: 'UTTAGEN' },
  { id: 'c2', number: 3, name: 'Marcelo', position: 'FÖRSVAR', status: 'UTTAGEN' },
  { id: 'c3', number: 7, name: 'Raffi', position: 'MITTFÄLT', status: 'UTTAGEN' },
  { id: 'c4', number: 11, name: 'Mehdi', position: 'MITTFÄLT', status: 'UTTAGEN' },
  { id: 'c5', number: 6, name: 'Wael', position: 'FORWARD', status: 'UTTAGEN' },
  { id: 'c6', number: 24, name: 'Wictor', position: 'FÖRSVAR', status: 'UTTAGEN' },
  { id: 'c7', number: 4, name: 'Hugo', position: 'FORWARD', status: 'UTTAGEN' },
  { id: 'c8', number: 9, name: 'Stefan', position: 'FORWARD', status: 'UTTAGEN' },
  { id: 'c9', number: 10, name: 'Kasper', position: 'MITTFÄLT', status: 'UTTAGEN' },
  { id: 'c10', number: 14, name: 'Lucas', position: 'FÖRSVAR', status: 'UTTAGEN' },
  { id: 'c11', number: 18, name: 'Emin', position: 'FORWARD', status: 'UTTAGEN' },
  { id: 'c12', number: 22, name: 'Tro', position: 'FÖRSVAR', status: 'UTTAGEN' },
];

// ============================================================================
// FEATURED CUPS FOR TOP CAROUSEL & DYNAMIC COUNTDOWN
// ============================================================================
export interface FeaturedCup {
  id: string;
  slug: string;
  shortName: string;
  badge: string;
  titlePrimary: string;
  titleHighlight: string;
  targetDate: string; // ISO format
  description: string;
  dateLabel: string;
  venueLabel: string;
  organizerLabel: string;
  countdownHeader: string;
  countdownSubtext: string;
  detailUrl: string;
  proCupUrl?: string;
  externalUrl?: string;
  externalBtnLabel?: string;
}

export const featuredCups: FeaturedCup[] = [
  {
    id: 'fargelanda',
    slug: 'fargelanda-cup',
    shortName: 'Färgelanda Cup',
    badge: 'VINTERNS STORA CUPÄVENTYR • CUP 1 AV 3',
    titlePrimary: 'FÄRGELANDA',
    titleHighlight: 'FUTSAL CUP',
    targetDate: '2026-12-19T08:00:00',
    description: 'Futsal Boys kliver in i prestigefyllda Färgelanda Futsal Cup lördagen den 19 december. En intensiv heldag med full fart på parketten, gruppspel, slutspel och jakt på cupguldet!',
    dateLabel: '19 December 2026 (Heldag)',
    venueLabel: 'Färgelanda Sporthall, Färgelanda',
    organizerLabel: 'Arrangör: Färgelanda IF • Officiell ProCup-turnering',
    countdownHeader: 'NEDRÄKNING TILL CUPSTART (19 DEC)',
    countdownSubtext: 'Följ med och heja fram Futsal Boys på plats i Färgelanda Sporthall den 19 december!',
    detailUrl: '/schema/fargelanda-cup',
    proCupUrl: 'https://www.procup.se/cup/40774.htm',
  },
  {
    id: 'ytterby',
    slug: 'ytterby-cup',
    shortName: 'Ytterby Cup',
    badge: 'NYÅRSCUPEN I KUNGÄLV • CUP 2 AV 3',
    titlePrimary: 'YTTERBY CUP',
    titleHighlight: 'FUTSAL 2027',
    targetDate: '2027-01-03T08:00:00',
    description: 'Ytterby IS arrangerar populära Ytterby Cup i Kastellegårdshallen i Ytterby/Kungälv. Seniorklassen avgörs söndagen den 3 januari 2027 där Futsal Boys siktar på topplacering!',
    dateLabel: '2–3 Januari 2027 (Senior: Söndag 3 jan)',
    venueLabel: 'Kastellegårdshallen, Ytterby / Kungälv',
    organizerLabel: 'Arrangör: Ytterby IS • Officiell ProCup • Sista anmälan 9 dec 2026',
    countdownHeader: 'NEDRÄKNING TILL YTTERBY CUP (3 JAN)',
    countdownSubtext: 'Räkna ner till avspark i Kastellegårdshallen söndag 3 januari 2027!',
    detailUrl: '/schema/ytterby-cup',
    proCupUrl: 'https://www.procup.se/cup/40601.htm',
    externalUrl: 'https://www.ytterbyis.nu/nyheter/?ID=40598&NID=1359459',
    externalBtnLabel: 'YTTERBY IS INFO',
  },
  {
    id: 'tosse',
    slug: 'tossecupen',
    shortName: 'Tössecupen',
    badge: 'TRADITIONSCUPEN I ÅMÅL • CUP 3 AV 3',
    titlePrimary: 'TÖSSECUPEN',
    titleHighlight: '2027',
    targetDate: '2027-01-31T08:00:00',
    description: 'Traditionsenliga Tössecupen arrangeras av Tösse IF i Karlbergs idrottshall i Åmål under sista helgen i januari. Herrseniorklassen avgörs söndagen den 31 januari!',
    dateLabel: '30–31 Januari 2027 (Herrsenior: Söndag 31 jan)',
    venueLabel: 'Karlbergs idrottshall, Åmål',
    organizerLabel: 'Arrangör: Tösse IF • Spelas enligt SvFF futsalregler',
    countdownHeader: 'NEDRÄKNING TILL TÖSSECUPEN (31 JAN)',
    countdownSubtext: 'Räkna ner till heta drabbningar i Karlbergs idrottshall den 31 januari 2027!',
    detailUrl: '/schema/tossecupen',
    externalUrl: 'https://www.tosseif.com/Page/398307',
    externalBtnLabel: 'TÖSSE IF HEMSIDA',
  },
];

export const MatchesPage: React.FC = () => {
  const [scheduleFilter, setScheduleFilter] = useState<'ALL' | 'TRÄNING' | 'MATCH' | 'CUP'>('ALL');
  const [currentCupIndex, setCurrentCupIndex] = useState(0);

  const currentCup = featuredCups[currentCupIndex];

  const handlePrevCup = () => {
    setCurrentCupIndex((prev) => (prev === 0 ? featuredCups.length - 1 : prev - 1));
  };

  const handleNextCup = () => {
    setCurrentCupIndex((prev) => (prev === featuredCups.length - 1 ? 0 : prev + 1));
  };

  // Live Countdown timer dynamically calculating for the currently selected cup
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const cupDate = new Date(currentCup.targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = cupDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentCup.targetDate]);

  const filteredSchedule = winterSchedule.filter(
    (item) => scheduleFilter === 'ALL' || item.type === scheduleFilter
  );

  const pastMatches = [
    {
      id: 'm1',
      slug: 'fc-vanersborg',
      opponent: 'FC Vänersborg Futsal',
      result: '4 - 3',
      outcome: 'VINST',
      date: '12 OKT 2026',
      tournament: 'Höstcupen Kvartsfinal',
      arena: 'Arena Älvhögsborg',
      scorers: 'Elvis Mesic (2), Marcelo Villa (1), Raffi Medz (1)',
    },
    {
      id: 'm2',
      slug: 'uddevalla-city',
      opponent: 'Uddevalla City',
      result: '6 - 2',
      outcome: 'VINST',
      date: '04 OKT 2026',
      tournament: 'Höstcupen Gruppspel',
      arena: 'Arena Älvhögsborg',
      scorers: 'Marcelo Villa (3), Elvis Mesic (2), Noah Lindqvist (1)',
    },
    {
      id: 'm3',
      slug: 'goteborg-united',
      opponent: 'Göteborg United',
      result: '3 - 3',
      outcome: 'OAVGJORT',
      date: '27 SEP 2026',
      tournament: 'Träningsmatch',
      arena: 'Lundbystrand',
      scorers: 'Raffi Medz (2), Elvis Mesic (1)',
    },
  ];

  return (
    <div className="matches-page" style={{ paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: '80px' }}>
      <PageMeta
        title={`Vinterschema & Matcher | ${siteConfig.projectName} - Trollhättan`}
        description="Följ Futsal Boys genom vintersäsongen 2026/2027: tre träningar, två träningsmatcher och tre cuper (Färgelanda cup, Ytterby cup och Tössecupen)."
        canonicalPath="/matcher"
      />

      <div className="container">
        {/* Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px, 6vw, 64px)', marginBottom: '16px' }}>
            SCHEMA & <span className="text-neon">MATCHER</span>
          </h1>
          <p className="section-desc" style={{ margin: '0 auto', fontSize: '17px', lineHeight: 1.6 }}>
            Följ Futsal Boys genom vintersäsongen 2026/2027! Schemat innehåller tre träningar, två träningsmatcher och tre prestigefyllda cuper: Färgelanda cup, Ytterby cup och Tössecupen.
          </p>
        </div>

        {/* ==================================================================
            1. FEATURED UPCOMING CUP: FÄRGELANDA FUTSAL CUP 2026 (LÄNGST UPP)
           ================================================================== */}
        <section className="cup-featured-card" aria-label="Kommande cuper">
          {/* Top Carousel Navigation Bar: Pills & Next/Prev Controls */}
          <div className="cup-carousel-nav">
            <div className="cup-carousel-pills" role="tablist" aria-label="Välj cup att visa">
              {featuredCups.map((cup, idx) => (
                <button
                  key={cup.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentCupIndex}
                  className={`cup-carousel-pill ${idx === currentCupIndex ? 'is-active' : ''}`}
                  onClick={() => setCurrentCupIndex(idx)}
                >
                  <span className="cup-carousel-pill-num">{idx + 1}</span>
                  <span>{cup.shortName}</span>
                </button>
              ))}
            </div>

            <div className="cup-carousel-arrows">
              <button
                type="button"
                className="cup-carousel-btn"
                onClick={handlePrevCup}
                aria-label="Föregående cup"
                title="Föregående cup"
              >
                <ChevronLeft size={16} />
                <span>FÖREGÅENDE</span>
              </button>

              <span className="cup-carousel-counter">
                {currentCupIndex + 1} / {featuredCups.length}
              </span>

              <button
                type="button"
                className="cup-carousel-btn"
                onClick={handleNextCup}
                aria-label="Nästa cup"
                title="Nästa cup"
              >
                <span>NÄSTA</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Main Cup Details & Dynamic Live Countdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
            {/* Cup Info */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 54px)',
                  color: '#ffffff',
                  lineHeight: 1,
                  margin: '0 0 16px',
                  letterSpacing: '0.02em',
                }}
              >
                {currentCup.titlePrimary} <span className="text-neon">{currentCup.titleHighlight}</span>
              </h2>

              <p style={{ color: 'var(--silver)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                {currentCup.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '15px' }}>
                  <Calendar size={18} className="text-neon" />
                  <strong>{currentCup.dateLabel}</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '15px' }}>
                  <MapPin size={18} className="text-neon" />
                  <span>{currentCup.venueLabel}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--silver-dim)', fontSize: '14px' }}>
                  <ShieldCheck size={18} className="text-neon" />
                  <span>{currentCup.organizerLabel}</span>
                </div>
              </div>

              {/* Dynamic Action Buttons */}
              <div className="cup-action-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to={currentCup.detailUrl} className="btn btn--neon">
                  <span>LÄS MER OM CUPEN</span>
                  <ChevronRight size={16} />
                </Link>

                {currentCup.proCupUrl && (
                  <a
                    href={currentCup.proCupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    title={`Öppna ${currentCup.titlePrimary} på ProCup`}
                  >
                    <span>SE PÅ PROCUP</span>
                    <ExternalLink size={15} />
                  </a>
                )}

                {currentCup.externalUrl && (
                  <a
                    href={currentCup.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    title={`Öppna ${currentCup.externalBtnLabel || 'extern info'}`}
                  >
                    <span>{currentCup.externalBtnLabel || 'INFO'}</span>
                    <ExternalLink size={15} />
                  </a>
                )}

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  <span>FÖLJ PÅ INSTAGRAM</span>
                </a>
              </div>
            </div>

            {/* Countdown Clock Display */}
            <div className="cup-countdown-card">
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--silver-dim)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {currentCup.countdownHeader}
              </span>

              <div className="cup-countdown-grid">
                <div className="cup-countdown-item">
                  <span className="cup-countdown-num">{timeLeft.days}</span>
                  <span className="cup-countdown-label">Dagar</span>
                </div>

                <div className="cup-countdown-item">
                  <span className="cup-countdown-num">{timeLeft.hours}</span>
                  <span className="cup-countdown-label">Timmar</span>
                </div>

                <div className="cup-countdown-item">
                  <span className="cup-countdown-num">{timeLeft.minutes}</span>
                  <span className="cup-countdown-label">Minuter</span>
                </div>

                <div className="cup-countdown-item">
                  <span className="cup-countdown-num">{timeLeft.seconds}</span>
                  <span className="cup-countdown-label">Sekunder</span>
                </div>
              </div>

              <span style={{ fontSize: '12px', color: 'var(--silver-dim)', lineHeight: 1.5, display: 'block' }}>
                {currentCup.countdownSubtext}
              </span>
            </div>
          </div>

          {/* ================================================================
              CUPTRUPP (FÄRGELANDA) ELLER TURNERINGSINFO (YTTERBY & TÖSSE)
             ================================================================ */}
          {currentCup.slug === 'fargelanda-cup' && (
            <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', margin: 0 }}>
                    UTTAGEN <span className="text-neon">CUPTRUPP</span> ({fargelandaCupSquad.length} SPELARE)
                  </h3>
                  <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                    Officiellt uttagna spelare som representerar Futsal Boys i Färgelanda Futsal Cup.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(16,255,96,0.15)',
                      color: 'var(--neon-green)',
                      border: '1px solid var(--neon-green-glow)',
                    }}
                  >
                    ● {fargelandaCupSquad.length} UTTAGNA
                  </span>
                </div>
              </div>

              {/* Grid of Cup Players (Just names as requested) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '12px',
                }}
              >
                {fargelandaCupSquad.map((player) => (
                  <div
                    key={player.id}
                    style={{
                      background: 'rgba(18, 22, 28, 0.85)',
                      border: '1px solid rgba(16, 255, 96, 0.3)',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '20px',
                          color: 'var(--neon-green)',
                          background: 'rgba(7, 9, 11, 0.9)',
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-subtle)',
                          lineHeight: 1,
                        }}
                      >
                        #{player.number}
                      </div>

                      <div>
                        <strong style={{ color: '#fff', fontSize: '16px', display: 'block', lineHeight: 1.2 }}>
                          {player.name}
                        </strong>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(16,255,96,0.15)',
                        color: 'var(--neon-green)',
                      }}
                    >
                      UTTAGEN
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentCup.slug === 'ytterby-cup' && (
            <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', margin: 0 }}>
                    TURNERINGSINFO & <span className="text-neon">KLASSER</span>
                  </h3>
                  <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                    Ytterby IS inbjuder till intensiv futsal i Kastellegårdshallen – seniorer spelar söndag 3 januari.
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255, 215, 0, 0.15)',
                    color: '#ffd700',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                  }}
                >
                  ★ SENIORKLASS SÖN 3 JAN
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                <div
                  style={{
                    background: 'rgba(18, 22, 28, 0.85)',
                    border: '1px solid rgba(16, 255, 96, 0.3)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Trophy size={18} className="text-neon" />
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: 800 }}>Seniorklass (Futsal Boys)</h4>
                  </div>
                  <p style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                    Söndagen den 3 januari 2027 i Kastellegårdshallen. Gruppspel följt av A- och B-slutspel med medaljer till topplagen.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(18, 22, 28, 0.85)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Calendar size={18} className="text-neon" />
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: 800 }}>Klasser & Anmälan</h4>
                  </div>
                  <p style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                    Juniorer (födda 2008 el senare) spelar lördag 2 jan. Sista anmälningsdag är 9 december 2026 via ProCup.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(18, 22, 28, 0.85)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Users size={18} className="text-neon" />
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: 800 }}>Trupputtagning</h4>
                  </div>
                  <p style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                    Matchtrupp och ledarstab för Ytterby Cup fastställs och publiceras i mellandagarna efter juluppehållet.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentCup.slug === 'tossecupen' && (
            <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', margin: 0 }}>
                    TURNERINGSINFO & <span className="text-neon">TÖSSE IF</span>
                  </h3>
                  <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                    Traditionsenliga Tössecupen i Karlbergs idrottshall i Åmål – herrseniorer spelar söndag 31 januari.
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255, 215, 0, 0.15)',
                    color: '#ffd700',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                  }}
                >
                  ★ HERRSENIORER SÖN 31 JAN
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                <div
                  style={{
                    background: 'rgba(18, 22, 28, 0.85)',
                    border: '1px solid rgba(16, 255, 96, 0.3)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Trophy size={18} className="text-neon" />
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: 800 }}>Herrseniorklass (Söndag)</h4>
                  </div>
                  <p style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                    Spelas söndagen den 31 januari 2027 i Karlbergs idrottshall, uppdelat på lägre och högre divisioner/futsallag.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(18, 22, 28, 0.85)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <ShieldCheck size={18} className="text-neon" />
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: 800 }}>SvFF Futsalregler</h4>
                  </div>
                  <p style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                    Turneringen spelas helt enligt Svenska Fotbollförbundets futsalregler. Lördagen vigs åt juniorer och damer.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(18, 22, 28, 0.85)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Users size={18} className="text-neon" />
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: 800 }}>Trupp & Uttagning</h4>
                  </div>
                  <p style={{ color: 'var(--silver)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                    Truppen till Tössecupen tas ut och kungörs i mitten av januari efter att de inledande januari-aktiviteterna summerats.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dots Indicator at Bottom */}
          <div className="cup-carousel-dots" aria-label="Indikator för cuper">
            {featuredCups.map((cup, idx) => (
              <button
                key={cup.id}
                type="button"
                className={`cup-carousel-dot ${idx === currentCupIndex ? 'is-active' : ''}`}
                onClick={() => setCurrentCupIndex(idx)}
                aria-label={`Visa ${cup.shortName}`}
                title={cup.shortName}
              />
            ))}
          </div>
        </section>

        {/* ==================================================================
            2. VINTERSCHEMA & SPELPROGRAM: NOV, DEC & JAN
           ================================================================== */}
        <section className="schedule-section">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--neon-green)',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  <Calendar size={15} />
                  <span>OFFICIELLT SPELPROGRAM • {winterSchedule.length} AKTIVITETER</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 44px)', color: '#fff', margin: 0 }}>
                  VINTERSÄSONGEN <span className="text-neon">2026 / 2027</span>
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="schedule-filter-tabs">
                <button
                  type="button"
                  onClick={() => setScheduleFilter('ALL')}
                  className={`schedule-tab ${scheduleFilter === 'ALL' ? 'is-active' : ''}`}
                >
                  Alla ({winterSchedule.length})
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleFilter('TRÄNING')}
                  className={`schedule-tab ${scheduleFilter === 'TRÄNING' ? 'is-active' : ''}`}
                >
                  Träningar ({winterSchedule.filter((e) => e.type === 'TRÄNING').length})
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleFilter('MATCH')}
                  className={`schedule-tab ${scheduleFilter === 'MATCH' ? 'is-active' : ''}`}
                >
                  Träningsmatcher ({winterSchedule.filter((e) => e.type === 'MATCH').length})
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleFilter('CUP')}
                  className={`schedule-tab ${scheduleFilter === 'CUP' ? 'is-active' : ''}`}
                >
                  Cuper ({winterSchedule.filter((e) => e.type === 'CUP').length})
                </button>
              </div>
            </div>

            <p style={{ color: 'var(--silver-dim)', fontSize: '15px', margin: '0 0 16px', lineHeight: 1.6 }}>
              Futsal Boys förbereder sig intensivt inför cupsäsongen med kvalitativa träningspass i Trollhättan, två formstarka träningsmatcher och tre cuper. Klicka på valfri aktivitet för fullständiga detaljer.
            </p>

            {/* Quick Summary Pill Bar */}
            <div className="schedule-summary-bar">
              <div className="schedule-summary-item">
                <Flame size={17} className="text-neon" />
                <span><strong>3 Träningar:</strong> 1 nov (Sylte), 6 nov (Torsbohallen), 14 nov (Nevshallen)</span>
              </div>
              <div className="schedule-summary-item">
                <ShieldCheck size={17} className="text-neon" />
                <span><strong>2 Träningsmatcher:</strong> 20 nov (vs Funk i Torsbohallen), 6 dec (vs TIF Polhem)</span>
              </div>
              <div className="schedule-summary-item">
                <Trophy size={17} style={{ color: '#ffd700' }} />
                <span><strong>3 Cuper:</strong> 19 dec (Färgelanda), 2–3 jan (Ytterby), 30–31 jan (Tösse)</span>
              </div>
            </div>
          </div>

          {/* Schedule Events Cards */}
          <div className="schedule-grid">
            {filteredSchedule.map((ev) => {
              const [dayNum, monthStr] = ev.date.split(' ');
              const targetUrl = ev.type === 'MATCH' ? `/matcher/${ev.slug}` : `/schema/${ev.slug}`;
              return (
                <Link
                  to={targetUrl}
                  key={ev.id}
                  className={`schedule-card schedule-card--clickable schedule-card--${ev.type === 'TRÄNING' ? 'training' : ev.type === 'MATCH' ? 'match' : 'cup'}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {/* Date badge */}
                  <div className="schedule-card__date-box">
                    <span className="schedule-card__day">{dayNum}</span>
                    <span className="schedule-card__month">{monthStr}</span>
                    <span className="schedule-card__weekday">{ev.dayOfWeek}</span>
                  </div>

                  {/* Body content */}
                  <div className="schedule-card__body">
                    <div className="schedule-card__header-line">
                      <span
                        className={`schedule-badge ${
                          ev.type === 'TRÄNING'
                            ? 'schedule-badge--traning'
                            : ev.type === 'MATCH'
                            ? 'schedule-badge--match'
                            : 'schedule-badge--cup'
                        }`}
                      >
                        {ev.type === 'TRÄNING' && <Flame size={12} />}
                        {ev.type === 'MATCH' && <ShieldCheck size={12} />}
                        {ev.type === 'CUP' && <Trophy size={12} />}
                        <span>
                          {ev.type === 'MATCH' ? 'TRÄNINGSMATCH' : ev.type === 'CUP' ? 'CUP • HELDAG' : 'TRÄNING'}
                        </span>
                      </span>

                      <span className="schedule-card__time">
                        <Clock size={14} />
                        <span>{ev.time}</span>
                      </span>
                    </div>

                    <h3 className="schedule-card__title">{ev.title}</h3>

                    <div className="schedule-card__venue">
                      <MapPin size={15} className="text-neon" />
                      <span>{ev.venue}, {ev.city}</span>
                    </div>

                    <p className="schedule-card__desc">{ev.description}</p>
                  </div>

                  {/* Side action/status */}
                  <div className="schedule-card__side">
                    {ev.type === 'MATCH' && (
                      <span className="schedule-status-pill schedule-status-pill--match">
                        MOTSTÅND: {ev.opponent}
                      </span>
                    )}
                    {ev.type === 'TRÄNING' && (
                      <span className="schedule-status-pill schedule-status-pill--training">
                        TRÄNINGSPASS
                      </span>
                    )}
                    {ev.type === 'CUP' && (
                      <span className="schedule-status-pill schedule-status-pill--cup">
                        PROCUP TURNERING
                      </span>
                    )}

                    <div className="schedule-card__readmore">
                      <span>{ev.type === 'MATCH' ? 'FÖLJ RESULTAT & INFO' : 'LÄS MER & DETALJER'}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ==================================================================
            3. KOMMANDE TRÄNINGSMATCH: FUTSAL BOYS VS FUNK
           ================================================================== */}
        <div className="matchup-banner-card">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '30px',
              background: 'rgba(16, 255, 96, 0.15)',
              color: 'var(--neon-green)',
              border: '1px solid var(--neon-green-glow)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '24px',
            }}
          >
            <Clock size={14} />
            <span>KOMMANDE TRÄNINGSMATCH</span>
          </div>

          <div className="matchup-banner-grid">
            {/* Teams Matchup */}
            <div className="matchup-banner-teams">
              <div style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
                <img
                  src={siteConfig.logoUrl}
                  alt={upcomingMatch.homeTeam}
                  style={{ width: '70px', height: '70px', objectFit: 'contain', margin: '0 auto 10px', filter: 'drop-shadow(0 0 12px rgba(16,255,96,0.3))' }}
                />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3.5vw, 26px)', color: '#fff', margin: 0 }}>
                  {upcomingMatch.homeTeam}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--neon-green)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  HEMMALAG
                </span>
              </div>

              <div style={{ textAlign: 'center', padding: '0 8px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--silver-dim)' }}>
                  VS
                </span>
              </div>

              <div style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    color: 'var(--silver)',
                    fontWeight: 700,
                  }}
                >
                  FUNK
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3.5vw, 26px)', color: '#fff', margin: 0 }}>
                  {upcomingMatch.awayTeam}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--silver-dim)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  BORTALAG
                </span>
              </div>
            </div>

            {/* Date, Time & Venue */}
            <div className="matchup-banner-meta">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} className="text-neon" />
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '15px' }}>{upcomingMatch.date}</strong>
                  <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Matchtid: {upcomingMatch.time}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={20} className="text-neon" />
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '15px' }}>{upcomingMatch.venue}</strong>
                  <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Fri entré • Kom och heja fram Futsal Boys!</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--silver-dim)', fontSize: '12.5px', marginTop: '2px' }}>
                <ShieldCheck size={16} className="text-neon" />
                <span>Nästa träningsmatch: vs TIF Polhem (6 dec, 20:00–22:00)</span>
              </div>

              <div className="match-action-btns" style={{ marginTop: '6px' }}>
                <Link
                  to="/matcher/match-funk"
                  className="btn btn--neon btn--sm"
                >
                  <span>FÖLJ RESULTAT & LIVE TRACKER</span>
                  <ChevronRight size={16} />
                </Link>

                <Link
                  to="/schema/match-funk"
                  className="btn btn--outline btn--sm"
                >
                  <span>MATCHSCHEMA & TIDER</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            4. RECENT MATCH RESULTS (KLICKBARA FÖR ATT FÖLJA RESULTAT)
           ================================================================== */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', margin: 0 }}>
              SENASTE <span className="text-neon">RESULTAT</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '14px' }}>
              Klicka på valfri match för att följa resultat, se matchhändelser, statistik, målskyttar och matchens lirare.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pastMatches.map((m) => (
              <div
                key={m.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      color: m.outcome === 'VINST' ? 'var(--neon-green)' : '#fff',
                      background: 'rgba(0,0,0,0.3)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      minWidth: '90px',
                      textAlign: 'center',
                    }}
                  >
                    {m.result}
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--neon-green)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {m.tournament} • {m.date}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#fff', margin: '2px 0 4px' }}>
                      <Link to={`/matcher/${m.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        Futsal Boys vs {m.opponent}
                      </Link>
                    </h3>
                    <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                      Målskyttar: {m.scorers}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      background: m.outcome === 'VINST' ? 'rgba(16,255,96,0.15)' : 'rgba(255,255,255,0.08)',
                      color: m.outcome === 'VINST' ? 'var(--neon-green)' : 'var(--silver)',
                      border: m.outcome === 'VINST' ? '1px solid var(--neon-green-glow)' : '1px solid var(--border-subtle)',
                    }}
                  >
                    {m.outcome}
                  </div>

                  <Link
                    to={`/matcher/${m.slug}`}
                    className="btn btn--neon btn--sm"
                    style={{ padding: '8px 14px', fontSize: '12px' }}
                  >
                    <span>FÖLJ RESULTAT</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================================
            5. MATCH REPORTS & NEWS
           ================================================================== */}
        <div>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', margin: 0 }}>
              MATCHRAPPORTER & <span className="text-neon">NYHETER</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '14px' }}>
              Läs utförliga rapporter och analyser från lagets matcher och förberedelser.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {clubNewsList.map((news) => (
              <Link
                key={news.id}
                to={`/blogg/${news.id}`}
                className="blog-card"
              >
                <div className="blog-card-img-wrap">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="blog-card-img"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="blog-tag blog-tag--neon">{news.category}</span>
                  <span style={{ fontSize: '13px', color: 'var(--silver-dim)', fontWeight: 500 }}>{news.date}</span>
                </div>

                <h3 className="blog-card-title">
                  {news.title}
                </h3>

                <p style={{ color: 'var(--silver-dim)', fontSize: '14px', lineHeight: 1.65, marginBottom: '22px', flex: 1 }}>
                  {news.summary}
                </p>

                <div className="blog-card-cta">
                  <span>LÄS HELA ARTIKELN</span>
                  <ChevronRight size={15} className="blog-card-arrow" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};