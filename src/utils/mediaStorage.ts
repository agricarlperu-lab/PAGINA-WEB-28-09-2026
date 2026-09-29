/**
 * Utilities for handling and transforming image and video media URLs,
 * optimizing client uploads, and managing persistent state backups.
 */

export interface OptimizationResult {
  dataUrl: string;
  originalSize: number;
  optimizedSize: number;
  width: number;
  height: number;
  savingsPercent?: number;
  reductionPercentage?: number;
  format?: string;
}

export function extractGoogleDriveFileId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (match1 && match1[1]) return match1[1];
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (match2 && match2[1]) return match2[1];
  return null;
}

export function getGoogleDriveImageUrl(driveId: string): string {
  return `https://lh3.googleusercontent.com/d/${driveId}`;
}

export function getGoogleDriveVideoEmbedUrl(driveId: string): string {
  return `https://drive.google.com/file/d/${driveId}/preview`;
}

export function transformImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If already relative, data uri, or blob
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Handle Google Drive links
  const driveId = extractGoogleDriveFileId(trimmed);
  if (driveId) {
    return getGoogleDriveImageUrl(driveId);
  }

  // Map any legacy /src/assets/images/ to asset references if needed
  if (trimmed.startsWith('/src/assets/images/')) {
    const filename = trimmed.replace('/src/assets/images/', '');
    if (filename.includes('refinadoras') || filename.includes('1790207468674') || filename.includes('1790266039019')) {
      return '/images/refinadoras_hero_bg.jpg';
    }
  }

  return trimmed;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatMediaDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

export function readFileAsDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function optimizeImageFile(
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.85
): Promise<OptimizationResult> {
  const originalSize = file.size;
  const rawDataUrl = await readFileAsDataUrl(file);
  const fileNameLower = (file.name || '').toLowerCase();
  const isSvg = file.type === 'image/svg+xml' || fileNameLower.endsWith('.svg');
  const isPng = file.type === 'image/png' || fileNameLower.endsWith('.png');
  const isWebp = file.type === 'image/webp' || fileNameLower.endsWith('.webp');
  const isTransparentFormat = isPng || isSvg || isWebp;

  return new Promise((resolve) => {
    // If SVG, preserve 100% vector scalability and transparency
    if (isSvg) {
      resolve({
        dataUrl: rawDataUrl,
        originalSize,
        optimizedSize: originalSize,
        width: 512,
        height: 512,
        savingsPercent: 0,
        reductionPercentage: 0,
        format: 'SVG Transparente Vectorial',
      });
      return;
    }

    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        if (width / maxWidth > height / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          maxHeight = height;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Ensure transparent canvas background (do NOT fill with white/black)
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // For PNG or transparent formats, export as PNG to keep alpha transparency intact!
        const mimeType = isTransparentFormat ? 'image/png' : 'image/jpeg';
        const dataUrl = isTransparentFormat ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', quality);
        const approxSize = Math.round((dataUrl.length * 3) / 4);
        const savingsPercent =
          originalSize > 0 ? Math.max(0, Math.round(((originalSize - approxSize) / originalSize) * 100)) : 0;
        resolve({
          dataUrl,
          originalSize,
          optimizedSize: approxSize,
          width,
          height,
          savingsPercent,
          reductionPercentage: savingsPercent,
          format: isPng ? 'PNG Transparente' : isWebp ? 'WebP Optimizado' : 'JPEG Optimizado',
        });
      } else {
        resolve({
          dataUrl: rawDataUrl,
          originalSize,
          optimizedSize: originalSize,
          width: img.width,
          height: img.height,
          savingsPercent: 0,
          reductionPercentage: 0,
          format: isTransparentFormat ? 'PNG Transparente' : 'IMAGE',
        });
      }
    };
    img.onerror = () => {
      resolve({
        dataUrl: rawDataUrl,
        originalSize,
        optimizedSize: originalSize,
        width: 0,
        height: 0,
        savingsPercent: 0,
        reductionPercentage: 0,
        format: isTransparentFormat ? 'PNG Transparente' : 'IMAGE',
      });
    };
    img.src = rawDataUrl;
  });
}

export function sanitizeImagesMap(images: Record<string, string>): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const [key, val] of Object.entries(images || {})) {
    if (val && typeof val === 'string' && val.trim().length > 0) {
      clean[key] = val.trim();
    }
  }
  return clean;
}

export function sanitizeBackgroundsMap(backgrounds: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(backgrounds || {})) {
    if (val && typeof val === 'object') {
      clean[key] = { ...val };
    }
  }
  return clean;
}

export function sanitizeFitsMap(fits: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(fits || {})) {
    if (val === 'cover' || val === 'contain') {
      clean[key] = val;
    }
  }
  return clean;
}
