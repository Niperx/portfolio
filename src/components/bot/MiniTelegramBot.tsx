import { useCallback, useEffect, useRef, useState } from 'react';
import { Send, Bot } from 'lucide-react';
import type { BotCommand } from '../../types/project';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MiniTelegramBotProps {
  botName: string;
  commands: BotCommand[];
  welcomeMessage?: string;
  className?: string;
}

/**
 * Переиспользуемый симулятор Telegram-чата.
 * Передайте массив commands с cmd/response — бот ответит на совпадение.
 */
export function MiniTelegramBot({
  botName,
  commands,
  welcomeMessage = 'Привет! Напиши /help для списка команд 👋',
  className = '',
}: MiniTelegramBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const addMessage = useCallback((text: string, isBot: boolean) => {
    idRef.current += 1;
    setMessages((prev) => [
      ...prev,
      { id: idRef.current, text, isBot, timestamp: new Date() },
    ]);
  }, []);

  // Приветственное сообщение при монтировании
  useEffect(() => {
    const timer = setTimeout(() => addMessage(welcomeMessage, true), 400);
    return () => clearTimeout(timer);
  }, [welcomeMessage, addMessage]);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const findResponse = (cmd: string): string | null => {
    const normalized = cmd.trim().toLowerCase();
    const match = commands.find(
      (c) => c.cmd.toLowerCase() === normalized || c.cmd.toLowerCase().split(' ')[0] === normalized.split(' ')[0],
    );
    return match?.response ?? null;
  };

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      addMessage(trimmed, false);
      setInput('');
      setIsTyping(true);

      const delay = 600 + Math.random() * 800;
      setTimeout(() => {
        setIsTyping(false);
        const response = findResponse(trimmed);
        if (response) {
          addMessage(response, true);
        } else {
          addMessage('❓ Неизвестная команда. Попробуй /help', true);
        }
      }, delay);
    },
    [addMessage, commands],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatText = (text: string) => {
    // Простой markdown: **bold**
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{part}</span>
          ),
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={`tg-dark flex h-full flex-col overflow-hidden rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-[var(--tg-secondary)] px-3 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tg-accent)]/20">
          <Bot size={16} className="text-[var(--tg-accent)]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--tg-text)]">{botName}</p>
          <p className="text-[10px] text-[var(--tg-muted)]">bot</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-400" />
      </div>

      {/* Messages */}
      <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto bg-[var(--tg-bg)] p-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`animate-message-in flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs leading-relaxed ${
                msg.isBot
                  ? 'rounded-bl-sm bg-[var(--tg-bubble-in)] text-[var(--tg-text)]'
                  : 'rounded-br-sm bg-[var(--tg-bubble-out)] text-white'
              }`}
            >
              {formatText(msg.text)}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[var(--tg-bubble-in)] px-3 py-2">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--tg-muted)]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--tg-muted)]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--tg-muted)]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick commands */}
      <div className="flex gap-1 overflow-x-auto border-t border-white/5 bg-[var(--tg-secondary)] px-2 py-1.5">
        {commands.slice(0, 4).map((c) => (
          <button
            key={c.cmd}
            type="button"
            onClick={() => sendMessage(c.cmd)}
            className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-[var(--tg-accent)] transition hover:bg-white/10"
          >
            {c.cmd}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-white/5 bg-[var(--tg-secondary)] p-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Сообщение..."
          className="flex-1 rounded-full bg-[var(--tg-bg)] px-3 py-1.5 text-xs text-[var(--tg-text)] outline-none placeholder:text-[var(--tg-muted)] focus:ring-1 focus:ring-[var(--tg-accent)]/50"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--tg-accent)] text-white transition hover:brightness-110 disabled:opacity-40"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
