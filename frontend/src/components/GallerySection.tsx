import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { galleryItems, GalleryItem } from '../content/galleryData';
import { GalleryModal } from './GalleryModal';

export const GallerySection: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Take top featured items for homepage showcase (up to 6)
  const featuredItems = galleryItems.filter((i) => i.isFeatured).slice(0, 6);

  const handleOpenItem = (item: GalleryItem) => {
    const idx = featuredItems.findIndex((i) => i.id === item.id);
    setSelectedItemIndex(idx >= 0 ? idx : 0);
  };

  return (
    <section className="section gallery-section" id="galleri">
      <div className="container">
        {/* Section Header */}
        <div className="gallery-section__header">
          <div>
            <h2 className="section-title">
              HÖJDPUNKTER FRÅN <span className="text-neon">PARKETTEN</span>
            </h2>
            <p className="section-desc">
              Bilder och videoklipp från matcherna, cupvinsterna och förberedelserna i Trollhättan.
            </p>
          </div>

          <div className="gallery-section__cta-desktop">
            <Link to="/galleri" className="btn btn--outline">
              <span>SE ALLA ({galleryItems.length})</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Highlight Grid */}
        <div className="gallery-preview-grid">
          {featuredItems.map((item, index) => (
            <article
              key={item.id}
              className={`gallery-preview-card ${index === 0 ? 'gallery-preview-card--hero' : ''}`}
              onClick={() => handleOpenItem(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenItem(item);
                }
              }}
              aria-label={`Visa ${item.title}`}
            >
              <div className="gallery-preview-card__img-wrap">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="gallery-preview-card__img"
                />
                <div className="gallery-preview-card__overlay" />

                {/* Badge */}
                <div className="gallery-preview-card__badge-row">
                  {item.category !== 'VIDEO' && (
                    <span className="gallery-badge">{item.category}</span>
                  )}
                  {item.type === 'video' && (
                    <span className="gallery-badge gallery-badge--video">
                      <Play size={10} fill="currentColor" />
                      VIDEO
                    </span>
                  )}
                </div>

                {/* Play icon */}
                {item.type === 'video' && (
                  <div className="gallery-preview-card__play" aria-hidden="true">
                    <Play size={20} fill="currentColor" />
                  </div>
                )}

                {/* Info */}
                <div className="gallery-preview-card__info">
                  <span className="gallery-preview-card__date">{item.date}</span>
                  <h3 className="gallery-preview-card__title">{item.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="gallery-section__cta-mobile">
          <Link to="/galleri" className="btn btn--neon" style={{ width: '100%', justifyContent: 'center' }}>
            <span>ÖPPNA HELA GALLERIET ({galleryItems.length} BILDER & VIDEOR)</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryModal
        items={featuredItems}
        currentIndex={selectedItemIndex}
        onClose={() => setSelectedItemIndex(null)}
        onNavigate={(newIdx) => setSelectedItemIndex(newIdx)}
      />
    </section>
  );
};
