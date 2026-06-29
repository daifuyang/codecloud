import { createFileRoute } from '@tanstack/react-router';
import { ProductCard } from '#/components/sections/index.ts';
import { useT } from '#/i18n/index.tsx';
import { HOME_PRODUCTS } from '#/lib/constants.ts';

export const Route = createFileRoute('/products/')({ component: ProductsIndex });

function ProductsIndex() {
  const { t } = useT();

  return (
    <>
      <section className="mb-12 max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
          {t.home.products.kicker}
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {t.home.products.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-text-soft">{t.home.products.subtitle}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {HOME_PRODUCTS.map((product) => {
          const parts = product.tagKey.split('.');
          const group = parts[1] as 'genlabs' | 'media' | 'crm' | 'mall';
          const tag = t.product[group].tag;
          return <ProductCard key={product.id} product={product} tag={tag} />;
        })}
      </section>
    </>
  );
}
