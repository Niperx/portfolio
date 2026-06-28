import { X, Code2, Gamepad2, Bot } from 'lucide-react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';

export function AboutPanel() {
  const activePanel = usePortfolioStore((s) => s.activePanel);
  const setActivePanel = usePortfolioStore((s) => s.setActivePanel);

  if (activePanel !== 'about') return null;

  return (
    <div className="fixed inset-4 z-50 flex items-center justify-center md:inset-auto md:left-6 md:top-24 md:w-96">
      <div className="custom-scrollbar max-h-[80vh] w-full overflow-y-auto rounded-2xl border border-mono-border bg-mono-surface/95 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-mono-paper">About Me</h2>
          <button
            onClick={() => setActivePanel('none')}
            className="text-slate-400 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-mono-border bg-mono-surface text-xl font-bold text-mono-paper">
            D
          </div>
          <div>
            <p className="font-medium text-white">Daniel (Niperx)</p>
            <p className="text-sm text-slate-400">Junior Developer</p>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-slate-300">
          Разработчица ботов, веб-приложений и игр. Создаю Telegram-ботов на aiogram,
          браузерные мультиплеерные игры и интерактивные веб-проекты.
          Люблю экспериментировать с 3D и нестандартными UI.
        </p>

        <div className="space-y-2">
          {[
            { icon: Bot, text: 'Telegram & Discord боты' },
            { icon: Code2, text: 'Python · TypeScript · React' },
            { icon: Gamepad2, text: 'Isometric sketch portfolio' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-mono-gray">
              <Icon size={16} className="text-accent-teal" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
