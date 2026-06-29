import { Container, FigLabel, Heading, Section } from '#/components/ui';
import { ProductMockCrm } from './product-mock-crm';
import { ProductMockFallback } from './product-mock-fallback';
import type { ProductMeta } from '#/data/products';
import type { ProductId } from '#/data/products';

interface ProductDetailScreenshotProps {
  kicker: string;
  title: string;
  placeholder: string;
  product: ProductMeta;
}

export function ProductDetailScreenshot({
  kicker,
  title,
  placeholder,
  product,
}: ProductDetailScreenshotProps) {
  const isCrm = product.id === ('crm' as ProductId);

  return (
    <Section spacing="xl" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-30" />

      <Container size="xl" className="relative">
        <div className="mb-12 flex flex-col gap-4">
          <FigLabel n={4} />
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
            {kicker}
          </span>
          <Heading as={2} size="2xl" className="max-w-3xl">
            {title}
          </Heading>
        </div>

        {/* Full-bleed 风格：大容器 */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-lg sm:p-10">
          {isCrm ? (
            <ProductMockCrm />
          ) : (
            <ProductMockFallback product={product} placeholder={placeholder} />
          )}
        </div>
      </Container>
    </Section>
  );
}