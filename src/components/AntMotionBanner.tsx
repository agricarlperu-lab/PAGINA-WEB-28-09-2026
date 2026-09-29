import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Compass, ShieldCheck, TreePine, Award, SlidersHorizontal } from 'lucide-react';
import { isVideoUrl, isYouTubeUrl, getYouTubeEmbedUrl } from './AnimatedImageCarousel';
import { EditableMedia } from './EditableMedia';
import { useMedia } from '../context/MediaContext';
import { extractGoogleDriveFileId } from '../utils/mediaStorage';

interface AntMotionBannerProps {
  heroBgUrl: string;
}

export const AntMotionBanner: React.FC<AntMotionBannerProps> = ({
  heroBgUrl,
}) => {
  const { getImage } = useMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [overlayStyle, setOverlayStyle] = useState<'normal' | 'light' | 'cinematic'>('cinematic');

  // Default pristine Amazonian canopy imagery fallback
  const fallbackBg = heroBgUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920';
  const currentMediaUrl = getImage('banner-san-martin', '/videos/ant_tech_motion.mp4') || '/videos/ant_tech_motion.mp4';

  // Detect if current media is or can be played as video (e.g. uploaded .mp4 Data URL, Google Drive link or video URL)
  const driveFileId = typeof currentMediaUrl === 'string' ? extractGoogleDriveFileId(currentMediaUrl) : null;
  const isDriveAntVideo = driveFileId === '1FkqbS05I7DS3xkxirIGyZexdLXWdqSjo' || (typeof currentMediaUrl === 'string' && currentMediaUrl.includes('1FkqbS05I7DS3xkxirIGyZexdLXWdqSjo'));
  
  // Resolve to direct MP4 stream for 100% instant autoplay without clicking any play button
  const resolvedVideoSrc = isDriveAntVideo || currentMediaUrl === '/videos/ant_tech_motion.mp4' || (typeof currentMediaUrl === 'string' && currentMediaUrl.includes('ant_tech_motion'))
    ? '/videos/ant_tech_motion.mp4'
    : (typeof currentMediaUrl === 'string' && (currentMediaUrl.startsWith('/videos/') || currentMediaUrl.startsWith('data:video') || currentMediaUrl.endsWith('.mp4') || currentMediaUrl.includes('.mp4?')))
    ? currentMediaUrl
    : driveFileId
    ? `https://drive.usercontent.google.com/download?id=${driveFileId}&export=download`
    : (typeof currentMediaUrl === 'string' ? currentMediaUrl : '/videos/ant_tech_motion.mp4');

  const isVideoContent = isVideoUrl(resolvedVideoSrc) || isVideoUrl(currentMediaUrl) || !!driveFileId || isYouTubeUrl(currentMediaUrl) || (typeof resolvedVideoSrc === 'string' && resolvedVideoSrc.startsWith('/videos/'));

  // Enforce 100% immediate autoplay & continuous loop without user click
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.defaultMuted = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.setAttribute('playsinline', '');
      vid.setAttribute('webkit-playsinline', '');
      vid.setAttribute('muted', '');
      vid.setAttribute('autoplay', '');
      vid.setAttribute('loop', '');
      
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser initially restricts until user interaction, attach one-time listener
          const onInteract = () => {
            vid.play().catch(() => {});
            window.removeEventListener('click', onInteract);
            window.removeEventListener('touchstart', onInteract);
            window.removeEventListener('scroll', onInteract);
          };
          window.addEventListener('click', onInteract, { once: true });
          window.addEventListener('touchstart', onInteract, { once: true });
          window.addEventListener('scroll', onInteract, { once: true });
        });
      }
    }
  }, [resolvedVideoSrc]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="relative rounded-3xl overflow-hidden border border-emerald-950/20 shadow-2xl bg-slate-950 group">

        {/* Background Video or High-Res Moving Image Layer */}
        <div className="w-full min-h-[420px] sm:min-h-[460px] md:h-[480px] relative bg-slate-950 flex items-center justify-center overflow-hidden">
          {isVideoContent && !isYouTubeUrl(resolvedVideoSrc) ? (
            <div className="w-full h-full relative bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                key={resolvedVideoSrc}
                src={resolvedVideoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover pointer-events-none select-none"
              />
            </div>
          ) : isYouTubeUrl(currentMediaUrl) ? (
            <div className="w-full h-full relative bg-black flex items-center justify-center">
              <iframe
                src={getYouTubeEmbedUrl(currentMediaUrl)}
                title="Video Banner San Martín"
                className="w-full h-full border-0 object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <EditableMedia
              mediaKey="banner-san-martin"
              src={fallbackBg}
              alt="Paisaje y Ecosistema de San Martín AGRICARL"
              title="Banner Panorámico San Martín - El Valor de la Tierra con Rigor Científico"
              section="Ecosistema Vivo"
              className={`w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out ${
                isPlaying ? 'animate-moving-image' : ''
              }`}
              containerClassName="w-full h-full relative group overflow-hidden flex items-center justify-center bg-slate-950"
            />
          )}
        </div>

        {/* Sophisticated Dark Cinematic Gradient Overlay */}
        <div className={`absolute inset-0 ${
          overlayStyle === 'light' 
            ? 'bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20' 
            : overlayStyle === 'cinematic'
            ? 'bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/20'
            : 'bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/30'
        } p-6 sm:p-10 md:p-12 flex flex-col justify-between pointer-events-none transition-colors duration-500`}>
          
          {/* Top Bar Badges & Controls */}
          <div className="flex items-center justify-between gap-3 pointer-events-auto flex-wrap">
            <div className="inline-flex items-center gap-2 bg-black/60 border border-emerald-500/30 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md text-emerald-300 text-[10px] sm:text-xs font-mono font-medium tracking-wider max-w-full">
              <TreePine className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">AGRICARL PERÚ · Conectando al agricultor con el mercado</span>
            </div>

            {/* Controls: Overlay Mode and Playback */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Ajuste de luminosidad del fondo */}
              <button
                type="button"
                onClick={() => {
                  setOverlayStyle(prev => prev === 'cinematic' ? 'light' : prev === 'light' ? 'normal' : 'cinematic');
                }}
                className="px-2.5 py-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full text-xs font-mono flex items-center gap-1 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                title="Ajustar brillo para ver los colores del video con más claridad"
              >
                <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold text-slate-300">
                  {overlayStyle === 'light' ? 'Luz: Alta' : overlayStyle === 'cinematic' ? 'Luz: Óptima' : 'Luz: Noche'}
                </span>
              </button>

              {!isVideoContent && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                  title={isPlaying ? 'Pausar movimiento' : 'Activar movimiento'}
                  aria-label={isPlaying ? 'Pausar movimiento' : 'Activar movimiento'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-300" />
                      <span className="hidden sm:inline text-[11px]">Movimiento Activo</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline text-[11px]">Reanudar</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Bottom Content & Pillar Highlights */}
          <div className="space-y-6 max-w-3xl pointer-events-auto">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold flex items-center gap-2">
                <span>Trazabilidad & Biodiversidad</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight drop-shadow-md">
                AGRICARL PERÚ, CONECTANDO AL AGRICULTOR CON EL MERCADO
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
                Operamos en alianza con comunidades de agricultores locales en San Martín, impulsando la recolección responsable de Sacha Inchi y Cacao con certificaciones de pureza y comercio transparente.
              </p>
            </div>

            {/* Micro-Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-white/15 text-white">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-100">100% Granos Seleccionados</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-100">Control Sanitario Estricto</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-100">Exportación Internacional</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};


