import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '../../../types/project';
import { MONO, getAccentColor } from '../../../utils/colors';
import { sketchMat } from '../../../utils/materials';
import { useProjectObject } from '../../../hooks/useProjectObject';
import { ProjectLabel } from '../ProjectLabel';
import { SketchPedestal } from '../sketch/SketchParts';

export function ProjectCrystal({ project }: { project: Project }) {
  const accent = project.accentColor ?? 'teal';
  const meshRef = useRef<THREE.Mesh>(null);
  const { animRef, hovered, isVisible, scale, onPointerOver, onPointerOut, onClick } =
    useProjectObject(project);

  const geo = useMemo(() => {
    const g = new THREE.OctahedronGeometry(0.55, 0);
    g.scale(1, 1.5, 1);
    return g;
  }, []);

  const mat = useMemo(() => sketchMat(MONO.light), []);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <group position={project.position} visible={isVisible} scale={scale}>
      <group ref={animRef} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <SketchPedestal hovered={hovered} />
        <mesh ref={meshRef} geometry={geo} material={mat}>
          {hovered && <Outlines thickness={0.04} color={getAccentColor(accent)} />}
        </mesh>
        <ProjectLabel project={project} y={1.3} hovered={hovered} />
      </group>
    </group>
  );
}
