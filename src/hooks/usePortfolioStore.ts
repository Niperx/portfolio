import { create } from 'zustand';
import type { Project, ProjectCategory } from '../types/project';

export type ControlMode = 'explore' | 'orbit';
export type ViewMode = '2d' | '3d';

interface PortfolioState {
  selectedProject: Project | null;
  hoveredProjectId: number | null;
  activeCategory: ProjectCategory | 'All';
  isLoading: boolean;
  isMenuOpen: boolean;
  activePanel: 'none' | 'about' | 'contact';
  controlMode: ControlMode;
  viewMode: ViewMode;
  /** Проект, к которому летит камера (click-to-move) */
  travelTarget: Project | null;
  isTraveling: boolean;
  cameraResetTick: number;

  setSelectedProject: (project: Project | null) => void;
  setHoveredProjectId: (id: number | null) => void;
  setActiveCategory: (category: ProjectCategory | 'All') => void;
  setIsLoading: (loading: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
  setActivePanel: (panel: 'none' | 'about' | 'contact') => void;
  setControlMode: (mode: ControlMode) => void;
  setViewMode: (mode: ViewMode) => void;
  /** Click-to-move: камера летит к проекту, затем открывается модалка */
  travelToProject: (project: Project) => void;
  completeTravel: () => void;
  resetView: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  selectedProject: null,
  hoveredProjectId: null,
  activeCategory: 'All',
  isLoading: true,
  isMenuOpen: false,
  activePanel: 'none',
  controlMode: 'explore',
  viewMode: '2d',
  travelTarget: null,
  isTraveling: false,
  cameraResetTick: 0,

  setSelectedProject: (project) => set({ selectedProject: project }),
  setHoveredProjectId: (id) => set({ hoveredProjectId: id }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setControlMode: (mode) => set({ controlMode: mode, travelTarget: null, isTraveling: false }),
  setViewMode: (mode) => set({ viewMode: mode }),

  travelToProject: (project) => {
    if (get().isTraveling) return;
    set({ travelTarget: project, isTraveling: true, selectedProject: null });
  },

  completeTravel: () => {
    const target = get().travelTarget;
    set({
      isTraveling: false,
      selectedProject: target,
      travelTarget: null,
    });
  },

  resetView: () =>
    set((s) => ({
      selectedProject: null,
      travelTarget: null,
      isTraveling: false,
      cameraResetTick: s.cameraResetTick + 1,
    })),
}));
