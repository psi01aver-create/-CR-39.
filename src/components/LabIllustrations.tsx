import React from 'react';

export const UltrasonicBathSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" rx="12" fill="#0F172A" />
    {/* Tank Outer */}
    <rect x="50" y="30" width="300" height="140" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="2" />
    {/* Fluid Fill */}
    <rect x="60" y="60" width="280" height="100" rx="4" fill="#0284C7" fillOpacity="0.25" />
    {/* Ultrasonic Transducers at bottom */}
    <rect x="90" y="165" width="45" height="12" rx="2" fill="#38BDF8" />
    <rect x="175" y="165" width="50" height="12" rx="2" fill="#38BDF8" />
    <rect x="265" y="165" width="45" height="12" rx="2" fill="#38BDF8" />
    <path d="M112 165 L112 145 M199 165 L199 145 M287 165 L287 145" stroke="#38BDF8" strokeDasharray="3 3" />
    {/* Acoustic cavitation wave lines */}
    <path d="M70 140 Q 135 125, 200 140 T 330 140" stroke="#7DD3FC" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
    <path d="M70 115 Q 135 100, 200 115 T 330 115" stroke="#7DD3FC" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
    {/* Suspended Lens in Basket */}
    <path d="M140 40 L160 90 L240 90 L260 40" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" fill="none" />
    <circle cx="185" cy="100" r="24" stroke="#E2E8F0" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
    <circle cx="215" cy="100" r="24" stroke="#E2E8F0" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
    {/* Micro bubbles */}
    <circle cx="180" cy="120" r="2.5" fill="#BAE6FD" opacity="0.8" />
    <circle cx="190" cy="85" r="2" fill="#BAE6FD" opacity="0.9" />
    <circle cx="210" cy="115" r="3" fill="#BAE6FD" opacity="0.7" />
    <circle cx="225" cy="80" r="1.5" fill="#BAE6FD" opacity="0.8" />
    {/* Readout label */}
    <rect x="70" y="38" width="85" height="18" rx="4" fill="#0F172A" />
    <text x="76" y="51" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">40 kHz ACTIVE</text>
    <text x="250" y="51" fill="#94A3B8" fontSize="10" fontFamily="monospace">45°C ±2°</text>
  </svg>
);

export const ThermalBathSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" rx="12" fill="#0F172A" />
    {/* Tank */}
    <rect x="50" y="30" width="300" height="140" rx="8" fill="#1E293B" stroke="#B45309" strokeWidth="2" />
    {/* Dye Solution with heat gradient */}
    <defs>
      <linearGradient id="dyeHeatGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#92400E" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <rect x="60" y="65" width="280" height="95" rx="4" fill="url(#dyeHeatGrad)" />
    {/* Heat coils at bottom */}
    <path d="M80 150 Q95 140 110 150 T140 150 T170 150 T200 150 T230 150 T260 150 T290 150 T320 150" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* PT100 Sensor Probe */}
    <path d="M90 40 L90 110" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
    <circle cx="90" cy="112" r="4" fill="#EF4444" />
    {/* Thermal convection arrows */}
    <path d="M150 140 Q160 100 150 75" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
    <path d="M250 140 Q240 100 250 75" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
    {/* Submerged Lens */}
    <ellipse cx="200" cy="100" rx="30" ry="24" stroke="#FEF3C7" strokeWidth="3" fill="rgba(217, 119, 6, 0.4)" />
    <path d="M195 90 Q 200 70 200 35" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
    {/* PID Readout */}
    <rect x="235" y="36" width="105" height="22" rx="4" fill="#0F172A" stroke="#D97706" strokeWidth="1" />
    <text x="242" y="51" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">PID: 92.0°C</text>
    <text x="315" y="51" fill="#10B981" fontSize="9" fontFamily="monospace">±0.4°</text>
  </svg>
);

export const GradientDipSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" rx="12" fill="#0F172A" />
    {/* Servo Rail Mechanism */}
    <rect x="185" y="20" width="30" height="160" rx="4" fill="#334155" stroke="#475569" />
    <path d="M200 25 L200 175" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 3" />
    {/* Stepper Motor Top */}
    <rect x="175" y="15" width="50" height="24" rx="4" fill="#475569" />
    <circle cx="200" cy="27" r="5" fill="#38BDF8" />
    {/* Motor lead arm */}
    <rect x="140" y="65" width="120" height="14" rx="3" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />
    {/* Suspension clips holding lens */}
    <path d="M150 78 L150 95 M250 78 L250 95" stroke="#E2E8F0" strokeWidth="2" />
    {/* Lens with gradient shading */}
    <defs>
      <linearGradient id="lensGradVisual" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#78350F" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#D97706" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="115" rx="45" ry="34" fill="url(#lensGradVisual)" stroke="#FEF3C7" strokeWidth="2" />
    {/* Liquid meniscus surface */}
    <path d="M60 135 L340 135" stroke="#D97706" strokeWidth="2" strokeDasharray="5 3" />
    <rect x="60" y="136" width="280" height="40" fill="#92400E" fillOpacity="0.25" />
    {/* Motion arrows */}
    <path d="M125 90 L125 125 M125 90 L121 97 M125 90 L129 97" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M125 125 L121 118 M125 125 L129 118" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <text x="75" y="112" fill="#F59E0B" fontSize="10" fontFamily="monospace">v(t) = S-curve</text>
    {/* Readout */}
    <rect x="260" y="35" width="115" height="20" rx="4" fill="#0F172A" />
    <text x="266" y="49" fill="#E2E8F0" fontSize="10" fontFamily="monospace">Step: 0.05 mm</text>
  </svg>
);

export const RinseNeutralizeSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" rx="12" fill="#0F172A" />
    {/* Chamber 1: Fixer (60°C) */}
    <rect x="40" y="35" width="150" height="135" rx="6" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />
    <rect x="48" y="70" width="134" height="92" rx="3" fill="#0284C7" fillOpacity="0.3" />
    <text x="50" y="55" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">ВАННА 1: COLOR LOCK 60°C</text>
    {/* Chamber 2: Cold Cascade DI Water (20°C) */}
    <rect x="210" y="35" width="150" height="135" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
    <rect x="218" y="70" width="134" height="92" rx="3" fill="#10B981" fillOpacity="0.25" />
    <text x="218" y="55" fill="#34D399" fontSize="10" fontFamily="monospace" fontWeight="bold">ВАННА 2: ДЕИОНИЗАТ 20°C</text>
    {/* Lens transfer arc */}
    <path d="M115 100 Q 175 40 285 100" stroke="#F8FAFC" strokeWidth="2" strokeDasharray="4 3" fill="none" />
    <ellipse cx="115" cy="110" rx="20" ry="16" fill="rgba(217,119,6,0.5)" stroke="#FEF3C7" strokeWidth="1.5" />
    <ellipse cx="285" cy="110" rx="20" ry="16" fill="rgba(217,119,6,0.3)" stroke="#E2E8F0" strokeWidth="1.5" />
    {/* Clean bubbles / rinse spray */}
    <circle cx="275" cy="95" r="2" fill="#A7F3D0" />
    <circle cx="295" cy="98" r="2.5" fill="#A7F3D0" />
  </svg>
);

export const SpectrophotometerSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" rx="12" fill="#0F172A" />
    {/* Light Source Lamp */}
    <rect x="40" y="80" width="45" height="40" rx="4" fill="#334155" stroke="#94A3B8" />
    <circle cx="62" cy="100" r="10" fill="#FDE047" />
    <text x="42" y="70" fill="#CBD5E1" fontSize="9" fontFamily="monospace">XENON LAMP</text>
    {/* Monochromator / Beam */}
    <path d="M85 100 L160 100" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    {/* Lens Under Inspection in Holder */}
    <rect x="175" y="45" width="8" height="110" rx="2" fill="#475569" />
    <ellipse cx="179" cy="100" rx="7" ry="40" fill="#D97706" fillOpacity="0.75" stroke="#FEF3C7" strokeWidth="1.5" />
    <text x="145" y="40" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold">CR-39 LENS</text>
    {/* Attenuated Transmitted Light Beam */}
    <path d="M187 100 L280 100" stroke="#FDE047" strokeWidth="2.5" opacity="0.45" strokeDasharray="5 3" />
    {/* Photodiode Array Sensor */}
    <rect x="280" y="75" width="40" height="50" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
    <text x="270" y="65" fill="#38BDF8" fontSize="9" fontFamily="monospace">ARRAY DETECTOR</text>
    {/* Digital QA Readout Box */}
    <rect x="240" y="140" width="135" height="40" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
    <text x="250" y="157" fill="#34D399" fontSize="11" fontFamily="monospace" fontWeight="bold">LTF: 15.2% PASS</text>
    <text x="250" y="172" fill="#E2E8F0" fontSize="9" fontFamily="monospace">UV400: 99.8% CUT-OFF</text>
  </svg>
);

export const LensApertureView: React.FC<{
  hexStart: string;
  hexEnd: string;
  isGradient: boolean;
  ltfPct: number;
  sizePx?: number;
  showSheen?: boolean;
  arCoating?: boolean;
}> = ({
  hexStart,
  hexEnd,
  isGradient,
  ltfPct,
  sizePx = 140,
  showSheen = true,
  arCoating = true,
}) => {
  const gradientId = `lensGrad-${hexStart.replace('#', '')}-${hexEnd.replace('#', '')}-${isGradient ? 'grad' : 'solid'}`;

  // Opacity derived from LTF (lower LTF = higher optical density)
  const density = Math.min(0.95, Math.max(0.15, 1 - ltfPct / 100));

  return (
    <div
      className="relative rounded-full shadow-inner flex items-center justify-center select-none overflow-hidden"
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.35), 0 4px 14px -2px rgba(15, 23, 42, 0.12)',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-full"
        style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.2))' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hexStart} stopOpacity={density} />
            <stop
              offset="100%"
              stopColor={isGradient ? hexEnd : hexStart}
              stopOpacity={isGradient ? Math.max(0.08, density * 0.25) : density}
            />
          </linearGradient>

          {/* AR Coating reflection shimmer (residual green-violet reflectance) */}
          <linearGradient id="arGlint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="lensGlassSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Base lens body */}
        <circle cx="50" cy="50" r="48" fill={`url(#${gradientId})`} />

        {/* Outer bevel ring / edge bevel of optical glass */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.2"
        />
        <circle
          cx="50"
          cy="50"
          r="46.5"
          fill="none"
          stroke="rgba(15,23,42,0.15)"
          strokeWidth="0.8"
        />

        {/* AR Coating Reflection Ring */}
        {arCoating && (
          <path
            d="M 12 50 A 38 38 0 0 1 88 50"
            stroke="url(#arGlint)"
            strokeWidth="3.5"
            fill="none"
            opacity="0.8"
            strokeLinecap="round"
          />
        )}

        {/* Curved Fresnel Highlight */}
        {showSheen && (
          <ellipse
            cx="40"
            cy="32"
            rx="28"
            ry="18"
            transform="rotate(-25 40 32)"
            fill="url(#lensGlassSheen)"
          />
        )}

        {/* Lower Rim Reflection */}
        <path
          d="M 25 80 A 38 38 0 0 0 75 80"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
