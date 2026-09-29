import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, RotateCcw } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { useLanguage } from '../context/LanguageContext';

export interface PresentationVideoSectionProps {
  id?: string;
  variant?: string;
  className?: string;
}

export const PresentationVideoSection: React.FC<PresentationVideoSectionProps> = ({ id = 'video-presentacion', variant, className = '' }) => {
  const { getImage } = useMedia();
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Autoplay is disabled by default: user decides when to play
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const videoSrc = getImage('video-presentacion', '/videos/presentacion_agricarl_1790112085941.mp4');

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStartPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);
    }).catch((err) => {
      console.warn('Playback error:', err);
    });
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setCurrentTime(current);
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    if (duration > 0) {
      const newTime = ratio * duration;
      videoRef.current.currentTime = newTime;
      setProgress(ratio * 100);
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleRestart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    });
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // When video source changes, keep it paused and ready
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setHasStarted(false);
    }
  }, [videoSrc]);

  return (
    <div id={id} className={`relative rounded-3xl overflow-hidden border border-emerald-950/40 shadow-2xl bg-[#09100d] ${className}`}>
      {/* Top Bar on Video Player */}
      <div className="bg-[#121c17] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-emerald-900/50 text-xs font-mono shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
          <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
            {isPlaying 
              ? (language === 'es' ? 'OPERACIONES EN VIVO · EN REPRODUCCIÓN' : 'LIVE OPERATIONS · PLAYING')
              : (language === 'es' ? 'VIDEO INSTITUCIONAL · LISTO PARA REPRODUCIR' : 'INSTITUTIONAL VIDEO · READY TO PLAY')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            AGRICARL PERÚ S.A.C.
          </span>
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ORIGEN SAN MARTÍN</span>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div 
        onClick={togglePlay}
        className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden cursor-pointer select-none"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/videos/presentacion_poster.jpg"
          preload="metadata"
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnded}
        />

        {/* Big Center Play Button Overlay (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-all duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
            <button
              onClick={handleStartPlay}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer ring-4 ring-emerald-400/40 mb-3"
              aria-label={language === 'es' ? 'Reproducir video institucional' : 'Play institutional video'}
            >
              <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-white" />
              <span className="absolute -inset-2 rounded-full border border-emerald-400/30 animate-ping pointer-events-none" />
            </button>

            <span className="font-display font-bold text-white text-base sm:text-lg tracking-tight uppercase drop-shadow-md">
              {language === 'es' ? 'Reproducir Video Institucional' : 'Play Presentation Video'}
            </span>
            <span className="text-emerald-300 font-mono text-[11px] sm:text-xs mt-1 uppercase tracking-wider drop-shadow-sm">
              {language === 'es' ? 'Haz clic para reproducir con audio' : 'Click to play with audio'}
            </span>
          </div>
        )}

        {/* Floating Controls Bar at Bottom */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-4 z-30 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          {/* Interactive Scrubbable Progress Bar */}
          <div 
            ref={progressBarRef}
            onClick={handleSeek}
            className="w-full bg-white/20 hover:bg-white/30 h-2 rounded-full overflow-hidden cursor-pointer relative group/bar mb-2.5 transition-all"
            title={language === 'es' ? 'Avanzar / retroceder en el video' : 'Seek video'}
          >
            <div
              className="bg-emerald-500 h-full transition-all duration-100 relative rounded-full"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-white text-xs">
            {/* Left Controls: Play/Pause, Replay, Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all hover:scale-105 shadow-md cursor-pointer"
                title={isPlaying ? (language === 'es' ? 'Pausar' : 'Pause') : (language === 'es' ? 'Reproducir' : 'Play')}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
              </button>

              <button
                onClick={handleRestart}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={language === 'es' ? 'Reiniciar video' : 'Restart video'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isMuted ? (language === 'es' ? 'Activar sonido' : 'Unmute') : (language === 'es' ? 'Silenciar' : 'Mute')}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
              </button>

              <div className="font-mono text-[11px] text-slate-300 ml-1">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-slate-500">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls: Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={language === 'es' ? 'Pantalla completa' : 'Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationVideoSection;
