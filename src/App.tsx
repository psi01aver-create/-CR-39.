import React, { useState, useEffect } from 'react';
import { ActiveScreen, ColorSwatch } from './types';
import { COLOR_PALETTE } from './data/labData';
import { Header } from './components/Header';
import { ProcessScreen } from './components/ProcessScreen';
import { PaletteScreen } from './components/PaletteScreen';
import { SimulatorScreen } from './components/SimulatorScreen';
import { TroubleshootingScreen } from './components/TroubleshootingScreen';
import { MobileDeckFrame } from './components/MobileDeckFrame';
import { Layers, Palette, Sliders, AlertTriangle, ShieldCheck, Microscope } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('process');
  const [isMobileDeckMode, setIsMobileDeckMode] = useState<boolean>(false);
  const [simSwatch, setSimSwatch] = useState<ColorSwatch>(COLOR_PALETTE[1]);
  const [liveTemp, setLiveTemp] = useState<number>(92.2);

  // Subtle telemetry heartbeat simulation (±0.2°C PID thermal drift)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTemp(92.0 + Math.sin(Date.now() / 4000) * 0.35);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation for fast switching between screens
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === '1') setActiveScreen('process');
      if (e.key === '2') setActiveScreen('palette');
      if (e.key === '3') setActiveScreen('simulator');
      if (e.key === '4') setActiveScreen('troubleshooting');
      if (e.key === 'm' || e.key === 'M') setIsMobileDeckMode((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSwatchForSimulation = (swatch: ColorSwatch) => {
    setSimSwatch(swatch);
    setActiveScreen('simulator');
  };

  const renderActiveScreenContent = () => {
    switch (activeScreen) {
      case 'process':
        return <ProcessScreen />;
      case 'palette':
        return (
          <PaletteScreen onSelectSwatchForSimulation={handleSelectSwatchForSimulation} />
        );
      case 'simulator':
        return <SimulatorScreen initialSwatch={simSwatch} key={simSwatch.id} />;
      case 'troubleshooting':
        return <TroubleshootingScreen />;
      default:
        return <ProcessScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-['Inter',sans-serif]">
      {/* Top Lab Header */}
      <Header
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        isMobileDeckMode={isMobileDeckMode}
        onToggleMobileDeck={() => setIsMobileDeckMode(!isMobileDeckMode)}
        liveTemp={liveTemp}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isMobileDeckMode ? (
          <MobileDeckFrame
            activeScreen={activeScreen}
            onSelectScreen={setActiveScreen}
            onCloseDeck={() => setIsMobileDeckMode(false)}
          >
            {renderActiveScreenContent()}
          </MobileDeckFrame>
        ) : (
          renderActiveScreenContent()
        )}
      </main>

      {/* Lab Engineering Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
              OA
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-slate-800">
                Optical Amber Lab
              </span>
              <span className="text-slate-400 ml-2">
                CR-39 Thermal Immersion & Spectrophotometric Metrology Platform
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ISO 12312-1 / ANSI Z80.3
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Microscope className="w-3.5 h-3.5 text-amber-600" />
              TCN-CRX 92°C ±0.5°C PID
            </span>
            <span className="text-slate-400">
              Горячие клавиши: 1-4 экраны, M — мобильный дек
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
