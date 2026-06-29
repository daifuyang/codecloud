import { Container, FigLabel, Heading, Section } from '#/components/ui';
import { cn } from '#/lib/utils';
import type { ProductDetailContent } from '#/i18n/types';

interface ProductDetailScenariosProps {
  kicker: string;
  title: string;
  items: ProductDetailContent['scenarios']['items'];
}

const SCENARIO_LAYOUT = [
  { colSpan: 3 as const, tone: 'border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-surface-strong' },
  { colSpan: 2 as const, tone: 'border-border bg-surface' },
  { colSpan: 1 as const, tone: 'border-border bg-surface' },
];

export function ProductDetailScenarios({
  kicker,
  title,
  items,
}: ProductDetailScenariosProps) {
  return (
    <Section spacing="xl" variant="dark" className="section-dark-text border-y border-border">
      <Container size="xl">
        <div className="mb-14 flex flex-col gap-4">
          <FigLabel n={3} className="text-brand-400" />
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-brand-300 ring-1 ring-inset ring-white/10">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" />
            {kicker}
          </span>
          <Heading
            as={2}
            size="2xl"
            className="max-w-3xl !text-white"
          >
            {title}
          </Heading>
        </div>

        <div className="grid gap-4 lg:grid-cols-6 lg:auto-rows-[minmax(220px,auto)]">
          {items.map((item, idx) => {
            const layout = SCENARIO_LAYOUT[idx] ?? SCENARIO_LAYOUT[0]!;
            return (
              <div
                key={item.title}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-7',
                  'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl',
                  layout.colSpan === 3 && 'lg:col-span-3 lg:row-span-2',
                  layout.colSpan === 2 && 'lg:col-span-2',
                  layout.colSpan === 1 && 'lg:col-span-1',
                  layout.tone,
                )}
              >
                <span className="mb-5 inline-flex w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-brand-200 ring-1 ring-inset ring-white/20">
                  {item.role}
                </span>
                <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{item.desc}</p>
                {idx === 0 ? (
                  <div className="mt-auto pt-6">
                    <span className="font-mono text-3xl font-black text-brand-400">
                      0{idx + 1}
                    </span>
                    <span className="ml-2 text-xs text-slate-400">主流场景</span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}