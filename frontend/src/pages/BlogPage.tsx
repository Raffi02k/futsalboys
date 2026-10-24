import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
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
  ArrowRight
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { clubNewsList } from '../content/futsalData';
import { siteConfig } from '../content/siteContent';

export const BlogPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAudio, setHasAudio] = useState(true);

  const featuredVideoPost = clubNewsList.find((n) => n.id === 'intro-video') || clubNewsList[0];
  const otherNews = clubNewsList.filter((n) => n.id !== 'intro-video');

  useEffect(() => {
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
  }, []);

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

  return (
    <div className="blog-page" style={{ paddingTop: 'calc(var(--header-height) + 32px)', paddingBottom: '90px' }}>
      <PageMeta
        title={`Blogg & Nyheter | ${siteConfig.projectName} - Trollhättan`}
        description="Läs de senaste nyheterna, artiklarna och se premiären av den officiella introvideon för Futsal Boys Trollhättan."
        canonicalPath="/blogg"
      />

      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px, 6vw, 64px)', marginBottom: '16px' }}>
            BLOGG & <span className="text-neon">NYHETER</span>
          </h1>
          <p className="section-desc" style={{ margin: '0 auto', fontSize: '17px' }}>
            Följ resan bakom kulisserna, läs matchrapporter och ta del av exklusiva videopremiärer från Trollhättan.
          </p>
        </div>

        {/* FEATURED BLOG POST: THE OFFICIAL FIRST INTRO VIDEO */}
        <article className="blog-featured-card" aria-label="Huvudinlägg: Officiell introduktionsvideo">
          <div className="blog-featured-grid">
            {/* Left: Video Embed (Vertical 9:16 Frame) */}
            <div className="blog-featured-video-col">
              <div 
                className="squad-intro-player-frame blog-video-frame"
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

                {/* Video controls */}
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
            </div>

            {/* Right: Article Editorial Content */}
            <div className="blog-featured-content-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span className="blog-tag blog-tag--neon">VIDEOPREMIÄR</span>
                <span className="blog-tag">OFFICIELLT</span>
              </div>

              <h2 className="blog-featured-title">
                {featuredVideoPost.title}
              </h2>

              <div className="blog-meta-row">
                <div className="blog-meta-item">
                  <Calendar size={15} className="text-neon" />
                  <span>{featuredVideoPost.date}</span>
                </div>
                <div className="blog-meta-item">
                  <Clock size={15} className="text-neon" />
                  <span>{featuredVideoPost.readTime}</span>
                </div>
                <div className="blog-meta-item">
                  <User size={15} className="text-neon" />
                  <span>{featuredVideoPost.author}</span>
                </div>
              </div>

              <div className="blog-body-text">
                {featuredVideoPost.paragraphs.map((p, idx) => (
                  <p key={idx} style={{ marginBottom: '16px', lineHeight: 1.7, color: '#cbd5e1', fontSize: '16px' }}>
                    {p}
                  </p>
                ))}

                {featuredVideoPost.quote && (
                  <blockquote 
                    className="blog-quote"
                    style={{ whiteSpace: 'nowrap', overflowX: 'auto', fontSize: '14px', padding: '10px 16px' }}
                  >
                    "{featuredVideoPost.quote}"
                  </blockquote>
                )}
              </div>

              <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  className={`btn btn--sm ${hasAudio ? 'btn--neon' : 'btn--outline'}`}
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

                <Link
                  to={`/blogg/${featuredVideoPost.id}`}
                  className="btn btn--neon btn--sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>LÄS BLOGGEN</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Instagram size={15} />
                  <span>INSTAGRAM</span>
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* OTHER CLUB POSTS */}
        {otherNews.length > 0 && (
          <div style={{ marginTop: '72px' }}>
            <h3 className="section-title" style={{ fontSize: '26px', marginBottom: '24px' }}>
              FLER ARTIKLAR & <span className="text-neon">RAPPORTER</span>
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {otherNews.map((article) => (
                <Link
                  key={article.id}
                  to={`/blogg/${article.id}`}
                  className="blog-card"
                >
                  <div className="blog-card-img-wrap">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="blog-card-img"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="blog-tag blog-tag--neon">{article.category}</span>
                    <span style={{ fontSize: '13px', color: 'var(--silver-dim)', fontWeight: 500 }}>{article.date}</span>
                  </div>

                  <h4 className="blog-card-title">
                    {article.title}
                  </h4>

                  <p style={{ color: 'var(--silver-dim)', fontSize: '14px', lineHeight: 1.65, marginBottom: '22px', flex: 1 }}>
                    {article.summary}
                  </p>

                  <div className="blog-card-cta">
                    <span>ÖPPNA ARTIKELN</span>
                    <ArrowRight size={14} className="blog-card-arrow" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
