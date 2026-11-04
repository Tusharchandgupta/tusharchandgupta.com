import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Clock, ArrowRight } from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const LatestArticles: React.FC = () => {
  const articles = StorageService.getArticles().slice(0, 3);

  return (
    <section className="py-14 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
              Technical Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Latest Articles & Guides
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Article Cover Image */}
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
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

