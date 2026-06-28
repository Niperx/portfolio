import * as THREE from 'three';
import { MONO, getAccentThree, type AccentColor } from './colors';

/** Low-poly sketch-материал с flat shading */
export function sketchMat(
  color: string,
  opts?: { emissive?: AccentColor | string; emissiveIntensity?: number; opacity?: number },
) {
  const emissive =
    typeof opts?.emissive === 'string' && !opts.emissive.startsWith('#')
      ? getAccentThree(opts.emissive as AccentColor)
      : new THREE.Color(opts?.emissive ?? '#000000');

  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.92,
    metalness: 0.02,
    flatShading: true,
    emissive,
    emissiveIntensity: opts?.emissiveIntensity ?? 0,
    transparent: (opts?.opacity ?? 1) < 1,
    opacity: opts?.opacity ?? 1,
  });
}

/** Пресеты материалов сцены */
export const MAT = {
  floor: () => sketchMat(MONO.paper),
  podium: () => sketchMat(MONO.dark),
  object: () => sketchMat(MONO.light),
  objectDark: () => sketchMat(MONO.gray),
  wire: () => sketchMat(MONO.light, { opacity: 0.6 }),
  accent: (c: AccentColor = 'teal') =>
    sketchMat(MONO.white, { emissive: c, emissiveIntensity: 0.15 }),
} as const;

/** Процедурная «бумажная» текстура со штриховкой */
let _paperTexture: THREE.CanvasTexture | null = null;

export function getPaperTexture(): THREE.CanvasTexture {
  if (_paperTexture) return _paperTexture;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = MONO.paper;
  ctx.fillRect(0, 0, size, size);

  // Лёгкий шум карандаша
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const a = Math.random() * 0.06;
    ctx.fillStyle = `rgba(20,20,20,${a})`;
    ctx.fillRect(x, y, 1, 1);
  }

  // Горизонтальные линии тетради
  ctx.strokeStyle = 'rgba(0,0,0,0.04)';
  ctx.lineWidth = 1;
  for (let y = 0; y < size; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  _paperTexture = tex;
  return tex;
}
