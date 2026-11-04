import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Cpu,
  Layers,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 p-1.5 shadow-xl shadow-orange-500/20">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-white">
                  <User className="w-16 h-16 text-orange-400 stroke-[1.5]" />
                  <span className="text-xs font-mono font-medium text-slate-300 mt-2 tracking-wider">
                    HW_ENG
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left space-y-3 flex-1">
              <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 uppercase">
                Biography & Profile
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Tushar Chand Gupta
              </h1>

              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Electronics & Communication Engineering Student
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                I’m an Electronics & Communication Engineering student working on embedded systems, PCB design, IoT, and AI hardware. Passionate about architecting reliable electronic circuits from schematic capture and 3D electromagnetic modeling to board bring-up and firmware driver integration.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                <a
                  href="https://github.com/Tusharchandgupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Hardware & PCB */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Hardware & PCB Engineering
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Design of multi-layer printed circuit boards, high-speed differential signal routing, power integrity decoupling arrays, and thermal relief modeling.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Altium Designer, KiCad, EasyEDA
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                IPC-2221 conductor sizing & IPC-7351 footprints
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Controlled impedance 50Ω single / 100Ω differential
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Gerber X2, Drill, and DFM pre-tapeout auditing
              </li>
            </ul>
          </div>

          {/* Card 2: Embedded Systems & Firmware */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Embedded Systems & Firmware
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Low-level peripheral bring-up, real-time operating system task scheduling, DMA transfer, and sensor bus communication protocols.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ARM Cortex-M4/M7 (STM32, NXP), ESP32 Xtensa
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                FreeRTOS multi-threading, queues, mutexes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                I²C, SPI, UART, CAN-FD, and RS-485 bus protocol drivers
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                TinyML on Edge: Edge Impulse & TensorFlow Lite
              </li>
            </ul>
          </div>
        </div>

        {/* Education & Objectives */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Academic Background & Platform Vision
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            As an Electronics & Communication Engineering student in India, I founded this platform to bridge the gap between classroom semiconductor theory and hands-on laboratory reality. Whether you need a quick Ohm's law calculation, a 4-band resistor lookup, an in-depth ESP32 architectural guide, or an interactive oscilloscope simulator, this platform is engineered to serve the electronics community with open, mathematically accurate resources.
          </p>
        </div>
      </div>
    </div>
  );
};

