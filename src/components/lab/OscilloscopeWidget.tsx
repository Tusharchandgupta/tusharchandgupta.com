import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

type SignalType = 'sine' | 'pwm' | 'spi' | 'can';

export const OscilloscopeWidget: React.FC = () => {
  const [signal, setSignal] = useState<SignalType>('sine');
  const [frequency, setFrequency] = useState<number>(12.5); // MHz
  const [vDiv, setVDiv] = useState<number>(1.0); // V/div
  const [noise, setNoise] = useState<number>(0.05); // 5% jitter/noise
  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number>(0);
  const timeOffsetRef = useRef<number>(0);

  // Live telemetry metrics computed from settings
  const vpp = signal === 'pwm' ? 3.3 : signal === 'spi' ? 3.3 : signal === 'can' ? 2.5 : (3.3 * (1 + (Math.random() - 0.5) * noise)).toFixed(2);
  const vrms = (Number(vpp) / (signal === 'sine' ? 2.828 : 2)).toFixed(2);
  const duty = signal === 'pwm' ? '50.0%' : signal === 'spi' ? '33.3%' : signal === 'can' ? '45.0%' : '50.0%';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const width = canvas.width;
      const height = canvas.height;

      // Draw Oscilloscope Dark Screen
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, width, height);

      // Draw Scope Graticule Grid (10x8 subdivisions)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;

      const numCols = 10;
      const numRows = 8;
      const cellW = width / numCols;
      const cellH = height / numRows;

      ctx.beginPath();
      for (let i = 0; i <= numCols; i++) {
        const x = i * cellW;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let j = 0; j <= numRows; j++) {
        const y = j * cellH;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center crosshairs
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Advance time unless frozen
      if (!isFrozen) {
        timeOffsetRef.current += frequency * 0.05;
      }
      const tOff = timeOffsetRef.current;

      // Draw Signal Waveform
      ctx.beginPath();
      ctx.lineWidth = 2.5;

      if (signal === 'sine') {
        ctx.strokeStyle = '#10b981'; // Green phospher
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
      } else if (signal === 'pwm') {
        ctx.strokeStyle = '#f97316'; // Orange
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 8;
      } else if (signal === 'spi') {
        ctx.strokeStyle = '#38bdf8'; // Cyan
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = '#a855f7'; // Purple
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 8;
      }

      const centerY = height / 2;
      const amplitude = (height / 4) / vDiv;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 20 + tOff;
        let yNorm = 0;

        if (signal === 'sine') {
          yNorm = Math.sin(t);
        } else if (signal === 'pwm') {
          yNorm = Math.sin(t) >= 0 ? 0.9 : -0.9;
        } else if (signal === 'spi') {
          // Packet train simulation
          const cycle = Math.floor(t) % 8;
          yNorm = [1, -1, 1, 1, -1, 1, -1, -1][cycle] * 0.85;
        } else if (signal === 'can') {
          // Differential CAN frame
          const cycle = Math.floor(t * 1.5) % 12;
          yNorm = cycle % 3 === 0 ? 0.9 : -0.7;
        }

        // Apply thermal noise / jitter
        const jitter = (Math.random() - 0.5) * noise * 20;
        const y = centerY - yNorm * amplitude + jitter;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset blur

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      cancelAnimationFrame(animFrameId.current);
    };
  }, [signal, frequency, vDiv, noise, isFrozen]);

  return (
    <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Scope Bezel Header */}
      <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isFrozen ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
          <span className="font-mono font-bold text-white tracking-wider">
            TEK-RIGOL HYBRID 4-CH 1GHz DSO
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-slate-400">
          <span className={isFrozen ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
            {isFrozen ? 'STOPPED' : 'TRIG’D [AUTO]'}
          </span>
          <span>5.00 GSa/s</span>
          <span className="hidden sm:inline">10M pts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Screen Area (Canvas) */}
        <div className="lg:col-span-8 p-4 sm:p-6 bg-slate-950 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Top Telemetry overlay */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-300 pb-3 gap-2 border-b border-slate-900">
            <span className="text-emerald-400">Vpp: {vpp} V</span>
            <span className="text-blue-400">Vrms: {vrms} V</span>
            <span className="text-amber-400">Freq: {frequency.toFixed(1)} MHz</span>
            <span className="text-purple-400">Duty: {duty}</span>
          </div>

          {/* Oscilloscope Canvas */}
          <div className="relative my-3 rounded-xl overflow-hidden border border-slate-800 bg-[#0a0f1d] aspect-[16/9] sm:aspect-[2/1]">
            <canvas
              ref={canvasRef}
              width={700}
              height={350}
              className="w-full h-full block"
            />
          </div>

          {/* Bottom On-Screen Telemetry */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 pt-2">
            <span>CH1: {vDiv.toFixed(2)} V/div (1MΩ DC)</span>
            <span>TIME: 20 ns/div</span>
            <span>TRIG: CH1 1.25V RISING</span>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-900/60 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Signal Channel Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Signal Source Channel
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSignal('sine')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    signal === 'sine'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  Sine Clock
                </button>
                <button
                  type="button"
                  onClick={() => setSignal('pwm')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    signal === 'pwm'
                      ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  GaN PWM
                </button>
                <button
                  type="button"
                  onClick={() => setSignal('spi')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    signal === 'spi'
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  SPI Packet
                </button>
                <button
                  type="button"
                  onClick={() => setSignal('can')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    signal === 'can'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  CAN-FD Frame
                </button>
              </div>
            </div>

            {/* Slider: Frequency */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-400">Clock Frequency</span>
                <span className="text-orange-400 font-bold">{frequency} MHz</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="0.5"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Slider: Volts per div */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-400">Vertical Scale (V/div)</span>
                <span className="text-orange-400 font-bold">{vDiv.toFixed(2)} V/div</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.25"
                value={vDiv}
                onChange={(e) => setVDiv(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Slider: Thermal Noise */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-400">Thermal Noise & Jitter</span>
                <span className="text-orange-400 font-bold">{(noise * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.02"
                value={noise}
                onChange={(e) => setNoise(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFrozen(!isFrozen)}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                isFrozen
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {isFrozen ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span>{isFrozen ? 'RUN' : 'STOP'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsFrozen(false);
                timeOffsetRef.current = 0;
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-bold border border-slate-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RE-ARM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

