/** Тип 3D-объекта проекта в изометрической сцене */
export type ProjectObjectType =
  | 'phone'
  | 'crystal'
  | 'panel'
  | 'shield'
  | 'server'
  | 'neuron';

export type ProjectCategory =
  | 'Telegram Bot'
  | 'Discord Bot'
  | 'Website'
  | 'VPN'
  | 'Tool'
  | 'Other';

export type ProjectStatus = 'Live' | 'Private' | 'Local' | 'Demo';

/** Сдержанный акцент — teal или lemon, только для hover/glow */
export type AccentColor = 'teal' | 'lemon';

export interface BotCommand {
  cmd: string;
  response: string;
}

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  protocols?: string[];
  stack?: string[];
  status: ProjectStatus;
  github?: string;
  liveUrl?: string;
  videoDemo?: string;
  images?: string[];
  commands?: BotCommand[];
  position: [number, number, number];
  objectType: ProjectObjectType;
  accentColor?: AccentColor;
}
