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
        background: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(10px)',
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
          background: '#0d1218',
          border: '1px solid rgba(16, 255, 96, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(16, 255, 96, 0.2)',
          borderRadius: '24px',
          maxWidth: '860px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          maxHeight: '92vh',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Stäng"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--neon-green)';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Gallery */}
        <div
          style={{
            background: '#05070a',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Main Photo View */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#0a0e14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={currentImage}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {item.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: item.badgeType === 'value' ? '#ff9900' : 'var(--neon-green)',
                  color: '#07090b',
                  fontSize: '11px',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
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
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Nästa bild"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {item.gallery.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '16px',
                justifyContent: 'center',
              }}
            >
              {item.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: activeImageIdx === idx ? '2px solid var(--neon-green)' : '1px solid rgba(255, 255, 255, 0.15)',
                    background: '#0a0d11',
                    cursor: 'pointer',
                    padding: 0,
                    opacity: activeImageIdx === idx ? 1 : 0.6,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info, Sizes & Order via DM CTA */}
        <div
          style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: 'var(--neon-green)',
              textTransform: 'uppercase',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={14} />
            <span>OFFICIELL KLUBBMERCH</span>
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              color: '#ffffff',
              margin: '0 0 6px',
              lineHeight: 1.1,
              letterSpacing: '0.04em',
            }}
          >
            {item.title}
          </h2>

          <p style={{ color: 'var(--silver-dim)', fontSize: '14px', margin: '0 0 18px', lineHeight: 1.4 }}>
            {item.subtitle}
          </p>

          {/* Price display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              padding: '12px 18px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '34px',
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
                  fontSize: '16px',
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
              fontSize: '14px',
              lineHeight: 1.6,
              margin: '0 0 20px',
            }}
          >
            {item.description}
          </p>

          {/* Features list */}
          <div style={{ marginBottom: '22px' }}>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#ffffff',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              PRODUKTDETALJER:
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.features.map((feat, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px',
                    color: 'var(--silver-dim)',
                  }}
                >
                  <Check size={14} color="var(--neon-green)" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Size Selector if clothing */}
          {item.sizes && item.sizes.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>VÄLJ STORLEK:</span>
                <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>Unisex standard</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {item.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: '46px',
                      height: '42px',
                      borderRadius: '8px',
                      border: selectedSize === s ? '2px solid var(--neon-green)' : '1px solid rgba(255, 255, 255, 0.15)',
                      background: selectedSize === s ? 'rgba(16, 255, 96, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      color: selectedSize === s ? 'var(--neon-green)' : '#ffffff',
                      fontWeight: 800,
                      fontSize: '13px',
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
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'rgba(16, 255, 96, 0.08)',
              border: '1px solid rgba(16, 255, 96, 0.25)',
              marginBottom: '20px',
              fontSize: '12.5px',
              lineHeight: 1.5,
              color: '#dfffe8',
            }}
          >
            💬 <strong>Hur köper jag?</strong> Klicka på knappen nedan för att öppna ett direktmeddelande (DM) till oss på Instagram (<strong>{siteConfig.instagramHandle}</strong>) så sköter vi betalning och leverans direkt!
          </div>

          {/* BUY VIA INSTAGRAM DM BUTTON */}
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
              gap: '10px',
              padding: '14px 20px',
              fontSize: '15px',
              fontWeight: 800,
              textDecoration: 'none',
              borderRadius: '12px',
              marginTop: 'auto',
              boxShadow: '0 8px 24px rgba(16, 255, 96, 0.35)',
            }}
          >
            <Instagram size={18} />
            <span>BESTÄLL VIA DM PÅ INSTAGRAM</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};

