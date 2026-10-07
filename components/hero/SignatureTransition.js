'use client';

import { useEffect, useRef } from 'react';
import { roleTheme } from '@/lib/roleThemes';

export default function SignatureTransition() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle('is-visible', entry.isIntersecting);
    }, { threshold: 0.28 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="thinking" className="signature-transition" aria-labelledby="thinking-title">
      <div className="signature-transition__sticky">
        <div className="signature-transition__intro">
          <p className="eyebrow">02 / HOW I THINK</p>
          <h2 id="thinking-title">Abstract signal becomes a system you can trust.</h2>
          <p>Reliable delivery is a visible chain: each stage has a job, a boundary, and a way to be observed.</p>
        </div>
        <div className="signature-transition__flow" aria-label="System flow stages">
          {roleTheme.nodeVocabulary.map((node, index) => (
            <div className="bridge-node" style={{ '--node-index': index }} key={node} tabIndex="0" data-cursor="INSPECT" data-cursor-label="NODE">
              <span>0{index + 1}</span>
              <strong>{node}</strong>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
