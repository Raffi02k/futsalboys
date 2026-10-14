import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { instagramData } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

export const InstagramPage: React.FC = () => {
  return (
    <div className="instagram-page" style={{ paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: '80px' }}>
      <PageMeta
        title={`Instagram & Sociala Medier | ${siteConfig.projectName} - Trollhättan`}
        description="Följ Futsal Boys på Instagram (@grabbarna.futsal). Se senaste inläggen, matchklipp, bilder och kontakta oss via DM."
        canonicalPath="/instagram"
      />

      <div className="container">

        {/* Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px, 6vw, 64px)', marginBottom: '16px' }}>
            FUTSAL BOYS PÅ <span className="text-neon">INSTAGRAM</span>
          </h1>
          <p className="section-desc" style={{ margin: '0 auto 32px', fontSize: '17px' }}>
            Häng med bakom kulisserna i Trollhättan. Följ våra dagliga uppdateringar, matchklipp, intervjuer och cuper.
          </p>
        </div>

        {/* Instagram Profile Card */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 56px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-neon)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(16, 255, 96, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={instagramData.avatar}
                alt={instagramData.displayName}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'contain',
                  background: '#07090b',
                  border: '2px solid var(--neon-green)',
                  padding: '4px',
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', margin: 0 }}>
                  {instagramData.displayName}
                </h2>
                <ShieldCheck size={22} className="text-neon" />
              </div>
              <span style={{ color: 'var(--silver-dim)', fontSize: '14px', fontWeight: 600 }}>
                @{instagramData.handle}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '20px', textAlign: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '18px', color: '#fff', fontWeight: 800 }}>
                  {instagramData.postsCount}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>inlägg</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '18px', color: 'var(--neon-green)', fontWeight: 800 }}>
                  {instagramData.followersCount}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>följare</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '18px', color: '#fff', fontWeight: 800 }}>
                  {instagramData.followingCount}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--silver-dim)' }}>följer</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
            {instagramData.bioLines.map((line, i) => (
              <p key={i} style={{ color: 'var(--silver)', fontSize: '14px', margin: '4px 0' }}>
                {line}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--neon"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Instagram size={18} />
              <span>FÖLJ @{instagramData.handle}</span>
            </a>
            <a
              href={`${siteConfig.instagramUrl}direct/`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <MessageCircle size={18} />
              <span>SKICKA DM</span>
            </a>
          </div>
        </div>

        {/* Latest Instagram Posts Grid */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', margin: 0 }}>
              SENASTE <span className="text-neon">INLÄGGEN</span>
            </h2>
            <p style={{ color: 'var(--silver-dim)', fontSize: '14px' }}>
              Klicka på ett inlägg för att se det direkt på Instagram.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {instagramData.posts.map((post) => (
              <a
                key={post.id}
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
                }}
                className="gallery-card"
              >
                <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.image}
                    alt={post.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(7,9,11,0.4)',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '24px',
                      color: '#fff',
                      transition: 'opacity 0.2s ease',
                    }}
                    className="insta-hover-overlay"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Heart size={20} fill="#fff" />
                      <strong>{post.likes}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ExternalLink size={20} />
                      <span>Visa</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ color: 'var(--silver)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px' }}>
                    {post.caption}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--silver-dim)', fontSize: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--neon-green)' }}>
                      <Heart size={14} fill="currentColor" /> {post.likes} gillar
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Öppna på Instagram <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
