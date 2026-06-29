import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button, Card } from '#/components/ui';
import { useT } from '#/i18n';
import { isProductId, PRODUCT_META_BY_ID } from '#/data/products';

export const Route = createFileRoute('/products/$id')({
  component: ProductDetail,
  parseParams: (params) => ({
    id: isProductId(params.id) ? params.id : throwNotFound(),
  }),
});

function throwNotFound(): never {
  throw notFound();
}

function ProductDetail() {
  const { id } = Route.useParams();
  const { t, locale } = useT();
  const meta = PRODUCT_META_BY_ID[id];
  const detail = t.productDetail[id];

  return (
    <article>
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-text-soft transition-colors hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.productDetail.common.breadcrumbProducts}
      </Link>

      <header className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          {detail.tagline}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">{meta.name}</h1>
        <p className="mt-5 text-lg leading-8 text-text-soft">{detail.description}</p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {detail.features.items.map((item) => (
          <Card key={item.title} className="p-6">
            <h2 className="text-lg font-semibold text-text">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">{item.desc}</p>
          </Card>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-text">{detail.scenarios.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {detail.scenarios.items.map((item) => (
            <div key={item.title} className="rounded-2xl bg-surface-strong p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                {item.role}
              </p>
              <h3 className="mt-2 font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-soft">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-border bg-surface-elevated p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:bg-surface">
        <div>
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300">
            {locale === 'zh' ? '需要进一步了解？' : 'Need more context?'}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-text">
            {locale === 'zh' ? `和我们聊聊 ${meta.name}` : `Talk to us about ${meta.name}`}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-soft">
            {t.productDetail.common.sections.ctaSubtitle}
          </p>
        </div>
        <Button asChild variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
          <Link to="/contact">{t.productDetail.common.sections.ctaPrimary}</Link>
        </Button>
      </div>
    </article>
  );
}
