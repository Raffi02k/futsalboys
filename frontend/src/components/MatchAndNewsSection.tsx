import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Flame, ArrowRight, ShoppingBag } from 'lucide-react';
import { upcomingMatch, clubNewsList } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

export const MatchAndNewsSection: React.FC = () => {
  return (
    <section className="section section--darker" id="matcher">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
          <h2 className="section-title">
            NÄSTA MATCH & <span className="text-neon">KLUBBNYTT</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Håll koll på säsongens spelschema, matchdagar och läs de senaste nyheterna och matchrapporterna.
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
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      color: 'var(--silver-dim)',
                    }}
                  >
                    RFC
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

              <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '380px', flexWrap: 'wrap' }}>
                <Link
                  to="/matcher"
                  className="btn btn--neon"
                  style={{ flex: 1, minWidth: '150px', justifyContent: 'center' }}
                >
                  SE SPELSCHEMA
                </Link>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  style={{ flex: 1, minWidth: '150px', justifyContent: 'center' }}
                >
                  HEJA PÅ OSS
                </a>
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
                {clubNewsList.map((news) => (
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
      </div>
    </section>
  );
};
