import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Instagram,
  Share2,
  Check
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { clubNewsList } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  // Video state if post has video
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAudio, setHasAudio] = useState(true);

  // Find post by ID (fallback to first if not found)
  const currentIndex = clubNewsList.findIndex((item) => item.id === id);
  const article = currentIndex >= 0 ? clubNewsList[currentIndex] : null;

  // Previous and next article for browsing
  const prevArticle = currentIndex > 0 ? clubNewsList[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < clubNewsList.length - 1 ? clubNewsList[currentIndex + 1] : null;
  const otherArticles = clubNewsList.filter((item) => item.id !== id);

  const isVideoPost = article?.id === 'intro-video';

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);

    if (isVideoPost) {
      const video = videoRef.current;
      if (!video) return;

      try {
        video.currentTime = 0;
      } catch {
        // ignore
      }

      video.style.setProperty('object-fit', 'contain', 'important');
      video.style.backgroundColor = '#000000';
      video.volume = 1.0;
      video.muted = false;
      setIsMuted(false);
      setHasAudio(true);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            setHasAudio(true);
          })
          .catch(() => {
            video.muted = true;
            video.play().then(() => setIsPlaying(true)).catch(() => {});

            const activate = () => {
              if (video) {
                video.muted = false;
                video.volume = 1.0;
                setIsMuted(false);
                setHasAudio(true);
              }
            };
            window.addEventListener('click', activate, { once: true });
            window.addEventListener('touchstart', activate, { once: true });
          });
      }

      const handleFullscreenChange = () => {
        const isFs = !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        );

        if (video) {
          video.style.setProperty('object-fit', 'contain', 'important');
          video.style.backgroundColor = '#000000';
          if (isFs) {
            video.controls = true;
            video.muted = false;
            video.volume = 1.0;
            setIsMuted(false);
            setHasAudio(true);
          } else {
            video.controls = false;
          }
        }
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      };
    }
  }, [id, isVideoPost]);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      setHasAudio(true);
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      }
    } else {
      video.muted = true;
      setIsMuted(true);
      setHasAudio(false);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const restartVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.style.setProperty('object-fit', 'contain', 'important');
    video.style.backgroundColor = '#000000';

    if (!document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      }
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      setHasAudio(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title || 'Futsal Boys Blogg',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!article) {
    return (
      <div className="blog-post-page" style={{ paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '100px', textAlign: 'center' }}>
        <div className="container">
          <h1 className="section-title">ARTIKELN HITTADES INTE</h1>
          <p className="section-desc" style={{ margin: '0 auto 32px' }}>
            Artikeln du letar efter verkar inte finnas eller har flyttats.
          </p>
          <Link to="/blogg" className="btn btn--neon">
            <ArrowLeft size={18} />
            <span>TILLBAKA TILL BLOGGEN</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page" style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '100px' }}>
      <PageMeta
        title={`${article.title} | ${siteConfig.projectName} Blogg`}
        description={article.summary}
        canonicalPath={`/blogg/${article.id}`}
      />

      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Top Navigation Bar: Back Button & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <Link to="/blogg" className="blog-back-btn">
            <ArrowLeft size={18} />
            <span>TILLBAKA TILL ALLA ARTIKLAR</span>
          </Link>

          <button 
            type="button" 
            onClick={handleShare}
            className="blog-share-btn"
            title="Dela artikel"
          >
            {copied ? <Check size={16} className="text-neon" /> : <Share2 size={16} />}
            <span>{copied ? 'LÄNK KOPIERAD!' : 'DELA'}</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="blog-single-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span className="blog-tag blog-tag--neon">{article.category}</span>
            {isVideoPost && <span className="blog-tag">VIDEO</span>}
          </div>

          <h1 className="blog-single-title">
            {article.title}
          </h1>

          <div className="blog-meta-row">
            <div className="blog-meta-item">
              <Calendar size={16} className="text-neon" />
              <span>{article.date}</span>
            </div>
            <div className="blog-meta-item">
              <Clock size={16} className="text-neon" />
              <span>{article.readTime}</span>
            </div>
            <div className="blog-meta-item">
              <User size={16} className="text-neon" />
              <span>{article.author}</span>
            </div>
          </div>
        </header>

        {/* Media Section: Video Player or Featured Image */}
        {isVideoPost ? (
          <div className="blog-single-media-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            <div 
              className="squad-intro-player-frame"
              style={{ maxWidth: '380px' }}
              onClick={toggleSound}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleSound();
                }
              }}
              title="Klicka för att slå på/av ljud"
            >
              <video
                ref={videoRef}
                className="squad-intro-video"
                style={{ objectFit: 'contain', backgroundColor: '#000000' }}
                playsInline
                loop
                autoPlay
                muted={isMuted}
                poster={siteConfig.heroPosterUrl}
              >
                <source src={siteConfig.introVideoUrl} type="video/mp4" />
              </video>

              <div className="squad-intro-video-gradient" />

              <div className="squad-intro-top-badge">
                <span className="squad-intro-live-dot" />
                <span>OFFICIELL INTRO</span>
              </div>

              {/* In-video floating controls */}
              <div className="squad-intro-video-controls" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={`squad-intro-ctrl-btn ${hasAudio ? 'squad-intro-ctrl-btn--active' : 'squad-intro-ctrl-btn--pulse'}`}
                  onClick={toggleSound}
                  aria-label={hasAudio ? 'Stäng av ljud' : 'Slå på ljud'}
                >
                  {hasAudio ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  <span className="squad-intro-btn-label">{hasAudio ? 'Ljud på' : 'Slå på ljud'}</span>
                </button>

                <button
                  type="button"
                  className="squad-intro-ctrl-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pausa' : 'Spela'}
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                </button>

                <button
                  type="button"
                  className="squad-intro-ctrl-btn"
                  onClick={restartVideo}
                  aria-label="Börja om"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  type="button"
                  className="squad-intro-ctrl-btn"
                  onClick={toggleFullscreen}
                  aria-label="Helskärm"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Quick sound toggle bar underneath */}
            <div style={{ marginTop: '14px' }}>
              <button
                type="button"
                className={`btn btn--sm ${hasAudio ? 'btn--neon' : 'btn--outline squad-intro-sound-pulse'}`}
                onClick={toggleSound}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                {hasAudio ? (
                  <>
                    <Volume2 size={15} />
                    <span>LJUD PÅ</span>
                    <span className="hero__sound-bars" aria-hidden="true">
                      <span className="bar bar-1" />
                      <span className="bar bar-2" />
                      <span className="bar bar-3" />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX size={15} />
                    <span>SLÅ PÅ LJUDET</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="blog-single-media-wrap" style={{ borderRadius: '18px', overflow: 'hidden', marginBottom: '36px', maxHeight: '480px', border: '1px solid var(--border-subtle)' }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Article Summary Lead */}
        <p className="blog-single-lead">
          {article.summary}
        </p>

        {/* Main Article Content */}
        <div className="blog-single-content">
          {article.paragraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: '22px', lineHeight: 1.8, fontSize: '17px', color: '#cbd5e1' }}>
              {p}
            </p>
          ))}

          {article.quote && (
            <blockquote className="blog-quote" style={{ margin: '36px 0', padding: '20px 24px', fontSize: '18px' }}>
              "{article.quote}"
            </blockquote>
          )}
        </div>

        {/* Club Author Card */}
        <div className="blog-author-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <img
              src="/images/futsalboys-logo.png"
              alt="Futsal Boys Emblemet"
              style={{ width: '56px', height: '56px', objectFit: 'contain' }}
            />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff', textTransform: 'uppercase', marginBottom: '4px' }}>
                FUTSAL BOYS TROLLHÄTTAN
              </h3>
              <p style={{ color: 'var(--silver)', fontSize: '14px', margin: 0 }}>
                Hjärtat och passionen på futsalparketten. Tillsammans mot toppen.
              </p>
            </div>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            <Instagram size={17} />
            <span>FÖLJ OSS PÅ INSTAGRAM</span>
          </a>
        </div>

        {/* Prev / Next Article Pagination (så man bläddrar) */}
        <nav className="blog-pagination-nav" aria-label="Bläddra mellan artiklar">
          {prevArticle ? (
            <Link to={`/blogg/${prevArticle.id}`} className="blog-nav-card blog-nav-card--prev">
              <span className="blog-nav-direction">
                <ArrowLeft size={16} />
                <span>FÖREGÅENDE ARTIKEL</span>
              </span>
              <span className="blog-nav-title">{prevArticle.title}</span>
            </Link>
          ) : (
            <div className="blog-nav-card blog-nav-card--disabled" />
          )}

          {nextArticle ? (
            <Link to={`/blogg/${nextArticle.id}`} className="blog-nav-card blog-nav-card--next">
              <span className="blog-nav-direction">
                <span>NÄSTA ARTIKEL</span>
                <ArrowRight size={16} />
              </span>
              <span className="blog-nav-title">{nextArticle.title}</span>
            </Link>
          ) : (
            <div className="blog-nav-card blog-nav-card--disabled" />
          )}
        </nav>

        {/* Other articles showcase */}
        {otherArticles.length > 0 && (
          <div style={{ marginTop: '72px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 className="section-title" style={{ fontSize: '26px', margin: 0 }}>
                FLER <span className="text-neon">ARTIKLAR</span>
              </h3>
              <Link to="/blogg" className="btn btn--outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <span>SE ALLA ARTIKLAR</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {otherArticles.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/blogg/${item.id}`}
                  className="blog-card"
                >
                  <div className="blog-card-img-wrap" style={{ height: '170px' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="blog-card-img"
                    />
                  </div>
                  <span className="blog-tag blog-tag--neon" style={{ marginBottom: '10px', display: 'inline-block' }}>
                    {item.category}
                  </span>
                  <h4 className="blog-card-title">
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--silver-dim)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>
                    {item.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
