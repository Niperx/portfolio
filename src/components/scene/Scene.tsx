import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { projects } from '../../data/projects';
import { IsoStudio, SCENE_COLORS } from './IsoStudio';
import { NavigationController } from './NavigationController';
import { ProjectDisplay } from './ProjectDisplay';
import { getDefaultIsoCameraPos } from '../../utils/isometric';

interface SceneProps {
  isMobile: boolean;
  dpr: [number, number];
}

function SceneContent({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Минимальное освещение — чистая изометрия */}
      <ambientLight intensity={0.55} color="#f0f0f0" />
      <directionalLight
        position={[5, 12, 8]}
        intensity={0.85}
        color="#ffffff"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-4, 6, -3]} intensity={0.15} color="#cccccc" />

      <IsoStudio minimal={isMobile} />

      {projects.map((project) => (
        <ProjectDisplay key={project.id} project={project} isMobile={isMobile} />
      ))}

      <NavigationController />
    </>
  );
}

export function Scene({ isMobile, dpr }: SceneProps) {
  const camPos = getDefaultIsoCameraPos();

  return (
    <Canvas
      camera={{ position: [camPos.x, camPos.y, camPos.z], fov: 38, near: 0.1, far: 80 }}
      dpr={dpr}
      shadows={!isMobile}
      gl={{
        antialias: !isMobile,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ background: SCENE_COLORS.bg }}
    >
      <color attach="background" args={[SCENE_COLORS.bg]} />
      <fog attach="fog" args={[SCENE_COLORS.fog, 14, 45]} />
      <Suspense fallback={null}>
        <SceneContent isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
