import React from 'react';
import { useMedia } from '../context/MediaContext';
import { isVideoUrl, isYouTubeUrl, getYouTubeEmbedUrl, isGoogleDriveUrl, getGoogleDriveEmbedUrl } from './AnimatedImageCarousel';
import { transformImageUrl } from '../utils/mediaStorage';
import { useImageLoader, DEFAULT_SVG_PLACEHOLDER } from '../hooks/useImageLoader';
import { Loader2 } from 'lucide-react';

interface EditableMediaProps {
  mediaKey?: string;
  src: string;
  alt?: string;
  title?: string;
  section?: string;
  className?: string;
  containerClassName?: string;
  mediaType?: 'auto' | 'image' | 'video';
  showEditButton?: boolean;
  disableClickToEdit?: boolean;
  onMediaClick?: (e: React.MouseEvent) => void;
  lazy?: boolean;
  enableCompression?: boolean;
  maxDimension?: number;
  placeholderSrc?: string;
  imgStyle?: React.CSSProperties;
}

export const EditableMedia: React.FC<EditableMediaProps> = ({
  mediaKey,
  src: defaultSrc,
  alt = '',
  title,
  section,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full relative overflow-hidden',
  mediaType = 'auto',
  disableClickToEdit = false,
  onMediaClick,
  lazy = true,
  enableCompression = true,
  maxDimension = 1920,
  placeholderSrc = DEFAULT_SVG_PLACEHOLDER,
  imgStyle,
}) => {
  const { getImage, getImageFit } = useMedia();

  const effectiveKey = mediaKey || (alt ? `custom-${alt.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);
  const rawSrc = effectiveKey && typeof getImage === 'function' ? getImage(effectiveKey, defaultSrc) : defaultSrc;
  const finalSrc = transformImageUrl(rawSrc);
  const currentFit = effectiveKey && typeof getImageFit === 'function' ? getImageFit(effectiveKey, 'cover') : 'cover';

  const isYouTube = isYouTubeUrl(finalSrc);
  const isDrive = isGoogleDriveUrl(finalSrc) || isGoogleDriveUrl(rawSrc);
  const isDriveVideo = (isDrive && (finalSrc.includes('/preview') || rawSrc.includes('/preview') || mediaType === 'video')) ||
    (finalSrc.includes('drive.google.com') && finalSrc.includes('/preview'));
  const isVid = mediaType === 'video' || (mediaType === 'auto' && (isVideoUrl(finalSrc) || isYouTube || isDriveVideo));

  const handleClick = (e: React.MouseEvent) => {
    if (onMediaClick) {
      onMediaClick(e);
    }
  };

  // Dynamic class adaptation according to selected fit mode
  let finalClassName = className;
  if (currentFit === 'contain') {
    finalClassName = className.replace('object-cover', 'object-contain');
    if (!finalClassName.includes('object-contain')) {
      finalClassName += ' object-contain';
    }
  } else if (currentFit === 'cover') {
    finalClassName = className.replace('object-contain', 'object-cover');
  }

  // Hook managing image states, fallbacks, native lazy loading, and resolution compression
  const {
    isLoading,
    isLoaded,
    imgProps,
  } = useImageLoader({
    src: finalSrc,
    fallbackSrc: defaultSrc,
    placeholderSrc,
    lazy,
    enableCompression,
    maxDimension,
  });

  const isContainMode = currentFit === 'contain';

  return (
    <div 
      className={`${containerClassName} ${isContainMode ? 'bg-slate-950/90 flex items-center justify-center' : ''} ${onMediaClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {/* Loading Skeleton / Placeholder state */}
      {isLoading && !isVid && !isYouTube && !isDriveVideo && (
        <div className="absolute inset-0 z-10 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-slate-400 gap-2 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-medium tracking-wide text-slate-300">Cargando resolución óptima...</span>
        </div>
      )}

      {isYouTube ? (
        <iframe
          src={getYouTubeEmbedUrl(finalSrc)}
          title={alt || 'Video'}
          className={`${finalClassName} border-0 pointer-events-auto`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : isDriveVideo ? (
        <iframe
          src={getGoogleDriveEmbedUrl(finalSrc)}
          title={alt || 'Video Google Drive'}
          className={`${finalClassName} border-0 pointer-events-auto`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : isVid ? (
        <video
          src={finalSrc || defaultSrc}
          autoPlay
          loop
          muted
          playsInline
          className={finalClassName}
        />
      ) : (
        <img
          {...imgProps}
          alt={alt}
          className={`${finalClassName} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : isLoading ? 'opacity-40 filter blur-[1px]' : 'opacity-100'
          }`}
          style={{ imageOrientation: 'from-image', ...imgStyle }}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};

export default EditableMedia;
