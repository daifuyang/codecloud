import { Container, Section } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { HOME_CAPABILITIES } from '#/lib/constants.ts';
import { CapabilityCard } from './capability-card.tsx';

export function CapabilitiesGrid() {
  const { t } = useT();

  return (
    <Section spacing="lg" className="bg-surface/35">
      <Container size="lg">
        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
            {t.home.capabilities.kicker}
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {t.home.capabilities.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-soft">{t.home.capabilities.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {HOME_CAPABILITIES.map((c) => (
            <CapabilityCard key={c.id} capability={c} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
