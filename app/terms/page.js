import Navigation from '@/components/shared/Navigation';

export const metadata = { title: 'Terms — Aniketh Goud Kanthi' };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Navigation />
      <article>
        <p className="eyebrow">TERMS</p>
        <h1>A simple agreement.</h1>
        <p>The writing, code, and visual material on this portfolio are presented for personal and professional context.</p>
        <p>Do not copy or reuse the material without permission from Aniketh Goud Kanthi.</p>
        <a href="/">Return home</a>
      </article>
    </main>
  );
}
