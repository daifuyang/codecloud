import { ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button, Container, Kicker, Section } from '#/components/ui';
import { useT } from '#/i18n';

interface ProductDetailCtaProps {
  /** 产品名，CTA 标题里动态拼接 */
  productName?: string;
}

export function ProductDetailCta({ productName }: ProductDetailCtaProps) {
  const { t, locale } = useT();

  return (
    <Section spacing="xl">
      <Container size="xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 px-8 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent-400/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />

          <div className="relative">
            <Kicker className="!text-brand-100">{t.productDetail.common.sections.ctaKicker}</Kicker>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {locale === 'zh'
                ? `上手 ${productName ?? '移山 CRM'}`
                : `Get started with ${productName ?? 'Yishan CRM'}`}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
              {t.productDetail.common.sections.ctaSubtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-700 hover:bg-white/95 hover:shadow-xl"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link to="/contact">{t.productDetail.common.sections.ctaPrimary}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/contact">{t.productDetail.common.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}