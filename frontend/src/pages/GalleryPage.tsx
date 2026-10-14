import React, { useState } from 'react';
import { Play, Image as ImageIcon, Film, Filter } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { GalleryModal } from '../components/GalleryModal';
import { galleryItems, galleryCategories, GalleryItem } from '../content/galleryData';
import { siteConfig } from '../content/siteContent';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Filter items based on active category
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category === activeCategory;
  });

  const photoCount = galleryItems.filter((i) => i.type === 'image').length;
  const videoCount = galleryItems.filter((i) => i.type === 'video').length;

  const handleOpenItem = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    setSelectedItemIndex(idx >= 0 ? idx : 0);
  };

  return (
    <div className="gallery-page">
      <PageMeta
        title={`Galleri & Videor | ${siteConfig.projectName} - Trollhättan`}
        description="Utforska officiella bilder och videor från Futsal Boys. Cupvinster, matchbilder, träningar och stämningen i Trollhättan."
        canonicalPath="/galleri"
      />

      {/* Header Banner */}
      <section className="gallery-header-section">
        <div className="container">
          <div className="gallery-hero-text">
            <h1 className="gallery-main-title">
              FUTSAL BOYS <span className="text-neon">GALLERI</span>
            </h1>
            <p className="gallery-subtitle">
              Upplev energin, cupvinsterna, matchsekvenserna och livet bakom kulisserna.
              Här samlas alla foton och videohöjdpunkter från säsongen.
            </p>

            {/* Quick counters */}
            <div className="gallery-meta-bar">
              <div className="gallery-meta-pill">
                <ImageIcon size={15} className="text-neon" />
                <span>{photoCount} Foton</span>
              </div>
              <div className="gallery-meta-pill">
                <Film size={15} className="text-neon" />
                <span>{videoCount} Videor</span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="gallery-filters" role="tablist" aria-label="Filtrera mediakategorier">
            <div className="gallery-filters__scroll">
              {galleryCategories.map((cat) => {
                const count =
                  cat.id === 'ALL'
                    ? galleryItems.length
                    : galleryItems.filter((i) => i.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`gallery-filter-btn ${
                      activeCategory === cat.id ? 'is-active' : ''
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="gallery-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid of media cards */}
      <section className="gallery-grid-section">
        <div className="container">
          {filteredItems.length === 0 ? (
            <div className="gallery-empty-state">
              <Filter size={40} className="text-neon" />
              <h3>Inga filer i denna kategori ännu</h3>
              <p>Fler bilder och videoklipp laddas upp löpande under säsongen.</p>
              <button
                type="button"
                className="btn btn--neon btn--sm"
                onClick={() => setActiveCategory('ALL')}
              >
                Visa alla ({galleryItems.length})
              </button>
            </div>
          ) : (
            <div className="gallery-masonry-grid">
              {filteredItems.map((item, index) => (
                <article
                  key={item.id}
                  className="gallery-card"
                  onClick={() => handleOpenItem(item)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenItem(item);
                    }
                  }}
                  aria-label={`Öppna ${item.title}`}
                >
                  <div className="gallery-card__thumb-wrap">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading={index < 4 ? 'eager' : 'lazy'}
                      className="gallery-card__thumb"
                    />

                    {/* Gradient Overlay */}
                    <div className="gallery-card__overlay" />

                    {/* Badges */}
                    <div className="gallery-card__badges">
                      {item.category !== 'VIDEO' && (
                        <span className="gallery-badge gallery-badge--cat">
                          {item.category}
                        </span>
                      )}
                      {item.type === 'video' && (
                        <span className="gallery-badge gallery-badge--video">
                          <Play size={11} fill="currentColor" />
                          VIDEO
                        </span>
                      )}
                    </div>

                    {/* Play Button Icon for Videos */}
                    {item.type === 'video' && (
                      <div className="gallery-card__play-btn" aria-hidden="true">
                        <Play size={24} fill="currentColor" />
                      </div>
                    )}

                    {/* Card info on bottom */}
                    <div className="gallery-card__info">
                      <span className="gallery-card__date">{item.date}</span>
                      <h3 className="gallery-card__title">{item.title}</h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryModal
        items={filteredItems}
        currentIndex={selectedItemIndex}
        onClose={() => setSelectedItemIndex(null)}
        onNavigate={(newIdx) => setSelectedItemIndex(newIdx)}
      />
    </div>
  );
};
