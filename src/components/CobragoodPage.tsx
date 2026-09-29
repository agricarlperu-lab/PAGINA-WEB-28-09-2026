import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import agricobrosImg from '../assets/images/regenerated_image_1790111590708.jpg';
import { EditableMedia } from './EditableMedia';
import EditableBackground from './EditableBackground';
import { 
  ArrowLeft, 
  CreditCard, 
  Award, 
  Sparkles, 
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  TrendingUp,
  Zap,
  Lock,
  Building2,
  QrCode,
  Wallet,
  Smartphone,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';

interface CobragoodPageProps {
  onBack: () => void;
}

export default function CobragoodPage({ onBack }: CobragoodPageProps) {
  const { setImage, savePersistedMediaImmediately } = useMedia();

  
  return (
    <div className="min-h-screen bg-brand-light text-slate-800 font-sans pb-20 bg-architectural-grid relative">
      
      
      {/* 1. Header Hero con Retorno */}
      <EditableBackground
        sectionKey="bg-cobragood-hero"
        title="Fondo Portada AgriCobros"
        defaultColor="#08182b"
        defaultOpacity={0.96}
        defaultPattern="mesh"
        className="relative text-white pt-10 pb-20 overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fintech & Recaudación Comercial · Solución Corporativa</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                  Gestión de Recaudación AgriCobros
                </h1>
                <p className="font-mono text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-wider">
                  Cobros Inteligentes y Recaudación Multibanco sin Alquiler de POS Físico
                </p>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Simplifique sus flujos financieros comerciales y agroindustriales con nuestro sistema AgriCobros. Facilite pagos presenciales y a distancia con cargo a tarjetas de los cuatro bancos más importantes del país (BCP, BBVA, Interbank y Scotiabank), con liquidación rápida y acceso a las comisiones transaccionales más competitivas del mercado.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20informaci%C3%B3n%20y%20tarifario%20del%20sistema%20AgriCobros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Solicitar Tarifario y Demo</span>
                </a>
                <a
                  href="https://agricarlperu.com/sistema-recaudo-cobragood/"
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
                  <span className="text-[10px] font-mono text-cyan-400 block uppercase font-bold">Liquidación</span>
                  <span className="text-sm font-bold text-white">Directa en Cuenta</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Alquiler POS</span>
                  <span className="text-sm font-bold text-emerald-400">S/ 0.00 Costo Fijo</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Banca Nacional</span>
                  <span className="text-sm font-bold text-cyan-300">4 Bancos Líderes</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Disponibilidad</span>
                  <span className="text-sm font-bold text-white">99.9 % Uptime</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-900/30 aspect-[4/3] bg-slate-950">
                <EditableMedia
                  mediaKey="img-gestion-recaudacion"
                  src={agricobrosImg}
                  alt="Sistema de Recaudación AgriCobros"
                  title="Hero AgriCobros"
                  section="Página AgriCobros"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                  <span className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    Fintech Corporativa
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-emerald-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Cifrado Seguro TLS 256-bit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* 2. Pilares de Rendimiento y Ventajas Financieras */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Cero Alquiler de POS</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Elimine costos fijos mensuales por terminales físicos. Cobre directamente desde cualquier smartphone o computadora conectada a internet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Tarifas Más Bajas</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Condiciones comerciales transparentes y tasas preferenciales negociadas por volumen, mejorando sensiblemente sus márgenes de ganancia.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Conciliación en Vivo</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Panel de control en tiempo real con detalle de cada transacción, estados de abono, filtros por fecha y exportación automática a Excel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg uppercase tracking-tight">Seguridad Bancaria</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Protocolos de tokenización y prevención de fraude respaldados por la infraestructura bancaria formal del sistema financiero peruano.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Módulos y Soluciones de Cobro */}
      <div id="modulos-cobros" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-xs text-blue-700 font-bold uppercase tracking-widest bg-blue-100/70 px-3.5 py-1.5 rounded-full">
            Canales de Recaudación Integrados
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            Modalidades Adaptadas a su Operación
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto font-light">
            Ya sea en una tienda física, en oficinas comerciales o en rutas de acopio rural, AgriCobros se adapta a su dinámica diaria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Modalidad 1: Punto de Venta Digital */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-cobragood-pos"
                src="/images/cobragood_pos.jpg"
                alt="Punto de Venta Digital AgriCobros"
                title="Punto de Venta Digital AgriCobros"
                section="Página AgriCobros"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-blue-900/90 text-blue-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Mostrador & Tiendas
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Punto de Venta Digital en Pantalla
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Permite a sus dependientes generar cobros rápidos en segundos desde la caja, mostrando un código QR dinámico o registrando la transacción sin depender de rollos de papel ni baterías de POS.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Acepta tarjetas de débito y crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Confirmación instantánea en pantalla</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sin costo por mantenimiento de equipos</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Activación en 24h</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20habilitar%20Punto%20de%20Venta%20Digital%20AgriCobros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Consultar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Modalidad 2: Recaudación en Campo & Rutas */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-cobragood-rutas"
                src="/images/cobragood_rutas.jpg"
                alt="Recaudación en Campo AgriCobros"
                title="Recaudación en Campo AgriCobros"
                section="Página AgriCobros"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-emerald-900/90 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Rutas de Acopio & Agro
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Cobros Móviles en Rutas de Distribución
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Ideal para agentes comerciales, despachadores y acopiadores agrícolas que visitan clientes en distintas localidades. Cobre en ruta de manera segura sin portar efectivo riesgoso.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reduce riesgo de robos o pérdida de efectivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Comprobante digital enviado por WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Control por usuario y vendedor</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Multi-Usuario</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20soluci%C3%B3n%20para%20Recaudaci%C3%B3n%20en%20Campo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Consultar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Modalidad 3: Enlaces de Cobro Web & WhatsApp */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="h-56 relative overflow-hidden bg-slate-950">
              <EditableMedia
                mediaKey="img-cobragood-links"
                src="/images/cobragood_links.jpg"
                alt="Enlaces de Pago WhatsApp"
                title="Enlaces de Pago WhatsApp"
                section="Página AgriCobros"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-xs">
                Ventas a Distancia
              </span>
              
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">
                  Enlaces de Cobro para WhatsApp & Web
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Cierre ventas por chat generando un enlace seguro personalizado con el monto exacto del pedido. Su cliente abre el link, ingresa su tarjeta y el pago se valida al instante.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sin necesidad de tener una tienda virtual compleja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Vigencia configurable por horas o fecha</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Notificación inmediata de abono confirmado</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">100% Digital</span>
                <a
                  href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20informaci%C3%B3n%20para%20Enlaces%20de%20Pago"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Consultar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tabla Comparativa: AgriCobros vs POS Físico Tradicional */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                Optimización de Costos Financieros
              </span>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
                Comparativa: AgriCobros vs Terminales POS Tradicionales
              </h3>
            </div>
            <span className="bg-cyan-500/20 text-cyan-300 font-mono text-xs px-4 py-1.5 rounded-full border border-cyan-400/30 font-semibold self-start md:self-auto">
              Ahorro Operativo Directo
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase">
                  <th className="py-3 px-4">Concepto Operativo</th>
                  <th className="py-3 px-4 text-emerald-400 font-bold">AgriCobros (AGRICARL)</th>
                  <th className="py-3 px-4 text-slate-400">Terminal POS Convencional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-light">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Alquiler mensual de equipo</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> S/ 0.00 (Sin costos de alquiler)
                  </td>
                  <td className="py-3.5 px-4 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" /> S/ 45 - S/ 90 mensuales por equipo
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Tarjetas y Bancos admitidos</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Débito y Crédito BCP, BBVA, Interbank, Scotiabank
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    Limitado según la red contratada
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Rollos de papel y repuestos</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> 100% Digital vía WhatsApp / SMS / Email
                  </td>
                  <td className="py-3.5 px-4 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" /> Gasto continuo en papel térmico
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Cobros fuera de local (rutas / campo)</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Desde cualquier celular con internet
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    Requiere POS inalámbrico con chip celular caro
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Liquidación en cuenta bancaria</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> T+1 / T+2 directo a su cuenta comercial
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    Variables con retenciones adicionales
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Llamado a la Acción Directo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-[#091b2c] via-[#10304f] to-[#081523] rounded-3xl p-8 sm:p-12 text-white border-2 border-blue-900/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
              Activación Inmediata de Cuenta Comercial
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              ¿Listo para empezar a recaudar con AgriCobros?
            </h3>
            <p className="text-slate-300 text-sm font-light">
              Nuestro equipo especializado lo asesora para configurar su cuenta, establecer sus credenciales bancarias y comenzar a recibir pagos desde hoy mismo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%20PERU%2C%20solicito%20atenci%C3%B3n%20para%20implementar%20AgriCobros"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Fintech</span>
            </a>
            <a
              href="mailto:operaciones@agricarlperu.com?subject=Solicitud%20Afiliacion%20AgriCobros%20AGRICARL"
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
