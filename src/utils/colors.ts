import * as THREE from 'three';

/** Чёрно-белая палитра + сдержанный акцент */
export const MONO = {
  black: '#0a0a0a',
  dark: '#141414',
  mid: '#2a2a2a',
  gray: '#6b6b6b',
  light: '#b0b0b0',
  paper: '#e8e4dc',
  white: '#f5f5f0',
  fog: '#1a1a1a',
} as const;

export const ACCENT = {
  teal: '#5eead4',
  lemon: '#fbbf24',
} as const;

export type AccentColor = keyof typeof ACCENT;

export const SCENE_COLORS = {
  bg: MONO.black,
  fog: MONO.fog,
  floor: MONO.mid,
} as const;

export function getAccentColor(color?: AccentColor): string {
  return ACCENT[color ?? 'teal'];
}

export function getAccentThree(color?: AccentColor): THREE.Color {
  return new THREE.Color(getAccentColor(color));
}

/** @deprecated */
export function getGlowColor(color?: AccentColor): string {
  return getAccentColor(color);
}
