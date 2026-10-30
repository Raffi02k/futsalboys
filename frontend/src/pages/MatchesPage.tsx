import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronRight, ExternalLink, ShieldCheck, Flame, Trophy } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { upcomingMatch, clubNewsList, winterSchedule } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

// ============================================================================
// CUPTRUPPEN TILL FÄRGELANDA FUTSAL CUP 2026:
// 12 spelare uttagna (Kasper ersätter Mentor, Hugo ersätter John, Ashraf ersätter Tro)
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
  { id: 'c8', number: 8, name: 'Hüsnücan', position: 'FORWARD', status: 'UTTAGEN' },
  { id: 'c9', number: 10, name: 'Kasper', position: 'MITTFÄLT', status: 'UTTAGEN' },
  { id: 'c10', number: 14, name: 'Lucas', position: 'FÖRSVAR', status: 'UTTAGEN' },
  { id: 'c11', number: 18, name: 'Emin', position: 'FORWARD', status: 'UTTAGEN' },
  { id: 'c12', number: 22, name: 'Tro', position: 'FÖRSVAR', status: 'UTTAGEN' },
];

export const MatchesPage: React.FC = () => {
  const [scheduleFilter, setScheduleFilter] = useState<'ALL' | 'TRÄNING' | 'MATCH' | 'CUP'>('ALL');

  // Live Countdown timer to Färgelanda Futsal Cup (19 Dec 2026 Heldag, 08:00:00)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Cup starts 19 December 2026
    const cupDate = new Date('2026-12-19T08:00:00').getTime();

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
  }, []);

  const filteredSchedule = winterSchedule.filter(
    (item) => scheduleFilter === 'ALL' || item.type === scheduleFilter
  );

  const pastMatches = [
    {
      id: 'm1',
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
        description="Schemat för Futsal Boys sträcker sig över november och december och innehåller tre träningar, två träningsmatcher och Färgelanda cup."
        canonicalPath="/matcher"
      />

      <div className="container">
        {/* Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px, 6vw, 64px)', marginBottom: '16px' }}>
            SCHEMA & <span className="text-neon">MATCHER</span>
          </h1>
          <p className="section-desc" style={{ margin: '0 auto', fontSize: '17px', lineHeight: 1.6 }}>
            Schemat för Futsal Boys sträcker sig över november och december och innehåller tre träningar, två träningsmatcher och en cup. Här hittar du alla datum, tider, arenor och den officiella cuptruppen.
          </p>
        </div>

        {/* ==================================================================
            1. FEATURED UPCOMING CUP: FÄRGELANDA FUTSAL CUP 2026 (LÄNGST UPP)
           ================================================================== */}
        <section className="cup-featured-card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
            {/* Cup Info */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '30px',
                  background: 'rgba(255, 215, 0, 0.15)',
                  color: '#ffd700',
                  border: '1px solid rgba(255, 215, 0, 0.4)',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}
              >
                <Trophy size={13} />
                <span>VINTERNS STORA CUPÄVENTYR</span>
              </div>

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
                FÄRGELANDA <span className="text-neon">FUTSAL CUP</span>
              </h2>

              <p style={{ color: 'var(--silver)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                Futsal Boys kliver in i prestigefyllda Färgelanda Futsal Cup lördagen den 19 december. En intensiv heldag med full fart på parketten, gruppspel, slutspel och jakt på cupguldet!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '15px' }}>
                  <Calendar size={18} className="text-neon" />
                  <strong>19 December 2026 (Heldag)</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '15px' }}>
                  <MapPin size={18} className="text-neon" />
                  <span>Färgelanda Sporthall, Färgelanda</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--silver-dim)', fontSize: '14px' }}>
                  <ShieldCheck size={18} className="text-neon" />
                  <span>Arrangör: Färgelanda IF • Officiell ProCup-turnering</span>
                </div>
              </div>

              {/* Direct ProCup Link Button & Detail Link */}
              <div className="cup-action-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/schema/fargelanda-cup" className="btn btn--neon">
                  <span>LÄS MER OM CUPEN</span>
                  <ChevronRight size={16} />
                </Link>

                <a
                  href="https://www.procup.se/cup/40774.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  title="Öppna Färgelanda Futsal Cup på ProCup"
                >
                  <span>SE PÅ PROCUP</span>
                  <ExternalLink size={15} />
                </a>

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
                NEDRÄKNING TILL CUPSTART (19 DEC)
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
                Följ med och heja fram Futsal Boys på plats i Färgelanda Sporthall den 19 december!
              </span>
            </div>
          </div>

          {/* ================================================================
              CUPTRUPP: UTTAGNA SPELARE TILL FÄRGELANDA CUP
              Visar endast spelarnas förnamn enligt direktiv.
             ================================================================ */}
          <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
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
        </section>

        {/* ==================================================================
            2. VINTERSCHEMA: NOVEMBER & DECEMBER 2026
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
                  <span>OFFICIELLT PROGRAM • 6 AKTIVITETER</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 44px)', color: '#fff', margin: 0 }}>
                  VINTERSCHEMA <span className="text-neon">NOV & DEC</span>
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
                  Cup ({winterSchedule.filter((e) => e.type === 'CUP').length})
                </button>
              </div>
            </div>

            <p style={{ color: 'var(--silver-dim)', fontSize: '15px', margin: '0 0 16px', lineHeight: 1.6 }}>
              Futsal Boys förbereder sig intensivt inför cupsäsongen med kvalitativa träningspass i Trollhättans hallar och två formstarka träningsmatcher. Klicka på en aktivitet för fullständiga detaljer.
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
                <span><strong>1 Cup:</strong> 19 dec (Färgelanda cup, Heldag)</span>
              </div>
            </div>
          </div>

          {/* Schedule Events Cards */}
          <div className="schedule-grid">
            {filteredSchedule.map((ev) => {
              const [dayNum, monthStr] = ev.date.split(' ');
              return (
                <Link
                  to={`/schema/${ev.slug}`}
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
                      <span>LÄS MER & DETALJER</span>
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
        <div
          style={{
            background: 'linear-gradient(135deg, #12161c 0%, #1a222c 100%)',
            border: '1px solid var(--border-neon)',
            borderRadius: '20px',
            padding: '36px 32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(16, 255, 96, 0.15)',
            marginBottom: '64px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {/* Teams Matchup */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <img
                  src={siteConfig.logoUrl}
                  alt={upcomingMatch.homeTeam}
                  style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto 12px' }}
                />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#fff', margin: 0 }}>
                  {upcomingMatch.homeTeam}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--neon-green)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  HEMMALAG
                </span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--silver-dim)' }}>
                  VS
                </span>
              </div>

              <div style={{ textAlign: 'center', flex: 1 }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '26px',
                    color: 'var(--silver)',
                    fontWeight: 700,
                  }}
                >
                  FUNK
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#fff', margin: 0 }}>
                  {upcomingMatch.awayTeam}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--silver-dim)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  BORTALAG
                </span>
              </div>
            </div>

            {/* Date, Time & Venue */}
            <div
              style={{
                borderLeft: '1px solid var(--border-subtle)',
                paddingLeft: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} className="text-neon" />
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '16px' }}>{upcomingMatch.date}</strong>
                  <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Matchtid: {upcomingMatch.time}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={20} className="text-neon" />
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '16px' }}>{upcomingMatch.venue}</strong>
                  <span style={{ color: 'var(--silver-dim)', fontSize: '13px' }}>Fri entré • Kom och heja fram Futsal Boys!</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--silver-dim)', fontSize: '12.5px', marginTop: '2px' }}>
                <ShieldCheck size={16} className="text-neon" />
                <span>Nästa träningsmatch: vs TIF Polhem (6 dec, 20:00–22:00)</span>
              </div>

              <Link
                to="/schema/match-funk"
                className="btn btn--neon btn--sm"
                style={{ marginTop: '6px', alignSelf: 'flex-start' }}
              >
                <span>MATCHDETALJER & INFO</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* ==================================================================
            4. RECENT MATCH RESULTS
           ================================================================== */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', margin: 0 }}>
              SENASTE <span className="text-neon">RESULTAT</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '14px' }}>
              Resultat och målskyttar från de senaste matcherna.
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
                      Futsal Boys vs {m.opponent}
                    </h3>
                    <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                      Målskyttar: {m.scorers}
                    </span>
                  </div>
                </div>

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