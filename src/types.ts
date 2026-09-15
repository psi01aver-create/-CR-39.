export type SubstrateId = 'cr39' | 'polycarbonate' | 'hi_index';

export interface SubstrateInfo {
  id: SubstrateId;
  name: string;
  code: string;
  refractiveIndex: number;
  material: string;
  carrierRequired: boolean;
  carrierType?: string;
  recommendedTemp: number;
  tempTolerance: number;
  description: string;
  tintSpeedMultiplier: number;
  penetrationDepthUm: number;
}

export interface ProcessStep {
  id: string;
  stepNumber: string; // e.g. "01"
  title: string;
  subtitle: string;
  timeEstimate: string;
  dipCycle: string;
  temperature: string;
  tolerance: string;
  chemicalSpec: string;
  phValue: string;
  stage: 'cleaning' | 'immersion' | 'gradient' | 'rinse' | 'qa';
  description: string;
  protocols: string[];
  specs: { label: string; value: string; hint?: string }[];
  warningNote?: string;
  criticalCheck: string;
}

export interface ColorSwatch {
  id: string;
  name: string;
  categoryName: string;
  hexStart: string;
  hexEnd: string;
  isGradient: boolean;
  sampleLtf: number; // e.g. 15, 35, 65, 80
  immersionDurationSec: number;
  thermalBathCompatIndex: number; // e.g. 98/100
  uvCutoffNm: number; // e.g. 400
  isoCategory: 0 | 1 | 2 | 3 | 4;
  description: string;
  recommendedSubstrates: SubstrateId[];
  dyeCode: string;
}

export interface TroubleshootingItem {
  id: string;
  title: string;
  badge: string;
  symptom: string;
  rootCause: string;
  labProtocol: string[];
  chemicalRatio: string;
  criticalChecklist: string[];
}

export interface SimulationParams {
  substrateId: SubstrateId;
  swatchId: string;
  isGradient: boolean;
  gradientHeightPct: number; // 20 - 90%
  bathTempC: number; // 85 - 98
  immersionSeconds: number; // 10 - 600
  dyeConcentrationRatio: number; // 1:5 - 1:20
  arCoating: boolean;
  uvProtectionAdded: boolean;
}

export type ActiveScreen = 'process' | 'palette' | 'simulator' | 'troubleshooting';
