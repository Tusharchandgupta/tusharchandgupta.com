import React, { useState } from 'react';
import { Zap, Gauge, Flame } from 'lucide-react';

export const OhmsLawLab: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(12); // Volts
  const [resistance, setResistance] = useState<number>(240); // Ohms

  const currentA = voltage / resistance;
  const currentmA = currentA * 1000;
  const powerW = voltage * currentA;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
          Interactive DC Circuit Loop
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-0.5">
          Ohm's Law & Power Dissipation Lab
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Adjust the DC Power Supply voltage and the Decade Resistance box to observe the instantaneous linear relationship between Voltage, Current, and Power.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Sliders */}
        <div className="lg:col-span-5 space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="font-bold text-slate-700">DC Voltage (V):</span>
              <span className="text-orange-600 font-extrabold text-sm">{voltage.toFixed(1)} V</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1.0 V</span>
              <span>15.0 V</span>
              <span>30.0 V</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="font-bold text-slate-700">Load Resistance (R):</span>
              <span className="text-orange-600 font-extrabold text-sm">{resistance} Ω</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={resistance}
              onChange={(e) => setResistance(parseInt(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10 Ω</span>
              <span>500 Ω</span>
              <span>1000 Ω</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 font-mono">
            <span>Formula: I = V / R | P = V × I</span>
          </div>
        </div>

        {/* Right: Live Instrument Meters */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Voltmeter */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>VOLTMETER</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="py-2">
              <span className="text-3xl font-extrabold font-mono text-amber-400">
                {voltage.toFixed(1)}
              </span>
              <span className="text-xs font-mono ml-1 text-slate-400">V</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">Potential Difference</div>
          </div>

          {/* Ammeter */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>AMMETER</span>
              <Gauge className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="py-2">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">
                {currentmA.toFixed(1)}
              </span>
              <span className="text-xs font-mono ml-1 text-slate-400">mA</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">Current ({currentA.toFixed(4)} A)</div>
          </div>

          {/* Wattmeter */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>WATTMETER</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div className="py-2">
              <span className="text-3xl font-extrabold font-mono text-orange-400">
                {powerW.toFixed(3)}
              </span>
              <span className="text-xs font-mono ml-1 text-slate-400">W</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">Thermal Dissipation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

