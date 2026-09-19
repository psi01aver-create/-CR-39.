import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Flame,
  Clock,
  Beaker,
  Shield,
  Eye,
  RotateCcw,
  Sparkles,
  Download,
  AlertTriangle,
  Info,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { COLOR_PALETTE, SUBSTRATES } from '../data/labData';
import { ColorSwatch } from '../types';
import { ThermalBadge, IsoCategoryBadge } from './Badges';
import { LensApertureView } from './LabIllustrations';

interface SimulatorScreenProps {
  initialSwatch?: ColorSwatch;
}

export const SimulatorScreen: React.FC<SimulatorScreenProps> = ({ initialSwatch }) => {
  const defaultSwatch = initialSwatch || COLOR_PALETTE[1]; // Warm Amber Gradient

  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch>(defaultSwatch);
  const [isGradient, setIsGradient] = useState<boolean>(defaultSwatch.isGradient);
  const [bathTemp, setBathTemp] = useState<number>(92);
  const [immersionTime, setImmersionTime] = useState<number>(defaultSwatch.immersionDurationSec);
  const [dyeRatio, setDyeRatio] = useState<number>(10); // 1:10
  const [arCoating, setArCoating] = useState<boolean>(true);
  const [uvAdditive, setUvAdditive] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'mount' | 'through_lens'>('mount');
  const [customHex, setCustomHex] = useState<string>(defaultSwatch.hexStart);
  const [customEndHex, setCustomEndHex] = useState<string>(defaultSwatch.hexEnd);

  const currentSubstrate = SUBSTRATES[0]; // Сайт работает только с CR-39

  // Mathematical Optical physics model of dye diffusion
  // CR-39 absorbs disperse dyes by Fickian diffusion: Depth ~ k * sqrt(t)
  // Higher temp accelerates diffusion exponentially via Arrhenius relation
  const calculations = useMemo(() => {
    // Reference temp is 92°C
    const tempDelta = bathTemp - 92;
    // Diffusion rate coefficient
    const tempFactor = Math.pow(1.08, tempDelta);
    // Substrate multiplier
    const subFactor = currentSubstrate.tintSpeedMultiplier;
    // Concentration factor (1:10 is baseline 1.0)
    const concFactor = 10 / dyeRatio;

    // Effective diffusion product
    const diffusionProduct = Math.sqrt(immersionTime) * tempFactor * subFactor * concFactor;

    // Optical transmission LTF: base 100% decaying exponentially
    const k = 0.095;
    let ltf = Math.round(100 * Math.exp(-k * Math.pow(diffusionProduct, 0.58)));
    // Clamp between 4% and 95%
    ltf = Math.max(4, Math.min(94, ltf));

    // Calculate ISO Category
    let isoCategory: 0 | 1 | 2 | 3 | 4 = 0;
    if (ltf < 8) isoCategory = 4;
    else if (ltf < 18) isoCategory = 3;
    else if (ltf < 43) isoCategory = 2;
    else if (ltf < 80) isoCategory = 1;
    else isoCategory = 0;

    // Penetration depth in micrometers (um)
    const penetrationDepth = (
      currentSubstrate.penetrationDepthUm *
      Math.min(1.5, Math.sqrt(immersionTime / 300) * tempFactor)
    ).toFixed(1);

    // Thermal warning if temperature exceeds safe boundary
    const isOverheating = bathTemp > 95.0;
    const isUnderheating = bathTemp < 88.0;

    return {
      ltf,
      absorption: 100 - ltf,
      isoCategory,
      penetrationDepth,
      isOverheating,
      isUnderheating,
    };
  }, [bathTemp, immersionTime, dyeRatio, currentSubstrate]);

  const handleSelectSwatch = (swatch: ColorSwatch) => {
    setSelectedSwatch(swatch);
    setIsGradient(swatch.isGradient);
    setImmersionTime(swatch.immersionDurationSec);
    setCustomHex(swatch.hexStart);
    setCustomEndHex(swatch.hexEnd);
  };

  const handleResetToOptimal = () => {
    setBathTemp(currentSubstrate.recommendedTemp);
    setImmersionTime(selectedSwatch.immersionDurationSec);
    setDyeRatio(10);
    setIsGradient(selectedSwatch.isGradient);
    setArCoating(true);
    setUvAdditive(true);
  };

  return (
    <div id="simulator-calculator-screen" className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              SIMULATOR & BATH KINETICS
            </span>
            <span className="text-xs text-slate-500 font-mono">ДИФФУЗИЯ ФИКА & ЗАКОН БУГЕРА</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Симулятор линзы и расчет ванны
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Математическое моделирование глубины диффузии красителя в зависимости от температуры
            ванны, времени экспозиции, типа субстрата и концентрации раствора.
          </p>
        </div>
      </div>

      {/* Main Split-View: Controls on Left (7 cols), Optical Render on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameter Sliders & Bath Formulators */}
        <div className="lg:col-span-7 space-y-5">
          {/* Substrate Info Banner */}
          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold uppercase">{currentSubstrate.name}</span>
              <span className="text-slate-400">Показатель: {currentSubstrate.refractiveIndex}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{currentSubstrate.description}</p>
            {currentSubstrate.carrierRequired && (
              <div className="mt-2 text-xs bg-amber-950/80 border border-amber-600/50 text-amber-200 p-2 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Требуется носитель:</strong> {currentSubstrate.carrierType}
                </span>
              </div>
            )}
          </div>

          {/* Controls Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#0F172A]">
                Параметры термодиффузионной ванны
              </h3>
              <button
                type="button"
                onClick={handleResetToOptimal}
                className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сброс к оптимальным</span>
              </button>
            </div>

            {/* Slider 1: Bath Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Температура ванны (PID Нагрев):</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-slate-900">{bathTemp}°C</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (Оптим. {currentSubstrate.recommendedTemp}°C)
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="80"
                max="98"
                step="0.5"
                value={bathTemp}
                onChange={(e) => setBathTemp(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>80°C (Замедленно)</span>
                <span className="text-amber-700 font-bold">92°C (CR-39)</span>
                <span className="text-red-600 font-bold">98°C (Риск Haze!)</span>
              </div>

              {calculations.isOverheating && (
                <div className="text-xs bg-red-50 border border-red-200 text-red-800 p-2 rounded-lg flex items-center gap-2 mt-1">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    <strong>Внимание:</strong> Температура {bathTemp}°C вызывает деструкцию CR-39 и
                    молочную дымку!
                  </span>
                </div>
              )}
            </div>

            {/* Slider 2: Immersion Duration */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span>Время выдержки в ванне:</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {immersionTime} сек
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ({(immersionTime / 60).toFixed(1)} мин)
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="600"
                step="5"
                value={immersionTime}
                onChange={(e) => setImmersionTime(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>10 сек (Легкий фильтр)</span>
                <span>180 сек (Город)</span>
                <span>600 сек (Макс. солнцезащита)</span>
              </div>
            </div>

            {/* Slider 3: Dye Concentration */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Beaker className="w-4 h-4 text-cyan-600" />
                  <span>Разбавление красителя TCN:</span>
                </span>
                <span className="font-mono font-bold text-sm text-slate-900">
                  1 : {dyeRatio} H₂O
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={dyeRatio}
                onChange={(e) => setDyeRatio(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>1:5 (Плотный концентрат)</span>
                <span className="text-amber-700 font-bold">1:10 (Стандарт)</span>
                <span>1:20 (Светлый пастельный)</span>
              </div>
            </div>

            {/* Toggles: Gradient vs Solid, AR Coating, UV blocker */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={isGradient}
                  onChange={(e) => setIsGradient(e.target.checked)}
                  className="accent-amber-600 rounded h-4 w-4"
                />
                <div>
                  <span className="font-semibold text-slate-800 block">Градиент</span>
                  <span className="text-[10px] text-slate-500">Плавный переход</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={arCoating}
                  onChange={(e) => setArCoating(e.target.checked)}
                  className="accent-amber-600 rounded h-4 w-4"
                />
                <div>
                  <span className="font-semibold text-slate-800 block">Антиблик (AR)</span>
                  <span className="text-[10px] text-slate-500">Зеленый блик</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={uvAdditive}
                  onChange={(e) => setUvAdditive(e.target.checked)}
                  className="accent-amber-600 rounded h-4 w-4"
                />
                <div>
                  <span className="font-semibold text-slate-800 block">UV400 Блокатор</span>
                  <span className="text-[10px] text-slate-500">100% УФ-защита</span>
                </div>
              </label>
            </div>

            {/* Quick Swatch Presets */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-600 font-mono uppercase block">
                Готовые рецепты пигментов:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COLOR_PALETTE.slice(0, 4).map((swatch) => (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => handleSelectSwatch(swatch)}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedSwatch.id === swatch.id
                        ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: swatch.hexStart }}
                      />
                      <span className="text-[11px] font-bold text-slate-800 truncate">
                        {swatch.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Optical Lens Viewport & Measured Results */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Visualizer Container */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            {/* View Mode Selector: Lab Mount vs Through Lens View */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-xs sm:text-sm text-[#0F172A]">
                  Оптический смотровой стенд
                </span>
              </div>

              <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('mount')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                    viewMode === 'mount' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Линза
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('through_lens')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                    viewMode === 'through_lens'
                      ? 'bg-white shadow-xs text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  Вид сквозь линзу
                </button>
              </div>
            </div>

            {/* Visual Viewport Area */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 border border-slate-300/80 flex items-center justify-center overflow-hidden">
              {viewMode === 'mount' ? (
                /* Mode 1: Optical Lab Inspection Mount */
                <div className="flex flex-col items-center justify-center">
                  {/* Grid background behind lens */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  <div className="relative scale-110 sm:scale-125 transition-transform duration-300">
                    <LensApertureView
                      hexStart={customHex}
                      hexEnd={customEndHex}
                      isGradient={isGradient}
                      ltfPct={calculations.ltf}
                      sizePx={160}
                      showSheen={true}
                      arCoating={arCoating}
                    />
                  </div>

                  {/* Calibration ticks */}
                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400">
                    ДИАМЕТР: Ø 70 мм | БАЗОВАЯ КРИВИЗНА: 6.00 D
                  </div>
                </div>
              ) : (
                /* Mode 2: Real-world scene seen through the tinted lens */
                <div className="relative w-full h-full">
                  {/* Background realistic landscape */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80)',
                    }}
                  />

                  {/* Center lens cutout showing color filter applied */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-48 h-48 rounded-full border-4 border-white/80 shadow-2xl relative overflow-hidden flex items-center justify-center"
                      style={{
                        backdropFilter: 'blur(0.5px)',
                      }}
                    >
                      {/* Tint filter overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isGradient
                            ? `linear-gradient(to bottom, ${customHex} ${
                                100 - calculations.ltf
                              }%, ${customEndHex} ${(100 - calculations.ltf) * 0.3}%)`
                            : customHex,
                          opacity: Math.max(0.15, 1 - calculations.ltf / 100),
                          mixBlendMode: 'multiply',
                        }}
                      />

                      {/* AR reflection */}
                      {arCoating && (
                        <div className="absolute top-2 left-4 w-32 h-16 rounded-full border-t-2 border-emerald-400/60 rotate-[-20deg]" />
                      )}

                      <span className="relative z-10 text-[11px] font-bold font-mono text-white/90 drop-shadow bg-black/40 px-2 py-0.5 rounded">
                        Светопропускание: {calculations.ltf}%
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    Симуляция контрастности на ярком солнце
                  </div>
                </div>
              )}
            </div>

            {/* Calculated Metrology Cards */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              {/* LTF Transmission */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300">
                <span className="text-[10px] text-amber-800 uppercase block font-semibold">
                  Светопропускание (LTF)
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold text-amber-950 block mt-0.5">
                  {calculations.ltf}%
                </span>
                <span className="text-[10px] text-amber-700">
                  Поглощение: {calculations.absorption}%
                </span>
              </div>

              {/* ISO Category */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                  Категория фильтра
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold text-amber-400 block mt-0.5">
                  CAT {calculations.isoCategory}
                </span>
                <span className="text-[10px] text-slate-300">Стандарт ISO 12312-1</span>
              </div>

              {/* Penetration Depth */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                  Глубина диффузии
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-slate-900 block mt-0.5">
                  {calculations.penetrationDepth} мкм
                </span>
                <span className="text-[10px] text-slate-500">В поверхностный слой</span>
              </div>

              {/* UV Cut-off */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                  УФ-отсечение
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-sky-700 block mt-0.5">
                  {uvAdditive ? 'UV 400 нм' : 'UV 380 нм'}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  {uvAdditive ? '100% Защита' : 'Стандартная'}
                </span>
              </div>
            </div>

            {/* Protocol Report Card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>ПАСПОРТ ЗАМЕСА:</span>
                <span className="text-amber-700 font-bold">BATCH #2026-TINT</span>
              </div>
              <div className="text-slate-700 space-y-1 text-[11px]">
                <div>
                  • Субстрат: <strong>{currentSubstrate.name}</strong> ({currentSubstrate.code})
                </div>
                <div>
                  • Время экспозиции: <strong>{immersionTime} сек</strong> при{' '}
                  <strong>{bathTemp}°C</strong>
                </div>
                <div>
                  • Раствор: <strong>TCN 1:{dyeRatio}</strong> | Профиль:{' '}
                  <strong>{isGradient ? 'Градиентный' : 'Равномерный'}</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Готово к передаче на манипулятор
                </span>
                <span className="text-[10px] font-mono text-slate-400">ΔE &lt; 0.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
