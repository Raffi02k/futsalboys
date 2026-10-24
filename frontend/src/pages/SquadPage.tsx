import React, { useState } from 'react';
import { Award, Eye } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { PlayerModal } from '../components/PlayerModal';
import { SquadIntroVideo } from '../components/SquadIntroVideo';
import { squadData, Player } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

type PositionFilter = 'ALL' | 'MÅLVAKT' | 'FÖRSVAR' | 'MITTFÄLT' | 'FORWARD';

export const SquadPage: React.FC = () => {
  const [filter, setFilter] = useState<PositionFilter>('ALL');
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(null);

  const filteredPlayers = squadData.filter((player) => {
    if (filter === 'ALL') return true;
    return player.position === filter;
  });

  const handleOpenPlayer = (player: Player) => {
    const idx = filteredPlayers.findIndex((p) => p.id === player.id);
    setSelectedPlayerIndex(idx >= 0 ? idx : 0);
  };

  return (
    <div className="squad-page" style={{ paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: '80px' }}>
      <PageMeta
        title={`Spelartruppen | ${siteConfig.projectName} - Trollhättan`}
        description="Möt hela spelartruppen i Futsal Boys Trollhättan. Se officiell introduktionsvideo och utforska alla spelarprofiler."
        canonicalPath="/truppen"
      />

      <div className="container">
        {/* 1. Official Intro Video in Full Length with Audio */}
        <SquadIntroVideo />

        {/* 2. Squad Header & Filters */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '56px auto 36px' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5.5vw, 56px)', marginBottom: '14px' }}>
            ALLA SPELARE I <span className="text-neon">TRUPPEN</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto 28px', fontSize: '16px' }}>
            Trollhättans mest sammansvetsade futsallag. Klicka på en spelare för att öppna profilen och se detaljerad statistik.
          </p>

          {/* Position Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {(['ALL', 'MÅLVAKT', 'FÖRSVAR', 'MITTFÄLT', 'FORWARD'] as PositionFilter[]).map((pos) => {
              const count = pos === 'ALL' ? squadData.length : squadData.filter((p) => p.position === pos).length;
              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setFilter(pos)}
                  className={`gallery-filter-btn ${filter === pos ? 'is-active' : ''}`}
                >
                  <span>{pos === 'ALL' ? 'HELA TRUPPEN' : pos}</span>
                  <span className="gallery-filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Squad Grid - Clickable to open player gallery modal */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredPlayers.map((player, index) => (
            <article
              key={player.id}
              onClick={() => handleOpenPlayer(player)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenPlayer(player);
                }
              }}
              aria-label={`Visa spelarprofil för ${player.name}`}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                outline: 'none',
                transition: 'transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
              }}
              className="player-grid-card"
            >
              {/* Image with jersey number & badges */}
              <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
                <img
                  src={player.image}
                  alt={player.name}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transition: 'transform 0.4s ease' }}
                  className="player-card-photo"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(10,13,16,0.1) 0%, rgba(10,13,16,0.92) 100%)',
                  }}
                />

                {/* Jersey number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '36px',
                    color: 'var(--neon-green)',
                    background: 'rgba(7,9,11,0.85)',
                    padding: '2px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--neon-green-glow)',
                    lineHeight: 1,
                  }}
                >
                  #{player.number}
                </div>

                {/* Leader badge */}
                {player.isLeader && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(16, 255, 96, 0.2)',
                      border: '1px solid var(--neon-green-glow)',
                      color: 'var(--neon-green)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                    }}
                  >
                    <Award size={12} />
                    <span>LEDARE</span>
                  </div>
                )}

                {/* Name & Position in bottom of image */}
                <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--neon-green)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    {player.position} {player.nickname ? `• "${player.nickname}"` : ''}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      color: '#ffffff',
                      lineHeight: 1,
                      margin: 0,
                    }}
                  >
                    {player.name}
                  </h3>
                </div>
              </div>

              {/* Stats & Quick CTA */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {player.stats && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--silver-dim)', textTransform: 'uppercase', display: 'block' }}>
                        MATCHER
                      </span>
                      <strong style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff' }}>
                        {player.stats.matches}
                      </strong>
                    </div>

                    {player.stats.goals !== undefined && (
                      <div>
                        <span style={{ fontSize: '10px', color: 'var(--silver-dim)', textTransform: 'uppercase', display: 'block' }}>
                          MÅL
                        </span>
                        <strong style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--neon-green)' }}>
                          {player.stats.goals}
                        </strong>
                      </div>
                    )}

                    {player.stats.cleanSheets !== undefined && (
                      <div>
                        <span style={{ fontSize: '10px', color: 'var(--silver-dim)', textTransform: 'uppercase', display: 'block' }}>
                          NOLLOR
                        </span>
                        <strong style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--neon-green)' }}>
                          {player.stats.cleanSheets}
                        </strong>
                      </div>
                    )}

                    {player.stats.assists !== undefined && (
                      <div>
                        <span style={{ fontSize: '10px', color: 'var(--silver-dim)', textTransform: 'uppercase', display: 'block' }}>
                          ASSIST
                        </span>
                        <strong style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff' }}>
                          {player.stats.assists}
                        </strong>
                      </div>
                    )}
                  </div>
                )}

                {player.quote && (
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--silver-dim)',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                      margin: '0 0 14px',
                      flex: 1,
                    }}
                  >
                    "{player.quote}"
                  </p>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--neon-green)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    marginTop: 'auto',
                    paddingTop: '8px',
                  }}
                >
                  <Eye size={14} />
                  <span>KLICKA FÖR ATT VISA PROFIL</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Player Modal Lightbox */}
      <PlayerModal
        players={filteredPlayers}
        currentIndex={selectedPlayerIndex}
        onClose={() => setSelectedPlayerIndex(null)}
        onNavigate={(newIdx) => setSelectedPlayerIndex(newIdx)}
      />
    </div>
  );
};
