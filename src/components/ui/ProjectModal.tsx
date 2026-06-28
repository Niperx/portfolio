import { useEffect, useState } from 'react';
import {
  X,
  Github,
  ExternalLink,
  Play,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Shield,
  Layers,
} from 'lucide-react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { MiniTelegramBot } from '../bot/MiniTelegramBot';

const STATUS_COLORS = {
  Live: 'text-accent-teal border-accent-teal/40 bg-accent-teal/10',
  Private: 'text-mono-light border-mono-border bg-white/5',
  Local: 'text-mono-gray border-mono-border bg-white/5',
  Demo: 'text-accent-lemon border-accent-lemon/40 bg-accent-lemon/10',
};

export function ProjectModal() {
  const project = usePortfolioStore((s) => s.selectedProject);
  const setSelectedProject = usePortfolioStore((s) => s.setSelectedProject);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [project?.id]);

  if (!project) return null;

  const isBot =
    project.category === 'Telegram Bot' || project.category === 'Discord Bot';
  const images = project.images ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center md:p-6">
      <div
        className="custom-scrollbar flex max-h-[92vh] w-full flex-col overflow-y-auto rounded-t-2xl border border-mono-border bg-mono-surface/98 md:max-w-3xl md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-mono-border bg-mono-surface/95 p-5 backdrop-blur">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs text-slate-500">{project.category}</span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase ${STATUS_COLORS[project.status]}`}
              >
                {project.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white md:text-2xl">{project.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{project.shortDesc}</p>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {images.length > 0 && (
            <div className="relative overflow-hidden rounded-xl border border-lab-border">
              <img
                src={images[imageIndex]}
                alt={`${project.title} preview`}
                className="h-48 w-full object-cover md:h-64"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
          )}

          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-mono-light">
              Описание
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">{project.fullDesc}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-mono-gray">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-mono-border bg-mono-bg px-3 py-1 text-xs text-mono-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.protocols && project.protocols.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-teal">
                <Shield size={14} /> Protocols
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.protocols.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-accent-teal/30 bg-accent-teal/10 px-3 py-1 text-xs text-accent-teal"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.stack && project.stack.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                <Layers size={14} /> Stack / Infrastructure
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-lab-border bg-lab-bg px-3 py-1 font-mono text-xs text-slate-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.videoDemo && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-teal">
                <Play size={14} /> Demo
              </h3>
              <a
                href={project.videoDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-bio-teal hover:underline"
              >
                Смотреть видео <ExternalLink size={14} />
              </a>
            </div>
          )}

          {isBot && project.commands && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-teal">
                <Terminal size={14} /> Команды бота
              </h3>
              <div className="mb-3 grid gap-1 sm:grid-cols-2">
                {project.commands.map((c) => (
                  <div
                    key={c.cmd}
                    className="rounded-lg border border-mono-border bg-mono-bg px-3 py-2 font-mono text-xs"
                  >
                    <span className="text-accent-teal">{c.cmd}</span>
                  </div>
                ))}
              </div>
              <div className="h-80 overflow-hidden rounded-xl border border-mono-border">
                <MiniTelegramBot botName={project.title} commands={project.commands} />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-mono-border bg-mono-bg px-4 py-2.5 text-sm text-mono-light transition hover:border-accent-teal/50 hover:text-accent-teal"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-mono-border bg-white/5 px-4 py-2.5 text-sm font-medium text-mono-paper"
              >
                <ExternalLink size={16} /> View Live
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10" onClick={() => setSelectedProject(null)} />
    </div>
  );
}
