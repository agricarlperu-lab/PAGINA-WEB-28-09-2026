import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import { 
  ArrowLeft, 
  MapPin, 
  Sun, 
  Award, 
  Package, 
  Sparkles, 
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  Droplets,
  HeartPulse,
  Leaf,
  CheckCircle2,
  Calendar,
  Check
} from 'lucide-react';
import EditableMedia from './EditableMedia';
import EditableBackground from './EditableBackground';

interface AguajePageProps {
  onBack: () => void;
}

export default function AguajePage({ onBack }: AguajePageProps) {
  const { setImage, savePersistedMediaImmediately } = useMedia();

  
  return (
    <div className="min-h-screen bg-brand-light text-slate-800 font-sans pb-20 bg-architectural-grid relative">
      
      
      {/* 1. Header Hero con Retorno */}
      <EditableBackground
        sectionKey="bg-aguaje-hero"
        title="Fondo Portada Aguaje"
        defaultImage="/videos/presentacion_agricarl.mp4"
        defaultColor="#2a1205"
        defaultOpacity={0.85}
        defaultPattern="mesh"
        className="relative text-white pt-10 pb-20 overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
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
                <span>Superalimento Amazónico · Mauritia flexuosa</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                  Aguaje Amazónico
                </h1>
                <p className="font-mono text-sm sm:text-base text-amber-300 font-bold uppercase tracking-wider">
                  Disponible Exclusivamente en: Fruto Fresco y Deshidratado Seco al Sol Natural
                </p>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Considerado el «Fruto de la Vida» en la selva peruana, el aguaje destaca por ser la fuente natural más rica en provitamina A (betacaroteno), fitoestrógenos naturales, vitamina E y ácidos grasos esenciales. En AGRICARL PERÚ suministramos exclusivamente <strong className="text-amber-300 font-semibold">Aguaje Fresco seleccionado a mano</strong> y <strong className="text-amber-300 font-semibold">Aguaje Deshidratado Seco al Sol de Forma Natural</strong>, conservando la pureza y potencia de sus nutrientes sin aditivos industriales.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20y%20disponibilidad%20de%20Aguaje%20Fresco%20y%20Deshidratado%20al%20Sol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar Lote / Muestra</span>
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('formatos-aguaje');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Ver Formatos de Venta</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Formatos Venta</span>
                  <span className="text-sm font-bold text-amber-400">Fresco y Seco al Sol</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Deshidratado</span>
                  <span className="text-sm font-bold text-emerald-400">100% Sol Natural</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Pureza</span>
                  <span className="text-sm font-bold text-white">0% Aditivos Químicos</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-[4/3] bg-slate-900">
                <EditableMedia
                  mediaKey="img-aguaje-hero"
                  src="/images/aguaje_hero.jpg"
                  alt="Aguaje Amazónico Fresco y Deshidratado al Sol"
                  title="Aguaje Amazónico Principal"
                  section="Aguaje"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-[11px]">San Martín, Perú</span>
                  </div>
                  <span className="bg-amber-500/80 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Cosecha Sostenible Sin Tala
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* 2. Beneficios Nutricionales y Propiedades Activas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Altísimo Betacaroteno
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Concentración excepcional de carotenoides activos y provitamina A, vitales para la salud celular, ocular y dérmica.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Fitoestrógenos Nativos
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Compuestos vegetales que apoyan el equilibrio hormonal femenino natural y la vitalidad general de manera orgánica.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Ácidos Grasos & Vitamina E
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Rico en ácido oleico (Omega 9) y tocoferoles, que confieren alta estabilidad oxidativa y propiedades regenerativas.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-1 uppercase">
              Manejo Sin Tala
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Recolectado mediante escalamiento tradicional de palmeras vivas, preservando los humedales amazónicos y la biodiversidad.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Formatos y Presentaciones ÚNICAS DISPONIBLES */}
      <div id="formatos-aguaje" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3 py-1 rounded-full">
            Catálogo Comercial Oficial
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
            Nuestros Formatos de Venta de Aguaje
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-light">
            Por el momento comercializamos el aguaje únicamente en dos presentaciones garantizadas, frescas y 100% naturales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Presentación 1: Aguaje Fresco */}
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500/30 shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl z-10">
              Cosecha Fresca Directa
            </div>

            <div className="space-y-4">
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-900 relative">
                <EditableMedia
                  mediaKey="img-aguaje-fresco"
                  src="/images/aguaje_fresco.jpg"
                  alt="Aguaje Fresco Seleccionado AGRICARL"
                  title="Aguaje Fresco Seleccionado"
                  section="Formatos Aguaje"
                  className="w-full h-full object-cover"
                />
                
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold rounded-lg border border-emerald-200">
                  Fruto Entero Fresco
                </span>
                <span className="text-xs font-mono text-slate-400">Selección de Primera</span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 uppercase">
                Aguaje Fresco Seleccionado
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Fruto entero fresco cosechado directamente en aguajales sostenibles de la selva de San Martín. Frutos de cáscara brillante con escamas rojizas parejas y pulpa carnosa de intenso color amarillo-naranja, alto en aceites naturales saludables y con sabor agridulce característico.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Características de Entrega:
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Cosecha responsable sin tala:</strong> Recolectado de palmeras vivas con escalamiento tradicional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Selección estricta:</strong> Clasificación por tamaño, frescura y óptimo punto de madurez.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Embalaje ventilado:</strong> Despacho en jabas plásticas o sacos transpirables para resguardar la fruta.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Uso principal:</strong> Despulpado fresco, heladerías, juguerías, repostería y comercialización mayorista.</span>
                  </li>
                </ul>
              </div>
            </div>

            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20deseo%20cotizar%20Aguaje%20Fresco%20seleccionado%20por%20mayor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Cotizar Aguaje Fresco</span>
            </a>
          </div>

          {/* Presentación 2: Aguaje Deshidratado Seco al Sol Natural */}
          <div className="bg-white rounded-3xl p-8 border-2 border-amber-500/30 shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl z-10">
              100% Secado Solar Natural
            </div>

            <div className="space-y-4">
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-900 relative">
                <EditableMedia
                  mediaKey="img-aguaje-deshidratado"
                  src="/images/aguaje_deshidratado.jpg"
                  alt="Aguaje Deshidratado Seco al Sol AGRICARL"
                  title="Aguaje Deshidratado Seco al Sol"
                  section="Formatos Aguaje"
                  className="w-full h-full object-cover"
                />
                
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-mono font-bold rounded-lg border border-amber-200 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Seco al Sol Natural</span>
                </span>
                <span className="text-xs font-mono text-slate-400">Sin Químicos ni Aditivos</span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 uppercase">
                Aguaje Deshidratado Seco al Sol
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Pulpa de aguaje deshidratada mediante exposición solar limpia y controlada bajo el sol de la Amazonía. Este proceso natural artesanal deshidrata el fruto de manera ecológica sin choque térmico agresivo, concentrando al máximo sus carotenos (provitamina A), tocoferoles y fitoestrógenos sin conservantes.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Características de Entrega:
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Secado solar natural:</strong> 100% ecológico, sin hornos artificiales con combustibles ni solventes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Nutrientes concentrados:</strong> Gran densidad de betacarotenos naturales y fitoestrógenos activos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Larga conservación:</strong> Humedad reducida para transporte y almacenamiento seguro sin refrigeración.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Uso principal:</strong> Industria nutracéutica, mezclas funcionales, infusiones y formulaciones gourmet.</span>
                  </li>
                </ul>
              </div>
            </div>

            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20deseo%20cotizar%20Aguaje%20Deshidratado%20Seco%20al%20Sol%20Natural"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-slate-900/20 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Cotizar Aguaje Seco al Sol</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Tabla de Especificaciones Técnicas */}
      <div id="especificaciones-aguaje" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-mono text-brand-green uppercase font-bold tracking-widest block">
                Ficha Técnica
              </span>
              <h3 className="font-display font-bold text-lg text-slate-900 uppercase">
                Parámetros y Especificaciones Comerciales
              </h3>
            </div>
            <Award className="w-6 h-6 text-amber-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Parámetro</th>
                  <th className="py-3 px-4">Especificación Comercial</th>
                  <th className="py-3 px-4 rounded-r-xl">Condición</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-light">
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Nombre Botánico</td>
                  <td className="py-3 px-4">Mauritia flexuosa L.f.</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Origen Silvestre San Martín</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Presentaciones Activas</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1) Fruto Fresco Seleccionado · 2) Deshidratado Seco al Sol</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-emerald-600 font-bold">Disponibilidad Actual</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Método de Secado</td>
                  <td className="py-3 px-4 font-semibold text-amber-700">Secado Solar Natural (al sol directo amazónico)</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">100% Ecológico</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Aditivos Químicos</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">0% Libre de preservantes, sulfitos y colorantes</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Grado Natural</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Aporte de Betacarotenos</td>
                  <td className="py-3 px-4 font-bold text-amber-600">&ge; 30 - 50 mg / 100g pulpa seca</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">Pro-Vitamina A activa</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Manejo de Cosecha</td>
                  <td className="py-3 px-4">Escalamiento tradicional de palmeras vivas (Sin Tala)</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-emerald-600 font-bold">Sostenible</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-900">Formatos de Empaque</td>
                  <td className="py-3 px-4">Jabas/sacos ventilados (Fresco) · Bolsas herméticas selladas (Seco al sol)</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">A solicitud del cliente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Llamado a la Acción de Cotización */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <EditableBackground
          sectionKey="bg-aguaje-cta"
          title="Fondo Llamado a la Acción Aguaje"
          defaultColor="#061f14"
          defaultOpacity={0.96}
          defaultPattern="dots"
          className="rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl border border-emerald-500/20"
        >
          <span className="font-mono text-xs text-amber-400 uppercase font-bold tracking-widest block">
            Atención Mayorista y Proveedores Industriales
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight max-w-xl mx-auto">
            ¿Desea cotizar Aguaje Fresco o Deshidratado Seco al Sol?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light max-w-lg mx-auto">
            Abastecimiento continuo desde la región San Martín, selección rigurosa y despacho logístico a nivel nacional.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a 
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20Aguaje%20Fresco%20y%20Deshidratado%20al%20Sol"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
            <button 
              onClick={onBack}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              Explorar Otros Productos
            </button>
          </div>
        </EditableBackground>
      </div>

    </div>
  );
}
