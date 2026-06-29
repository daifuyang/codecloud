import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button, Container, Section } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';

export function CtaSection() {
  const { t, locale } = useT();

  return (
    <Section spacing="md">
      <Container size="lg">
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface-elevated p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:bg-surface">
          <div>
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-300">
              {locale === 'zh' ? '下一步' : 'Next step'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text">
              {t.home.cta.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-soft">{t.home.cta.subtitle}</p>
          </div>
          <Button asChild variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link to="/contact">{t.home.cta.primaryCta}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
