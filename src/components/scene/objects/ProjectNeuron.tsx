import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '../../../types/project';
import { MONO, getAccentColor } from '../../../utils/colors';
import { sketchMat } from '../../../utils/materials';
import { useProjectObject } from '../../../hooks/useProjectObject';
import { ProjectLabel } from '../ProjectLabel';
import { SketchPedestal } from '../sketch/SketchParts';

/** Нейронная / сетевая структура */
export function ProjectNeuron({ project }: { project: Project }) {
  const accent = project.accentColor ?? 'teal';
  const coreRef = useRef<THREE.Group>(null);
  const mat = sketchMat(MONO.light);
  const { animRef, hovered, isVisible, scale, onPointerOver, onPointerOut, onClick } =
    useProjectObject(project);

  useFrame((state) => {
    if (coreRef.current) coreRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  const nodes: [number, number, number][] = [
    [0, 0.5, 0], [0.35, 0.3, 0.2], [-0.3, 0.35, -0.15], [0.2, 0.65, -0.2], [-0.25, 0.55, 0.25],
  ];

  return (
    <group position={project.position} visible={isVisible} scale={scale}>
      <group ref={animRef} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <SketchPedestal hovered={hovered} />
        <group ref={coreRef}>
          {nodes.map((pos, i) => (
            <mesh key={i} position={pos} material={mat}>
              <sphereGeometry args={[i === 0 ? 0.18 : 0.1, 6, 6]} />
              {hovered && i === 0 && <Outlines thickness={0.03} color={getAccentColor(accent)} />}
            </mesh>
          ))}
        </group>
        <ProjectLabel project={project} y={1.2} hovered={hovered} />
      </group>
    </group>
  );
}
