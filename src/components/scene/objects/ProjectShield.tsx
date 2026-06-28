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

/** VPN — low-poly щит с туннельными линиями */
export function ProjectShield({ project }: { project: Project }) {
  const accent = project.accentColor ?? 'teal';
  const particlesRef = useRef<THREE.Points>(null);
  const { animRef, hovered, isVisible, scale, onPointerOver, onPointerOut, onClick } =
    useProjectObject(project);

  const mat = useMemo(() => sketchMat(MONO.light), []);
  const particles = useMemo(() => {
    const arr = new Float32Array(20 * 3);
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * 0.5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      arr[i * 3 + 2] = Math.sin(a) * 0.5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) particlesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group position={project.position} visible={isVisible} scale={scale}>
      <group ref={animRef} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <SketchPedestal hovered={hovered} />
        <mesh scale={[1, 1.2, 0.25]} material={mat}>
          <icosahedronGeometry args={[0.65, 0]} />
          {hovered && <Outlines thickness={0.04} color={getAccentColor(accent)} />}
        </mesh>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial color={getAccentColor(accent)} size={0.04} transparent opacity={0.6} />
        </points>
        <ProjectLabel project={project} y={1.2} hovered={hovered} />
      </group>
    </group>
  );
}
