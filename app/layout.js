import localFont from 'next/font/local';
import './globals.css';

const clash = localFont({
  src: '../public/fonts/clash-display-600.woff2',
  variable: '--font-clash',
  display: 'swap',
  weight: '600'
});

const satoshi = localFont({
  src: [
    { path: '../public/fonts/satoshi-400.woff2', weight: '400' },
    { path: '../public/fonts/satoshi-500.woff2', weight: '500' },
    { path: '../public/fonts/satoshi-700.woff2', weight: '700' }
  ],
  variable: '--font-satoshi',
  display: 'swap',
  weight: '400 700'
});

export const metadata = {
  title: 'Aniketh Goud Kanthi — Software Developer',
  description: 'The portfolio of Aniketh Goud Kanthi, a software developer in Arbutus, MD building full-stack applications, distributed services, and cloud systems.',
  metadataBase: new URL('https://anikethkanthi.dev'),
  openGraph: {
    title: 'Aniketh Goud Kanthi — Software Developer',
    description: 'Full-stack applications, distributed services, cloud systems, and reliable delivery.',
    type: 'website'
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${clash.variable} ${satoshi.variable}`}>
      <body>{children}</body>
    </html>
  );
}
