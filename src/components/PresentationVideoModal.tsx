import React, { useState, useRef } from 'react';
import { 
  Film, 
  X, 
  Link as LinkIcon, 
  Check, 
  Play, 
  CheckCircle2, 
  AlertCircle,
  UploadCloud,
  Loader2,
  FileVideo
} from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { useLanguage } from '../context/LanguageContext';
import { isYouTubeUrl } from './AnimatedImageCarousel';

export interface VideoPreset {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  thumbnail: string;
  type: 'youtube' | 'direct';
}

export const PRESENTATION_VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'video-oficial-agricarl',
    title: 'AGRICARL PERÚ - Presentación Institucional Oficial',
    subtitle: 'Conectando al agricultor con el mercado · Moyobamba, San Martín',
    url: '/videos/presentacion_agricarl.mp4?v=1790112085',
    thumbnail: '/videos/presentacion_poster.jpg',
    type: 'direct'
  },
  {
    id: 'cacao-san-martin',
    title: 'Cacao Fino de Aroma & Agricultura en San Martín',
    subtitle: 'El Milagro de San Martín: Cacao de exportación y desarrollo sostenible',
    url: 'https://www.youtube.com/watch?v=0kF63N4_X0Y',
    thumbnail: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800',
    type: 'youtube'
  },
  {
    id: 'amazonia-cadena',
    title: 'Cosecha Amazónica & Superalimentos Nativos',
    subtitle: 'Sacha Inchi, Aguaje y Frutos de la Biodiversidad Peruana',
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=800',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=800',
    type: 'youtube'
  },
  {
    id: 'peru-agro-clip',
    title: 'Cultivos Sostenibles en la Selva Alta',
    subtitle: 'Comunidades agrarias y articulación de mercados de valor agregado',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-in-a-coffee-machine-42861-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    type: 'direct'
  },
  {
    id: 'biodiversidad-peru',
    title: 'Biodiversidad y Riqueza de la Selva Peruana',
    subtitle: 'Preservación de bosques amazónicos y agronegocios responsables',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800',
    type: 'direct'
  }
];

export const DEFAULT_PRESENTATION_VIDEO = '/videos/presentacion_agricarl.mp4?v=1790112085';

interface PresentationVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoSelected?: (url: string) => void;
  defaultTab?: 'upload' | 'youtube' | 'presets';
}

export const PresentationVideoModal: React.FC<PresentationVideoModalProps> = ({
  isOpen,
  onClose,
  onVideoSelected,
  defaultTab = 'upload'
}) => {
  const { language } = useLanguage();
  const { getImage, setImage, savePersistedMediaImmediately } = useMedia();

  const rawVideoUrl = getImage('video-presentacion', DEFAULT_PRESENTATION_VIDEO);
  const activeVideoUrl = rawVideoUrl && !rawVideoUrl.includes('drive.google.com')
    ? rawVideoUrl
    : DEFAULT_PRESENTATION_VIDEO;
  const isYouTube = isYouTubeUrl(activeVideoUrl);

  const [activeTab, setActiveTab] = useState<'upload' | 'youtube' | 'presets'>(defaultTab);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [inputFeedback, setInputFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogv)$/i.test(file.name);
    if (!isVideo) {
      setInputFeedback({
        type: 'error',
        message: language === 'es' 
          ? 'Por favor selecciona un archivo de video válido (.mp4, .webm, .mov).'
          : 'Please select a valid video file (.mp4, .webm, .mov).'
      });
      return;
    }

    setIsUploading(true);
    setInputFeedback({
      type: 'info',
      message: language === 'es' 
        ? `Subiendo video institucional (${(file.size / (1024 * 1024)).toFixed(1)} MB)...` 
        : `Uploading institutional video (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`
    });

    try {
      const cleanFileName = `presentacion_agricarl_${Date.now()}.mp4`;
      const res = await fetch(`/api/media/upload-video-raw?filename=${encodeURIComponent(cleanFileName)}`, {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'video/mp4' },
        body: file
      });

      if (res.ok) {
        const data = await res.json();
        const uploadedUrl = data.videoUrl || `/videos/${cleanFileName}`;
        
        setImage('video-presentacion', uploadedUrl);
        await savePersistedMediaImmediately();
        if (onVideoSelected) onVideoSelected(uploadedUrl);

        setInputFeedback({
          type: 'success',
          message: language === 'es'
            ? '¡Video institucional subido y publicado exitosamente en la portada!'
            : 'Institutional video uploaded and published successfully!'
        });

        setTimeout(() => {
          setIsUploading(false);
          onClose();
          setInputFeedback(null);
        }, 1200);
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Error al guardar el archivo en el servidor');
      }
    } catch (err: any) {
      console.error('Error al subir video:', err);
      setIsUploading(false);
      setInputFeedback({
        type: 'error',
        message: language === 'es'
          ? `Error al subir: ${err.message || 'Intente nuevamente con un archivo más ligero.'}`
          : `Upload error: ${err.message || 'Please try again with a lighter file.'}`
      });
    }
  };

  const handleApplyCustomUrl = (urlToApply: string) => {
    const trimmed = urlToApply.trim();
    if (!trimmed) {
      setInputFeedback({
        type: 'error',
        message: language === 'es' 
          ? 'Por favor, introduce un enlace válido.' 
          : 'Please enter a valid link.'
      });
      return;
    }

    if (trimmed.includes('drive.google.com')) {
      setInputFeedback({
        type: 'error',
        message: language === 'es'
          ? 'Los videos de Google Drive han sido deshabilitados. Usa un enlace de YouTube o video directo (MP4).'
          : 'Google Drive videos are disabled. Please use a YouTube or direct MP4 link.'
      });
      return;
    }

    setImage('video-presentacion', trimmed);
    savePersistedMediaImmediately();
    if (onVideoSelected) onVideoSelected(trimmed);

    setInputFeedback({
      type: 'success',
      message: language === 'es' ? '¡Video actualizado y guardado en código!' : 'Video updated & saved to code!'
    });

    setTimeout(() => {
      onClose();
      setInputFeedback(null);
      setCustomUrlInput('');
    }, 1000);
  };

  const handleSelectPreset = (preset: VideoPreset) => {
    setImage('video-presentacion', preset.url);
    savePersistedMediaImmediately();
    if (onVideoSelected) onVideoSelected(preset.url);

    setInputFeedback({
      type: 'success',
      message: language === 'es' 
        ? `¡Video "${preset.title}" seleccionado y guardado!` 
        : `Video "${preset.title}" selected and saved!`
    });

    setTimeout(() => {
      onClose();
      setInputFeedback(null);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#121c17] to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-base uppercase tracking-tight text-white">
                {language === 'es' ? 'Video de Presentación Institucional' : 'Corporate Presentation Video'}
              </h3>
              <p className="text-[11px] text-emerald-300/80 font-mono">
                AGRICARL PERÚ · Portada Oficial
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-emerald-600" />
            <span>{language === 'es' ? 'Subir Mi Video (.mp4)' : 'Upload My Video (.mp4)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('youtube')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'youtube'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-4 h-4 text-emerald-600" />
            <span>YouTube / Enlace Web</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'presets'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Film className="w-4 h-4 text-slate-600" />
            <span>{language === 'es' ? 'Videos Sugeridos' : 'Suggested Videos'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* TAB 1: SUBIR ARCHIVO MP4 DIRECTO */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input 
                ref={fileInputRef}
                type="file" 
                accept="video/mp4,video/webm,video/quicktime,video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                  isUploading 
                    ? 'border-emerald-400 bg-emerald-50/50 cursor-wait' 
                    : 'border-slate-300 hover:border-emerald-600 bg-slate-50/80 hover:bg-emerald-50/30'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-emerald-950">Subiendo tu video institucional...</p>
                      <p className="text-xs text-emerald-700 mt-1">Guardando permanentemente en el servidor de AGRICARL.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shadow-xs">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm sm:text-base">
                        {language === 'es' ? 'Haz clic aquí para seleccionar tu video' : 'Click here to choose your video'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Formatos soportados: MP4, WebM, MOV de tu empresa
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors pointer-events-none"
                    >
                      {language === 'es' ? 'Explorar en mi Computadora' : 'Browse Computer'}
                    </button>
                  </>
                )}
              </div>

              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-emerald-950 flex items-start gap-2.5">
                <FileVideo className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {language === 'es' 
                    ? 'Al subir tu video institucional, se actualizará instantáneamente el reproductor central en la página de inicio para todos los visitantes.' 
                    : 'When you upload your institutional video, it will instantly update the homepage hero player for all visitors.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: YOUTUBE / MP4 */}
          {activeTab === 'youtube' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'es' ? 'Enlace de YouTube o video directo (MP4/WebM):' : 'YouTube link or direct video (MP4/WebM):'}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=... o https://...video.mp4"
                      value={customUrlInput}
                      onChange={(e) => {
                        setCustomUrlInput(e.target.value);
                        if (inputFeedback) setInputFeedback(null);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                    <LinkIcon className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                  </div>
                  <button
                    onClick={() => handleApplyCustomUrl(customUrlInput)}
                    disabled={!customUrlInput.trim()}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{language === 'es' ? 'Guardar Video' : 'Save Video'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">{language === 'es' ? 'Enlaces compatibles:' : 'Supported links:'}</p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  <li>YouTube: https://www.youtube.com/watch?v=...</li>
                  <li>YouTube Corto: https://youtu.be/...</li>
                  <li>Archivos Directos: Enlaces terminados en .mp4, .webm o .mov</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-light">
                {language === 'es' 
                  ? 'Selecciona una presentación temática oficial preconfigurada para AGRICARL PERÚ:' 
                  : 'Select an official pre-configured thematic presentation for AGRICARL PERU:'}
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {PRESENTATION_VIDEO_PRESETS.map((preset) => {
                  const isSelected = activeVideoUrl === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-16 h-12 rounded-lg bg-slate-900 overflow-hidden relative shrink-0">
                        <img 
                          src={preset.thumbnail} 
                          alt={preset.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {preset.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {preset.subtitle}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                          {preset.type}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Feedback alert */}
          {inputFeedback && (
            <div className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
              inputFeedback.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border border-rose-200 text-rose-900'
            }`}>
              {inputFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{inputFeedback.message}</span>
            </div>
          )}

          {/* Current Active Video Indicator */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="truncate max-w-md">
              <span className="font-bold text-slate-700">{language === 'es' ? 'Video Activo: ' : 'Active Video: '}</span>
              {activeVideoUrl}
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold shrink-0">
              {isYouTube ? 'YouTube' : 'Direct MP4'}
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              setImage('video-presentacion', DEFAULT_PRESENTATION_VIDEO);
              savePersistedMediaImmediately();
              onClose();
            }}
            className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            {language === 'es' ? 'Restablecer video por defecto' : 'Reset default video'}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
