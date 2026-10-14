import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Player } from '../content/futsalData';

interface PlayerModalProps {
  players: Player[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  players,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < players.length;
  const player = isOpen ? players[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex! - 1 + players.length) % players.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex! + 1) % players.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, players.length, onClose, onNavigate]);

  if (!isOpen || !player) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex! - 1 + players.length) % players.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex! + 1) % players.length);
  };

  return (
    <div
      className="gallery-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={player.name}
    >
      <div
        className="gallery-modal-content player-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px' }}
      >
        {/* Topbar */}
        <div className="gallery-modal-topbar">
          <div className="gallery-modal-counter">
            SPELARE <span className="text-neon">{currentIndex! + 1}</span> / {players.length}
          </div>

          <button
            type="button"
            className="gallery-modal-close"
            onClick={onClose}
            aria-label="Stäng spelarkort"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div className="player-modal-grid">
            {/* Player Photo with Centered Navigation Arrows */}
            <div className="player-modal-photo-wrap">
              <img
                src={player.image}
                alt={player.name}
                className="player-modal-photo"
              />
              <div className="player-modal-number">
                #{player.number}
              </div>

              {players.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-nav-arrow gallery-nav-arrow--prev player-modal-arrow player-modal-arrow--prev"
                    onClick={handlePrev}
                    aria-label="Föregående spelare"
                    style={{ zIndex: 20 }}
                  >
                    <ChevronLeft size={26} />
                  </button>

                  <button
                    type="button"
                    className="gallery-nav-arrow gallery-nav-arrow--next player-modal-arrow player-modal-arrow--next"
                    onClick={handleNext}
                    aria-label="Nästa spelare"
                    style={{ zIndex: 20 }}
                  >
                    <ChevronRight size={26} />
                  </button>
                </>
              )}
            </div>

            {/* Player Info */}
            <div className="player-modal-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span className="player-modal-position">{player.position}</span>
                {player.isLeader && (
                  <span className="player-modal-leader-badge">
                    <Award size={13} />
                    LEDARE
                  </span>
                )}
              </div>

              <h2 className="player-modal-name">{player.name}</h2>
              {player.nickname && (
                <div className="player-modal-nickname">"{player.nickname}"</div>
              )}

              {/* Stats */}
              {player.stats && (
                <div className="player-modal-stats-grid">
                  <div className="player-modal-stat-box">
                    <span>MATCHER</span>
                    <strong>{player.stats.matches}</strong>
                  </div>

                  {player.stats.goals !== undefined && (
                    <div className="player-modal-stat-box">
                      <span>MÅL</span>
                      <strong className="text-neon">{player.stats.goals}</strong>
                    </div>
                  )}

                  {player.stats.assists !== undefined && (
                    <div className="player-modal-stat-box">
                      <span>ASSIST</span>
                      <strong>{player.stats.assists}</strong>
                    </div>
                  )}

                  {player.stats.cleanSheets !== undefined && (
                    <div className="player-modal-stat-box">
                      <span>NOLLOR</span>
                      <strong className="text-neon">{player.stats.cleanSheets}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Quote */}
              {player.quote && (
                <blockquote className="player-modal-quote">
                  "{player.quote}"
                </blockquote>
              )}

              <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--silver-dim)' }}>
                  Använd piltangenterna ◄ ► för att bläddra
                </span>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={onClose}
                >
                  STÄNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
