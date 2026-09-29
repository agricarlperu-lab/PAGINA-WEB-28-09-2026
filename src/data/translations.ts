import { SiteTextConfig, DEFAULT_SITE_TEXT, CommerceItem, COMMERCE_ITEMS } from '../data';

export type Language = 'es' | 'en';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    products: string;
    services: string;
    contact: string;
    back: string;
    exploreProducts: string;
    viewServices: string;
    brochurePdf: string;
    brochureDownloaded: string;
    generatingFile: string;
  };
  common: {
    welcomeTagline: string;
    superfood: string;
    fineAromaCacao: string;
    agroIndustry: string;
    agriculturalSupply: string;
    financialManagement: string;
    viewDetails: string;
  };
  divisions: {
    agroTitle: string;
    agroSubtitle: string;
    agroDesc: string;
    agroPoints: string[];
    fintechTitle: string;
    fintechSubtitle: string;
    fintechDesc: string;
    fintechPoints: string[];
  };
  about: {
    title: string;
    missionTitle: string;
    visionTitle: string;
    valuesTitle: string;
    valuesSubtitle: string;
    sustainability: string;
    sustainabilityDesc: string;
    innovation: string;
    innovationDesc: string;
    transparency: string;
    transparencyDesc: string;
  };
  products: {
    title: string;
  };
  services: {
    title: string;
  };
  contact: {
    attentionChannels: string;
    connectWithUs: string;
    readyToAssist: string;
    corporateInfo: string;
    mainOffice: string;
    centralPhone: string;
    officialEmail: string;
    officialPortal: string;
    businessHours: string;
    businessHoursVal: string;
    activeSupportLine: string;
    sendMessageDirect: string;
    fullName: string;
    emailAddress: string;
    phoneWhatsApp: string;
    subject: string;
    messagePlaceholder: string;
    sendDirect: string;
  };
  footer: {
    allRightsReserved: string;
  };
  siteText: SiteTextConfig;
  commerceItems: CommerceItem[];
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Quiénes Somos',
      products: 'Productos',
      services: 'Servicios',
      contact: 'Contacto',
      back: 'Volver al catálogo',
      exploreProducts: 'Explorar Catálogo de Productos',
      viewServices: 'Conocer Soluciones y Servicios',
      brochurePdf: 'Brochure PDF',
      brochureDownloaded: 'Brochure Corporativo descargado exitosamente',
      generatingFile: 'Generando archivo oficial...',
    },
    common: {
      welcomeTagline: 'AGRICARL PERÚ · Conectando al agricultor con el mercado',
      superfood: 'Superalimento Amazónico',
      fineAromaCacao: 'Cacao Fino de Aroma',
      agroIndustry: 'Agroindustria Amazónica',
      agriculturalSupply: 'Suministro Agrícola',
      financialManagement: 'Gestión Financiera',
      viewDetails: 'Ver Detalles y Ficha Técnica',
    },
    divisions: {
      agroTitle: 'División Suministro Agrícola',
      agroSubtitle: 'Materias Primas Orgánicas de la Amazonía',
      agroDesc: 'Comercialización y suministro a granel de superalimentos amazónicos con trazabilidad desde parcelas de agricultores asociados en San Martín hasta el mercado nacional e internacional.',
      agroPoints: [
        'Sacha Inchi en grano, almendra seleccionada y aceite nutracéutico virgen prensado en frío.',
        'Cacao fino de aroma fermentado y secado al sol, perfil sensorial de exportación.',
        'Aguaje fresco seleccionado y aguaje deshidratado al sol, rico en fitonutrientes naturales.',
        'Coco fresco de agua dulce, coco rallado deshidratado y aceite de coco virgen extra prensado.',
      ],
      fintechTitle: 'División Gestión Financiera',
      fintechSubtitle: 'Tecnología Transaccional & Soluciones de Cobro',
      fintechDesc: 'Herramientas de recaudación y gestión contable simplificada diseñadas para emprendimientos, distribuidores y cooperativas que necesitan optimizar sus cobranzas y reportes.',
      fintechPoints: [
        'AgriCobros: Cobranza presencial y a distancia con tarjetas de crédito/débito y comisiones líderes.',
        'Gestor Contable 5.2: Generación automática de asientos de Libro Diario Simplificado y archivos TXT para el PLE SUNAT.',
        'Maquinaria y Refinadoras de chocolate de mesa e industriales para chocolateros artesanales.',
      ],
    },
    about: {
      title: 'QUIÉNES SOMOS',
      missionTitle: 'Nuestra Misión',
      visionTitle: 'Nuestra Visión',
      valuesTitle: 'Nuestros Pilares y Valores',
      valuesSubtitle: 'El compromiso que guía cada eslabón de nuestra cadena de valor',
      sustainability: 'Sostenibilidad y Comercio Justo',
      sustainabilityDesc: 'Trabajamos directamente con familias agricultoras de la Amazonía, asegurando precios dignos, prácticas sin tala y protección activa de los ecosistemas.',
      innovation: 'Innovación Tecnológica Continua',
      innovationDesc: 'Integramos software de recaudación financiera y herramientas de gestión contable con la comercialización tradicional de materias primas.',
      transparency: 'Trazabilidad y Calidad Certificada',
      transparencyDesc: 'Garantizamos el origen, la pureza y los estándares técnicos de cada lote despachado a la industria alimentaria, cosmética y exportación.',
    },
    products: {
      title: 'Nuestras Materias Primas Amazónicas',
    },
    services: {
      title: 'Nuestros Servicios y Soluciones Tecnológicas',
    },
    contact: {
      attentionChannels: 'Canales de Atención Directa',
      connectWithUs: 'Conéctese con AGRICARL PERÚ',
      readyToAssist: 'Estamos listos para atender sus solicitudes de cotización, abastecimiento al por mayor o integración de soluciones financieras.',
      corporateInfo: 'Información Institucional',
      mainOffice: 'Sede Principal',
      centralPhone: 'Central Telefónica / WhatsApp',
      officialEmail: 'Correo Electrónico Oficial',
      officialPortal: 'Portal Web Oficial',
      businessHours: 'Horario de Atención Comercial',
      businessHoursVal: 'Lunes a Sábado: 8:00 AM – 6:00 PM (GMT-5)',
      activeSupportLine: 'LÍNEA DE ATENCIÓN DIRECTA DISPONIBLE',
      sendMessageDirect: 'Envíenos su consulta y un asesor comercial se comunicará a la brevedad.',
      fullName: 'Nombre Completo / Razón Social',
      emailAddress: 'Correo Electrónico Corporativo',
      phoneWhatsApp: 'Teléfono / WhatsApp de Contacto',
      subject: 'Asunto de su Consulta',
      messagePlaceholder: 'Detalle su requerimiento (volúmenes de producto, cotización, soporte o asesoría)...',
      sendDirect: 'Enviar Mensaje Directo',
    },
    footer: {
      allRightsReserved: 'Todos los derechos reservados.',
    },
    siteText: DEFAULT_SITE_TEXT,
    commerceItems: COMMERCE_ITEMS,
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      services: 'Services',
      contact: 'Contact',
      back: 'Back to catalog',
      exploreProducts: 'Explore Products Catalog',
      viewServices: 'View Tech Solutions & Services',
      brochurePdf: 'Brochure PDF',
      brochureDownloaded: 'Corporate Brochure successfully downloaded',
      generatingFile: 'Generating official file...',
    },
    common: {
      welcomeTagline: 'AGRICARL PERÚ · Connecting Farmers to the Market',
      superfood: 'Amazonian Superfood',
      fineAromaCacao: 'Fine Aroma Cacao',
      agroIndustry: 'Amazon Agroindustry',
      agriculturalSupply: 'Agricultural Supply',
      financialManagement: 'Financial Management',
      viewDetails: 'View Details & Tech Specs',
    },
    divisions: {
      agroTitle: 'Agricultural Supply Division',
      agroSubtitle: 'Organic Raw Materials from the Peruvian Amazon',
      agroDesc: 'Bulk commercialization and supply of Amazonian superfoods with direct traceability from smallholder partner farmers in the San Martín region to global markets.',
      agroPoints: [
        'Sacha Inchi grains, selected raw seeds, and cold-pressed extra virgin nutraceutical oil.',
        'Fine flavor cacao beans, naturally fermented and sun-dried for premium craft chocolatiers.',
        'Wild-harvested fresh Aguaje and sun-dried dehydrated Aguaje, rich in natural phytoestrogens.',
        'Fresh drinking coconut, pure dehydrated grated coconut, and cold-pressed virgin coconut oil.',
      ],
      fintechTitle: 'Financial Management Division',
      fintechSubtitle: 'Transactional Fintech & Collection Systems',
      fintechDesc: 'Smart payment collection and simplified accounting tools designed for agribusinesses, distributors, and cooperatives looking to optimize cash flows.',
      fintechPoints: [
        'AgriCobros: In-person POS and remote payment links accepting major debit/credit cards with competitive rates.',
        'Accounting Manager 5.2: Automatic journal entry generation and TXT export for SUNAT PLE compliance.',
        'Chocolate melangeurs and refiners for bean-to-bar artisanal chocolate makers.',
      ],
    },
    about: {
      title: 'ABOUT US',
      missionTitle: 'Our Mission',
      visionTitle: 'Our Vision',
      valuesTitle: 'Our Pillars & Values',
      valuesSubtitle: 'The core principles guiding every link of our value chain',
      sustainability: 'Sustainability & Fair Trade',
      sustainabilityDesc: 'We partner directly with farming families in the Peruvian Amazon, guaranteeing fair prices, zero-deforestation harvest, and rainforest preservation.',
      innovation: 'Continuous Technological Innovation',
      innovationDesc: 'We combine financial collection technology and automated accounting software with traditional raw material supply.',
      transparency: 'Traceability & Certified Quality',
      transparencyDesc: 'We verify the origin, purity, and technical standards of every batch delivered to food, cosmetic, and export industries.',
    },
    products: {
      title: 'Our Amazonian Raw Materials',
    },
    services: {
      title: 'Our Technological Services & Solutions',
    },
    contact: {
      attentionChannels: 'Direct Communication Channels',
      connectWithUs: 'Get in Touch with AGRICARL PERÚ',
      readyToAssist: 'We are ready to assist your wholesale supply inquiries, quote requests, or fintech integration.',
      corporateInfo: 'Corporate Information',
      mainOffice: 'Headquarters',
      centralPhone: 'Phone / WhatsApp Center',
      officialEmail: 'Official Email Address',
      officialPortal: 'Official Web Portal',
      businessHours: 'Business Hours',
      businessHoursVal: 'Monday to Saturday: 8:00 AM – 6:00 PM (GMT-5)',
      activeSupportLine: 'DIRECT CUSTOMER SERVICE LINE AVAILABLE',
      sendMessageDirect: 'Send us your message and a commercial representative will get back to you shortly.',
      fullName: 'Full Name / Company Name',
      emailAddress: 'Corporate Email Address',
      phoneWhatsApp: 'Phone / WhatsApp Number',
      subject: 'Subject of your Inquiry',
      messagePlaceholder: 'Describe your requirement (product volume, quotation, support, or advisory)...',
      sendDirect: 'Send Direct Message',
    },
    footer: {
      allRightsReserved: 'All rights reserved.',
    },
    siteText: {
      ...DEFAULT_SITE_TEXT,
      heroTagline: 'AGRICARL PERÚ · Connecting Farmers to the Market',
      companyMotto: 'AGRICARL PERÚ: Connecting Farmers to the Market',
      heroTitleLine1: 'SUPPLY SOLUTIONS',
      heroTitleHighlight1: '& VALUE CHAINS',
      heroTitleLine2: 'AND PAYMENT',
      heroTitleHighlight2: 'COLLECTION SYSTEMS',
      heroSubtitle: 'At AGRICARL PERÚ S.A.C., we specialize in sourcing and supplying authentic raw materials from the Peruvian Amazon, alongside our proprietary payment collection system AgriCobros and business accounting tools.',
      aboutTitle: 'ABOUT US',
      aboutDescription: 'AGRICARL PERÚ S.A.C. is an agroindustrial enterprise based in the San Martín region of Peru, committed to the sustainable development of Amazonian superfoods like Sacha Inchi and Fine Aroma Cacao, complemented with financial management technology.',
      missionText: 'To empower farmers and entrepreneurs through sustainable commercialization of high-grade organic commodities and transparent financial collection technology.',
      visionText: 'To become the benchmark articulators between sustainable Amazonian crops and accessible financial technology.',
      stat1Label: 'Selected High-Grade Grains',
      stat2Label: 'AgriCobros Platform 24/7',
      stat3Label: 'Accounting Manager 5.2',
      stat4Label: 'Fair Traceability & Origin',
      footerTagline: 'AGRICARL PERÚ · Connecting Farmers to the Market',
    },
    commerceItems: COMMERCE_ITEMS.map(item => {
      if (item.id === 'sacha-inchi') {
        return {
          ...item,
          title: 'Sacha Inchi',
          description: 'The Amazonian Superfood known as the Inca Peanut. Exceptional source of natural Omega-3, selected raw seeds, roasted snacks, and cold-pressed virgin nutraceutical oil.',
        };
      }
      if (item.id === 'cacao') {
        return {
          ...item,
          title: 'Fine Aroma Cacao',
          description: 'High-purity Peruvian Amazonian cacao beans, naturally fermented and sun-dried under strict quality controls for premium craft chocolate making.',
        };
      }
      if (item.id === 'aguaje-deshidratado') {
        return {
          ...item,
          title: 'Fresh and Sun-Dried Aguaje',
          description: 'High-density Amazonian fruit (Mauritia flexuosa). Selected wild-harvested fresh fruit and solar-dehydrated dried pulp rich in natural provitamin A and antioxidants.',
        };
      }
      if (item.id === 'coco-derivados') {
        return {
          ...item,
          title: 'Fresh Coconut & Byproducts',
          description: 'Comprehensive utilization of Peruvian Amazon coconut: Fresh drinking coconut water, dehydrated grated coconut pulp, and pure cold-pressed extra virgin coconut oil.',
        };
      }
      if (item.id === 'refinadoras-chocolate') {
        return {
          ...item,
          title: 'Chocolate Refiners & Melangeurs',
          description: 'Tabletop and commercial chocolate stone grinders (Premier 8 lbs, 10 lbs, and high-capacity batch refiners) with granite stones and stainless steel drums.',
        };
      }
      if (item.id === 'gestion-recaudacion') {
        return {
          ...item,
          title: 'AgriCobros Payment Collection',
          description: 'Streamline your commercial payments with AgriCobros. Accept credit and debit cards from top national banks with rapid settlement and competitive merchant rates.',
        };
      }
      if (item.id === 'gestor-contable') {
        return {
          ...item,
          title: 'Accounting Manager 5.2',
          description: 'Automated journal entry system for the Simplified Journal Format 5.2 using the current General Business Accounting Plan (PCGE) with instant PLE SUNAT TXT generation.',
        };
      }
      return item;
    }),
  }
};
