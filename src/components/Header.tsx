import React from 'react';
import {
  Palette,
  Sliders,
  Flame,
  Activity,
  Smartphone,
  Monitor,
  Sparkles,
} from 'lucide-react';
import { ActiveScreen } from '../types';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  isMobileDeckMode: boolean;
  onToggleMobileDeck: () => void;
  liveTemp: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onSelectScreen,
  isMobileDeckMode,
  onToggleMobileDeck,
  liveTemp,
}) => {
  const navItems: { id: ActiveScreen; label: string; shortLabel: string; icon: React.ReactNode; count?: string }[] = [
    { id: 'palette', label: 'Оптическая палитра', shortLabel: 'Палитра', icon: <Palette className="w-4 h-4" />, count: '08' },
    { id: 'simulator', label: 'Симулятор линзы', shortLabel: 'Симулятор', icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs"
    >
      {/* Top Telemetry & Status strip */}
      <div className="bg-[#0F172A] text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-4 overflow-x-auto py-0.5 scrollbar-none min-w-0">
          <div className="flex items-center gap-1.5 text-amber-400 font-medium shrink-0 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="tracking-wide uppercase text-[11px] font-mono">LAB STATUS: READY</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300 font-mono text-[11px] shrink-0 whitespace-nowrap">
            <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-slate-400">Ванна PID:</span>
            <span className="text-white font-bold">{liveTemp.toFixed(1)}°C</span>
            <span className="hidden sm:inline text-emerald-400 text-[10px] bg-emerald-950/80 px-1 rounded border border-emerald-800">
              ±0.4°C СТАБИЛЬНО
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-slate-300 font-mono text-[11px]">
            <span className="text-slate-400">pH буфер:</span>
            <span className="text-cyan-300 font-bold">7.05</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-slate-300 font-mono text-[11px]">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-400">Помпа:</span>
            <span className="text-slate-200">120 RPM</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-slate-300 font-mono text-[11px]">
            <span className="text-slate-400">Формула:</span>
            <span className="text-amber-200 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/80">
              TCN-CRX Disperse
            </span>
          </div>
        </div>

        {/* View mode toggle (Mobile Deck Preview vs Workbench) — desktop-only presentation aid */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            id="toggle-mobile-deck-btn"
            type="button"
            onClick={onToggleMobileDeck}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
              isMobileDeckMode
                ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Переключить в режим мобильного слайд-дека 390px для презентаций"
          >
            {isMobileDeckMode ? (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Мобильный дек</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Стенд ПК</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main navigation and brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-900/10 text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-6 h-6 rounded-full border-2 border-white/90 flex items-center justify-center relative">
                <div className="w-3 h-3 rounded-full bg-amber-200/90" />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-100 text-amber-900 border border-amber-300">
                  CR-39 OPTICS
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Термодиффузионное тонирование полимерных очковых линз
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 py-1 scrollbar-none min-w-0 flex-1 sm:flex-initial sm:overflow-x-auto">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  type="button"
                  onClick={() => onSelectScreen(item.id)}
                  className={`flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-2 px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm shadow-amber-900/15'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                  {item.count && (
                    <span
                      className={`hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-amber-700/80 text-amber-100'
                          : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
