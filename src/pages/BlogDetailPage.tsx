import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Tag, ArrowRight } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = StorageService.getArticleBySlug(slug || '');

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <Link to="/blog" className="mt-4 inline-block text-orange-600 font-semibold underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Header Image */}
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden bg-slate-900">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-xs font-semibold text-orange-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                {article.category}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User className="w-4 h-4 text-orange-600" />
                  {article.author}
                </span>
                <span>•</span>
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

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {/* Article Content */}
            <div className="py-8 text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              {article.content}
            </div>

            {/* Tags & Author Bio Strip */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Tags:
                </span>
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  TCG
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tushar Chand Gupta</h4>
                  <p className="text-[11px] text-slate-500">
                    Electronics & Communication Engineering student passionate about embedded systems, high-speed PCB hardware, and IoT architectures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

