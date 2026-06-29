import { ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Container, FigLabel, Heading, Section } from '#/components/ui';
import { cn } from '#/lib/utils';
import { useT } from '#/i18n';
import type { Product } from '#/lib/constants';

interface ProductDetailRelatedProps {
  currentId: string;
  products: readonly Product[];
}

/** Bento 排布：第一个推荐产品大卡（占 3 列），其他小卡 */
const RELATED_LAYOUT = [
  { colSpan: 3 as const, rowSpan: 2 as const, tone: 'primary' as const },
  { colSpan: 3 as const, rowSpan: 1 as const, tone: 'default' as const },
  { colSpan: 3 as const, rowSpan: 1 as const, tone: 'default' as const },
];

export function ProductDetailRelated({ currentId, products }: ProductDetailRelatedProps) {
  const { t, locale } = useT();
  const related = products.filter((p) => p.id !== currentId);

  return (
    <Section spacing="xl">
      <Container size="xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-4">
            <FigLabel n={6} />
            <Heading as={2} size="2xl" className="max-w-2xl">
              {locale === 'zh' ? '你可能还需要' : 'You might also need'}
            </Heading>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 dark:text-brand-400"
          >
            <span>{t.home.products.viewAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-6 lg:auto-rows-[minmax(200px,auto)]">
          {related.map((product, idx) => {
            const layout = RELATED_LAYOUT[idx] ?? RELATED_LAYOUT[0]!;
            const tagKey = product.tagKey.split('.')[1] as 'genlabs' | 'media' | 'crm' | 'mall';
            const tag = t.product[tagKey].tag;
            return (
              <Link
                key={product.id}
                to={product.href}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-7',
                  'hover:-translate-y-0.5 hover:shadow-lg',
                  layout.tone === 'primary'
                    ? 'border-brand-500/40 bg-gradient-to-br from-brand-50/80 to-surface hover:border-brand-500/60'
                    : 'border-border bg-surface hover:border-brand-500/40',
                  layout.colSpan === 3 && layout.rowSpan === 2 && 'lg:col-span-3 lg:row-span-2',
                  layout.colSpan === 3 && layout.rowSpan === 1 && 'lg:col-span-3 lg:row-span-1',
                )}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black',
                      layout.tone === 'primary'
                        ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-white'
                        : 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400',
                    )}
                  >
                    {product.name.charAt(0)}
                  </span>
                  <span className="rounded-full bg-surface-strong px-2.5 py-0.5 text-xs font-medium text-text-soft">
                    {tag}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-text sm:text-xl">{product.name}</h3>
                <p className="flex-1 text-sm leading-relaxed text-text-soft">{product.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2 dark:text-brand-400">
                  <span>{locale === 'zh' ? '了解详情' : 'Learn more'}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}