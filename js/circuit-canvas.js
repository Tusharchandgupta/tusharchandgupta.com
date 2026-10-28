/**
 * Interactive Background Circuit Canvas
 * Simulates microelectronic PCB traces, solder pads, and pulsing electrical signals.
 */

(function () {
  const canvas = document.getElementById('circuitCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initTraces();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // PCB Trace Path Generator
  const traces = [];
  const traceCount = 28;

  class Trace {
    constructor() {
      this.reset();
    }

    reset() {
      const isHorizontal = Math.random() > 0.5;
      if (isHorizontal) {
        this.x = Math.random() > 0.5 ? -20 : width + 20;
        this.y = Math.floor(Math.random() * (height / 40)) * 40 + 20;
      } else {
        this.x = Math.floor(Math.random() * (width / 40)) * 40 + 20;
        this.y = Math.random() > 0.5 ? -20 : height + 20;
      }

      this.points = [{ x: this.x, y: this.y }];
      this.currentX = this.x;
      this.currentY = this.y;
      this.segments = Math.floor(Math.random() * 4) + 3;
      this.color = Math.random() > 0.25 ? '#00f0ff' : '#e5b869'; // cyan or gold
      this.generateSegments();

      // Signal Pulse
      this.progress = 0;
      this.speed = Math.random() * 0.008 + 0.004;
      this.pulseLength = 0.15;
    }

    generateSegments() {
      let curX = this.currentX;
      let curY = this.currentY;
      let dir = Math.random() > 0.5 ? 'H' : 'V';

      for (let i = 0; i < this.segments; i++) {
        const step = (Math.floor(Math.random() * 5) + 3) * 40;
        if (dir === 'H') {
          curX += (Math.random() > 0.5 ? 1 : -1) * step;
          dir = 'V';
        } else {
          curY += (Math.random() > 0.5 ? 1 : -1) * step;
          dir = 'H';
        }
        this.points.push({ x: curX, y: curY });
      }
    }

    update() {
      this.progress += this.speed;
      if (this.progress > 1 + this.pulseLength) {
        this.reset();
      }
    }

    draw() {
      if (this.points.length < 2) return;

      // Draw faint base trace line
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Solder Via Pad at vertex points
      for (let i = 0; i < this.points.length; i++) {
        const p = this.points[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(229, 184, 105, 0.15)';
        ctx.fill();
      }

      // Draw active electric data pulse
      this.drawPulse();
    }

    drawPulse() {
      const totalLen = this.getTotalLength();
      if (totalLen === 0) return;

      const headDist = this.progress * totalLen;
      const tailDist = Math.max(0, headDist - this.pulseLength * totalLen);

      const pHead = this.getPointAtDistance(headDist);
      const pTail = this.getPointAtDistance(tailDist);

      if (pHead && pTail) {
        // Glowing pulse head
        const grad = ctx.createRadialGradient(pHead.x, pHead.y, 1, pHead.x, pHead.y, 6);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pHead.x, pHead.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(pHead.x, pHead.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    getTotalLength() {
      let len = 0;
      for (let i = 0; i < this.points.length - 1; i++) {
        const dx = this.points[i + 1].x - this.points[i].x;
        const dy = this.points[i + 1].y - this.points[i].y;
        len += Math.sqrt(dx * dx + dy * dy);
      }
      return len;
    }

    getPointAtDistance(d) {
      if (d <= 0) return this.points[0];
      let accum = 0;
      for (let i = 0; i < this.points.length - 1; i++) {
        const p1 = this.points[i];
        const p2 = this.points[i + 1];
        const segLen = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
        if (accum + segLen >= d) {
          const ratio = (d - accum) / segLen;
          return {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: p1.y + (p2.y - p1.y) * ratio,
          };
        }
        accum += segLen;
      }
      return this.points[this.points.length - 1];
    }
  }

  function initTraces() {
    traces.length = 0;
    for (let i = 0; i < traceCount; i++) {
      const t = new Trace();
      t.progress = Math.random(); // staggered startup
      traces.push(t);
    }
  }

  initTraces();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    traces.forEach((trace) => {
      trace.update();
      trace.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
