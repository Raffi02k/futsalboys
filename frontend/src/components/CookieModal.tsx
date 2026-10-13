import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'mm_cookie_preferences';

export function openCookieModal() {
  window.dispatchEvent(new CustomEvent('open-cookie-settings'));
}

export const CookieModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Load saved preferences if any
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-cookie-settings', handleOpen);
    return () => window.removeEventListener('open-cookie-settings', handleOpen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allAccepted));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="cookie-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      <div className="cookie-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="cookie-modal__close"
          onClick={() => setIsOpen(false)}
          aria-label="Stäng cookie-inställningar"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h2 id="cookie-modal-title" className="cookie-modal__title">
          Cookie-inställningar
        </h2>
        <p className="cookie-modal__subtitle">
          Välj vilka cookies du tillåter. Läs mer i vår{' '}
          <Link
            to="/integritet"
            onClick={() => setIsOpen(false)}
            style={{ textDecoration: 'underline', color: 'inherit' }}
          >
            integritetspolicy
          </Link>
          .
        </p>

        {/* Options List */}
        <div className="cookie-modal__options">
          {/* 1. Nödvändiga */}
          <div className="cookie-option">
            <div className="cookie-option__content">
              <div className="cookie-option__title">Nödvändiga</div>
              <div className="cookie-option__desc">
                Krävs för att sajten ska fungera, t.ex. säkerhet och dina cookie-val. Kan inte stängas av.
              </div>
            </div>
            <div className="cookie-toggle cookie-toggle--disabled">
              <div className="cookie-toggle__thumb cookie-toggle__thumb--active" />
            </div>
          </div>

          {/* 2. Analys */}
          <div className="cookie-option">
            <div className="cookie-option__content">
              <div className="cookie-option__title">Analys</div>
              <div className="cookie-option__desc">
                Hjälper oss förstå hur sajten används så att vi kan förbättra den (Google Analytics, Plausible).
              </div>
            </div>
            <button
              type="button"
              className={`cookie-toggle ${preferences.analytics ? 'is-active' : ''}`}
              onClick={() =>
                setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
              }
              aria-label="Aktivera analyscookies"
              aria-pressed={preferences.analytics}
            >
              <div
                className={`cookie-toggle__thumb ${
                  preferences.analytics ? 'cookie-toggle__thumb--active' : ''
                }`}
              />
            </button>
          </div>

          {/* 3. Marknadsföring */}
          <div className="cookie-option">
            <div className="cookie-option__content">
              <div className="cookie-option__title">Marknadsföring</div>
              <div className="cookie-option__desc">
                Används för att mäta och anpassa annonser i sociala medier (Meta Pixel).
              </div>
            </div>
            <button
              type="button"
              className={`cookie-toggle ${preferences.marketing ? 'is-active' : ''}`}
              onClick={() =>
                setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
              }
              aria-label="Aktivera marknadsföringscookies"
              aria-pressed={preferences.marketing}
            >
              <div
                className={`cookie-toggle__thumb ${
                  preferences.marketing ? 'cookie-toggle__thumb--active' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cookie-modal__actions">
          <button
            type="button"
            className="cookie-btn cookie-btn--outline"
            onClick={handleAcceptAll}
          >
            Acceptera alla
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn--primary"
            onClick={handleSave}
          >
            Spara val
          </button>
        </div>
      </div>
    </div>
  );
};
