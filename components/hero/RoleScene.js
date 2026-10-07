'use client';

import { useEffect, useRef } from 'react';

const nodes = [
  { key: 'REQUEST', radius: 60, angle: 28, tone: 'system', detail: 'ENTRY POINT', duration: 9, delay: -2 },
  { key: 'SERVICE', radius: 88, angle: 112, tone: 'accent', detail: 'COMPUTE LAYER', duration: 13, delay: -8 },
  { key: 'CACHE', radius: 116, angle: 188, tone: 'system', detail: 'FAST PATH', duration: 17, delay: -5 },
  { key: 'DATA', radius: 146, angle: 264, tone: 'system', detail: 'PERSISTENCE', duration: 22, delay: -14 },
  { key: 'PIPELINE', radius: 178, angle: 332, tone: 'accent', detail: 'DELIVERY', duration: 28, delay: -20 }
];

const particles = Array.from({ length: 46 }, (_, index) => ({
  x: 18 + ((index * 83) % 564),
  y: 18 + ((index * 47) % 404),
  radius: index % 9 === 0 ? 1.7 : 0.8 + (index % 3) * 0.25,
  delay: `${-(index % 11) * 0.38}s`
}));

export default function RoleScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const nodeElements = [...scene.querySelectorAll('.role-scene__node')];
    const activateNode = (node) => {
      const key = node.dataset.node;
      scene.dataset.active = key;
      nodeElements.forEach((item) => item.classList.toggle('is-active', item === node));
    };

    const clearNode = () => {
      delete scene.dataset.active;
      nodeElements.forEach((node) => node.classList.remove('is-active'));
    };

    const move = (event) => {
      const bounds = scene.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width;
      const normalizedY = (event.clientY - bounds.top) / bounds.height;
      const depth = window.matchMedia('(min-width: 761px)').matches ? 10 : 0;
      const x = (normalizedX - 0.5) * depth;
      const y = (normalizedY - 0.5) * depth;
      scene.style.setProperty('--scene-x', `${x.toFixed(2)}px`);
      scene.style.setProperty('--scene-y', `${y.toFixed(2)}px`);
      scene.style.setProperty('--scene-rx', `${((normalizedY - 0.5) * -3).toFixed(2)}deg`);
      scene.style.setProperty('--scene-ry', `${((normalizedX - 0.5) * 4).toFixed(2)}deg`);
      scene.style.setProperty('--scene-glow-x', `${(normalizedX * 100).toFixed(1)}%`);
      scene.style.setProperty('--scene-glow-y', `${(normalizedY * 100).toFixed(1)}%`);
    };
    const reset = () => {
      scene.style.setProperty('--scene-x', '0px');
      scene.style.setProperty('--scene-y', '0px');
      scene.style.setProperty('--scene-rx', '0deg');
      scene.style.setProperty('--scene-ry', '0deg');
      clearNode();
    };

    nodeElements.forEach((node) => {
      const activate = () => activateNode(node);
      node.addEventListener('pointerenter', activate);
      node.addEventListener('focus', activate);
      node.addEventListener('pointerleave', clearNode);
      node.addEventListener('blur', clearNode);
      node._activateRoleNode = activate;
    });
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerleave', reset);
    return () => {
      nodeElements.forEach((node) => {
        node.removeEventListener('pointerenter', node._activateRoleNode);
        node.removeEventListener('focus', node._activateRoleNode);
        node.removeEventListener('pointerleave', clearNode);
        node.removeEventListener('blur', clearNode);
        delete node._activateRoleNode;
      });
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <div ref={sceneRef} className="role-scene" data-cursor="INSPECT" data-cursor-label="INSPECT">
      <svg viewBox="50 0 500 440" role="img" aria-labelledby="role-scene-title role-scene-desc">
        <title id="role-scene-title">Solar control plane</title>
        <desc id="role-scene-desc">Request, service, cache, data, and pipeline nodes orbit an observable system core.</desc>
        <defs>
          <radialGradient id="solar-core" cx="50%" cy="42%" r="58%">
            <stop offset="0" stopColor="#eef1e9" />
            <stop offset="0.2" stopColor="#c8754a" />
            <stop offset="0.58" stopColor="#4f8f8a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#4f8f8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="control-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4f8f8a" stopOpacity="0" />
            <stop offset="1" stopColor="#4f8f8a" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <g className="solar-particles" aria-hidden="true">
          {particles.map((particle, index) => (
            <circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r={particle.radius}
              style={{ '--particle-delay': particle.delay }}
            />
          ))}
        </g>
        <g className="solar-orbits" aria-hidden="true">
          {nodes.map((node) => <circle key={node.key} cx="300" cy="220" r={node.radius} />)}
        </g>
        <g className="solar-control-plane" aria-hidden="true">
          <path d="M300 220 L480 220" />
          <path className="solar-control-plane__wake" d="M300 220 A180 180 0 0 1 456 130" />
          <circle cx="480" cy="220" r="4" />
        </g>
        {nodes.map((node) => (
          <g
            className="solar-planet-orbit"
            key={node.key}
            style={{
              '--orbit-duration': `${node.duration}s`,
              '--orbit-delay': `${node.delay}s`,
              '--orbit-angle': `${node.angle}deg`
            }}
          >
            <g transform={`translate(${300 + node.radius} 220)`}>
              <g
                className={`role-scene__node role-scene__node--${node.tone}`}
                data-node={node.key}
                data-detail={node.detail}
                role="button"
                tabIndex="0"
                aria-label={`${node.key}: ${node.detail}`}
                style={{ '--orbit-duration': `${node.duration}s`, '--orbit-delay': `${node.delay}s` }}
              >
                <circle className="solar-planet__glow" r="18" />
                <circle className="solar-planet__body" r={node.tone === 'accent' ? 7 : 5.5} />
                <circle className="role-scene__halo" r="13" />
                <circle className="role-scene__hit" r="24" />
                <text x="14" y="4">{node.key}</text>
              </g>
            </g>
          </g>
        ))}
        <g
          className="role-scene__node role-scene__node--text solar-core"
          data-node="SIGNAL"
          data-detail="OBSERVABILITY CORE"
          transform="translate(300 220)"
          role="button"
          tabIndex="0"
          aria-label="SIGNAL: OBSERVABILITY CORE"
        >
          <circle className="solar-core__aura" r="58" />
          <circle className="solar-core__ring" r="35" />
          <circle className="solar-core__surface" r="22" />
          <circle className="role-scene__hit" r="48" />
          <text textAnchor="middle" y="4">CORE</text>
        </g>
        <g className="solar-packets" aria-hidden="true">
          {[0, 1, 2, 3].map((index) => (
            <g className={`solar-packet solar-packet--${index + 1}`} key={index}>
              <circle cx="300" cy={220 - (72 + index * 26)} r="2.5" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
