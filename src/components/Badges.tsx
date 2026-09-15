import React from 'react';
import { Flame, Beaker, ShieldCheck, Thermometer } from 'lucide-react';
import { SubstrateId } from '../types';

interface ThermalBadgeProps {
  temperature: string;
  tolerance?: string;
  isHot?: boolean;
}

export const ThermalBadge: React.FC<ThermalBadgeProps> = ({
  temperature,
  tolerance = '±1°C',
  isHot = true,
}) => {
  return (
    <div
      id={`thermal-badge-${temperature.replace(/[^a-zA-Z0-9]/g, '')}`}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-amber-500/30 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 text-amber-900 shadow-sm"
    >
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
      </span>
      {isHot ? (
        <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      ) : (
        <Thermometer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      )}
      <span className="font-mono font-bold text-amber-950">{temperature}</span>
      <span className="text-amber-700/80 text-[10px] font-mono">[{tolerance}]</span>
    </div>
  );
};

interface ChemicalBadgeProps {
  spec: string;
  ph?: string;
  variant?: 'slate' | 'amber';
}

export const ChemicalBadge: React.FC<ChemicalBadgeProps> = ({
  spec,
  ph,
  variant = 'slate',
}) => {
  if (variant === 'amber') {
    return (
      <div
        id={`chem-badge-${spec.replace(/[^a-zA-Z0-9]/g, '')}`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-amber-100/80 text-amber-900 border border-amber-300/60"
      >
        <Beaker className="w-3 h-3 text-amber-700 shrink-0" />
        <span>{spec}</span>
        {ph && <span className="text-amber-700 font-bold ml-1">{ph}</span>}
      </div>
    );
  }

  return (
    <div
      id={`chem-badge-${spec.replace(/[^a-zA-Z0-9]/g, '')}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[#1E293B] text-slate-100 border border-slate-700 shadow-sm"
    >
      <Beaker className="w-3 h-3 text-cyan-400 shrink-0" />
      <span>{spec}</span>
      {ph && (
        <span className="text-emerald-400 font-semibold border-l border-slate-700 pl-1.5 ml-0.5">
          {ph}
        </span>
      )}
    </div>
  );
};

interface IsoCategoryBadgeProps {
  category: 0 | 1 | 2 | 3 | 4;
  ltfPct?: number;
}

export const IsoCategoryBadge: React.FC<IsoCategoryBadgeProps> = ({ category, ltfPct }) => {
  const categoryLabels = {
    0: { label: 'Кат. 0 (80-100% LTF)', desc: 'Прозрачные / туман', color: 'bg-yellow-50 text-yellow-800 border-yellow-300' },
    1: { label: 'Кат. 1 (43-80% LTF)', desc: 'Слабое солнце', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    2: { label: 'Кат. 2 (18-43% LTF)', desc: 'Среднее солнце', color: 'bg-orange-50 text-orange-800 border-orange-300' },
    3: { label: 'Кат. 3 (8-18% LTF)', desc: 'Яркое солнце', color: 'bg-stone-100 text-stone-800 border-stone-300' },
    4: { label: 'Кат. 4 (3-8% LTF)', desc: 'Экстремальное / горы', color: 'bg-slate-900 text-white border-slate-700' },
  };

  const current = categoryLabels[category];

  return (
    <div
      id={`iso-cat-badge-${category}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.color}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
      <span>ISO 12312-1 {current.label}</span>
      {ltfPct !== undefined && (
        <span className="font-mono font-bold underline decoration-amber-500/50">{ltfPct}% LTF</span>
      )}
    </div>
  );
};

interface SubstrateSegmentedControlProps {
  selected: SubstrateId;
  onChange: (id: SubstrateId) => void;
}

export const SubstrateSegmentedControl: React.FC<SubstrateSegmentedControlProps> = ({
  selected,
  onChange,
}) => {
  const options: { id: SubstrateId; label: string; index: string }[] = [
    { id: 'cr39', label: 'CR-39 Standard', index: 'n=1.499' },
    { id: 'polycarbonate', label: 'Polycarbonate', index: 'n=1.586' },
    { id: 'hi_index', label: 'Hi-Index 1.60/1.67', index: 'n=1.60+' },
  ];

  return (
    <div
      id="substrate-segmented-control"
      className="inline-flex p-1 rounded-full bg-slate-900/90 p-1 border border-slate-700/80 shadow-inner max-w-full overflow-x-auto"
    >
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            id={`btn-substrate-${option.id}`}
            type="button"
            onClick={() => onChange(option.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
              isSelected
                ? 'bg-amber-600 text-white font-semibold shadow-md ring-1 ring-amber-400/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{option.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                isSelected ? 'bg-amber-700/80 text-amber-100' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {option.index}
            </span>
          </button>
        );
      })}
    </div>
  );
};
