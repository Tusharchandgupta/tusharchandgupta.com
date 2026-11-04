import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Search,
  ArrowRight,
  Filter,
  Palette,
  Lightbulb,
  Split,
  Activity,
  Cpu,
  BatteryCharging,
  Sun,
} from 'lucide-react';
import { StorageService } from '../services/storageService';

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

export const ToolsDirectoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const tools = StorageService.getTools();
  const categories = ['All', 'Electrical', 'PCB Design', 'Signals & RF', 'Power & Energy'];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      tool.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Electrical' && (tool.category === 'Circuit Analysis' as any));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-orange-600" />
            <span>Design & Analysis Utilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering Calculators & CAD Tools
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Mathematically validated calculators for circuit design, PCB impedance, component sizing, and energy budgets.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, tag, or formula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {TOOL_ICONS[tool.iconName] || <Zap className="w-6 h-6 text-orange-500" />}
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              <div>
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-4 text-xs font-mono text-slate-700 truncate">
                  {tool.formula}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-orange-600 pt-3 border-t border-slate-100">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

