import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Check } from 'lucide-react';
import { Button, Card, Container } from '#/components/ui/index.ts';
import { useT } from '#/i18n/index.tsx';
import { HOME_CAPABILITIES } from '#/lib/constants.ts';

export const Route = createFileRoute('/services')({ component: ServicesPage });

const PROCESS_STEPS = {
  zh: [
    {
      title: '诊断现状',
      desc: '梳理业务目标、现有系统、人员流程和关键卡点，先判断是否需要产品化、定制化或组合交付。',
    },
    {
      title: '确定路径',
      desc: '把需求拆成可落地的阶段，明确首期范围、验收标准、数据口径和上线节奏。',
    },
    {
      title: '交付上线',
      desc: '基于现有产品与工程底座快速搭建，完成配置、集成、培训和上线后的持续迭代。',
    },
  ],
  en: [
    {
      title: 'Diagnose',
      desc: 'Map goals, systems, workflows and blockers before choosing product, custom or combined delivery.',
    },
    {
      title: 'Plan',
      desc: 'Split the work into practical phases with clear scope, acceptance criteria, metrics and launch rhythm.',
    },
    {
      title: 'Deliver',
      desc: 'Build on existing products and engineering foundations, then support launch, training and iteration.',
    },
  ],
} as const;

function ServicesPage() {
  const { t, locale } = useT();
  const steps = PROCESS_STEPS[locale];

  return (
    <Container size="lg" className="py-10 sm:py-14">
      <section className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
          {t.nav.services}
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {locale === 'zh' ? '围绕业务结果交付数字化能力' : 'Digital capabilities built around business outcomes'}
        </h1>
        <p className="mt-5 text-lg leading-8 text-text-soft">
          {locale === 'zh'
            ? '从内容生产、客户经营到交易变现，我们用成熟产品和工程能力，把中小企业的关键流程做轻、做稳、做可持续。'
            : 'From content production and customer operations to commerce, we combine mature products with engineering delivery to make core SMB workflows lighter, stable and scalable.'}
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {HOME_CAPABILITIES.map((capability) => {
          const data = t.capability[capability.id];

          return (
            <Card
              key={capability.id}
              className="flex h-full flex-col bg-surface-elevated p-7 shadow-none dark:bg-surface sm:p-8"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <span className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-text-soft dark:bg-surface-strong">
                  {data.title}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-text">{data.title}</h2>
              <p className="mt-4 text-base leading-7 text-text-soft">{data.desc}</p>

              <ul className="mt-7 flex flex-col gap-3">
                {data.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text-soft">
                    <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </section>

      <section className="mt-14 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
            {locale === 'zh' ? '交付方式' : 'Delivery model'}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">
            {locale === 'zh' ? '先判断，再落地，不做无效复杂化' : 'Diagnose first, then ship without unnecessary complexity'}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl bg-surface-elevated p-5 dark:bg-surface-strong">
              <p className="text-sm font-semibold tabular-nums text-brand-600 dark:text-brand-300">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-soft">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-col gap-5 rounded-2xl border border-border bg-surface-elevated p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:bg-surface">
        <div>
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300">
            {locale === 'zh' ? '需要具体方案？' : 'Need a concrete plan?'}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-text">
            {locale === 'zh' ? '把你的业务流程发给我们评估' : 'Send us your workflow for assessment'}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-soft">
            {locale === 'zh'
              ? '我们会根据现有产品、定制开发和集成成本，给出更适合的交付路径。'
              : 'We will recommend a delivery path based on existing products, custom work and integration cost.'}
          </p>
        </div>
        <Button asChild variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
          <Link to="/contact">{locale === 'zh' ? '联系咨询' : 'Contact us'}</Link>
        </Button>
      </section>
    </Container>
  );
}
