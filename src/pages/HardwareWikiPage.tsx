import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Search, ArrowRight, Filter, BookOpen, Layers } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const HardwareWikiPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const wikiEntries = StorageService.getWikiEntries();
  const categories = ['All', 'Microcontrollers', 'Communication Protocols', 'Sensors & Modules', 'ICs & Power'];

  const filteredEntries = wikiEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' || entry.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Silicon & Component Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hardware Engineering Wiki
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            In-depth architectural breakdowns, pinout maps, bus protocols, electrical characteristics, and driver firmware for microcontrollers and sensors.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search microcontrollers, ICs, protocols..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Wiki Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <Link
              key={entry.id}
              to={`/wiki/${entry.slug}`}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
                    {entry.category}
                  </span>
                  <Cpu className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2 leading-snug">
                  {entry.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                  {entry.summary}
                </p>

                {/* Quick specs preview */}
                <div className="space-y-1.5 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  {entry.specifications.slice(0, 3).map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between text-[11px]">
                      <span className="text-slate-400">{spec.key}:</span>
                      <span className="font-semibold text-slate-700 truncate ml-2">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-purple-600 pt-3 border-t border-slate-100">
                <span>View Full Wiki & Pinout</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

