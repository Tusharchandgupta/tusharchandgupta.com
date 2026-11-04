import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Zap,
  Cpu,
  Layers,
  Download,
  BookOpen,
  Building2,
  ArrowRight,
} from 'lucide-react';

interface CategoryCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tag: string;
  colorClass: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    title: 'Virtual Lab',
    description: 'Experiments and simulation bench with real-time waveform testing.',
    href: '/virtual-lab',
    icon: <Activity className="w-5 h-5 text-orange-600" />,
    tag: 'Simulations',
    colorClass: 'bg-orange-50 text-orange-600 border-orange-200/60',
  },
  {
    title: 'Engineering Tools',
    description: 'Calculators and design tools with verified formulas and units.',
    href: '/tools',
    icon: <Zap className="w-5 h-5 text-amber-600" />,
    tag: 'Calculators',
    colorClass: 'bg-amber-50 text-amber-600 border-amber-200/60',
  },
  {
    title: 'Hardware Wiki',
    description: 'Components, ICs, microcontrollers, modules, and datasheets.',
    href: '/wiki',
    icon: <Cpu className="w-5 h-5 text-purple-600" />,
    tag: 'Knowledge Base',
    colorClass: 'bg-purple-50 text-purple-600 border-purple-200/60',
  },
  {
    title: 'PCB & Design',
    description: 'PCB guides, design rules, designers, and fabrication resources.',
    href: '/pcb-design',
    icon: <Layers className="w-5 h-5 text-emerald-600" />,
    tag: 'EDA & DFM',
    colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
  },
  {
    title: 'Downloads',
    description: 'Original study notes, lab manuals, software, and GATE material.',
    href: '/downloads',
    icon: <Download className="w-5 h-5 text-blue-600" />,
    tag: 'Files & Notes',
    colorClass: 'bg-blue-50 text-blue-600 border-blue-200/60',
  },
  {
    title: 'Books',
    description: 'Recommended engineering textbooks and open-access resources.',
    href: '/books',
    icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
    tag: 'Literature',
    colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
  },
  {
    title: 'Directories',
    description: 'Indian electronics companies, PCB manufacturers, and services.',
    href: '/directories',
    icon: <Building2 className="w-5 h-5 text-rose-600" />,
    tag: 'Industry',
    colorClass: 'bg-rose-50 text-rose-600 border-rose-200/60',
  },
];

export const ResourceCards: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
              Core Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Resource Categories
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Explore dedicated hubs tailored for electronics students, embedded developers, and hardware architects.
          </p>
        </div>

        {/* 7-card responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {CATEGORIES.map((card, idx) => (
            <Link
              key={idx}
              to={card.href}
              className="group relative bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.colorClass} group-hover:scale-105 transition-transform`}>
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-orange-600">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

