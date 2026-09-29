import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import sachaInchiImg from '../assets/images/regenerated_image_1790090958892.jpg';
import { EditableMedia } from './EditableMedia';
import EditableBackground from './EditableBackground';
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  Sparkles, 
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  Droplets,
  CheckCircle2,
  Leaf,
  HeartPulse,
  Activity,
  Package,
  Layers,
  Calendar,
  Sparkle,
  Check
} from 'lucide-react';

interface SachaInchiPageProps {
  onBack: () => void;
}

export default function SachaInchiPage({ onBack }: SachaInchiPageProps) {
  const { setImage, savePersistedMediaImmediately } = useMedia();

  
  return (
    <div className="min-h-screen bg-brand-light text-slate-800 font-sans pb-20 bg-architectural-grid relative">
      
      
      {/* 1. Header Hero con Retorno */}
      <EditableBackground
        sectionKey="bg-sacha-hero"
        title="Fondo Portada Sacha Inchi"
        defaultImage="/videos/presentacion_agricarl.mp4"
        defaultColor="#0c1f13"
        defaultOpacity={0.85}
        defaultPattern="mesh"
        className="relative text-white pt-10 pb-20 overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group mb-8 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-emerald-400/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Catálogo</span>
          </button>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Superalimento Amazónico · Plukenetia volubilis</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                  Sacha Inchi Amazónico
                </h1>
                <p className="font-mono text-xs sm:text-sm text-emerald-300 font-bold uppercase tracking-wider">
                  El Maní del Inca · Aceite Extra Virgen Prensado en Frío, Semillas y Almendras
                </p>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Originario de la Amazonía peruana, el Sacha Inchi es mundialmente reconocido como la fuente vegetal más densa en ácidos grasos poliinsaturados Omega-3 (ácido alfa-linolénico). En AGRICARL PERÚ procesamos cosechas frescas bajo estándares de prensado en frío estricto (&lt; 40°C), preservando intactos sus antioxidantes naturales, tocoferoles y vitaminas para la industria alimentaria, nutracéutica y cosmética.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20y%20ficha%20t%C3%A9cnica%20de%20Sacha%20Inchi%20(Aceite%2C%20Almendra%20y%20Semilla)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar Lote / Muestra</span>
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('formatos-sacha');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Ver Formatos Comerciales</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 max-w-xl">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">Omega 3 (ALA)</span>
                  <span className="text-sm font-bold text-white">48 % - 54 %</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Proteína Almendra</span>
                  <span className="text-sm font-bold text-emerald-400">27 % - 33 %</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Vitamina E</span>
                  <span className="text-sm font-bold text-amber-300">&gt; 200 mg/100g</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Extracción</span>
                  <span className="text-sm font-bold text-white">100% en Frío</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/30 aspect-[4/3] bg-slate-950">
                <EditableMedia
                  mediaKey="img-sacha-inchi"
                  src="/images/sacha-inchi.jpg"
                  alt="Sacha Inchi Amazónico"
                  title="Hero Sacha Inchi"
                  section="Página Sacha Inchi"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                  <span className="flex items-center gap-1.5 font-mono text-emerald-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    San Martín, Perú
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-amber-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Prensado en Frío Certificado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* 2. Pilares Nutricionales y de Proceso */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Ratio Óptimo Omega 3-6-9</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Equilibrio lipídico natural inigualable para la salud cardiovascular, reducción de triglicéridos y desarrollo cognitivo cerebral.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Prensado Extra Virgen</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Extracción puramente mecánica en frío por debajo de 40 °C, sin solventes químicos, refinación térmica ni adición de conservantes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Proteína Completa</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Almendras y harina con todos los aminoácidos esenciales, alta biodisponibilidad y 100% libres de gluten de manera natural.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Cosecha Sostenible</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Cultivo en enredaderas agroforestales con pequeños productores de San Martín, promoviendo la reforestación y el desarrollo rural justo.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Catálogo de Formatos Comerciales */}
      <div id="formatos-sacha" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-widest bg-emerald-100/70 px-3.5 py-1.5 rounded-full">
            Catálogo Comercial de Sacha Inchi
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            Formatos Disponibles para Venta y Distribución
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto font-light">
            Soluciones para la industria nutracéutica, alimentaria y cosmética, con entrega a granel e intermediación directa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Formato 1: Aceite Extra Virgen */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-sacha-aceite"
                src="/images/sacha_aceite.jpg"
                alt="Aceite Extra Virgen de Sacha Inchi"
                title="Aceite Extra Virgen de Sacha Inchi"
                section="Página Sacha Inchi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-emerald-900/90 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Grado Alimentario & Cosmético
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Aceite Extra Virgen Prensado en Frío
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Aceite 100% puro obtenido de almendras seleccionadas, decantado y microfiltrado. Color dorado brillante, aroma suave a nuez fresca y acidez libre inferior al 0.5%.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Omega 3 &ge; 48% / Omega 6 &ge; 35%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sin refinación química ni altas temperaturas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Presentación: Botellas 250ml/500ml, Cilindros 200L, IBC 1000L</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Min: 50 Litros / Lote</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Aceite%20Extra%20Virgen%20de%20Sacha%20Inchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Cotizar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formato 2: Almendra Tostada */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-sacha-almendra"
                src="/images/sacha_almendra.jpg"
                alt="Almendra de Sacha Inchi Tostada"
                title="Almendra de Sacha Inchi Tostada"
                section="Página Sacha Inchi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-amber-900/90 text-amber-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Snack & Gastronomía
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Almendra de Sacha Inchi Tostada
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Semillas descascaradas y sometidas a tostado térmico suave para desactivar antinutrientes naturales. Textura crujiente y agradable sabor a fruto seco.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Versiones: Natural sin sal, o con sal marina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Rica en proteína vegetal (30%) y fibra dietaria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Presentación: Bolsas al vacío 1 kg / Cajas de 10 kg</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Min: 20 kg</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Almendra%20de%20Sacha%20Inchi%20Tostada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Cotizar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formato 3: Semilla Seca para Industria */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-sacha-semilla"
                src="/images/sacha_semilla.jpg"
                alt="Semilla de Sacha Inchi Seca"
                title="Semilla de Sacha Inchi Seca"
                section="Página Sacha Inchi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Materia Prima Agroindustrial
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Semilla de Sacha Inchi Seleccionada
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Semilla entera seca con cáscara protectora para plantas de prensado de aceite o propagación de cultivos en parcelas tecnificadas.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Humedad controlada: &le; 8%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Pureza &ge; 99% sin impurezas vegetales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Presentación: Sacos de polipropileno de 40 kg</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Min: 500 kg</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Semilla%20de%20Sacha%20Inchi%20Seca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Cotizar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ficha Técnica Analítica del Aceite */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                Certificación Físico-Química
              </span>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
                Ficha Técnica: Aceite Extra Virgen de Sacha Inchi (NTP 151.400)
              </h3>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 font-mono text-xs px-4 py-1.5 rounded-full border border-emerald-400/30 font-semibold self-start md:self-auto">
              Lote Analizado 2026
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Ácido Alfa-Linolénico (Omega-3)</span>
              <p className="font-bold text-base text-emerald-400">48.0 % &ndash; 54.0 %</p>
              <p className="text-slate-400 text-xs font-light">Mayor proporción entre todos los aceites vegetales del mundo.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Ácido Linoleico (Omega-6)</span>
              <p className="font-bold text-base text-amber-300">33.0 % &ndash; 37.0 %</p>
              <p className="text-slate-400 text-xs font-light">Ácido graso esencial complementario con ratio saludable.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Índice de Acidez</span>
              <p className="font-bold text-base text-white">&le; 0.5 mg KOH/g (Extra Virgen)</p>
              <p className="text-slate-400 text-xs font-light">Garantía de prensado inmediato de semillas recién cosechadas.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Índice de Peróxidos</span>
              <p className="font-bold text-base text-emerald-400">&le; 5.0 meq O2/kg</p>
              <p className="text-slate-400 text-xs font-light">Frescura absoluta y alta resistencia a la oxidación natural.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Tocoferoles Totales (Vit. E)</span>
              <p className="font-bold text-base text-amber-300">190 &ndash; 240 mg / 100g</p>
              <p className="text-slate-400 text-xs font-light">Poderoso escudo antioxidante celular para el organismo y la piel.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Temperatura de Almacenamiento</span>
              <p className="font-bold text-base text-white">15 °C &ndash; 25 °C (Lugar Fresco y Oscuro)</p>
              <p className="text-slate-400 text-xs font-light">Envases con protección UV contra fotodegradación.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Llamado a la Acción Directo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-[#0d2315] via-[#163822] to-[#0a1b10] rounded-3xl p-8 sm:p-12 text-white border-2 border-emerald-800/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">
              Abastecimiento Continuo desde la Selva Peruana
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              ¿Deseas incorporar Sacha Inchi en tu línea de productos?
            </h3>
            <p className="text-slate-300 text-sm font-light">
              Ofrecemos lotes por volumen con certificados de análisis bromatológico, trazabilidad de parcelas y entrega coordinada a nivel nacional e internacional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%20PERU%2C%20solicito%20atenci%C3%B3n%20comercial%20para%20Sacha%20Inchi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Comercial</span>
            </a>
            <a
              href="mailto:operaciones@agricarlperu.com?subject=Cotizacion%20Sacha%20Inchi%20AGRICARL"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Enviar Correo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
