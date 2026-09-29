import { jsPDF } from 'jspdf';

export interface BrochureOptions {
  companyName?: string;
  companyRuc?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
}

export function generateCorporateBrochure(options: BrochureOptions = {}) {
  const {
    companyName = 'AGRICARL PERÚ S.A.C.',
    companyRuc = '20611291001',
    email = 'operaciones@agricarlperu.com',
    phone = '+51 956 352 862',
    location = 'Moyobamba, San Martín, Perú',
    website = 'http://www.agricarlperu.com'
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 55, 'F');

  // Emerald Accent Strip
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 55, pageWidth, 3, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(companyName, 20, 25);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(167, 243, 208); // emerald-200
  doc.text('CONECTANDO AL AGRICULTOR CON EL MERCADO GLOBAL', 20, 34);

  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(`RUC: ${companyRuc}  |  Región San Martín  |  Amazonía del Perú`, 20, 44);

  // Body: Corporate Overview
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CATÁLOGO AGROINDUSTRIAL Y SUMINISTRO CORPORATIVO', 20, 72);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const intro =
    'AGRICARL PERÚ S.A.C. es una empresa agroindustrial con sede en Moyobamba, San Martín. Nos especializamos en la producción, acopio, selección y exportación de materias primas amazónicas de la más alta calidad y trazabilidad directa.';
  doc.text(doc.splitTextToSize(intro, pageWidth - 40), 20, 80);

  // Products Section
  const products = [
    {
      title: '1. Cacao Fino de Aroma (Granos Fermentados)',
      desc: 'Cacao orgánico y convencional de los valles del Alto Mayo. Fermentación controlada en cajones de madera, secado solar y bajo contenido de cadmio. Perfil frutal y floral para chocolatería fina de exportación.'
    },
    {
      title: '2. Sacha Inchi (Aceite Extra Virgen & Snacks Tostados)',
      desc: 'Superalimento con más del 48% de Omega 3 natural. Aceite extra virgen prensado en frío por debajo de 45°C y snacks tostados crujientes con sal marina o naturales.'
    },
    {
      title: '3. Derivados de Coco Amazónico (Aceite Virgen & Rallado Deshidratado)',
      desc: 'Cocos procesados en fresco para máxima pureza aromática, alto contenido de ácido láurico y triglicéridos de cadena media (MCT). Grado alimentario y cosmético.'
    },
    {
      title: '4. Refinadoras de Chocolate Bean-to-Bar',
      desc: 'Maquinaria industrial con rodillos de granito natural y tambor de acero inoxidable grado 304. Micronización sub-20 micras, capacidades de 5kg a 50kg con variador electrónico.'
    },
    {
      title: '5. AgriCobros / CobraGood (Fintech para el Agro)',
      desc: 'Solución digital para liquidación inmediata a productores rurales, emisión electrónica y trazabilidad de lotes en centros de acopio sin necesidad de conexión continua.'
    }
  ];

  let currentY = 100;
  products.forEach(p => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(18, currentY - 5, pageWidth - 36, 24, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(18, currentY - 5, pageWidth - 36, 24, 2, 2, 'S');

    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 78, 59); // emerald-900
    doc.text(p.title, 22, currentY + 2);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(p.desc, pageWidth - 48);
    doc.text(splitDesc, 22, currentY + 8);

    currentY += 28;
  });

  // Footer Contact Block
  doc.setFillColor(15, 23, 42);
  doc.rect(0, pageHeight - 35, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS OFICIALES DE CONTACTO Y COMERCIALIZACIÓN', 20, pageHeight - 24);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Email: ${email}   |   WhatsApp / Teléfono: ${phone}`, 20, pageHeight - 16);
  doc.text(`Ubicación: ${location}   |   Portal Web: ${website}`, 20, pageHeight - 9);

  doc.save(`Brochure_Corporativo_AGRICARL_${companyRuc}.pdf`);
}
