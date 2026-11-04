import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Cpu, FileCode2, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const WikiDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = StorageService.getWikiEntryBySlug(slug || '');

  if (!entry) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Wiki Entry Not Found</h2>
        <Link to="/wiki" className="mt-4 inline-block text-purple-600 font-semibold underline">
          Return to Hardware Wiki
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/wiki"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hardware Wiki</span>
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-mono font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 uppercase">
              {entry.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              {entry.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {entry.summary}
            </p>
          </div>

          {/* Specifications Table */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Hardware Specifications
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-100">
                  {entry.specifications.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}>
                      <td className="py-2.5 px-4 font-bold text-slate-600 w-1/3">{spec.key}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-800">{spec.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pinout Table (if present) */}
          {entry.pinout && entry.pinout.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Pinout & Multiplexed Functions
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Pin</th>
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Description & Caveats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {entry.pinout.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold text-purple-600">{p.pin}</td>
                        <td className="py-2 px-3 font-semibold text-slate-800">{p.name}</td>
                        <td className="py-2 px-3 text-slate-500">{p.type}</td>
                        <td className="py-2 px-3 text-slate-600 font-sans text-[11px]">{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Main Article Content */}
          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Architecture & Electrical Characteristics
            </h2>
            <div className="whitespace-pre-line text-slate-700 leading-relaxed">
              {entry.content}
            </div>
          </div>

          {/* Sample Firmware Code */}
          {entry.sampleCode && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode2 className="w-4 h-4 text-orange-500" />
                  <span>Production Firmware Driver Sample</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  C / C++ (ESP-IDF)
                </span>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{entry.sampleCode}</code>
              </pre>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

