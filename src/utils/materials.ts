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
  floor: () => sketchMat(MONO.mid),
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

/** Процедурная текстура «плиточного» пола в hand-drawn стиле */
let _floorTexture: THREE.CanvasTexture | null = null;

export function getFloorTexture(): THREE.CanvasTexture {
  if (_floorTexture) return _floorTexture;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Светлая основа плитки
  ctx.fillStyle = MONO.paper;
  ctx.fillRect(0, 0, size, size);

  // Шахматная раскладка 2x2 плитки в тайле
  const tile = size / 2;
  ctx.fillStyle = 'rgba(20,20,20,0.10)';
  ctx.fillRect(0, 0, tile, tile);
  ctx.fillRect(tile, tile, tile, tile);

  // Карандашный шум поверх
  for (let i = 0; i < 2500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const a = Math.random() * 0.05;
    ctx.fillStyle = `rgba(20,20,20,${a})`;
    ctx.fillRect(x, y, 1, 1);
  }

  // Швы между плитками, нарисованные «от руки»
  ctx.strokeStyle = 'rgba(0,0,0,0.45)';
  ctx.lineWidth = 2;
  const seams = [tile, size];
  for (const pos of seams) {
    // вертикальный шов
    ctx.beginPath();
    for (let y = 0; y <= size; y += 8) {
      const jitter = (Math.random() - 0.5) * 2;
      if (y === 0) ctx.moveTo((pos % size) + jitter, y);
      else ctx.lineTo((pos % size) + jitter, y);
    }
    ctx.stroke();
    // горизонтальный шов
    ctx.beginPath();
    for (let x = 0; x <= size; x += 8) {
      const jitter = (Math.random() - 0.5) * 2;
      if (x === 0) ctx.moveTo(x, (pos % size) + jitter);
      else ctx.lineTo(x, (pos % size) + jitter);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  _floorTexture = tex;
  return tex;
}
