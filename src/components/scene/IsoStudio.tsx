import { useMemo } from 'react';
import { Grid } from '@react-three/drei';
import { MONO, SCENE_COLORS } from '../../utils/colors';
import { sketchMat, getPaperTexture } from '../../utils/materials';
import { SketchDecor } from './sketch/SketchDecor';

interface IsoStudioProps {
  minimal?: boolean;
}

/**
 * Изометрическая low-poly студия в ч/б hand-drawn стиле.
 * Платформа с подиумами, сетка, декоративные штрихи.
 */
export function IsoStudio({ minimal = false }: IsoStudioProps) {
  const floorMat = useMemo(() => {
    const mat = sketchMat(MONO.paper);
    mat.map = getPaperTexture();
    return mat;
  }, []);

  const wallMat = useMemo(() => sketchMat(MONO.dark), []);

  return (
    <group>
      {/* Основная платформа */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow material={floorMat}>
        <planeGeometry args={[22, 22]} />
      </mesh>

      {/* Изометрическая сетка */}
      <Grid
        position={[0, 0.005, 0]}
        args={[22, 22]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#3a3a3a"
        sectionSize={4}
        sectionThickness={0.8}
        sectionColor="#555555"
        fadeDistance={20}
        fadeStrength={1}
        infiniteGrid={false}
      />

      {/* Задняя стена-студия */}
      <mesh position={[0, 3, -7]} material={wallMat}>
        <boxGeometry args={[22, 6, 0.3]} />
      </mesh>

      {/* Боковые стены */}
      <mesh position={[-9, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMat}>
        <boxGeometry args={[14, 5, 0.2]} />
      </mesh>
      <mesh position={[9, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} material={wallMat}>
        <boxGeometry args={[14, 5, 0.2]} />
      </mesh>

      {/* Подиумы разной высоты для визуальной глубины */}
      {[
        { pos: [-4, 0.08, -2] as [number, number, number], size: [2.5, 0.16, 2] as [number, number, number] },
        { pos: [0, 0.12, -3.5] as [number, number, number], size: [3, 0.24, 2.5] as [number, number, number] },
        { pos: [4, 0.06, -2.5] as [number, number, number], size: [2.2, 0.12, 2] as [number, number, number] },
        { pos: [0, 0.04, -1] as [number, number, number], size: [1.8, 0.08, 1.5] as [number, number, number] },
      ].map((p, i) => (
        <mesh key={i} position={p.pos} material={sketchMat(MONO.dark)}>
          <boxGeometry args={p.size} />
        </mesh>
      ))}

      {!minimal && <SketchDecor />}
    </group>
  );
}

export { SCENE_COLORS };
