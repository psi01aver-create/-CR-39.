import React from 'react';
import {
  Palette,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Maximize2,
} from 'lucide-react';
import { ActiveScreen } from '../types';

interface MobileDeckFrameProps {
  activeScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  onCloseDeck: () => void;
  children: React.ReactNode;
}

export const MobileDeckFrame: React.FC<MobileDeckFrameProps> = ({
  activeScreen,
  onSelectScreen,
  onCloseDeck,
  children,
}) => {
  const screens: { id: ActiveScreen; label: string; icon: React.ReactNode }[] = [
    { id: 'palette', label: 'Палитра', icon: <Palette className="w-4 h-4" /> },
    { id: 'simulator', label: 'Симулятор', icon: <Sliders className="w-4 h-4" /> },
  ];

  const currentIdx = screens.findIndex((s) => s.id === activeScreen);

  const goNext = () => {
    const nextIdx = (currentIdx + 1) % screens.length;
    onSelectScreen(screens[nextIdx].id);
  };

  const goPrev = () => {
    const prevIdx = (currentIdx - 1 + screens.length) % screens.length;
    onSelectScreen(screens[prevIdx].id);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Presentation Banner Controls */}
      <div className="flex items-center justify-between gap-4 w-full max-w-[420px] mb-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="font-mono font-bold text-slate-800">ДЕМО-СЛАЙДЕР 390px</span>
          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">
            {currentIdx + 1} / {screens.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={goPrev}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer"
            title="Предыдущий экран"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer"
            title="Следующий экран"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onCloseDeck}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer ml-1 text-[11px]"
            title="Вернуться в полный режим рабочего стола"
          >
            <Maximize2 className="w-3 h-3" />
            <span>На весь экран</span>
          </button>
        </div>
      </div>

      {/* Realistic Mobile Device Mockup Frame (390px width) */}
      <div
        id="mobile-device-viewport"
        className="w-full max-w-[390px] h-[780px] bg-[#f8f9ff] rounded-[42px] border-[10px] border-slate-900 shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-slate-800"
      >
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Mobile Status Bar */}
        <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-mono text-slate-800 shrink-0 z-40 bg-white/70 backdrop-blur-xs border-b border-slate-100">
          <span className="font-bold">09:41</span>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-[10px]">TCN LAB</span>
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Mobile Viewport Content Area (Scrollable with 16px lateral padding) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {children}
        </div>

        {/* Mobile Bottom Dock Navigation */}
        <div className="h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 flex items-center justify-around shrink-0 z-40">
          {screens.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectScreen(item.id)}
                className={`flex flex-col items-center gap-1 p-1 rounded-xl cursor-pointer transition-colors ${
                  isActive ? 'text-amber-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isActive ? 'bg-amber-100 text-amber-900' : 'bg-transparent'
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Home Indicator Bar */}
        <div className="h-4 bg-white flex items-center justify-center pb-1">
          <div className="w-28 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>

      {/* Bottom Pagination Dots */}
      <div className="flex items-center gap-2 mt-4">
        {screens.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelectScreen(s.id)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeScreen === s.id ? 'w-6 bg-amber-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            title={s.label}
          />
        ))}
      </div>
    </div>
  );
};
