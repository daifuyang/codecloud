import { Monitor, Moon, Sun } from 'lucide-react';
import { useT } from '#/i18n/index.tsx';
import { type ThemeMode, useTheme } from '#/lib/use-theme.ts';
import { cn } from '#/lib/utils.ts';

const ICONS: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  auto: Monitor,
};

const ORDER: ThemeMode[] = ['light', 'dark', 'auto'];

export function ThemeToggle() {
  const { mode, cycle } = useTheme();
  const { t } = useT();
  const Icon = ICONS[mode];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${t.theme[mode]} · ${t.lang.switchTo}`}
      title={`${t.theme[mode]} (click to switch)`}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md',
        'text-text-soft hover:text-text hover:bg-surface-strong',
        'transition-colors',
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
      <span className="sr-only">Theme: {ORDER.find((m) => m === mode)}</span>
    </button>
  );
}
