import { profile } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-section__heading">
        <p className="eyebrow">06 / ABOUT</p>
        <h2 id="about-title">Systems are human when they are understandable.</h2>
      </div>
      <div className="about-section__content">
        {profile.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="principles-list">
          {profile.principles.map((principle, index) => (
            <p key={principle}><span>0{index + 1}</span>{principle}</p>
          ))}
        </div>
        <div className="about-credentials">
          <div className="education-note">
            <small>EDUCATION</small>
            {profile.education.map((item) => (
              <p key={item.school}>
                <strong>{item.degree}</strong><br />
                {item.school} · {item.location}<br />
                <span>{item.dates}</span>
              </p>
            ))}
          </div>
          <div className="education-note">
            <small>CERTIFICATIONS</small>
            {profile.certifications.map((certification) => <p key={certification}>{certification}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
