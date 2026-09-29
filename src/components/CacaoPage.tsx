import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import cacaoImg from '../assets/images/regenerated_image_1790090959737.jpg';
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
  Flame,
  Sun,
  Package,
  Layers,
  Calendar,
  ThermometerSun,
  Scale,
  Sparkle,
  Check
} from 'lucide-react';

interface CacaoPageProps {
  onBack: () => void;
}

export default function CacaoPage({ onBack }: CacaoPageProps) {
  const { setImage, savePersistedMediaImmediately } = useMedia();

  
  return (
    <div className="min-h-screen bg-[#faf7f2] text-slate-800 font-sans pb-20 bg-chocolate-tablet-subtle relative">
      
      
      {/* 1. Header Hero con Retorno */}
      <EditableBackground
        sectionKey="bg-cacao-hero"
        title="Fondo Portada Cacao"
        defaultImage="/videos/presentacion_agricarl.mp4"
        defaultColor="#1c0f07"
        defaultOpacity={0.85}
        defaultPattern="mesh"
        className="relative text-white pt-10 pb-20 overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group mb-8 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-amber-400/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Catálogo</span>
          </button>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cacao Fino de Aroma · Theobroma cacao</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                  Cacao Amazónico
                </h1>
                <p className="font-mono text-xs sm:text-sm text-amber-300 font-bold uppercase tracking-wider">
                  Granos Fermentados y Secos al Sol · Trazabilidad Directa desde San Martín
                </p>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Cosechado en parcelas agroforestales de la selva alta peruana, nuestro cacao destaca por su extraordinario perfil aromático, notas frutales y acidez equilibrada. En AGRICARL PERÚ trabajamos junto a asociaciones de productores bajo protocolos rigurosos de fermentación controlada y secado solar en marquesinas, garantizando granos de calidad Grado 1 para exportación y chocolatería Bean-to-Bar.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20y%20ficha%20t%C3%A9cnica%20de%20Cacao%20Amaz%C3%B3nico%20Fino%20de%20Aroma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar Lote / Muestra</span>
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('formatos-cacao');
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
                  <span className="text-[10px] font-mono text-amber-400 block uppercase font-bold">Fermentación</span>
                  <span className="text-sm font-bold text-white">&ge; 80 % Grado 1</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Humedad Final</span>
                  <span className="text-sm font-bold text-emerald-400">&le; 7.0 % Óptima</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Calibre</span>
                  <span className="text-sm font-bold text-white">100 - 110 gr/100g</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Cadmio</span>
                  <span className="text-sm font-bold text-amber-300">Conforme UE/FDA</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30 aspect-[4/3] bg-slate-950">
                <EditableMedia
                  mediaKey="img-cacao"
                  src={cacaoImg}
                  alt="Cacao Amazónico Fino de Aroma"
                  title="Hero Cacao Amazónico"
                  section="Página Cacao"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                  <span className="flex items-center gap-1.5 font-mono text-amber-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    Región San Martín, Perú
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-emerald-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Grado 1 de Exportación
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* 2. Pilares de Calidad y Proceso Postcosecha */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Fermentación Controlada</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Realizada en cajones de madera laurel durante 5 a 6 días con volteos programados para desarrollar precursores aromáticos únicos y eliminar amargor excesivo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Secado Solar Gradual</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Secado 100% natural en marquesinas y tarimas elevadas bajo el sol amazónico hasta alcanzar un 6.5% - 7% de humedad sin riesgo de contaminación por humo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Perfil Sensorial Rico</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Notas florales, acidez cítrica moderada, matices de frutos secos y cacao puro de alta intensidad, altamente demandado por chocolateros artesanales mundiales.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Trazabilidad Total</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Origen verificable desde parcelas georreferenciadas libres de deforestación, cumpliendo con las regulaciones de la Unión Europea (EUDR) y comercio justo.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Catálogo de Formatos Comerciales */}
      <div id="formatos-cacao" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/60">
          <div className="text-center space-y-3 mb-12">
            <span className="font-mono text-xs text-amber-700 font-bold uppercase tracking-widest bg-amber-100/70 px-3.5 py-1.5 rounded-full">
              Catálogo Comercial de Cacao
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
              Formatos Disponibles para Venta y Exportación
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto font-light">
              Suministramos grano seco a granel para exportadores e industrias, así como derivados seleccionados para micro-chocolaterías y laboratorios gastronómicos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Formato 1: Grano Seco Grado 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div className="h-56 relative overflow-hidden bg-slate-950">
                <EditableMedia
                  mediaKey="img-cacao-grano-seco"
                  src="/images/cacao_grano_seco.jpg"
                  alt="Grano de Cacao Seco Grado 1"
                  title="Grano de Cacao Seco Grado 1"
                  section="Página Cacao"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-amber-900/90 text-amber-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                  Pura Calidad Selecta
                </span>
                
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                    Grano de Cacao Seco Grado 1
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    Granos enteros fermentados y secos al sol, seleccionados mecánicamente por calibre y zarandeados para eliminar impurezas, polvo y fragmentos.
                  </p>
                  <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Fermentación &ge; 80% (corte longitudinal)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Humedad controlada: 6.5% - 7.0%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Presentación: Sacos de yute 60 kg / 69 kg + GrainPro</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Min: 1 TM / Contenedor</span>
                  <a
                    href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Grano%20de%20Cacao%20Seco%20Grado%201"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Cotizar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Formato 2: Cacao Criollo & Trinitario Seleccionado */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div className="h-56 relative overflow-hidden bg-slate-950">
                <EditableMedia
                  mediaKey="img-cacao-criollo"
                  src="/images/cacao_criollo.jpg"
                  alt="Cacao Criollo Fino Seleccionado"
                  title="Cacao Criollo Seleccionado"
                  section="Página Cacao"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-emerald-900/90 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                  Micro-Lotes Bean-to-Bar
                </span>
                
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                    Cacao Criollo Fino Seleccionado
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    Lotes seleccionados a mano provenientes de clones finos con alta presencia de almendras blancas, destinados a chocolates oscuros de origen único (Single Origin).
                  </p>
                  <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Baja astringencia y acidez dulce frutal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Lotes identificados por valle y altitud</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Presentación: Sacos de 25 kg y 50 kg</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Min: 100 kg / Lote</span>
                  <a
                    href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Cacao%20Criollo%20Fino%20Seleccionado"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Cotizar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Formato 3: Nibs de Cacao Puros */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div className="h-56 relative overflow-hidden bg-slate-950">
                <EditableMedia
                  mediaKey="img-cacao-nibs"
                  src="/images/cacao_nibs.jpg"
                  alt="Nibs de Cacao Tostados"
                  title="Nibs de Cacao Tostados"
                  section="Página Cacao"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                  Listo para Consumo / Proceso
                </span>
                
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                    Nibs de Cacao 100% Puros
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    Fragmentos de grano tostado y descascarillado con precisión para repostería, barras de chocolate crujientes, granolas y mezcla de superalimentos.
                  </p>
                  <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Sin azúcar, sin conservantes químicos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Tostado homogéneo a temperatura controlada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Presentación: Cajas de 10 kg / 20 kg al vacío</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Min: 50 kg</span>
                  <a
                    href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Nibs%20de%20Cacao%20100%25%20Puros"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Cotizar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ficha Técnica Analítica y Estándares de Exportación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest block mb-1">
                Control de Calidad en Origen
              </span>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
                Ficha Técnica: Grano de Cacao Fino (NTP 208.002 / ISO 2451)
              </h3>
            </div>
            <span className="bg-amber-500/20 text-amber-300 font-mono text-xs px-4 py-1.5 rounded-full border border-amber-400/30 font-semibold self-start md:self-auto">
              Cosecha Activa 2026
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Grado de Fermentación</span>
              <p className="font-bold text-base text-amber-300">&ge; 80 % (Prueba de Corte)</p>
              <p className="text-slate-400 text-xs font-light">Desarrollo óptimo de aroma y color pardo chocolate.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Contenido de Humedad</span>
              <p className="font-bold text-base text-emerald-400">6.5 % &ndash; 7.0 % Máx.</p>
              <p className="text-slate-400 text-xs font-light">Garantiza estabilidad biológica y almacenamiento prolongado.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Granos Mohosos / Pizarrosos</span>
              <p className="font-bold text-base text-white">&lt; 3.0 % Moho / &lt; 3.0 % Pizarra</p>
              <p className="text-slate-400 text-xs font-light">Conforme a tolerancias estrictas de grado exportación.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Regulación de Cadmio (Cd)</span>
              <p className="font-bold text-base text-amber-300">Conforme a Reg. UE 488/2014</p>
              <p className="text-slate-400 text-xs font-light">Análisis de laboratorio acreditado INACAL por lote comercial.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Acondicionamiento y Ensacado</span>
              <p className="font-bold text-base text-white">Sacos Yute 60/69 kg + GrainPro</p>
              <p className="text-slate-400 text-xs font-light">Barrera hermética contra humedad y plagas en transporte marítimo.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Logística y Puerto de Salida</span>
              <p className="font-bold text-base text-emerald-400">FOB Callao / Paita / Ex-Works Tarapoto</p>
              <p className="text-slate-400 text-xs font-light">Documentación completa: Certificado de Origen, Fitosanitario SENASA.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Llamado a la Acción Directo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-[#241208] via-[#35190b] to-[#1a0c05] rounded-3xl p-8 sm:p-12 text-white border-2 border-amber-900/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-bold">
              Atención Comercial para Compradores e Industrias
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              ¿Listo para coordinar tu pedido o solicitar muestras de cacao?
            </h3>
            <p className="text-slate-300 text-sm font-light">
              Nuestro equipo comercial atiende solicitudes para pedidos nacionales, micro-lotes Bean-to-Bar y contratos de exportación por contenedor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%20PERU%2C%20solicito%20atenci%C3%B3n%20comercial%20para%20Cacao%20Amaz%C3%B3nico"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Comercial</span>
            </a>
            <a
              href="mailto:operaciones@agricarlperu.com?subject=Cotizacion%20Cacao%20Amazonico%20AGRICARL"
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
