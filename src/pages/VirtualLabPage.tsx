import React, { useState } from 'react';
import {
  Activity,
  Zap,
  Cpu,
  Layers,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { OscilloscopeWidget } from '../components/lab/OscilloscopeWidget';
import { LogicGatesSimulator } from '../components/lab/LogicGatesSimulator';
import { OhmsLawLab } from '../components/lab/OhmsLawLab';
import { INITIAL_EXPERIMENTS } from '../data/initialData';

export const VirtualLabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'oscilloscope' | 'logic-gates' | 'ohms-law' | 'experiments'>('oscilloscope');
  const [selectedExp, setSelectedExp] = useState(INITIAL_EXPERIMENTS[0]);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5 text-orange-600" />
            <span>Interactive Virtual Instrumentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Electronics Virtual Laboratory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Simulate live circuit waveforms, verify fundamental electronics theorems, and conduct interactive guided laboratory experiments in real-time.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('oscilloscope')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'oscilloscope'
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Digital Oscilloscope (DSO)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logic-gates')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'logic-gates'
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Logic Gates Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ohms-law')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ohms-law'
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Ohm's Law Circuit Loop</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('experiments')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'experiments'
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Guided Lab Manuals</span>
          </button>
        </div>

        {/* Tab 1: Oscilloscope */}
        {activeTab === 'oscilloscope' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Live Synthesized Bench Instrument: Test Sine clocks, GaN PWM switching, SPI serial packets, and CAN-FD differential frames.
              </span>
              <span className="font-mono text-slate-400 hidden sm:inline">1 GHz Analog Bandwidth</span>
            </div>
            <OscilloscopeWidget />
          </div>
        )}

        {/* Tab 2: Logic Gates */}
        {activeTab === 'logic-gates' && (
          <div className="space-y-6">
            <LogicGatesSimulator />
          </div>
        )}

        {/* Tab 3: Ohm's Law */}
        {activeTab === 'ohms-law' && (
          <div className="space-y-6">
            <OhmsLawLab />
          </div>
        )}

        {/* Tab 4: Guided Experiments */}
        {activeTab === 'experiments' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List of experiments */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Select Laboratory Experiment
              </span>
              {INITIAL_EXPERIMENTS.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setSelectedExp(exp)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    selectedExp.id === exp.id
                      ? 'bg-white border-orange-500 shadow-sm'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-medium text-orange-600 uppercase">
                      {exp.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">
                      {exp.title}
                    </h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}

              {/* Additional Curriculum Experiments */}
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/60 mt-4">
                <h5 className="text-xs font-bold text-orange-900">Lab Certification Syllabus</h5>
                <p className="text-[11px] text-orange-800/80 mt-1">
                  Aligned with AICTE & IEEE curriculum standards for B.Tech ECE & EEE laboratories.
                </p>
              </div>
            </div>

            {/* Detailed Experiment Sheet */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-mono text-orange-600 font-semibold uppercase">
                  {selectedExp.category} • LAB EXPERIMENT
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {selectedExp.title}
                </h2>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  1. Objective & Aim
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedExp.objective}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  2. Theoretical Background
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedExp.theory}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  3. Hardware Components & Test Gear
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.componentsNeeded.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  4. Step-by-Step Procedure
                </h3>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-700 list-decimal pl-5 leading-relaxed">
                  {selectedExp.procedure.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Experiment Status: Ready for verification
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab(selectedExp.interactiveType as any)}
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
                >
                  Open Interactive Bench
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

