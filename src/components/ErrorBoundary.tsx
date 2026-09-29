import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('agricarl_media_state_v1_imgs');
      localStorage.removeItem('agricarl_media_state_v1_bgs');
      localStorage.removeItem('agricarl_media_state_v1_fits');
      localStorage.removeItem('agricarl_logo');
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d1f14] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-[#183523] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-400/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                AGRICARL PERÚ
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Se detectó una discrepancia en la memoria temporal del navegador. Haz clic en el botón para recargar la plataforma oficial.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm uppercase tracking-wider"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recargar Página</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full bg-white/10 hover:bg-white/15 text-slate-200 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer Memoria Temporal</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
