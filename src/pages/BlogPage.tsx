import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const BlogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const articles = StorageService.getArticles().filter((a) => a.status === 'published');
  const categories = ['All', 'Industry', 'Embedded Systems', 'PCB Design'];

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCat === 'All' || a.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-orange-600" />
            <span>Articles & Research Notes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Electronics Engineering Technical Blog
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Tutorials, embedded systems architecture, high-speed PCB bring-up, and Indian ESDM industry reports.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCat === cat
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold text-orange-700 bg-orange-50/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-orange-200/80 shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2 leading-snug">
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/blog/${article.slug}`}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

