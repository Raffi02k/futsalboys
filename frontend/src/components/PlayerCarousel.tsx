import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { squadData } from '../content/futsalData';

type FilterType = 'ALLA' | 'FORWARD' | 'MITTFÄLT' | 'FÖRSVAR' | 'MÅLVAKT';

export const PlayerCarousel: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('ALLA');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredPlayers = squadData.filter((player) => {
    if (filter === 'ALLA') return true;
    return player.position === filter;
  });

  const safeActiveIndex = Math.min(activeIndex, Math.max(0, filteredPlayers.length - 1));

  // Center a card by index
  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const newIdx = safeActiveIndex > 0 ? safeActiveIndex - 1 : filteredPlayers.length - 1;
    scrollToCard(newIdx);
  };

  const handleNext = () => {
    const newIdx = safeActiveIndex < filteredPlayers.length - 1 ? safeActiveIndex + 1 : 0;
    scrollToCard(newIdx);
  };

  // Scroll listener to update activeIndex to the card closest to the center
  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== safeActiveIndex) {
      setActiveIndex(closestIndex);
    }
  };

  // Drag-to-scroll support for desktop mouse
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftStart.current = trackRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Initial center alignment when filter changes
  useEffect(() => {
    scrollToCard(0);
  }, [filter]);

  const activePlayer = filteredPlayers[safeActiveIndex] || squadData[0];

  return (
    <section className="section squad-section" id="truppen">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 16px' }}>
          <h2 className="section-title">
            MÖT <span className="text-neon">TRUPPEN</span>
          </h2>
        </div>

        {/* Position Filter Tabs */}
        <div className="squad-filter-tabs">
          {(['ALLA', 'FORWARD', 'MITTFÄLT', 'FÖRSVAR', 'MÅLVAKT'] as FilterType[]).map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filter === tab ? 'active' : ''}`}
              onClick={() => {
                setFilter(tab);
                setActiveIndex(0);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Carousel Stage with Free Scroll & Arrows */}
        <div className="carousel-stage">
          {/* Navigation Arrows */}
          <button
            className="carousel-btn carousel-btn--prev"
            onClick={handlePrev}
            aria-label="Föregående spelare"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="carousel-btn carousel-btn--next"
            onClick={handleNext}
            aria-label="Nästa spelare"
          >
            <ChevronRight size={28} />
          </button>

          {/* Scrollable & Swipable Track */}
          <div
            ref={trackRef}
            className="carousel-track"
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
          >
            {filteredPlayers.map((player, index) => {
              const isActive = index === safeActiveIndex;

              return (
                <div
                  key={player.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`player-card ${isActive ? 'is-active' : 'is-inactive'}`}
                  onClick={() => scrollToCard(index)}
                  title={`Välj ${player.name}`}
                >
                  <div className="card-shield">
                    {/* Number & Badge */}
                    <div className="card-shield__number">#{player.number}</div>
                    <div className="card-shield__badge">
                      {player.isLeader ? 'LEDARE' : player.position}
                    </div>

                    {/* Player Image */}
                    <div className="card-shield__img-wrap">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="card-shield__img"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>

                    {/* Player Info */}
                    <div className="card-shield__info">
                      <h3 className="card-shield__name">{player.name}</h3>
                      <div className="card-shield__pos">
                        {player.nickname ? `"${player.nickname}" • ` : ''}
                        {player.position}
                      </div>

                      {/* Stats */}
                      {player.stats && (
                        <div className="card-shield__stats">
                          <div className="card-shield__stat-pill">
                            <strong>{player.stats.matches}</strong>
                            <span>Matcher</span>
                          </div>
                          {player.stats.goals !== undefined && (
                            <div className="card-shield__stat-pill">
                              <strong className="text-neon">{player.stats.goals}</strong>
                              <span>Mål</span>
                            </div>
                          )}
                          {player.stats.assists !== undefined && (
                            <div className="card-shield__stat-pill">
                              <strong>{player.stats.assists}</strong>
                              <span>Assists</span>
                            </div>
                          )}
                          {player.stats.cleanSheets !== undefined && (
                            <div className="card-shield__stat-pill">
                              <strong className="text-neon">{player.stats.cleanSheets}</strong>
                              <span>Nollor</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Player Quote / Spotlight banner */}
        {activePlayer && activePlayer.quote && (
          <div
            style={{
              maxWidth: '680px',
              margin: '32px auto 0',
              padding: '18px 24px',
              borderRadius: '12px',
              background: 'rgba(18, 22, 28, 0.75)',
              border: '1px solid var(--border-neon)',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            <p style={{ fontStyle: 'italic', color: '#cbd5e1', fontSize: '15px' }}>
              "{activePlayer.quote}"
            </p>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--neon-green)',
                letterSpacing: '0.1em',
                marginTop: '6px',
                display: 'block',
              }}
            >
              — {activePlayer.name} #{activePlayer.number}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
