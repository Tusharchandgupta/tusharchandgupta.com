/**
 * Engineering Calculators Mathematical Engine
 * Accurate implementations with unit conversions, error handling, and standard E-series snapping.
 */

// --- 1. OHM'S LAW ---
export interface OhmsLawInput {
  voltage?: number; // Volts
  current?: number; // Amperes
  resistance?: number; // Ohms
  power?: number; // Watts
}

export interface OhmsLawResult {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
}

export function calculateOhmsLaw(input: OhmsLawInput): OhmsLawResult {
  let { voltage: V, current: I, resistance: R, power: P } = input;

  const count = [V, I, R, P].filter(v => typeof v === 'number' && !isNaN(v) && v > 0).length;
  if (count < 2) {
    throw new Error('Please provide at least two positive non-zero values.');
  }

  if (V !== undefined && I !== undefined) {
    R = V / I;
    P = V * I;
  } else if (V !== undefined && R !== undefined) {
    I = V / R;
    P = (V * V) / R;
  } else if (V !== undefined && P !== undefined) {
    I = P / V;
    R = (V * V) / P;
  } else if (I !== undefined && R !== undefined) {
    V = I * R;
    P = I * I * R;
  } else if (I !== undefined && P !== undefined) {
    V = P / I;
    R = P / (I * I);
  } else if (R !== undefined && P !== undefined) {
    V = Math.sqrt(P * R);
    I = Math.sqrt(P / R);
  }

  return {
    voltage: Number(V!.toFixed(4)),
    current: Number(I!.toFixed(4)),
    resistance: Number(R!.toFixed(4)),
    power: Number(P!.toFixed(4)),
  };
}

// --- 2. RESISTOR COLOR CODE ---
export const COLOR_CODES: Record<string, { value: number; multiplier: number; tolerance?: number; colorHex: string; textHex: string }> = {
  black: { value: 0, multiplier: 1, colorHex: '#1e293b', textHex: '#ffffff' },
  brown: { value: 1, multiplier: 10, tolerance: 1, colorHex: '#854d0e', textHex: '#ffffff' },
  red: { value: 2, multiplier: 100, tolerance: 2, colorHex: '#dc2626', textHex: '#ffffff' },
  orange: { value: 3, multiplier: 1000, tolerance: 0.05, colorHex: '#ea580c', textHex: '#ffffff' },
  yellow: { value: 4, multiplier: 10000, colorHex: '#eab308', textHex: '#000000' },
  green: { value: 5, multiplier: 100000, tolerance: 0.5, colorHex: '#16a34a', textHex: '#ffffff' },
  blue: { value: 6, multiplier: 1000000, tolerance: 0.25, colorHex: '#2563eb', textHex: '#ffffff' },
  violet: { value: 7, multiplier: 10000000, tolerance: 0.1, colorHex: '#7c3aed', textHex: '#ffffff' },
  grey: { value: 8, multiplier: 100000000, tolerance: 0.01, colorHex: '#64748b', textHex: '#ffffff' },
  white: { value: 9, multiplier: 1000000000, colorHex: '#f8fafc', textHex: '#000000' },
  gold: { value: -1, multiplier: 0.1, tolerance: 5, colorHex: '#d97706', textHex: '#ffffff' },
  silver: { value: -2, multiplier: 0.01, tolerance: 10, colorHex: '#94a3b8', textHex: '#000000' },
};

export function calculateResistorFrom4Bands(band1: string, band2: string, multiplier: string, tolerance: string) {
  const d1 = COLOR_CODES[band1]?.value ?? 0;
  const d2 = COLOR_CODES[band2]?.value ?? 0;
  const mult = COLOR_CODES[multiplier]?.multiplier ?? 1;
  const tol = COLOR_CODES[tolerance]?.tolerance ?? 5;

  const resistance = (d1 * 10 + d2) * mult;
  return {
    resistance,
    formattedResistance: formatResistance(resistance),
    tolerancePercent: tol,
    minResistance: resistance * (1 - tol / 100),
    maxResistance: resistance * (1 + tol / 100),
  };
}

export function calculateResistorFrom5Bands(band1: string, band2: string, band3: string, multiplier: string, tolerance: string) {
  const d1 = COLOR_CODES[band1]?.value ?? 0;
  const d2 = COLOR_CODES[band2]?.value ?? 0;
  const d3 = COLOR_CODES[band3]?.value ?? 0;
  const mult = COLOR_CODES[multiplier]?.multiplier ?? 1;
  const tol = COLOR_CODES[tolerance]?.tolerance ?? 1;

  const resistance = (d1 * 100 + d2 * 10 + d3) * mult;
  return {
    resistance,
    formattedResistance: formatResistance(resistance),
    tolerancePercent: tol,
    minResistance: resistance * (1 - tol / 100),
    maxResistance: resistance * (1 + tol / 100),
  };
}

export function formatResistance(ohms: number): string {
  if (ohms >= 1e6) {
    return `${(ohms / 1e6).toFixed(2).replace(/\.00$/, '')} MΩ`;
  }
  if (ohms >= 1e3) {
    return `${(ohms / 1e3).toFixed(2).replace(/\.00$/, '')} kΩ`;
  }
  return `${ohms.toFixed(1).replace(/\.0$/, '')} Ω`;
}

// Standard E24 Resistor values base
export const E24_BASE = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];

export function findNearestE24(val: number): number {
  if (val <= 0) return 1;
  const exponent = Math.floor(Math.log10(val));
  const factor = Math.pow(10, exponent);
  const normalized = val / factor;

  let closest = E24_BASE[0];
  let minDiff = Math.abs(normalized - closest);
  for (const base of E24_BASE) {
    const diff = Math.abs(normalized - base);
    if (diff < minDiff) {
      minDiff = diff;
      closest = base;
    }
  }
  return Number((closest * factor).toFixed(2));
}

// --- 3. LED RESISTOR CALCULATOR ---
export interface LedResistorInput {
  supplyVoltage: number; // Volts
  forwardVoltage: number; // Volts (typical 2.0V red, 3.2V blue/white)
  forwardCurrentmA: number; // mA (typical 20mA)
}

export interface LedResistorResult {
  resistance: number;
  nearestE24: number;
  powerWatts: number;
  minWattageRating: string;
}

export function calculateLedResistor(input: LedResistorInput): LedResistorResult {
  const { supplyVoltage, forwardVoltage, forwardCurrentmA } = input;
  if (supplyVoltage <= forwardVoltage) {
    throw new Error('Supply voltage must be greater than LED forward voltage.');
  }
  if (forwardCurrentmA <= 0) {
    throw new Error('Forward current must be greater than zero.');
  }

  const currentA = forwardCurrentmA / 1000;
  const vDrop = supplyVoltage - forwardVoltage;
  const exactR = vDrop / currentA;
  const power = vDrop * currentA;

  let minWattageRating = '1/4 W (0.25W)';
  if (power > 0.5) minWattageRating = '1 W or greater';
  else if (power > 0.25) minWattageRating = '1/2 W (0.5W)';

  return {
    resistance: Number(exactR.toFixed(2)),
    nearestE24: findNearestE24(exactR),
    powerWatts: Number(power.toFixed(4)),
    minWattageRating,
  };
}

// --- 4. VOLTAGE DIVIDER CALCULATOR ---
export interface VoltageDividerInput {
  vin: number;
  r1: number; // Ohms
  r2: number; // Ohms
  loadR?: number; // Optional load resistance across R2 in Ohms
}

export interface VoltageDividerResult {
  vout: number;
  ratio: number;
  currentmA: number;
  r1PowerWatts: number;
  r2PowerWatts: number;
}

export function calculateVoltageDivider(input: VoltageDividerInput): VoltageDividerResult {
  const { vin, r1, r2, loadR } = input;
  if (r1 <= 0 || r2 <= 0) {
    throw new Error('Resistances must be greater than zero.');
  }

  let effectiveR2 = r2;
  if (loadR && loadR > 0) {
    effectiveR2 = (r2 * loadR) / (r2 + loadR);
  }

  const totalR = r1 + effectiveR2;
  const vout = vin * (effectiveR2 / totalR);
  const totalCurrent = vin / totalR;

  return {
    vout: Number(vout.toFixed(4)),
    ratio: Number((vout / vin).toFixed(4)),
    currentmA: Number((totalCurrent * 1000).toFixed(4)),
    r1PowerWatts: Number((Math.pow(vin - vout, 2) / r1).toFixed(4)),
    r2PowerWatts: Number((Math.pow(vout, 2) / r2).toFixed(4)),
  };
}

// --- 5. RC & RL CIRCUIT CALCULATOR ---
export interface RcRlCircuitInput {
  type: 'RC' | 'RL';
  resistance: number; // Ohms
  capacitanceUf?: number; // µF (for RC)
  inductanceMh?: number; // mH (for RL)
}

export interface RcRlCircuitResult {
  cutoffFreqHz: number;
  timeConstantSec: number;
  timeTo99PercentSec: number;
}

export function calculateRcRl(input: RcRlCircuitInput): RcRlCircuitResult {
  const { type, resistance, capacitanceUf, inductanceMh } = input;
  if (resistance <= 0) throw new Error('Resistance must be positive.');

  if (type === 'RC') {
    if (!capacitanceUf || capacitanceUf <= 0) throw new Error('Capacitance must be positive.');
    const C = capacitanceUf * 1e-6; // convert to Farads
    const tau = resistance * C;
    const fc = 1 / (2 * Math.PI * resistance * C);
    return {
      cutoffFreqHz: Number(fc.toFixed(2)),
      timeConstantSec: Number(tau.toExponential(4)),
      timeTo99PercentSec: Number((5 * tau).toExponential(4)),
    };
  } else {
    if (!inductanceMh || inductanceMh <= 0) throw new Error('Inductance must be positive.');
    const L = inductanceMh * 1e-3; // convert to Henries
    const tau = L / resistance;
    const fc = resistance / (2 * Math.PI * L);
    return {
      cutoffFreqHz: Number(fc.toFixed(2)),
      timeConstantSec: Number(tau.toExponential(4)),
      timeTo99PercentSec: Number((5 * tau).toExponential(4)),
    };
  }
}

// --- 6. PCB TRACE WIDTH CALCULATOR (IPC-2221) ---
export interface PcbTraceInput {
  currentA: number;
  tempRiseC: number;
  copperWeightOz: number; // 0.5, 1, 2 oz
  isExternal: boolean;
  dielectricHeightMils?: number; // for microstrip Z0
  traceThicknessMils?: number;
  dielectricConstantEr?: number;
}

export interface PcbTraceResult {
  traceWidthMils: number;
  traceWidthMm: number;
  crossSectionalAreaSqMils: number;
  maxCurrentForInputWidth?: number;
  microstripImpedanceZ0?: number; // Ohms
  propagationDelayPsPerInch?: number;
}

export function calculatePcbTrace(input: PcbTraceInput): PcbTraceResult {
  const { currentA, tempRiseC, copperWeightOz, isExternal, dielectricHeightMils = 6, dielectricConstantEr = 4.2 } = input;
  if (currentA <= 0 || tempRiseC <= 0 || copperWeightOz <= 0) {
    throw new Error('Current, temperature rise, and copper weight must be greater than zero.');
  }

  // Thickness: 1 oz = 1.37 mils (35 µm)
  const thicknessMils = copperWeightOz * 1.378;

  // IPC-2221 constant
  // A = (I / (k * (dT^0.44)))^(1 / 0.725) in sq mils
  // External layer: k = 0.048, Internal layer: k = 0.024
  const k = isExternal ? 0.048 : 0.024;
  const areaSqMils = Math.pow(currentA / (k * Math.pow(tempRiseC, 0.44)), 1 / 0.725);
  const widthMils = areaSqMils / thicknessMils;
  const widthMm = widthMils * 0.0254;

  // IPC-2141 Microstrip impedance approx:
  // Z0 = (87 / sqrt(Er + 1.41)) * ln( (5.98 * H) / (0.8 * W + T) )
  const H = dielectricHeightMils;
  const W = widthMils;
  const T = thicknessMils;
  const z0 = (87 / Math.sqrt(dielectricConstantEr + 1.41)) * Math.log((5.98 * H) / (0.8 * W + T));
  const tpd = 84.72 * Math.sqrt(0.475 * dielectricConstantEr + 0.67);

  return {
    traceWidthMils: Number(widthMils.toFixed(2)),
    traceWidthMm: Number(widthMm.toFixed(3)),
    crossSectionalAreaSqMils: Number(areaSqMils.toFixed(2)),
    microstripImpedanceZ0: Number(Math.max(10, Math.min(200, z0)).toFixed(1)),
    propagationDelayPsPerInch: Number(tpd.toFixed(1)),
  };
}

// --- 7. BATTERY RUNTIME CALCULATOR ---
export interface BatteryRuntimeInput {
  capacityMah: number;
  loadCurrentMa: number;
  batteryChemistryEfficiency: number; // e.g. 0.85 (85%)
}

export interface BatteryRuntimeResult {
  runtimeHours: number;
  runtimeDays: number;
  formattedRuntime: string;
}

export function calculateBatteryRuntime(input: BatteryRuntimeInput): BatteryRuntimeResult {
  const { capacityMah, loadCurrentMa, batteryChemistryEfficiency } = input;
  if (capacityMah <= 0 || loadCurrentMa <= 0) {
    throw new Error('Capacity and load current must be positive values.');
  }

  const effectiveCapacity = capacityMah * Math.min(1, Math.max(0.5, batteryChemistryEfficiency));
  const hours = effectiveCapacity / loadCurrentMa;
  const days = hours / 24;

  let formatted = '';
  if (hours < 1) {
    formatted = `${Math.round(hours * 60)} minutes`;
  } else if (hours < 48) {
    formatted = `${hours.toFixed(1)} hours`;
  } else {
    formatted = `${days.toFixed(1)} days (${hours.toFixed(0)} hours)`;
  }

  return {
    runtimeHours: Number(hours.toFixed(2)),
    runtimeDays: Number(days.toFixed(2)),
    formattedRuntime: formatted,
  };
}

// --- 8. SOLAR PANEL SIZING CALCULATOR ---
export interface SolarSizingInput {
  dailyEnergyWh: number; // e.g. 1500 Wh
  peakSunHours: number; // e.g. 5 hours
  systemEfficiency: number; // e.g. 0.75 (75%)
  systemVoltage?: number; // e.g. 12V or 24V
  daysAutonomy?: number; // e.g. 2 days
}

export interface SolarSizingResult {
  requiredPanelWattageW: number;
  batteryCapacityAh: number;
  dailyCurrentAh: number;
  recommendedPanels100W: number;
  recommendedPanels300W: number;
}

export function calculateSolarSizing(input: SolarSizingInput): SolarSizingResult {
  const { dailyEnergyWh, peakSunHours, systemEfficiency, systemVoltage = 12, daysAutonomy = 2 } = input;
  if (dailyEnergyWh <= 0 || peakSunHours <= 0 || systemEfficiency <= 0) {
    throw new Error('Daily energy, sun hours, and efficiency must be positive.');
  }

  // Required continuous array output
  const requiredWattage = dailyEnergyWh / (peakSunHours * systemEfficiency);
  // Battery bank with depth of discharge (50% for lead acid / 80% for LiFePO4, assume 60% average DoD)
  const totalWhNeeded = dailyEnergyWh * daysAutonomy;
  const batteryAh = (totalWhNeeded / (systemVoltage * 0.6));

  return {
    requiredPanelWattageW: Number(Math.ceil(requiredWattage)),
    batteryCapacityAh: Number(Math.ceil(batteryAh)),
    dailyCurrentAh: Number((dailyEnergyWh / systemVoltage).toFixed(1)),
    recommendedPanels100W: Math.ceil(requiredWattage / 100),
    recommendedPanels300W: Math.ceil(requiredWattage / 300),
  };
}

