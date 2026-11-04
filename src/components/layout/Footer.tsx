import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Github, Linkedin, Mail, Twitter, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Intro */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-tight">Tushar Chand Gupta</span>
                <span className="text-xs text-orange-400 font-medium tracking-wider uppercase">
                  Electronics Engineering · Projects · Learning
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An engineering hub connecting embedded systems, high-speed PCB design, interactive virtual laboratory simulations, and rigorous design calculators for students, researchers, and hardware professionals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Tusharchandgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-orange-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-orange-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@tusharchandgupta.com"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-orange-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Virtual Lab & Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Virtual Lab & Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/virtual-lab" className="hover:text-orange-400 transition-colors">
                  Digital Oscilloscope (DSO)
                </Link>
              </li>
              <li>
                <Link to="/tools/ohms-law" className="hover:text-orange-400 transition-colors">
                  Ohm's Law Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/resistor-color-code" className="hover:text-orange-400 transition-colors">
                  Resistor Colour Code
                </Link>
              </li>
              <li>
                <Link to="/tools/led-resistor" className="hover:text-orange-400 transition-colors">
                  LED Series Resistor
                </Link>
              </li>
              <li>
                <Link to="/tools/voltage-divider" className="hover:text-orange-400 transition-colors">
                  Voltage Divider Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/pcb-trace-width" className="hover:text-orange-400 transition-colors">
                  PCB Trace Width (IPC-2221)
                </Link>
              </li>
              <li>
                <Link to="/tools/battery-runtime" className="hover:text-orange-400 transition-colors">
                  Battery Runtime Sizing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hardware Wiki & Learning */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Wiki & Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/wiki/esp32" className="hover:text-orange-400 transition-colors">
                  ESP32 Pinout & Architecture
                </Link>
              </li>
              <li>
                <Link to="/wiki/stm32f4" className="hover:text-orange-400 transition-colors">
                  STM32 Cortex-M4 Microcontroller
                </Link>
              </li>
              <li>
                <Link to="/wiki/i2c-protocol" className="hover:text-orange-400 transition-colors">
                  I²C Bus Protocol & Pull-Ups
                </Link>
              </li>
              <li>
                <Link to="/pcb-design" className="hover:text-orange-400 transition-colors">
                  PCB Design & DFM Guidelines
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-orange-400 transition-colors">
                  Study Notes & GATE ECE
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-orange-400 transition-colors">
                  Recommended Engineering Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Directories & Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Directories & Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/directories?cat=Electronics+Companies" className="hover:text-orange-400 transition-colors">
                  Electronics Companies in India
                </Link>
              </li>
              <li>
                <Link to="/directories?cat=PCB+Manufacturers" className="hover:text-orange-400 transition-colors">
                  PCB Manufacturers
                </Link>
              </li>
              <li>
                <Link to="/directories?cat=PCB+Designers" className="hover:text-orange-400 transition-colors">
                  PCB Designers Directory
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-orange-400 transition-colors">
                  Engineered Hardware Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">
                  About Tushar Chand Gupta
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">
                  Connect & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1">
                  <span>Admin Console</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Tushar Chand Gupta. All rights reserved. Hosted at{' '}
            <a href="https://tusharchandgupta.com" className="text-slate-400 hover:text-white underline">
              tusharchandgupta.com
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span>Electronics & Communication Engineering</span>
            <span>•</span>
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

