/* ==========================================================================
   CREATIVE PARTICLES & NETWORK CANVAS (HERO INTERACTIVE BACKGROUND)
   이예원 (LEEyewon) - Creative Developer & Design Engineer Portfolio
   ========================================================================== */

class CreativeCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationFrameId = null;
    this.isEnabled = true;

    // Config based on screen width
    this.particleCount = window.innerWidth < 768 ? 35 : 70;
    this.maxDistance = window.innerWidth < 768 ? 90 : 130;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    const heroSection = document.getElementById('hero');
    const width = heroSection ? heroSection.offsetWidth : window.innerWidth;
    const height = heroSection ? heroSection.offsetHeight : window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.scale(dpr, dpr);
    this.logicalWidth = width;
    this.logicalHeight = height;
  }

  createParticles() {
    this.particles = [];
    // Colors matching our design tokens (Indigo, Cyan, Pink)
    const colorThemes = [
      { r: 99, g: 102, b: 241 },   // Indigo
      { r: 6, g: 182, b: 212 },    // Cyan
      { r: 236, g: 72, b: 153 }    // Pink
    ];

    for (let i = 0; i < this.particleCount; i++) {
      const color = colorThemes[Math.floor(Math.random() * colorThemes.length)];
      this.particles.push({
        x: Math.random() * this.logicalWidth,
        y: Math.random() * this.logicalHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        color: color,
        originVx: (Math.random() - 0.5) * 0.8,
        originVy: (Math.random() - 0.5) * 0.8
      });
    }
  }

  bindEvents() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    // Track mouse coordinates relative to hero section
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Ripple click explosion
    heroSection.addEventListener('click', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.particles.forEach(p => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 12;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    });

    // Toggle button listener if present
    const toggleBtn = document.getElementById('canvas-fx-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggle();
      });
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    const toggleBtn = document.getElementById('canvas-fx-toggle');
    if (toggleBtn) {
      toggleBtn.classList.toggle('active', this.isEnabled);
      toggleBtn.querySelector('.toggle-label').textContent = this.isEnabled ? 'Canvas FX: ON' : 'Canvas FX: OFF';
    }

    if (this.isEnabled) {
      this.start();
    } else {
      this.stop();
      this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
    }
  }

  start() {
    if (!this.animationFrameId && this.isEnabled) {
      const loop = () => {
        this.render();
        this.animationFrameId = requestAnimationFrame(loop);
      };
      loop();
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);

    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    const baseLineAlpha = isLightMode ? 0.12 : 0.18;
    const particleAlpha = isLightMode ? 0.65 : 0.85;

    // 1. Update & Draw Particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Natural movement
      p.x += p.vx;
      p.y += p.vy;

      // Friction recovery to base velocity
      p.vx = p.vx * 0.98 + p.originVx * 0.02;
      p.vy = p.vy * 0.98 + p.originVy * 0.02;

      // Bounce off walls
      if (p.x < 0 || p.x > this.logicalWidth) p.vx *= -1;
      if (p.y < 0 || p.y > this.logicalHeight) p.vy *= -1;

      // Mouse attraction / interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius && dist > 0) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${particleAlpha})`;
      this.ctx.fill();

      // 2. Draw connecting network lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDistance) {
          const alpha = (1 - dist / this.maxDistance) * baseLineAlpha;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
}

// Auto instantiate on load
document.addEventListener('DOMContentLoaded', () => {
  new CreativeCanvas('hero-canvas');
});
