import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Navigation,
  ExternalLink,
  Star,
  Users,
  BarChart3,
  ListOrdered,
  FileText,
  Radio,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { futsalMatches, FutsalMatch } from '../content/matchesData';
import { winterSchedule } from '../content/futsalData';
import { ScheduleDetailPage } from './ScheduleDetailPage';
import { siteConfig } from '../content/siteContent';

export const MatchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'EVENTS' | 'STATS' | 'LINEUP' | 'REPORT' | 'LIVE'>('EVENTS');

  // Find match by id or slug
  const matchIndex = futsalMatches.findIndex((m) => m.slug === id || m.id === id);
  const match: FutsalMatch | undefined = futsalMatches[matchIndex];

  // If not found in futsalMatches, check if it's a schedule event (e.g. training or cup)
  if (!match) {
    const isScheduleEvent = winterSchedule.some((ev) => ev.slug === id || ev.id === id);
    if (isScheduleEvent) {
      return <ScheduleDetailPage />;
    }

    return (
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '100px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#fff', marginBottom: '16px' }}>
          MATCHEN HITTADES INTE
        </h1>
        <p style={{ color: 'var(--silver-dim)', marginBottom: '32px' }}>
          Den efterfrågade matchen eller matchrapporten kunde inte hittas.
        </p>
        <Link to="/matcher" className="btn btn--neon">
          <ArrowLeft size={16} />
          <span>TILLBAKA TILL MATCHER</span>
        </Link>
      </div>
    );
  }

  const prevMatch = matchIndex > 0 ? futsalMatches[matchIndex - 1] : null;
  const nextMatch = matchIndex < futsalMatches.length - 1 ? futsalMatches[matchIndex + 1] : null;

  return (
    <div className="match-detail-page" style={{ paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: '90px' }}>
      <PageMeta
        title={`${match.homeTeam} vs ${match.awayTeam} ${match.status === 'SLUTRESULTAT' ? `(${match.result})` : ''} | ${siteConfig.projectName}`}
        description={`Matchrapport och resultat för ${match.homeTeam} vs ${match.awayTeam} i ${match.competition} (${match.date}).`}
        canonicalPath={`/matcher/${match.slug}`}
      />

      <div className="container">
        {/* Top Breadcrumb & Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <button
            type="button"
            onClick={() => navigate('/matcher')}
            className="schedule-back-btn"
          >
            <ArrowLeft size={16} />
            <span>TILLBAKA TILL MATCHER & RESULTAT</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {prevMatch && (
              <Link
                to={`/matcher/${prevMatch.slug}`}
                className="btn btn--outline btn--sm"
                title={`Föregående: vs ${prevMatch.awayTeam}`}
              >
                <ChevronLeft size={14} />
                <span>FÖREGÅENDE</span>
              </Link>
            )}

            {nextMatch && (
              <Link
                to={`/matcher/${nextMatch.slug}`}
                className="btn btn--outline btn--sm"
                title={`Nästa: vs ${nextMatch.awayTeam}`}
              >
                <span>NÄSTA</span>
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>

        {/* ==================================================================
            HERO SCOREBOARD CARD (FULLY RESPONSIVE)
           ================================================================== */}
        <div className="match-detail-hero">
          {/* Header Badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '30px',
                  background: 'rgba(255, 215, 0, 0.15)',
                  color: '#ffd700',
                  border: '1px solid rgba(255, 215, 0, 0.4)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Trophy size={13} />
                <span>{match.competition} {match.stage ? `• ${match.stage}` : ''}</span>
              </span>
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                padding: '5px 12px',
                borderRadius: '8px',
                textTransform: 'uppercase',
                background:
                  match.status === 'KOMMANDE'
                    ? 'rgba(16, 255, 96, 0.15)'
                    : match.outcome === 'VINST'
                    ? 'rgba(16, 255, 96, 0.2)'
                    : 'rgba(255, 255, 255, 0.1)',
                color:
                  match.status === 'KOMMANDE' || match.outcome === 'VINST'
                    ? 'var(--neon-green)'
                    : '#ffffff',
                border:
                  match.status === 'KOMMANDE' || match.outcome === 'VINST'
                    ? '1px solid var(--neon-green)'
                    : '1px solid var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {match.status === 'KOMMANDE' ? (
                <>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--neon-green)',
                      boxShadow: '0 0 10px var(--neon-green)',
                    }}
                  />
                  <span>KOMMANDE MATCH • LIVE TRACKER</span>
                </>
              ) : (
                <>
                  <span>SLUTRESULTAT • {match.outcome}</span>
                </>
              )}
            </span>
          </div>

          {/* Main Scoreboard Layout */}
          <div className="match-scoreboard-grid">
            {/* Home Team */}
            <div className="match-scoreboard-team">
              {match.homeTeam.toLowerCase().includes('futsal boys') ? (
                <img
                  src={siteConfig.logoUrl}
                  alt={match.homeTeam}
                  className="match-scoreboard-logo"
                />
              ) : (
                <div className="match-scoreboard-circle">
                  {match.homeTeam.substring(0, 4).toUpperCase()}
                </div>
              )}
              <h2 className="match-scoreboard-name">{match.homeTeam}</h2>
              <span className="match-scoreboard-tag" style={{ color: 'var(--neon-green)' }}>
                HEMMALAG
              </span>
            </div>

            {/* Score Center Box */}
            <div className="match-scoreboard-score-box">
              <div className="match-scoreboard-score-num">
                {match.result}
              </div>

              {match.status === 'SLUTRESULTAT' && match.halftimeResult && (
                <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--silver-dim)', fontWeight: 700 }}>
                  (Halvtid: {match.halftimeResult})
                </div>
              )}

              {match.status === 'KOMMANDE' && (
                <div style={{ marginTop: '6px', fontSize: '11.5px', color: 'var(--neon-green)', fontWeight: 800 }}>
                  Avspark {match.time}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="match-scoreboard-team">
              {match.awayTeam.toLowerCase().includes('futsal boys') ? (
                <img
                  src={siteConfig.logoUrl}
                  alt={match.awayTeam}
                  className="match-scoreboard-logo"
                />
              ) : (
                <div className="match-scoreboard-circle">
                  {match.awayTeam.substring(0, 4).toUpperCase()}
                </div>
              )}
              <h2 className="match-scoreboard-name">{match.awayTeam}</h2>
              <span className="match-scoreboard-tag" style={{ color: 'var(--silver-dim)' }}>
                BORTALAG
              </span>
            </div>
          </div>

          {/* Scorers Summary Bar */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: '12px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px',
              flexWrap: 'wrap',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--neon-green)', fontWeight: 800, letterSpacing: '0.08em' }}>
              {match.status === 'KOMMANDE' ? 'STATUS:' : 'MÅLSKYTTAR:'}
            </span>
            <span style={{ fontSize: '13.5px', color: '#ffffff', fontWeight: 600 }}>
              {match.scorersSummary}
            </span>
          </div>

          {/* Match Metadata Row */}
          <div className="schedule-meta-grid" style={{ marginBottom: '20px' }}>
            <div className="schedule-meta-pill">
              <Calendar size={17} className="text-neon" />
              <div>
                <span className="schedule-meta-label">DATUM</span>
                <strong className="schedule-meta-value">{match.fullDate}</strong>
              </div>
            </div>

            <div className="schedule-meta-pill">
              <Clock size={17} className="text-neon" />
              <div>
                <span className="schedule-meta-label">MATCHTID</span>
                <strong className="schedule-meta-value">{match.time}</strong>
              </div>
            </div>

            <div className="schedule-meta-pill">
              <MapPin size={17} className="text-neon" />
              <div>
                <span className="schedule-meta-label">ARENA</span>
                <strong className="schedule-meta-value">{match.venue}, {match.city}</strong>
              </div>
            </div>

            <div className="schedule-meta-pill">
              <Users size={17} className="text-neon" />
              <div>
                <span className="schedule-meta-label">PUBLIK</span>
                <strong className="schedule-meta-value">{match.spectators || 'Öppen publik'}</strong>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="match-action-btns">
            {match.mapsUrl && (
              <a
                href={match.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--neon btn--sm"
              >
                <Navigation size={15} />
                <span>HITTA HIT (GOOGLE MAPS)</span>
              </a>
            )}

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm"
            >
              <span>FÖLJ PÅ INSTAGRAM</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* ==================================================================
            MATCH DETAIL TABS
           ================================================================== */}
        <div className="match-tabs-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'EVENTS'}
            onClick={() => setActiveTab('EVENTS')}
            className={`btn match-tabs-btn ${activeTab === 'EVENTS' ? 'btn--neon' : 'btn--outline'}`}
          >
            <ListOrdered size={14} />
            <span>HÄNDELSER & MÅL</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'STATS'}
            onClick={() => setActiveTab('STATS')}
            className={`btn match-tabs-btn ${activeTab === 'STATS' ? 'btn--neon' : 'btn--outline'}`}
          >
            <BarChart3 size={14} />
            <span>STATISTIK</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'LINEUP'}
            onClick={() => setActiveTab('LINEUP')}
            className={`btn match-tabs-btn ${activeTab === 'LINEUP' ? 'btn--neon' : 'btn--outline'}`}
          >
            <Users size={14} />
            <span>TRUPP & LIRARE</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'REPORT'}
            onClick={() => setActiveTab('REPORT')}
            className={`btn match-tabs-btn ${activeTab === 'REPORT' ? 'btn--neon' : 'btn--outline'}`}
          >
            <FileText size={14} />
            <span>MATCHREFERAT</span>
          </button>

          {match.liveUpdates && match.liveUpdates.length > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'LIVE'}
              onClick={() => setActiveTab('LIVE')}
              className={`btn match-tabs-btn ${activeTab === 'LIVE' ? 'btn--neon' : 'btn--outline'}`}
            >
              <Radio size={14} />
              <span>LIVE-RAPPORTERING</span>
            </button>
          )}
        </div>

        {/* ==================================================================
            TAB 1: HÄNDELSER & MÅL
           ================================================================== */}
        {activeTab === 'EVENTS' && (
          <div className="match-two-column-grid">
            {/* Left: Goals Breakdown */}
            <div className="schedule-info-box">
              <h3 className="schedule-info-box__title">
                MÅL I <span className="text-neon">MATCHEN</span>
              </h3>

              {match.goals.length === 0 ? (
                <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--silver-dim)' }}>
                  <Clock size={32} className="text-neon" style={{ margin: '0 auto 12px' }} />
                  <p style={{ margin: '0 0 8px', color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                    Inga mål registrerade ännu
                  </p>
                  <span style={{ fontSize: '13.5px' }}>
                    Matchen spelas den {match.fullDate}. Mål och händelser rapporteras löpande under matchen!
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {match.goals.map((goal, idx) => {
                    const isFutsalBoys = goal.team === 'Futsal Boys';
                    return (
                      <div
                        key={idx}
                        style={{
                          background: isFutsalBoys ? 'rgba(16, 255, 96, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                          border: isFutsalBoys ? '1px solid rgba(16, 255, 96, 0.3)' : '1px solid var(--border-subtle)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '17px',
                              color: isFutsalBoys ? 'var(--neon-green)' : '#ffffff',
                              background: 'rgba(0, 0, 0, 0.4)',
                              width: '42px',
                              height: '42px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid var(--border-subtle)',
                              flexShrink: 0,
                            }}
                          >
                            {goal.minute}'
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <strong style={{ color: '#ffffff', fontSize: '15px' }}>
                                ⚽ {goal.scorer}
                              </strong>
                              {goal.isDirectFreekick && (
                                <span style={{ fontSize: '10px', background: 'rgba(255,215,0,0.2)', color: '#ffd700', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                                  FRISPARK
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '12.5px', color: 'var(--silver-dim)', display: 'block' }}>
                              {goal.team} {goal.assist ? `• Assist: ${goal.assist}` : ''}
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '20px',
                            color: isFutsalBoys ? 'var(--neon-green)' : '#ffffff',
                            fontWeight: 700,
                          }}
                        >
                          {goal.currentScore}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Full Match Timeline */}
            <div className="schedule-info-box">
              <h3 className="schedule-info-box__title">
                MATCHTIDSLINJE & <span className="text-neon">HÄNDELSER</span>
              </h3>

              <div className="schedule-timeline-list">
                {match.timeline.map((item, idx) => (
                  <div key={idx} className="schedule-timeline-item">
                    <div className="schedule-timeline-time">
                      <Clock size={13} className="text-neon" />
                      <span>{item.minute > 0 ? `${item.minute}'` : 'INFO'}</span>
                    </div>
                    <div className="schedule-timeline-text">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {item.type === 'GOAL' && <span>⚽</span>}
                        {item.type === 'YELLOW_CARD' && <span>🟨</span>}
                        {item.type === 'TIMEOUT' && <span>⏱️</span>}
                        {item.type === 'HALFTIME' && <span>⏸️</span>}
                        {item.type === 'FULLTIME' && <span>🏁</span>}
                        <strong style={{ color: '#fff' }}>{item.description}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 2: STATISTIK
           ================================================================== */}
        {activeTab === 'STATS' && (
          <div className="schedule-info-box">
            <h3 className="schedule-info-box__title">
              MATCHSTATISTIK: <span className="text-neon">{match.homeTeam} vs {match.awayTeam}</span>
            </h3>

            {match.status === 'KOMMANDE' ? (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--silver-dim)' }}>
                <BarChart3 size={36} className="text-neon" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#fff', fontSize: '18px', margin: '0 0 8px' }}>Statistik registreras under matchen</h4>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  Skott, hörnor, bollinnehav och ackumulerade frisparkar uppdateras i realtid på matchdagen.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '780px', margin: '0 auto' }}>
                {/* Stat 1: Skott på mål */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neon-green)' }}>{match.stats.shotsOnGoal[0]}</strong>
                    <span style={{ color: 'var(--silver)', fontWeight: 700 }}>SKOTT PÅ MÅL</span>
                    <strong style={{ color: '#ffffff' }}>{match.stats.shotsOnGoal[1]}</strong>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${(match.stats.shotsOnGoal[0] / (match.stats.shotsOnGoal[0] + match.stats.shotsOnGoal[1] || 1)) * 100}%`, background: 'var(--neon-green)' }} />
                    <div style={{ width: `${(match.stats.shotsOnGoal[1] / (match.stats.shotsOnGoal[0] + match.stats.shotsOnGoal[1] || 1)) * 100}%`, background: '#666666' }} />
                  </div>
                </div>

                {/* Stat 2: Totala skott */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neon-green)' }}>{match.stats.totalShots[0]}</strong>
                    <span style={{ color: 'var(--silver)', fontWeight: 700 }}>TOTALA SKOTT</span>
                    <strong style={{ color: '#ffffff' }}>{match.stats.totalShots[1]}</strong>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${(match.stats.totalShots[0] / (match.stats.totalShots[0] + match.stats.totalShots[1] || 1)) * 100}%`, background: 'var(--neon-green)' }} />
                    <div style={{ width: `${(match.stats.totalShots[1] / (match.stats.totalShots[0] + match.stats.totalShots[1] || 1)) * 100}%`, background: '#666666' }} />
                  </div>
                </div>

                {/* Stat 3: Hörnor */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neon-green)' }}>{match.stats.corners[0]}</strong>
                    <span style={{ color: 'var(--silver)', fontWeight: 700 }}>HÖRNOR</span>
                    <strong style={{ color: '#ffffff' }}>{match.stats.corners[1]}</strong>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${(match.stats.corners[0] / (match.stats.corners[0] + match.stats.corners[1] || 1)) * 100}%`, background: 'var(--neon-green)' }} />
                    <div style={{ width: `${(match.stats.corners[1] / (match.stats.corners[0] + match.stats.corners[1] || 1)) * 100}%`, background: '#666666' }} />
                  </div>
                </div>

                {/* Stat 4: Ackumulerade frisparkar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neon-green)' }}>{match.stats.fouls[0]}</strong>
                    <span style={{ color: 'var(--silver)', fontWeight: 700 }}>ACKUMULERADE FRISPARKAR</span>
                    <strong style={{ color: '#ffffff' }}>{match.stats.fouls[1]}</strong>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${(match.stats.fouls[0] / (match.stats.fouls[0] + match.stats.fouls[1] || 1)) * 100}%`, background: 'var(--neon-green)' }} />
                    <div style={{ width: `${(match.stats.fouls[1] / (match.stats.fouls[0] + match.stats.fouls[1] || 1)) * 100}%`, background: '#666666' }} />
                  </div>
                </div>

                {/* Stat 5: Bollinnehav */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neon-green)' }}>{match.stats.possession[0]}%</strong>
                    <span style={{ color: 'var(--silver)', fontWeight: 700 }}>BOLLINNEHAV</span>
                    <strong style={{ color: '#ffffff' }}>{match.stats.possession[1]}%</strong>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${match.stats.possession[0]}%`, background: 'var(--neon-green)' }} />
                    <div style={{ width: `${match.stats.possession[1]}%`, background: '#666666' }} />
                  </div>
                </div>

                {/* Stat 6: Målvaktsräddningar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neon-green)' }}>{match.stats.saves[0]}</strong>
                    <span style={{ color: 'var(--silver)', fontWeight: 700 }}>MÅLVAKTSRÄDDNINGAR</span>
                    <strong style={{ color: '#ffffff' }}>{match.stats.saves[1]}</strong>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${(match.stats.saves[0] / (match.stats.saves[0] + match.stats.saves[1] || 1)) * 100}%`, background: 'var(--neon-green)' }} />
                    <div style={{ width: `${(match.stats.saves[1] / (match.stats.saves[0] + match.stats.saves[1] || 1)) * 100}%`, background: '#666666' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================
            TAB 3: TRUPP & MATCHENS LIRARE
           ================================================================== */}
        {activeTab === 'LINEUP' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Player of the match highlight box (if present) */}
            {match.playerOfTheMatch && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(16, 255, 96, 0.1) 100%)',
                  border: '2px solid #ffd700',
                  borderRadius: '16px',
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#ffd700',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                  }}
                >
                  <Star size={32} fill="#000" />
                </div>

                <div style={{ flex: 1, minWidth: '220px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffd700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {match.playerOfTheMatch.title}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', margin: '2px 0 6px' }}>
                    #{match.playerOfTheMatch.number} {match.playerOfTheMatch.name}
                  </h3>
                  <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                    {match.playerOfTheMatch.description}
                  </p>
                </div>
              </div>
            )}

            {/* Starting 5 Grid */}
            <div className="schedule-info-box">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 className="schedule-info-box__title" style={{ margin: 0 }}>
                  STARTFEMMA <span className="text-neon">(FUTSAL BOYS)</span>
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--neon-green)', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: 'rgba(16,255,96,0.1)' }}>
                  5 STARTERS
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {match.lineup.startingFive.map((player) => (
                  <div
                    key={player.number}
                    style={{
                      background: 'rgba(18, 22, 28, 0.85)',
                      border: '1px solid rgba(16, 255, 96, 0.3)',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '18px',
                          color: 'var(--neon-green)',
                          background: 'rgba(0,0,0,0.4)',
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        #{player.number}
                      </div>

                      <div>
                        <strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>
                          {player.name}
                        </strong>
                        <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>
                          {player.position}
                        </span>
                      </div>
                    </div>

                    {player.goals && player.goals > 0 && (
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--neon-green)' }}>
                        ⚽ x{player.goals}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bench Players */}
            <div className="schedule-info-box">
              <h3 className="schedule-info-box__title">
                AVBYTARE & <span className="text-neon">TRUPP</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {match.lineup.bench.map((player) => (
                  <div
                    key={player.number}
                    style={{
                      background: 'rgba(7, 9, 11, 0.75)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '17px',
                          color: 'var(--silver)',
                          background: 'rgba(255,255,255,0.05)',
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        #{player.number}
                      </div>

                      <div>
                        <strong style={{ color: '#fff', fontSize: '14.5px', display: 'block' }}>
                          {player.name}
                        </strong>
                        <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>
                          {player.position}
                        </span>
                      </div>
                    </div>

                    {player.goals && player.goals > 0 && (
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--neon-green)' }}>
                        ⚽ x{player.goals}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 4: MATCHREFERAT
           ================================================================== */}
        {activeTab === 'REPORT' && (
          <div className="schedule-info-box">
            <h3 className="schedule-info-box__title">
              OFFICIELLT <span className="text-neon">MATCHREFERAT</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: 'var(--silver)', fontSize: '15.5px', lineHeight: 1.8 }}>
              {match.summary.map((para, idx) => (
                <p key={idx} style={{ margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>

            <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                Rapporterat av Futsal Boys Media • Trollhättan
              </span>

              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
              >
                <span>SE MATCHKLIPP PÅ INSTAGRAM</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 5: LIVERAPPORTERING (IF AVAILABLE)
           ================================================================== */}
        {activeTab === 'LIVE' && match.liveUpdates && (
          <div className="schedule-info-box">
            <h3 className="schedule-info-box__title">
              LIVE-UPPDATERINGAR & <span className="text-neon">LIVERESULTAT</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {match.liveUpdates.map((update, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(18, 22, 28, 0.85)',
                    border: '1px solid var(--border-neon)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Radio size={14} className="text-neon" />
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--neon-green)', letterSpacing: '0.08em' }}>
                      {update.time}
                    </span>
                  </div>
                  <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: '17px' }}>
                    {update.title}
                  </h4>
                  <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    {update.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
