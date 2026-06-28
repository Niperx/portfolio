import { useState } from 'react';
import {
  Github, ExternalLink, Sparkles, ChevronLeft, ChevronRight, Filter,
} from 'lucide-react';
import { projects, categories } from '../../data/projects';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { getAccentColor } from '../../utils/colors';
import type { Project, ProjectCategory } from '../../types/project';

/** 2D fallback — ч/б карусель проектов */
export function MobileGallery() {
  const [index, setIndex] = useState(0);
  const activeCategory = usePortfolioStore((s) => s.activeCategory);
  const setActiveCategory = usePortfolioStore((s) => s.setActiveCategory);
  const setSelectedProject = usePortfolioStore((s) => s.setSelectedProject);
  const setViewMode = usePortfolioStore((s) => s.setViewMode);

  const filtered = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory,
  );
  const project = filtered[index] ?? filtered[0];

  if (!project) return null;

  const accent = getAccentColor(project.accentColor);
  const prev = () => setIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setIndex((i) => (i + 1) % filtered.length);

  const objectIcon: Record<string, string> = {
    phone: '▣', crystal: '◆', panel: '▭', shield: '⬡', server: '▤', neuron: '◎',
  };

  return (
    <div className="paper-texture flex h-full flex-col bg-mono-bg">
      <header className="flex items-center justify-between p-4 pt-6">
        <div>
          <h1 className="text-xl font-bold tracking-[0.2em] text-mono-paper">NIPERX</h1>
          <p className="text-[10px] tracking-[0.25em] text-mono-gray">SKETCH PORTFOLIO</p>
        </div>
        <button
          onClick={() => setViewMode('3d')}
          className="flex items-center gap-1.5 rounded-full border border-mono-border bg-mono-surface px-3 py-1.5 text-xs text-mono-light transition hover:border-accent-teal/50 hover:text-accent-teal"
        >
          <Sparkles size={14} />
          Enter 3D Isometric Lab
        </button>
      </header>

      <div className="flex gap-1 overflow-x-auto px-4 pb-3">
        <Filter size={14} className="mt-1 shrink-0 text-mono-gray" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat as ProjectCategory | 'All'); setIndex(0); }}
            className={`shrink-0 rounded-full px-3 py-1 text-xs ${
              activeCategory === cat ? 'bg-white/10 text-mono-paper' : 'text-mono-gray'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 pb-4">
        <ProjectCard project={project} accent={accent} icon={objectIcon[project.objectType] ?? '◈'} onOpen={() => setSelectedProject(project)} />

        {filtered.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <button onClick={prev} className="rounded-full border border-mono-border p-2 text-mono-gray">
              <ChevronLeft size={20} />
            </button>
            <span className="text-xs text-mono-gray">{index + 1} / {filtered.length}</span>
            <button onClick={next} className="rounded-full border border-mono-border p-2 text-mono-gray">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project, accent, icon, onOpen,
}: { project: Project; accent: string; icon: string; onOpen: () => void }) {
  return (
    <div className="rounded-2xl border border-mono-border bg-mono-surface p-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl text-mono-light">{icon}</span>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-mono-gray">{project.category}</p>
          <h2 className="text-lg font-semibold text-mono-paper">{project.title}</h2>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-mono-gray">{project.shortDesc}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((t) => (
          <span key={t} className="rounded border border-mono-border px-2 py-0.5 font-mono text-[10px] text-mono-gray">
            {t}
          </span>
        ))}
      </div>

      {project.protocols && (
        <p className="mb-3 text-xs text-mono-light">
          {project.protocols.join(' · ')}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={onOpen}
          className="flex-1 rounded-xl border py-2.5 text-sm text-mono-paper transition hover:bg-white/5"
          style={{ borderColor: `${accent}66` }}
        >
          View Project
        </button>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl border border-mono-border px-3 text-mono-gray">
            <Github size={18} />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl border border-mono-border px-3 text-mono-gray">
            <ExternalLink size={18} />
          </a>
        )}
      </div>
    </div>
  );
}
