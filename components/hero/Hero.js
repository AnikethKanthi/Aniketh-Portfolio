'use client';

import { useEffect, useRef } from 'react';
import KineticName from '@/components/hero/KineticName';
import RoleScene from '@/components/hero/RoleScene';
import ParticleSystem from '@/components/shared/BlueprintBackground';
import { profile } from '@/data/profile';

const heroMetrics = [
  ['EXPERIENCE', '6+ YEARS'],
  ['REDIRECT SCALE', '1M+ / MONTH'],
  ['P95 LATENCY', '< 40 MS'],
  ['CLOUD PLATFORMS', 'AWS / AZURE / GCP']
];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const update = () => {
      const bounds = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-bounds.top / bounds.height, 0), 1);
      hero.style.setProperty('--hero-progress', progress.toFixed(3));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home" aria-labelledby="hero-title">
      <ParticleSystem density={56} />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__copy">
        <p className="eyebrow">{profile.roles.join(' / ').toUpperCase()}</p>
        <h1 id="hero-title"><KineticName name={profile.name} /></h1>
        <p className="hero__positioning">{profile.positioning}</p>
        <a className="hero__prompt" href="#thinking" data-cursor="VIEW" data-cursor-label="TRACE">
          <span>TRACE THE SYSTEM</span><i aria-hidden="true" />
        </a>
      </div>
      <RoleScene />
      <dl className="hero__metrics" aria-label="Selected engineering metrics">
        {heroMetrics.map(([label, value], index) => (
          <div className="hero__metric" key={label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="hero__meta">
        <span>{profile.location}</span>
        <span>SCROLL / 01—05</span>
      </div>
    </section>
  );
}
