export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const join = (...values) => values.filter(Boolean).join(' ');
