import React from 'react';

interface PageHeroProps {
  kicker?: string;
  title: string;
  description?: string;
  bgVideo?: string;
  bgImage?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  kicker,
  title,
  description,
  bgVideo,
  bgImage,
  children,
}) => {
  if (bgVideo || bgImage) {
    return (
      <section className="hero-video" style={{ minHeight: '55vh', paddingBottom: '60px' }}>
        <div className="hero-video__bg" aria-hidden="true">
          {bgVideo ? (
            <video autoPlay muted loop playsInline src={bgVideo} />
          ) : (
            <img src={bgImage} alt="" />
          )}
        </div>
        <div className="hero-video__overlay" aria-hidden="true" />
        <div className="hero-video__content">
          {kicker && <span className="kicker">{kicker}</span>}
          <h1 className="hero-video__title" style={{ fontSize: 'clamp(32px, 5.2vw, 56px)' }}>
            {title}
          </h1>
          {description && <p className="hero-video__subtitle">{description}</p>}
          {children && <div className="hero-video__ctas">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="container">
        {kicker && <span className="page-hero__kicker">{kicker}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {description && <p className="page-hero__desc">{description}</p>}
        {children && <div style={{ marginTop: '24px' }}>{children}</div>}
      </div>
    </section>
  );
};
