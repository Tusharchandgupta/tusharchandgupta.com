import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Palette,
  Lightbulb,
  Split,
  Activity,
  Cpu,
  BatteryCharging,
  Sun,
  ArrowRight,
} from 'lucide-react';
import { INITIAL_TOOLS } from '../../data/initialData';

const TOOL_ICONS: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-orange-500" />,
  Palette: <Palette className="w-5 h-5 text-pink-500" />,
  Lightbulb: <Lightbulb className="w-5 h-5 text-amber-500" />,
  Split: <Split className="w-5 h-5 text-blue-500" />,
  Activity: <Activity className="w-5 h-5 text-emerald-500" />,
  Cpu: <Cpu className="w-5 h-5 text-purple-500" />,
  BatteryCharging: <BatteryCharging className="w-5 h-5 text-green-500" />,
  Sun: <Sun className="w-5 h-5 text-yellow-500" />,
};

export const FeaturedTools: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
              Interactive CAD & Design Utilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Engineering Calculators
            </h2>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <span>Browse All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Featured Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {INITIAL_TOOLS.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className="group bg-slate-50/60 hover:bg-orange-50/40 p-5 rounded-2xl border border-slate-200 hover:border-orange-300 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                    {TOOL_ICONS[tool.iconName] || <Zap className="w-5 h-5 text-orange-500" />}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-1.5">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div>
                <div className="bg-white/80 rounded-lg p-2 border border-slate-200/80 mb-3 text-[11px] font-mono text-slate-600 truncate">
                  {tool.formula}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-orange-600 pt-1">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

