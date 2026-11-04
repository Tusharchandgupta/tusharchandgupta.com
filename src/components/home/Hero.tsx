import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Zap, ArrowRight, ShieldCheck, Sparkles, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Subtle tech background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Interactive Bench & Knowledge Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Electronics Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                Resources & Learning
              </span>{' '}
              Platform
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Virtual Lab, Engineering Tools, Hardware Wiki, PCB Resources, Directories, Downloads, Books and more for Electronics Engineers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/virtual-lab"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl bg-orange-600 text-white shadow-md shadow-orange-600/25 hover:bg-orange-700 active:scale-95 transition-all"
              >
                <Activity className="w-4 h-4" />
                <span>Explore Virtual Lab</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:text-slate-900 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Explore Tools</span>
              </Link>
            </div>

            {/* Key feature tags */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs font-medium text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Mathematical Verification
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                Altium & KiCad Standards
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Free Educational Access
              </span>
            </div>
          </div>

          {/* Right Column: Electronics Laboratory Visual with angled badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative angled background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl" />

              {/* Main Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src="/assets/images/hero-pcb.jpg"
                    alt="Electronics laboratory workbench with high-speed multi-layer PCB, digital oscilloscope, and testing instrumentation"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {/* Angled / floating badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-slate-800">Precision Test Bench</span>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        DUT: 14-LAYER ENIG
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] text-slate-600">
                      <span>Oscilloscope 1GHz DSO</span>
                      <span className="font-mono text-orange-600 font-semibold">5.0 GSa/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

