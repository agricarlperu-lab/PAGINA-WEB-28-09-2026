import React, { createContext, useContext, useState, ReactNode } from 'react';
import persistedDefaultMedia from '../data/persistedMedia.json';

export interface BackgroundConfig {
  image?: string;
  color?: string;
  opacity?: number;
  pattern?: 'grid' | 'dots' | 'gradient' | 'none' | 'mesh' | 'chocolate' | 'industrial' | 'metallic';
}

export type MediaFit = 'cover' | 'contain';

export interface ActiveMediaItem {
  key: string;
  title: string;
  type: 'image' | 'background';
  currentSrc?: string;
  defaultSrc?: string;
  currentFit?: MediaFit;
  section?: string;
  currentBg?: BackgroundConfig;
}

export interface MediaContextType {
  // Stored state maps
  images: Record<string, string>;
  backgrounds: Record<string, BackgroundConfig>;
  imageFits: Record<string, MediaFit>;

  // Data getters & setters
  getBackground: (key: string, defaults?: BackgroundConfig) => BackgroundConfig;
  setBackground: (key: string, config: BackgroundConfig) => void;
  getImage: (key: string, fallback?: string) => string;
  setImage: (key: string, url: string) => void;
  getImageFit: (key: string, fallback?: MediaFit) => MediaFit;
  setImageFit: (key: string, fit: MediaFit) => void;

  // Resets
  resetImage: (key: string) => void;
  resetBackground: (key: string) => void;
  resetAllMedia: () => void;
  resetMedia: () => void;

  // Drawer modal controls
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  // In-place edit toggle
  isEditMode: boolean;
  toggleEditMode: () => void;

  // Specific item editor modal controls
  activeItem: ActiveMediaItem | null;
  openEditor: (item: ActiveMediaItem) => void;
  closeEditor: () => void;

  // Persistence
  savePersistedMediaImmediately: () => Promise<boolean>;
}

const STORAGE_KEY = 'agricarl_media_state_v8';

const defaultContextValue: MediaContextType = {
  images: (persistedDefaultMedia.images as any) || {},
  backgrounds: (persistedDefaultMedia.backgrounds as any) || {},
  imageFits: (persistedDefaultMedia.fits as any) || {},
  getBackground: (_k, defaults) => defaults || {
    image: '/videos/presentacion_agricarl_1790112085941.mp4',
    opacity: 0.7,
    pattern: 'grid',
    color: '#ffffff'
  },
  setBackground: () => {},
  getImage: (_k, fallback = '') => fallback,
  setImage: () => {},
  getImageFit: (_k, fallback = 'cover') => fallback,
  setImageFit: () => {},
  resetImage: () => {},
  resetBackground: () => {},
  resetAllMedia: () => {},
  resetMedia: () => {},
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  isEditMode: false,
  toggleEditMode: () => {},
  activeItem: null,
  openEditor: () => {},
  closeEditor: () => {},
  savePersistedMediaImmediately: async () => true,
};

const MediaContext = createContext<MediaContextType>(defaultContextValue);

export const MediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backgrounds, setBackgrounds] = useState<Record<string, BackgroundConfig>>(() => {
    try {
      const local = localStorage.getItem(STORAGE_KEY + '_bgs');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return { ...(persistedDefaultMedia.backgrounds as any), ...parsed };
        }
      }
    } catch {}
    return (persistedDefaultMedia.backgrounds as any) || {};
  });

  const [images, setImages] = useState<Record<string, string>>(() => {
    try {
      const local = localStorage.getItem(STORAGE_KEY + '_imgs');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return { ...(persistedDefaultMedia.images as any), ...parsed };
        }
      }
    } catch {}
    return (persistedDefaultMedia.images as any) || {};
  });

  const [imageFits, setImageFits] = useState<Record<string, MediaFit>>(() => {
    try {
      const local = localStorage.getItem(STORAGE_KEY + '_fits');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return { ...(persistedDefaultMedia.fits as any), ...parsed };
        }
      }
    } catch {}
    return (persistedDefaultMedia.fits as any) || {};
  });

  const [isDrawerOpen] = useState<boolean>(false);
  const [isEditMode] = useState<boolean>(false);
  const [activeItem] = useState<ActiveMediaItem | null>(null);

  const getBackground = (key: string, defaults?: BackgroundConfig): BackgroundConfig => {
    const found = backgrounds[key];
    if (found) {
      if (key === 'bg-refinadoras-hero' && found.image && (found.image.includes('presentacion_agricarl') || found.image.endsWith('.mp4'))) {
        return defaults || {
          image: '/images/refinadoras_hero_bg.jpg',
          opacity: 0.78,
          pattern: 'chocolate',
          color: '#090d16'
        };
      }
      return found;
    }
    return defaults || {
      image: '/videos/presentacion_agricarl_1790112085941.mp4',
      opacity: 0.7,
      pattern: 'grid',
      color: '#ffffff'
    };
  };

  const setBackground = (key: string, config: BackgroundConfig) => {
    setBackgrounds(prev => {
      const updated = { ...prev, [key]: { ...prev[key], ...config } };
      try {
        localStorage.setItem(STORAGE_KEY + '_bgs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const getImage = (key: string, fallback = ''): string => {
    return images[key] || fallback;
  };

  const setImage = (key: string, url: string) => {
    setImages(prev => {
      const updated = { ...prev, [key]: url };
      try {
        localStorage.setItem(STORAGE_KEY + '_imgs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const getImageFit = (key: string, fallback: MediaFit = 'cover'): MediaFit => {
    return imageFits[key] || fallback;
  };

  const setImageFit = (key: string, fit: MediaFit) => {
    setImageFits(prev => {
      const updated = { ...prev, [key]: fit };
      try {
        localStorage.setItem(STORAGE_KEY + '_fits', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetImage = (key: string) => {
    setImages(prev => {
      const updated = { ...prev };
      if ((persistedDefaultMedia.images as any)?.[key]) {
        updated[key] = (persistedDefaultMedia.images as any)[key];
      } else {
        delete updated[key];
      }
      try {
        localStorage.setItem(STORAGE_KEY + '_imgs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetBackground = (key: string) => {
    setBackgrounds(prev => {
      const updated = { ...prev };
      if ((persistedDefaultMedia.backgrounds as any)?.[key]) {
        updated[key] = (persistedDefaultMedia.backgrounds as any)[key];
      } else {
        delete updated[key];
      }
      try {
        localStorage.setItem(STORAGE_KEY + '_bgs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetAllMedia = () => {
    try {
      localStorage.removeItem(STORAGE_KEY + '_bgs');
      localStorage.removeItem(STORAGE_KEY + '_imgs');
      localStorage.removeItem(STORAGE_KEY + '_fits');
    } catch {}
    setBackgrounds((persistedDefaultMedia.backgrounds as any) || {});
    setImages((persistedDefaultMedia.images as any) || {});
    setImageFits((persistedDefaultMedia.fits as any) || {});
  };

  const resetMedia = () => {
    resetAllMedia();
  };

  const openDrawer = () => {};
  const closeDrawer = () => {};
  const toggleEditMode = () => {};
  const openEditor = (_item: ActiveMediaItem) => {};
  const closeEditor = () => {};

  const savePersistedMediaImmediately = async (): Promise<boolean> => {
    try {
      localStorage.setItem(STORAGE_KEY + '_bgs', JSON.stringify(backgrounds));
      localStorage.setItem(STORAGE_KEY + '_imgs', JSON.stringify(images));
      localStorage.setItem(STORAGE_KEY + '_fits', JSON.stringify(imageFits));
      try {
        await fetch('/api/media/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images, backgrounds, fits: imageFits }),
        });
      } catch {}
      return true;
    } catch {
      return false;
    }
  };

  return (
    <MediaContext.Provider
      value={{
        images,
        backgrounds,
        imageFits,
        getBackground,
        setBackground,
        getImage,
        setImage,
        getImageFit,
        setImageFit,
        resetImage,
        resetBackground,
        resetAllMedia,
        resetMedia,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        isEditMode,
        toggleEditMode,
        activeItem,
        openEditor,
        closeEditor,
        savePersistedMediaImmediately,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = (): MediaContextType => {
  const ctx = useContext(MediaContext);
  return ctx;
};
