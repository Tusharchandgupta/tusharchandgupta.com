import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
} from 'lucide-react';
import {
  calculateOhmsLaw,
  calculateResistorFrom4Bands,
  calculateResistorFrom5Bands,
  calculateLedResistor,
  calculateVoltageDivider,
  calculateRcRl,
  calculatePcbTrace,
  calculateBatteryRuntime,
  calculateSolarSizing,
  COLOR_CODES,
} from '../utils/calculators';
import { StorageService } from '../services/storageService';

export const ToolDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = StorageService.getToolBySlug(slug || '');

  // --- STATE FOR OHM'S LAW ---
  const [ohmV, setOhmV] = useState<string>('12');
  const [ohmI, setOhmI] = useState<string>('0.05');
  const [ohmR, setOhmR] = useState<string>('');
  const [ohmP, setOhmP] = useState<string>('');
  const [ohmResult, setOhmResult] = useState<any>(null);
  const [ohmError, setOhmError] = useState<string | null>(null);

  const handleComputeOhmsLaw = () => {
    setOhmError(null);
    try {
      const res = calculateOhmsLaw({
        voltage: ohmV ? parseFloat(ohmV) : undefined,
        current: ohmI ? parseFloat(ohmI) : undefined,
        resistance: ohmR ? parseFloat(ohmR) : undefined,
        power: ohmP ? parseFloat(ohmP) : undefined,
      });
      setOhmResult(res);
      setOhmV(res.voltage.toString());
      setOhmI(res.current.toString());
      setOhmR(res.resistance.toString());
      setOhmP(res.power.toString());
    } catch (err: any) {
      setOhmError(err.message || 'Error calculating Ohm’s Law.');
    }
  };

  // --- STATE FOR RESISTOR COLOR CODE ---
  const [colorMode, setColorMode] = useState<'4band' | '5band'>('4band');
  const [b1, setB1] = useState('brown');
  const [b2, setB2] = useState('black');
  const [b3, setB3] = useState('red'); // 3rd digit in 5-band
  const [bMult, setBMult] = useState('red');
  const [bTol, setBTol] = useState('gold');

  const resistorCalc =
    colorMode === '4band'
      ? calculateResistorFrom4Bands(b1, b2, bMult, bTol)
      : calculateResistorFrom5Bands(b1, b2, b3, bMult, bTol);

  // --- STATE FOR LED RESISTOR ---
  const [ledVs, setLedVs] = useState<string>('5.0');
  const [ledVf, setLedVf] = useState<string>('2.0'); // 2.0V Red LED
  const [ledIf, setLedIf] = useState<string>('20'); // 20 mA
  const [ledResult, setLedResult] = useState<any>(null);
  const [ledError, setLedError] = useState<string | null>(null);

  const handleComputeLed = () => {
    setLedError(null);
    try {
      const res = calculateLedResistor({
        supplyVoltage: parseFloat(ledVs),
        forwardVoltage: parseFloat(ledVf),
        forwardCurrentmA: parseFloat(ledIf),
      });
      setLedResult(res);
    } catch (err: any) {
      setLedError(err.message);
    }
  };

  // --- STATE FOR VOLTAGE DIVIDER ---
  const [vdVin, setVdVin] = useState<string>('12');
  const [vdR1, setVdR1] = useState<string>('10000'); // 10k
  const [vdR2, setVdR2] = useState<string>('10000'); // 10k
  const [vdRl, setVdRl] = useState<string>(''); // Load R
  const [vdResult, setVdResult] = useState<any>(null);
  const [vdError, setVdError] = useState<string | null>(null);

  const handleComputeDivider = () => {
    setVdError(null);
    try {
      const res = calculateVoltageDivider({
        vin: parseFloat(vdVin),
        r1: parseFloat(vdR1),
        r2: parseFloat(vdR2),
        loadR: vdRl ? parseFloat(vdRl) : undefined,
      });
      setVdResult(res);
    } catch (err: any) {
      setVdError(err.message);
    }
  };

  // --- STATE FOR RC/RL ---
  const [rcType, setRcType] = useState<'RC' | 'RL'>('RC');
  const [rcR, setRcR] = useState<string>('1000'); // 1k
  const [rcC, setRcC] = useState<string>('0.1'); // 0.1 uF
  const [rcL, setRcL] = useState<string>('10'); // 10 mH
  const [rcResult, setRcResult] = useState<any>(null);
  const [rcError, setRcError] = useState<string | null>(null);

  const handleComputeRc = () => {
    setRcError(null);
    try {
      const res = calculateRcRl({
        type: rcType,
        resistance: parseFloat(rcR),
        capacitanceUf: rcType === 'RC' ? parseFloat(rcC) : undefined,
        inductanceMh: rcType === 'RL' ? parseFloat(rcL) : undefined,
      });
      setRcResult(res);
    } catch (err: any) {
      setRcError(err.message);
    }
  };

  // --- STATE FOR PCB TRACE ---
  const [traceCurrent, setTraceCurrent] = useState<string>('2.5'); // 2.5 A
  const [traceTempRise, setTraceTempRise] = useState<string>('10'); // 10 C
  const [traceCopper, setTraceCopper] = useState<string>('1.0'); // 1 oz
  const [traceExternal, setTraceExternal] = useState<boolean>(true);
  const [traceHeight, setTraceHeight] = useState<string>('6.0'); // mils
  const [traceEr, setTraceEr] = useState<string>('4.2'); // FR-4
  const [traceResult, setTraceResult] = useState<any>(null);
  const [traceError, setTraceError] = useState<string | null>(null);

  const handleComputeTrace = () => {
    setTraceError(null);
    try {
      const res = calculatePcbTrace({
        currentA: parseFloat(traceCurrent),
        tempRiseC: parseFloat(traceTempRise),
        copperWeightOz: parseFloat(traceCopper),
        isExternal: traceExternal,
        dielectricHeightMils: parseFloat(traceHeight),
        dielectricConstantEr: parseFloat(traceEr),
      });
      setTraceResult(res);
    } catch (err: any) {
      setTraceError(err.message);
    }
  };

  // --- STATE FOR BATTERY RUNTIME ---
  const [batCap, setBatCap] = useState<string>('2600'); // 2600 mAh 18650
  const [batLoad, setBatLoad] = useState<string>('45'); // 45 mA
  const [batEff, setBatEff] = useState<string>('0.85'); // 85%
  const [batResult, setBatResult] = useState<any>(null);
  const [batError, setBatError] = useState<string | null>(null);

  const handleComputeBattery = () => {
    setBatError(null);
    try {
      const res = calculateBatteryRuntime({
        capacityMah: parseFloat(batCap),
        loadCurrentMa: parseFloat(batLoad),
        batteryChemistryEfficiency: parseFloat(batEff),
      });
      setBatResult(res);
    } catch (err: any) {
      setBatError(err.message);
    }
  };

  // --- STATE FOR SOLAR SIZING ---
  const [solarDailyWh, setSolarDailyWh] = useState<string>('1200'); // 1200 Wh/day
  const [solarSunHours, setSolarSunHours] = useState<string>('5.0'); // 5 peak sun hours
  const [solarEff, setSolarEff] = useState<string>('0.75'); // 75% system efficiency
  const [solarResult, setSolarResult] = useState<any>(null);
  const [solarError, setSolarError] = useState<string | null>(null);

  const handleComputeSolar = () => {
    setSolarError(null);
    try {
      const res = calculateSolarSizing({
        dailyEnergyWh: parseFloat(solarDailyWh),
        peakSunHours: parseFloat(solarSunHours),
        systemEfficiency: parseFloat(solarEff),
      });
      setSolarResult(res);
    } catch (err: any) {
      setSolarError(err.message);
    }
  };

  // If tool slug not found, provide helpful fallback
  if (!tool) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Calculator Not Found</h2>
        <p className="text-slate-500 mt-2">The requested engineering tool could not be located.</p>
        <Link to="/tools" className="mt-4 inline-block text-orange-600 font-semibold underline">
          Return to Tools Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Tools</span>
          </Link>
          <span className="text-xs font-mono font-medium text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
            {tool.category}
          </span>
        </div>

        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {tool.name}
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                {tool.description}
              </p>
            </div>
            <div className="bg-orange-50 text-orange-800 font-mono text-xs px-3.5 py-2 rounded-xl border border-orange-200 shrink-0">
              {tool.formula}
            </div>
          </div>
        </div>

        {/* Calculator Render Switch */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* 1. OHM'S LAW */}
          {tool.slug === 'ohms-law' && (
            <div className="space-y-6">
              <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200/80 text-xs text-orange-900">
                <strong>Instruction:</strong> Enter any <strong>TWO</strong> known values (Voltage, Current, Resistance, or Power) and click Calculate. The remaining two parameters will be computed automatically.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Voltage (V) — Volts
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={ohmV}
                    onChange={(e) => setOhmV(e.target.value)}
                    placeholder="e.g. 12"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Current (I) — Amperes
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={ohmI}
                    onChange={(e) => setOhmI(e.target.value)}
                    placeholder="e.g. 0.05"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Resistance (R) — Ohms (Ω)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={ohmR}
                    onChange={(e) => setOhmR(e.target.value)}
                    placeholder="e.g. 240"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Power (P) — Watts (W)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={ohmP}
                    onChange={(e) => setOhmP(e.target.value)}
                    placeholder="e.g. 0.6"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {ohmError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{ohmError}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleComputeOhmsLaw}
                  className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30"
                >
                  Calculate Ohm’s Law
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOhmV('');
                    setOhmI('');
                    setOhmR('');
                    setOhmP('');
                    setOhmResult(null);
                    setOhmError(null);
                  }}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl hover:bg-slate-200"
                >
                  Reset
                </button>
              </div>

              {ohmResult && (
                <div className="p-5 bg-slate-900 rounded-2xl text-white mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">VOLTAGE</span>
                    <span className="text-xl font-bold text-amber-400">{ohmResult.voltage} V</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CURRENT</span>
                    <span className="text-xl font-bold text-emerald-400">{ohmResult.current} A</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">RESISTANCE</span>
                    <span className="text-xl font-bold text-orange-400">{ohmResult.resistance} Ω</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">POWER</span>
                    <span className="text-xl font-bold text-purple-400">{ohmResult.power} W</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. RESISTOR COLOUR CODE */}
          {tool.slug === 'resistor-color-code' && (
            <div className="space-y-6">
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setColorMode('4band')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl ${
                    colorMode === '4band' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  4-Band Resistor
                </button>
                <button
                  type="button"
                  onClick={() => setColorMode('5band')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl ${
                    colorMode === '5band' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  5-Band Precision (1%)
                </button>
              </div>

              {/* Graphic Resistor Visual */}
              <div className="p-8 bg-slate-900 rounded-2xl flex items-center justify-center">
                <div className="relative w-72 h-14 bg-amber-100 rounded-full border-4 border-amber-200 flex items-center justify-around px-8 shadow-inner">
                  {/* Lead left */}
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-2 bg-slate-400" />
                  {/* Lead right */}
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-2 bg-slate-400" />

                  {/* Bands */}
                  <div className="w-3 h-full" style={{ backgroundColor: COLOR_CODES[b1]?.colorHex }} title={`Band 1: ${b1}`} />
                  <div className="w-3 h-full" style={{ backgroundColor: COLOR_CODES[b2]?.colorHex }} title={`Band 2: ${b2}`} />
                  {colorMode === '5band' && (
                    <div className="w-3 h-full" style={{ backgroundColor: COLOR_CODES[b3]?.colorHex }} title={`Band 3: ${b3}`} />
                  )}
                  <div className="w-3 h-full" style={{ backgroundColor: COLOR_CODES[bMult]?.colorHex }} title={`Multiplier: ${bMult}`} />
                  <div className="w-3 h-full ml-4" style={{ backgroundColor: COLOR_CODES[bTol]?.colorHex }} title={`Tolerance: ${bTol}`} />
                </div>
              </div>

              {/* Color Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">1st Band</label>
                  <select
                    value={b1}
                    onChange={(e) => setB1(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    {Object.keys(COLOR_CODES).slice(1, 10).map((c) => (
                      <option key={c} value={c}>{c.toUpperCase()} ({COLOR_CODES[c].value})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">2nd Band</label>
                  <select
                    value={b2}
                    onChange={(e) => setB2(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    {Object.keys(COLOR_CODES).slice(0, 10).map((c) => (
                      <option key={c} value={c}>{c.toUpperCase()} ({COLOR_CODES[c].value})</option>
                    ))}
                  </select>
                </div>

                {colorMode === '5band' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">3rd Band</label>
                    <select
                      value={b3}
                      onChange={(e) => setB3(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
                    >
                      {Object.keys(COLOR_CODES).slice(0, 10).map((c) => (
                        <option key={c} value={c}>{c.toUpperCase()} ({COLOR_CODES[c].value})</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Multiplier</label>
                  <select
                    value={bMult}
                    onChange={(e) => setBMult(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    {Object.keys(COLOR_CODES).map((c) => (
                      <option key={c} value={c}>{c.toUpperCase()} (×{COLOR_CODES[c].multiplier})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Tolerance</label>
                  <select
                    value={bTol}
                    onChange={(e) => setBTol(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="brown">BROWN (±1%)</option>
                    <option value="red">RED (±2%)</option>
                    <option value="gold">GOLD (±5%)</option>
                    <option value="silver">SILVER (±10%)</option>
                  </select>
                </div>
              </div>

              {/* Result display */}
              <div className="p-5 bg-slate-900 rounded-2xl text-white grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">NOMINAL RESISTANCE</span>
                  <span className="text-2xl font-bold text-amber-400">{resistorCalc.formattedResistance}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">TOLERANCE</span>
                  <span className="text-2xl font-bold text-emerald-400">±{resistorCalc.tolerancePercent}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ACCEPTABLE RANGE</span>
                  <span className="text-xs text-slate-300 block mt-1">
                    {resistorCalc.minResistance.toFixed(1)} Ω — {resistorCalc.maxResistance.toFixed(1)} Ω
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. LED RESISTOR */}
          {tool.slug === 'led-resistor' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Supply Voltage (Vs) — Volts
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={ledVs}
                    onChange={(e) => setLedVs(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <div className="flex gap-1 mt-1.5">
                    {['3.3', '5.0', '9.0', '12.0'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setLedVs(v)}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600 font-mono"
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Forward Voltage (Vf) — Volts
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={ledVf}
                    onChange={(e) => setLedVf(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <div className="flex gap-1 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setLedVf('2.0')}
                      className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded"
                    >
                      Red (2.0V)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLedVf('2.2')}
                      className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded"
                    >
                      Green (2.2V)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLedVf('3.2')}
                      className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded"
                    >
                      Blue (3.2V)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Forward Current (If) — mA
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={ledIf}
                    onChange={(e) => setLedIf(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <div className="flex gap-1 mt-1.5">
                    {['10', '20', '30'].map((ma) => (
                      <button
                        key={ma}
                        type="button"
                        onClick={() => setLedIf(ma)}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600 font-mono"
                      >
                        {ma}mA
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {ledError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{ledError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleComputeLed}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30"
              >
                Calculate Series Resistor
              </button>

              {ledResult && (
                <div className="p-5 bg-slate-900 rounded-2xl text-white grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-mono mt-6">
                  <div>
                    <span className="text-[10px] text-slate-400 block">EXACT RESISTANCE</span>
                    <span className="text-xl font-bold text-amber-400">{ledResult.resistance} Ω</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">NEAREST E24 STANDARD</span>
                    <span className="text-xl font-bold text-emerald-400">{ledResult.nearestE24} Ω</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">POWER DISSIPATION</span>
                    <span className="text-xl font-bold text-orange-400">{(ledResult.powerWatts * 1000).toFixed(1)} mW</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">RECOMMENDED WATTAGE</span>
                    <span className="text-sm font-bold text-purple-400 mt-1 block">{ledResult.minWattageRating}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. VOLTAGE DIVIDER */}
          {tool.slug === 'voltage-divider' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Input Voltage (Vin) — V
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={vdVin}
                    onChange={(e) => setVdVin(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Resistor R1 — Ohms (Ω)
                  </label>
                  <input
                    type="number"
                    step="10"
                    value={vdR1}
                    onChange={(e) => setVdR1(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Resistor R2 — Ohms (Ω)
                  </label>
                  <input
                    type="number"
                    step="10"
                    value={vdR2}
                    onChange={(e) => setVdR2(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Load Resistance RL (Optional) — Ω
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={vdRl}
                    onChange={(e) => setVdRl(e.target.value)}
                    placeholder="Infinite (Unloaded)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {vdError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{vdError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleComputeDivider}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30"
              >
                Calculate Voltage Divider
              </button>

              {vdResult && (
                <div className="p-5 bg-slate-900 rounded-2xl text-white grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono mt-6">
                  <div>
                    <span className="text-[10px] text-slate-400 block">OUTPUT VOLTAGE (Vout)</span>
                    <span className="text-2xl font-bold text-amber-400">{vdResult.vout} V</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">DIVISION RATIO</span>
                    <span className="text-xl font-bold text-emerald-400">{(vdResult.ratio * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">TOTAL CURRENT</span>
                    <span className="text-xl font-bold text-sky-400">{vdResult.currentmA} mA</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">R1 / R2 POWER</span>
                    <span className="text-xs text-purple-300 block mt-1">
                      {(vdResult.r1PowerWatts * 1000).toFixed(1)}mW / {(vdResult.r2PowerWatts * 1000).toFixed(1)}mW
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. RC / RL CIRCUIT */}
          {tool.slug === 'rc-rl-circuit' && (
            <div className="space-y-6">
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setRcType('RC')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl ${
                    rcType === 'RC' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  RC Filter (Resistor + Capacitor)
                </button>
                <button
                  type="button"
                  onClick={() => setRcType('RL')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl ${
                    rcType === 'RL' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  RL Filter (Resistor + Inductor)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Resistance (R) — Ohms (Ω)
                  </label>
                  <input
                    type="number"
                    step="10"
                    value={rcR}
                    onChange={(e) => setRcR(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                {rcType === 'RC' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Capacitance (C) — microFarads (µF)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={rcC}
                      onChange={(e) => setRcC(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Inductance (L) — milliHenries (mH)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={rcL}
                      onChange={(e) => setRcL(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {rcError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{rcError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleComputeRc}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30"
              >
                Calculate Cutoff Frequency & τ
              </button>

              {rcResult && (
                <div className="p-5 bg-slate-900 rounded-2xl text-white grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono mt-6">
                  <div>
                    <span className="text-[10px] text-slate-400 block">-3dB CUTOFF FREQUENCY (fc)</span>
                    <span className="text-2xl font-bold text-amber-400">{rcResult.cutoffFreqHz} Hz</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">TIME CONSTANT (τ)</span>
                    <span className="text-xl font-bold text-emerald-400">{rcResult.timeConstantSec} s</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">99% SETTLING TIME (5τ)</span>
                    <span className="text-xl font-bold text-sky-400">{rcResult.timeTo99PercentSec} s</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. PCB TRACE WIDTH */}
          {tool.slug === 'pcb-trace-width' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Trace Current (Amperes)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={traceCurrent}
                    onChange={(e) => setTraceCurrent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Temp Rise (ΔT °C)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={traceTempRise}
                    onChange={(e) => setTraceTempRise(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Copper Weight
                  </label>
                  <select
                    value={traceCopper}
                    onChange={(e) => setTraceCopper(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="0.5">0.5 oz (18 µm / 0.7 mils)</option>
                    <option value="1.0">1.0 oz (35 µm / 1.38 mils)</option>
                    <option value="2.0">2.0 oz (70 µm / 2.76 mils)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="layer"
                    checked={traceExternal}
                    onChange={() => setTraceExternal(true)}
                    className="accent-orange-600"
                  />
                  <span>External Layer (Microstrip in air)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="layer"
                    checked={!traceExternal}
                    onChange={() => setTraceExternal(false)}
                    className="accent-orange-600"
                  />
                  <span>Internal Layer (Stripline encapsulated)</span>
                </label>
              </div>

              {traceError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{traceError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleComputeTrace}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30"
              >
                Calculate IPC-2221 Trace Width
              </button>

              {traceResult && (
                <div className="p-5 bg-slate-900 rounded-2xl text-white grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono mt-6">
                  <div>
                    <span className="text-[10px] text-slate-400 block">TRACE WIDTH (MILS)</span>
                    <span className="text-2xl font-bold text-amber-400">{traceResult.traceWidthMils} mils</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">TRACE WIDTH (MM)</span>
                    <span className="text-xl font-bold text-emerald-400">{traceResult.traceWidthMm} mm</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">IMPEDANCE (Z₀)</span>
                    <span className="text-xl font-bold text-sky-400">{traceResult.microstripImpedanceZ0} Ω</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">PROPAGATION DELAY</span>
                    <span className="text-xs text-purple-300 block mt-1">{traceResult.propagationDelayPsPerInch} ps/in</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 7. BATTERY RUNTIME */}
          {tool.slug === 'battery-runtime' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Battery Capacity (mAh)
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={batCap}
                    onChange={(e) => setBatCap(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <div className="flex gap-1 mt-1.5 text-[10px]">
                    <button type="button" onClick={() => setBatCap('2600')} className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600">18650 (2600mAh)</button>
                    <button type="button" onClick={() => setBatCap('3400')} className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600">High-Cap (3400mAh)</button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Average Load Current (mA)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={batLoad}
                    onChange={(e) => setBatLoad(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Chemistry Derating Factor
                  </label>
                  <select
                    value={batEff}
                    onChange={(e) => setBatEff(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="0.90">90% (LiFePO4 / High Quality)</option>
                    <option value="0.85">85% (Standard Li-Ion 18650)</option>
                    <option value="0.75">75% (Alkaline / High Discharge)</option>
                  </select>
                </div>
              </div>

              {batError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{batError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleComputeBattery}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30"
              >
                Estimate Operating Runtime
              </button>

              {batResult && (
                <div className="p-5 bg-slate-900 rounded-2xl text-white grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono mt-6">
                  <div>
                    <span className="text-[10px] text-slate-400 block">TOTAL OPERATING TIME</span>
                    <span className="text-2xl font-bold text-amber-400">{batResult.formattedRuntime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">HOURS</span>
                    <span className="text-xl font-bold text-emerald-400">{batResult.runtimeHours} hrs</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">DAYS</span>
                    <span className="text-xl font-bold text-sky-400">{batResult.runtimeDays} days</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 8. SOLAR SIZING */}
          {tool.slug === 'solar-sizing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Daily Energy Consumption (Wh)
                  </label>
                  <input
                    type="number"
                    step="50"
                    value={solarDailyWh}
                    onChange={(e) => setSolarDailyWh(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Peak Sun Hours / Day
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={solarSunHours}
                    onChange={(e) => setSolarSunHours(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">India average: 4.5 – 5.5 hours</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    System Efficiency Factor
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={solarEff}
                    onChange={(e) => setSolarEff(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Wiring, dust & inverter losses: ~75%</span>
                </div>
              </div>

              {solarError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{solarError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleComputeSolar}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30"
              >
                Size Solar Array & Battery
              </button>

              {solarResult && (
                <div className="p-5 bg-slate-900 rounded-2xl text-white grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono mt-6">
                  <div>
                    <span className="text-[10px] text-slate-400 block">REQUIRED SOLAR ARRAY</span>
                    <span className="text-2xl font-bold text-amber-400">{solarResult.requiredPanelWattageW} W</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">BATTERY BANK (12V)</span>
                    <span className="text-xl font-bold text-emerald-400">{solarResult.batteryCapacityAh} Ah</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">100W PANELS COUNT</span>
                    <span className="text-xl font-bold text-sky-400">{solarResult.recommendedPanels100W} panels</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">300W PANELS COUNT</span>
                    <span className="text-xl font-bold text-purple-400">{solarResult.recommendedPanels300W} panels</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
