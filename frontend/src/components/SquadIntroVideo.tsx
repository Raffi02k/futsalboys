import React, { useRef, useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2,
  Users,
  Trophy,
  Flame
} from 'lucide-react';
import { siteConfig } from '../content/siteContent';

export const SquadIntroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Default sound ON automatically
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAudio, setHasAudio] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video cleanly to start from beginning
    try {
      video.currentTime = 0;
    } catch {
      // ignore
    }

    video.style.setProperty('object-fit', 'contain', 'important');
    video.style.backgroundColor = '#000000';
    video.volume = 1.0;
    video.muted = false; // DEFAULT SOUND ON AUTOMATICALLY!
    setIsMuted(false);
    setHasAudio(true);

    let removeAudioListener: (() => void) | null = null;

    // Play automatically with audio
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setHasAudio(true);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay before any gesture,
          // ensure video plays and immediately turns sound on at first user touch/click
          video.muted = true;
          video.play().then(() => setIsPlaying(true)).catch(() => {});

          const activateAudio = () => {
            if (video) {
              video.muted = false;
              video.volume = 1.0;
              setIsMuted(false);
              setHasAudio(true);
            }
          };

          window.addEventListener('click', activateAudio, { once: true });
          window.addEventListener('touchstart', activateAudio, { once: true });
          removeAudioListener = () => {
            window.removeEventListener('click', activateAudio);
            window.removeEventListener('touchstart', activateAudio);
          };
        });
    }

    // Fullscreen listener
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
      if (removeAudioListener) {
        removeAudioListener();
      }
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

    const isFs = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (!isFs) {
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
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  return (
    <section className="squad-intro-section" aria-label="Officiell introduktionsvideo för Futsal Boys">
      <div className="squad-intro-card">
        {/* Left Column: Information & Controls */}
        <div className="squad-intro-info">
          <h2 className="squad-intro-title">
            MÖT <span className="text-neon">FUTSAL BOYS</span>
          </h2>

          <p className="squad-intro-desc">
            Välkommen till truppen för Futsal Boys i Trollhättan. Se hela vår introduktionsvideo
            i full längd med ljudet på från början. Upplev sammanhållningen, glädjen och spelarna bakom klubben.
          </p>

          <div className="squad-intro-badges">
            <div className="squad-intro-badge">
              <Users size={16} className="text-neon" />
              <span><strong>3 LEDARE</strong> • Raffi, Elvis & Marcelo</span>
            </div>
            <div className="squad-intro-badge">
              <Trophy size={16} className="text-neon" />
              <span><strong>14+ SPELARE</strong> • Elit & talanger</span>
            </div>
            <div className="squad-intro-badge">
              <Flame size={16} className="text-neon" />
              <span><strong>100% PASSION</strong> • Arena Älvhögsborg</span>
            </div>
          </div>

          {/* Sound CTA Button */}
          <div className="squad-intro-actions">
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

        {/* Right Column: Full-Length Vertical (9:16) Video Container */}
        <div className="squad-intro-video-wrapper">
          <div 
            className="squad-intro-player-frame"
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
            aria-label="Introvideon i full längd. Klicka för att slå på eller stänga av ljud."
          >
            {/* The 9:16 Vertical Video with object-fit: contain */}
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

            {/* Subtle overlay gradient at the bottom for video controls */}
            <div className="squad-intro-video-gradient" />

            {/* Floating Top Badge */}
            <div className="squad-intro-top-badge">
              <span className="squad-intro-live-dot" />
              <span>FUTSAL BOYS INTRO</span>
            </div>

            {/* On-Video Floating Controls */}
            <div className="squad-intro-video-controls" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={`squad-intro-ctrl-btn ${hasAudio ? 'squad-intro-ctrl-btn--active' : 'squad-intro-ctrl-btn--pulse'}`}
                onClick={toggleSound}
                aria-label={hasAudio ? 'Stäng av ljud' : 'Slå på ljud'}
                title={hasAudio ? 'Ljud på (Klicka för att tysta)' : 'Slå på ljud'}
              >
                {hasAudio ? <Volume2 size={18} /> : <VolumeX size={18} />}
                <span className="squad-intro-btn-label">{hasAudio ? 'Ljud på' : 'Slå på ljud'}</span>
              </button>

              <button
                type="button"
                className="squad-intro-ctrl-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausa videon' : 'Spela videon'}
                title={isPlaying ? 'Pausa' : 'Spela'}
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              </button>

              <button
                type="button"
                className="squad-intro-ctrl-btn"
                onClick={restartVideo}
                aria-label="Börja om introt"
                title="Börja om"
              >
                <RotateCcw size={16} />
              </button>

              <button
                type="button"
                className="squad-intro-ctrl-btn"
                onClick={toggleFullscreen}
                aria-label="Visa i helskärm utan beskärning"
                title="Helskärm"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
