import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
}

/** Простой SEO-компонент без react-helmet (совместим с React 19) */
export function SEO({
  title = 'Niperx | 3D Portfolio',
  description = 'Daniel (Niperx) — Immersive 3D Portfolio. Telegram bots, web apps, games and tools.',
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);

  return null;
}
