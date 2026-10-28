/**
 * Interactive Digital Storage Oscilloscope (DSO) Simulator
 * Real-time signal synthesis, phosphor display rendering, and hardware telemetry.
 */

class Oscilloscope {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Canvas resolution setup
    this.dpr = window.devicePixelRatio || 1;
    this.setupCanvas();

    // Signal state
    this.signalType = 'sine'; // sine, pwm, spi, can
    this.frequency = 12.5; // in MHz / nominal units
    this.vDiv = 1.0; // Volts per division
    this.tDiv = 20; // ns/div
    this.noise = 0.05; // thermal noise ratio
    this.isFrozen = false;
    this.phase = 0;
    this.time = 0;

    // Measurements
    this.vpp = '3.30 V';
    this.vrms = '1.16 V';
    this.freqText = '12.50 MHz';
    this.duty = '50.0%';
    this.riseTime = '1.42 ns';

    this.bindEvents();
    this.animate();
  }

  setupCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || 600;
    this.height = rect.height || 380;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.setupCanvas());

    // Signal button toggles
    const sigButtons = document.querySelectorAll('.sig-btn');
    sigButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        sigButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.signalType = btn.dataset.signal;
        this.updateTelemetry();
      });
    });

    // Frequency Slider
    const freqInput = document.getElementById('scopeFreq');
    const freqDisplay = document.getElementById('scopeFreqVal');
    if (freqInput) {
      freqInput.addEventListener('input', (e) => {
        this.frequency = parseFloat(e.target.value);
        if (freqDisplay) freqDisplay.textContent = `${this.frequency.toFixed(1)} MHz`;
        this.updateTelemetry();
      });
    }

    // Volts/Div Slider
    const vDivInput = document.getElementById('scopeVDiv');
    const vDivDisplay = document.getElementById('scopeVDivVal');
    if (vDivInput) {
      vDivInput.addEventListener('input', (e) => {
        this.vDiv = parseFloat(e.target.value);
        if (vDivDisplay) vDivDisplay.textContent = `${this.vDiv.toFixed(1)} V/div`;
        this.updateTelemetry();
      });
    }

    // Noise/Jitter Slider
    const noiseInput = document.getElementById('scopeNoise');
    const noiseDisplay = document.getElementById('scopeNoiseVal');
    if (noiseInput) {
      noiseInput.addEventListener('input', (e) => {
        this.noise = parseFloat(e.target.value);
        if (noiseDisplay) noiseDisplay.textContent = `${(this.noise * 100).toFixed(0)}%`;
      });
    }

    // Freeze / Run Toggle
    const freezeBtn = document.getElementById('scopeFreezeBtn');
    if (freezeBtn) {
      freezeBtn.addEventListener('click', () => {
        this.isFrozen = !this.isFrozen;
        freezeBtn.classList.toggle('frozen', this.isFrozen);
        freezeBtn.textContent = this.isFrozen ? '▶ RUN' : '⏸ STOP';
        const statusElem = document.getElementById('scopeRunState');
        if (statusElem) {
          statusElem.textContent = this.isFrozen ? 'STOPPED' : 'TRIG’D [AUTO]';
          statusElem.style.color = this.isFrozen ? '#ef4444' : '#10b981';
        }
      });
    }

    // Single Shot / Auto Trigger Button
    const triggerBtn = document.getElementById('scopeTriggerBtn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        this.phase = 0;
        const triggerLed = document.querySelector('.scope-led');
        if (triggerLed) {
          triggerLed.style.backgroundColor = '#00f0ff';
          setTimeout(() => (triggerLed.style.backgroundColor = '#10b981'), 300);
        }
      });
    }
  }

  updateTelemetry() {
    let baseV = 3.3;
    if (this.signalType === 'can') baseV = 2.0;
    if (this.signalType === 'spi') baseV = 3.3;
    if (this.signalType === 'pwm') baseV = 5.0;

    this.vpp = `${baseV.toFixed(2)} V`;
    this.vrms = `${(baseV / Math.sqrt(2)).toFixed(2)} V`;
    this.freqText = `${this.frequency.toFixed(2)} MHz`;

    if (this.signalType === 'pwm') {
      this.duty = '42.5%';
      this.riseTime = '2.10 ns';
    } else if (this.signalType === 'spi') {
      this.duty = '50.0%';
      this.riseTime = '0.95 ns';
    } else if (this.signalType === 'can') {
      this.duty = '60.0%';
      this.riseTime = '3.40 ns';
    } else {
      this.duty = '50.0%';
      this.riseTime = '1.20 ns';
    }

    // Update onscreen UI labels if present
    const tVpp = document.getElementById('telemetryVpp');
    const tVrms = document.getElementById('telemetryVrms');
    const tFreq = document.getElementById('telemetryFreq');
    const tDuty = document.getElementById('telemetryDuty');

    if (tVpp) tVpp.textContent = `Vpp: ${this.vpp}`;
    if (tVrms) tVrms.textContent = `Vrms: ${this.vrms}`;
    if (tFreq) tFreq.textContent = `F: ${this.freqText}`;
    if (tDuty) tDuty.textContent = `Duty: ${this.duty}`;
  }

  drawGraticule() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Dark CRT background with slight green/cyan tint
    ctx.fillStyle = '#030d0a';
    ctx.fillRect(0, 0, w, h);

    // Major Divisions: 10 horizontal, 8 vertical
    const divX = w / 10;
    const divY = h / 8;

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 1;

    // Grid lines
    for (let x = 0; x <= w; x += divX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    for (let y = 0; y <= h; y += divY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center Crosshair Minor Ticks
    const centerX = w / 2;
    const centerY = h / 2;

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    for (let x = 0; x <= w; x += divX / 5) {
      ctx.beginPath();
      ctx.moveTo(x, centerY - 3);
      ctx.lineTo(x, centerY + 3);
      ctx.stroke();
    }

    for (let y = 0; y <= h; y += divY / 5) {
      ctx.beginPath();
      ctx.moveTo(centerX - 3, y);
      ctx.lineTo(centerX + 3, y);
      ctx.stroke();
    }
  }

  getSignalSample(xNorm, t) {
    const freqFactor = (this.frequency / 10) * 8;
    const arg = (xNorm * freqFactor * Math.PI * 2) - t;
    const noiseVal = (Math.random() - 0.5) * this.noise * 0.8;

    switch (this.signalType) {
      case 'sine':
        return Math.sin(arg) * 0.85 + noiseVal;

      case 'pwm': {
        const sinVal = Math.sin(arg);
        // Duty cycle ~ 42.5%
        let square = sinVal > 0.15 ? 0.85 : -0.85;
        // Exponential rise/fall smoothing to mimic real Gate Drive RC response
        const mod = ((arg % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        if (mod < 0.25) square = -0.85 + (mod / 0.25) * 1.7;
        return square + noiseVal;
      }

      case 'spi': {
        // High-speed SPI burst simulation
        const bytePhase = Math.floor(xNorm * 16);
        const bitPattern = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1];
        const bit = bitPattern[bytePhase % bitPattern.length];
        const clock = Math.sin(xNorm * 32 * Math.PI - t * 2) > 0 ? 0.35 : -0.35;
        const data = bit ? 0.65 : -0.65;
        return data * 0.7 + clock * 0.3 + noiseVal;
      }

      case 'can': {
        // Differential CAN-FD arbitration frame simulation
        const packetPhase = Math.floor((xNorm * 12 + t * 0.2) % 10);
        const isDominant = packetPhase === 2 || packetPhase === 3 || packetPhase === 6 || packetPhase === 7;
        const val = isDominant ? 0.8 : -0.8;
        return val + noiseVal;
      }

      default:
        return Math.sin(arg) * 0.85;
    }
  }

  drawWaveform() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const centerY = h / 2;
    const scaleY = (h / 8) * (1.8 / Math.max(0.5, this.vDiv));

    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00f0ff';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.2;

    ctx.beginPath();
    for (let x = 0; x < w; x += 1.5) {
      const xNorm = x / w;
      const sample = this.getSignalSample(xNorm, this.phase);
      const y = centerY - sample * scaleY;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Secondary subtle trace (Simulated Channel 2: Ground Reference or Differential Pair)
    if (this.signalType === 'can' || this.signalType === 'spi') {
      ctx.shadowColor = '#e5b869';
      ctx.strokeStyle = 'rgba(229, 184, 105, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += 1.5) {
        const xNorm = x / w;
        const sample = -this.getSignalSample(xNorm, this.phase) * 0.65;
        const y = centerY - sample * scaleY;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Reset shadow
    ctx.shadowBlur = 0;
  }

  animate() {
    this.drawGraticule();
    this.drawWaveform();

    if (!this.isFrozen) {
      this.phase += (this.frequency / 10) * 0.12;
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Oscilloscope('oscilloscopeCanvas');
});
