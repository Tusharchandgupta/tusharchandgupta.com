import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Lightbulb, Check } from 'lucide-react';

type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

export const LogicGatesSimulator: React.FC = () => {
  const [gate, setGate] = useState<GateType>('AND');
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);

  // Compute output
  const computeOutput = (a: number, b: number, type: GateType): number => {
    switch (type) {
      case 'AND': return a && b ? 1 : 0;
      case 'OR': return a || b ? 1 : 0;
      case 'NOT': return a ? 0 : 1;
      case 'NAND': return !(a && b) ? 1 : 0;
      case 'NOR': return !(a || b) ? 1 : 0;
      case 'XOR': return a !== b ? 1 : 0;
      case 'XNOR': return a === b ? 1 : 0;
      default: return 0;
    }
  };

  const output = computeOutput(inputA, inputB, gate);

  const truthTable = [
    { a: 0, b: 0, out: computeOutput(0, 0, gate) },
    ...(gate !== 'NOT'
      ? [
          { a: 0, b: 1, out: computeOutput(0, 1, gate) },
          { a: 1, b: 0, out: computeOutput(1, 0, gate) },
          { a: 1, b: 1, out: computeOutput(1, 1, gate) },
        ]
      : [{ a: 1, b: 0, out: computeOutput(1, 0, gate) }]),
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
            Digital Logic Gate Simulation
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Interactive Logic Gates & Truth Table
          </h3>
        </div>

        {/* Gate Type Selector */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as GateType[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGate(g)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                gate === g
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Interactive Schematic Diagram */}
        <div className="md:col-span-7 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-slate-400">LOGIC_GATE: 74-SERIES {gate}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">OUTPUT:</span>
              <span
                className={`font-mono font-bold text-sm px-2.5 py-0.5 rounded ${
                  output === 1 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {output === 1 ? 'HIGH (1)' : 'LOW (0)'}
              </span>
            </div>
          </div>

          {/* Interactive Gate Visual Representation */}
          <div className="flex items-center justify-around py-8 relative">
            {/* Input Switches */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-300 w-16">INPUT A:</span>
                <button
                  type="button"
                  onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                    inputA === 1
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {inputA === 1 ? <ToggleRight className="w-5 h-5 text-orange-500" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                  <span>{inputA === 1 ? '1 (+5V)' : '0 (GND)'}</span>
                </button>
              </div>

              {gate !== 'NOT' && (
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-300 w-16">INPUT B:</span>
                  <button
                    type="button"
                    onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                      inputB === 1
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {inputB === 1 ? <ToggleRight className="w-5 h-5 text-orange-500" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                    <span>{inputB === 1 ? '1 (+5V)' : '0 (GND)'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Central Gate Symbol */}
            <div className="px-6 py-4 rounded-2xl bg-slate-800 border-2 border-orange-500/80 shadow-lg shadow-orange-500/20 text-center">
              <span className="font-mono font-extrabold text-2xl text-orange-400 tracking-wider">
                {gate}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1 uppercase font-medium">Gate Logic</span>
            </div>

            {/* Output LED */}
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                  output === 1
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.8)]'
                    : 'bg-slate-800/80 border-slate-700 text-slate-600'
                }`}
              >
                <Lightbulb className={`w-7 h-7 ${output === 1 ? 'text-emerald-400 animate-pulse' : 'text-slate-600'}`} />
              </div>
              <span className="text-[11px] font-mono mt-2 text-slate-400">
                LED {output === 1 ? 'ACTIVE' : 'OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Truth Table */}
        <div className="md:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <span>Truth Table ({gate})</span>
          </h4>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-xs text-center font-mono">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Input A</th>
                  {gate !== 'NOT' && <th className="py-2.5 px-3">Input B</th>}
                  <th className="py-2.5 px-3 text-orange-600 font-bold">Output (Y)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {truthTable.map((row, idx) => {
                  const isActive =
                    row.a === inputA && (gate === 'NOT' || row.b === inputB);
                  return (
                    <tr
                      key={idx}
                      className={isActive ? 'bg-orange-50 font-bold text-orange-900' : 'text-slate-600 hover:bg-slate-50'}
                    >
                      <td className="py-2 px-3">{row.a}</td>
                      {gate !== 'NOT' && <td className="py-2 px-3">{row.b}</td>}
                      <td className="py-2 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                            row.out === 1
                              ? 'bg-emerald-100 text-emerald-800 font-bold'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {row.out}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

