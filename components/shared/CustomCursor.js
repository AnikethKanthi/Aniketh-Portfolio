'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return undefined;

    document.documentElement.classList.add('custom-cursor-enabled');
    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let frame;

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    const updateState = (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      cursor.dataset.state = target?.dataset.cursor?.toLowerCase() || 'default';
      cursor.querySelector('span:last-child').textContent = target?.dataset.cursorLabel || '';
    };
    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', updateState, { passive: true });
    frame = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', updateState);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span /><span /></div>;
}
