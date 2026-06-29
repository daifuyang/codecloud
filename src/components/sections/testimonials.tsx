import { Card, Container, Section } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { HOME_TESTIMONIALS } from '#/lib/constants.ts';

export function Testimonials() {
  const { t } = useT();

  return (
    <Section spacing="lg">
      <Container size="lg">
        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
            {t.home.testimonials.kicker}
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {t.home.testimonials.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-soft">{t.home.testimonials.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {HOME_TESTIMONIALS.map((item) => {
            const num = item.quoteKey.split('.')[1] ?? '1';
            const data = t.testimonial[num as '1' | '2' | '3'];
            return (
              <Card
                key={item.quoteKey}
                className="flex h-full flex-col bg-surface-elevated p-6 shadow-none dark:bg-surface"
              >
                <p className="mb-6 flex-1 text-sm leading-7 text-text">“{data.quote}”</p>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text">{data.name}</div>
                    <div className="text-xs text-text-muted">{data.role}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
