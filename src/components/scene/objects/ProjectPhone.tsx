import { Html, Outlines } from '@react-three/drei';
import type { Project } from '../../../types/project';
import { MONO, getAccentColor } from '../../../utils/colors';
import { sketchMat } from '../../../utils/materials';
import { useProjectObject } from '../../../hooks/useProjectObject';
import { MiniTelegramBot } from '../../bot/MiniTelegramBot';
import { ProjectLabel } from '../ProjectLabel';
import { SketchPedestal } from '../sketch/SketchParts';

interface ProjectPhoneProps {
  project: Project;
  htmlScale?: number;
}

/** Low-poly терминал с MiniTelegramBot */
export function ProjectPhone({ project, htmlScale = 0.34 }: ProjectPhoneProps) {
  const accent = project.accentColor ?? 'teal';
  const bodyMat = sketchMat(MONO.dark);
  const screenMat = sketchMat(MONO.black);

  const {
    animRef, hovered, isVisible, scale,
    onPointerOver, onPointerOut, onClick,
  } = useProjectObject(project);

  return (
    <group position={project.position} visible={isVisible} scale={scale}>
      <group ref={animRef} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <SketchPedestal hovered={hovered} radius={0.5} />

        <mesh material={bodyMat}>
          <boxGeometry args={[0.9, 1.8, 0.08]} />
          {hovered && <Outlines thickness={0.03} color={getAccentColor(accent)} />}
        </mesh>

        <mesh position={[0, 0.04, 0.045]} material={screenMat}>
          <boxGeometry args={[0.78, 1.55, 0.01]} />
        </mesh>

        <Html
          transform
          position={[0, 0.04, 0.05]}
          scale={htmlScale}
          distanceFactor={7}
          style={{ width: '200px', height: '340px', pointerEvents: 'auto' }}
          zIndexRange={[10, 0]}
        >
          <div
            className="h-full w-full overflow-hidden rounded-lg border border-gray-600"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {project.commands && (
              <MiniTelegramBot botName={project.title} commands={project.commands} className="h-full" />
            )}
          </div>
        </Html>

        <ProjectLabel project={project} y={1.2} hovered={hovered} />
      </group>
    </group>
  );
}
