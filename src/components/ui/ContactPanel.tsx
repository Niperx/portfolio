import { X, Github, Mail, ExternalLink } from 'lucide-react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';

export function ContactPanel() {
  const activePanel = usePortfolioStore((s) => s.activePanel);
  const setActivePanel = usePortfolioStore((s) => s.setActivePanel);

  if (activePanel !== 'contact') return null;

  const links = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Niperx',
      desc: '@Niperx — 20+ репозиториев',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:contact@niperx.dev',
      desc: 'contact@niperx.dev',
    },
    {
      icon: ExternalLink,
      label: 'ARCdle',
      href: 'https://arcdle.vercel.app',
      desc: 'Live проект',
    },
  ];

  return (
    <div className="fixed inset-4 z-50 flex items-center justify-center md:inset-auto md:left-6 md:top-24 md:w-96">
      <div className="w-full rounded-2xl border border-mono-border bg-mono-surface/95 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-mono-paper">Contact</h2>
          <button
            onClick={() => setActivePanel('none')}
            className="text-slate-400 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {links.map(({ icon: Icon, label, href, desc }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-mono-border p-3 transition hover:border-accent-teal/40 hover:bg-white/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                <Icon size={18} className="text-mono-light" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
