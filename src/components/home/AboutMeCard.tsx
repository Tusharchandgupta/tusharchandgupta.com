import React from 'react';
import { Link } from 'react-router-dom';
import { User, ArrowRight, FolderGit2, Cpu, Wrench, Sparkles } from 'lucide-react';

export const AboutMeCard: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-50 to-orange-50/40 rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Profile Avatar / Placeholder */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 p-1 shadow-lg shadow-orange-500/20">
                <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
                  <User className="w-14 h-14 text-orange-400 stroke-[1.5]" />
                  <span className="text-[10px] font-mono font-medium text-slate-300 mt-1 uppercase tracking-wider">
                    ECE Student
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-slate-200 text-orange-600">
                <Cpu className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>About Me</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tushar Chand Gupta
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                I’m an Electronics & Communication Engineering student working on embedded systems, PCB design, IoT, and AI hardware.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs text-slate-500">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-medium">
                  ⚡ Embedded C & FreeRTOS
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-medium">
                  ⚡ Altium & KiCad PCB Design
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-medium">
                  ⚡ Edge-AI & TinyML
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-orange-600 text-white shadow-sm hover:bg-orange-700 active:scale-95 transition-all"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-orange-500" />
                  <span>My Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

