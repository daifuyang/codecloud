import { ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button, Container, Kicker, Section } from '#/components/ui';
import { useT } from '#/i18n';
import type { ProductId, ProductMeta } from '#/data/products';
import { ProductMockCrm } from './product-mock-crm';
import { ProductMockFallback } from './product-mock-fallback';

interface ProductDetailHeroProps {
  product: ProductMeta;
  tagline: string;
  description: string;
}

export function ProductDetailHero({ product, tagline, description }: ProductDetailHeroProps) {
  const { t } = useT();
  const isCrm = product.id === ('crm' as ProductId);

  return (
    <Section
      spacing="xl"
      className="bg-gradient-hero relative overflow-hidden border-b border-border"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-50" />
      <div className="pointer-events-none absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />

      <Container size="xl" className="relative">
        {/* Eyebrow */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Kicker>
            {t.productDetail.common.breadcrumbProducts} · {product.name}
          </Kicker>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* 左侧文案 */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text sm:text-6xl lg:text-7xl">
              <span className="text-gradient-brand">{product.name}</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-text sm:text-xl">{tagline}</p>
            <p className="mt-4 text-base leading-relaxed text-text-soft sm:text-lg">
              {description}
            </p>

            {/* CTA 紧贴标题下方（Linear 风格） */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link to="/contact">{t.productDetail.common.primaryCta}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">{t.productDetail.common.secondaryCta}</Link>
              </Button>
              <span className="ml-1 text-xs text-text-muted">· 无需信用卡 · 1 周上线</span>
            </div>
          </div>

          {/* 右侧视觉层叠 */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 blur-2xl" />
            {isCrm ? <ProductMockCrm /> : <ProductMockFallback product={product} placeholder={t.productDetail.common.screenshotPlaceholder} />}
          </div>
        </div>
      </Container>
    </Section>
  );
}