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
        {/* H1 Hero Banner with Merch Image and Text Over It (Replaces Old Bubble Badge) */}
        <div className="merch-hero-banner">
          <img
            src="/merch/model-utebild.JPG"
            alt="Futsal Boys Officiell Merch"
            className="merch-hero-bg"
            loading="eager"
          />
          <div className="merch-hero-overlay" />

          <div className="merch-hero-content">
            <p className="merch-hero-sub">
              BÄSTSÄLJARE • SUPPORTERTRÖJOR • KEPSAR & PAKET
            </p>

            <h1 className="merch-hero-h1">
              OFFICIELL <span className="text-neon">KLUBBMERCH</span>
            </h1>

            <p className="merch-hero-desc">
              Representera Futsal Boys på läktaren, i hallen och på stan. Välj ditt plagg, välj storlek och beställ direkt med Swish till <strong>0762287601</strong>!
            </p>

            {/* Quick action strip (Always on one line) */}
            <div
              style={{
                marginTop: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '7px 16px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(16, 255, 96, 0.4)',
                fontSize: 'clamp(10.5px, 2.8vw, 12.5px)',
                color: '#ffffff',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 16px)',
              }}
            >
              <span style={{ color: 'var(--neon-green)', fontWeight: 800 }}>SWISH: 0762287601</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                <Instagram size={13} color="var(--neon-green)" style={{ flexShrink: 0 }} />
                <span>DM @grabbarna.futsal</span>
                <ArrowRight size={12} style={{ flexShrink: 0 }} />
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
