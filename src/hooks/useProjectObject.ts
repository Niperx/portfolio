import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { Project } from '../types/project';
import { usePortfolioStore } from './usePortfolioStore';

/** Общая логика hover / click / float для всех 3D-объектов проектов */
export function useProjectObject(project: Project) {
  const animRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(0);

  const setHoveredId = usePortfolioStore((s) => s.setHoveredProjectId);
  const travelTo = usePortfolioStore((s) => s.travelToProject);
  const setSelected = usePortfolioStore((s) => s.setSelectedProject);
  const controlMode = usePortfolioStore((s) => s.controlMode);
  const isTraveling = usePortfolioStore((s) => s.isTraveling);
  const activeCategory = usePortfolioStore((s) => s.activeCategory);

  const isVisible =
    activeCategory === 'All' || activeCategory === project.category;

  useFrame((state) => {
    if (!animRef.current) return;
    const t = state.clock.elapsedTime + project.id;
    animRef.current.position.y =
      Math.sin(t * 0.7) * 0.06;
    setPulse((Math.sin(t * 2) + 1) * 0.5);
  });

  const onPointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (isTraveling) return;
      setHovered(true);
      setHoveredId(project.id);
      document.body.style.cursor = 'pointer';
    },
    [project.id, setHoveredId, isTraveling],
  );

  const onPointerOut = useCallback(() => {
    setHovered(false);
    setHoveredId(null);
    document.body.style.cursor = 'auto';
  }, [setHoveredId]);

  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (isTraveling) return;
      // Orbit / mobile — сразу модалка; Explore — click-to-move
      if (controlMode === 'orbit') {
        setSelected(project);
      } else {
        travelTo(project);
      }
    },
    [project, travelTo, setSelected, controlMode, isTraveling],
  );

  const scale = hovered ? 1.06 : 1;

  return {
    animRef,
    hovered,
    pulse,
    isVisible,
    scale,
    onPointerOver,
    onPointerOut,
    onClick,
  };
}
