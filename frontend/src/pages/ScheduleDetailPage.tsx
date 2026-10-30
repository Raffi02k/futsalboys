import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Flame,
  ShieldCheck,
  Trophy,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Users,
  Navigation,
  Info,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { winterSchedule, ScheduleEvent } from '../content/futsalData';
import { fargelandaCupSquad } from './MatchesPage';
import { siteConfig } from '../content/siteContent';

export const ScheduleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find event by slug or id
  const currentIndex = winterSchedule.findIndex(
    (ev) => ev.slug === id || ev.id === id
  );

  const event: ScheduleEvent | undefined = winterSchedule[currentIndex];

  if (!event) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '100px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#fff', marginBottom: '16px' }}>
          AKTIVITETEN HITTADES INTE
        </h1>
        <p style={{ color: 'var(--silver-dim)', marginBottom: '32px' }}>
          Den efterfrågade aktiviteten finns inte i schemat.
        </p>
        <Link to="/matcher" className="btn btn--neon">
          <ArrowLeft size={16} />
          <span>TILLBAKA TILL SPELSCHEMAT</span>
        </Link>
      </div>
    );
  }

  const prevEvent = currentIndex > 0 ? winterSchedule[currentIndex - 1] : null;
  const nextEvent = currentIndex < winterSchedule.length - 1 ? winterSchedule[currentIndex + 1] : null;

  return (
    <div className="schedule-detail-page" style={{ paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: '90px' }}>
      <PageMeta
        title={`${event.title} (${event.fullDate}) | ${siteConfig.projectName}`}
        description={`${event.title} med Futsal Boys den ${event.fullDate} kl ${event.time} i ${event.venue}. ${event.description}`}
        canonicalPath={`/schema/${event.slug}`}
      />

      <div className="container">
        {/* Back Link Breadcrumb */}
        <div style={{ marginBottom: '28px' }}>
          <button
            type="button"
            onClick={() => navigate('/matcher')}
            className="schedule-back-btn"
          >
            <ArrowLeft size={16} />
            <span>TILLBAKA TILL SPELSCHEMAT</span>
          </button>
        </div>

        {/* Hero Header Card */}
        <div className={`schedule-detail-hero schedule-detail-hero--${event.type.toLowerCase()}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span
              className={`schedule-badge ${
                event.type === 'TRÄNING'
                  ? 'schedule-badge--traning'
                  : event.type === 'MATCH'
                  ? 'schedule-badge--match'
                  : 'schedule-badge--cup'
              }`}
            >
              {event.type === 'TRÄNING' && <Flame size={13} />}
              {event.type === 'MATCH' && <ShieldCheck size={13} />}
              {event.type === 'CUP' && <Trophy size={13} />}
              <span>{event.type === 'MATCH' ? 'OFFICIELL TRÄNINGSMATCH' : event.type === 'CUP' ? 'CUP • HELDAG' : 'TRÄNINGSPASS'}</span>
            </span>

            <span style={{ fontSize: '13px', color: 'var(--silver-dim)', fontWeight: 600 }}>
              {event.dayOfWeek.toUpperCase()} • {event.date}
            </span>
          </div>

          <h1 className="schedule-detail-hero__title">
            {event.title}
          </h1>

          <p className="schedule-detail-hero__desc">
            {event.description}
          </p>

          {/* Quick Meta Pills */}
          <div className="schedule-meta-grid">
            <div className="schedule-meta-pill">
              <Calendar size={18} className="text-neon" />
              <div>
                <span className="schedule-meta-label">DATUM</span>
                <strong className="schedule-meta-value">{event.fullDate} ({event.dayOfWeek})</strong>
              </div>
            </div>

            <div className="schedule-meta-pill">
              <Clock size={18} className="text-neon" />
              <div>
                <span className="schedule-meta-label">TID</span>
                <strong className="schedule-meta-value">{event.time}</strong>
              </div>
            </div>

            <div className="schedule-meta-pill">
              <MapPin size={18} className="text-neon" />
              <div>
                <span className="schedule-meta-label">PLATS & ARENA</span>
                <strong className="schedule-meta-value">{event.venue}, {event.city}</strong>
              </div>
            </div>

            <div className="schedule-meta-pill">
              <Info size={18} className="text-neon" />
              <div>
                <span className="schedule-meta-label">SAMLING</span>
                <strong className="schedule-meta-value">{event.gatheringTime}</strong>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
            {event.type === 'MATCH' && (
              <Link
                to={`/matcher/${event.slug}`}
                className="btn btn--neon"
              >
                <span>FÖLJ RESULTAT & MATCHRAPPORT</span>
                <ChevronRight size={16} />
              </Link>
            )}

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={event.type === 'MATCH' ? 'btn btn--outline' : 'btn btn--neon'}
            >
              <Navigation size={16} />
              <span>HITTA HIT (GOOGLE MAPS)</span>
            </a>

            {event.proCupUrl && (
              <a
                href={event.proCupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
              >
                <span>SE PÅ PROCUP</span>
                <ExternalLink size={16} />
              </a>
            )}

            {event.externalUrl && (
              <a
                href={event.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
              >
                <span>OFFICIELL CUPSIDA</span>
                <ExternalLink size={16} />
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

        {/* Main Content Layout (2-Column) */}
        <div className="schedule-detail-grid">
          {/* Left Column: Details, Focus Areas, Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* About / Description Card */}
            <div className="schedule-info-box">
              <h2 className="schedule-info-box__title">
                OM <span className="text-neon">AKTIVITETEN</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--silver)', fontSize: '15px', lineHeight: 1.7 }}>
                {event.longDescription.map((p, idx) => (
                  <p key={idx} style={{ margin: 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Focus Areas */}
            {event.focusAreas && event.focusAreas.length > 0 && (
              <div className="schedule-info-box">
                <h2 className="schedule-info-box__title">
                  FOKUSOMRÅDEN & <span className="text-neon">TAKTIK</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  {event.focusAreas.map((focus, idx) => (
                    <div key={idx} className="schedule-focus-item">
                      <CheckCircle2 size={18} className="text-neon" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '14.5px', color: '#ffffff', lineHeight: 1.4 }}>
                        {focus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule Timeline */}
            {event.scheduleTimeline && event.scheduleTimeline.length > 0 && (
              <div className="schedule-info-box">
                <h2 className="schedule-info-box__title">
                  TIDSPLAN & <span className="text-neon">SCHEMA</span>
                </h2>
                <div className="schedule-timeline-list">
                  {event.scheduleTimeline.map((item, idx) => (
                    <div key={idx} className="schedule-timeline-item">
                      <div className="schedule-timeline-time">
                        <Clock size={13} className="text-neon" />
                        <span>{item.time}</span>
                      </div>
                      <div className="schedule-timeline-text">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* For Färgelanda Cup: Display Uttagen Cuptrupp */}
            {event.slug === 'fargelanda-cup' && (
              <div className="schedule-info-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <h2 className="schedule-info-box__title" style={{ margin: 0 }}>
                      UTTAGEN <span className="text-neon">CUPTRUPP</span> ({fargelandaCupSquad.length} SPELARE)
                    </h2>
                    <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                      Spelare som representerar Futsal Boys under Färgelanda Futsal Cup.
                    </span>
                  </div>

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
                    ● 12 UTTAGNA
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '12px',
                  }}
                >
                  {fargelandaCupSquad.map((player) => (
                    <div
                      key={player.id}
                      style={{
                        background: 'rgba(7, 9, 11, 0.7)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '18px',
                            color: 'var(--neon-green)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            width: '34px',
                            height: '34px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-subtle)',
                            lineHeight: 1,
                          }}
                        >
                          #{player.number}
                        </div>
                        <strong style={{ color: '#fff', fontSize: '15px' }}>
                          {player.name}
                        </strong>
                      </div>
                      <span
                        style={{
                          fontSize: '9.5px',
                          fontWeight: 800,
                          padding: '2px 6px',
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

            {/* For Other Cups: Display Class & Tournament Info */}
            {event.classes && event.slug !== 'fargelanda-cup' && (
              <div className="schedule-info-box">
                <h2 className="schedule-info-box__title">
                  KLASSER & <span className="text-neon">TURNERINGSINFO</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--silver)', fontSize: '14.5px' }}>
                  <div>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Spelklasser:</strong>
                    <span>{event.classes}</span>
                  </div>
                  {event.organizer && (
                    <div>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Arrangör:</strong>
                      <span>{event.organizer}</span>
                    </div>
                  )}
                  {event.proCupUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <a href={event.proCupUrl} target="_blank" rel="noopener noreferrer" className="btn btn--neon btn--sm">
                        <span>LOTTNING & SPELSCHEMA PÅ PROCUP</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar): Venue, Equipment, Leaders, Spectators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Arena & Address Card */}
            <div className="schedule-sidebar-card">
              <h3 className="schedule-sidebar-title">
                <MapPin size={18} className="text-neon" />
                <span>PLATS & ADRESS</span>
              </h3>
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#fff', display: 'block', fontSize: '16px', marginBottom: '4px' }}>
                  {event.venue}
                </strong>
                <span style={{ color: 'var(--silver-dim)', fontSize: '13.5px', display: 'block', lineHeight: 1.5 }}>
                  {event.address}
                </span>
              </div>

              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Navigation size={14} />
                <span>ÖPPNA I GOOGLE MAPS</span>
              </a>
            </div>

            {/* Equipment Checklist */}
            {event.equipment && event.equipment.length > 0 && (
              <div className="schedule-sidebar-card">
                <h3 className="schedule-sidebar-title">
                  <ShieldCheck size={18} className="text-neon" />
                  <span>UTRUSTNING & FÖRBEREDELSER</span>
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {event.equipment.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'var(--silver)' }}>
                      <span style={{ color: 'var(--neon-green)', fontWeight: 800 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Leaders on Site */}
            <div className="schedule-sidebar-card">
              <h3 className="schedule-sidebar-title">
                <Users size={18} className="text-neon" />
                <span>LEDARE PÅ PLATS</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {event.leaders.map((leader, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#fff' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-green)' }} />
                    <strong>{leader}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Spectator / Audience Info */}
            {event.spectatorInfo && (
              <div className="schedule-sidebar-card">
                <h3 className="schedule-sidebar-title">
                  <Flame size={18} className="text-neon" />
                  <span>PUBLIKINFORMATION</span>
                </h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--silver-dim)', lineHeight: 1.6 }}>
                  {event.spectatorInfo}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Next / Previous Event Navigation */}
        <div className="schedule-nav-wrap">
          {prevEvent ? (
            <Link to={`/schema/${prevEvent.slug}`} className="schedule-nav-link schedule-nav-link--prev">
              <ChevronLeft size={20} className="text-neon" />
              <div>
                <span className="schedule-nav-label">FÖREGÅENDE AKTIVITET</span>
                <strong className="schedule-nav-title">{prevEvent.title} ({prevEvent.date})</strong>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextEvent ? (
            <Link to={`/schema/${nextEvent.slug}`} className="schedule-nav-link schedule-nav-link--next">
              <div style={{ textAlign: 'right' }}>
                <span className="schedule-nav-label">NÄSTA AKTIVITET</span>
                <strong className="schedule-nav-title">{nextEvent.title} ({nextEvent.date})</strong>
              </div>
              <ChevronRight size={20} className="text-neon" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
