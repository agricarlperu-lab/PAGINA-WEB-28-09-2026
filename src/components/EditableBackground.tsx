import React, { useRef, useEffect } from 'react';
import { useMedia, BackgroundConfig } from '../context/MediaContext';
import { isVideoUrl, isYouTubeUrl, getYouTubeEmbedUrl } from './AnimatedImageCarousel';
import { transformImageUrl } from '../utils/mediaStorage';

interface EditableBackgroundProps {
  sectionKey: string;
  title?: string;
  defaultImage?: string;
  defaultColor?: string;
  defaultOpacity?: number;
  defaultPattern?: 'grid' | 'dots' | 'gradient' | 'none' | 'mesh' | 'chocolate' | 'industrial' | 'metallic';
  className?: string;
  children: React.ReactNode;
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right';
}

export const EditableBackground: React.FC<EditableBackgroundProps> = ({
  sectionKey,
  defaultImage = '/videos/presentacion_agricarl.mp4',
  defaultColor = '#090d16',
  defaultOpacity = 0.7,
  defaultPattern = 'grid',
  className = 'relative',
  children,
}) => {
  const { getBackground } = useMedia();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Background config state
  const defaultSetting: BackgroundConfig = {
    image: defaultImage,
    color: defaultColor,
    opacity: defaultOpacity,
    pattern: defaultPattern as BackgroundConfig['pattern'],
  };

  const bg = getBackground(sectionKey, defaultSetting);
  const activeImage = bg.image || defaultImage;
  const activeOpacity = bg.opacity !== undefined ? bg.opacity : defaultOpacity;
  const activeColor = bg.color || defaultColor;
  const activePattern = bg.pattern || defaultPattern;
  const finalBgMedia = activeImage ? transformImageUrl(activeImage) : '';
  const isVideo = isVideoUrl(finalBgMedia);

  // Ensure video element plays correctly
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [finalBgMedia, isVideo]);

  const isDarkColor = Boolean(
    activeColor && 
    activeColor !== '#ffffff' && 
    activeColor !== '#fff' && 
    activeColor !== 'white' && 
    !activeColor.startsWith('rgb(255') &&
    !activeColor.startsWith('rgba(255')
  );

  return (
    <div className={`relative ${className}`}>
      {/* 1. Background Video / Image Layer */}
      {finalBgMedia && (
        isVideo ? (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {isYouTubeUrl(finalBgMedia) ? (
              <iframe
                src={getYouTubeEmbedUrl(finalBgMedia)}
                title="Background Video"
                className="w-[150%] h-[150%] -translate-x-[16.6%] -translate-y-[16.6%] object-cover pointer-events-none"
                allow="autoplay; encrypted-media; loop"
                tabIndex={-1}
              />
            ) : (
              <video
                ref={videoRef}
                src={finalBgMedia}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-opacity duration-700"
              />
            )}
            
            {/* High-legibility cinematic gradient overlay */}
            <div 
              className={`absolute inset-0 transition-all duration-300 ${
                isDarkColor 
                  ? 'bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/45 backdrop-blur-[0.5px]' 
                  : 'bg-gradient-to-r from-white/95 via-white/80 to-white/40 backdrop-blur-[0.5px]'
              }`} 
            />
          </div>
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 transition-all duration-500"
            style={{ backgroundImage: `url("${finalBgMedia}")` }}
          >
            {/* Contrast Overlay for images */}
            <div 
              className={`absolute inset-0 transition-all duration-300 ${
                isDarkColor 
                  ? 'bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50 backdrop-blur-[0.5px]' 
                  : 'bg-gradient-to-r from-white/95 via-white/80 to-white/45 backdrop-blur-[0.5px]'
              }`} 
            />
          </div>
        )
      )}

      {/* 2. Color Tint & Pattern Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
          activePattern === 'grid' 
            ? (isDarkColor ? 'bg-architectural-grid-dark' : 'bg-architectural-grid')
            : activePattern === 'chocolate' 
            ? 'bg-chocolate-tablet-pattern' 
            : activePattern === 'industrial' || activePattern === 'metallic'
            ? 'bg-industrial-metallic-pattern'
            : ''
        }`}
        style={{
          backgroundColor: activeColor,
          opacity: finalBgMedia 
            ? (isVideo ? (isDarkColor ? 0.35 : 0.2) : Math.min(activeOpacity, 0.35)) 
            : activeOpacity,
        }}
      />

      {/* 3. Section Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default EditableBackground;
