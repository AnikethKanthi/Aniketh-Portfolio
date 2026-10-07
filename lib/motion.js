export const motion = {
  micro: 180,
  component: 460,
  section: 840,
  cinematic: 1200,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
};

export const prefersReducedMotion = () => (
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);
