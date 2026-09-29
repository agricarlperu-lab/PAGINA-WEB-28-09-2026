/**
 * Navigation and Routing Utility for AGRICARL PERÚ S.A.C.
 * Handles client-side URL synchronization using the HTML5 History API (pushState, replaceState, popstate)
 * and seamless fallback support for Hash routing (#/productos).
 */

export type PageId = 'inicio' | 'quienes-somos' | 'productos' | 'servicios' | 'contacto';

export interface RouteResolution {
  page: PageId;
  subPageId: string | null;
  canonicalPath: string;
  title: string;
}

/**
 * Returns canonical path for a top-level page
 */
export function getUrlForPage(page: PageId): string {
  switch (page) {
    case 'inicio':
      return '/';
    case 'quienes-somos':
      return '/quienes-somos';
    case 'productos':
      return '/productos';
    case 'servicios':
      return '/servicios';
    case 'contacto':
      return '/contacto';
    default:
      return '/';
  }
}

/**
 * Returns canonical path for a detail sub-page
 */
export function getUrlForSubPage(subPageId: string): string {
  switch (subPageId) {
    case 'sacha-inchi':
      return '/productos/sacha-inchi';
    case 'cacao':
      return '/productos/cacao';
    case 'aguaje-deshidratado':
    case 'aguaje':
      return '/productos/aguaje';
    case 'coco-derivados':
    case 'coco':
      return '/productos/coco';
    case 'refinadoras-chocolate':
    case 'refinadoras':
      return '/productos/refinadoras';
    case 'gestion-recaudacion':
    case 'cobragood':
    case 'agricobros':
      return '/servicios/cobragood';
    case 'gestor-contable':
      return '/servicios/gestor-contable';
    default:
      return `/productos/${subPageId}`;
  }
}

/**
 * Resolves current route state from pathname and optional hash
 */
export function resolveRoute(customPath?: string): RouteResolution {
  let raw = customPath;

  if (!raw && typeof window !== 'undefined') {
    // Check if hash-based routing is used (e.g. #/productos or #productos)
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      raw = hash.replace(/^#\/?/, '/');
    } else {
      raw = window.location.pathname;
    }
  }

  // Normalize: lower-case, remove trailing slash (except root '/')
  let clean = (raw || '/').trim().toLowerCase();
  // Strip query strings if present
  clean = clean.split('?')[0].split('#')[0];
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }

  // 1. Sub-pages: PRODUCTOS
  if (clean === '/productos/sacha-inchi' || clean === '/sacha-inchi') {
    return {
      page: 'productos',
      subPageId: 'sacha-inchi',
      canonicalPath: '/productos/sacha-inchi',
      title: 'Sacha Inchi Amazónico · AGRICARL PERÚ S.A.C.'
    };
  }
  if (clean === '/productos/cacao' || clean === '/cacao') {
    return {
      page: 'productos',
      subPageId: 'cacao',
      canonicalPath: '/productos/cacao',
      title: 'Cacao Amazónico Fino de Aroma · AGRICARL PERÚ S.A.C.'
    };
  }
  if (clean === '/productos/aguaje' || clean === '/productos/aguaje-deshidratado' || clean === '/aguaje' || clean === '/aguaje-deshidratado') {
    return {
      page: 'productos',
      subPageId: 'aguaje-deshidratado',
      canonicalPath: '/productos/aguaje',
      title: 'Aguaje Fresco y Deshidratado al Sol · AGRICARL PERÚ S.A.C.'
    };
  }
  if (clean === '/productos/coco' || clean === '/productos/coco-derivados' || clean === '/coco' || clean === '/coco-derivados') {
    return {
      page: 'productos',
      subPageId: 'coco-derivados',
      canonicalPath: '/productos/coco',
      title: 'Coco Fresco & Subproductos Amazónicos · AGRICARL PERÚ S.A.C.'
    };
  }
  if (
    clean === '/productos/refinadoras' || 
    clean === '/productos/refinadoras-chocolate' || 
    clean === '/refinadoras' || 
    clean === '/refinadoras-chocolate'
  ) {
    return {
      page: 'productos',
      subPageId: 'refinadoras-chocolate',
      canonicalPath: '/productos/refinadoras',
      title: 'Refinadoras de Chocolate · AGRICARL PERÚ S.A.C.'
    };
  }

  // 2. Sub-pages: SERVICIOS
  if (
    clean === '/servicios/cobragood' ||
    clean === '/servicios/gestion-recaudacion' ||
    clean === '/servicios/agricobros' ||
    clean === '/cobragood' ||
    clean === '/gestion-recaudacion' ||
    clean === '/agricobros'
  ) {
    return {
      page: 'servicios',
      subPageId: 'gestion-recaudacion',
      canonicalPath: '/servicios/cobragood',
      title: 'AgriCobros · Gestión de Recaudación y Cobranzas · AGRICARL PERÚ'
    };
  }
  if (clean === '/servicios/gestor-contable' || clean === '/gestor-contable' || clean === '/ple-5.2') {
    return {
      page: 'servicios',
      subPageId: 'gestor-contable',
      canonicalPath: '/servicios/gestor-contable',
      title: 'Gestor Contable Formato Simplificado PLE 5.2 · AGRICARL PERÚ'
    };
  }

  // 3. Top-level Pages
  if (clean === '/quienes-somos' || clean === '/nosotros' || clean === '/about') {
    return {
      page: 'quienes-somos',
      subPageId: null,
      canonicalPath: '/quienes-somos',
      title: 'Quiénes Somos · AGRICARL PERÚ S.A.C.'
    };
  }
  if (clean === '/productos' || clean === '/catalogo') {
    return {
      page: 'productos',
      subPageId: null,
      canonicalPath: '/productos',
      title: 'Catálogo de Productos Amazónicos · AGRICARL PERÚ S.A.C.'
    };
  }
  if (clean === '/servicios') {
    return {
      page: 'servicios',
      subPageId: null,
      canonicalPath: '/servicios',
      title: 'Servicios Financieros y Contables · AGRICARL PERÚ S.A.C.'
    };
  }
  if (clean === '/contacto' || clean === '/contact') {
    return {
      page: 'contacto',
      subPageId: null,
      canonicalPath: '/contacto',
      title: 'Contacto y Operaciones Comerciales · AGRICARL PERÚ S.A.C.'
    };
  }

  // 4. Default / Home
  return {
    page: 'inicio',
    subPageId: null,
    canonicalPath: clean === '/inicio' ? '/inicio' : '/',
    title: 'AGRICARL PERÚ S.A.C. · Conectando al agricultor con el mercado'
  };
}

/**
 * Pushes new URL state to browser history without page reload
 */
export function navigateToUrl(targetUrl: string, title?: string) {
  if (typeof window === 'undefined') return;

  const current = window.location.pathname;
  if (current !== targetUrl) {
    window.history.pushState({ path: targetUrl }, title || '', targetUrl);
  }
  if (title) {
    document.title = title;
  }
}

/**
 * Replaces current URL state in browser history
 */
export function replaceUrl(targetUrl: string, title?: string) {
  if (typeof window === 'undefined') return;

  window.history.replaceState({ path: targetUrl }, title || '', targetUrl);
  if (title) {
    document.title = title;
  }
}
