import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import {
  ISO_DEFAULT_LOOK,
  ISO_OFFSET,
  getDefaultIsoCameraPos,
  getIsoCameraPos,
} from '../../utils/isometric';

/**
 * Изометрическая камера + Click-to-Move (explore) / Orbit (ограниченный).
 */
export function NavigationController() {
  const { camera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const lookAt = useRef(ISO_DEFAULT_LOOK.clone());
  const introDone = useRef(false);

  const controlMode = usePortfolioStore((s) => s.controlMode);
  const travelTarget = usePortfolioStore((s) => s.travelTarget);
  const completeTravel = usePortfolioStore((s) => s.completeTravel);
  const isLoading = usePortfolioStore((s) => s.isLoading);
  const cameraResetTick = usePortfolioStore((s) => s.cameraResetTick);

  const isOrbit = controlMode === 'orbit';

  // Вступительная анимация — плавный вход в изометрию
  useEffect(() => {
    if (introDone.current || isLoading) return;
    introDone.current = true;

    const start = getDefaultIsoCameraPos().clone().add(new THREE.Vector3(0, 6, 6));
    camera.position.copy(start);
    lookAt.current.copy(ISO_DEFAULT_LOOK);

    gsap.to(camera.position, {
      x: getDefaultIsoCameraPos().x,
      y: getDefaultIsoCameraPos().y,
      z: getDefaultIsoCameraPos().z,
      duration: 2.2,
      ease: 'power2.inOut',
      delay: 1.4,
    });
  }, [camera, isLoading]);

  // Click-to-move — сохраняем изометрический угол
  useEffect(() => {
    if (!travelTarget || isOrbit) return;

    const [px, py, pz] = travelTarget.position;
    const target = new THREE.Vector3(px, py + 0.3, pz);
    const camPos = getIsoCameraPos(target);

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(lookAt.current);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(lookAt.current, {
          y: target.y + 0.1,
          duration: 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
          onComplete: completeTravel,
        });
      },
    });

    tl.to(camera.position, { x: camPos.x, y: camPos.y, z: camPos.z, duration: 1.5, ease: 'power2.inOut' });
    tl.to(lookAt.current, { x: target.x, y: target.y, z: target.z, duration: 1.5, ease: 'power2.inOut' }, 0);
  }, [travelTarget, camera, isOrbit, completeTravel]);

  // Сброс вида
  useEffect(() => {
    if (cameraResetTick === 0) return;
    const camPos = getDefaultIsoCameraPos();
    gsap.to(camera.position, { x: camPos.x, y: camPos.y, z: camPos.z, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(lookAt.current, {
      x: ISO_DEFAULT_LOOK.x,
      y: ISO_DEFAULT_LOOK.y,
      z: ISO_DEFAULT_LOOK.z,
      duration: 1.2,
      ease: 'power2.inOut',
    });
    controlsRef.current?.target.copy(ISO_DEFAULT_LOOK);
    controlsRef.current?.update();
  }, [cameraResetTick, camera]);

  useFrame(() => {
    if (isOrbit) {
      controlsRef.current?.update();
    } else {
      camera.lookAt(lookAt.current);
    }
  });

  if (!isOrbit) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={8}
      maxDistance={20}
      // Ограничиваем угол — почти изометрия
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 3.2}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
      target={[ISO_DEFAULT_LOOK.x, ISO_DEFAULT_LOOK.y, ISO_DEFAULT_LOOK.z]}
    />
  );
}

/** Смещение камеры для изометрии (экспорт для отладки) */
export { ISO_OFFSET };
