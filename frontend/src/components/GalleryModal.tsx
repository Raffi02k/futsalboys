import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Calendar, Tag, ExternalLink } from 'lucide-react';
import { GalleryItem } from '../content/galleryData';
import { siteConfig } from '../content/siteContent';

interface GalleryModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex! - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex! + 1) % items.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex! - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex! + 1) % items.length);
  };

  return (
    <div
      className="gallery-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title}
    >
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className="gallery-modal-topbar">
          <div className="gallery-modal-counter">
            <span className="text-neon">{currentIndex! + 1}</span> / {items.length}
          </div>

          <button
            type="button"
            className="gallery-modal-close"
            onClick={onClose}
            aria-label="Stäng galleri"
          >
            <X size={24} />
          </button>
        </div>

        {/* Media display area with navigation arrows */}
        <div className="gallery-modal-media-wrap">
          {items.length > 1 && (
            <button
              type="button"
              className="gallery-nav-arrow gallery-nav-arrow--prev"
              onClick={handlePrev}
              aria-label="Föregående bild"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div className="gallery-modal-media">
            {currentItem.type === 'video' ? (
              currentItem.videoUrl ? (
                <video
                  src={currentItem.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="gallery-modal-video"
                />
              ) : (
                <div className="gallery-video-preview">
                  <img
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="gallery-modal-img"
                  />
                  <div className="gallery-video-overlay-msg">
                    <div className="gallery-video-icon-bubble">
                      <Play size={32} fill="currentColor" />
                    </div>
                    <h4>Videoklipp / Reel</h4>
                    <p>Se hela matchklippet på lagets officiella Instagram.</p>
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--neon btn--sm"
                      style={{ marginTop: '12px' }}
                    >
                      <span>ÖPPNA INSTAGRAM</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )
            ) : (
              <img
                src={currentItem.src}
                alt={currentItem.title}
                className="gallery-modal-img"
              />
            )}
          </div>

          {items.length > 1 && (
            <button
              type="button"
              className="gallery-nav-arrow gallery-nav-arrow--next"
              onClick={handleNext}
              aria-label="Nästa bild"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Caption & Meta info */}
        <div className="gallery-modal-caption">
          <div className="gallery-modal-tags">
            <span className="gallery-tag">
              <Tag size={12} />
              {currentItem.category}
            </span>
            <span className="gallery-date">
              <Calendar size={12} />
              {currentItem.date}
            </span>
          </div>
          <h3 className="gallery-modal-title">{currentItem.title}</h3>
          {currentItem.description && (
            <p className="gallery-modal-desc">{currentItem.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
