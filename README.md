# Niperx — Isometric Sketch Lab

Black & white low-poly isometric 3D portfolio.

## Стек

Vite + React 19 + TypeScript · R3F · GSAP · TailwindCSS v4 · Zustand

## Запуск

```bash
npm install
npm run dev
```

## Концепция

- **Стиль:** светлая ч/б low-poly + hand-drawn штриховка, бумажные текстуры, чёрные объекты на белом фоне
- **Камера:** фиксированная ортографическая изометрия (следует за персонажем)
- **Навигация:** персонаж ходит к стендам; 2 клика — подойти, затем открыть модалку
- **Mobile:** 2D карусель + кнопка «Enter 3D Isometric Lab»

> **План доработки:** см. [docs/PLAN-character-isometric.md](docs/PLAN-character-isometric.md) — персонаж, открытый мир, удаление Orbit (ещё не реализовано).

## objectType

| Тип | Объект |
|-----|--------|
| `phone` | Терминал (форма UI) |
| `shield` | VPN-щит |
| `panel` | Holographic leaf (websites) |
| `crystal` | Кристалл |
| `server` | Сервер-стойка |
| `neuron` | Нейронная сеть |

## Добавление проекта

```ts
// src/data/projects.ts
{
  id: 7,
  title: 'My Tool',
  category: 'Tool',
  shortDesc: '...',
  fullDesc: '...',
  technologies: ['Rust'],
  protocols: ['gRPC'],       // опционально
  stack: ['Docker'],         // опционально
  status: 'Live',
  objectType: 'server',
  accentColor: 'teal',       // teal | lemon — только для hover
  position: [2, 0.9, -3],
}
```
