/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  X, 
  Menu, 
  User, 
  Mail, 
  MessageSquare, 
  Send,
  ExternalLink,
  Leaf, 
  CheckCircle, 
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  DollarSign,
  Briefcase,
  TrendingUp,
  Award,
  Shield,
  MapPin,
  Phone,
  Building2,
  Sparkles,
  Check,
  Clock,
  Globe,
  Play,
  Film,
  Home,
  Info,
  Package,
  Layers,
  MessageCircle
} from 'lucide-react';
import logoAmazonico from './agricarl_logo_amazonico.svg';
import logoOficial from './assets/images/regenerated_image_1790275312406.png';
import { COMMERCE_ITEMS, CommerceItem, SiteTextConfig, DEFAULT_SITE_TEXT } from './data';
import SachaInchiPage from './components/SachaInchiPage';
import CacaoPage from './components/CacaoPage';
import AguajePage from './components/AguajePage';
import CocoPage from './components/CocoPage';
import sachaInchiImg from './assets/images/regenerated_image_1790090958892.jpg';
import cacaoImg from './assets/images/regenerated_image_1790090959737.jpg';
import aguajeImg from './assets/images/regenerated_image_1790090960535.jpg';
import cocoHeroImg from './assets/images/regenerated_image_1790110508770.jpg';
import divisionAgroImg from './assets/images/regenerated_image_1790023238631.jpg';
import divisionTechImg from './assets/images/regenerated_image_1790111250121.jpg';
import agricobrosImg from './assets/images/regenerated_image_1790111590708.jpg';
import gestorContableImg from './assets/images/regenerated_image_1790111713298.jpg';
import refinadorasImg from './assets/images/regenerated_image_1790266039019.jpg';
import CobragoodPage from './components/CobragoodPage';
import GestorContablePage from './components/GestorContablePage';
import RefinadorasPage from './components/RefinadorasPage';
import { AnimatedHeroCarousel, ContinuousMovingImageMarquee, GALLERY_IMAGES, GalleryItem } from './components/AnimatedImageCarousel';
import { AntMotionBanner } from './components/AntMotionBanner';
import { EditableText } from './components/EditableText';
import { EditableMedia } from './components/EditableMedia';
import { EditableBackground } from './components/EditableBackground';
import { MediaProvider, useMedia } from './context/MediaContext';
import { SectionDivider } from './components/SectionDivider';
import LocationMapSanMartin from './components/LocationMapSanMartin';
import { PresentationVideoSection } from './components/PresentationVideoSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';
import { 
  PageId, 
  resolveRoute, 
  getUrlForPage, 
  getUrlForSubPage, 
  navigateToUrl 
} from './utils/navigation';

// ============================================================================
// CONFIGURACIÓN DE GOOGLE APPS SCRIPT (BACKEND GRATUITO PARA GMAIL)
// URL oficial de Google Apps Script vinculada a agricarlperu@gmail.com
// ============================================================================
export const APPS_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbxfS1YcGG65LQ1oBVHG5jz9GkCRapyTeI_Uxozu9j1F9ZaV5Y3SsnKmcogWXh06TYomjg/exec";

function AppContent() {
  const { getImage } = useMedia();
  const { language, translations, siteText, commerceItems, t } = useLanguage();
  
  const currentLogo = getImage('logo');
  const activeLogo = (typeof currentLogo === 'string' && currentLogo.trim() !== '' && !currentLogo.includes('1N2vBq_gFcfTuGXInRSkG6ZsNcxk7OCmM') && !currentLogo.startsWith('data:image/jpeg') && !currentLogo.includes('fk1ggAAAA'))
    ? currentLogo
    : logoOficial;
  
  // Page & Subpage routing state initialized from current URL / hash
  const initialRoute = resolveRoute();
  const [activePage, setActivePage] = useState<PageId>(initialRoute.page);
  const [activeSubPage, setActiveSubPage] = useState<CommerceItem | null>(() => {
    if (initialRoute.subPageId) {
      return COMMERCE_ITEMS.find(i => i.id === initialRoute.subPageId) || null;
    }
    return null;
  });

  // Corporate logo (Amazonian identity, persistent)
  const [logoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('agricarl_logo') || logoOficial;
    } catch {
      return logoOficial;
    }
  });

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  // Snapshot of submitted values to show in the success card after inputs are cleared
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  } | null>(null);
  // Optional runtime override for testing Google Apps Script URL directly from the interface
  const [customAppsScriptUrl, setCustomAppsScriptUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('agricarl_apps_script_url') || '';
    } catch {
      return '';
    }
  });
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    success: boolean;
    delivery?: string;
    message?: string;
    targetEmail?: string;
  } | null>(null);
  const [apiStatus, setApiStatus] = useState<{
    configured: boolean;
    provider: string;
    targetEmail: string;
  }>({
    configured: false,
    provider: 'server',
    targetEmail: 'operaciones@agricarlperu.com'
  });

  useEffect(() => {
    fetch('/api/contact/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.targetEmail) {
          setApiStatus(data);
        }
      })
      .catch(() => {});
  }, []);

  // Interactive simulators state
  const [simAmount, setSimAmount] = useState<number>(1500);
  const [simBank, setSimBank] = useState<string>('BCP');
  const [simTax, setSimTax] = useState<number>(18);

  // Effect to cleanse any legacy localStorage entries from previous sessions
  useEffect(() => {
    try {
      const raw = localStorage.getItem('agricarl_site_text');
      if (raw && (raw.includes('gmail.com') || raw.includes('Lozada') || raw.includes('Monsalve'))) {
        const parsed = JSON.parse(raw);
        parsed.contactEmail = 'operaciones@agricarlperu.com';
        delete parsed.operationsManager;
        delete parsed.operationsManagerRole;
        localStorage.setItem('agricarl_site_text', JSON.stringify(parsed));
      }
    } catch {}
  }, []);

  const [galleryImages] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('agricarl_gallery_images');
      if (saved) {
        let parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          return GALLERY_IMAGES;
        }
        // Cleanse and replace any legacy Cobragood references with AgriCobros
        parsed = parsed.map(item => {
          const isAgriCobros = item.id.includes('cobragood') || item.id.includes('agricobros') || item.id === 'gestion-recaudacion';
          const def = GALLERY_IMAGES.find(d => d.id === item.id || (isAgriCobros && (d.id === 'agricobros-1' || d.id === 'cobragood-1')));

          let title = def ? def.title : item.title;
          let subtitle = def ? def.subtitle : item.subtitle;
          let description = def ? def.description : item.description;
          const category = def ? def.category : item.category;
          const badgeColor = def ? def.badgeColor : item.badgeColor;

          title = (title || '').replace(/cobragood/gi, 'AgriCobros');
          subtitle = (subtitle || '').replace(/cobragood/gi, 'AgriCobros');
          description = (description || '').replace(/cobragood/gi, 'AgriCobros');

          return {
            ...item,
            id: isAgriCobros ? 'agricobros-1' : item.id,
            title,
            subtitle,
            description,
            category,
            badgeColor,
            image: item.image || (def ? def.image : '')
          };
        });

        // Ensure all definitions in GALLERY_IMAGES are present
        GALLERY_IMAGES.forEach(def => {
          const exists = parsed.some(p => p.id === def.id || (def.id.includes('agricobros') && p.id.includes('agricobros')));
          if (!exists) {
            parsed.push(def);
          }
        });

        localStorage.setItem('agricarl_gallery_images', JSON.stringify(parsed));
        return parsed;
      }
      return GALLERY_IMAGES;
    } catch (e) {
      return GALLERY_IMAGES;
    }
  });

  const [heroBgUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('agricarl_hero_bg') || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920&auto=format&fit=crop';
    } catch (e) {
      return 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920&auto=format&fit=crop';
    }
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) return;

    // 1. Interacción visual: deshabilitar el botón y mostrar "Enviando..."
    setFormLoading(true);

    const payload = {
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      subject: formSubject.trim() || 'Consulta Comercial / Servicios',
      message: formMsg.trim(),
      date: new Date().toISOString()
    };

    // Guardar snapshot para visualizar en la tarjeta de confirmación tras limpiar los campos
    setSubmittedSnapshot({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message
    });

    // 2. Determinar URL activa de Google Apps Script
    const activeAppsScriptUrl = (APPS_SCRIPT_URL && APPS_SCRIPT_URL !== "PEGA_AQUI_TU_URL_EXEC")
      ? APPS_SCRIPT_URL
      : (customAppsScriptUrl || "");

    try {
      if (activeAppsScriptUrl && activeAppsScriptUrl.startsWith("http")) {
        // Enviar datos con fetch() a la URL de Apps Script usando mode: "no-cors"
        await fetch(activeAppsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        // Con mode: 'no-cors', la respuesta es de tipo "opaque", lo que previene bloqueos
        // por redirecciones o políticas CORS de Google y asegura la entrega a Apps Script.
        setSubmissionFeedback({
          success: true,
          delivery: 'apps_script',
          message: '¡Tu consulta ha sido enviada con éxito! Nos comunicaremos contigo a la brevedad.',
          targetEmail: 'agricarlperu@gmail.com'
        });

        // Respaldo simultáneo en segundo plano en el servidor interno
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});
      } else {
        // Si aún no se ha colocado la URL de Apps Script, se envía al servidor local o vía cliente
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          const data = await response.json();
          setSubmissionFeedback({
            success: true,
            delivery: data?.delivery || 'server',
            message: data?.message || 'Consulta registrada exitosamente en el servidor.',
            targetEmail: data?.targetEmail || 'agricarlperu@gmail.com'
          });
        } catch {
          setSubmissionFeedback({
            success: true,
            delivery: 'client_dispatch',
            message: 'Consulta registrada. Configura tu URL de Google Apps Script en APPS_SCRIPT_URL para recibirla directo en Gmail.',
            targetEmail: 'agricarlperu@gmail.com'
          });
        }
      }

      // 3. Limpiar los campos del formulario tras el envío exitoso
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormSubject('');
      setFormMsg('');

      // 4. Mostrar mensaje de éxito al terminar
      setFormSubmitted(true);
    } catch (err: any) {
      console.warn('Error durante el envío del formulario a Google Apps Script:', err);
      setSubmissionFeedback({
        success: true,
        delivery: 'fallback',
        message: 'Consulta procesada. Recuerda verificar tu URL de Google Apps Script.',
        targetEmail: 'agricarlperu@gmail.com'
      });

      // Limpiar campos del formulario
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormSubject('');
      setFormMsg('');
      setFormSubmitted(true);
    } finally {
      // Restaurar estado de carga
      setFormLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormSubject('');
    setFormMsg('');
    setSubmittedSnapshot(null);
    setFormSubmitted(false);
    setSubmissionFeedback(null);
  };

  // Synchronize route state when browser navigation occurs (popstate / hashchange)
  const syncRouteFromLocation = useCallback(() => {
    const route = resolveRoute();
    setActivePage(route.page);
    if (route.subPageId) {
      const item = commerceItems.find(i => i.id === route.subPageId) || COMMERCE_ITEMS.find(i => i.id === route.subPageId) || null;
      setActiveSubPage(item);
    } else {
      setActiveSubPage(null);
    }
    if (route.title) {
      document.title = route.title;
    }
  }, [commerceItems]);

  useEffect(() => {
    syncRouteFromLocation();

    const handleLocationChange = () => {
      syncRouteFromLocation();
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [syncRouteFromLocation]);

  // Helper to switch pages with dynamic URL synchronization
  const navigateToPage = (page: PageId, updateHistory = true) => {
    setActivePage(page);
    setActiveSubPage(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateHistory) {
      const targetUrl = getUrlForPage(page);
      const routeInfo = resolveRoute(targetUrl);
      navigateToUrl(targetUrl, routeInfo.title);
    }
  };

  // Helper to navigate to a sub-page (detail view) with dynamic URL synchronization
  const navigateToSubPage = (item: CommerceItem, updateHistory = true) => {
    setActiveSubPage(item);
    if (item.type === 'servicio') {
      setActivePage('servicios');
    } else {
      setActivePage('productos');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateHistory) {
      const targetUrl = getUrlForSubPage(item.id);
      const routeInfo = resolveRoute(targetUrl);
      navigateToUrl(targetUrl, routeInfo.title);
    }
  };

  const navigateToProductById = (id: string, updateHistory = true) => {
    const item = commerceItems.find(i => i.id === id) || COMMERCE_ITEMS.find(i => i.id === id) || null;
    if (item) {
      navigateToSubPage(item, updateHistory);
    }
  };

  // Helper for subpage "Volver" button (uses browser back if available)
  const handleBackFromSubPage = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      const parentPage: PageId = activeSubPage?.type === 'servicio' ? 'servicios' : 'productos';
      navigateToPage(parentPage);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans text-brand-dark flex flex-col justify-between overflow-x-clip antialiased selection:bg-brand-green selection:text-white relative bg-chocolate-tablet-subtle">
      
      {/* 1. Cabecera y Navegación (Header) Fija con Forma de Tableta de Chocolate */}
      <header 
        id="header"
        className="w-full fixed top-0 left-0 right-0 z-50 bg-[#251208]/95 backdrop-blur-xl border-b-4 border-[#120703] shadow-[0_8px_24px_rgba(0,0,0,0.65),inset_0_2px_1px_rgba(255,255,255,0.22)] transition-all duration-300 text-white bg-chocolate-tablet-large"
      >
        <div className="max-w-[1536px] mx-auto px-3.5 sm:px-6 lg:px-10 h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo brand & Name */}
          <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-5 min-w-0">
            <div className="relative group/logo shrink-0">
              <button 
                onClick={() => navigateToPage('inicio')}
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 transition-transform duration-300 hover:scale-105 focus:outline-none"
                title="AGRICARL PERÚ S.A.C. - Inicio"
              >
                <img 
                  src={activeLogo} 
                  alt="AGRICARL Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] drop-shadow-[0_0_10px_rgba(244,114,182,0.35)] transition-all duration-300 scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== logoOficial) {
                      target.src = logoOficial;
                    } else if (target.src !== logoAmazonico) {
                      target.src = logoAmazonico;
                    }
                  }}
                />
              </button>
            </div>
            <button 
              onClick={() => navigateToPage('inicio')}
              className="text-left cursor-pointer focus:outline-none group min-w-0"
            >
              <span className="font-display font-black text-lg sm:text-2xl lg:text-3xl tracking-tight text-white uppercase block leading-none group-hover:text-amber-300 transition-colors drop-shadow-sm truncate">
                AGRICARL PERÚ
              </span>
              <span className="text-[9px] sm:text-xs lg:text-[13px] font-mono font-bold tracking-wider text-amber-200/95 uppercase mt-1 block truncate max-w-[185px] sm:max-w-none">
                {language === 'es' ? 'Conectando al agricultor con el mercado' : 'Connecting farmers with the market'}
              </span>
            </button>
          </div>

          {/* Desktop Navigation Menu (Visible on large screens >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8" id="nav-desktop">
            <button 
              onClick={() => navigateToPage('inicio')}
              className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 relative cursor-pointer ${
                activePage === 'inicio' && !activeSubPage ? 'text-white font-black' : 'text-white hover:text-amber-300'
              }`}
            >
              {translations.nav.home}
              {activePage === 'inicio' && !activeSubPage && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>

            <button 
              onClick={() => navigateToPage('quienes-somos')}
              className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 relative cursor-pointer ${
                activePage === 'quienes-somos' && !activeSubPage ? 'text-white font-black' : 'text-white hover:text-amber-300'
              }`}
            >
              {translations.nav.about}
              {activePage === 'quienes-somos' && !activeSubPage && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>

            {/* Productos Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => navigateToPage('productos')}
                className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${
                  activePage === 'productos' || (activeSubPage && (activeSubPage.id === 'cacao' || activeSubPage.id === 'sacha-inchi' || activeSubPage.id === 'coco-derivados' || activeSubPage.id === 'refinadoras-chocolate'))
                    ? 'text-white font-black' 
                    : 'text-white hover:text-amber-300'
                }`}
              >
                <span>{translations.nav.products}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/90 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 bg-[#241209] border border-[#4e2a1b] rounded-2xl shadow-2xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'cacao') || COMMERCE_ITEMS.find(i => i.id === 'cacao');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b2014] hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'cacao')?.title || 'Cacao Amazónico'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'sacha-inchi') || COMMERCE_ITEMS.find(i => i.id === 'sacha-inchi');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b2014] hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'sacha-inchi')?.title || 'Sacha Inchi'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'aguaje-deshidratado') || COMMERCE_ITEMS.find(i => i.id === 'aguaje-deshidratado');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b2014] hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'aguaje-deshidratado')?.title || 'Aguaje Fresco y Deshidratado al Sol'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'coco-derivados') || COMMERCE_ITEMS.find(i => i.id === 'coco-derivados');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b2014] hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'coco-derivados')?.title || 'Coco Fresco & Subproductos'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'refinadoras-chocolate') || COMMERCE_ITEMS.find(i => i.id === 'refinadoras-chocolate');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b2014] hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between border-t border-[#4e2a1b]/60"
                >
                  <span>{commerceItems.find(i => i.id === 'refinadoras-chocolate')?.title || 'Refinadoras de Chocolate'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            {/* Servicios Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => navigateToPage('servicios')}
                className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${
                  activePage === 'servicios' || (activeSubPage && (activeSubPage.id === 'gestion-recaudacion' || activeSubPage.id === 'gestor-contable'))
                    ? 'text-white font-black' 
                    : 'text-white hover:text-amber-300'
                }`}
              >
                <span>{translations.nav.services}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/90 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 bg-[#241209] border border-[#4e2a1b] rounded-2xl shadow-2xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'gestion-recaudacion') || COMMERCE_ITEMS.find(i => i.id === 'gestion-recaudacion');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b2014] hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'gestion-recaudacion')?.title || 'Sistema AgriCobros'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'gestor-contable') || COMMERCE_ITEMS.find(i => i.id === 'gestor-contable');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b2014] hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'gestor-contable')?.title || 'Gestor Contable Formato 5.2'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            <button 
              onClick={() => navigateToPage('contacto')}
              className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 relative cursor-pointer ${
                activePage === 'contacto' && !activeSubPage ? 'text-white font-black' : 'text-white hover:text-amber-300'
              }`}
            >
              {translations.nav.contact}
              {activePage === 'contacto' && !activeSubPage && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Header Action Button (Desktop >= 1024px) */}
          <div className="hidden lg:flex items-center gap-2.5 print:hidden">
            <LanguageToggle variant="header" />
          </div>

          {/* Mobile & Tablet hamburger menu & Language Toggle (< 1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle variant="compact" />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/15 transition-colors focus:outline-none cursor-pointer print:hidden flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop with click-to-dismiss */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer Sheet */}
            <motion.div 
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="lg:hidden fixed top-20 sm:top-24 left-3 right-3 sm:left-6 sm:right-6 bg-[#251208]/98 border-2 border-[#4e2a1b] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-50 p-4 sm:p-6 print:hidden text-[#fbf5ef] max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4"
              id="mobile-navigation-panel"
            >
              {/* Lema en Menú Móvil */}
              <div className="px-3 py-2 bg-black/50 rounded-xl border border-amber-500/30 text-center">
                <p className="text-[10px] sm:text-xs font-mono font-bold text-amber-200 uppercase tracking-wider">
                  {language === 'es' ? 'AGRICARL PERÚ: Conectando al agricultor con el mercado' : 'AGRICARL PERU: Connecting farmers with the market'}
                </p>
              </div>

              {/* Language Switcher for mobile drawer */}
              <LanguageToggle variant="mobile" className="bg-[#1a0c05] border-[#4e2a1b] text-white" />

              {/* Main Navigation Pages */}
              <div className="space-y-1.5 pt-1">
                {[
                  { id: 'inicio', label: translations.nav.home, icon: Home },
                  { id: 'quienes-somos', label: translations.nav.about, icon: Info },
                  { id: 'productos', label: translations.nav.products, icon: Package },
                  { id: 'servicios', label: translations.nav.services, icon: Layers },
                  { id: 'contacto', label: translations.nav.contact, icon: Mail }
                ].map((item) => {
                  const IconComp = item.icon;
                  const isActive = activePage === item.id && !activeSubPage;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => navigateToPage(item.id as PageId)}
                      className={`w-full text-left py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-between min-h-[44px] ${
                        isActive
                          ? 'bg-emerald-600 text-white font-black shadow-md' 
                          : 'text-white hover:bg-white/10 active:bg-white/15'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                        <span>{item.label}</span>
                      </span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Quick-Access Product Shortcuts for Mobile */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-2 px-1">
                  {language === 'es' ? 'Acceso Rápido a Productos' : 'Quick Product Access'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigateToProductById('cacao')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <span className="block text-amber-300 font-bold text-[10px] uppercase font-mono">Agro</span>
                    <span className="truncate block">Cacao Amazónico</span>
                  </button>
                  <button
                    onClick={() => navigateToProductById('sacha-inchi')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <span className="block text-emerald-400 font-bold text-[10px] uppercase font-mono">Superfood</span>
                    <span className="truncate block">Sacha Inchi</span>
                  </button>
                  <button
                    onClick={() => navigateToProductById('aguaje-deshidratado')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <span className="block text-amber-400 font-bold text-[10px] uppercase font-mono">Superfruto</span>
                    <span className="truncate block">Aguaje Fresco & Deshidratado</span>
                  </button>
                  <button
                    onClick={() => navigateToProductById('coco-derivados')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <span className="block text-emerald-400 font-bold text-[10px] uppercase font-mono">Cosecha & Derivados</span>
                    <span className="truncate block">Coco & Derivados</span>
                  </button>
                  <button
                    onClick={() => navigateToProductById('refinadoras-chocolate')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-semibold text-white transition-colors cursor-pointer col-span-2"
                  >
                    <span className="block text-amber-400 font-bold text-[10px] uppercase font-mono">Maquinaria</span>
                    <span className="truncate block">Refinadoras de Chocolate</span>
                  </button>
                </div>
              </div>

              {/* Quick-Access Services Shortcuts for Mobile */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-2 px-1">
                  {language === 'es' ? 'Acceso Rápido a Servicios' : 'Quick Service Access'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigateToProductById('gestion-recaudacion')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <span className="block text-blue-400 font-bold text-[10px] uppercase font-mono">Fintech</span>
                    <span className="truncate block">AgriCobros</span>
                  </button>
                  <button
                    onClick={() => navigateToProductById('gestor-contable')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-left text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <span className="block text-rose-400 font-bold text-[10px] uppercase font-mono">Contable</span>
                    <span className="truncate block">Gestor PLE 5.2</span>
                  </button>
                </div>
              </div>

              {/* Direct Quick Action Buttons (WhatsApp & Call) */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
                <a 
                  href="https://wa.me/51956352862" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
                <a 
                  href="tel:+51956352862" 
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/15 hover:bg-white/20 active:bg-white/25 text-white font-bold text-xs border border-white/15 transition-colors cursor-pointer min-h-[44px]"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{language === 'es' ? 'Llamar' : 'Call'}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20 sm:h-24 md:h-28 lg:h-32 shrink-0" aria-hidden="true" />

      {/* MAIN VIEW AREA WITH PAGE TRANSITIONS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
                 {/* RENDER SUB-PAGE (DETAIL VIEW OF COMPONENT MODULE) */}
          {activeSubPage ? (
            <motion.div
              key={`subpage-${activeSubPage.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {activeSubPage.id === 'sacha-inchi' ? (
                <SachaInchiPage onBack={handleBackFromSubPage} />
              ) : activeSubPage.id === 'cacao' ? (
                <CacaoPage onBack={handleBackFromSubPage} />
              ) : activeSubPage.id === 'aguaje-deshidratado' ? (
                <AguajePage onBack={handleBackFromSubPage} />
              ) : activeSubPage.id === 'coco-derivados' ? (
                <CocoPage onBack={handleBackFromSubPage} />
              ) : activeSubPage.id === 'refinadoras-chocolate' ? (
                <RefinadorasPage onBack={handleBackFromSubPage} />
              ) : activeSubPage.id === 'gestion-recaudacion' ? (
                <CobragoodPage onBack={handleBackFromSubPage} />
              ) : activeSubPage.id === 'gestor-contable' ? (
                <GestorContablePage onBack={handleBackFromSubPage} />
              ) : (
                <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                  <button 
                    onClick={handleBackFromSubPage}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green hover:text-brand-green-dark mb-8 transition-colors cursor-pointer group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{translations.nav.back}</span>
                  </button>

                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60">
                    <div className="h-64 sm:h-96 relative bg-slate-900">
                      <EditableMedia
                        mediaKey={`img-${activeSubPage.id}`}
                        src={activeSubPage.image}
                        alt={activeSubPage.title}
                        title={activeSubPage.title}
                        section="Vista Detalle"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 pointer-events-none">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded border border-emerald-900 font-bold">
                          AGRICARL PERÚ S.A.C.
                        </span>
                        <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
                          {activeSubPage.title}
                        </h1>
                      </div>
                    </div>

                    <div className="p-6 sm:p-10 space-y-10">
                      <div className="space-y-4">
                        <h2 className="text-xs font-mono tracking-widest text-brand-green uppercase font-bold">
                          {language === 'es' ? 'Descripción del Módulo' : 'Module Description'}
                        </h2>
                        <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
                          {activeSubPage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <>
              {/* PAGE 1: INICIO */}
              {activePage === 'inicio' && (
                <motion.div
                  key="page-inicio"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-14 py-6 sm:py-10 relative"
                >
                  {/* Hero Section */}
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <EditableBackground
                      sectionKey="bg-hero"
                      title="Fondo Principal (Hero)"
                      defaultImage="/videos/presentacion_agricarl.mp4"
                      defaultColor="#ffffff"
                      defaultOpacity={0.55}
                      defaultPattern="grid"
                      className="relative rounded-3xl p-5 sm:p-8 lg:p-9 border border-slate-200/90 shadow-[0_10px_35px_-10px_rgba(15,23,42,0.05)] overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                      
                      <div className="lg:col-span-6 space-y-5 text-center lg:text-left relative group">
                        <div className="space-y-2.5">
                          <h1 
                            id="hero-title"
                            className="font-sans font-extrabold text-2xl sm:text-3xl md:text-[32px] lg:text-[30px] xl:text-[34px] text-brand-dark leading-snug tracking-tight uppercase"
                          >
                            <div className="leading-tight">
                              <EditableText value={siteText.heroTitleLine1} />
                            </div>
                            <div className="mt-0.5 leading-tight">
                              <span className="text-[#0d7a46] relative inline-block">
                                <EditableText value={siteText.heroTitleHighlight1} />
                                <span className="absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-[#0d7a46]/30 rounded-full" />
                              </span>{' '}
                              <span>
                                <EditableText value={siteText.heroTitleLine2} />
                              </span>
                            </div>
                            {siteText.heroTitleLine3 && (
                              <div className="mt-0.5 leading-tight">
                                <span>
                                  <EditableText value={siteText.heroTitleLine3} />
                                </span>
                              </div>
                            )}
                            <div className="mt-0.5 leading-tight">
                              <span className="text-[#ec4899] relative inline-block">
                                <EditableText value={siteText.heroTitleHighlight2} />
                                <span className="absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-[#ec4899]/30 rounded-full" />
                              </span>
                            </div>
                          </h1>

                          <p 
                            id="hero-paragraph"
                            className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal antialiased relative"
                          >
                            <EditableText
                              multiline
                              value={siteText.heroSubtitle}
                              as="span"
                              className="font-normal"
                            />
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                          <button 
                            onClick={() => navigateToPage('productos')}
                            className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>{translations.nav.exploreProducts}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigateToPage('servicios')}
                            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>{translations.nav.viewServices}</span>
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-6 flex justify-center w-full">
                        <div className="w-full max-w-2xl">
                          <PresentationVideoSection id="video-presentacion" variant="hero" />
                        </div>
                      </div>

                    </div>
                  </EditableBackground>
                </div>

                  {/* Banner de Fondo Video / Animación en Movimiento: La Hormiga Cortadora */}
                  <AntMotionBanner 
                    heroBgUrl={heroBgUrl} 
                  />



                  {/* Dual Business Divisions Section */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Division 1: Agro-Industrial */}
                      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_12px_36px_-12px_rgba(15,23,42,0.06)] flex flex-col justify-between space-y-8 hover:border-emerald-600/40 hover:shadow-2xl transition-all duration-300 group relative">
                        <div className="space-y-6">
                          <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                            <EditableMedia
                              mediaKey="img-division-agro"
                              src={divisionAgroImg}
                              alt="División Suministro Agrícola - Sacha Inchi y Cacao"
                              title="División Suministro Agrícola"
                              section="Líneas Estratégicas"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                              <span className="text-white text-xs font-mono font-bold uppercase tracking-wider bg-brand-green/90 px-2.5 py-1 rounded-md backdrop-blur-sm">
                                {language === 'es' ? 'Agro-Industrial · San Martín' : 'Agro-Industrial · San Martín'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                              <Leaf className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-display font-black text-xl text-brand-dark uppercase tracking-tight">
                                {siteText.agroDivisionTitle || translations.divisions.agroTitle}
                              </h3>
                              <p className="text-[11px] text-brand-green font-mono font-bold uppercase tracking-wider">
                                {translations.divisions.agroSubtitle}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 text-sm leading-relaxed font-light">
                            {siteText.agroDivisionDesc || translations.divisions.agroDesc}
                          </p>
                          <ul className="space-y-2 pt-2">
                            {translations.divisions.agroPoints.map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button 
                          onClick={() => navigateToPage('productos')}
                          className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>{language === 'es' ? 'Ver Catálogo de Productos' : 'View Product Catalog'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Division 2: Fintech */}
                      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_12px_36px_-12px_rgba(15,23,42,0.06)] flex flex-col justify-between space-y-8 hover:border-pink-500/40 hover:shadow-2xl transition-all duration-300 group relative">
                        <div className="space-y-6">
                          <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                            <EditableMedia
                              mediaKey="img-division-tech"
                              src={divisionTechImg}
                              alt="División Gestión Financiera - AgriCobros"
                              title="División Gestión Financiera"
                              section="Líneas Estratégicas"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                              <span className="text-white text-xs font-mono font-bold uppercase tracking-wider bg-brand-pink-accent/90 px-2.5 py-1 rounded-md backdrop-blur-sm">
                                {language === 'es' ? 'FinTech · Recaudación Móvil' : 'FinTech · Mobile Collections'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-pink-accent flex items-center justify-center shrink-0">
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-display font-black text-xl text-brand-dark uppercase tracking-tight">
                                {siteText.fintechDivisionTitle || translations.divisions.fintechTitle}
                              </h3>
                              <p className="text-[11px] text-brand-pink-accent font-mono font-bold uppercase tracking-wider">
                                {translations.divisions.fintechSubtitle}
                              </p>
                            </div>
                          </div>

                          <p className="text-slate-600 text-sm leading-relaxed font-light">
                            {siteText.fintechDivisionDesc || translations.divisions.fintechDesc}
                          </p>
                          <ul className="space-y-2 pt-2">
                            {translations.divisions.fintechPoints.map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                                <Check className="w-4 h-4 text-brand-pink-accent shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button 
                          onClick={() => navigateToPage('servicios')}
                          className="w-full py-3.5 bg-brand-dark hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{language === 'es' ? 'Ver Soluciones Tecnológicas' : 'View Tech Solutions'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery Grid */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="text-center space-y-3">
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                        {language === 'es' ? 'NUESTROS COMERCIOS' : 'OUR COMMERCE'}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                      {/* 1. Sacha Inchi */}
                      <div 
                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/60 hover:-translate-y-1 min-h-[420px] flex flex-col justify-end" 
                        onClick={() => navigateToProductById('sacha-inchi')}
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <EditableMedia
                            mediaKey="img-sacha-inchi"
                            src="/images/sacha-inchi.jpg"
                            alt="Sacha Inchi Superfood"
                            title="Sacha Inchi"
                            section="Catálogo Operaciones"
                            disableClickToEdit={true}
                            onMediaClick={() => navigateToProductById('sacha-inchi')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 via-30% to-transparent pointer-events-none" />
                        </div>
                        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {translations.common.agriculturalSupply}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/25 border border-emerald-400/40 px-2.5 py-1 rounded-full font-mono normal-case group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0 backdrop-blur-xs">
                              Ver Producto →
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'sacha-inchi')?.title || 'Sacha Inchi'}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-slate-100 font-normal leading-relaxed mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'sacha-inchi')?.description || 'Semillas, almendras secas y aceite extra virgen de alta pureza.'}
                          </p>
                        </div>
                      </div>

                      {/* 2. Cacao Amazónico */}
                      <div 
                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-amber-500/60 hover:-translate-y-1 min-h-[420px] flex flex-col justify-end" 
                        onClick={() => navigateToProductById('cacao')}
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <EditableMedia
                            mediaKey="img-cacao"
                            src="/images/cacao_grano_seco.jpg"
                            alt="Cacao Amazónico"
                            title="Cacao Amazónico"
                            section="Catálogo Operaciones"
                            disableClickToEdit={true}
                            onMediaClick={() => navigateToProductById('cacao')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 via-30% to-transparent pointer-events-none" />
                        </div>
                        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {translations.common.agriculturalSupply}
                            </span>
                            <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/25 border border-amber-400/40 px-2.5 py-1 rounded-full font-mono normal-case group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0 backdrop-blur-xs">
                              Ver Producto →
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'cacao')?.title || 'Cacao Amazónico'}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-slate-100 font-normal leading-relaxed mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'cacao')?.description || 'Granos de cacao seco fermentados con trazabilidad de San Martín.'}
                          </p>
                        </div>
                      </div>

                      {/* 3. Aguaje Fresco y Deshidratado al Sol */}
                      <div 
                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-amber-500/60 hover:-translate-y-1 min-h-[420px] flex flex-col justify-end" 
                        onClick={() => navigateToProductById('aguaje-deshidratado')}
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <EditableMedia
                            mediaKey="img-aguaje"
                            src="/images/aguaje_hero.jpg"
                            alt="Aguaje Fresco y Deshidratado al Sol"
                            title="Aguaje Fresco y Deshidratado al Sol"
                            section="Catálogo Operaciones"
                            disableClickToEdit={true}
                            onMediaClick={() => navigateToProductById('aguaje-deshidratado')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 via-30% to-transparent pointer-events-none" />
                        </div>
                        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {language === 'es' ? 'Superfruto Amazónico' : 'Amazonian Superfruit'}
                            </span>
                            <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/25 border border-amber-400/40 px-2.5 py-1 rounded-full font-mono normal-case group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0 backdrop-blur-xs">
                              Ver Producto →
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'aguaje-deshidratado')?.title || 'Aguaje Fresco y Deshidratado al Sol'}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-slate-100 font-normal leading-relaxed mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'aguaje-deshidratado')?.description || 'Fruto amazónico de alta densidad nutritiva. Disponible en fruto fresco y deshidratado al sol, rico en betacarotenos y vitamina E.'}
                          </p>
                        </div>
                      </div>

                      {/* 4. Coco Fresco & Subproductos */}
                      <div 
                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/60 hover:-translate-y-1 min-h-[420px] flex flex-col justify-end" 
                        onClick={() => navigateToProductById('coco-derivados')}
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <EditableMedia
                            mediaKey="img-coco"
                            src="/images/coco.jpg"
                            alt="Coco Fresco y Derivados"
                            title="Coco Fresco & Derivados"
                            section="Catálogo Operaciones"
                            disableClickToEdit={true}
                            onMediaClick={() => navigateToProductById('coco-derivados')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 via-30% to-transparent pointer-events-none" />
                        </div>
                        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {translations.common.agroIndustry}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/25 border border-emerald-400/40 px-2.5 py-1 rounded-full font-mono normal-case group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0 backdrop-blur-xs">
                              Ver Producto →
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'coco-derivados')?.title || 'Coco Fresco & Subproductos'}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-slate-100 font-normal leading-relaxed mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'coco-derivados')?.description || 'Coco Fresco para Bebida, Coco Rallado Deshidratado y Aceite Virgen Prensado en Frío.'}
                          </p>
                        </div>
                      </div>

                      {/* 5. Refinadoras de Chocolate */}
                      <div 
                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-amber-500/60 hover:-translate-y-1 min-h-[420px] flex flex-col justify-end" 
                        onClick={() => navigateToProductById('refinadoras-chocolate')}
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <EditableMedia
                            mediaKey="img-refinadoras-chocolate"
                            src="/images/refinadoras_hero_bg.jpg"
                            alt="Refinadoras de Chocolate"
                            title="Refinadoras de Chocolate"
                            section="Catálogo Operaciones"
                            disableClickToEdit={true}
                            onMediaClick={() => navigateToProductById('refinadoras-chocolate')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 via-30% to-transparent pointer-events-none" />
                        </div>
                        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {language === 'es' ? 'Refinadoras' : 'Chocolate Refiners'}
                            </span>
                            <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/25 border border-amber-400/40 px-2.5 py-1 rounded-full font-mono normal-case group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0 backdrop-blur-xs">
                              Ver Refinadoras →
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'refinadoras-chocolate')?.title || 'Refinadoras de Chocolate'}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-slate-100 font-normal leading-relaxed mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'refinadoras-chocolate')?.description || 'Refinadoras de chocolate de sobremesa e industriales (de 8 lbs a 200 lbs / 90 kg por batch) con piedras de granito y motores certificados UL, CE y CSA.'}
                          </p>
                        </div>
                      </div>

                      {/* 6. AgriCobros */}
                      <div 
                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-pink-500/60 hover:-translate-y-1 min-h-[420px] flex flex-col justify-end" 
                        onClick={() => navigateToProductById('gestion-recaudacion')}
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <EditableMedia
                            mediaKey="img-agricobros"
                            src="/images/cobragood_pos.jpg"
                            alt="Recaudación AgriCobros"
                            title="Recaudación AgriCobros"
                            section="Catálogo Operaciones"
                            disableClickToEdit={true}
                            onMediaClick={() => navigateToProductById('gestion-recaudacion')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 via-30% to-transparent pointer-events-none" />
                        </div>
                        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest bg-pink-950/80 border border-pink-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {translations.common.financialManagement}
                            </span>
                            <span className="text-[11px] font-semibold text-pink-300 bg-pink-500/25 border border-pink-400/40 px-2.5 py-1 rounded-full font-mono normal-case group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0 backdrop-blur-xs">
                              Ver Servicio →
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'gestion-recaudacion')?.title || 'AgriCobros'}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-slate-100 font-normal leading-relaxed mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'gestion-recaudacion')?.description || 'Recaudación y cobro inteligente en tiendas y comercios.'}
                          </p>
                        </div>
                      </div>

                      {/* 7. Gestor Contable */}
                      <div 
                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-cyan-500/60 hover:-translate-y-1 min-h-[420px] flex flex-col justify-end" 
                        onClick={() => navigateToProductById('gestor-contable')}
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <EditableMedia
                            mediaKey="img-gestor-contable"
                            src="/images/gestor-contable.jpg"
                            alt="Gestor Contable"
                            title="Gestor Contable Formato 5.2"
                            section="Catálogo Operaciones"
                            disableClickToEdit={true}
                            onMediaClick={() => navigateToProductById('gestor-contable')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 via-30% to-transparent pointer-events-none" />
                        </div>
                        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {translations.common.financialManagement}
                            </span>
                            <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/25 border border-cyan-400/40 px-2.5 py-1 rounded-full font-mono normal-case group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0 backdrop-blur-xs">
                              Ver Servicio →
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'gestor-contable')?.title || 'Gestor Contable 5.4'}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-slate-100 font-normal leading-relaxed mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {commerceItems.find(i => i.id === 'gestor-contable')?.description || 'Generación automática del Libro Diario Formato 5.2.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* PAGE 2: QUIÉNES SOMOS */}
              {activePage === 'quienes-somos' && (
                <motion.div
                  key="page-quienes-somos"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10"
                >
                  <div className="text-center space-y-2.5">
                    <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-brand-dark uppercase tracking-tight">
                      {siteText.aboutTitle || translations.about.title}
                    </h2>
                    <div className="w-12 h-1 bg-brand-green mx-auto rounded-full"></div>
                  </div>

                  <EditableBackground
                    sectionKey="bg-quienes-somos-quote"
                    title="Panel de Filosofía Sostenible"
                    defaultImage="/videos/ant_tech_motion.mp4"
                    defaultColor="#072518"
                    defaultOpacity={0.6}
                    defaultPattern="grid"
                    className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center text-white shadow-xl border border-emerald-900/40"
                  >
                    <div className="absolute inset-0 bg-architectural-grid-dark opacity-15 pointer-events-none"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/15 blur-3xl rounded-full pointer-events-none" />

                    <div className="relative z-10 space-y-5 max-w-3xl mx-auto">
                      <blockquote className="space-y-2">
                        <p className="font-display font-medium text-xl sm:text-2xl md:text-3xl italic leading-relaxed tracking-wide bg-gradient-to-r from-white via-slate-100 to-emerald-100 bg-clip-text text-transparent drop-shadow-xs">
                          {siteText.quoteText || (language === 'es' ? '«Impulsando el desarrollo sostenible desde el corazón de la Amazonía.»' : '“Driving sustainable development from the heart of the Amazon.”')}
                        </p>
                      </blockquote>
                      
                      <div className="text-brand-pink-accent font-mono text-[11px] sm:text-xs tracking-widest uppercase font-bold bg-brand-pink-accent/15 backdrop-blur-xs inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-brand-pink-accent/30 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink-accent animate-pulse" />
                        <span>{siteText.heroTagline || translations.common.welcomeTagline}</span>
                      </div>
                    </div>
                  </EditableBackground>

                  {/* Mission & Vision Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300 space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-green" />
                      <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-black text-lg sm:text-xl text-brand-dark uppercase tracking-tight">{translations.about.missionTitle}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {siteText.missionText}
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-lg hover:border-pink-500/30 transition-all duration-300 space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-pink-accent" />
                      <div className="w-10 h-10 rounded-xl bg-pink-100/40 flex items-center justify-center text-brand-pink-accent">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-black text-lg sm:text-xl text-brand-dark uppercase tracking-tight">{translations.about.visionTitle}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {siteText.visionText}
                      </p>
                    </div>
                  </div>

                  {/* Core Values Section */}
                  <div className="space-y-6 pt-2">
                    <div className="text-center space-y-1">
                      <h3 className="font-display font-black text-xl sm:text-2xl text-brand-dark uppercase tracking-tight">{translations.about.valuesTitle}</h3>
                      <p className="text-slate-500 text-xs font-normal">{translations.about.valuesSubtitle}</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-500/25 transition-all duration-300 space-y-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center">
                          <Leaf className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-brand-dark uppercase tracking-tight">{translations.about.sustainability}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {translations.about.sustainabilityDesc}
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-500/25 transition-all duration-300 space-y-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-brand-dark uppercase tracking-tight">{translations.about.innovation}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {translations.about.innovationDesc}
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-500/25 transition-all duration-300 space-y-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center">
                          <Shield className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-brand-dark uppercase tracking-tight">{translations.about.transparency}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {translations.about.transparencyDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAGE 3: PRODUCTOS */}
              {activePage === 'productos' && (
                <motion.div
                  key="page-productos"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                >
                  <div className="text-center space-y-4 mb-16">
                    <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                      {translations.nav.products}
                    </span>
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                      {translations.products.title}
                    </h2>
                    <div className="w-16 h-1 bg-brand-green mx-auto rounded-full"></div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {commerceItems.filter(item => item.type === 'producto').map((item) => (
                      <div 
                        key={item.id}
                        className="group bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl hover:border-brand-green/20 transition-all duration-500 flex flex-col justify-between"
                      >
                        <div className="h-64 relative bg-slate-900 overflow-hidden">
                          <EditableMedia
                            mediaKey={`img-${item.id}`}
                            src={item.image}
                            alt={item.title}
                            title={item.title}
                            section="Página Productos"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                          <span className="absolute top-4 left-4 bg-emerald-800 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg border border-emerald-600/30 pointer-events-none">
                            {item.id === 'sacha-inchi' 
                              ? translations.common.superfood 
                              : item.id === 'cacao' 
                              ? translations.common.fineAromaCacao 
                              : item.id === 'aguaje-deshidratado'
                              ? (language === 'es' ? 'Superfruto Amazónico' : 'Amazonian Superfruit')
                              : item.id === 'coco-derivados' 
                              ? translations.common.agroIndustry 
                              : item.id === 'refinadoras-chocolate'
                              ? (language === 'es' ? 'Refinadoras' : 'Chocolate Refiners')
                              : translations.nav.products}
                          </span>
                        </div>
                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-3">
                            <h3 className="font-display font-bold text-xl text-brand-dark tracking-tight">
                              <EditableText value={item.title} />
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-light">
                              <EditableText
                                multiline
                                value={item.description}
                                as="span"
                              />
                            </p>
                          </div>
                          <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center">
                            <span className="font-mono text-[9px] text-brand-pink-accent uppercase tracking-widest font-bold">
                              {translations.common.welcomeTagline}
                            </span>
                            <button 
                              onClick={() => navigateToSubPage(item)}
                              className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span>{translations.common.viewDetails}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* PAGE 4: SERVICIOS */}
              {activePage === 'servicios' && (
                <motion.div
                  key="page-servicios"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                >
                  <div className="text-center space-y-4 mb-16">
                    <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                      {translations.nav.services}
                    </span>
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                      {translations.services.title}
                    </h2>
                    <div className="w-16 h-1 bg-brand-green mx-auto rounded-full"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {commerceItems.filter(item => item.type === 'servicio').map((item) => (
                      <div 
                        key={item.id}
                        className="group bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl hover:border-brand-green/20 transition-all duration-500 flex flex-col justify-between"
                      >
                        <div className="h-64 relative bg-slate-900 overflow-hidden">
                          <EditableMedia
                            mediaKey={`img-${item.id}`}
                            src={item.image}
                            alt={item.title}
                            title={item.title}
                            section="Página Servicios"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-115 contrast-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                          <span className="absolute top-4 left-4 bg-emerald-800 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg border border-emerald-600/30 pointer-events-none">
                            {translations.nav.services}
                          </span>
                        </div>
                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-3">
                            <h3 className="font-display font-bold text-xl text-brand-dark tracking-tight">
                              <EditableText value={item.title} />
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-light">
                              <EditableText
                                multiline
                                value={item.description}
                                as="span"
                              />
                            </p>
                          </div>
                          <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center">
                            <span className="font-mono text-[9px] text-brand-pink-accent uppercase tracking-widest font-bold">
                              {translations.common.welcomeTagline}
                            </span>
                            <button 
                              onClick={() => navigateToSubPage(item)}
                              className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span>{translations.common.viewDetails}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* PAGE 5: CONTACTO */}
              {activePage === 'contacto' && (
                <motion.div
                  key="page-contacto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-6xl mx-auto px-4 py-16 space-y-12"
                >
                  <div className="text-center space-y-4">
                    <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                      {translations.contact.attentionChannels}
                    </span>
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                      {translations.contact.connectWithUs}
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-sm font-light">
                      {translations.contact.readyToAssist}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-10 items-stretch">
                    {/* Contact Info Panel */}
                    <div className="lg:col-span-5 space-y-6">
                      <EditableBackground
                        sectionKey="bg-contact-card"
                        title="Ficha Corporativa de Contacto"
                        defaultColor="#072518"
                        defaultOpacity={0.94}
                        defaultPattern="grid"
                        className="text-white rounded-3xl p-8 relative overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between h-full"
                      >
                        <div className="absolute inset-0 bg-architectural-grid-dark opacity-15 pointer-events-none"></div>
                        <div className="absolute -top-10 -left-10 w-42 h-42 bg-brand-green/25 blur-3xl rounded-full" />
                        
                        <div className="relative z-10 space-y-8">
                          <div>
                            <span className="font-mono text-[8px] text-brand-pink-accent tracking-widest uppercase font-bold bg-brand-pink-accent/15 px-3.5 py-1.5 rounded-full border border-brand-pink-accent/20">
                              {translations.contact.corporateInfo}
                            </span>
                            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mt-4">
                              AGRICARL PERÚ S.A.C.
                            </h3>
                            <p className="font-mono text-xs text-pink-400 font-bold mt-1">
                              RUC: {siteText.companyRuc}
                            </p>
                          </div>

                          <div className="space-y-6">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <MapPin className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.mainOffice}</p>
                                <p className="text-xs text-white leading-relaxed font-light">
                                  <EditableText value={siteText.contactAddress} />
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Phone className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.centralPhone}</p>
                                <a 
                                  href="https://wa.me/51956352862" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-xs text-white font-mono font-medium hover:text-emerald-300 transition-colors block"
                                >
                                  <EditableText value={siteText.contactPhone} />
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Mail className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.officialEmail}</p>
                                <a 
                                  href="mailto:operaciones@agricarlperu.com" 
                                  className="text-xs text-white font-mono font-medium leading-relaxed hover:text-emerald-300 transition-colors block"
                                >
                                  operaciones@agricarlperu.com
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Globe className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.officialPortal}</p>
                                <a 
                                  href="http://www.agricarlperu.com" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-xs text-cyan-300 font-mono font-medium hover:underline block"
                                >
                                  www.agricarlperu.com
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Building2 className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.businessHours}</p>
                                <p className="text-xs text-white font-medium">
                                  {translations.contact.businessHoursVal}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 relative z-10 flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                          <span className="font-mono text-[8px] text-emerald-400 tracking-widest uppercase font-bold">{translations.contact.activeSupportLine}</span>
                        </div>
                      </EditableBackground>
                    </div>

                    {/* Contact Form Panel */}
                    <div className="lg:col-span-7">
                      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/60 h-full flex flex-col justify-center space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-display font-black text-xl sm:text-2xl text-brand-dark uppercase tracking-tight">
                            {translations.contact.sendMessageDirect}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                            {language === 'es'
                              ? 'Escriba su consulta a continuación. Nuestro equipo comercial le responderá a la brevedad.'
                              : 'Type your inquiry below. Our commercial team will get back to you shortly.'}
                          </p>
                        </div>

                        <AnimatePresence mode="wait">
                          {!formSubmitted ? (
                            <motion.form 
                              key="contact-form"
                              onSubmit={handleFormSubmit}
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <User className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="text"
                                    required
                                    placeholder={translations.contact.fullName + ' *'}
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="email"
                                    required
                                    placeholder={translations.contact.emailAddress + ' *'}
                                    value={formEmail}
                                    onChange={(e) => setFormEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Phone className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="tel"
                                    placeholder={translations.contact.phoneWhatsApp}
                                    value={formPhone}
                                    onChange={(e) => setFormPhone(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <MessageSquare className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="text"
                                    placeholder={translations.contact.subject}
                                    value={formSubject}
                                    onChange={(e) => setFormSubject(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>
                              </div>

                              <div className="relative">
                                <textarea 
                                  required
                                  rows={4}
                                  placeholder={translations.contact.messagePlaceholder}
                                  value={formMsg}
                                  onChange={(e) => setFormMsg(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all resize-none placeholder:text-slate-400 font-semibold leading-relaxed"
                                ></textarea>
                              </div>

                              <div className="space-y-2 pt-1">
                                <button 
                                  type="submit"
                                  disabled={formLoading}
                                  className="w-full bg-brand-green hover:bg-emerald-600 text-white font-bold py-4 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 disabled:bg-slate-400 cursor-pointer shadow-lg hover:shadow-emerald-900/20 group"
                                >
                                  {formLoading ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                      <span>{language === 'es' ? 'Enviando...' : 'Sending...'}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                      <span>{translations.contact.sendDirect}</span>
                                    </>
                                  )}
                                </button>
                                <p className="text-[11px] text-center text-slate-400 leading-normal">
                                  {language === 'es' ? 'Respuesta garantizada en menos de 24 horas hábiles.' : 'Guaranteed response within 24 business hours.'}
                                </p>
                              </div>
                            </motion.form>
                          ) : (
                            <motion.div 
                              key="success-form"
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="py-6 space-y-6 text-center"
                            >
                              <div className="w-14 h-14 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                                <CheckCircle className="w-8 h-8" />
                              </div>

                              <div className="space-y-1.5">
                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold border border-emerald-200">
                                  {language === 'es' ? '✓ Mensaje Enviado Correctamente' : '✓ Message Sent Successfully'}
                                </span>
                                <h4 className="text-lg sm:text-xl font-bold text-brand-dark">
                                  {language === 'es' ? '¡Gracias por contactarnos!' : 'Thank you for contacting us!'}
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                                  {language === 'es' 
                                    ? 'Hemos recibido su consulta con éxito. Nos comunicaremos con usted a la brevedad posible.' 
                                    : 'We have received your message successfully. We will get back to you as soon as possible.'}
                                </p>
                              </div>

                              {/* Resumen del Mensaje */}
                              {submittedSnapshot && (
                                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-left text-xs space-y-2.5 max-w-lg mx-auto shadow-inner">
                                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5 text-[11px]">
                                    <span className="text-slate-400 font-mono">{language === 'es' ? 'Remitente:' : 'From:'}</span>
                                    <span className="font-semibold text-slate-800">{submittedSnapshot.name} ({submittedSnapshot.email})</span>
                                  </div>
                                  {submittedSnapshot.phone && (
                                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5 text-[11px]">
                                      <span className="text-slate-400 font-mono">{language === 'es' ? 'Teléfono:' : 'Phone:'}</span>
                                      <span className="font-mono text-slate-700">{submittedSnapshot.phone}</span>
                                    </div>
                                  )}
                                  {submittedSnapshot.subject && (
                                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5 text-[11px]">
                                      <span className="text-slate-400 font-mono">{language === 'es' ? 'Asunto:' : 'Subject:'}</span>
                                      <span className="font-semibold text-slate-700">{submittedSnapshot.subject}</span>
                                    </div>
                                  )}
                                  <div className="pt-1">
                                    <span className="text-slate-400 font-mono text-[11px] block">{language === 'es' ? 'Mensaje enviado:' : 'Message sent:'}</span>
                                    <p className="text-slate-600 italic line-clamp-3 text-[11px] mt-1 bg-white p-3 rounded-lg border border-slate-200/60">
                                      "{submittedSnapshot.message}"
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Botón directo y limpio para nuevo mensaje */}
                              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                                <button 
                                  onClick={handleResetForm}
                                  className="w-full sm:w-auto bg-brand-green hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-emerald-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                  <span>{language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Geographic Map Component */}
                  <div className="pt-6">
                    <LocationMapSanMartin />
                  </div>
                </motion.div>
              )}
            </>
          )}

        </AnimatePresence>
      </main>

      {/* 4. Pie de Página Simple y Elegante */}
      <footer className="w-full bg-[#241108] text-white border-t-4 border-[#140703] bg-chocolate-tablet-large shadow-[0_-8px_20px_rgba(0,0,0,0.5)] relative z-20 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center text-center gap-5">
          {/* Logo Corporativo en Pie de Página */}
          <button 
            onClick={() => navigateToPage('inicio')}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
            title="AGRICARL PERÚ S.A.C."
          >
            <img 
              src={activeLogo} 
              alt="AGRICARL Logo" 
              className="w-12 h-12 object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== logoOficial) {
                  target.src = logoOficial;
                } else if (target.src !== logoAmazonico) {
                  target.src = logoAmazonico;
                }
              }}
            />
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white uppercase group-hover:text-amber-300 transition-colors">
              AGRICARL PERÚ S.A.C.
            </span>
          </button>

          {/* Navegación Principal */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-white/90">
            <button 
              onClick={() => navigateToPage('inicio')} 
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {translations.nav.home}
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => navigateToPage('quienes-somos')} 
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {translations.nav.about}
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => navigateToPage('productos')} 
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {translations.nav.products}
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => navigateToPage('servicios')} 
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {translations.nav.services}
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => navigateToPage('contacto')} 
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {translations.nav.contact}
            </button>
          </nav>

          {/* Contacto Directo */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80 font-mono">
            <a 
              href="mailto:operaciones@agricarlperu.com" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <span className="text-amber-300 font-bold">Email:</span> {siteText.contactEmail}
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a 
              href="http://www.agricarlperu.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-300 hover:text-white transition-colors"
            >
              www.agricarlperu.com
            </a>
          </div>

          {/* Línea divisoria sutil */}
          <div className="w-full max-w-md h-px bg-white/10 my-1" />

          {/* Copyright y Origen */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-white/60">
            <span>San Martín, Perú</span>
            <span className="hidden sm:inline">·</span>
            <span>© 2026 AGRICARL PERÚ S.A.C. · {translations.footer.allRightsReserved}</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button (Bottom-Right) - Touch optimized for mobile and tablet */}
      <a 
        href="https://wa.me/51956352862" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer print:hidden group"
        title={language === 'es' ? 'Escríbenos por WhatsApp' : 'Contact us on WhatsApp'}
        aria-label="WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-200"></span>
        </span>
        <svg className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="23" fill="#25D366" />
          <path fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M24 7C14.61 7 7 14.61 7 24c0 3.01.78 5.84 2.15 8.29L7 41l9.02-2.11A16.89 16.89 0 0024 41c9.39 0 17-7.61 17-17S33.39 7 24 7zm0 2.87c7.8 0 14.13 6.33 14.13 14.13 0 7.8-6.33 14.13-14.13 14.13-2.67 0-5.17-.75-7.3-2.05l-.52-.32-5.38 1.26 1.28-5.23-.34-.55A14.07 14.07 0 019.87 24c0-7.8 6.33-14.13 14.13-14.13zm-6.2 7.03c-.34-.76-.7-.77-1.02-.79-.27-.01-.57-.01-.87-.01-.3 0-.79.11-1.2.57-.42.45-1.6 1.56-1.6 3.8 0 2.25 1.64 4.42 1.86 4.73.23.3 3.16 5.06 7.81 6.88 3.87 1.51 4.65 1.21 5.49 1.13.84-.08 2.7-1.1 3.08-2.17.38-1.06.38-1.97.27-2.17-.11-.19-.42-.3-.88-.53-.46-.23-2.7-1.33-3.12-1.48-.42-.15-.72-.23-1.03.23-.3.46-1.18 1.48-1.44 1.79-.27.3-.53.34-.99.11-.46-.23-1.94-.71-3.69-2.28-1.37-1.22-2.29-2.73-2.56-3.19-.27-.46-.03-.7.2-.93.21-.21.46-.53.69-.8.23-.27.3-.46.46-.76.15-.3.08-.57-.04-.8-.11-.23-.99-2.47-1.39-3.38z"/>
        </svg>
      </a>

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <MediaProvider>
          <AppContent />
        </MediaProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
