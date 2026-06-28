import { Outlines } from '@react-three/drei';
import type { Project } from '../../../types/project';
import { MONO, getAccentColor } from '../../../utils/colors';
import { sketchMat } from '../../../utils/materials';
import { useProjectObject } from '../../../hooks/useProjectObject';
import { ProjectLabel } from '../ProjectLabel';
import { SketchPedestal } from '../sketch/SketchParts';

/** Holographic panel / мини-модель сайта */
export function ProjectPanel({ project }: { project: Project }) {
  const accent = project.accentColor ?? 'lemon';
  const mat = sketchMat(MONO.paper);

  const { animRef, hovered, isVisible, scale, onPointerOver, onPointerOut, onClick } =
    useProjectObject(project);

  return (
    <group position={project.position} visible={isVisible} scale={scale}>
      <group ref={animRef} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <SketchPedestal hovered={hovered} radius={0.65} height={0.15} />

        <mesh rotation={[0.15, 0, 0]} material={mat}>
          <boxGeometry args={[2, 1.3, 0.05]} />
          {hovered && <Outlines thickness={0.035} color={getAccentColor(accent)} />}
        </mesh>

        {/* Wireframe-рамка как набросок */}
        <mesh rotation={[0.15, 0, 0]} position={[0, 0, 0.03]}>
          <boxGeometry args={[2.05, 1.35, 0.02]} />
          <meshBasicMaterial color={MONO.light} wireframe transparent opacity={0.5} />
        </mesh>

        {/* Мини-«браузер» бар */}
        <mesh position={[0, 0.55, 0.04]} rotation={[0.15, 0, 0]} material={sketchMat(MONO.dark)}>
          <boxGeometry args={[1.8, 0.12, 0.02]} />
        </mesh>

        <ProjectLabel project={project} y={0.95} hovered={hovered} />
      </group>
    </group>
  );
}
