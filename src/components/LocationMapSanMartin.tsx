import React, { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Copy, 
  Check,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LocationMapSanMartin() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const locationQuery = 'Moyobamba, Peru';
  const encodedQuery = encodeURIComponent(locationQuery);

  // Standard Google Maps Embed URL - Displays official Moyobamba, Perú map
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  const googleMapsUrl = `https://www.google.com/maps/place/Moyobamba,+Peru/`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Moyobamba, San Martín, Perú - AGRICARL PERÚ S.A.C.');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
            <MapPin className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-black text-sm sm:text-base uppercase tracking-wider text-white">
                {language === 'es' ? 'Ubicación en Google Maps' : 'Google Maps Location'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
                Moyobamba · San Martín
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {language === 'es' 
                ? 'Región San Martín, Amazonía del Perú' 
                : 'San Martín Region, Peruvian Amazon'}
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 print:hidden flex-wrap">
          <button
            onClick={handleCopyAddress}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700/60"
            title={language === 'es' ? 'Copiar dirección' : 'Copy address'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{language === 'es' ? 'Copiado' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>{language === 'es' ? 'Copiar' : 'Copy'}</span>
              </>
            )}
          </button>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-all flex items-center gap-1.5 border border-slate-700/60"
            title={language === 'es' ? 'Cómo llegar con Google Maps' : 'Get directions'}
          >
            <Navigation className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'es' ? 'Cómo llegar' : 'Directions'}</span>
          </a>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-brand-green hover:bg-emerald-600 text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/20"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Ver en Google Maps' : 'Open in Maps'}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Google Maps Real Iframe Embed */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-slate-100">
        <iframe
          src={mapEmbedUrl}
          title="Google Map Moyobamba San Martin Peru"
          className="w-full h-full border-0 block"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Footer Info Ribbon */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-7 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800">
            AGRICARL PERÚ S.A.C.
          </span>
          <span className="text-slate-400">·</span>
          <span>{language === 'es' ? 'Moyobamba & Red de Acopio San Martín' : 'Moyobamba & San Martín Hub'}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span>RUC: 20611291001</span>
          <span>·</span>
          <a 
            href={googleMapsUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-emerald-700 hover:text-emerald-800 font-bold underline underline-offset-2 flex items-center gap-1"
          >
            {language === 'es' ? 'Abrir pantalla completa' : 'Open fullscreen map'}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
