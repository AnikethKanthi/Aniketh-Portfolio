'use client';

import { useEffect, useRef } from 'react';

const COLORS = {
  teal: '79, 143, 138',
  orange: '200, 117, 74',
  ivory: '238, 241, 233',
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function BlueprintBackground({ density = 56 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let routes = [];
    let frame = 0;
    let lastTime = performance.now();
    let hidden = document.hidden;

    const makeParticle = (index, count) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.075,
      vy: (Math.random() - 0.5) * 0.075,
      radius: Math.random() * 1.15 + 0.45,
      alpha: Math.random() * 0.25 + 0.1,
      phase: (index / Math.max(count, 1)) * Math.PI * 2,
      color: index % 9 === 0 ? COLORS.orange : COLORS.teal,
    });

    const makeRoutes = () => {
      const compact = width < 760;
      return Array.from({ length: compact ? 2 : 3 }, (_, index) => {
        const forward = index % 2 === 0;
        const y = height * (0.22 + index * (compact ? 0.38 : 0.27));
        return {
          startX: forward ? -width * 0.08 : width * 1.08,
          startY: y,
          controlX: width * (0.34 + index * 0.16),
          controlY: y + (index % 2 ? -1 : 1) * height * 0.12,
          endX: forward ? width * 1.08 : -width * 0.08,
          endY: y + (index - 1) * height * 0.09,
          speed: 0.018 + index * 0.005,
          offset: index * 0.31,
          color: index === 1 ? COLORS.orange : COLORS.teal,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const areaScale = clamp((width * height) / 1200000, 0.42, 1.35);
      const count = width < 760 ? Math.round(density * 0.46) : Math.round(density * areaScale);
      particles = Array.from({ length: count }, (_, index) => makeParticle(index, count));
      routes = makeRoutes();
    };

    const routePoint = (route, progress) => {
      const inverse = 1 - progress;
      return {
        x: inverse ** 2 * route.startX + 2 * inverse * progress * route.controlX + progress ** 2 * route.endX,
        y: inverse ** 2 * route.startY + 2 * inverse * progress * route.controlY + progress ** 2 * route.endY,
      };
    };

    const drawGrid = () => {
      const spacing = width < 760 ? 72 : 96;
      const shiftX = pointer.active ? (pointer.x / width - 0.5) * 8 : 0;
      const shiftY = pointer.active ? (pointer.y / height - 0.5) * 8 : 0;

      context.beginPath();
      context.strokeStyle = `rgba(${COLORS.teal}, 0.072)`;
      context.lineWidth = 1;
      for (let x = -spacing + shiftX; x < width + spacing; x += spacing) {
        context.moveTo(Math.round(x) + 0.5, 0);
        context.lineTo(Math.round(x) + 0.5, height);
      }
      for (let y = -spacing + shiftY; y < height + spacing; y += spacing) {
        context.moveTo(0, Math.round(y) + 0.5);
        context.lineTo(width, Math.round(y) + 0.5);
      }
      context.stroke();

      context.beginPath();
      context.strokeStyle = `rgba(${COLORS.ivory}, 0.04)`;
      context.moveTo(width * 0.5, 0);
      context.lineTo(width * 0.5, height);
      context.moveTo(0, height * 0.5);
      context.lineTo(width, height * 0.5);
      context.stroke();
    };

    const drawRoutes = (time) => {
      routes.forEach((route, index) => {
        context.beginPath();
        context.moveTo(route.startX, route.startY);
        context.quadraticCurveTo(route.controlX, route.controlY, route.endX, route.endY);
        context.setLineDash([3, 14]);
        context.lineDashOffset = -time * 0.012 * (index % 2 ? -1 : 1);
        context.strokeStyle = `rgba(${route.color}, 0.21)`;
        context.lineWidth = 1;
        context.stroke();
        context.setLineDash([]);

        const progress = reducedMotion.matches
          ? (route.offset + 0.25) % 1
          : (route.offset + time * route.speed * 0.001) % 1;
        const point = routePoint(route, progress);
        const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 14);
        glow.addColorStop(0, `rgba(${route.color}, 0.5)`);
        glow.addColorStop(1, `rgba(${route.color}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(point.x, point.y, 14, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = `rgba(${route.color}, 0.82)`;
        context.beginPath();
        context.arc(point.x, point.y, 2.4, 0, Math.PI * 2);
        context.fill();
      });
    };

    const drawPointerField = () => {
      if (!pointer.active || !finePointer.matches) return;
      const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 190);
      glow.addColorStop(0, `rgba(${COLORS.teal}, 0.105)`);
      glow.addColorStop(0.45, `rgba(${COLORS.orange}, 0.035)`);
      glow.addColorStop(1, `rgba(${COLORS.teal}, 0)`);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(pointer.x, pointer.y, 190, 0, Math.PI * 2);
      context.fill();

    };

    const drawParticles = (delta, time) => {
      const connectionDistance = width < 760 ? 90 : 126;
      const pointerRadius = 180;

      particles.forEach((particle) => {
        if (!reducedMotion.matches) {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;

          if (finePointer.matches && pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy) || 1;
            if (distance < pointerRadius) {
              const force = (1 - distance / pointerRadius) * 0.026 * delta;
              particle.x += (dx / distance) * force;
              particle.y += (dy / distance) * force;
            }
          }

          if (particle.x < -12) particle.x = width + 12;
          if (particle.x > width + 12) particle.x = -12;
          if (particle.y < -12) particle.y = height + 12;
          if (particle.y > height + 12) particle.y = -12;
        }

        const pulse = 0.72 + Math.sin(time * 0.0012 + particle.phase) * 0.28;
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha * pulse})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const a = particles[first];
          const b = particles[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance >= connectionDistance) continue;
          context.strokeStyle = `rgba(${COLORS.teal}, ${(1 - distance / connectionDistance) * 0.09})`;
          context.lineWidth = 0.75;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    };

    const render = (time = performance.now()) => {
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;
      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRoutes(time);
      drawParticles(delta, time);
      drawPointerField();
      if (!reducedMotion.matches && !hidden) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onResize = () => {
      resize();
      if (reducedMotion.matches) render();
    };
    const onVisibilityChange = () => {
      hidden = document.hidden;
      window.cancelAnimationFrame(frame);
      if (!hidden && !reducedMotion.matches) {
        lastTime = performance.now();
        frame = window.requestAnimationFrame(render);
      }
    };
    const onMotionChange = () => {
      window.cancelAnimationFrame(frame);
      lastTime = performance.now();
      render();
    };

    resize();
    render();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, [density]);

  return (
    <>
      <style>{`
        main {
          position: relative;
          isolation: isolate;
        }

        .particle-system--sitewide {
          position: fixed !important;
          inset: 0 !important;
          z-index: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          opacity: 0.94 !important;
          pointer-events: none !important;
        }

        main > section {
          position: relative;
          z-index: 1;
          background-color: rgba(13, 18, 18, 0.66);
        }

        .hero__grid {
          opacity: 0.09 !important;
        }

        @media (max-width: 760px) {
          main > section {
            background-color: rgba(13, 18, 18, 0.76);
          }

          .particle-system--sitewide {
            opacity: 0.82 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-system--sitewide {
            opacity: 0.7 !important;
          }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="particle-system particle-system--sitewide"
        aria-hidden="true"
      />
    </>
  );
}
