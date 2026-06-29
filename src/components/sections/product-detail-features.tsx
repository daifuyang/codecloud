import { Container, FigLabel, Heading, Section } from '#/components/ui';
import { BentoGrid, BentoItem } from '#/components/ui/bento-grid';
import type { ProductDetailContent } from '#/i18n/types';

interface ProductDetailFeaturesProps {
  kicker: string;
  title: string;
  items: ProductDetailContent['features']['items'];
}

/** Bento 排布：第一项大卡（colSpan 2 + rowSpan 1），中间穿插小卡 */
const FEATURE_LAYOUT: ReadonlyArray<{
  colSpan: 1 | 2 | 3 | 4 | 6;
  rowSpan: 1 | 2;
  tone: 'default' | 'primary' | 'quiet';
}> = [
  { colSpan: 2, rowSpan: 1, tone: 'primary' },
  { colSpan: 2, rowSpan: 1, tone: 'default' },
  { colSpan: 2, rowSpan: 1, tone: 'default' },
  { colSpan: 3, rowSpan: 1, tone: 'quiet' },
  { colSpan: 3, rowSpan: 1, tone: 'default' },
  { colSpan: 6, rowSpan: 1, tone: 'quiet' },
];

export function ProductDetailFeatures({ kicker, title, items }: ProductDetailFeaturesProps) {
  return (
    <Section spacing="xl">
      <Container size="xl">
        <div className="mb-14 flex flex-col gap-4">
          <FigLabel n={2} />
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
            {kicker}
          </span>
          <Heading as={2} size="2xl" className="max-w-3xl">
            {title}
          </Heading>
        </div>

        <BentoGrid>
          {items.map((item, idx) => {
            const layout = FEATURE_LAYOUT[idx] ?? { colSpan: 2, rowSpan: 1, tone: 'default' as const };
            return (
              <BentoItem
                key={item.title}
                colSpan={layout.colSpan as 1 | 2 | 3 | 4 | 6}
                rowSpan={layout.rowSpan as 1 | 2}
                tone={layout.tone}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs font-bold tabular-nums text-brand-600 dark:text-brand-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-text sm:text-2xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-soft sm:text-base">{item.desc}</p>
              </BentoItem>
            );
          })}
        </BentoGrid>
      </Container>
    </Section>
  );
}