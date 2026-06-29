import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button, Container, Section } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { HOME_PRODUCTS } from '#/lib/constants.ts';
import { ProductCard } from './product-card.tsx';

export function ProductGrid() {
  const { t } = useT();

  return (
    <Section spacing="lg">
      <Container size="lg">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
              {t.home.products.kicker}
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              {t.home.products.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-text-soft">{t.home.products.subtitle}</p>
          </div>
          <Button asChild variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link to="/products">{t.home.products.viewAll}</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {HOME_PRODUCTS.map((product) => {
            // product.tagKey -> "product.genlabs.tag" -> ["product", "genlabs", "tag"]
            const parts = product.tagKey.split('.');
            const group = parts[1] as 'genlabs' | 'media' | 'crm' | 'mall';
            const tag = t.product[group].tag;
            return <ProductCard key={product.id} product={product} tag={tag} />;
          })}
        </div>
      </Container>
    </Section>
  );
}
