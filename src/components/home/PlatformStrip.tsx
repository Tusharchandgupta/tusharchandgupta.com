import React from 'react';
import {
  GraduationCap,
  Layers,
  Compass,
  Search,
  BookOpen,
  Download,
  Hammer,
} from 'lucide-react';

const ACTIONS = [
  { label: 'Learn', desc: 'Circuit theory & protocols', icon: <GraduationCap className="w-4 h-4 text-orange-500" /> },
  { label: 'Design', desc: 'Schematics & PCB stackups', icon: <Layers className="w-4 h-4 text-amber-500" /> },
  { label: 'Explore', desc: 'Virtual bench instruments', icon: <Compass className="w-4 h-4 text-emerald-500" /> },
  { label: 'Discover', desc: 'ESDM companies & suppliers', icon: <Search className="w-4 h-4 text-blue-500" /> },
  { label: 'Read', desc: 'Technical guides & papers', icon: <BookOpen className="w-4 h-4 text-purple-500" /> },
  { label: 'Download', desc: 'Notes, code & manuals', icon: <Download className="w-4 h-4 text-cyan-500" /> },
  { label: 'Build', desc: 'Embedded IoT & hardware', icon: <Hammer className="w-4 h-4 text-rose-500" /> },
];

export const PlatformStrip: React.FC = () => {
  return (
    <section className="bg-slate-900 py-6 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 md:gap-2">
          {ACTIONS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
              <div className="p-1 rounded bg-slate-800 text-orange-400">
                {item.icon}
              </div>
              <div>
                <span className="font-bold text-slate-100 uppercase tracking-wider text-[11px] block">
                  {item.label}
                </span>
                <span className="text-slate-400 text-[10px] hidden sm:block">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

