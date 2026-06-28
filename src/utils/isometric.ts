import * as THREE from 'three';

/** Изометрический угол камеры (~35° elevation, 45° azimuth) */
export const ISO_OFFSET = new THREE.Vector3(9, 9, 9);

export const ISO_DEFAULT_LOOK = new THREE.Vector3(0, 0.6, -1.5);

/** Позиция камеры для фокуса на точке */
export function getIsoCameraPos(target: THREE.Vector3): THREE.Vector3 {
  return target.clone().add(ISO_OFFSET);
}

/** Начальная изометрическая позиция */
export function getDefaultIsoCameraPos(): THREE.Vector3 {
  return getIsoCameraPos(ISO_DEFAULT_LOOK);
}
