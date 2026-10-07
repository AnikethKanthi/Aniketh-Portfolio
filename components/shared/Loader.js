'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(false));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`loader ${visible ? '' : 'loader--done'}`} aria-hidden={!visible}>
      <span>AGK</span>
      <span>INITIALIZING VISUAL SYSTEM</span>
    </div>
  );
}
