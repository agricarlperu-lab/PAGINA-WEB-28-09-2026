import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

declare global {
  interface Window {
    __agricarl_timer?: any;
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Cancel fallback watchdog once React starts rendering
    if (typeof window !== 'undefined' && window.__agricarl_timer) {
      clearTimeout(window.__agricarl_timer);
      window.__agricarl_timer = null;
    }
  } catch (err) {
    console.error('Fatal initialization error:', err);
    if (typeof window !== 'undefined' && window.__agricarl_timer) {
      clearTimeout(window.__agricarl_timer);
      window.__agricarl_timer = null;
    }
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #251208; color: #ffffff; font-family: sans-serif; text-align: center; padding: 24px;">
        <h1 style="font-size: 22px; font-weight: 800; text-transform: uppercase; color: #fbbf24; margin-bottom: 8px;">AGRICARL PERÚ</h1>
        <p style="font-size: 14px; color: #cbd5e1; max-width: 420px; line-height: 1.5; margin-bottom: 20px;">
          Se detectó una discrepancia al inicializar la plataforma. Por favor, pulsa el botón para restablecer y recargar.
        </p>
        <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload();" style="background: #10b981; color: #022c22; font-weight: bold; border: none; padding: 12px 24px; border-radius: 12px; cursor: pointer; text-transform: uppercase;">
          Restablecer y Recargar
        </button>
      </div>
    `;
  }
}
