export interface MediaPreset {
  id: string;
  name: string;
  url: string;
  category: 'cacao' | 'sacha' | 'aguaje' | 'coco' | 'finanzas' | 'fondos';
}

export const MEDIA_PRESETS: MediaPreset[] = [
  // Cacao
  {
    id: 'preset-cacao-1',
    name: 'Granos de Cacao Seco Fermentado',
    url: '/images/cacao_grano_seco.jpg',
    category: 'cacao',
  },
  {
    id: 'preset-cacao-2',
    name: 'Cacao Criollo Fino de Aroma',
    url: '/images/cacao_criollo.jpg',
    category: 'cacao',
  },
  {
    id: 'preset-cacao-3',
    name: 'Nibs de Cacao 100% Puros',
    url: '/images/cacao_nibs.jpg',
    category: 'cacao',
  },
  {
    id: 'preset-cacao-4',
    name: 'Cacao Amazónico Selección',
    url: '/images/cacao_principal.jpg',
    category: 'cacao',
  },

  // Sacha Inchi
  {
    id: 'preset-sacha-1',
    name: 'Semillas Secas de Sacha Inchi',
    url: '/images/sacha_semilla.jpg',
    category: 'sacha',
  },
  {
    id: 'preset-sacha-2',
    name: 'Almendras de Sacha Inchi Tostadas',
    url: '/images/sacha_almendra.jpg',
    category: 'sacha',
  },
  {
    id: 'preset-sacha-3',
    name: 'Aceite Extra Virgen Prensado en Frío',
    url: '/images/sacha_aceite.jpg',
    category: 'sacha',
  },

  // Aguaje
  {
    id: 'preset-aguaje-1',
    name: 'Aguaje Silvestre Seleccionado',
    url: '/images/aguaje_hero.jpg',
    category: 'aguaje',
  },
  {
    id: 'preset-aguaje-2',
    name: 'Aguaje Fresco para Bebida y Pulpa',
    url: '/images/aguaje_fresco.jpg',
    category: 'aguaje',
  },
  {
    id: 'preset-aguaje-3',
    name: 'Aguaje Deshidratado Seco al Sol',
    url: '/images/aguaje_deshidratado.jpg',
    category: 'aguaje',
  },

  // Coco
  {
    id: 'preset-coco-1',
    name: 'Coco Fresco para Bebida (Agua de Coco)',
    url: '/images/coco_fresh.jpg',
    category: 'coco',
  },
  {
    id: 'preset-coco-2',
    name: 'Coco Rallado Deshidratado',
    url: '/images/coco_shredded.jpg',
    category: 'coco',
  },
  {
    id: 'preset-coco-3',
    name: 'Aceite de Coco Virgen Prensado en Frío',
    url: '/images/coco_oil.jpg',
    category: 'coco',
  },

  // Finanzas / POS
  {
    id: 'preset-finanzas-1',
    name: 'Punto de Venta Digital AgriCobros',
    url: '/images/cobragood_pos.jpg',
    category: 'finanzas',
  },
  {
    id: 'preset-finanzas-2',
    name: 'Cobros Móviles en Rutas de Distribución',
    url: '/images/cobragood_rutas.jpg',
    category: 'finanzas',
  },
  {
    id: 'preset-finanzas-3',
    name: 'Enlaces de Cobro WhatsApp y Web',
    url: '/images/cobragood_links.jpg',
    category: 'finanzas',
  },
  {
    id: 'preset-finanzas-4',
    name: 'Registro de Compras y Gastos Operativos',
    url: '/images/gestor_compras.jpg',
    category: 'finanzas',
  },
  {
    id: 'preset-finanzas-5',
    name: 'Registro de Ventas y Cuentas por Cobrar',
    url: '/images/gestor_ventas.jpg',
    category: 'finanzas',
  },
  {
    id: 'preset-finanzas-6',
    name: 'Generador TXT PLE Formato 5.2 SUNAT',
    url: '/images/gestor_ple.jpg',
    category: 'finanzas',
  },

  // Fondos
  {
    id: 'preset-fondos-1',
    name: 'División Agropecuaria San Martín',
    url: '/images/division-agro.jpg',
    category: 'fondos',
  },
  {
    id: 'preset-fondos-2',
    name: 'Fondo Agroforestal Amazónico',
    url: '/images/bg_bg-division-agro.jpg',
    category: 'fondos',
  },
  {
    id: 'preset-fondos-3',
    name: 'Refinadoras de Chocolate Industrial',
    url: '/images/refinadoras_hero_bg.jpg',
    category: 'fondos',
  },
];
