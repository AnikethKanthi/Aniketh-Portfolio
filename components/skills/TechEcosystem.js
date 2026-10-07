'use client';

import { useMemo, useState } from 'react';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';

export default function TechEcosystem() {
  const [selectedGroup, setSelectedGroup] = useState(skills[1].group);
  const group = skills.find((item) => item.group === selectedGroup) || skills[1];
  const relatedProjects = useMemo(() => projects.filter((project) => project.technologies.some((technology) => group.items.includes(technology))), [group]);

  return (
    <div className="tech-ecosystem">
      <div className="tech-ecosystem__groups" role="list" aria-label="Skill groups">
        {skills.map((item, index) => (
          <button
            className={`ecosystem-group ${item.group === selectedGroup ? 'is-selected' : ''}`}
            type="button"
            role="listitem"
            key={item.group}
            onClick={() => setSelectedGroup(item.group)}
            data-cursor="INSPECT"
            data-cursor-label="GROUP"
          >
            <span>0{index + 1}</span>
            <strong>{item.group}</strong>
          </button>
        ))}
      </div>
      <div className="tech-ecosystem__detail" aria-live="polite">
        <p className="eyebrow">ECOSYSTEM / {group.group}</p>
        <div className="ecosystem-items">
          {group.items.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="ecosystem-related">
          <small>VISIBLE IN SELECTED WORK</small>
          <p>{relatedProjects.length ? relatedProjects.map((project) => project.title).join(' · ') : 'Career delivery systems and reliability work'}</p>
        </div>
      </div>
    </div>
  );
}
