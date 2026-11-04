import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    // Call storage service with validation
    const result = StorageService.subscribeNewsletter(email);
    setIsSubmitting(false);
    setFeedback(result);
    if (result.success) {
      setEmail('');
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-3xl border border-orange-200/80 p-8 sm:p-10 text-center relative overflow-hidden shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-orange-600/30">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Stay Updated with Engineering Dispatches
          </h2>

          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
            Get curated monthly updates on new virtual lab experiments, PCB design tutorials, calculator utilities, and hardware industry analysis.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your engineer email..."
                required
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-600/30 disabled:opacity-50"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              No spam. We respect your privacy. You can unsubscribe at any time.
            </p>

            {feedback && (
              <div
                className={`flex items-center justify-center gap-2 text-xs font-medium p-3 rounded-xl animate-in fade-in ${
                  feedback.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {feedback.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

