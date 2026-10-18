import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Calendar, Image as ImageIcon, Instagram, ArrowLeft } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { siteConfig } from '../content/siteContent';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title={`404 - Sidan hittades inte | ${siteConfig.projectName}`}
        description="Sidan du försökte nå finns inte eller har flyttats. Gå tillbaka till Futsal Boys startsida."
        canonicalPath="/404"
        noindex={true}
      />

      <section
        className="section not-found-section"
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 'calc(var(--header-height) + 60px)',
          paddingBottom: '80px',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
          {/* Badge */}
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
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            <span>OUT OF BOUNDS • BOLLEN UTANFÖR LINJEN</span>
          </div>

          {/* Big Neon 404 */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(90px, 16vw, 170px)',
              fontWeight: 900,
              lineHeight: 0.9,
              color: 'var(--neon-green)',
              display: 'block',
              marginBottom: '16px',
              textShadow: '0 0 45px var(--neon-green-glow), 0 0 10px rgba(16, 255, 96, 0.5)',
              letterSpacing: '0.04em',
            }}
          >
            404
          </span>

          <h1
            className="section-title"
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              marginBottom: '14px',
              textTransform: 'uppercase',
            }}
          >
            SIDAN KUNDE INTE <span className="text-neon">HITTAS</span>
          </h1>

          <p
            style={{
              color: 'var(--silver-dim)',
              fontSize: '16px',
              lineHeight: '1.6',
              maxWidth: '520px',
              margin: '0 auto 36px',
            }}
          >
            Det ser ut som att länken du följde är felaktig eller att sidan har flyttats.
            Ingen fara – matchen fortsätter! Välj vart du vill gå:
          </p>

          {/* Quick Hub Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '28px',
            }}
          >
            <Link
              to="/"
              className="btn btn--neon"
              style={{ justifyContent: 'center' }}
            >
              <Home size={17} />
              <span>STARTSIDAN</span>
            </Link>

            <Link
              to="/truppen"
              className="btn btn--outline"
              style={{ justifyContent: 'center' }}
            >
              <Users size={17} />
              <span>SPELARTRUPPEN</span>
            </Link>

            <Link
              to="/matcher"
              className="btn btn--outline"
              style={{ justifyContent: 'center' }}
            >
              <Calendar size={17} />
              <span>SPELSCHEMA</span>
            </Link>

            <Link
              to="/galleri"
              className="btn btn--outline"
              style={{ justifyContent: 'center' }}
            >
              <ImageIcon size={17} />
              <span>GALLERI</span>
            </Link>
          </div>

          {/* Secondary Instagram & Back link */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn btn--ghost"
              style={{
                color: 'var(--silver-dim)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <ArrowLeft size={16} />
              <span>Gå tillbaka</span>
            </button>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--neon-green)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Instagram size={16} />
              <span>Följ @futsalboys på Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
