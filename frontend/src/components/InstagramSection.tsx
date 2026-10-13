import React from 'react';
import { Instagram, Heart, MessageCircle, Plus } from 'lucide-react';
import { instagramData } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

export const InstagramSection: React.FC = () => {
  return (
    <section className="section instagram-section" id="instagram">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
          <div className="section-tag">
            <Instagram size={14} />
            <span>Officiell Instagram</span>
          </div>
          <h2 className="section-title">
            FUTSAL BOYS PÅ <span className="text-neon">INSTAGRAM</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Följ vardagen bakom kulisserna, matchklipp, cuper och exklusivt content direkt från Trollhättan.
          </p>
        </div>

        {/* Instagram Profile Card (Replicating IMG_1064.PNG) */}
        <div className="insta-profile-card">
          <div className="insta-header-top">
            {/* Avatar & Username */}
            <div className="insta-avatar-block">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="insta-avatar-wrap"
                title="Följ @grabbarna.futsal på Instagram"
              >
                <img
                  src={instagramData.avatar}
                  alt={instagramData.displayName}
                  className="insta-avatar-img"
                />
                <span className="insta-add-btn" aria-hidden="true">
                  <Plus size={16} strokeWidth={3} />
                </span>
              </a>

              <div className="insta-title-wrap">
                <h3>{instagramData.displayName}</h3>
                <div className="insta-handle">@{instagramData.handle}</div>
              </div>
            </div>

            {/* Follower Stats */}
            <div className="insta-stats-row">
              <div className="insta-stat">
                <strong>{instagramData.postsCount}</strong>
                <span>inlägg</span>
              </div>
              <div className="insta-stat">
                <strong className="text-neon">{instagramData.followersCount}</strong>
                <span>följare</span>
              </div>
              <div className="insta-stat">
                <strong>{instagramData.followingCount}</strong>
                <span>följer</span>
              </div>
            </div>
          </div>

          {/* Instagram Bio Text */}
          <div className="insta-bio-block">
            {instagramData.bioLines.map((line, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {line}
              </p>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="insta-actions-row">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--neon btn--sm"
            >
              <Instagram size={16} />
              <span>FÖLJ @{instagramData.handle}</span>
            </a>
            <a
              href={`${siteConfig.instagramUrl}direct/`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm"
            >
              <MessageCircle size={16} />
              <span>SKICKA DM</span>
            </a>
          </div>
        </div>

        {/* Instagram Posts Grid */}
        <div className="insta-grid">
          {instagramData.posts.map((post) => (
            <a
              key={post.id}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-post-card"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="insta-post-img"
                loading="lazy"
              />
              <div className="insta-post-overlay">
                <div className="insta-post-likes">
                  <Heart size={20} fill="var(--neon-green)" />
                  <span>{post.likes} gilla-markeringar</span>
                </div>
                <p className="insta-post-caption">{post.caption}</p>
                <span
                  style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    color: 'var(--neon-green)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Visa på Instagram →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
