import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  CheckCircle2,
  FileCheck2,
  Cpu,
  ArrowRight,
  ShieldAlert,
  Info,
} from 'lucide-react';

const STACKUP_LAYERS = [
  {
    id: 1,
    name: 'L1: Top Copper (Signal & RF)',
    thickness: '0.043 mm (1 oz + Plating)',
    type: 'High-Speed Signal & RF Microstrip',
    mat: 'Electrodeposited Copper / ENIG Gold',
    color: 'bg-amber-600 text-white',
    notes: 'Controlled 50Ω single-ended & 100Ω differential pairs. Low-loss copper foil.',
  },
  {
    id: 2,
    name: 'Dielectric: Prepreg 1080 (Megtron-6)',
    thickness: '0.100 mm (Dk 3.65, Df 0.002)',
    type: 'Ultra-Low Loss Dielectric Prepreg',
    mat: 'Panasonic Megtron-6 Glass/Resin',
    color: 'bg-emerald-800 text-emerald-100',
    notes: 'Low dielectric constant ensures minimal signal dispersion at 28 Gbps.',
  },
  {
    id: 3,
    name: 'L2: Ground Plane (GND Ref 1)',
    thickness: '1 oz Solid Pour (35 µm)',
    type: 'Continuous Ground Reference Plane',
    mat: 'High Purity Rolled Copper',
    color: 'bg-slate-700 text-slate-100',
    notes: 'Provides solid return path directly under L1 high-speed traces. No slots or splits allowed.',
  },
  {
    id: 4,
    name: 'Dielectric: Core FR-4 Substrate',
    thickness: '0.200 mm (Dk 4.2)',
    type: 'Core Structural Glass-Reinforced Epoxy',
    mat: 'Standard Tg 170°C FR-4',
    color: 'bg-emerald-900 text-emerald-100',
    notes: 'Provides structural rigidity and mechanical thickness to the board panel.',
  },
  {
    id: 5,
    name: 'L3: Power Plane (VDD_CORE Split)',
    thickness: '1 oz Copper (35 µm)',
    type: 'Power Distribution Plane (0.85V / 3.3V)',
    mat: 'Heavy Copper Plane Pour',
    color: 'bg-red-700 text-white',
    notes: 'Split islands for high-current FPGA core and low-noise peripheral rails with bypass capacitors.',
  },
  {
    id: 6,
    name: 'L4: Bottom Copper (Routing / Caps)',
    thickness: '1 oz (35 µm) + ENIG',
    type: 'Secondary Component & Routing Layer',
    mat: 'Copper Foil with Electroless Nickel Immersion Gold',
    color: 'bg-amber-600 text-white',
    notes: 'Hosts decoupling capacitor arrays mounted directly underneath FPGA BGA balls.',
  },
];

export const PcbDesignPage: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState(STACKUP_LAYERS[0]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>EDA & DFM Engineering Centre</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            PCB Design & Manufacturing Resource Centre
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Design rules, multi-layer stackup calculations, signal & power integrity guidelines, and pre-tapeout DFM checklists for high-yield fabrication.
          </p>
        </div>

        {/* Stackup Explorer Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
                Cross-Section Architecture
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Interactive High-Speed Multi-Layer Stackup Explorer
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Click a layer to inspect dielectric and return-path roles
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visualizer Stack */}
            <div className="lg:col-span-7 space-y-2">
              {STACKUP_LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayer(layer)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between font-mono text-xs ${
                    layer.color
                  } ${
                    selectedLayer.id === layer.id
                      ? 'ring-4 ring-orange-500/30 scale-[1.01] shadow-md'
                      : 'opacity-90 hover:opacity-100 hover:scale-[1.005]'
                  }`}
                >
                  <span className="font-bold">{layer.name}</span>
                  <span className="text-[11px] opacity-90">{layer.thickness}</span>
                </button>
              ))}
            </div>

            {/* Selected Layer Inspector */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 font-mono text-xs">
              <h3 className="font-sans font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                Layer Physical & Electrical Properties
              </h3>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Selected Layer</span>
                <span className="text-slate-800 font-bold text-sm">{selectedLayer.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Layer Thickness</span>
                <span className="text-slate-800 font-semibold">{selectedLayer.thickness}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Function / Role</span>
                <span className="text-slate-800 font-semibold">{selectedLayer.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Substrate Material</span>
                <span className="text-slate-800 font-semibold">{selectedLayer.mat}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-600 font-sans leading-relaxed text-xs">
                <strong>SI/PI Engineering Note:</strong> {selectedLayer.notes}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars: Guidelines, Checklists & Manufacturing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: DFM Guidelines */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Design for Manufacturing (DFM)</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Strict adherence to minimum trace/space clearances (3.5/3.5 mil), annular ring limits, solder mask expansion, and copper sliver mitigation.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  IPC-2221 generic standard
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Via-in-pad plated over (VIPPO)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Thermal relief spokes on ground pours
                </li>
              </ul>
            </div>

            <Link
              to="/tools/pcb-trace-width"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              <span>Calculate Trace Ampacity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: High-Speed Routing Rules */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Signal & Power Integrity (SI/PI)</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Impedance continuity, differential pair skew length matching, return path preservation, and avoiding crossing plane splits.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  3W trace spacing to suppress crosstalk
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Ground via shielding fences along SerDes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  DDR4/DDR5 fly-by delay compensation
                </li>
              </ul>
            </div>

            <Link
              to="/blog/best-pcb-designers-in-india"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700"
            >
              <span>Read High-Speed Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Directories & Fabrication */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Fabrication & Assembly Directory</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Verified Indian and global PCB manufacturers, fast-turn prototyping bureaus, and turnkey SMD assembly services.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  AT&S India, Shogini, Circuit Systems
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  JLCPCB & PCBWay international fabrication
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  IPC Class 2 & Class 3 assembly
                </li>
              </ul>
            </div>

            <Link
              to="/directories?cat=PCB+Manufacturers"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Explore PCB Manufacturers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

