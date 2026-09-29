import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import gestorContableImg from '../assets/images/regenerated_image_1790111713298.jpg';
import { EditableMedia } from './EditableMedia';
import EditableBackground from './EditableBackground';
import { 
  ArrowLeft, 
  FileText, 
  Award, 
  Sparkles, 
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Landmark,
  TrendingUp,
  Table,
  Check,
  Laptop,
  FileSpreadsheet,
  Layers,
  Lock,
  Scale,
  Sparkle,
  ExternalLink,
} from 'lucide-react';

interface GestorContablePageProps {
  onBack: () => void;
}

export default function GestorContablePage({ onBack }: GestorContablePageProps) {
  const { setImage, savePersistedMediaImmediately } = useMedia();

  
  return (
    <div className="min-h-screen bg-brand-light text-slate-800 font-sans pb-20 bg-architectural-grid relative">
      
      
      {/* 1. Header Hero con Retorno */}
      <EditableBackground
        sectionKey="bg-gestor-hero"
        title="Fondo Portada Gestor Contable"
        defaultColor="#0a1726"
        defaultOpacity={0.96}
        defaultPattern="mesh"
        className="relative text-white pt-10 pb-20 overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group mb-8 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-cyan-400/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Servicios</span>
          </button>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Software Contable Empresarial · Normativa SUNAT 2026</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                  Gestor Contable Formato 5.2
                </h1>
                <p className="font-mono text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-wider">
                  Automatización del Libro Diario Simplificado con Plan Contable General Empresarial (PCGE)
                </p>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Diseñado específicamente para contadores, estudios contables y empresarios de regímenes MYPE y General. Nuestro sistema automatiza los asientos de compras, ventas, cobranzas, pagos y planilla, generando en un solo clic los archivos de texto (TXT) reglamentarios para el validador PLE de la SUNAT sin errores ni descuadres.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20informaci%C3%B3n%20y%20demostraci%C3%B3n%20del%20Gestor%20Contable%20Formato%205.2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Solicitar Licencia y Demo</span>
                </a>
                <a
                  href="https://conta.agricarlperu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer border border-amber-300"
                >
                  <span>Explorar sitio web</span>
                  <ExternalLink className="w-4 h-4 text-slate-950" />
                </a>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 max-w-xl">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-cyan-400 block uppercase font-bold">SUNAT Formato</span>
                  <span className="text-sm font-bold text-white">5.2 Libro Diario</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Plan de Cuentas</span>
                  <span className="text-sm font-bold text-emerald-400">PCGE Vigente</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Generador PLE</span>
                  <span className="text-sm font-bold text-cyan-300">100% Compatible</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Privacidad</span>
                  <span className="text-sm font-bold text-white">100% Local y Seguro</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-900/30 aspect-[4/3] bg-slate-950">
                <EditableMedia
                  mediaKey="img-gestor-contable"
                  src="/images/gestor-contable.jpg"
                  alt="Gestor Contable Formato 5.2"
                  title="Hero Gestor Contable"
                  section="Página Gestor Contable"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                  <span className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    PLE SUNAT Validado
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-emerald-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Sin Errores de Asiento
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* 2. Pilares de Eficiencia y Automatización */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Asientos en 1 Clic</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Generación automática de la partida doble para ventas, compras e inventarios sin ingresar cuenta por cuenta manualmente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">PCGE Actualizado</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Plan Contable General Empresarial estructurado con cuentas a nivel de subcuentas y divisionarias según lineamientos del CNC.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Exportación TXT PLE</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Crea los archivos planos TXT con el formato de nombres oficial de SUNAT para declarar los libros electrónicos sin rechazos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Tus Datos en Local</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              No requiere suscripciones mensuales en la nube ni expone información confidencial de clientes a servidores externos.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Módulos del Sistema */}
      <div id="modulos-gestor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-xs text-cyan-700 font-bold uppercase tracking-widest bg-cyan-100/70 px-3.5 py-1.5 rounded-full">
            Módulos Contables Integrados
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            Estructura Modular para Control Total
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto font-light">
            Desde la carga de facturas y boletas hasta el cierre contable anual y balance de comprobación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Módulo 1: Compras y Gastos */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-gestor-compras"
                src="/images/gestor_compras.jpg"
                alt="Módulo de Compras y Gastos"
                title="Módulo de Compras y Gastos"
                section="Página Gestor Contable"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-cyan-900/90 text-cyan-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Módulo 01
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Registro de Compras y Gastos Operativos
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Ingreso rápido de comprobantes de pago de proveedores, cálculo del crédito fiscal (IGV), control de detracciones (SPOT) y retenciones con asignación de centros de costos.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Distingue compras gravadas, no gravadas y mixtas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Asiento de destino automático (Clase 6 y 9)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Control de pagos en efectivo o cuenta bancaria</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Incluido en Licencia</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20demo%20del%20M%C3%B3dulo%20de%20Compras%20Gestor%20Contable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Consultar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Módulo 2: Ventas e Ingresos */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-gestor-ventas"
                src="/images/gestor_ventas.jpg"
                alt="Módulo de Ventas e Ingresos"
                title="Módulo de Ventas e Ingresos"
                section="Página Gestor Contable"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-emerald-900/90 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Módulo 02
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Registro de Ventas y Cuentas por Cobrar
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Consolidación de facturas, boletas, notas de crédito y débito electrónicas emitidas. Genera automáticamente los asientos de débito a clientes (Cta. 12) y crédito a ventas (Cta. 70 e IGV 40).
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Control de cobros al contado y al crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cálculo automático de base imponible e impuestos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Exportación consolidada mensual</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Incluido en Licencia</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20demo%20del%20M%C3%B3dulo%20de%20Ventas%20Gestor%20Contable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Consultar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Módulo 3: Generador PLE Oficial SUNAT */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-gestor-ple"
                src="/images/gestor_ple.jpg"
                alt="Generador PLE SUNAT"
                title="Generador PLE SUNAT"
                section="Página Gestor Contable"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Módulo 03
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Generador TXT para PLE Formato 5.2
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Convierte todos los asientos del mes en el archivo plano oficial requerido por SUNAT (LE + RUC + Año + Mes + 050200 + ... .txt), garantizando validación limpia sin inconsistencias.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verificación automática de sumas y saldos cuadrados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Compatibilidad con las últimas versiones del validador PLE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Historial de TXT generados por período fiscal</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Garantía SUNAT</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20demo%20del%20Generador%20PLE%20Gestor%20Contable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Consultar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Especificaciones del Software y Requisitos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                Ficha Técnica de Software
              </span>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
                Especificaciones del Gestor Contable Formato 5.2
              </h3>
            </div>
            <span className="bg-cyan-500/20 text-cyan-300 font-mono text-xs px-4 py-1.5 rounded-full border border-cyan-400/30 font-semibold self-start md:self-auto">
              Versión PCGE 2026
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Entorno de Ejecución</span>
              <p className="font-bold text-base text-cyan-300">Microsoft Excel 2016 / 2019 / 2021 / Microsoft 365</p>
              <p className="text-slate-400 text-xs font-light">Optimizado con macros VBA de alto rendimiento para Windows.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Estructura Legal SUNAT</span>
              <p className="font-bold text-base text-emerald-400">Libro Diario Formato Simplificado 5.2</p>
              <p className="text-slate-400 text-xs font-light">Resolución de Superintendencia N.° 286-2009/SUNAT y modif.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Régimen Tributario Aplicable</span>
              <p className="font-bold text-base text-white">Régimen MYPE Tributario (RMT) y Régimen General</p>
              <p className="text-slate-400 text-xs font-light">Obligados a llevar Libro Diario Simplificado por límite de ingresos.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Capacidad de Asientos</span>
              <p className="font-bold text-base text-cyan-300">Sin límite de registros mensuales</p>
              <p className="text-slate-400 text-xs font-light">Soporta miles de operaciones comerciales sin pérdida de fluidez.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Modalidad de Licencia</span>
              <p className="font-bold text-base text-white">Licencia por Empresa / Multi-Empresa</p>
              <p className="text-slate-400 text-xs font-light">Pago único sin mensualidades obligatorias ni tarifas ocultas.</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono uppercase block">Soporte e Inducción</span>
              <p className="font-bold text-base text-emerald-400">Acompañamiento Remoto y Tutoriales Oficiales</p>
              <p className="text-slate-400 text-xs font-light">Asistencia directa por WhatsApp para resolver dudas tributarias.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Llamado a la Acción Directo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-[#0a1827] via-[#102942] to-[#071320] rounded-3xl p-8 sm:p-12 text-white border-2 border-cyan-900/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
              Implementación Inmediata para tu Negocio o Estudio
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              ¿Listo para automatizar tu contabilidad y declaraciones SUNAT?
            </h3>
            <p className="text-slate-300 text-sm font-light">
              Solicita hoy mismo el archivo demostrativo, los manuales de uso y las facilidades de activación de licencia con soporte técnico de AGRICARL PERÚ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%20PERU%2C%20solicito%20atenci%C3%B3n%20para%20adquirir%20el%20Gestor%20Contable"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Contable</span>
            </a>
            <a
              href="mailto:operaciones@agricarlperu.com?subject=Solicitud%20Gestor%20Contable%20AGRICARL"
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
