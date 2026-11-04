import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 bg-slate-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
          <Cpu className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
          Error 404 • Open Circuit
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Page Disconnected
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The requested hardware node or technical resource does not exist or has been relocated to another address.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/tools"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Browse Calculators</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

