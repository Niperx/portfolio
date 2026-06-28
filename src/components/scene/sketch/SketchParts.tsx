import { useMemo } from 'react';
import { MONO } from '../../../utils/colors';
import { sketchMat } from '../../../utils/materials';

interface PedestalProps {
  height?: number;
  radius?: number;
  hovered?: boolean;
}

/** Low-poly подиум для проекта */
export function SketchPedestal({ height = 0.2, radius = 0.55, hovered }: PedestalProps) {
  const mat = useMemo(() => sketchMat(hovered ? MONO.light : MONO.dark), [hovered]);

  return (
    <group position={[0, -height / 2 - 0.05, 0]}>
      <mesh material={mat}>
        <cylinderGeometry args={[radius * 0.85, radius, height, 6]} />
      </mesh>
      {/* Тонкое кольцо-штрих */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, height / 2 + 0.01, 0]}>
        <ringGeometry args={[radius * 0.7, radius * 0.85, 6]} />
        <meshBasicMaterial color={MONO.light} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
