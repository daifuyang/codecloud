import { Languages } from 'lucide-react';
import { useT } from '#/i18n/index.tsx';
import { cn } from '#/lib/utils.ts';

export function LangSwitch() {
  const { locale, setLocale, t } = useT();
  const next = locale === 'zh' ? 'en' : 'zh';
  const nextLabel = t.lang[next];

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={`${t.lang.switchTo}: ${nextLabel}`}
      title={`${t.lang.switchTo}: ${nextLabel}`}
      className={cn(
        'inline-flex h-9 items-center gap-1.5 rounded-md px-2.5',
        'text-sm font-medium text-text-soft hover:text-text hover:bg-surface-strong',
        'transition-colors',
      )}
    >
      <Languages className="h-4 w-4" strokeWidth={2} />
      <span className="uppercase">{locale}</span>
    </button>
  );
}
