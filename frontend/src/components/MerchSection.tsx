import React, { useState } from 'react';
import { ShoppingBag, Instagram, ArrowRight } from 'lucide-react';
import { merchList, MerchItem } from '../content/merchData';
import { siteConfig } from '../content/siteContent';
import { MerchModal } from './MerchModal';

export const MerchSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);

  const getInstagramDmUrl = (item: MerchItem) => {
    const text = encodeURIComponent(item.dmMessage);
    return `https://ig.me/m/grabbarna.futsal?text=${text}`;
  };

  return (
    <section className="merch-section" id="merch" aria-label="Officiell klubbmerch">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(16, 255, 96, 0.1)',
              border: '1px solid var(--border-neon)',
              color: 'var(--neon-green)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <ShoppingBag size={15} />
            <span>OFFICIELL KLUBBSHOP</span>
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              marginBottom: '12px',
            }}
          >
            BÄST <span className="text-neon">SÄLJARE</span> & MERCH
          </h2>

          <p
            className="section-desc"
            style={{
              margin: '0 auto',
              fontSize: '15.5px',
              lineHeight: 1.6,
              color: 'var(--silver-dim)',
            }}
          >
            Representera Futsal Boys i hallen och på stan! Klicka på ett plagg för att se fler bilder eller beställ direkt via DM på Instagram.
          </p>

          {/* DM Ordering Instructions Banner */}
          <div
            className="merch-dm-banner"
            style={{
              marginTop: '24px',
              padding: '14px 20px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(16, 255, 96, 0.12) 0%, rgba(14, 20, 28, 0.9) 100%)',
              border: '1px solid rgba(16, 255, 96, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-green)', fontWeight: 800, fontSize: '13.5px' }}>
              <Instagram size={18} />
              <span>SÅ BESTÄLLER DU:</span>
            </div>
            <span style={{ fontSize: '13.5px', color: '#ffffff' }}>
              Skicka ett <strong>DM på Instagram</strong> ({siteConfig.instagramHandle}) med önskat plagg och storlek så fixar vi din beställning direkt!
            </span>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--neon-green)',
                fontWeight: 800,
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'underline',
              }}
            >
              <span>Öppna DM</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* 2-Column Mobile / 4-Column Desktop Grid (Inspired by ncclothing.se screenshot) */}
        <div className="merch-grid">
          {merchList.map((item) => (
            <div
              key={item.id}
              className="merch-card"
              onClick={() => setSelectedProduct(item)}
            >
              {/* Product Image Box */}
              <div className="merch-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="merch-card-img"
                  loading="lazy"
                />

                {/* Badge */}
                {item.badge && (
                  <span className={`merch-badge merch-badge--${item.badgeType || 'popular'}`}>
                    {item.badge}
                  </span>
                )}

                {/* Floating Bag / DM quick button */}
                <a
                  href={getInstagramDmUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="merch-floating-btn"
                  title="Beställ via Instagram DM"
                  aria-label={`Beställ ${item.title} via Instagram DM`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ShoppingBag size={18} />
                </a>
              </div>

              {/* Product Info Block */}
              <div className="merch-card-info">
                <h3 className="merch-card-title">{item.title}</h3>
                <p className="merch-card-sub">{item.subtitle}</p>

                {/* Price Row */}
                <div className="merch-card-price-row">
                  <span className="merch-card-price">{item.price} kr</span>
                  {item.originalPrice && (
                    <span className="merch-card-orig-price">{item.originalPrice} kr</span>
                  )}
                </div>

                {/* Direct Order Button */}
                <div className="merch-card-actions">
                  <a
                    href={getInstagramDmUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="merch-dm-cta-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Instagram size={14} />
                    <span>BESTÄLL I DM</span>
                  </a>

                  <button
                    type="button"
                    className="merch-view-btn"
                    onClick={() => setSelectedProduct(item)}
                  >
                    <span>SE BILDER</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <MerchModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
