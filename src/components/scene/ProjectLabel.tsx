import { Html, Text } from '@react-three/drei';
import type { Project } from '../../types/project';
import { MONO, getAccentColor } from '../../utils/colors';

interface ProjectLabelProps {
  project: Project;
  y?: number;
  hovered?: boolean;
}

/** Название проекта — видно издалека */
export function ProjectLabel({ project, y = 1.5, hovered }: ProjectLabelProps) {
  const accent = getAccentColor(project.accentColor);
  const textColor = hovered ? accent : MONO.white;

  return (
    <>
      <Text
        position={[0, y, 0]}
        fontSize={0.14}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={MONO.black}
        maxWidth={3}
      >
        {project.title}
      </Text>
      <Html position={[0, y + 0.3, 0]} center distanceFactor={10} zIndexRange={[5, 0]}>
        <div
          className="pointer-events-none select-none whitespace-nowrap rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
          style={{
            opacity: hovered ? 1 : 0.7,
            background: 'rgba(10,10,10,0.9)',
            border: `1px solid ${hovered ? accent : MONO.gray}`,
            color: hovered ? accent : MONO.light,
          }}
        >
          {project.category}
        </div>
      </Html>
    </>
  );
}
