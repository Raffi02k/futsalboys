import React, { useState } from 'react';
import { ShoppingBag, Instagram, ArrowRight } from 'lucide-react';
import { merchList, MerchItem } from '../content/merchData';
import { siteConfig } from '../content/siteContent';
import { MerchModal } from './MerchModal';

export const MerchSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);

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
            Representera Futsal Boys i hallen och på stan! Klicka på ett plagg för att välja storlek och beställa direkt med Swish till 0762287601.
          </p>

          {/* Ordering Instructions Banner */}
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
              gap: '14px',
              flexWrap: 'wrap',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-green)', fontWeight: 800, fontSize: '13.5px' }}>
              <ShoppingBag size={17} />
              <span>SÅ BESTÄLLER DU:</span>
            </div>
            <span style={{ fontSize: '13.5px', color: '#ffffff' }}>
              Klicka på valfri merch, välj storlek & fyll i dina uppgifter! Betalning sker smidigt via <strong>Swish till 0762287601</strong>.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--silver-dim)', fontSize: '12px' }}>eller</span>
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
                <Instagram size={14} />
                <span>DM på Instagram</span>
                <ArrowRight size={13} />
              </a>
            </div>
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

                {/* Floating Bag quick order button */}
                <button
                  type="button"
                  className="merch-floating-btn"
                  title="Beställ direkt"
                  aria-label={`Beställ ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(item);
                  }}
                >
                  <ShoppingBag size={18} />
                </button>
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

                {/* Direct Order Actions */}
                <div className="merch-card-actions">
                  <button
                    type="button"
                    className="merch-dm-cta-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(item);
                    }}
                  >
                    <ShoppingBag size={14} />
                    <span>BESTÄLL HÄR</span>
                  </button>

                  <button
                    type="button"
                    className="merch-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(item);
                    }}
                  >
                    <span>INFO / BILDER</span>
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
