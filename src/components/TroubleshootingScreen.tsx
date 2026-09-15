import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronDown,
  Search,
  Wrench,
  Beaker,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Flame,
  FileText,
} from 'lucide-react';
import { TROUBLESHOOTING_CASES } from '../data/labData';

export const TroubleshootingScreen: React.FC = () => {
  const [openIds, setOpenIds] = useState<{ [key: string]: boolean }>({
    'case-01': true, // Keep first open by default
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCases = TROUBLESHOOTING_CASES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.rootCause.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="troubleshooting-screen" className="space-y-6">
      {/* Top Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              QA DIAGNOSTICS & DEFECT PROTOCOLS
            </span>
            <span className="text-xs text-slate-500 font-mono">РЕГЛАМЕНТ РЕКЛАМАЦИЙ И БРАКА</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Диагностика дефектов & Лабораторный FAQ
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Клинические протоколы устранения поверхностной дымки (Surface Haze), полошения градиента,
            выцветания и отслаивания антибликовых покрытий.
          </p>
        </div>

        {/* Quick status box */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="text-slate-500 block">База дефектов:</span>
            <span className="font-bold text-slate-900 font-mono">
              {TROUBLESHOOTING_CASES.length} типовых инцидентов
            </span>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          id="troubleshoot-search-input"
          type="text"
          placeholder="Поиск по симптому дефекта (дымка, полосы, отслаивание, УФ, асимметрия)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 bg-transparent"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
          >
            Очистить
          </button>
        )}
      </div>

      {/* Interactive FAQ & Troubleshooting Drawers */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-[#E2E8F0] overflow-hidden">
        {filteredCases.map((item) => {
          const isOpen = !!openIds[item.id];

          return (
            <div key={item.id} id={`troubleshoot-item-${item.id}`} className="transition-colors">
              {/* Trigger row */}
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                      isOpen
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#0F172A]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Amber-accented chevron indicator */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 shrink-0 ${
                    isOpen
                      ? 'rotate-180 bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-500 hover:text-amber-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Expanded State: Soft graphite surface (#F8FAFC) delivering troubleshooting protocols */}
              {isOpen && (
                <div className="p-5 sm:p-6 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-4">
                  {/* Symptom & Root Cause Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Symptom */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-slate-400 uppercase font-mono block">
                        Визуальный симптом:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {item.symptom}
                      </p>
                    </div>

                    {/* Root Cause */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-amber-700 uppercase font-mono block">
                        Физико-химическая первопричина:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.rootCause}
                      </p>
                    </div>
                  </div>

                  {/* Chemical Remedy Ratio Badge */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-950 font-semibold">
                      <Beaker className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Рекомендуемый химический реагент нейтрализации:</span>
                    </div>
                    <span className="font-mono font-bold text-amber-900 bg-white px-2.5 py-1 rounded border border-amber-300">
                      {item.chemicalRatio}
                    </span>
                  </div>

                  {/* Actionable Lab Corrections Protocol */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide font-mono block">
                      Пошаговый технологический протокол исправления:
                    </span>
                    <div className="space-y-1.5">
                      {item.labProtocol.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800"
                        >
                          <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Critical Metrology Checklist */}
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase font-mono block mb-2">
                      Контрольный чек-лист предотвращения повторного брака:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.criticalChecklist.map((check, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center gap-2 p-2 bg-slate-100/80 rounded-lg text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Laboratory Chemical Safety Summary */}
      <div className="bg-[#0F172A] text-slate-200 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white uppercase tracking-wide block font-['Plus_Jakarta_Sans',sans-serif]">
              Стандарт безопасности термованн MSDS TCN-CRX
            </span>
            <span className="text-slate-400">
              Работы с горячими ваннами 92°C допускаются только в термозащитных нитриловых перчатках
              и защитных экранах.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
            ВЕНТИЛЯЦИЯ: 450 м³/ч
          </span>
        </div>
      </div>
    </div>
  );
};
