import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import { EditableMedia } from './EditableMedia';
import EditableBackground from './EditableBackground';
import refinadorasImg from '../assets/images/regenerated_image_1790266039019.jpg';
import premier8lbsImg from '../assets/images/regenerated_image_1790268749758.jpg';
import premier10lbsImg from '../assets/images/regenerated_image_1790268752105.jpg';
import refinadora20Img from '../assets/images/regenerated_image_1790268754682.jpg';
import refinadora50Img from '../assets/images/regenerated_image_1790268756540.jpg';
import refinadora100Img from '../assets/images/regenerated_image_1790268758359.jpg';
import refinadora150Img from '../assets/images/regenerated_image_1790268759858.jpg';
import refinadora200Img from '../assets/images/regenerated_image_1790268761471.jpg';
import { 
  ArrowLeft, 
  Sparkles, 
  PhoneCall, 
  Check, 
  FileSpreadsheet,
  Cog,
  ShieldCheck,
} from 'lucide-react';

interface RefinadorasPageProps {
  onBack: () => void;
}

interface RefinadoraModel {
  id: string;
  name: string;
  category: 'premier' | 'industrial';
  capacityLbs: string;
  capacityKg: string;
  motorSpecs: string;
  certifications: string;
  drumMaterial: string;
  stoneType: string;
  description: string;
  features: string[];
  image: string;
}

const REFINADORAS_MODELS: RefinadoraModel[] = [
  {
    id: 'premier-8lbs',
    name: 'Refinadora Premier Basculante 8 lbs',
    category: 'premier',
    capacityLbs: '8 lbs',
    capacityKg: 'Hasta 3.63 kg por batch',
    motorSpecs: 'Motor continuo de bajo consumo con protección térmica',
    certifications: 'CE / UL Approved',
    drumMaterial: 'Acero inoxidable AISI 304 grado alimentario',
    stoneType: 'Piedras de granito natural de alta densidad',
    description: 'Refinadora de mesa basculante ideal para micro-lotes de chocolate, laboratorios de desarrollo y formulación de pastas finas.',
    features: [
      'Mecanismo basculante (tilting) para vaciado y limpieza rápida',
      'Piedras cónicas de granito para una refinación fina y homogénea',
      'Diseño compacto de sobremesa'
    ],
    image: premier8lbsImg
  },
  {
    id: 'premier-10lbs',
    name: 'Refinadora Premier Basculante 10 lbs',
    category: 'premier',
    capacityLbs: '10 lbs',
    capacityKg: 'Hasta 4.54 kg por batch',
    motorSpecs: 'Motor de servicio continuo con ventilación forzada',
    certifications: 'CE / UL Approved',
    drumMaterial: 'Acero inoxidable AISI 304',
    stoneType: 'Piedras de granito natural de alta dureza',
    description: 'Mayor volumen en formato de sobremesa para talleres chocolateros en producción constante.',
    features: [
      'Capacidad ampliada a 4.54 kg por tanda',
      'Tambor basculante seguro con seguro de bloqueo',
      'Operación continua para ciclos completos de refinación'
    ],
    image: premier10lbsImg
  },
  {
    id: 'refinadora-20',
    name: 'Refinadora de Chocolate 20 lbs',
    category: 'industrial',
    capacityLbs: '20 lbs',
    capacityKg: 'Hasta 9 kg por batch',
    motorSpecs: 'Motorreductor industrial de velocidad ajustable',
    certifications: 'UL, CE y CSA Approved',
    drumMaterial: 'Acero inoxidable grado alimentario 304 reforzado',
    stoneType: 'Piedras cilíndricas macizas de granito natural',
    description: 'Refinadora semi-industrial diseñada para lotes medianos de chocolate y cremas de frutos secos.',
    features: [
      'Componentes, controles y motor certificados UL, CE y CSA',
      'Control de velocidad para regular la intensidad de refinación',
      'Chasis industrial de alta durabilidad'
    ],
    image: refinadora20Img
  },
  {
    id: 'refinadora-50',
    name: 'Refinadora de Chocolate 50 lbs',
    category: 'industrial',
    capacityLbs: '50 lbs',
    capacityKg: 'Hasta 23 kg por batch',
    motorSpecs: 'Motor industrial de alto par para trabajo continuo',
    certifications: 'UL, CE y CSA Approved',
    drumMaterial: 'Acero inoxidable grado sanitario 304',
    stoneType: 'Piedras de granito de gran diámetro',
    description: 'Equipo de refinación de alto rendimiento para empresas chocolateras en expansión comercial.',
    features: [
      'Capacidad de 23 kg por lote de refinación',
      'Certificaciones internacionales de seguridad eléctrica UL / CE / CSA',
      'Sistema de descarga basculante asistido'
    ],
    image: refinadora50Img
  },
  {
    id: 'refinadora-100',
    name: 'Refinadora de Chocolate 100 lbs',
    category: 'industrial',
    capacityLbs: '100 lbs',
    capacityKg: 'Hasta 45 kg por batch',
    motorSpecs: 'Motor industrial trifásico de servicio pesado',
    certifications: 'UL, CE y CSA Approved',
    drumMaterial: 'Acero inoxidable 304 de alta resistencia',
    stoneType: 'Conjunto de rodillos de granito pulido',
    description: 'Refinadora de alta productividad para plantas de procesamiento de cacao y confitería.',
    features: [
      'Procesamiento de 45 kg (100 lbs) por tanda',
      'Motores y controles normados UL, CE, CSA',
      'Mecanismo de inclinación para fácil descarga del licor'
    ],
    image: refinadora100Img
  },
  {
    id: 'refinadora-150',
    name: 'Refinadora de Chocolate 150 lbs',
    category: 'industrial',
    capacityLbs: '150 lbs',
    capacityKg: 'Hasta 68 kg por batch',
    motorSpecs: 'Motor industrial trifásico de alta potencia',
    certifications: 'UL, CE y CSA Approved',
    drumMaterial: 'Acero inoxidable sanitario 304',
    stoneType: 'Piedras de granito de máxima dureza',
    description: 'Refinadora de gran escala para plantas industriales de derivados de cacao con altos volúmenes.',
    features: [
      'Capacidad por batch de hasta 68 kg',
      'Componentes eléctricos y motor con aprobación UL, CE, CSA',
      'Estructura de uso continuo intensivo'
    ],
    image: refinadora150Img
  },
  {
    id: 'refinadora-200',
    name: 'Refinadora de Chocolate 200 lbs',
    category: 'industrial',
    capacityLbs: '200 lbs',
    capacityKg: 'Hasta 90 kg por batch',
    motorSpecs: 'Motor de servicio continuo de alto rendimiento',
    certifications: 'UL, CE y CSA Approved',
    drumMaterial: 'Acero inoxidable sanitario 304 / 316',
    stoneType: 'Piedras de granito industrial pesadas',
    description: 'El modelo de mayor capacidad para producción industrial continua de chocolate refinado.',
    features: [
      'Capacidad máxima de 90 kg (200 lbs) por lote',
      'Motores, controles y componentes con homologación UL, CE, CSA',
      'Mecanismo basculante electromecánico o asistido'
    ],
    image: refinadora200Img
  }
];

export default function RefinadorasPage({ onBack }: RefinadorasPageProps) {
  const [filter, setFilter] = useState<'all' | 'premier' | 'industrial'>('all');
  const { setImage, savePersistedMediaImmediately } = useMedia();

  

  const models = filter === 'all' 
    ? REFINADORAS_MODELS 
    : REFINADORAS_MODELS.filter(m => m.category === filter);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-slate-800 font-sans pb-20 bg-chocolate-tablet-subtle relative">
      
      
      {/* 1. Header Hero with Editable Background */}
      <EditableBackground
        sectionKey="bg-refinadoras-hero"
        title="Fondo Refinadoras de Chocolate"
        defaultImage="/images/refinadoras_hero_bg.jpg"
        defaultColor="#090d16"
        defaultOpacity={0.78}
        defaultPattern="chocolate"
        className="relative bg-slate-950 text-white pt-8 pb-14 border-b border-slate-800 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer mb-6 bg-white/5 px-3.5 py-2 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Maquinaria & Equipamiento</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                Refinadoras de Chocolate
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Venta y suministro de refinadoras de chocolate de sobremesa e industriales con capacidades desde 8 lbs (3.6 kg) hasta 200 lbs (90 kg por batch). Tambor de acero inoxidable, piedras de granito natural y motores con certificación UL, CE y CSA.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <a
                href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20de%20Refinadoras%20de%20Chocolate"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Cotizar por WhatsApp</span>
              </a>
              <a
                href="mailto:operaciones@agricarlperu.com?subject=Cotizacion%20Refinadoras%20de%20Chocolate"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span>Email de Ventas</span>
              </a>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-950/70 backdrop-blur-sm p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block text-[10px] uppercase">Rango de Capacidad</span>
              <span className="font-bold text-white text-sm">8 lbs a 200 lbs (90 kg)</span>
            </div>
            <div className="bg-slate-950/70 backdrop-blur-sm p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block text-[10px] uppercase">Piedras de Refinación</span>
              <span className="font-bold text-emerald-400 text-sm">Granito Natural</span>
            </div>
            <div className="bg-slate-950/70 backdrop-blur-sm p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block text-[10px] uppercase">Tambor</span>
              <span className="font-bold text-white text-sm">Acero Inox 304 Grado Alimentos</span>
            </div>
            <div className="bg-slate-950/70 backdrop-blur-sm p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block text-[10px] uppercase">Certificación Motores</span>
              <span className="font-bold text-amber-400 text-sm">UL, CE y CSA Approved</span>
            </div>
          </div>
        </div>
      </EditableBackground>

      {/* 2. Models Grid - Contenedor con Textura de Maquinaria Industrial y Acero Inoxidable */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-slate-300/80 bg-industrial-metallic overflow-hidden">
          
          {/* Remaches mecánicos decorativos en las 4 esquinas */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border border-slate-500/60 shadow-inner flex items-center justify-center opacity-70 pointer-events-none">
            <div className="w-1.5 h-[1px] bg-slate-600 rotate-45" />
          </div>
          <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border border-slate-500/60 shadow-inner flex items-center justify-center opacity-70 pointer-events-none">
            <div className="w-1.5 h-[1px] bg-slate-600 -rotate-45" />
          </div>
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border border-slate-500/60 shadow-inner flex items-center justify-center opacity-70 pointer-events-none">
            <div className="w-1.5 h-[1px] bg-slate-600 -rotate-45" />
          </div>
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border border-slate-500/60 shadow-inner flex items-center justify-center opacity-70 pointer-events-none">
            <div className="w-1.5 h-[1px] bg-slate-600 rotate-45" />
          </div>

          {/* Insignia técnica industrial de cabecera */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-300/70">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-slate-100 font-mono text-[10.5px] uppercase font-bold tracking-wider shadow-sm border border-slate-700">
                <Cog className="w-3.5 h-3.5 text-amber-400 animate-[spin_10s_linear_infinite]" />
                Línea de Maquinaria Industrial & Refinación
              </span>
              <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10.5px] text-slate-700 bg-white/80 px-2.5 py-1 rounded border border-slate-300 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Acero Inoxidable AISI 304 · Piedras de Granito Natural
              </span>
            </div>
            <span className="font-mono text-[10.5px] text-slate-500 font-semibold tracking-wider uppercase">
              Certificaciones UL · CE · CSA Approved
            </span>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Modelos de Refinadoras Disponibles
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Seleccione la capacidad adecuada para su taller artesanal o planta de refinación industrial.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                  filter === 'all' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white/90 text-slate-700 border border-slate-300 hover:bg-white'
                }`}
              >
                Todas ({REFINADORAS_MODELS.length})
              </button>
              <button
                onClick={() => setFilter('premier')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                  filter === 'premier' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'bg-white/90 text-slate-700 border border-slate-300 hover:bg-white'
                }`}
              >
                Premier de Sobremesa (8 y 10 lbs)
              </button>
              <button
                onClick={() => setFilter('industrial')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                  filter === 'industrial' 
                    ? 'bg-emerald-700 text-white shadow-md' 
                    : 'bg-white/90 text-slate-700 border border-slate-300 hover:bg-white'
                }`}
              >
                Refinadoras Industriales (20 a 200 lbs)
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div 
                key={model.id}
                className="bg-white/95 backdrop-blur-xs rounded-3xl border border-slate-200/90 overflow-hidden shadow-md hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 relative bg-slate-950 overflow-hidden">
                    <EditableMedia
                      mediaKey={`img-${model.id}`}
                      src={model.image}
                      alt={model.name}
                      title={model.name}
                      section="Refinadoras"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-slate-700">
                      Capacidad: {model.capacityLbs}
                    </span>

                    <span className="absolute bottom-3 left-3 text-amber-300 text-xs font-mono font-bold">
                      {model.capacityKg}
                    </span>

                    
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {model.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {model.description}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-mono">Certificación:</span>
                        <span className="font-bold text-amber-700">{model.certifications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-mono">Piedras:</span>
                        <span className="font-bold text-slate-800">{model.stoneType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-mono">Tambor:</span>
                        <span className="font-bold text-slate-800">{model.drumMaterial}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {model.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={`https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20solicito%20cotizaci%C3%B3n%20para%20${encodeURIComponent(model.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-brand-green text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Cotizar {model.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Specifications Table con Contenedor Metálico */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-slate-300/80 bg-industrial-metallic overflow-hidden space-y-4">
          
          {/* Remaches mecánicos decorativos */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border border-slate-500/60 shadow-inner flex items-center justify-center opacity-70 pointer-events-none">
            <div className="w-1.5 h-[1px] bg-slate-600 rotate-45" />
          </div>
          <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border border-slate-500/60 shadow-inner flex items-center justify-center opacity-70 pointer-events-none">
            <div className="w-1.5 h-[1px] bg-slate-600 -rotate-45" />
          </div>

          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-300/70">
            <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Tabla Resumen de Especificaciones Técnicas
            </h3>
          </div>

          <div className="overflow-x-auto bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/90 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider">
                  <th className="p-3.5 rounded-tl-xl">Modelo</th>
                  <th className="p-3.5">Capacidad Lbs</th>
                  <th className="p-3.5">Capacidad Kg</th>
                  <th className="p-3.5">Certificaciones</th>
                  <th className="p-3.5 rounded-tr-xl">Tipo de Tambor y Piedras</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {REFINADORAS_MODELS.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{m.name}</td>
                    <td className="p-3.5 text-slate-700 font-mono font-semibold">{m.capacityLbs}</td>
                    <td className="p-3.5 text-slate-700 font-mono">{m.capacityKg}</td>
                    <td className="p-3.5 font-semibold text-amber-700">{m.certifications}</td>
                    <td className="p-3.5 text-slate-600">{m.drumMaterial} + {m.stoneType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Direct Contact Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              ¿Deseas cotizar una refinadora de chocolate?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Contáctanos directamente para disponibilidad, precios y tiempos de entrega en todo el Perú.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://wa.me/51956352862?text=Hola%20AGRICARL%2C%20deseo%20cotizar%20Refinadoras%20de%20Chocolate"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
