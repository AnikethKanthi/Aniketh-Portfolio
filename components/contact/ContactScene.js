'use client';

import { profile } from '@/data/profile';

const contactTitle = "Let's build systems that hold.";

export default function ContactScene() {
  const moveMagnifier = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--lens-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--lens-y', `${event.clientY - bounds.top}px`);
    event.currentTarget.style.setProperty('--title-width', `${bounds.width}px`);
  };

  return (
    <section id="contact" className="contact-scene" aria-labelledby="contact-title">
      <div className="contact-scene__copy">
        <p className="eyebrow">07 / CONTACT</p>
        <div className="contact-title-wrap" onPointerMove={moveMagnifier} data-cursor="INSPECT" data-cursor-label="MAGNIFY">
          <h2 id="contact-title">{contactTitle}</h2>
          <span className="contact-magnifier" aria-hidden="true">
            <span className="contact-magnifier__glass">
              <span className="contact-magnifier__text">{contactTitle}</span>
            </span>
          </span>
        </div>
        <div className="contact-scene__primary">
          <a className="contact-scene__email" href={`mailto:${profile.contact.email}`} data-cursor="OPEN" data-cursor-label="MAIL">{profile.contact.email}</a>
          <a href={`tel:${profile.contact.phone}`} data-cursor="OPEN" data-cursor-label="CALL">{profile.contact.phoneDisplay}</a>
          <span>{profile.location}</span>
        </div>
      </div>
      <div className="contact-scene__links">
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN" data-cursor-label="LINK">LinkedIn</a>
        <a href={profile.links.github} target="_blank" rel="noreferrer" data-cursor="OPEN" data-cursor-label="LINK">GitHub</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
    </section>
  );
}
