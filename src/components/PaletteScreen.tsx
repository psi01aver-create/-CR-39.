import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  Sliders,
  Check,
  Search,
  Filter,
  Eye,
  Shield,
  Layers,
} from 'lucide-react';
import { COLOR_PALETTE } from '../data/labData';
import { ColorSwatch } from '../types';
import { IsoCategoryBadge } from './Badges';
import { LensApertureView } from './LabIllustrations';

interface PaletteScreenProps {
  onSelectSwatchForSimulation: (swatch: ColorSwatch) => void;
}

export const PaletteScreen: React.FC<PaletteScreenProps> = ({ onSelectSwatchForSimulation }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDensityMode, setSelectedDensityMode] = useState<'sample' | '15' | '50' | '85'>('sample');

  const filteredSwatches = COLOR_PALETTE.filter((swatch) => {
    const matchesSearch =
      swatch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swatch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swatch.dyeCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' ||
      (filterCategory === 'gradient' && swatch.isGradient) ||
      (filterCategory === 'solid' && !swatch.isGradient) ||
      swatch.categoryName.includes(filterCategory);

    return matchesSearch && matchesCategory;
  });

  const getEffectiveLtf = (swatch: ColorSwatch) => {
    if (selectedDensityMode === '15') return 15;
    if (selectedDensityMode === '50') return 50;
    if (selectedDensityMode === '85') return 85;
    return swatch.sampleLtf;
  };

  return (
    <div id="palette-catalog-screen" className="space-y-6">
      {/* Top Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="min-w-0 lg:flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              OPTICAL COLOR MATRIX 2026
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ДИСПЕРСНЫЕ НАНОПИГМЕНТЫ TCN-SERIES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Оптическая палитра & Светопропускание
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Колориметрические эталоны для полимеризации CR-39. Круглые апертуры линз с динамической
            визуализацией градиентных переходов и индексом термосовместимости.
          </p>
        </div>

        {/* Global Density Preview Selector (15%, 50%, 85% LTF) */}
        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 w-full md:w-auto min-w-0 lg:shrink-0">
          <span className="text-[11px] font-mono text-slate-400 block mb-1.5 uppercase font-medium">
            Режим симуляции плотности (LTF):
          </span>
          <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-slate-800 border border-slate-700">
            {[
              { id: 'sample', label: 'По умолчанию' },
              { id: '15', label: '15% LTF (Темный)' },
              { id: '50', label: '50% LTF (Средний)' },
              { id: '85', label: '85% LTF (Светлый)' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedDensityMode(mode.id as any)}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                  selectedDensityMode === mode.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            id="palette-search-input"
            type="text"
            placeholder="Поиск по названию, коду красителя или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {[
            { id: 'all', label: 'Все (8)' },
            { id: 'gradient', label: 'Градиенты' },
            { id: 'solid', label: 'Сплошные' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Swatch & Optical Palette Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSwatches.map((swatch) => {
          const effectiveLtf = getEffectiveLtf(swatch);

          return (
            <div
              key={swatch.id}
              id={`swatch-card-${swatch.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header: Swatch Name & Category */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {swatch.dyeCode}
                  </span>
                  <IsoCategoryBadge category={swatch.isoCategory} />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#0F172A] group-hover:text-amber-800 transition-colors">
                  {swatch.name}
                </h3>
                <span className="text-xs text-slate-500">{swatch.categoryName}</span>
              </div>

              {/* Center: Circular Lens-Shaped Aperture */}
              <div className="p-6 flex flex-col items-center justify-center bg-radial from-slate-50 to-white relative">
                {/* Background optical crosshairs grid */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <div className="w-40 h-[1px] bg-slate-400" />
                  <div className="h-40 w-[1px] bg-slate-400 absolute" />
                </div>

                {/* Aperture Component with reflection & gradient */}
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <LensApertureView
                    hexStart={swatch.hexStart}
                    hexEnd={swatch.hexEnd}
                    isGradient={swatch.isGradient}
                    ltfPct={effectiveLtf}
                    sizePx={136}
                    showSheen={true}
                    arCoating={true}
                  />

                  {/* Overlay badge with current LTF */}
                  <div className="absolute bottom-1 right-1 bg-slate-950/85 backdrop-blur-xs text-amber-300 font-mono text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40 shadow-xs">
                    {effectiveLtf}% LTF
                  </div>
                </div>

                <p className="text-xs text-slate-600 text-center mt-4 line-clamp-2 px-2 leading-relaxed">
                  {swatch.description}
                </p>
              </div>

              {/* Data Footer: hex reference, immersion duration in seconds, thermal bath compatibility index */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {/* Hex & Type */}
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">HEX REF:</span>
                    <span className="font-bold text-slate-800 uppercase">{swatch.hexStart}</span>
                  </div>

                  {/* Immersion Duration */}
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">ВАННА 92°C:</span>
                    <span className="font-bold text-amber-700">{swatch.immersionDurationSec} сек</span>
                  </div>

                  {/* Thermal Bath Compatibility Index */}
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">ИНДЕКС ТЕРМО:</span>
                    <span className="font-bold text-emerald-700">
                      {swatch.thermalBathCompatIndex} / 100
                    </span>
                  </div>

                  {/* UV Cut-off */}
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">УФ БАРЬЕР:</span>
                    <span className="font-bold text-sky-700">{swatch.uvCutoffNm} нм</span>
                  </div>
                </div>

                {/* Action button: Transport to Live Simulator */}
                <button
                  id={`btn-load-sim-${swatch.id}`}
                  type="button"
                  onClick={() => onSelectSwatchForSimulation(swatch)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-sm shadow-amber-900/10 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Открыть в симуляторе</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
