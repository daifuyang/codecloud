import { Check } from 'lucide-react';
import { Card } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import type { Capability } from '#/lib/constants.ts';

const ORDER: Capability['id'][] = ['content', 'customer', 'commerce', 'foundry'];

interface CapabilityCardProps {
  capability: Capability;
}

export function CapabilityCard({ capability }: CapabilityCardProps) {
  const { t } = useT();
  const group = capability.id as 'content' | 'customer' | 'commerce' | 'foundry';
  const data = t.capability[group];
  const index = ORDER.indexOf(capability.id) + 1;

  return (
    <Card className="flex h-full flex-col bg-surface-elevated p-7 shadow-none dark:bg-surface sm:p-8">
      <div className="mb-7 flex items-center justify-between gap-4">
        <span className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-text-soft dark:bg-surface-strong">
          {data.title}
        </span>
        <span className="text-sm font-semibold tabular-nums text-text-muted">
          0{index}
        </span>
      </div>

      <h3 className="text-2xl font-semibold tracking-tight text-text">{data.title}</h3>
      <p className="mt-4 text-base leading-7 text-text-soft">{data.desc}</p>

      <ul className="mt-7 flex flex-col gap-3">
        {data.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm leading-6 text-text-soft">
            <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
