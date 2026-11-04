import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Cpu,
  ChevronDown,
  Search,
  Lock,
  Menu,
  X,
  Zap,
  BookOpen,
  Building2,
  FolderGit2,
  FileText,
  Download,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { GlobalSearchModal } from '../common/GlobalSearchModal';

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Tushar Chand Gupta Home">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight tracking-tight group-hover:text-orange-600 transition-colors">
                  Tushar Chand Gupta
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                  Electronics Engineering
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 ${
                  location.pathname === '/' ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                Home
              </Link>

              <Link
                to="/virtual-lab"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 flex items-center gap-1.5 ${
                  location.pathname.startsWith('/virtual-lab') ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                <Activity className="w-4 h-4 text-orange-500" />
                Virtual Lab
              </Link>

              {/* Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 flex items-center gap-1 ${
                    location.pathname.startsWith('/tools') ? 'text-orange-600 font-semibold' : ''
                  }`}
                  aria-expanded={activeDropdown === 'tools'}
                >
                  Tools
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 transition-transform" />
                </button>

                {activeDropdown === 'tools' && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      to="/tools"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-orange-50 font-semibold text-orange-600 text-xs tracking-wider uppercase border-b border-slate-100 mb-1"
                    >
                      <Zap className="w-4 h-4 text-orange-500" />
                      Browse All 8+ Tools & Calcs
                    </Link>
                    <div className="grid grid-cols-1 gap-0.5 text-xs">
                      <Link to="/tools/ohms-law" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        Ohm’s Law & Power Calculator
                      </Link>
                      <Link to="/tools/resistor-color-code" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        Resistor Colour Code (4 & 5 Band)
                      </Link>
                      <Link to="/tools/led-resistor" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        LED Series Resistor Calculator
                      </Link>
                      <Link to="/tools/voltage-divider" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        Voltage Divider & Attenuator
                      </Link>
                      <Link to="/tools/rc-rl-circuit" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        RC / RL Filter & Cutoff Frequency
                      </Link>
                      <Link to="/tools/pcb-trace-width" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        PCB Trace Width (IPC-2221)
                      </Link>
                      <Link to="/tools/battery-runtime" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        Battery Runtime & Capacity
                      </Link>
                      <Link to="/tools/solar-sizing" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600">
                        Solar Panel & PV Sizing
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 flex items-center gap-1 ${
                    ['/wiki', '/pcb-design', '/downloads', '/books'].some(p => location.pathname.startsWith(p))
                      ? 'text-orange-600 font-semibold'
                      : ''
                  }`}
                  aria-expanded={activeDropdown === 'resources'}
                >
                  Resources
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link to="/wiki" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-slate-800 hover:text-orange-600">
                      <Cpu className="w-4 h-4 text-purple-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-xs">Hardware Wiki</div>
                        <div className="text-[11px] text-slate-500">ICs, microcontrollers, protocols</div>
                      </div>
                    </Link>
                    <Link to="/pcb-design" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-slate-800 hover:text-orange-600">
                      <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-xs">PCB Design Centre</div>
                        <div className="text-[11px] text-slate-500">KiCad, Altium, stackups, DFM</div>
                      </div>
                    </Link>
                    <Link to="/downloads" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-slate-800 hover:text-orange-600">
                      <Download className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-xs">Downloads & Notes</div>
                        <div className="text-[11px] text-slate-500">Study sheets, GATE ECE, manuals</div>
                      </div>
                    </Link>
                    <Link to="/books" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-slate-800 hover:text-orange-600">
                      <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-xs">Recommended Books</div>
                        <div className="text-[11px] text-slate-500">Essential hardware engineering texts</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Directories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('directories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 flex items-center gap-1 ${
                    location.pathname.startsWith('/directories') ? 'text-orange-600 font-semibold' : ''
                  }`}
                  aria-expanded={activeDropdown === 'directories'}
                >
                  Directories
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
                </button>

                {activeDropdown === 'directories' && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link to="/directories" className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-50 text-slate-800 hover:text-orange-600">
                      <Building2 className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="font-semibold text-xs">All Directories</span>
                    </Link>
                    <Link to="/directories?cat=Electronics+Companies" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600 block text-xs">
                      Electronics Companies in India
                    </Link>
                    <Link to="/directories?cat=PCB+Manufacturers" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600 block text-xs">
                      PCB Manufacturers
                    </Link>
                    <Link to="/directories?cat=PCB+Designers" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600 block text-xs">
                      PCB Designers & Bureaus
                    </Link>
                    <Link to="/directories?cat=Component+Distributors" className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-orange-600 block text-xs">
                      Component Distributors
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 ${
                  location.pathname.startsWith('/blog') ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                Blog
              </Link>

              <Link
                to="/projects"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 ${
                  location.pathname.startsWith('/projects') ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                Projects
              </Link>

              <Link
                to="/about"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 ${
                  location.pathname === '/about' ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 ${
                  location.pathname === '/contact' ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Actions: Search Button & Distinct Orange Admin Login Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Search resources (Ctrl+K)"
                title="Search resources (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Distinct Admin Login Button with Orange Accent */}
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-orange-600 text-white shadow-sm shadow-orange-600/30 hover:bg-orange-700 active:scale-95 transition-all"
                title="Restricted Administrative Console"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            <Link to="/" className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50">
              Home
            </Link>
            <Link to="/virtual-lab" className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50">
              Virtual Lab
            </Link>

            {/* Tools Mobile Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown('m-tools')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50"
              >
                <span>Engineering Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'm-tools' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'm-tools' && (
                <div className="pl-4 pr-2 py-1 space-y-1 text-sm text-slate-600 bg-slate-50 rounded-xl my-1">
                  <Link to="/tools" className="block py-1.5 font-semibold text-orange-600">All Tools</Link>
                  <Link to="/tools/ohms-law" className="block py-1">Ohm's Law Calculator</Link>
                  <Link to="/tools/resistor-color-code" className="block py-1">Resistor Color Code</Link>
                  <Link to="/tools/led-resistor" className="block py-1">LED Series Resistor</Link>
                  <Link to="/tools/voltage-divider" className="block py-1">Voltage Divider</Link>
                  <Link to="/tools/rc-rl-circuit" className="block py-1">RC / RL Filter Calculator</Link>
                  <Link to="/tools/pcb-trace-width" className="block py-1">PCB Trace Width (IPC-2221)</Link>
                  <Link to="/tools/battery-runtime" className="block py-1">Battery Runtime</Link>
                  <Link to="/tools/solar-sizing" className="block py-1">Solar Panel Sizing</Link>
                </div>
              )}
            </div>

            {/* Resources Mobile Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown('m-res')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'm-res' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'm-res' && (
                <div className="pl-4 pr-2 py-1 space-y-1 text-sm text-slate-600 bg-slate-50 rounded-xl my-1">
                  <Link to="/wiki" className="block py-1">Hardware Wiki</Link>
                  <Link to="/pcb-design" className="block py-1">PCB Design Centre</Link>
                  <Link to="/downloads" className="block py-1">Downloads & Notes</Link>
                  <Link to="/books" className="block py-1">Recommended Books</Link>
                </div>
              )}
            </div>

            {/* Directories Mobile Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown('m-dir')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50"
              >
                <span>Directories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'm-dir' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'm-dir' && (
                <div className="pl-4 pr-2 py-1 space-y-1 text-sm text-slate-600 bg-slate-50 rounded-xl my-1">
                  <Link to="/directories" className="block py-1 font-semibold text-orange-600">All Listings</Link>
                  <Link to="/directories?cat=Electronics+Companies" className="block py-1">Electronics Companies</Link>
                  <Link to="/directories?cat=PCB+Manufacturers" className="block py-1">PCB Manufacturers</Link>
                  <Link to="/directories?cat=PCB+Designers" className="block py-1">PCB Designers</Link>
                  <Link to="/directories?cat=Component+Distributors" className="block py-1">Component Distributors</Link>
                </div>
              )}
            </div>

            <Link to="/blog" className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50">
              Blog
            </Link>
            <Link to="/projects" className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50">
              Projects
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50">
              About Me
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-orange-50">
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

