import React, { useState } from 'react';
import { BookOpen, ExternalLink, Search, Sparkles } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const BooksPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const books = StorageService.getBooks();
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || b.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Foundational Literature</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Recommended Engineering Books
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Seminal textbooks, practical hardware guides, and reference manuals curated for deep theoretical and practical electronics mastery.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search books by title, author, or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {levels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
                    {book.category}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      book.level === 'Beginner'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : book.level === 'Intermediate'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {book.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  By {book.author}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {book.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Official Publisher & Resource</span>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
                >
                  <span>Publisher Info</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

