import React, { useState } from 'react';
import { X, Instagram, Check, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { MerchItem } from '../content/merchData';
import { siteConfig } from '../content/siteContent';

interface MerchModalProps {
  item: MerchItem | null;
  onClose: () => void;
}

export const MerchModal: React.FC<MerchModalProps> = ({ item, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('L');

  if (!item) return null;

  const currentImage = item.gallery[activeImageIdx] || item.image;

  // Instagram direct message link
  const dmText = encodeURIComponent(
    `${item.dmMessage}${item.sizes ? selectedSize : ''}`
  );
  const instagramDmUrl = `https://ig.me/m/grabbarna.futsal?text=${dmText}`;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : item.gallery.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev < item.gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 7, 10, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        className="merch-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0c1016',
          border: '1px solid rgba(16, 255, 96, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(16, 255, 96, 0.18)',
          borderRadius: '22px',
          maxWidth: '880px',
          width: '100%',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.25fr)',
          maxHeight: 'min(92vh, 740px)',
          overflow: 'hidden',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Stäng modal"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--neon-green)';
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.borderColor = 'var(--neon-green)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
          }}
        >
          <X size={18} />
        </button>

        {/* Left Column: Image Gallery */}
        <div
          className="merch-modal-left"
          style={{
            background: '#070a0e',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            minHeight: 0,
            overflowY: 'auto',
          }}
        >
          {/* Main Photo View */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '360px',
              aspectRatio: '1 / 1',
              margin: '0 auto',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src={currentImage}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />

            {item.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: item.badgeType === 'value' ? '#ff9900' : 'var(--neon-green)',
                  color: '#07090b',
                  fontSize: '10.5px',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  padding: '4px 9px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                  zIndex: 2,
                }}
              >
                {item.badge}
              </span>
            )}

            {/* Gallery Navigation arrows */}
            {item.gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Föregående bild"
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Nästa bild"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {item.gallery.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '14px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {item.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border:
                      activeImageIdx === idx
                        ? '2px solid var(--neon-green)'
                        : '1px solid rgba(255, 255, 255, 0.15)',
                    background: '#ffffff',
                    cursor: 'pointer',
                    padding: 0,
                    opacity: activeImageIdx === idx ? 1 : 0.6,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info, Sizes & Order via DM CTA */}
        <div
          className="merch-modal-right"
          style={{
            padding: '22px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxHeight: '100%',
            overflowY: 'auto',
          }}
        >
          {/* Top Tag */}
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: 'var(--neon-green)',
              textTransform: 'uppercase',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={13} />
            <span>OFFICIELL KLUBBMERCH</span>
          </span>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '25px',
              color: '#ffffff',
              margin: '0 0 3px',
              lineHeight: 1.15,
              letterSpacing: '0.04em',
            }}
          >
            {item.title}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              color: 'var(--silver-dim)',
              fontSize: '13px',
              margin: '0 0 12px',
              lineHeight: 1.35,
            }}
          >
            {item.subtitle}
          </p>

          {/* Price display row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              padding: '8px 14px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 900,
                color: 'var(--neon-green)',
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              {item.price} kr
            </span>

            {item.originalPrice && (
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--silver-dim)',
                  textDecoration: 'line-through',
                  fontWeight: 600,
                }}
              >
                {item.originalPrice} kr
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              color: '#d0d8e0',
              fontSize: '13px',
              lineHeight: 1.5,
              margin: '0 0 14px',
            }}
          >
            {item.description}
          </p>

          {/* Features list */}
          <div style={{ marginBottom: '14px' }}>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}
            >
              PRODUKTDETALJER:
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              {item.features.map((feat, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12.5px',
                    color: 'var(--silver-dim)',
                  }}
                >
                  <Check size={13} color="var(--neon-green)" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Size Selector if clothing */}
          {item.sizes && item.sizes.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#ffffff' }}>
                  VÄLJ STORLEK:
                </span>
                <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>
                  Unisex standard
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {item.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: '42px',
                      height: '36px',
                      borderRadius: '8px',
                      border:
                        selectedSize === s
                          ? '2px solid var(--neon-green)'
                          : '1px solid rgba(255, 255, 255, 0.15)',
                      background:
                        selectedSize === s
                          ? 'rgba(16, 255, 96, 0.16)'
                          : 'rgba(255, 255, 255, 0.04)',
                      color: selectedSize === s ? 'var(--neon-green)' : '#ffffff',
                      fontWeight: 800,
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Instructions Box */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '9px',
              background: 'rgba(16, 255, 96, 0.08)',
              border: '1px solid rgba(16, 255, 96, 0.25)',
              marginBottom: '16px',
              fontSize: '12px',
              lineHeight: 1.45,
              color: '#dfffe8',
            }}
          >
            💬 <strong>Hur köper jag?</strong> Klicka på knappen nedan så öppnas direkt ett DM till oss på Instagram (<strong>{siteConfig.instagramHandle}</strong>) med din beställning förifylld!
          </div>

          {/* BUY VIA INSTAGRAM DM BUTTON (Always clearly visible!) */}
          <a
            href={instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--neon"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 18px',
              fontSize: '14px',
              fontWeight: 850,
              textDecoration: 'none',
              borderRadius: '10px',
              marginTop: 'auto',
              boxShadow: '0 8px 22px rgba(16, 255, 96, 0.35)',
              flexShrink: 0,
            }}
          >
            <Instagram size={17} />
            <span>BESTÄLL VIA DM PÅ INSTAGRAM</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

