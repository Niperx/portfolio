import {
  Menu, X, User, Mail, Github, RotateCcw, Filter, Compass, Orbit, LayoutGrid,
} from 'lucide-react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { categories } from '../../data/projects';
import type { ProjectCategory } from '../../types/project';

interface HUDProps {
  isMobile: boolean;
  show3D: boolean;
}

export function HUD({ isMobile, show3D }: HUDProps) {
  const isMenuOpen = usePortfolioStore((s) => s.isMenuOpen);
  const setIsMenuOpen = usePortfolioStore((s) => s.setIsMenuOpen);
  const activePanel = usePortfolioStore((s) => s.activePanel);
  const setActivePanel = usePortfolioStore((s) => s.setActivePanel);
  const activeCategory = usePortfolioStore((s) => s.activeCategory);
  const setActiveCategory = usePortfolioStore((s) => s.setActiveCategory);
  const controlMode = usePortfolioStore((s) => s.controlMode);
  const setControlMode = usePortfolioStore((s) => s.setControlMode);
  const setViewMode = usePortfolioStore((s) => s.setViewMode);
  const resetView = usePortfolioStore((s) => s.resetView);
  const isTraveling = usePortfolioStore((s) => s.isTraveling);
  const hoveredId = usePortfolioStore((s) => s.hoveredProjectId);

  const togglePanel = (panel: 'about' | 'contact') => {
    setActivePanel(activePanel === panel ? 'none' : panel);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between p-4 md:p-6">
        <div className="pointer-events-auto">
          <h1 className="text-xl font-bold tracking-[0.25em] text-mono-paper md:text-2xl">
            NIPERX
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-mono-gray md:text-xs">
            ISOMETRIC SKETCH LAB
          </p>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {isMobile && show3D && (
            <button
              onClick={() => setViewMode('2d')}
              className="flex h-9 items-center gap-1 rounded-lg border border-mono-border bg-mono-surface/90 px-2 text-mono-light backdrop-blur"
            >
              <LayoutGrid size={16} />
            </button>
          )}

          {show3D && !isMobile && (
            <button
              onClick={() => setControlMode(controlMode === 'explore' ? 'orbit' : 'explore')}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-mono-border bg-mono-surface/90 px-2.5 text-mono-light backdrop-blur transition hover:border-accent-teal/50 hover:text-accent-teal"
            >
              {controlMode === 'explore' ? <Orbit size={16} /> : <Compass size={16} />}
              <span className="hidden text-xs sm:inline">
                {controlMode === 'explore' ? 'Orbit' : 'Explore'}
              </span>
            </button>
          )}

          {show3D && (
            <button
              onClick={resetView}
              disabled={isTraveling}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-mono-border bg-mono-surface/90 text-mono-gray backdrop-blur transition hover:text-mono-paper disabled:opacity-40"
            >
              <RotateCcw size={16} />
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-mono-border bg-mono-surface/90 text-mono-light backdrop-blur"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <nav className="paper-texture fixed right-4 top-20 z-40 w-56 rounded-xl border border-mono-border bg-mono-surface/95 p-4 backdrop-blur-md md:right-6">
          <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-mono-gray">
            Navigation
          </p>
          <ul className="space-y-1">
            {[
              { icon: User, label: 'About Me', panel: 'about' as const },
              { icon: Mail, label: 'Contact', panel: 'contact' as const },
              { icon: Github, label: 'GitHub', href: 'https://github.com/Niperx' },
            ].map((item) => (
              <li key={item.label}>
                {'href' in item ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mono-light transition hover:bg-white/5 hover:text-mono-paper"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </a>
                ) : (
                  <button
                    onClick={() => togglePanel(item.panel)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 ${
                      activePanel === item.panel ? 'text-accent-teal' : 'text-mono-light'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {show3D && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-1 overflow-x-auto rounded-full border border-mono-border bg-mono-surface/90 px-2 py-1.5 backdrop-blur-md">
            <Filter size={14} className="ml-1 shrink-0 text-mono-gray" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as ProjectCategory | 'All')}
                className={`shrink-0 rounded-full px-3 py-1 text-xs transition ${
                  activeCategory === cat
                    ? 'bg-white/10 text-mono-paper'
                    : 'text-mono-gray hover:text-mono-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {show3D && (
        <div className="pointer-events-none fixed bottom-16 left-4 z-30 text-xs text-mono-gray">
          {isMobile ? (
            <p>Tap на проект — перемещение + детали</p>
          ) : controlMode === 'explore' ? (
            <>
              <p className="hidden md:block">Click на проект — камера перемещается</p>
              <p className="hidden md:block">Orbit — свободный поворот сцены</p>
            </>
          ) : (
            <p className="hidden md:block">Drag — вращение · Scroll — zoom</p>
          )}
          {isTraveling && <p className="mt-1 text-accent-teal">Moving...</p>}
          {hoveredId && !isTraveling && (
            <p className="mt-1 text-mono-light">→ #{hoveredId}</p>
          )}
        </div>
      )}
    </>
  );
}
