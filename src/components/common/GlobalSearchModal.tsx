import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Zap, BookOpen, Cpu, FolderGit2, Building2, Download, FileText, ArrowRight } from 'lucide-react';
import { StorageService } from '../../services/storageService';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  title: string;
  category: string;
  url: string;
  description: string;
  icon: React.ReactNode;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const items: SearchResult[] = [];

    // Search Tools
    StorageService.getTools().forEach(t => {
      if (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q))) {
        items.push({
          title: t.name,
          category: 'Engineering Tool',
          url: `/tools/${t.slug}`,
          description: t.description,
          icon: <Zap className="w-4 h-4 text-orange-500" />,
        });
      }
    });

    // Search Articles
    StorageService.getArticles().forEach(a => {
      if (a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))) {
        items.push({
          title: a.title,
          category: `Blog • ${a.category}`,
          url: `/blog/${a.slug}`,
          description: a.excerpt,
          icon: <FileText className="w-4 h-4 text-blue-500" />,
        });
      }
    });

    // Search Projects
    StorageService.getProjects().forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q))) {
        items.push({
          title: p.title,
          category: `Project • ${p.category}`,
          url: `/projects/${p.slug}`,
          description: p.description,
          icon: <FolderGit2 className="w-4 h-4 text-emerald-500" />,
        });
      }
    });

    // Search Hardware Wiki
    StorageService.getWikiEntries().forEach(w => {
      if (w.title.toLowerCase().includes(q) || w.summary.toLowerCase().includes(q)) {
        items.push({
          title: w.title,
          category: `Hardware Wiki`,
          url: `/wiki/${w.slug}`,
          description: w.summary,
          icon: <Cpu className="w-4 h-4 text-purple-500" />,
        });
      }
    });

    // Search Directories
    StorageService.getApprovedDirectories().forEach(d => {
      if (d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.city.toLowerCase().includes(q)) {
        items.push({
          title: d.name,
          category: `Directory • ${d.category}`,
          url: `/directories`,
          description: `${d.location} — ${d.description}`,
          icon: <Building2 className="w-4 h-4 text-amber-500" />,
        });
      }
    });

    // Search Downloads
    StorageService.getDownloads().forEach(d => {
      if (d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) {
        items.push({
          title: d.title,
          category: `Download • ${d.category}`,
          url: `/downloads`,
          description: `${d.format} (${d.size}) — ${d.description}`,
          icon: <Download className="w-4 h-4 text-cyan-500" />,
        });
      }
    });

    // Search Books
    StorageService.getBooks().forEach(b => {
      if (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)) {
        items.push({
          title: b.title,
          category: `Book • ${b.author}`,
          url: `/books`,
          description: b.description,
          icon: <BookOpen className="w-4 h-4 text-indigo-500" />,
        });
      }
    });

    setResults(items.slice(0, 10));
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
            placeholder="Search tools, calculators, wiki, articles, directories, downloads..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-[1.5]" />
              <p className="text-sm font-medium">Type a keyword to search across the platform</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3 text-xs text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">Ohm's Law</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">ESP32</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">PCB Trace Width</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">LED Resistor</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">GATE Notes</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for a component, formula, or company name.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(res.url)}
                  className="w-full text-left p-3 rounded-xl hover:bg-orange-50/80 transition-colors flex items-start gap-3 group border border-transparent hover:border-orange-200"
                >
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white text-slate-700 shadow-sm mt-0.5">
                    {res.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-orange-600 truncate">
                        {res.title}
                      </h4>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {res.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{res.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

