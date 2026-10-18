import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Calendar, Clock, MapPin, Flame, ArrowRight, ShoppingBag, X, User } from 'lucide-react';
import { upcomingMatch, clubNewsList, ClubNews } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

export const MatchAndNewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ClubNews | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  // Lock body scroll when article modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedArticle]);

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
                  <div
                    key={news.id}
                    className="news-item"
                    onClick={() => setSelectedArticle(news)}
                    style={{ cursor: 'pointer' }}
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
                  </div>
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

      {/* ARTICLE / BLOG POST MODAL READER (RENDERED VIA PORTAL TO BODY) */}
      {selectedArticle && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.title}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(5, 7, 9, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '24px 16px 80px',
            overflowY: 'auto',
          }}
          onClick={() => setSelectedArticle(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              backgroundColor: '#0e1217',
              border: '2px solid var(--border-neon)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(16, 255, 96, 0.25)',
              margin: '20px auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Prominent Close Button */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(18, 23, 30, 0.98)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span className="section-tag" style={{ margin: 0, padding: '4px 14px', fontSize: '12px' }}>
                  {selectedArticle.category}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--silver-dim)' }}>
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Stäng artikel"
                className="btn btn--neon btn--sm"
                style={{ padding: '6px 14px', fontSize: '13px' }}
              >
                <X size={18} />
                <span>STÄNG</span>
              </button>
            </div>

            {/* Modal Article Body */}
            <div style={{ padding: '32px 28px' }}>
              {/* Title & Author */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4.5vw, 42px)',
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '0.03em',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}
              >
                {selectedArticle.title}
              </h2>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--neon-green)',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <User size={16} />
                <span>Av: {selectedArticle.author}</span>
              </div>

              {/* Article Hero Image */}
              <div
                style={{
                  width: '100%',
                  height: '340px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  marginBottom: '28px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Article Paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#cbd5e1', fontSize: '16px', lineHeight: 1.75 }}>
                {selectedArticle.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Featured Quote Callout */}
              {selectedArticle.quote && (
                <div
                  style={{
                    marginTop: '32px',
                    padding: '22px 26px',
                    borderRadius: '12px',
                    background: 'rgba(16, 255, 96, 0.08)',
                    borderLeft: '4px solid var(--neon-green)',
                    fontStyle: 'italic',
                    color: '#ffffff',
                    fontSize: '16px',
                    lineHeight: 1.6,
                  }}
                >
                  "{selectedArticle.quote}"
                </div>
              )}

              {/* Bottom Actions inside Article */}
              <div
                style={{
                  marginTop: '40px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                >
                  <span>FÖLJ RESAN PÅ INSTAGRAM</span>
                </a>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="btn btn--neon btn--sm"
                >
                  <X size={16} />
                  <span>STÄNG ARTIKEL</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
