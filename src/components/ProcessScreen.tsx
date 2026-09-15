import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Beaker,
  ShieldAlert,
  ChevronRight,
  Info,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/labData';
import { ThermalBadge, ChemicalBadge } from './Badges';
import {
  UltrasonicBathSvg,
  ThermalBathSvg,
  GradientDipSvg,
  RinseNeutralizeSvg,
  SpectrophotometerSvg,
} from './LabIllustrations';

export const ProcessScreen: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [checkedProtocols, setCheckedProtocols] = useState<{ [key: string]: boolean }>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(180);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeStepCompleted, setActiveStepCompleted] = useState<{ [key: string]: boolean }>({});

  const activeStep = PROCESS_STEPS[selectedStepIndex];

  // Default timer durations per step
  const stepDurations: { [key: string]: number } = {
    'step-01': 180,
    'step-02': 300,
    'step-03': 240,
    'step-04': 120,
    'step-05': 60,
  };

  useEffect(() => {
    setTimerSeconds(stepDurations[activeStep.id] || 180);
    setIsTimerRunning(false);
  }, [selectedStepIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setActiveStepCompleted((prev) => ({ ...prev, [activeStep.id]: true }));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, activeStep.id]);

  const toggleProtocol = (key: string) => {
    setCheckedProtocols((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderIllustration = (stepId: string) => {
    switch (stepId) {
      case 'step-01':
        return <UltrasonicBathSvg className="w-full h-36 rounded-lg" />;
      case 'step-02':
        return <ThermalBathSvg className="w-full h-36 rounded-lg" />;
      case 'step-03':
        return <GradientDipSvg className="w-full h-36 rounded-lg" />;
      case 'step-04':
        return <RinseNeutralizeSvg className="w-full h-36 rounded-lg" />;
      case 'step-05':
        return <SpectrophotometerSvg className="w-full h-36 rounded-lg" />;
      default:
        return null;
    }
  };

  return (
    <div id="process-flow-screen" className="space-y-6">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              SOP-CR39-TINT-V4.2
            </span>
            <span className="text-xs text-slate-500 font-mono">СТАНДАРТ ЧИСТОТЫ: ISO CLASS 7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Технологический процесс тонирования
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Поэтапная методика внедрения дисперсных нанопигментов в полимерную матрицу
            аллилдигликолькарбоната (CR-39) при температуре 92°C с контролем светопропускания.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="flex flex-col gap-2 min-w-[220px] bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Прогресс серии:</span>
            <span className="font-mono font-bold text-amber-700">
              {Object.keys(activeStepCompleted).length} из {PROCESS_STEPS.length} этапов
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-300 rounded-full"
              style={{
                width: `${(Object.keys(activeStepCompleted).length / PROCESS_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Steps List on Left, Active Stage Workbench on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Process Step Cards navigation */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Операционные переходы (5 фаз)
            </span>
            <span className="text-xs text-amber-700 font-medium">Кликните для выбора</span>
          </div>

          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            const isDone = activeStepCompleted[step.id];

            return (
              <div
                key={step.id}
                id={`process-card-${step.stepNumber}`}
                onClick={() => setSelectedStepIndex(idx)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-400/50 thermal-glow'
                    : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Active Indicator Strip */}
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-amber-600" />
                )}

                <div className="flex items-start justify-between gap-3">
                  {/* Step counter badge: ochre-tinted rounded square (#FEF3C7 background, #B45309 text) */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] flex items-center justify-center shrink-0 border border-amber-300/80 shadow-xs">
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-extrabold text-[#B45309]">
                        {step.stepNumber}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#0F172A] leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Metadata Slot: Top-right placement for process variables */}
                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{step.timeEstimate}</span>
                    </div>
                    {isDone && (
                      <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-600 font-semibold mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ЗАВЕРШЕНО</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom parameters row */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <ThermalBadge temperature={step.temperature} tolerance={step.tolerance} />
                    <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {step.dipCycle}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-amber-600 translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Detailed Operational Stage Workbench */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            {/* Stage Title and Active Badges */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#B45309] font-extrabold flex items-center justify-center text-xs">
                    {activeStep.stepNumber}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
                    Текущая технологическая станция
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {activeStep.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{activeStep.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ThermalBadge
                  temperature={activeStep.temperature}
                  tolerance={activeStep.tolerance}
                />
                <ChemicalBadge spec={activeStep.chemicalSpec} ph={activeStep.phValue} />
              </div>
            </div>

            {/* Interactive Equipment Diagram / SVG Illustration */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-mono">
                <span>СХЕМА АКТИВНОГО УЗЛА ОПТИЧЕСКОГО СТЕНДА:</span>
                <span className="text-amber-600 font-semibold">{activeStep.dipCycle}</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                {renderIllustration(activeStep.id)}
              </div>
            </div>

            {/* Interactive Cycle Timer Controller */}
            <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                    Таймер экспозиции фазы {activeStep.stepNumber}
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-amber-400 tracking-wider">
                    {formatTime(timerSeconds)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="process-timer-toggle-btn"
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide cursor-pointer transition-all ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Пауза</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Старт цикла</span>
                    </>
                  )}
                </button>

                <button
                  id="process-timer-reset-btn"
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(stepDurations[activeStep.id] || 180);
                  }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Сброс таймера"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description & Technical parameters */}
            <div className="mt-5 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {activeStep.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-3 gap-3">
                {activeStep.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-xl border border-slate-200 text-center"
                  >
                    <span className="text-[11px] text-slate-500 font-medium block">
                      {spec.label}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#0F172A] block mt-0.5">
                      {spec.value}
                    </span>
                    {spec.hint && (
                      <span className="text-[10px] text-amber-700 font-mono">{spec.hint}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Critical safety/warning note */}
              {activeStep.warningNote && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-950 flex items-start gap-3 text-xs leading-normal">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Критический регламент безопасности: </span>
                    <span>{activeStep.warningNote}</span>
                  </div>
                </div>
              )}

              {/* Operational Checklist for Technician */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wide font-mono">
                    Чек-лист оператора лаб-станции:
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {activeStep.criticalCheck}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {activeStep.protocols.map((protocol, pIdx) => {
                    const checkKey = `${activeStep.id}-${pIdx}`;
                    const isChecked = !!checkedProtocols[checkKey];

                    return (
                      <label
                        key={pIdx}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer text-xs ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 line-through opacity-80'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProtocol(checkKey)}
                          className="mt-0.5 accent-amber-600 h-4 w-4 rounded cursor-pointer"
                        />
                        <span className="flex-1 font-normal leading-relaxed">{protocol}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Next step button */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <button
                  type="button"
                  disabled={selectedStepIndex === 0}
                  onClick={() => setSelectedStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                >
                  ← Предыдущий шаг
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveStepCompleted((prev) => ({ ...prev, [activeStep.id]: true }));
                    if (selectedStepIndex < PROCESS_STEPS.length - 1) {
                      setSelectedStepIndex((prev) => prev + 1);
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/10 cursor-pointer"
                >
                  <span>Завершить шаг {activeStep.stepNumber} и продолжить</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
