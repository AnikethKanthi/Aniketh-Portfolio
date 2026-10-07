import Navigation from '@/components/shared/Navigation';

export const metadata = { title: 'Privacy — Aniketh Goud Kanthi' };

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Navigation />
      <article>
        <p className="eyebrow">PRIVACY</p>
        <h1>Privacy, plainly stated.</h1>
        <p>This portfolio does not intentionally collect personal information, use analytics, or place tracking cookies.</p>
        <p>If you contact Aniketh by email, your message and email address are handled by your email provider and the recipient&apos;s inbox.</p>
        <a href="/">Return home</a>
      </article>
    </main>
  );
}
