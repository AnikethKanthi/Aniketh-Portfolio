'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

export default function ParticleSystem({ density = 30 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const reduceMotion = prefersReducedMotion();
    const count = reduceMotion ? Math.round(density * 0.45) : density;
    const particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.00008 + Math.random() * 0.00016,
      radius: index % 6 === 0 ? 1.8 : 0.9,
      tone: index % 5 === 0 ? '#c8754a' : '#4f8f8a'
    }));
    let frame;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        if (!reduceMotion) particle.y = (particle.y + particle.speed) % 1;
        const x = particle.x * width + Math.sin(time * 0.0003 + index) * 8;
        const y = particle.y * height;
        context.beginPath();
        context.fillStyle = particle.tone;
        context.globalAlpha = 0.28 + (index % 4) * 0.1;
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      if (!reduceMotion && !document.hidden) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !reduceMotion) frame = window.requestAnimationFrame(draw);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="particle-system" aria-hidden="true" />;
}
