import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Flame, ArrowRight, ShoppingBag } from 'lucide-react';
import { upcomingMatch, clubNewsList, winterSchedule } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

export const MatchAndNewsSection: React.FC = () => {
  return (
    <section className="section section--darker" id="matcher">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <h2 className="section-title">
            NÄSTA MATCH & <span className="text-neon">KLUBBNYTT</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Håll koll på säsongens spelschema, träningsmatcher och läs de senaste nyheterna och rapporterna.
          </p>
        </div>

        {/* 2-Column Grid: Upcoming Match vs Club News */}
        <div className="match-news-grid">
          {/* Card 1: UPCOMING MATCH */}
          <div className="sport-card">
            <div className="sport-card__header-tag">
              <Calendar size={16} />
              <span>NÄSTA MATCH</span>
            </div>

            <div className="match-card__content">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  color: 'var(--neon-green)',
                  textTransform: 'uppercase',
                }}
              >
                {upcomingMatch.competition}
              </span>

              {/* Match Fixture Teams */}
              <div className="match-fixture-box">
                <div className="match-team">
                  <img
                    src={siteConfig.logoUrl}
                    alt={upcomingMatch.homeTeam}
                    className="match-team__logo"
                  />
                  <span className="match-team__name">{upcomingMatch.homeTeam}</span>
                </div>

                <div className="match-vs">VS</div>

                <div className="match-team">
                  <div className="match-team__circle">
                    FUNK
                  </div>
                  <span className="match-team__name">{upcomingMatch.awayTeam}</span>
                </div>
              </div>

              {/* Date, Time, Venue */}
              <div className="match-details-row">
                <div className="match-detail-pill">
                  <Calendar size={16} className="text-neon" />
                  <span>{upcomingMatch.date}</span>
                </div>
                <div className="match-detail-pill">
                  <Clock size={16} className="text-neon" />
                  <span>{upcomingMatch.time}</span>
                </div>
                <div className="match-detail-pill">
                  <MapPin size={16} className="text-neon" />
                  <span>{upcomingMatch.venue}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px', flexWrap: 'wrap', margin: '0 auto' }}>
                <Link
                  to="/matcher/match-funk"
                  className="btn btn--neon"
                  style={{ flex: 1, minWidth: '150px', justifyContent: 'center' }}
                >
                  FÖLJ MATCHEN (LIVE)
                </Link>
                <Link
                  to="/matcher"
                  className="btn btn--outline"
                  style={{ flex: 1, minWidth: '150px', justifyContent: 'center' }}
                >
                  SE SPELSCHEMA
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: CLUB NEWS / BLOG ARTICLES */}
          <div className="sport-card news-card">
            <div className="sport-card__header-tag">
              <Flame size={16} />
              <span>SENASTE NYTT</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                {clubNewsList.slice(0, 3).map((news) => (
                  <Link
                    key={news.id}
                    to={`/blogg/${news.id}`}
                    className="news-item"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
                    title={`Läs artikel: ${news.title}`}
                  >
                    <img src={news.image} alt={news.title} className="news-thumb" loading="lazy" />
                    <div style={{ flex: 1 }}>
                      <div className="news-category">{news.category}</div>
                      <h3 className="news-title">{news.title}</h3>
                      <div className="news-date">
                        {news.date} • {news.readTime}
                      </div>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--neon-green)',
                          fontSize: '13px',
                          fontWeight: 700,
                          marginTop: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        <span>LÄS HELA ARTIKELN</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Club Shop / Merch Teaser */}
              <div
                style={{
                  padding: '20px 24px',
                  background: 'rgba(16, 255, 96, 0.05)',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--neon-green-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--neon-green)',
                    }}
                  >
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        color: '#ffffff',
                        margin: 0,
                      }}
                    >
                      OFFICIELLT MATCHSTÄLL
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--silver-dim)' }}>
                      Matchtröjor & kläder i klubbfärgerna
                    </span>
                  </div>
                </div>

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                >
                  <span>BESTÄLL VIA DM</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            HOMEPAGE WINTER SCHEDULE OVERVIEW (NOV & DEC)
           ================================================================== */}
        <div className="winter-schedule-strip">
          <div className="winter-schedule-strip__header">
            <div>
              <span className="winter-schedule-strip__tag">
                <Calendar size={14} />
                VINTERPROGRAM 2026
              </span>
              <h3 className="winter-schedule-strip__title">
                SPELPROGRAM <span className="text-neon">2026 / 2027</span>
              </h3>
              <p className="winter-schedule-strip__subtitle">
                Följ Futsal Boys genom vintern: tre träningar, två träningsmatcher och tre cuper (Färgelanda cup, Ytterby cup och Tössecupen).
              </p>
            </div>

            <Link to="/matcher" className="btn btn--neon btn--sm">
              <span>SE FULLSTÄNDIGT SCHEMA</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="winter-schedule-strip__grid">
            {winterSchedule.map((item) => {
              const [dayNum, monthStr] = item.date.split(' ');
              return (
                <Link
                  to={`/schema/${item.slug}`}
                  key={item.id}
                  className="winter-schedule-mini-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="mini-card__date">
                    <span className="mini-card__day">{dayNum}</span>
                    <span className="mini-card__month">{monthStr}</span>
                  </div>

                  <div className="mini-card__info">
                    <span
                      className={`mini-card__badge ${
                        item.type === 'TRÄNING'
                          ? 'mini-card__badge--traning'
                          : item.type === 'MATCH'
                          ? 'mini-card__badge--match'
                          : 'mini-card__badge--cup'
                      }`}
                    >
                      {item.type === 'TRÄNING' ? 'TRÄNING' : item.type === 'MATCH' ? 'MATCH' : 'CUP • HELDAG'}
                    </span>
                    <h4 className="mini-card__title" title={item.title}>
                      {item.title}
                    </h4>
                    <div className="mini-card__meta">
                      <span className="mini-card__meta-item">
                        <Clock size={12} className="text-neon" />
                        {item.time}
                      </span>
                      <span className="mini-card__meta-item">
                        <MapPin size={12} className="text-neon" />
                        {item.venue}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};