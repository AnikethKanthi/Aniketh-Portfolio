import { profile } from '@/data/profile';

export default function Navigation() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={`${profile.name} home`}>
        <span>AGK</span>
        <small>SYSTEMS / 01</small>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">WORK</a>
        <a href="#thinking">THINKING</a>
        <a href="#about">ABOUT</a>
        <a href="#contact">CONTACT</a>
      </nav>
    </header>
  );
}
