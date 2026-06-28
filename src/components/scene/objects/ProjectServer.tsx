import { Outlines } from '@react-three/drei';
import type { Project } from '../../../types/project';
import { MONO, getAccentColor } from '../../../utils/colors';
import { sketchMat } from '../../../utils/materials';
import { useProjectObject } from '../../../hooks/useProjectObject';
import { ProjectLabel } from '../ProjectLabel';
import { SketchPedestal } from '../sketch/SketchParts';

/** Backend / Tool — low-poly сервер-стойка */
export function ProjectServer({ project }: { project: Project }) {
  const accent = project.accentColor ?? 'lemon';
  const mat = sketchMat(MONO.gray);
  const { animRef, hovered, isVisible, scale, onPointerOver, onPointerOut, onClick } =
    useProjectObject(project);

  return (
    <group position={project.position} visible={isVisible} scale={scale}>
      <group ref={animRef} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <SketchPedestal hovered={hovered} />
        {/* Корпус сервера */}
        <mesh position={[0, 0.35, 0]} material={mat}>
          <boxGeometry args={[0.7, 0.7, 0.5]} />
          {hovered && <Outlines thickness={0.035} color={getAccentColor(accent)} />}
        </mesh>
        {/* Слоты */}
        {[0.15, 0, -0.15].map((z) => (
          <mesh key={z} position={[0, 0.35 + 0.2, z]} material={sketchMat(MONO.dark)}>
            <boxGeometry args={[0.5, 0.08, 0.06]} />
          </mesh>
        ))}
        {/* Антенна */}
        <mesh position={[0, 0.85, 0]} material={sketchMat(MONO.light)}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
        </mesh>
        <ProjectLabel project={project} y={1.3} hovered={hovered} />
      </group>
    </group>
  );
}
