import { useMemo } from 'react';
import * as THREE from 'three';
import { MONO } from '../../../utils/colors';
import { sketchMat } from '../../../utils/materials';

/** Hand-drawn декор: провода, инструменты, растение */
export function SketchDecor() {
  const wireMat = useMemo(() => sketchMat(MONO.light, { opacity: 0.7 }), []);

  const wireCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8, 0.5, -6),
      new THREE.Vector3(-6, 0.8, -5),
      new THREE.Vector3(-4, 0.3, -6.5),
      new THREE.Vector3(-2, 0.6, -6),
    ]);
  }, []);

  return (
    <group>
      {/* Провод-штрих */}
      <mesh material={wireMat}>
        <tubeGeometry args={[wireCurve, 24, 0.02, 4, false]} />
      </mesh>

      {/* Карандаш / инструмент */}
      <group position={[7.5, 0, -5.5]} rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0.15, 0]} material={sketchMat('#c4a574')}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 5]} />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={sketchMat(MONO.gray)}>
          <coneGeometry args={[0.05, 0.1, 5]} />
        </mesh>
      </group>

      {/* Low-poly «растение» в горшке */}
      <group position={[-7, 0, 3]}>
        <mesh position={[0, 0.12, 0]} material={sketchMat(MONO.dark)}>
          <cylinderGeometry args={[0.2, 0.25, 0.24, 5]} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[Math.sin(i * 2) * 0.08, 0.35 + i * 0.1, Math.cos(i * 2) * 0.08]}
            rotation={[0.3, i, 0]}
            material={sketchMat(MONO.light)}
          >
            <coneGeometry args={[0.08, 0.25, 4]} />
          </mesh>
        ))}
      </group>

      {/* Набросок рамки на стене */}
      <mesh position={[0, 3.5, -6.85]} material={sketchMat(MONO.gray, { opacity: 0.5 })}>
        <boxGeometry args={[3, 2, 0.05]} />
      </mesh>
      <mesh position={[0, 3.5, -6.82]}>
        <boxGeometry args={[2.8, 1.8, 0.02]} />
        <meshBasicMaterial color={MONO.paper} transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  );
}
