import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Instagram } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { siteConfig } from '../content/siteContent';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="404 - Sidan hittades inte | Futsal Boys"
        description="Sidan du letar efter finns inte eller har flyttats."
        canonicalPath="/404"
        noindex={true}
      />

      <section
        className="section"
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: '160px',
        }}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 14vw, 150px)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'var(--neon-green)',
              display: 'block',
              marginBottom: '10px',
              textShadow: '0 0 30px var(--neon-green-glow)',
            }}
          >
            404
          </span>
          <h1 className="section-title" style={{ marginBottom: '14px' }}>
            SIDAN KUNDE INTE HITTAS
          </h1>
          <p style={{ color: 'var(--silver-dim)', fontSize: '17px', lineHeight: '1.6', marginBottom: '36px' }}>
            Länken du klickade på kan vara felaktig eller så har sidan uppdaterats. Gå tillbaka till startsidan för att följa Futsal Boys!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '340px', margin: '0 auto' }}>
            <Link to="/" className="btn btn--neon">
              <Home size={18} />
              <span>TILL STARTSIDAN</span>
            </Link>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              <Instagram size={18} />
              <span>FÖLJ OSS PÅ INSTAGRAM</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
