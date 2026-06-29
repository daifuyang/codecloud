import { Card, Container, Section } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { HOME_METRICS } from '#/lib/constants.ts';

export function MetricsBar() {
  const { t } = useT();
  // metric.{n}.value/label 是 dot-path，取最后一段作为 key
  const labelFor = (key: string) => {
    const num = key.split('.')[1] ?? '0';
    const metric = t.metric[num as '50' | '10' | '4' | '99'];
    return metric;
  };

  return (
    <Section spacing="sm">
      <Container size="lg">
        <div className="mb-8">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
            {t.home.metrics.kicker}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {HOME_METRICS.map((m) => {
            const metric = labelFor(m.valueKey);
            return (
              <Card
                key={m.valueKey}
                className="bg-surface-elevated p-6 shadow-none dark:bg-surface"
              >
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                    {metric.value}
                  </span>
                  {m.suffix ? (
                    <span className="text-xl font-semibold text-brand-600 dark:text-brand-400">
                      {m.suffix}
                    </span>
                  ) : null}
                </div>
                <span className="mt-2 block text-sm leading-6 text-text-soft">{metric.label}</span>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
