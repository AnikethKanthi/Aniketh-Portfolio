'use client';

import { useState } from 'react';
import NodePanel from '@/components/architecture/NodePanel';
import SystemFlow from '@/components/architecture/SystemFlow';
import TopologyGraph, { architectureNodes } from '@/components/architecture/TopologyGraph';

export default function ArchitectureSection() {
  const [selected, setSelected] = useState('service');
  const node = architectureNodes.find((item) => item.id === selected) || architectureNodes[1];

  return (
    <section id="architecture" className="architecture-section" aria-labelledby="architecture-title">
      <div className="architecture-section__intro">
        <p className="eyebrow">03 / BEHIND THE BUILD</p>
        <h2 id="architecture-title">Boundaries make complex work legible.</h2>
        <p>This is a conceptual architecture derived from the systems and tools in the supplied resume—not a claim about one production deployment.</p>
      </div>
      <div className="architecture-section__interactive">
        <TopologyGraph selected={selected} onSelect={setSelected} />
        <NodePanel node={node} />
      </div>
      <SystemFlow />
    </section>
  );
}
