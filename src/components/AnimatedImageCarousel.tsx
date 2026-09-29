import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { transformImageUrl } from '../utils/mediaStorage';
import sachaInchiImg from '../assets/images/regenerated_image_1790090958892.jpg';
import cacaoImg from '../assets/images/regenerated_image_1790090959737.jpg';
import aguajeImg from '../assets/images/regenerated_image_1790090960535.jpg';
import cocoHeroImg from '../assets/images/regenerated_image_1790110508770.jpg';

export function isVideoUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const lower = url.toLowerCase().trim();
  return (
    lower.startsWith('data:video/') ||
    lower.startsWith('blob:') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.m4v') ||
    lower.endsWith('.ogv') ||
    lower.includes('.mp4?') ||
    lower.includes('.webm?') ||
    lower.includes('/video/') ||
    lower.includes('youtube.com') ||
    lower.includes('youtu.be') ||
    lower.includes('vimeo.com') ||
    (lower.includes('drive.google.com') && (lower.includes('/preview') || lower.includes('preview')))
  );
}

export function isYouTubeUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/i.test(url);
}

export function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=1` : url;
}

export function isGoogleDriveUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return /drive\.google\.com/i.test(url);
}

export function getGoogleDriveEmbedUrl(url: string): string {
  if (!url) return '';
  const matchFile = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (matchFile && matchFile[1]) {
    return `https://drive.google.com/file/d/${matchFile[1]}/preview`;
  }
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (matchId && matchId[1]) {
    return `https://drive.google.com/file/d/${matchId[1]}/preview`;
  }
  // If already a preview link or other
  if (url.includes('/preview')) return url;
  return url;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description?: string;
  badgeColor?: string;
}

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'sacha-1',
    title: 'Sacha Inchi - El Maní del Inca',
    subtitle: 'Superalimento Amazónico rico en Omega 3, 6 y 9',
    category: 'Suministro Agrícola',
    image: sachaInchiImg,
    description: 'Semillas seleccionadas y almendras secas cultivadas bajo normas orgánicas en la región de San Martín.',
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 'cacao-1',
    title: 'Cacao Amazónico de Alta Pureza',
    subtitle: 'Granos fermentados de perfil fino y aroma superior',
    category: 'Suministro Agrícola',
    image: cacaoImg,
    description: 'Proceso de secado controlado al sol garantizando estándares gastronómicos e industriales de exportación.',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'agricobros-1',
    title: 'Plataforma Transaccional AgriCobros',
    subtitle: 'Cobranza y recaudación digital sin fricciones',
    category: 'Gestión Financiera',
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=1200',
    description: 'Servicio de recaudación financiera AgriCobros: acepta pagos con tarjetas y banca móvil directamente sin POS y con liquidación inmediata.',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'gestor-1',
    title: 'Gestor Contable Emprendedor 5.4',
    subtitle: 'Automatización del Libro Diario Formato 5.2',
    category: 'Gestión Financiera',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
    description: 'Sincronización de transacciones con la normativa contable vigente para PYMEs y empresas.',
    badgeColor: 'bg-cyan-600'
  },
  {
    id: 'sacha-2',
    title: 'Aceite Extra Virgen de Sacha Inchi',
    subtitle: 'Extracción en frío de máxima calidad nutricional',
    category: 'Superalimentos',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1200',
    description: 'Nutracéutico natural galardonado mundialmente por su alta densidad de ácidos grasos esenciales.',
    badgeColor: 'bg-emerald-700'
  },
  {
    id: 'cacao-2',
    title: 'Nibs y Cobertura de Cacao Fino',
    subtitle: 'Materia prima de sabor intenso y tostado artesanal',
    category: 'Agro-Industria',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200',
    description: 'Insumo estrella para chocolatería fina, repostería y alimentos funcionales.',
    badgeColor: 'bg-amber-700'
  },
  {
    id: 'aguaje-1',
    title: 'Aguaje Fresco y Deshidratado al Sol',
    subtitle: 'Rico en provitamina A y fitoestrógenos naturales',
    category: 'Superalimentos',
    image: aguajeImg,
    description: 'Disponible en fruto fresco seleccionado y pulpa deshidratada seca al sol natural.',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'coco-1',
    title: 'Coco & Subproductos de San Martín',
    subtitle: 'Coco Rallado Deshidratado y Aceite Virgen Prensado en Frío',
    category: 'Agro-Industria',
    image: cocoHeroImg,
    description: 'Insumos puros sin aditivos químicos para la industria gastronómica, panadera y cosmética.',
    badgeColor: 'bg-emerald-800'
  }
];

// 1. COMPONENTE: Carrusel con Animación Automática y Transiciones Graduales
export const AnimatedHeroCarousel: React.FC<{ 
  images?: GalleryItem[];
  onItemClick?: (item: GalleryItem) => void;
}> = ({ images = GALLERY_IMAGES, onItemClick }) => {
  const { getImage } = useMedia();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeImages = images.length > 0 ? images : GALLERY_IMAGES;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, activeImages.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  // Touch swipe support for mobile and tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const swipeThreshold = 45; // px

    if (diffX > swipeThreshold) {
      // Swiped left -> Next
      handleNext();
    } else if (diffX < -swipeThreshold) {
      // Swiped right -> Previous
      handlePrev();
    }
    setTouchStartX(null);
  };

  const currentItem = activeImages[currentIndex] || activeImages[0];
  const rawImageSrc = getImage(`carousel-${currentItem.id}`, currentItem.image);
  const currentImageSrc = transformImageUrl(rawImageSrc);

  const displayTitle = (currentItem.title || '').replace(/cobragood/gi, 'AgriCobros');
  const displaySubtitle = (currentItem.subtitle || '').replace(/cobragood/gi, 'AgriCobros');
  const displayDescription = (currentItem.description || '').replace(/cobragood/gi, 'AgriCobros');

  return (
    <div 
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 min-h-[340px] sm:min-h-[400px] md:min-h-[440px] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] select-none touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Animated Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full cursor-pointer"
          onClick={() => onItemClick && onItemClick(currentItem)}
        >
          {isVideoUrl(currentImageSrc) ? (
            <video
              src={currentImageSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <img
              src={currentImageSrc}
              alt={currentItem.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          )}
          {/* Gradient dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Animated Badge & Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 md:p-10 z-20 flex flex-col justify-end pointer-events-none pb-7 sm:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id + '-info'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl space-y-2 sm:space-y-3"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold shadow-md ${currentItem.badgeColor || 'bg-brand-green'}`}>
                {currentItem.category}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-300 bg-black/50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                <span>{currentIndex + 1}/{activeImages.length}</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight drop-shadow-md leading-tight">
              {displayTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed drop-shadow-sm max-w-2xl">
              {displaySubtitle} — {displayDescription}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls (Larger touch targets for mobile/tablet) */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 flex items-center gap-1 sm:gap-2 bg-slate-900/85 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-white/20 print:hidden shadow-lg">
        <button
          onClick={handlePrev}
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-full hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Anterior"
          aria-label="Anterior diapositiva"
        >
          <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-full hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          title={isPlaying ? "Pausar animación" : "Iniciar animación"}
          aria-label={isPlaying ? "Pausar animación" : "Iniciar animación"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-full hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Siguiente"
          aria-label="Siguiente diapositiva"
        >
          <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Bottom Progress Bar Indicators (Accessible on touch) */}
      <div className="absolute bottom-2.5 sm:bottom-3 right-4 sm:right-6 z-30 flex items-center gap-1.5 print:hidden">
        {activeImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir a diapositiva ${idx + 1}`}
            className={`h-2 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer p-1 -m-1 ${
              idx === currentIndex ? 'w-6 sm:w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// 2. COMPONENTE: Marquesina Horizontal Infinita de Imágenes en Movimiento
export const ContinuousMovingImageMarquee: React.FC<{ 
  images?: GalleryItem[];
  onItemClick?: (id: string) => void;
}> = ({ images = GALLERY_IMAGES, onItemClick }) => {
  const { getImage } = useMedia();
  const activeImages = images.length > 0 ? images : GALLERY_IMAGES;
  // Duplicate array to achieve seamless infinite loop
  const duplicatedList = [...activeImages, ...activeImages];

  return (
    <div className="w-full overflow-hidden relative py-4 bg-slate-900/5 backdrop-blur-sm border-y border-slate-200/60">
      {/* Gradient edge masks for smooth fade effect */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex gap-6 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear'
          }}
        >
          {duplicatedList.map((item, index) => {
            const itemSrc = getImage(`carousel-${item.id}`, item.image);
            const title = (item.title || '').replace(/cobragood/gi, 'AgriCobros');
            const subtitle = (item.subtitle || '').replace(/cobragood/gi, 'AgriCobros');
            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => onItemClick && onItemClick(item.id)}
                className="w-64 sm:w-80 shrink-0 group relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-white aspect-[16/10] cursor-pointer hover:shadow-2xl hover:border-brand-pink-accent transition-all duration-300"
              >
                <img
                  src={itemSrc}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight line-clamp-1">
                    {title}
                  </h4>
                  <p className="text-[10px] text-slate-300 font-light line-clamp-2 mt-0.5">
                    {subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export const AnimatedImageCarousel = ContinuousMovingImageMarquee;
export default AnimatedHeroCarousel;
