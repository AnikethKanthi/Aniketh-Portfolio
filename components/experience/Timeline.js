'use client';

import { useEffect, useRef, useState } from 'react';
import { experience } from '@/data/experience';

const career = [...experience].reverse();

export default function Timeline() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(career.length - 1);
  const active = career[activeIndex];

  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollArea = scrollRef.current;
        if (!scrollArea) return;
        const distance = Math.max(scrollArea.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(-scrollArea.getBoundingClientRect().top / distance, 0), 0.999);
        const step = Math.min(career.length - 1, Math.floor(progress * career.length));
        setActiveIndex(career.length - 1 - step);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="timeline-section" aria-labelledby="timeline-title">
      <div className="timeline-section__intro">
        <p className="eyebrow">05 / EXPERIENCE</p>
        <h2 id="timeline-title">A practice built across the stack.</h2>
      </div>
      <div className="career-scroll" ref={scrollRef}>
      <div className="career-system">
        <div className="career-system__caption">
          <span>SCROLL / 0{career.length - activeIndex} OF 0{career.length}</span>
          <span>{active.location} / {active.dates}</span>
        </div>
        <div className="career-rail" role="tablist" aria-label="Career history">
          {career.map((item, index) => (
            <button
              className={`career-node${index === activeIndex ? ' is-active' : ''}`}
              id={`career-tab-${index}`}
              key={item.company}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="career-panel"
              onClick={() => setActiveIndex(index)}
              data-cursor="VIEW"
              data-cursor-label="VIEW ROLE"
            >
              <span>{item.dates.match(/\d{4}/)?.[0]}</span>
              <i aria-hidden="true" />
              <strong>{item.shortName}</strong>
            </button>
          ))}
        </div>
        <article
          className="career-focus"
          id="career-panel"
          key={active.company}
          role="tabpanel"
          aria-labelledby={`career-tab-${activeIndex}`}
          aria-live="polite"
        >
          <span className="career-focus__watermark" aria-hidden="true">0{activeIndex + 1}</span>
          <div className="career-focus__identity">
            <p className="eyebrow">{active.company}</p>
            <h3>{active.title}</h3>
            <p>{active.dates} <span>/</span> {active.location}</p>
          </div>
          <div className="career-focus__detail">
            <div className="career-focus__highlights">
              {active.highlights.map((highlight, index) => (
                <p key={highlight}><span>0{index + 1}</span>{highlight}</p>
              ))}
            </div>
            <div className="career-focus__stack" aria-label="Technologies used">
              {active.stack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
        </article>
      </div>
      </div>
    </section>
  );
}
